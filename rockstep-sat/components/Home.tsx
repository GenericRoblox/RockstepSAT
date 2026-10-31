"use client";
import { useEffect, useRef, useState } from "react";
import type { AppState, PathNode, Subject } from "@/lib/types";
import type { NextAction, TodayPlan } from "@/lib/engine";
import { isDone, projectedScore } from "@/lib/engine";
import { LEVEL_NAME } from "@/lib/curriculum";
import { SUBJECT_NAME, TESTS } from "@/lib/scales";
import { prettyDate } from "@/lib/dates";
import Hold from "./Hold";
import { Check, Chalk, Flag, Flame, Lock, Skip, Snow } from "./Icons";

interface Props {
  state: AppState;
  plan: TodayPlan;
  onAction: (a: NextAction) => void;
  onOpenNode: (n: PathNode) => void;
  onGoSettings: () => void;
  preparing: string | null;
}

export function StatBar({ state }: { state: AppState }) {
  return (
    <div className="statbar">
      <span className="stat flame" title="Day streak"><Flame size={22} /> {state.streak.count}</span>
      <span className="stat snow" title="Streak freezes"><Snow size={18} /> {state.streak.freezes}</span>
      <span className="stat chalk" title="Chalk points (XP)"><Chalk size={20} /> {state.xp}</span>
    </div>
  );
}

function actionLabel(a: NextAction | null, plan: TodayPlan): string {
  if (!a) return "";
  switch (a.kind) {
    case "review": return "Start warm-up";
    case "node":
      return a.node.kind === "checkpoint" ? "Take the checkpoint" : a.node.kind === "testout" ? a.node.title : plan.lessonsDone > 0 ? "Next lesson" : "Start today's lesson";
    case "timed": return "Start timed section";
    case "light": return "Start final review";
    case "bonus": return a.node ? "Keep climbing" : "Practice mistakes";
  }
}

function TodayCard({ state, plan, onAction, onGoSettings, preparing }: Props) {
  const p = state.profile!;
  const test = TESTS[p.test].name;

  if (plan.status === "after") {
    return (
      <section className="today">
        <h2 className="today-title">Your {test} date has passed</h2>
        <p className="today-sub">How did it go? Add your new scores and your next test date to set a fresh route.</p>
        <button className="btn primary wide" onClick={onGoSettings}>Update my test and scores</button>
      </section>
    );
  }
  if (plan.status === "testday") {
    return (
      <section className="today">
        <h2 className="today-title">Test day. You're ready.</h2>
        <p className="today-sub">No lessons today. Charge your device, bring your ID, eat breakfast, and get there early. Pace yourself and skip around on hard questions.</p>
      </section>
    );
  }

  const rows: { label: string; done: boolean; sub?: string }[] = [];
  if (plan.status === "light") {
    rows.push({ label: "Final review of your mistakes", done: plan.goalMet, sub: "No new lessons. Keep it light and get good sleep." });
  } else {
    if (plan.review) {
      rows.push({ label: `Warm-up: ${SUBJECT_NAME[plan.review.subject]} review`, done: plan.reviewDone, sub: "5 questions from your last session" });
    }
    if (plan.lessonsTarget > 0) {
      rows.push({
        label: `${SUBJECT_NAME[plan.subject]} lessons`,
        done: plan.lessonsDone >= plan.lessonsTarget,
        sub: `${Math.min(plan.lessonsDone, plan.lessonsTarget)} of ${plan.lessonsTarget} done`,
      });
    }
    if (plan.timedNeeded) {
      rows.push({ label: "Timed mini-section", done: plan.timedDone, sub: "Weekly pacing practice" });
    }
  }

  const label = actionLabel(plan.next, plan);
  const canGo = plan.next && !(plan.next.kind === "bonus" && !plan.next.node && state.mistakes.length === 0);

  return (
    <section className={`today s-${plan.subject}`}>
      <p className="today-kicker">Day {plan.dayNumber}</p>
      <h2 className="today-title">
        {plan.status === "light" ? "Final review" : `${SUBJECT_NAME[plan.subject]} day`}
      </h2>
      <p className="today-sub">
        {plan.daysLeft === 1 ? `Your ${test} is tomorrow.` : `${plan.daysLeft} days until your ${test} on ${prettyDate(p.testDate)}.`}
      </p>
      <ol className="steps">
        {rows.map((r) => (
          <li key={r.label} className={r.done ? "step done" : "step"}>
            <span className="step-mark">{r.done ? <Check size={16} /> : null}</span>
            <span>
              <span className="step-label">{r.label}</span>
              {r.sub && <span className="step-sub">{r.sub}</span>}
            </span>
          </li>
        ))}
      </ol>
      {plan.goalMet && <p className="goal-met">Today's goal is done. Anything more is extra credit.</p>}
      {canGo && (
        <button className={plan.goalMet ? "btn ghost wide" : "btn primary wide"} onClick={() => plan.next && onAction(plan.next)} disabled={!!preparing}>
          {preparing ?? label}
        </button>
      )}
    </section>
  );
}

function Scores({ state, plan }: { state: AppState; plan: TodayPlan }) {
  const p = state.profile!;
  const { min, max } = TESTS[p.test].section;
  const pct = (v: number) => ((v - min) / (max - min)) * 100;
  return (
    <section className="scores">
      {(["rw", "math"] as Subject[]).map((s) => {
        const proj = projectedScore(state, s, plan.paths[s]);
        return (
          <div key={s} className={`score-row s-${s}`}>
            <div className="score-head">
              <span className="score-name">{SUBJECT_NAME[s]}</span>
              <span className="score-nums"><strong>{proj}</strong> projected, goal {p.target[s]}</span>
            </div>
            <div className="score-track">
              <div className="score-fill" style={{ width: `${pct(proj)}%` }} />
              <div className="score-goal" style={{ left: `${pct(p.target[s])}%` }} />
            </div>
          </div>
        );
      })}
    </section>
  );
}

function RouteWall({ state, plan, subject, onOpenNode }: { state: AppState; plan: TodayPlan; subject: Subject; onOpenNode: (n: PathNode) => void }) {
  const path = plan.paths[subject];
  const currentRef = useRef<HTMLButtonElement | null>(null);
  const p = state.profile!;

  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: "center", behavior: "auto" });
  }, [subject]);

  let i = 0;
  const units = [...path.units].reverse();
  return (
    <div className={`wall s-${subject}`}>
      <div className="summit">
        <Flag size={22} />
        <span>Goal: {p.target[subject]}</span>
      </div>
      {path.setAside > 0 && (
        <p className="set-aside">{path.setAside} lower-priority lessons are set aside so you can finish by test day.</p>
      )}
      {units.map((u) => {
        const nodes = [...u.nodes].reverse();
        return (
          <div key={u.id} className="unit">
            <ol className="holds">
              {nodes.map((n) => {
                const k = i++;
                const done = isDone(state, n);
                const current = path.current?.id === n.id;
                const locked = !done && !current;
                const failedCp = n.kind === "checkpoint" && state.completed[n.id] && !state.completed[n.id].passed;
                const offset = Math.round(Math.sin(k * 1.15) * 34);
                const cls = ["hold", n.kind, done ? "done" : "", current ? "current" : "", locked ? "locked" : ""].join(" ");
                const to = n.kind === "testout" ? state.testOuts[n.id] : undefined;
                return (
                  <li key={n.id} className="hold-li" style={{ transform: `translateX(${offset}%)` }}>
                    <button
                      ref={current ? currentRef : undefined}
                      className={cls}
                      onClick={() => onOpenNode(n)}
                      disabled={locked}
                      aria-label={`${n.title}${done ? ", done" : current ? ", up next" : ", locked"}`}
                    >
                      <Hold variant={k} size={n.kind === "checkpoint" ? 84 : 70} />
                      <span className="hold-icon">
                        {done ? <Check size={26} /> : n.kind === "checkpoint" ? <Flag size={24} /> : n.kind === "testout" ? <Skip size={22} /> : locked ? <Lock size={18} /> : null}
                      </span>
                    </button>
                    <span className={current ? "hold-label current" : "hold-label"}>
                      {n.title}
                      {to === "passed" && " (tested out)"}
                      {failedCp && " (try again)"}
                    </span>
                  </li>
                );
              })}
            </ol>
            <div className="route-tag">
              <span className="tag-level">{u.kind === "testout" ? "Placement" : LEVEL_NAME[u.level]}</span>
              <span className="tag-name">{u.title}</span>
            </div>
          </div>
        );
      })}
      <div className="ground">Start: {p.start[subject]}</div>
    </div>
  );
}

export default function Home(props: Props) {
  const { state, plan, onOpenNode } = props;
  const [subject, setSubject] = useState<Subject>(plan.subject);
  useEffect(() => setSubject(plan.subject), [plan.subject]);
  const name = state.profile!.name;

  return (
    <div className="home">
      <header className="home-top">
        <span className="wordmark">Rockstep</span>
        <StatBar state={state} />
      </header>
      <p className="greeting">Hi {name}.</p>
      <TodayCard {...props} />
      <Scores state={state} plan={plan} />
      <section className="route-section">
        <div className="seg" role="tablist" aria-label="Route">
          {(["rw", "math"] as Subject[]).map((s) => (
            <button key={s} role="tab" aria-selected={subject === s} className={subject === s ? `seg-btn on s-${s}` : "seg-btn"} onClick={() => setSubject(s)}>
              {SUBJECT_NAME[s]}
              <span className="seg-count">{plan.paths[s].doneLessons}/{plan.paths[s].totalLessons}</span>
            </button>
          ))}
        </div>
        <RouteWall state={state} plan={plan} subject={subject} onOpenNode={onOpenNode} />
      </section>
    </div>
  );
}
