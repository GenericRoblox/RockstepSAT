import type { AppState, Level, PathNode, Question, SessionSpec, Subject } from "./types";
import { BANK, BANK_BY_ID } from "./bank";
import { LEVEL_NAME, domainsFor, skillById, skillsFor } from "./curriculum";
import { SUBJECT_NAME } from "./scales";
import { LESSON_SIZE } from "./engine";

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

export function lessonSession(state: AppState, node: PathNode): SessionSpec {
  const skill = skillById(node.skill!);
  let qs = freshFirst(state, pool(state, skill.id, node.level)).slice(0, LESSON_SIZE);
  if (qs.length < LESSON_SIZE) {
    const near = freshFirst(
      state,
      pool(state, skill.id).filter((q) => q.level !== node.level && !qs.includes(q)),
    ).sort((a, b) => Math.abs(a.level - node.level) - Math.abs(b.level - node.level));
    qs = [...qs, ...near].slice(0, LESSON_SIZE);
  }
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

export function testOutSession(state: AppState, node: PathNode): SessionSpec {
  const skills = skillsFor(node.domain).map((s) => s.id);
  return {
    kind: "testout",
    subject: node.subject,
    title: node.title,
    node,
    questions: mixFromSkills(state, skills, node.level, 6),
    passThreshold: 0.8,
    tip: `Get 5 of 6 right to skip ${LEVEL_NAME[node.level]} lessons for this area. If you miss more, those lessons are added to your route.`,
  };
}

export function nodeSession(state: AppState, node: PathNode): SessionSpec {
  if (node.kind === "lesson") return lessonSession(state, node);
  if (node.kind === "checkpoint") return checkpointSession(state, node);
  return testOutSession(state, node);
}

export function reviewSession(state: AppState, subject: Subject, date: string): SessionSpec {
  const day = state.days[date];
  const ids = day ? day.qids : [];
  const missed = state.mistakes.filter((id) => getQuestion(state, id)?.subject === subject);
  const missedThatDay = missed.filter((id) => ids.includes(id));
  const olderMissed = missed.filter((id) => !ids.includes(id));
  const rest = shuffle(ids.filter((id) => !missed.includes(id)));
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

export function placementSession(subject: Subject): SessionSpec {
  const domains = domainsFor(subject);
  const qs: Question[] = [];
  for (const d of domains) {
    const skills = shuffle(skillsFor(d.id));
    const picks = BANK.filter((q) => q.level === 2 && skills.slice(0, 2).some((s) => s.id === q.skill));
    qs.push(...shuffle(picks).slice(0, d.id === domains[0].id || d.id === domains[1].id ? 2 : 1));
  }
  return {
    kind: "placement",
    subject,
    title: `${SUBJECT_NAME[subject]} placement`,
    questions: qs.slice(0, 6),
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
