// Server-only. Never import this from a client component: it reads the API key.

const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
export const DEFAULT_MODEL = "nvidia/nemotron-3-super-120b-a12b";

export function model(): string {
  return process.env.OPENROUTER_MODEL?.trim() || DEFAULT_MODEL;
}

export function isConfigured(): boolean {
  return !!process.env.OPENROUTER_API_KEY?.trim();
}

export class AIError extends Error {
  constructor(message: string, public status = 502) {
    super(message);
  }
}

type Msg = { role: "system" | "user" | "assistant"; content: string };

export async function chat(
  messages: Msg[],
  opts: { temperature?: number; maxTokens?: number; timeoutMs?: number } = {},
): Promise<string> {
  const key = process.env.OPENROUTER_API_KEY?.trim();
  if (!key) throw new AIError("AI is not set up on the server. Add OPENROUTER_API_KEY in Vercel.", 503);

  const body: Record<string, unknown> = {
    model: model(),
    messages,
    temperature: opts.temperature ?? 0.7,
    max_tokens: opts.maxTokens ?? 5000,
    reasoning: { effort: "low" },
  };

  const send = async (b: Record<string, unknown>) => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), opts.timeoutMs ?? 50_000);
    try {
      return await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.VERCEL_PROJECT_PRODUCTION_URL
            ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
            : "http://localhost:3000",
          "X-Title": "Rockstep SAT",
        },
        body: JSON.stringify(b),
        signal: ctrl.signal,
      });
    } catch (e) {
      throw new AIError(ctrl.signal.aborted ? "The AI took too long to respond." : "Couldn't reach OpenRouter.", 504);
    } finally {
      clearTimeout(timer);
    }
  };

  let res = await send(body);
  if (res.status === 400) {
    // Some providers reject the reasoning setting; retry without it.
    delete body.reasoning;
    res = await send(body);
  }
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    if (res.status === 401) throw new AIError("OpenRouter rejected the API key. Check OPENROUTER_API_KEY.", 502);
    if (res.status === 402) throw new AIError("The OpenRouter account is out of credits.", 502);
    if (res.status === 429) throw new AIError("OpenRouter is rate-limiting requests. Try again in a minute.", 429);
    throw new AIError(`OpenRouter error ${res.status}: ${detail.slice(0, 200)}`, 502);
  }
  const data = await res.json();
  const text: string = data?.choices?.[0]?.message?.content ?? "";
  return text.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
}

export function extractJSON(text: string): unknown {
  const cleaned = text.replace(/```(?:json)?/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start < 0 || end <= start) throw new AIError("The AI reply wasn't valid JSON.");
  try {
    return JSON.parse(cleaned.slice(start, end + 1));
  } catch {
    throw new AIError("The AI reply wasn't valid JSON.");
  }
}

// ───────── Request guard ─────────

const hits = new Map<string, number[]>();

/** Returns an error Response, or null when the request may proceed. */
export function guard(req: Request): Response | null {
  const code = process.env.ROCKSTEP_ACCESS_CODE?.trim();
  if (code && req.headers.get("x-rockstep-code") !== code) {
    return Response.json({ error: "Enter the access code in Settings to use AI features." }, { status: 401 });
  }

  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return Response.json({ error: "Cross-site requests aren't allowed." }, { status: 403 });
    } catch {
      return Response.json({ error: "Bad origin." }, { status: 403 });
    }
  }

  // Best-effort limit per server instance: 40 AI calls per 10 minutes per IP.
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 600_000);
  if (recent.length >= 40) return Response.json({ error: "Too many AI requests. Take a short break and try again." }, { status: 429 });
  recent.push(now);
  hits.set(ip, recent);
  return null;
}

export function errorResponse(e: unknown): Response {
  if (e instanceof AIError) return Response.json({ error: e.message }, { status: e.status });
  return Response.json({ error: "Something went wrong generating content." }, { status: 500 });
}
