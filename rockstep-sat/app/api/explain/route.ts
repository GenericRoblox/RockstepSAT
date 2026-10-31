import { chat, errorResponse, guard } from "@/lib/server/openrouter";

export const runtime = "nodejs";
export const maxDuration = 60;

const clip = (v: unknown, n: number) => (typeof v === "string" ? v.slice(0, n) : "");

export async function POST(req: Request) {
  const blocked = guard(req);
  if (blocked) return blocked;
  try {
    const body = await req.json().catch(() => ({}));
    const q = body.question ?? {};
    const choices: string[] = Array.isArray(q.choices) ? q.choices.map((c: unknown) => clip(c, 400)) : [];
    const correct = choices.length && Number.isInteger(q.answer)
      ? `${String.fromCharCode(65 + q.answer)}) ${choices[q.answer]}`
      : (Array.isArray(q.accepted) ? q.accepted.map((a: unknown) => clip(a, 40)).join(" or ") : "");
    const prompt = [
      q.passage ? `Passage:\n${clip(q.passage, 1800)}` : "",
      q.passage2 ? `${clip(q.passage2, 1200)}` : "",
      q.table ? `Table: ${clip(JSON.stringify(q.table), 1200)}` : "",
      `Question: ${clip(q.stem, 700)}`,
      choices.length ? `Choices:\n${choices.map((c, i) => `${String.fromCharCode(65 + i)}) ${c}`).join("\n")}` : "",
      `Correct answer: ${correct}`,
      `The student answered: ${clip(body.chosen, 200)}`,
      `Official explanation: ${clip(q.explanation, 900)}`,
    ].filter(Boolean).join("\n\n");

    const text = await chat(
      [
        {
          role: "system",
          content:
            "You are a friendly, encouraging SAT tutor talking to a high school student. In under 110 words, explain the specific reasoning mistake that likely led to their answer, then the quickest way to reach the correct answer. Speak directly to the student. Write math between single dollar signs as LaTeX and write money as \\$5. No headings or lists.",
        },
        { role: "user", content: prompt },
      ],
      { temperature: 0.4, maxTokens: 1500, timeoutMs: 45_000 },
    );
    return Response.json({ text: text.trim() });
  } catch (e) {
    return errorResponse(e);
  }
}
