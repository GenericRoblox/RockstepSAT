"use client";
import type { AppState, Subject } from "@/lib/types";
import type { TodayPlan } from "@/lib/engine";
import { accuracy, projectedScore } from "@/lib/engine";
import { DOMAINS, skillById } from "@/lib/curriculum";
import { SUBJECT_NAME } from "@/lib/scales";
import { addDays } from "@/lib/dates";
import { getQuestion } from "@/lib/sessions";
import { Snow } from "./Icons";
import { StatBar } from "./Home";

function domainAccuracy(state: AppState) {
  const by: Record<string, { right: number; total: number }> = {};
  for (const [id, a] of Object.entries(state.answers)) {
    const q = getQuestion(state, id);
    if (!q) continue;
    const d = skillById(q.skill).domain;
    by[d] ??= { right: 0, total: 0 };
    by[d].right += a.right;
    by[d].total += a.right + a.wrong;
  }
  return by;
}


export default function ProgressView({ state, plan, onPracticeMistakes }: { state: AppState; plan: TodayPlan; onPracticeMistakes: () => void }) {
  const p = state.profile!;
  const byDomain = domainAccuracy(state);
  const days = Array.from({ length: 28 }, (_, i) => addDays(plan.today, i - 27));
  const frozen = new Set(state.streak.frozenDates);

  return (
    <div className="page">
      <header className="home-top">
        <h1 className="page-title">Progress</h1>
        <StatBar state={state} />
      </header>

      <div className="plan-grid">
        {(["rw", "math"] as Subject[]).map((s) => {
          const acc = accuracy(state, s);
          const path = plan.paths[s];
          return (
            <section key={s} className={`plan-card s-${s}`}>
              <p className="plan-sub">{SUBJECT_NAME[s]}</p>
              <p className="plan-big">{p.start[s] ? projectedScore(state, s, path) : "–"}</p>
              <p className="plan-sub">{p.start[s] ? `Projected. Started at ${p.start[s]}, goal ${p.target[s]}.` : `Finish placement to see a projection. Goal ${p.target[s]}.`}</p>
              <p className="plan-sub">{path.doneLessons} of {path.totalLessons} lessons{acc !== null ? `, ${Math.round(acc * 100)}% recent accuracy` : ""}</p>
            </section>
          );
        })}
      </div>
      <p className="hint">Projections are estimates based on your progress and accuracy, not official scores.</p>

      <section className="panel">
        <h2 className="panel-title">Accuracy by area</h2>
        {DOMAINS.map((d) => {
          const v = byDomain[d.id];
          const pct = v && v.total ? Math.round((v.right / v.total) * 100) : null;
          return (
            <div key={d.id} className={`acc-row s-${d.subject}`}>
              <span className="acc-name">{d.name}</span>
              <span className="acc-track"><span className="acc-fill" style={{ width: `${pct ?? 0}%` }} /></span>
              <span className="acc-num">{pct === null ? "–" : `${pct}%`}</span>
            </div>
          );
        })}
      </section>

      <section className="panel">
        <h2 className="panel-title">Last four weeks</h2>
        <div className="cal" role="img" aria-label="Study days in the last four weeks">
          {days.map((d) => {
            const log = state.days[d];
            const cls = log ? `cal-day on s-${log.subject}` : frozen.has(d) ? "cal-day frozen" : "cal-day";
            return (
              <span key={d} className={cls} title={d}>
                {frozen.has(d) && !log ? <Snow size={12} /> : null}
              </span>
            );
          })}
        </div>
        <p className="hint">Current streak {state.streak.count}, best {state.streak.best}. Every 7-day streak earns a freeze (hold up to 2).</p>
      </section>

      <section className="panel">
        <h2 className="panel-title">Review pile</h2>
        <p className="hint">{state.mistakes.length === 0 ? "No missed questions waiting. Nice." : `${state.mistakes.length} missed questions waiting for another try.`}</p>
        {state.mistakes.length > 0 && <button className="btn ghost wide" onClick={onPracticeMistakes}>Practice mistakes</button>}
      </section>
    </div>
  );
}
