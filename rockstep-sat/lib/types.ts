export type Subject = "rw" | "math";
export type TestType = "SAT" | "PSAT_NMSQT" | "PSAT_10" | "PSAT_89";
export type Level = 1 | 2 | 3;
export type Grade = 9 | 10 | 11 | 12;

export interface DataTable {
  title?: string;
  headers: string[];
  rows: string[][];
}

export interface Question {
  id: string;
  subject: Subject;
  skill: string;
  level: Level;
  passage?: string;
  passage2?: string;
  table?: DataTable;
  stem: string;
  /** Multiple choice: four options and the index of the right one. */
  choices?: string[];
  answer?: number;
  /** Student-produced response (math grid-in): accepted answers. */
  accepted?: string[];
  explanation: string;
  source: "bank" | "ai";
}

export interface SectionScores {
  rw: number;
  math: number;
}

export interface Profile {
  name: string;
  grade: Grade;
  test: TestType;
  testDate: string; // YYYY-MM-DD
  last?: { test: TestType; rw: number; math: number };
  target: SectionScores;
  /** Baseline used to place the student (from last score or placement quiz). */
  start: SectionScores;
  createdAt: string;
}

export interface NodeResult {
  date: string;
  correct: number;
  total: number;
  passed: boolean;
}

export interface DayLog {
  subject: Subject;
  lessons: number;
  review: boolean;
  timed: boolean;
  xp: number;
  qids: string[];
}

export interface AnswerStat {
  right: number;
  wrong: number;
  last: string;
  lastCorrect: boolean;
}

export interface AppState {
  version: 1;
  profile: Profile | null;
  completed: Record<string, NodeResult>;
  testOuts: Record<string, "passed" | "failed">;
  days: Record<string, DayLog>;
  xp: number;
  streak: {
    count: number;
    best: number;
    lastDate: string | null;
    freezes: number;
    frozenDates: string[];
  };
  answers: Record<string, AnswerStat>;
  mistakes: string[];
  aiBank: Record<string, Question>;
  recent: { subject: Subject; correct: boolean }[];
  settings: { accessCode?: string };
}

export type NodeKind = "lesson" | "checkpoint" | "testout";

export interface PathNode {
  id: string;
  subject: Subject;
  kind: NodeKind;
  level: Level;
  domain: string;
  skill?: string;
  title: string;
}

export interface Unit {
  id: string;
  subject: Subject;
  level: Level;
  domain: string;
  title: string;
  kind: "testout" | "normal";
  nodes: PathNode[];
}

export type SessionKind =
  | "lesson"
  | "checkpoint"
  | "testout"
  | "review"
  | "timed"
  | "placement"
  | "mistakes"
  | "light";

export interface SessionSpec {
  kind: SessionKind;
  subject: Subject | "mixed";
  title: string;
  node?: PathNode;
  questions: Question[];
  timeLimitSec?: number;
  passThreshold?: number;
  tip?: string;
}

export interface SessionAnswer {
  qid: string;
  correct: boolean;
}

export interface SessionResult {
  answers: SessionAnswer[]; // first attempt for each question
  seconds: number;
}
