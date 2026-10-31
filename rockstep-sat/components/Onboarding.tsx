"use client";
import { useMemo, useState } from "react";
import type { Grade, Profile, TestType } from "@/lib/types";
import { TESTS, TEST_ORDER, clampToScale, gradeNote, validateSection } from "@/lib/scales";
import { addDays, daysBetween, isoDate } from "@/lib/dates";
import { Mountain } from "./Icons";

export interface OnboardingResult {
  profile: Profile;
}

const STEPS = ["name", "grade", "test", "date", "score", "goal"] as const;

export function ScoreField({
  label, value, onChange, test,
}: { label: string; value: string; onChange: (v: string) => void; test: TestType }) {
  const n = Number(value);
  const err = value === "" ? null : validateSection(n, test);
  const step = (d: number) => {
    const base = value === "" ? Math.round((TESTS[test].section.min + TESTS[test].section.max) / 20) * 10 : n;
    onChange(String(clampToScale(base + d, test)));
  };
  const { min, max } = TESTS[test].section;
  return (
    <div className="score-field">
      <label className="field-label" htmlFor={`f-${label}`}>{label}</label>
      <div className="stepper">
        <button type="button" className="step-btn" onClick={() => step(-10)} aria-label={`Lower ${label} by 10`}>−</button>
        <input
          id={`f-${label}`}
          inputMode="numeric"
          className="score-input"
          value={value}
          placeholder={`${min}–${max}`}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, "").slice(0, 3))}
        />
        <button type="button" className="step-btn" onClick={() => step(10)} aria-label={`Raise ${label} by 10`}>+</button>
      </div>
      {err && <p className="field-error">{err}</p>}
    </div>
  );
}

export default function Onboarding({ onComplete }: { onComplete: (r: OnboardingResult) => void }) {
  const today = isoDate();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState<Grade | null>(null);
  const [test, setTest] = useState<TestType | null>(null);
  const [date, setDate] = useState("");
  const [hasScore, setHasScore] = useState<boolean | null>(null);
  const [lastTest, setLastTest] = useState<TestType>("PSAT_NMSQT");
  const [lastRw, setLastRw] = useState("");
  const [lastMath, setLastMath] = useState("");
  const [goalRw, setGoalRw] = useState("");
  const [goalMath, setGoalMath] = useState("");

  const days = date ? daysBetween(today, date) : null;
  const lastValid = hasScore === false || (hasScore === true && lastRw !== "" && lastMath !== "" &&
    !validateSection(Number(lastRw), lastTest) && !validateSection(Number(lastMath), lastTest));

  const goalErrors = useMemo(() => {
    if (!test) return true;
    return goalRw === "" || goalMath === "" || !!validateSection(Number(goalRw), test) || !!validateSection(Number(goalMath), test);
  }, [goalRw, goalMath, test]);

  const canNext = [
    name.trim().length > 0,
    grade !== null,
    test !== null,
    days !== null && days >= 1 && days <= 730,
    hasScore !== null && lastValid,
    !goalErrors,
  ][step];

  const next = () => {
    if (!canNext) return;
    if (STEPS[step] === "score" && test) {
      // Suggest goals the first time we reach the goal step.
      if (goalRw === "" && goalMath === "") {
        const { min, max } = TESTS[test].section;
        const mid = Math.round((min + max) / 20) * 10;
        const base = (v: string) => (hasScore ? clampToScale(Number(v), test) : mid);
        setGoalRw(String(clampToScale(base(lastRw) + 70, test)));
        setGoalMath(String(clampToScale(base(lastMath) + 70, test)));
      }
    }
    if (step < STEPS.length - 1) setStep(step + 1);
    else finish();
  };

  const finish = () => {
    if (!grade || !test) return;
    const start = hasScore
      ? { rw: clampToScale(Number(lastRw), test), math: clampToScale(Number(lastMath), test) }
      : { rw: 0, math: 0 };
    onComplete({
      profile: {
        name: name.trim(),
        grade,
        test,
        testDate: date,
        last: hasScore ? { test: lastTest, rw: Number(lastRw), math: Number(lastMath) } : undefined,
        target: { rw: Number(goalRw), math: Number(goalMath) },
        start,
        createdAt: today,
      },
    });
  };

  const note = grade && test ? gradeNote(grade, test) : null;
  const t = test ? TESTS[test] : null;

  return (
    <div className="onboard">
      <div className="onboard-top">
        {step > 0 ? (
          <button className="link-btn" onClick={() => setStep(step - 1)}>Back</button>
        ) : <span />}
        <div className="dots" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
          {STEPS.map((s, i) => <span key={s} className={i <= step ? "dot on" : "dot"} />)}
        </div>
        <span />
      </div>

      <form
        className="onboard-body"
        onSubmit={(e) => { e.preventDefault(); next(); }}
      >
        {STEPS[step] === "name" && (
          <>
            <div className="brand-hero">
              <Mountain size={56} className="brand-mark" />
              <h1 className="brand-title">Rockstep SAT</h1>
              <p className="lede">A short climb every day, from today's score to your goal score.</p>
            </div>
            <label className="field-label" htmlFor="name">What should we call you?</label>
            <input id="name" className="text-input" value={name} autoComplete="given-name"
              onChange={(e) => setName(e.target.value.slice(0, 30))} placeholder="First name" autoFocus />
          </>
        )}

        {STEPS[step] === "grade" && (
          <>
            <h2 className="q-title">What grade are you in, {name.trim()}?</h2>
            <div className="choice-grid four">
              {([9, 10, 11, 12] as Grade[]).map((g) => (
                <button type="button" key={g} className={grade === g ? "tile on" : "tile"} onClick={() => setGrade(g)}>
                  <span className="tile-big">{g}th</span>
                </button>
              ))}
            </div>
          </>
        )}

        {STEPS[step] === "test" && (
          <>
            <h2 className="q-title">Which test are you taking next?</h2>
            <div className="choice-list">
              {TEST_ORDER.map((id) => (
                <button type="button" key={id} className={test === id ? "tile row on" : "tile row"} onClick={() => setTest(id)}>
                  <span className="tile-name">{TESTS[id].name}</span>
                  <span className="tile-sub">Scored {TESTS[id].total.min}–{TESTS[id].total.max}</span>
                </button>
              ))}
            </div>
            {note && <p className="note">{note}</p>}
          </>
        )}

        {STEPS[step] === "date" && t && (
          <>
            <h2 className="q-title">When is your {t.name}?</h2>
            <input type="date" className="text-input" value={date} min={addDays(today, 1)} max={addDays(today, 730)}
              onChange={(e) => setDate(e.target.value)} />
            {days !== null && days >= 1 && (
              <p className="note">
                {days} days to go. Your daily lesson count is set from this, and it adjusts as you go.
                {days <= 30 ? " Since it's soon, your route will focus on the skills worth the most points." : ""}
              </p>
            )}
            {days !== null && days < 1 && <p className="field-error">Pick a date after today.</p>}
          </>
        )}

        {STEPS[step] === "score" && t && (
          <>
            <h2 className="q-title">Do you have a recent PSAT or SAT score?</h2>
            <div className="choice-grid two">
              <button type="button" className={hasScore === true ? "tile on" : "tile"} onClick={() => { setHasScore(true); if (lastRw === "" && test) setLastTest(test); }}>Yes</button>
              <button type="button" className={hasScore === false ? "tile on" : "tile"} onClick={() => setHasScore(false)}>Not yet</button>
            </div>
            {hasScore === true && (
              <div className="stack">
                <label className="field-label" htmlFor="lt">Which test was it?</label>
                <select id="lt" className="text-input" value={lastTest} onChange={(e) => setLastTest(e.target.value as TestType)}>
                  {TEST_ORDER.map((id) => <option key={id} value={id}>{TESTS[id].name}</option>)}
                </select>
                <div className="pair">
                  <ScoreField label="Reading & Writing" value={lastRw} onChange={setLastRw} test={lastTest} />
                  <ScoreField label="Math" value={lastMath} onChange={setLastMath} test={lastTest} />
                </div>
                <p className="note">The PSATs and SAT share one score scale, so a PSAT score carries straight over. Your score sets how hard your questions start. Next, a short placement finds the skills you already know so you can skip them.</p>
              </div>
            )}
            {hasScore === false && (
              <p className="note">No problem. Next you'll take a placement that finds your starting point and the skills you already know.</p>
            )}
          </>
        )}

        {STEPS[step] === "goal" && t && (
          <>
            <h2 className="q-title">What score are you aiming for?</h2>
            <p className="note">{t.name} sections run {t.section.min}–{t.section.max}.</p>
            <div className="pair">
              <ScoreField label="Reading & Writing" value={goalRw} onChange={setGoalRw} test={t.id} />
              <ScoreField label="Math" value={goalMath} onChange={setGoalMath} test={t.id} />
            </div>
            {!goalErrors && (
              <p className="goal-total">Total goal <strong>{Number(goalRw) + Number(goalMath)}</strong></p>
            )}
          </>
        )}

        <div className="onboard-actions">
          <button type="submit" className="btn primary wide" disabled={!canNext}>
            {step === STEPS.length - 1 ? "Continue to placement" : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}
