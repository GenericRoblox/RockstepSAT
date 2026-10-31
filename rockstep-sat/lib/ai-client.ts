import type { Level, Question } from "./types";

export interface AIStatus {
  configured: boolean;
  model: string;
  needsCode: boolean;
}

let statusCache: Promise<AIStatus | null> | null = null;

export function getAIStatus(refresh = false): Promise<AIStatus | null> {
  if (!statusCache || refresh) {
    statusCache = fetch("/api/status", { cache: "no-store" })
      .then((r) => (r.ok ? (r.json() as Promise<AIStatus>) : null))
      .catch(() => null);
  }
  return statusCache;
}

async function post<T>(url: string, body: unknown, code?: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(code ? { "x-rockstep-code": code } : {}) },
    body: JSON.stringify(body),
    signal,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status}).`);
  return data as T;
}

const inFlight = new Map<string, Promise<Question[]>>();

/** Generates verified questions for a skill/level. Concurrent calls for the same key share one request. */
export function generateQuestions(
  skill: string,
  level: Level,
  avoid: string[],
  code?: string,
): Promise<Question[]> {
  const key = `${skill}-${level}`;
  const existing = inFlight.get(key);
  if (existing) return existing;
  const p = post<{ questions: Question[] }>("/api/questions", { skill, level, count: 4, avoid }, code)
    .then((d) => d.questions ?? [])
    .finally(() => inFlight.delete(key));
  inFlight.set(key, p);
  return p;
}

export function isGenerating(skill: string, level: Level): boolean {
  return inFlight.has(`${skill}-${level}`);
}

export async function explainMistake(q: Question, chosen: string, code?: string, signal?: AbortSignal): Promise<string> {
  const d = await post<{ text: string }>(
    "/api/explain",
    {
      question: {
        passage: q.passage, passage2: q.passage2, table: q.table, stem: q.stem,
        choices: q.choices, answer: q.answer, accepted: q.accepted, explanation: q.explanation,
      },
      chosen,
    },
    code,
    signal,
  );
  return d.text;
}
