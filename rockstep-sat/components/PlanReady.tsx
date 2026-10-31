"use client";
import type { AppState, Subject } from "@/lib/types";
import type { TodayPlan } from "@/lib/engine";
import { endLevelFor, hasScore, levelFromScore } from "@/lib/engine";
import { LEVEL_NAME, domainsFor, skillsFor } from "@/lib/curriculum";
import { SUBJECT_NAME, TESTS } from "@/lib/scales";
import { Mountain } from "./Icons";

export function PlacementIntro({ state, onStart, onLater }: { state: AppState; onStart: () => void; onLater: () => void }) {
  const p = state.profile!;
  return (
    <div className="plan-ready">
      <Mountain size={52} className="brand-mark" />
      <h1 className="q-title">First, let's see what you already know.</h1>
      <p className="lede">
        {hasScore(p)
          ? `Your ${TESTS[p.last!.test].name} scores set how hard your questions start. Placement checks every skill at that level so you can skip the ones you've got.`
          : "Placement finds your starting level and checks every skill so you can skip the ones you've got."}
      </p>
      <ol className="steps">
        <li className="step"><span className="step-mark">1</span><span><span className="step-label">8 short checks</span><span className="step-sub">One for each area of the test, 3 to 10 questions each.</span></span></li>
        <li className="step"><span className="step-mark">2</span><span><span className="step-label">It adapts as you go</span><span className="step-sub">Get a question right and the next one on that skill is harder.</span></span></li>
        <li className="step"><span className="step-mark">3</span><span><span className="step-label">Stop anytime between checks</span><span className="step-sub">About 35 minutes in total. Your progress is saved after each check.</span></span></li>
      </ol>
      <button className="btn primary wide" onClick={onStart}>Start the first check</button>
      <button className="btn ghost wide" onClick={onLater}>Later</button>
    </div>
  );
}

export default function PlanReady({ state, plan, onStart }: { state: AppState; plan: TodayPlan; onStart: () => void }) {
  const p = state.profile!;
  const lessons = plan.paths.rw.totalLessons + plan.paths.math.totalLessons;
  const known = (s: Subject) => {
    const start = levelFromScore(p.start[s]);
    const skills = domainsFor(s).flatMap((d) => skillsFor(d.id));
    return { known: skills.filter((k) => (state.placement?.skills[k.id] ?? 0) >= start).length, total: skills.length };
  };
  return (
    <div className="plan-ready">
      <Mountain size={52} className="brand-mark" />
      <h1 className="q-title">Your route is set, {p.name}.</h1>
      <div className="plan-grid">
        {(["rw", "math"] as Subject[]).map((s) => {
          const start = levelFromScore(p.start[s]);
          const k = known(s);
          return (
            <div key={s} className={`plan-card s-${s}`}>
              <p className="plan-sub">{SUBJECT_NAME[s]}</p>
              <p className="plan-big">{p.start[s]} <span aria-hidden>to</span> {p.target[s]}</p>
              <p className="plan-sub">
                Starts at {LEVEL_NAME[start]}, climbs to {LEVEL_NAME[endLevelFor(p.target[s], start)]}.
                {" "}You already know {k.known} of {k.total} skills at your starting level. {plan.paths[s].totalLessons} lessons.
              </p>
            </div>
          );
        })}
      </div>
      <p className="note">
        {lessons} lessons over {plan.daysLeft} days until your {TESTS[p.test].name}. Lessons get harder as you climb, and every
        skill ends at the top level. Days alternate between subjects, each starting with a quick review of the last.
        {plan.crunch ? " Your test is soon, so the route focuses on the skills worth the most points, with a timed section each week." : ""}
      </p>
      <button className="btn primary wide" onClick={onStart}>Start climbing</button>
    </div>
  );
}
