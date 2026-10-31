import type { AppState, Level, PathNode, Profile, Question, SessionSpec, Subject } from "./types";
import { BANK, BANK_BY_ID } from "./bank";
import { domainById, domainsFor, skillById, skillsFor } from "./curriculum";
import { SUBJECT_NAME } from "./scales";
import { LESSON_SIZE, hasScore, probeLevel } from "./engine";

export function getQuestion(state: AppState, id: string): Question | undefined {
  return BANK_BY_ID[id] ?? state.aiBank[id];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pool(state: AppState, skill: string, level?: Level): Question[] {
  const match = (q: Question) => q.skill === skill && (level === undefined || q.level === level);
  return [...BANK.filter(match), ...Object.values(state.aiBank).filter(match)];
}

/** Unseen first, then ones missed last time, then the longest-ago seen. */
function freshFirst(state: AppState, qs: Question[]): Question[] {
  const rank = (q: Question) => {
    const a = state.answers[q.id];
    if (!a) return 0;
    if (!a.lastCorrect) return 1;
    return 2;
  };
  return shuffle(qs).sort((x, y) => {
    const r = rank(x) - rank(y);
    if (r !== 0) return r;
    const lx = state.answers[x.id]?.last ?? "";
    const ly = state.answers[y.id]?.last ?? "";
    return lx.localeCompare(ly);
  });
}

export function unseenCount(state: AppState, skill: string, level: Level): number {
  return pool(state, skill, level).filter((q) => !state.answers[q.id]).length;
}

export function lessonNeedsAI(state: AppState, node: PathNode): boolean {
  return node.kind === "lesson" && !!node.skill && unseenCount(state, node.skill, node.level) < LESSON_SIZE;
}

/** Number of "stretch" questions from the next level at the end of each lesson. */
export const STRETCH = 2;

function pickNear(state: AppState, skill: string, level: Level, n: number, exclude: Question[]): Question[] {
  if (n <= 0) return [];
  return freshFirst(state, pool(state, skill).filter((q) => !exclude.includes(q)))
    .sort((a, b) => Math.abs(a.level - level) - Math.abs(b.level - level) || a.level - b.level)
    .slice(0, n);
}

/**
 * A lesson ramps up: mostly questions at the lesson's level, easiest first, then
 * a couple of stretch questions from the level above (except at Expert).
 */
export function lessonSession(state: AppState, node: PathNode): SessionSpec {
  const skill = skillById(node.skill!);
  const stretchN = node.level < 4 ? STRETCH : 0;
  const core = freshFirst(state, pool(state, skill.id, node.level)).slice(0, LESSON_SIZE - stretchN);
  const stretch = stretchN
    ? freshFirst(state, pool(state, skill.id, (node.level + 1) as Level)).slice(0, stretchN)
    : [];
  let qs = [...core, ...stretch];
  if (qs.length < LESSON_SIZE) qs = [...qs, ...pickNear(state, skill.id, node.level, LESSON_SIZE - qs.length, qs)];
  return {
    kind: "lesson",
    subject: node.subject,
    title: skill.name,
    node,
    questions: qs.sort((a, b) => a.level - b.level),
    tip: skill.tip,
  };
}

function mixFromSkills(state: AppState, skillIds: string[], level: Level, n: number): Question[] {
  const perSkill = skillIds.map((id) => freshFirst(state, pool(state, id, level)));
  const out: Question[] = [];
  let round = 0;
  while (out.length < n && perSkill.some((p) => p.length > round)) {
    for (const p of perSkill) {
      if (p[round] && out.length < n) out.push(p[round]);
    }
    round++;
  }
  if (out.length < n) {
    // Thin at this level (no AI yet): borrow from the nearest other levels of the same skills.
    const extra = freshFirst(
      state,
      skillIds.flatMap((id) => pool(state, id)).filter((q) => q.level !== level && !out.includes(q)),
    ).sort((a, b) => Math.abs(a.level - level) - Math.abs(b.level - level));
    out.push(...extra.slice(0, n - out.length));
  }
  return shuffle(out);
}

export function checkpointSession(state: AppState, node: PathNode): SessionSpec {
  const skills = skillsFor(node.domain).map((s) => s.id);
  return {
    kind: "checkpoint",
    subject: node.subject,
    title: node.title,
    node,
    questions: mixFromSkills(state, skills, node.level, 8),
    passThreshold: 0.75,
  };
}

export function nodeSession(state: AppState, node: PathNode): SessionSpec {
  if (node.kind === "lesson") return lessonSession(state, node);
  return checkpointSession(state, node);
}

export function reviewSession(state: AppState, subject: Subject, date: string): SessionSpec {
  const day = state.days[date];
  const ids = day ? day.qids : [];
  const missed = state.mistakes.filter((id) => getQuestion(state, id)?.subject === subject);
  const missedThatDay = missed.filter((id) => ids.includes(id));
  const olderMissed = missed.filter((id) => !ids.includes(id));
  const rest = shuffle(ids.filter((id) => !missed.includes(id) && getQuestion(state, id)?.subject === subject));
  const chosen = Array.from(new Set([...missedThatDay, ...olderMissed.slice(-2), ...rest])).slice(0, 5);
  const questions = chosen.map((id) => getQuestion(state, id)).filter((q): q is Question => !!q);
  return {
    kind: "review",
    subject,
    title: `Warm-up: ${SUBJECT_NAME[subject]}`,
    questions: shuffle(questions),
  };
}

export function timedSession(state: AppState, subject: Subject, level: Level): SessionSpec {
  const skills = domainsFor(subject).flatMap((d) => skillsFor(d.id).map((s) => s.id));
  const weighted = [...skills].sort((a, b) => skillById(b).weight - skillById(a).weight).slice(0, 10);
  const questions = mixFromSkills(state, weighted, level, 10);
  const perQuestion = subject === "rw" ? 71 : 95; // official pacing per question
  return {
    kind: "timed",
    subject,
    title: `Timed ${SUBJECT_NAME[subject]} section`,
    questions,
    timeLimitSec: perQuestion * questions.length,
  };
}

function bankPick(state: AppState, skill: string, level: Level, used: Set<string>): Question | undefined {
  const exact = shuffle(BANK.filter((q) => q.skill === skill && q.level === level && !used.has(q.id) && !state.answers[q.id]));
  if (exact[0]) return exact[0];
  return shuffle(BANK.filter((q) => q.skill === skill && !used.has(q.id)))
    .sort((a, b) => Math.abs(a.level - level) - Math.abs(b.level - level))[0];
}

/**
 * One placement check per domain: a question per skill at the probe level, plus an adaptive
 * follow-up. Right → a harder question (can the student skip the next level too?).
 * Wrong, with no past score → an easier one (where should lessons start?).
 */
export function placementSession(state: AppState, profile: Profile, domainId: string): SessionSpec {
  const domain = domainById(domainId);
  const level = probeLevel(profile, domain.subject);
  const used = new Set<string>();
  const questions: Question[] = [];
  const followUps: NonNullable<SessionSpec["followUps"]> = {};
  for (const s of skillsFor(domainId)) {
    const q = bankPick(state, s.id, level, used);
    if (!q) continue;
    used.add(q.id);
    questions.push(q);
    const branch: { right?: Question; wrong?: Question } = {};
    if (level < 4) {
      const up = bankPick(state, s.id, (level + 1) as Level, used);
      if (up && up.level > q.level) { branch.right = up; used.add(up.id); }
    }
    if (!hasScore(profile) && level > 1) {
      const down = bankPick(state, s.id, (level - 1) as Level, used);
      if (down && down.level < q.level) { branch.wrong = down; used.add(down.id); }
    }
    followUps[q.id] = branch;
  }
  return {
    kind: "placement",
    subject: domain.subject,
    domain: domainId,
    title: `${domain.name} check`,
    questions,
    followUps,
    tip: `One or two questions for each ${SUBJECT_NAME[domain.subject]} skill in ${domain.name}. Get one right and the next is harder. Skills you already know are skipped in your lessons. Use scratch paper, and don't guess wildly: a lucky guess can skip a lesson you need.`,
  };
}

export function mistakesSession(state: AppState): SessionSpec {
  const questions = shuffle(state.mistakes)
    .slice(0, 10)
    .map((id) => getQuestion(state, id))
    .filter((q): q is Question => !!q);
  return { kind: "mistakes", subject: "mixed", title: "Practice your mistakes", questions };
}

export function lightSession(state: AppState): SessionSpec {
  const missed = shuffle(state.mistakes).slice(0, 8);
  const seen = shuffle(Object.keys(state.answers).filter((id) => !missed.includes(id))).slice(0, 12 - missed.length);
  const questions = [...missed, ...seen]
    .map((id) => getQuestion(state, id))
    .filter((q): q is Question => !!q);
  return { kind: "light", subject: "mixed", title: "Final review", questions: shuffle(questions) };
}
