"use client";
import type { AppState, Subject } from "@/lib/types";
import type { TodayPlan } from "@/lib/engine";
import { levelFromScore } from "@/lib/engine";
import { LEVEL_NAME } from "@/lib/curriculum";
import { SUBJECT_NAME, TESTS } from "@/lib/scales";
import { Mountain } from "./Icons";

export default function PlanReady({ state, plan, onStart }: { state: AppState; plan: TodayPlan; onStart: () => void }) {
  const p = state.profile!;
  const lessons = plan.paths.rw.totalLessons + plan.paths.math.totalLessons;
  return (
    <div className="plan-ready">
      <Mountain size={52} className="brand-mark" />
      <h1 className="q-title">Your route is set, {p.name}.</h1>
      <div className="plan-grid">
        {(["rw", "math"] as Subject[]).map((s) => (
          <div key={s} className={`plan-card s-${s}`}>
            <p className="plan-sub">{SUBJECT_NAME[s]}</p>
            <p className="plan-big">{p.start[s]} <span aria-hidden>to</span> {p.target[s]}</p>
            <p className="plan-sub">Starting at {LEVEL_NAME[levelFromScore(p.start[s])]}, {plan.paths[s].totalLessons} lessons</p>
          </div>
        ))}
      </div>
      <p className="note">
        {lessons} lessons over {plan.daysLeft} days until your {TESTS[p.test].name}. Today you'll do
        {" "}{plan.lessonsTarget} {plan.lessonsTarget === 1 ? "lesson" : "lessons"} in {SUBJECT_NAME[plan.subject]}.
        Days alternate between subjects, and each one starts with a quick review of the last.
        {plan.crunch ? " Your test is soon, so the route focuses on the skills worth the most points, with a timed section each week." : ""}
      </p>
      <button className="btn primary wide" onClick={onStart}>Start climbing</button>
    </div>
  );
}
