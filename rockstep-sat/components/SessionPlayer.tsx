"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Question, SessionResult, SessionSpec } from "@/lib/types";
import { LEVEL_NAME } from "@/lib/curriculum";
import { explainMistake } from "@/lib/ai-client";
import MathText from "./MathText";
import { Check, Clock, Close, Spark } from "./Icons";

interface Props {
  spec: SessionSpec;
  aiReady: boolean;
  accessCode?: string;
  onDone: (r: SessionResult) => void;
  onQuit: () => void;
}

const PRAISE = ["Nice climb.", "Solid hold.", "Clean move.", "Right on.", "You sent it."];
const LETTERS = ["A", "B", "C", "D"];

function parseNum(raw: string): number {
  const s = raw.trim().replace(/\s+/g, "").replace(/,/g, "").replace(/%$/, "");
  if (s === "") return NaN;
  if (/^-?\d*\.?\d+\/-?\d*\.?\d+$/.test(s)) {
    const [a, b] = s.split("/").map(Number);
    return b ? a / b : NaN;
  }
  return Number(s);
}

function sprCorrect(input: string, accepted: string[]): boolean {
  const norm = (x: string) => x.trim().replace(/\s+/g, "").toLowerCase();
  const n = parseNum(input);
  return accepted.some((a) => norm(a) === norm(input) || (Number.isFinite(n) && Math.abs(parseNum(a) - n) < 1e-6));
}

function fmtTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function Table({ q }: { q: Question }) {
  if (!q.table) return null;
  return (
    <div className="table-wrap">
      {q.table.title && <p className="table-title"><MathText text={q.table.title} /></p>}
      <table className="data-table">
        <thead>
          <tr>{q.table.headers.map((h, i) => <th key={i} scope="col"><MathText text={h} /></th>)}</tr>
        </thead>
        <tbody>
          {q.table.rows.map((r, i) => (
            <tr key={i}>{r.map((c, j) => (j === 0 ? <th key={j} scope="row"><MathText text={c} /></th> : <td key={j}><MathText text={c} /></td>))}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SessionPlayer({ spec, aiReady, accessCode, onDone, onQuit }: Props) {
  const repeats = ["lesson", "review", "mistakes", "light"].includes(spec.kind);
  const showsFeedback = spec.kind !== "placement" && spec.kind !== "timed";
  const timed = spec.kind === "timed" && !!spec.timeLimitSec;

  const [queue, setQueue] = useState<Question[]>(spec.questions);
  const [idx, setIdx] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [spr, setSpr] = useState("");
  const [phase, setPhase] = useState<"answer" | "feedback">("answer");
  const [wasRight, setWasRight] = useState(false);
  const [intro, setIntro] = useState(!!spec.tip || timed);
  const [confirmQuit, setConfirmQuit] = useState(false);
  const [timeLeft, setTimeLeft] = useState(spec.timeLimitSec ?? 0);
  const [explain, setExplain] = useState<{ loading: boolean; text?: string; error?: string } | null>(null);
  const first = useRef<Record<string, boolean>>({});
  const repeated = useRef<Set<string>>(new Set());
  const startedAt = useRef(Date.now());
  const finished = useRef(false);
  const explainCtrl = useRef<AbortController | null>(null);
  const praise = useMemo(() => PRAISE[Math.floor(Math.random() * PRAISE.length)], [idx]);

  const q = queue[idx];
  const isMC = !!q?.choices;
  const isRepeat = idx >= spec.questions.length;

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    onDone({
      answers: spec.questions.map((x) => ({ qid: x.id, correct: first.current[x.id] ?? false })),
      seconds: Math.round((Date.now() - startedAt.current) / 1000),
    });
  }, [onDone, spec.questions]);

  useEffect(() => {
    if (!timed || intro) return;
    const t = setInterval(() => setTimeLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [timed, intro]);

  useEffect(() => {
    if (timed && !intro && timeLeft === 0) finish();
  }, [timed, intro, timeLeft, finish]);

  const canCheck = phase === "answer" && (isMC ? choice !== null : spr.trim() !== "");

  const advance = useCallback(() => {
    explainCtrl.current?.abort();
    setExplain(null);
    if (idx + 1 >= queue.length) {
      finish();
      return;
    }
    setIdx(idx + 1);
    setChoice(null);
    setSpr("");
    setPhase("answer");
  }, [idx, queue.length, finish]);

  const check = useCallback(() => {
    if (!canCheck || !q) return;
    const correct = isMC ? choice === q.answer : sprCorrect(spr, q.accepted ?? []);
    if (first.current[q.id] === undefined) first.current[q.id] = correct;
    if (!correct && repeats && !repeated.current.has(q.id)) {
      repeated.current.add(q.id);
      setQueue((qs) => [...qs, q]);
    }
    setWasRight(correct);
    if (showsFeedback) setPhase("feedback");
    else advance();
  }, [canCheck, q, isMC, choice, spr, repeats, showsFeedback, advance]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (intro || confirmQuit) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (phase === "answer" && isMC) {
        const k = e.key.toLowerCase();
        const n = ["1", "2", "3", "4"].indexOf(k) >= 0 ? Number(k) - 1 : ["a", "b", "c", "d"].indexOf(k);
        if (n >= 0 && n < (q?.choices?.length ?? 0)) { setChoice(n); return; }
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (phase === "answer") check();
        else advance();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [intro, confirmQuit, phase, isMC, q, check, advance]);

  const askWhy = async () => {
    if (!q) return;
    const chosen = isMC && choice !== null ? `${LETTERS[choice]}) ${q.choices![choice]}` : spr;
    const ctrl = new AbortController();
    explainCtrl.current = ctrl;
    setExplain({ loading: true });
    try {
      const text = await explainMistake(q, chosen, accessCode, ctrl.signal);
      setExplain({ loading: false, text });
    } catch (e) {
      if (ctrl.signal.aborted) return;
      setExplain({ loading: false, error: e instanceof Error ? e.message : "Couldn't get an explanation." });
    }
  };

  const total = Math.max(queue.length, 1);
  const progress = (idx + (phase === "feedback" ? 1 : 0)) / total;
  const subjectClass = spec.subject === "mixed" ? "s-mixed" : `s-${spec.subject}`;

  if (intro) {
    return (
      <div className={`session ${subjectClass}`}>
        <header className="session-top">
          <button className="icon-btn" onClick={onQuit} aria-label="Close"><Close /></button>
        </header>
        <div className="intro">
          <p className="intro-kicker">
            {spec.node ? `${LEVEL_NAME[spec.node.level]} route` : timed ? "Test pacing" : "Before you start"}
          </p>
          <h1 className="intro-title">{spec.title}</h1>
          {timed ? (
            <p className="intro-tip">
              {spec.questions.length} questions in {Math.round((spec.timeLimitSec ?? 0) / 60)} minutes, the same pace as the real test.
              You'll see your results at the end. Missed questions go into your review pile.
            </p>
          ) : (
            <div className="tip-card">
              <Spark size={18} className="tip-icon" />
              <p>{spec.tip}</p>
            </div>
          )}
          <button className="btn primary wide" onClick={() => { setIntro(false); startedAt.current = Date.now(); }} autoFocus>
            {timed ? "Start the clock" : "Start"}
          </button>
        </div>
      </div>
    );
  }

  if (!q) return null;
  const hasPassage = !!(q.passage || q.passage2 || (q.table && q.subject === "rw"));

  return (
    <div className={`session ${subjectClass}`}>
      <header className="session-top">
        <button className="icon-btn" onClick={() => setConfirmQuit(true)} aria-label="Quit session"><Close /></button>
        <div className="bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
          <div className="bar-fill" style={{ width: `${Math.max(4, progress * 100)}%` }} />
        </div>
        {timed ? (
          <span className={timeLeft < 60 ? "timer low" : "timer"}><Clock size={16} /> {fmtTime(timeLeft)}</span>
        ) : (
          <span className="counter">{Math.min(idx + 1, total)}/{total}</span>
        )}
      </header>

      <main className={hasPassage ? "qwrap split" : "qwrap"}>
        {hasPassage && (
          <section className="passage-card" aria-label="Passage">
            {q.passage && <p className="passage"><MathText text={q.passage} /></p>}
            {q.passage2 && <p className="passage second"><MathText text={q.passage2} /></p>}
            {q.subject === "rw" && <Table q={q} />}
          </section>
        )}
        <section className="question-pane">
          {isRepeat && <p className="repeat-tag">Second try</p>}
          {q.subject === "math" && <Table q={q} />}
          <p className="stem"><MathText text={q.stem} /></p>

          {isMC ? (
            <div className="choices" role="radiogroup" aria-label="Answer choices">
              {q.choices!.map((c, i) => {
                let cls = "choice";
                if (phase === "answer" && choice === i) cls += " picked";
                if (phase === "feedback") {
                  if (i === q.answer) cls += " right";
                  else if (i === choice) cls += " wrong";
                  else cls += " dim";
                }
                return (
                  <button
                    key={i}
                    role="radio"
                    aria-checked={choice === i}
                    className={cls}
                    disabled={phase === "feedback"}
                    onClick={() => setChoice(i)}
                  >
                    <span className="letter">{LETTERS[i]}</span>
                    <span className="choice-text"><MathText text={c} /></span>
                  </button>
                );
              })}
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (phase === "answer") check(); else advance(); }}>
              <label className="field-label" htmlFor="spr">Your answer</label>
              <input
                id="spr"
                className={`text-input spr ${phase === "feedback" ? (wasRight ? "right" : "wrong") : ""}`}
                value={spr}
                inputMode="decimal"
                autoComplete="off"
                disabled={phase === "feedback"}
                onChange={(e) => setSpr(e.target.value.slice(0, 12))}
                placeholder="Type a number"
                autoFocus
              />
              <p className="hint">Fractions like 3/4 and decimals like 0.75 both work.</p>
            </form>
          )}
        </section>
      </main>

      <footer className={`session-foot ${phase === "feedback" ? (wasRight ? "good" : "bad") : ""}`} aria-live="polite">
        {phase === "feedback" && (
          <div className="feedback">
            <p className="feedback-head">
              {wasRight ? <><Check size={20} /> {praise}</> : (
                <>Not quite. Correct answer: {isMC ? <strong>{LETTERS[q.answer!]}</strong> : <strong>{q.accepted?.[0]}</strong>}</>
              )}
            </p>
            <p className="feedback-body"><MathText text={q.explanation} /></p>
            {!wasRight && aiReady && !explain && (
              <button className="link-btn why" onClick={askWhy}><Spark size={16} /> Why was I wrong?</button>
            )}
            {explain?.loading && <p className="feedback-body muted">Thinking about your answer…</p>}
            {explain?.text && <p className="feedback-body ai"><MathText text={explain.text} /></p>}
            {explain?.error && <p className="feedback-body muted">{explain.error}</p>}
          </div>
        )}
        <button
          className={`btn wide ${phase === "feedback" ? (wasRight ? "good" : "bad") : "primary"}`}
          disabled={phase === "answer" && !canCheck}
          onClick={phase === "answer" ? check : advance}
        >
          {phase === "answer" ? (showsFeedback ? "Check" : idx + 1 >= queue.length ? "Finish" : "Next") : "Continue"}
        </button>
      </footer>

      {confirmQuit && (
        <div className="sheet-backdrop" onClick={() => setConfirmQuit(false)}>
          <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="quit-title" onClick={(e) => e.stopPropagation()}>
            <h2 id="quit-title" className="sheet-title">Leave this session?</h2>
            <p className="sheet-text">Answers from this session won't be saved.</p>
            <button className="btn primary wide" onClick={() => setConfirmQuit(false)} autoFocus>Keep going</button>
            <button className="btn ghost wide" onClick={onQuit}>Leave</button>
          </div>
        </div>
      )}
    </div>
  );
}
