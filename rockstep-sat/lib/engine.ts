import type {
  AppState, Level, PathNode, Profile, SessionResult, SessionSpec, Subject, TestType, Unit,
} from "./types";
import { LEVEL_NAME, domainsFor, skillById, skillsFor } from "./curriculum";
import { TESTS, clampToScale } from "./scales";
import { addDays, daysBetween } from "./dates";

export const LESSON_SIZE = 8;
export const MAX_PER_DAY = 4;
export const CRUNCH_DAYS = 30;
export const LIGHT_DAYS = 2;

export const other = (s: Subject): Subject => (s === "rw" ? "math" : "rw");

export function initialState(): AppState {
  return {
    version: 1,
    profile: null,
    completed: {},
    testOuts: {},
    days: {},
    xp: 0,
    streak: { count: 0, best: 0, lastDate: null, freezes: 0, frozenDates: [] },
    answers: {},
    mistakes: [],
    aiBank: {},
    recent: [],
    settings: {},
  };
}

// ───────── Placement ─────────

export function levelFromScore(score: number): Level {
  if (score < 480) return 1;
  if (score < 600) return 2;
  return 3;
}

export function endLevelFor(target: number, start: Level): Level {
  const end: Level = target >= 600 ? 3 : 2;
  return Math.max(end, start) as Level;
}

/** Turns a placement quiz result into a section score estimate on the student's test scale. */
export function estimateFromPlacement(correct: number, total: number, test: TestType): number {
  const frac = total ? correct / total : 0;
  const position = 0.25 + frac * 0.6; // 0 right ≈ 25% of the range, all right ≈ 85%
  const { min, max } = TESTS[test].section;
  return clampToScale(min + (max - min) * position, test);
}

// ───────── Path ─────────

function lessonUnit(subject: Subject, level: Level, domainId: string): Unit {
  const domain = domainsFor(subject).find((d) => d.id === domainId)!;
  const nodes: PathNode[] = skillsFor(domainId).map((s) => ({
    id: `l-${s.id}-${level}`,
    subject,
    kind: "lesson",
    level,
    domain: domainId,
    skill: s.id,
    title: s.name,
  }));
  nodes.push({
    id: `cp-${subject}-${level}-${domainId}`,
    subject,
    kind: "checkpoint",
    level,
    domain: domainId,
    title: `${domain.name} checkpoint`,
  });
  return { id: `u-${subject}-${level}-${domainId}`, subject, level, domain: domainId, title: domain.name, kind: "normal", nodes };
}

function fullPath(profile: Profile, state: AppState, subject: Subject): Unit[] {
  const start = levelFromScore(profile.start[subject]);
  const end = endLevelFor(profile.target[subject], start);
  const domains = domainsFor(subject);
  const units: Unit[] = [];

  if (start > 1) {
    const lower = (start - 1) as Level;
    units.push({
      id: `u-${subject}-testout`,
      subject,
      level: lower,
      domain: "all",
      title: `Check your ${LEVEL_NAME[lower].toLowerCase()} skills`,
      kind: "testout",
      nodes: domains.map((d) => ({
        id: `to-${subject}-${lower}-${d.id}`,
        subject,
        kind: "testout" as const,
        level: lower,
        domain: d.id,
        title: `Test out of ${d.name}`,
      })),
    });
    for (const d of domains) {
      if (state.testOuts[`to-${subject}-${lower}-${d.id}`] === "failed") units.push(lessonUnit(subject, lower, d.id));
    }
  }
  for (let l = start; l <= end; l++) {
    for (const d of domains) units.push(lessonUnit(subject, l as Level, d.id));
  }
  return units;
}

export function isDone(state: AppState, node: PathNode): boolean {
  const r = state.completed[node.id];
  if (!r) return false;
  return node.kind === "checkpoint" ? r.passed : true;
}

export interface PathInfo {
  units: Unit[];
  nodes: PathNode[];
  current: PathNode | null;
  setAside: number;
  totalLessons: number;
  doneLessons: number;
}

function levelFactor(level: Level, start: Level): number {
  if (level === start) return 1;
  if (level < start) return 0.9;
  if (level === start + 1) return 0.75;
  return 0.6;
}

export function daysLeft(profile: Profile, today: string): number {
  return daysBetween(today, profile.testDate);
}

/**
 * Builds a subject's climbing route. When there isn't enough time left to finish
 * at a sensible pace, the lowest-value unfinished lessons are set aside.
 */
export function buildPath(profile: Profile, state: AppState, subject: Subject, today: string): PathInfo {
  let units = fullPath(profile, state, subject);
  const left = daysLeft(profile, today);
  const lessonDays = left - LIGHT_DAYS;
  let setAside = 0;

  if (lessonDays > 0) {
    const crunch = left <= CRUNCH_DAYS;
    const capacity = Math.max(1, Math.floor(lessonDays / 2)) * (crunch ? 3 : MAX_PER_DAY);
    const remaining = units.flatMap((u) => u.nodes).filter((n) => !isDone(state, n)).length;
    let excess = remaining - capacity;
    if (excess > 0) {
      const start = levelFromScore(profile.start[subject]);
      const candidates = units
        .flatMap((u) => u.nodes.map((n) => ({ n, u })))
        .filter(({ n }) => n.kind === "lesson" && !isDone(state, n))
        .sort((a, b) =>
          skillById(a.n.skill!).weight * levelFactor(a.n.level, start) -
          skillById(b.n.skill!).weight * levelFactor(b.n.level, start));
      const pruned = new Set<string>();
      for (const { n, u } of candidates) {
        if (excess <= 0) break;
        pruned.add(n.id);
        excess--;
        setAside++;
        const keptLessons = u.nodes.filter((x) => x.kind === "lesson" && !pruned.has(x.id));
        const cp = u.nodes.find((x) => x.kind === "checkpoint");
        if (keptLessons.length === 0 && cp && !isDone(state, cp) && !pruned.has(cp.id)) {
          pruned.add(cp.id);
          excess--;
        }
      }
      units = units
        .map((u) => ({ ...u, nodes: u.nodes.filter((n) => !pruned.has(n.id)) }))
        .filter((u) => u.nodes.length > 0);
    }
  }

  const nodes = units.flatMap((u) => u.nodes);
  const lessons = nodes.filter((n) => n.kind === "lesson");
  return {
    units,
    nodes,
    current: nodes.find((n) => !isDone(state, n)) ?? null,
    setAside,
    totalLessons: lessons.length,
    doneLessons: lessons.filter((n) => isDone(state, n)).length,
  };
}

// ───────── Today ─────────

export type NextAction =
  | { kind: "review"; subject: Subject; date: string }
  | { kind: "node"; node: PathNode }
  | { kind: "timed"; subject: Subject }
  | { kind: "light" }
  | { kind: "bonus"; node: PathNode | null };

export interface TodayPlan {
  status: "normal" | "light" | "testday" | "after";
  today: string;
  daysLeft: number;
  crunch: boolean;
  subject: Subject;
  review: { subject: Subject; date: string } | null;
  reviewDone: boolean;
  lessonsTarget: number;
  lessonsDone: number;
  timedNeeded: boolean;
  timedDone: boolean;
  goalMet: boolean;
  next: NextAction | null;
  paths: Record<Subject, PathInfo>;
  dayNumber: number;
}

function remainingCount(p: PathInfo, state: AppState): number {
  return p.nodes.filter((n) => !isDone(state, n)).length;
}

export function planToday(state: AppState, today: string): TodayPlan {
  const profile = state.profile!;
  const left = daysLeft(profile, today);
  const paths = {
    rw: buildPath(profile, state, "rw", today),
    math: buildPath(profile, state, "math", today),
  };
  const log = state.days[today];
  const pastDays = Object.keys(state.days).filter((d) => d < today).sort();
  const lastDay = pastDays[pastDays.length - 1];
  const lastLog = lastDay ? state.days[lastDay] : undefined;

  let subject: Subject;
  if (log) subject = log.subject;
  else if (lastLog) subject = other(lastLog.subject);
  else {
    const gap = (s: Subject) => profile.target[s] - profile.start[s];
    subject = gap("math") >= gap("rw") ? "math" : "rw";
  }
  if (!log && remainingCount(paths[subject], state) === 0 && remainingCount(paths[other(subject)], state) > 0) {
    subject = other(subject);
  }

  const review = lastLog && lastLog.qids.length > 0 ? { subject: lastLog.subject, date: lastDay! } : null;
  const reviewDone = review ? !!log?.review : true;
  const lessonsDone = log?.lessons ?? 0;

  const lessonDays = Math.max(1, left - LIGHT_DAYS);
  const otherDone = remainingCount(paths[other(subject)], state) === 0;
  const subjectDays = otherDone ? lessonDays : Math.ceil(lessonDays / 2);
  const remainingAtDayStart = remainingCount(paths[subject], state) + lessonsDone;
  const lessonsTarget = remainingAtDayStart === 0
    ? 0
    : Math.min(MAX_PER_DAY, Math.max(1, Math.ceil(remainingAtDayStart / subjectDays)));

  const crunch = left <= CRUNCH_DAYS && left > LIGHT_DAYS;
  let timedRecently = false;
  for (let i = 1; i <= 6; i++) {
    const d = state.days[addDays(today, -i)];
    if (d && d.timed && d.subject === subject) timedRecently = true;
  }
  const timedDone = !!log?.timed;
  const timedNeeded = crunch && !timedRecently;

  let status: TodayPlan["status"] = "normal";
  if (left < 0) status = "after";
  else if (left === 0) status = "testday";
  else if (left <= LIGHT_DAYS) status = "light";

  const goalMet = status === "light"
    ? !!log?.review
    : reviewDone && lessonsDone >= lessonsTarget && (!timedNeeded || timedDone);

  let next: NextAction | null = null;
  const cur = paths[subject].current;
  if (status === "light") {
    next = log?.review ? { kind: "bonus", node: null } : { kind: "light" };
  } else if (status === "normal") {
    if (!reviewDone && review) next = { kind: "review", subject: review.subject, date: review.date };
    else if (lessonsDone < lessonsTarget && cur) next = { kind: "node", node: cur };
    else if (timedNeeded && !timedDone) next = { kind: "timed", subject };
    else next = { kind: "bonus", node: cur ?? paths[other(subject)].current };
  }

  return {
    status,
    today,
    daysLeft: left,
    crunch,
    subject,
    review,
    reviewDone,
    lessonsTarget,
    lessonsDone,
    timedNeeded,
    timedDone,
    goalMet,
    next,
    paths,
    dayNumber: Math.max(1, daysBetween(profile.createdAt.slice(0, 10), today) + 1),
  };
}

// ───────── Streaks ─────────

/** Run once when the app opens: spend streak freezes on missed days, or reset the streak. */
export function applyRollover(state: AppState, today: string): AppState {
  const s = state.streak;
  if (!s.lastDate || s.count === 0) return state;
  const gap = daysBetween(s.lastDate, today);
  if (gap <= 1) return state;
  const missed = gap - 1;
  if (s.freezes >= missed) {
    const frozen: string[] = [];
    for (let i = 1; i <= missed; i++) frozen.push(addDays(s.lastDate, i));
    return {
      ...state,
      streak: { ...s, freezes: s.freezes - missed, lastDate: addDays(today, -1), frozenDates: [...s.frozenDates, ...frozen].slice(-60) },
    };
  }
  return { ...state, streak: { ...s, count: 0 } };
}

function touchStreak(state: AppState, today: string): { streak: AppState["streak"]; extended: boolean; freezeEarned: boolean } {
  const s = state.streak;
  if (s.lastDate === today) return { streak: s, extended: false, freezeEarned: false };
  const count = s.lastDate && daysBetween(s.lastDate, today) === 1 && s.count > 0 ? s.count + 1 : 1;
  const freezeEarned = count % 7 === 0 && s.freezes < 2;
  return {
    streak: {
      ...s,
      count,
      best: Math.max(s.best, count),
      lastDate: today,
      freezes: s.freezes + (freezeEarned ? 1 : 0),
    },
    extended: true,
    freezeEarned,
  };
}

// ───────── Applying results ─────────

export interface SessionSummary {
  xp: number;
  correct: number;
  total: number;
  passed: boolean | null;
  streakExtended: boolean;
  streakCount: number;
  freezeEarned: boolean;
  testOut?: "passed" | "failed";
}

const XP_BASE: Record<SessionSpec["kind"], number> = {
  lesson: 10, checkpoint: 15, testout: 10, review: 5, timed: 15, placement: 0, mistakes: 5, light: 10,
};

export function applySession(
  state: AppState,
  spec: SessionSpec,
  result: SessionResult,
  today: string,
  focus: Subject,
): { state: AppState; summary: SessionSummary } {
  const correct = result.answers.filter((a) => a.correct).length;
  const total = result.answers.length;
  const ratio = total ? correct / total : 0;

  const answers = { ...state.answers };
  let mistakes = [...state.mistakes];
  const recent = [...state.recent];
  for (const a of result.answers) {
    const prev = answers[a.qid] ?? { right: 0, wrong: 0, last: today, lastCorrect: false };
    answers[a.qid] = {
      right: prev.right + (a.correct ? 1 : 0),
      wrong: prev.wrong + (a.correct ? 0 : 1),
      last: today,
      lastCorrect: a.correct,
    };
    if (a.correct) mistakes = mistakes.filter((id) => id !== a.qid);
    else if (!mistakes.includes(a.qid)) mistakes.push(a.qid);
    const q = spec.questions.find((x) => x.id === a.qid);
    if (q) recent.push({ subject: q.subject, correct: a.correct });
  }

  const wasDone = spec.node ? !!state.completed[spec.node.id]?.passed : false;
  const completed = { ...state.completed };
  const testOuts = { ...state.testOuts };
  let passed: boolean | null = null;
  let testOut: SessionSummary["testOut"];
  if (spec.node) {
    if (spec.kind === "lesson") {
      completed[spec.node.id] = { date: today, correct, total, passed: true };
    } else if (spec.kind === "checkpoint") {
      passed = ratio >= (spec.passThreshold ?? 0.75);
      const prev = completed[spec.node.id];
      if (!prev?.passed) completed[spec.node.id] = { date: today, correct, total, passed };
    } else if (spec.kind === "testout") {
      passed = ratio >= (spec.passThreshold ?? 0.8);
      testOut = passed ? "passed" : "failed";
      testOuts[spec.node.id] = testOut;
      completed[spec.node.id] = { date: today, correct, total, passed };
    }
  }

  let xp = XP_BASE[spec.kind] + correct;
  if (spec.kind === "checkpoint" && passed) xp += 5;
  if (total >= 5 && correct === total && spec.kind !== "placement") xp += 5;
  if (spec.kind === "placement") xp = 0;

  const days = { ...state.days };
  let streak = state.streak;
  let streakExtended = false;
  let freezeEarned = false;
  if (spec.kind !== "placement") {
    const log = days[today] ?? { subject: focus, lessons: 0, review: false, timed: false, xp: 0, qids: [] };
    const isNode = spec.kind === "lesson" || spec.kind === "checkpoint" || spec.kind === "testout";
    days[today] = {
      ...log,
      lessons: log.lessons + (isNode && !wasDone && spec.node?.subject === log.subject ? 1 : 0),
      review: log.review || spec.kind === "review" || spec.kind === "light",
      timed: log.timed || spec.kind === "timed",
      xp: log.xp + xp,
      qids: Array.from(new Set([...log.qids, ...result.answers.map((a) => a.qid)])),
    };
    const t = touchStreak(state, today);
    streak = t.streak;
    streakExtended = t.extended;
    freezeEarned = t.freezeEarned;
  }

  return {
    state: {
      ...state,
      answers,
      mistakes: mistakes.slice(-300),
      recent: recent.slice(-120),
      completed,
      testOuts,
      days,
      xp: state.xp + xp,
      streak,
    },
    summary: { xp, correct, total, passed, streakExtended, streakCount: streak.count, freezeEarned, testOut },
  };
}

// ───────── Projections ─────────

export function accuracy(state: AppState, subject: Subject, lastN = 60): number | null {
  const items = state.recent.filter((r) => r.subject === subject).slice(-lastN);
  if (items.length < 5) return null;
  return items.filter((r) => r.correct).length / items.length;
}

export function projectedScore(state: AppState, subject: Subject, path: PathInfo): number {
  const p = state.profile!;
  const start = p.start[subject];
  const target = p.target[subject];
  if (target <= start) return start;
  const progress = path.totalLessons ? path.doneLessons / path.totalLessons : 0;
  const acc = accuracy(state, subject);
  const factor = acc === null ? 1 : Math.min(1.1, Math.max(0.5, acc / 0.8));
  return clampToScale(start + (target - start) * progress * factor, p.test);
}
