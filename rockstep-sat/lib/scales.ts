import type { Grade, Subject, TestType } from "./types";

export interface TestInfo {
  id: TestType;
  name: string;
  short: string;
  section: { min: number; max: number };
  total: { min: number; max: number };
}

export const TESTS: Record<TestType, TestInfo> = {
  SAT: {
    id: "SAT",
    name: "SAT",
    short: "SAT",
    section: { min: 200, max: 800 },
    total: { min: 400, max: 1600 },
  },
  PSAT_NMSQT: {
    id: "PSAT_NMSQT",
    name: "PSAT/NMSQT",
    short: "PSAT/NMSQT",
    section: { min: 160, max: 760 },
    total: { min: 320, max: 1520 },
  },
  PSAT_10: {
    id: "PSAT_10",
    name: "PSAT 10",
    short: "PSAT 10",
    section: { min: 160, max: 760 },
    total: { min: 320, max: 1520 },
  },
  PSAT_89: {
    id: "PSAT_89",
    name: "PSAT 8/9",
    short: "PSAT 8/9",
    section: { min: 120, max: 720 },
    total: { min: 240, max: 1440 },
  },
};

export const TEST_ORDER: TestType[] = ["SAT", "PSAT_NMSQT", "PSAT_10", "PSAT_89"];

export const SUBJECT_NAME: Record<Subject, string> = {
  rw: "Reading & Writing",
  math: "Math",
};

export function clampToScale(score: number, test: TestType): number {
  const { min, max } = TESTS[test].section;
  return Math.min(max, Math.max(min, Math.round(score / 10) * 10));
}

/** Section scores must be multiples of 10 within the test's range. */
export function validateSection(score: number, test: TestType): string | null {
  const { min, max } = TESTS[test].section;
  if (!Number.isFinite(score)) return "Enter a number.";
  if (score < min || score > max) return `${TESTS[test].name} section scores run from ${min} to ${max}.`;
  if (score % 10 !== 0) return "Section scores are always multiples of 10.";
  return null;
}

/** A gentle note when a test is unusual for a grade. Never blocks. */
export function gradeNote(grade: Grade, test: TestType): string | null {
  if (test === "PSAT_89" && grade >= 10)
    return "PSAT 8/9 is usually taken in 8th or 9th grade. Double-check that's the test you're registered for.";
  if (test === "PSAT_10" && grade !== 10)
    return "PSAT 10 is usually taken in 10th grade.";
  if (test === "PSAT_NMSQT" && grade === 9)
    return "Most students take the PSAT/NMSQT in 10th or 11th grade. Only 11th-grade scores count toward National Merit.";
  if (test === "PSAT_NMSQT" && grade === 12)
    return "The PSAT/NMSQT is usually taken in 10th or 11th grade.";
  if (test === "SAT" && grade === 9)
    return "Most students take the SAT in 11th or 12th grade. Starting early is fine.";
  return null;
}
