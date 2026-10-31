import { SKILLS, LEVEL_ABOUT, domainById } from "@/lib/curriculum";
import type { DataTable, Level, Question } from "@/lib/types";
import { AIError, chat, errorResponse, extractJSON, guard } from "@/lib/server/openrouter";

export const runtime = "nodejs";
// Two AI calls (write, then check) must fit in Vercel's 60-second function limit.
export const maxDuration = 60;

const FORMAT_NOTES: Record<string, string> = {
  coe_q: 'Each question MUST include a "table" object: {"title": string, "headers": string[], "rows": string[][]} with 2-4 rows of realistic data, and the passage must end with a claim completed by a blank "______".',
  ctc: 'Each question MUST include "passage" starting with "Text 1\\n" and "passage2" starting with "Text 2\\n". Each text is 2-4 sentences.',
  rs: 'The "passage" is a list of 4-5 notes, each on its own line starting with "• ", introduced by "While researching a topic, a student has taken the following notes:". The stem states the student\'s goal and ends with "Which choice most effectively uses relevant information from the notes to accomplish this goal?"',
  bnd: 'The "passage" is one or two sentences containing a blank "______". Choices are the word before the blank plus punctuation variants. Stem: "Which choice completes the text so that it conforms to the conventions of Standard English?"',
  fss: 'The "passage" contains a blank "______". Stem: "Which choice completes the text so that it conforms to the conventions of Standard English?"',
  wic: 'The "passage" is 1-3 sentences with a blank "______". Stem: "Which choice completes the text with the most logical and precise word or phrase?"',
  tr: 'The "passage" is 2-3 sentences with a blank "______" at the start of a sentence. Choices are transition words ending with a comma. Stem: "Which choice completes the text with the most logical transition?"',
  inf: 'The "passage" ends with a blank "______". Stem: "Which choice most logically completes the text?"',
};

function system(subject: "rw" | "math"): string {
  return [
    "You write original practice questions for the Digital SAT, matching the College Board's official style, difficulty, and wording conventions.",
    "Every question must have exactly one unambiguously correct answer and three plausible but clearly wrong choices based on common student mistakes.",
    subject === "math"
      ? "Write math between single dollar signs as LaTeX, for example $\\frac{3}{4}x + 2$. For money, write a backslash before the dollar sign, like \\$12. Double-check every calculation."
      : "Passages are original, factual in tone, and 25-150 words. Use fictional researchers or authors rather than real ones. Never use dollar signs.",
    "Reply with JSON only, no commentary.",
  ].join(" ");
}

function userPrompt(skillId: string, level: Level, count: number, avoid: string[]): string {
  const skill = SKILLS.find((s) => s.id === skillId)!;
  const domain = domainById(skill.domain);
  return [
    `Write ${count} multiple-choice questions.`,
    `Section: ${skill.subject === "rw" ? "Reading and Writing" : "Math"}. Domain: ${domain.name}. Skill: ${skill.name} (${skill.about}).`,
    `Difficulty: ${LEVEL_ABOUT[level]}.`,
    FORMAT_NOTES[skillId] ?? "",
    avoid.length ? `Do not repeat these existing questions: ${avoid.map((a) => `"${a}"`).join("; ")}.` : "",
    'Vary which choice is correct. Return: {"questions":[{"passage": string or null, "passage2": string or null, "table": object or null, "stem": string, "choices": [4 strings], "answer": 0-3, "explanation": string}]}',
    "The explanation is 1-3 sentences: why the right answer is right and the most tempting wrong answer is wrong.",
  ].filter(Boolean).join("\n");
}

const str = (v: unknown, min: number, max: number): string | null =>
  typeof v === "string" && v.trim().length >= min && v.trim().length <= max ? v.trim() : null;

function dollarsBalanced(text: string): boolean {
  return ((text.replace(/\\\$/g, "").match(/\$/g) ?? []).length) % 2 === 0;
}

function toTable(v: unknown): DataTable | undefined | null {
  if (v == null) return undefined;
  const t = v as DataTable;
  if (!Array.isArray(t.headers) || !Array.isArray(t.rows)) return null;
  if (t.headers.length < 2 || t.headers.length > 6 || t.rows.length < 1 || t.rows.length > 8) return null;
  const cell = (c: unknown) => typeof c === "string" || typeof c === "number";
  if (!t.headers.every(cell) || !t.rows.every((r) => Array.isArray(r) && r.length === t.headers.length && r.every(cell))) return null;
  return {
    title: typeof t.title === "string" ? t.title : undefined,
    headers: t.headers.map(String),
    rows: t.rows.map((r) => r.map(String)),
  };
}

function normalize(raw: unknown, skillId: string, level: Level): Question | null {
  const r = raw as Record<string, unknown>;
  const skill = SKILLS.find((s) => s.id === skillId)!;
  const stem = str(r.stem, 10, 700);
  const explanation = str(r.explanation, 10, 900);
  const choices = Array.isArray(r.choices) ? r.choices.map((c) => (typeof c === "string" || typeof c === "number" ? String(c).trim() : "")) : [];
  const answer = typeof r.answer === "number" ? r.answer : Number(r.answer);
  if (!stem || !explanation || choices.length !== 4 || choices.some((c) => !c || c.length > 400)) return null;
  if (new Set(choices).size !== 4 || !Number.isInteger(answer) || answer < 0 || answer > 3) return null;
  const passage = r.passage == null ? undefined : str(r.passage, 10, 1800);
  const passage2 = r.passage2 == null ? undefined : str(r.passage2, 10, 1200);
  if (passage === null || passage2 === null) return null;
  const table = toTable(r.table);
  if (table === null) return null;
  if (skillId === "coe_q" && !table) return null;
  if (skillId === "ctc" && !passage2) return null;
  const texts = [stem, explanation, passage ?? "", passage2 ?? "", ...choices];
  if (!texts.every(dollarsBalanced)) return null;
  return {
    id: `ai-${skillId}-${level}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`,
    subject: skill.subject,
    skill: skillId,
    level,
    passage: passage ?? undefined,
    passage2: passage2 ?? undefined,
    table: table ?? undefined,
    stem,
    choices,
    answer,
    explanation,
    source: "ai",
  };
}

/** A second, independent pass answers each question; only questions where both passes agree are kept. */
async function verify(questions: Question[]): Promise<Question[]> {
  const listing = questions.map((q, i) => ({
    n: i,
    passage: q.passage ?? null,
    passage2: q.passage2 ?? null,
    table: q.table ?? null,
    question: q.stem,
    choices: q.choices,
  }));
  const text = await chat(
    [
      {
        role: "system",
        content: "You are a careful SAT expert. Solve each question independently, working through it fully before choosing. Reply with JSON only.",
      },
      {
        role: "user",
        content: `For each question, give the index (0-3) of the single best answer. If a question is ambiguous or has no correct choice, use -1.\nReturn {"answers":[...]} in order.\n\n${JSON.stringify(listing)}`,
      },
    ],
    { temperature: 0, maxTokens: 4000, timeoutMs: 23_000 },
  );
  const parsed = extractJSON(text) as { answers?: unknown[] };
  if (!Array.isArray(parsed.answers)) throw new AIError("The answer check failed.");
  return questions.filter((q, i) => Number(parsed.answers![i]) === q.answer);
}

export async function POST(req: Request) {
  const blocked = guard(req);
  if (blocked) return blocked;
  try {
    const body = await req.json().catch(() => ({}));
    const skillId = String(body.skill ?? "");
    const level = Number(body.level) as Level;
    const count = Math.min(5, Math.max(1, Number(body.count) || 4));
    const avoid: string[] = Array.isArray(body.avoid)
      ? body.avoid.filter((a: unknown) => typeof a === "string").slice(0, 12).map((a: string) => a.slice(0, 90))
      : [];
    if (!SKILLS.some((s) => s.id === skillId) || ![1, 2, 3].includes(level)) {
      return Response.json({ error: "Unknown skill or level." }, { status: 400 });
    }
    const subject = SKILLS.find((s) => s.id === skillId)!.subject;
    const text = await chat(
      [
        { role: "system", content: system(subject) },
        { role: "user", content: userPrompt(skillId, level, count, avoid) },
      ],
      { temperature: 0.8, timeoutMs: 33_000 },
    );
    const parsed = extractJSON(text) as { questions?: unknown[] };
    const candidates = (Array.isArray(parsed.questions) ? parsed.questions : [])
      .map((q) => normalize(q, skillId, level))
      .filter((q): q is Question => !!q);
    if (candidates.length === 0) throw new AIError("The AI didn't return any usable questions.");
    const verified = await verify(candidates);
    return Response.json({ questions: verified, generated: candidates.length });
  } catch (e) {
    return errorResponse(e);
  }
}
