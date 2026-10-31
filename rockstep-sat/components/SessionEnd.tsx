"use client";
import type { SessionSpec } from "@/lib/types";
import type { SessionSummary } from "@/lib/engine";
import { Chalk, Flame, Snow } from "./Icons";

export default function SessionEnd({
  spec, summary, onContinue,
}: { spec: SessionSpec; summary: SessionSummary; onContinue: () => void }) {
  const pct = summary.total ? Math.round((summary.correct / summary.total) * 100) : 0;
  let title = "Session complete";
  let note = "";
  if (spec.kind === "checkpoint") {
    title = summary.passed ? "Checkpoint cleared" : "Almost there";
    note = summary.passed
      ? "This section of the route is done."
      : `You need ${Math.ceil((spec.passThreshold ?? 0.75) * summary.total)} of ${summary.total} to clear it. Your misses are in your review pile. Try again when you're ready.`;
  } else if (spec.kind === "testout") {
    title = summary.testOut === "passed" ? "Tested out" : "Lessons added";
    note = summary.testOut === "passed"
      ? "You've shown you know this. These lessons are skipped."
      : "A few of these tripped you up, so the lessons for this area were added to your route.";
  } else if (spec.kind === "timed") {
    title = "Time's up";
    note = "Everything you missed is in your review pile.";
  } else if (spec.kind === "lesson") {
    title = pct === 100 ? "Flawless" : "Lesson complete";
  } else if (spec.kind === "review") {
    title = "Warm-up done";
  }

  return (
    <div className="end">
      <div className="end-burst" aria-hidden />
      <h1 className="end-title">{title}</h1>
      {note && <p className="end-note">{note}</p>}
      <div className="end-stats">
        <div className="end-stat">
          <span className="end-num">{summary.correct}/{summary.total}</span>
          <span className="end-label">correct</span>
        </div>
        <div className="end-stat chalk">
          <span className="end-num"><Chalk size={22} /> +{summary.xp}</span>
          <span className="end-label">chalk</span>
        </div>
        <div className="end-stat flame">
          <span className="end-num"><Flame size={22} /> {summary.streakCount}</span>
          <span className="end-label">{summary.streakExtended ? "streak extended" : "day streak"}</span>
        </div>
      </div>
      {summary.freezeEarned && (
        <p className="freeze-earned"><Snow size={18} /> You earned a streak freeze. It saves your streak if you miss a day.</p>
      )}
      <button className="btn primary wide" onClick={onContinue} autoFocus>Continue</button>
    </div>
  );
}
