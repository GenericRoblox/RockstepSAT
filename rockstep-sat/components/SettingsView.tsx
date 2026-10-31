"use client";
import { useEffect, useRef, useState } from "react";
import type { AppState, Grade, TestType } from "@/lib/types";
import { TESTS, TEST_ORDER, clampToScale, gradeNote, validateSection } from "@/lib/scales";
import { addDays, isoDate } from "@/lib/dates";
import { exportBackup, importBackup } from "@/lib/storage";
import { getAIStatus, type AIStatus } from "@/lib/ai-client";
import { ScoreField } from "./Onboarding";

interface Props {
  state: AppState;
  onUpdate: (fn: (s: AppState) => AppState) => void;
  onReplace: (s: AppState) => void;
  onReset: () => void;
}

export default function SettingsView({ state, onUpdate, onReplace, onReset }: Props) {
  const p = state.profile!;
  const today = isoDate();
  const [name, setName] = useState(p.name);
  const [grade, setGrade] = useState<Grade>(p.grade);
  const [test, setTest] = useState<TestType>(p.test);
  const [date, setDate] = useState(p.testDate);
  const [goalRw, setGoalRw] = useState(String(p.target.rw));
  const [goalMath, setGoalMath] = useState(String(p.target.math));
  const [saved, setSaved] = useState<string | null>(null);

  const [newTest, setNewTest] = useState<TestType>(p.test);
  const [newRw, setNewRw] = useState("");
  const [newMath, setNewMath] = useState("");

  const [ai, setAi] = useState<AIStatus | null | undefined>(undefined);
  const [code, setCode] = useState(state.settings.accessCode ?? "");
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => { getAIStatus(true).then(setAi); }, []);

  const flash = (msg: string) => { setSaved(msg); setTimeout(() => setSaved(null), 2500); };

  const profileErrors =
    !name.trim() || !date || date <= today ||
    !!validateSection(Number(goalRw), test) || !!validateSection(Number(goalMath), test);

  const saveProfile = () => {
    if (profileErrors) return;
    onUpdate((s) => ({
      ...s,
      profile: {
        ...s.profile!,
        name: name.trim(),
        grade,
        test,
        testDate: date,
        target: { rw: Number(goalRw), math: Number(goalMath) },
        start: { rw: clampToScale(s.profile!.start.rw, test), math: clampToScale(s.profile!.start.math, test) },
      },
    }));
    flash("Saved. Your route and daily pace are updated.");
  };

  const scoreErrors = newRw === "" || newMath === "" || !!validateSection(Number(newRw), newTest) || !!validateSection(Number(newMath), newTest);
  const saveScores = () => {
    if (scoreErrors) return;
    onUpdate((s) => ({
      ...s,
      profile: {
        ...s.profile!,
        last: { test: newTest, rw: Number(newRw), math: Number(newMath) },
        start: { rw: clampToScale(Number(newRw), s.profile!.test), math: clampToScale(Number(newMath), s.profile!.test) },
      },
    }));
    setNewRw(""); setNewMath("");
    flash("New scores saved. Your starting point moved, and finished lessons stay finished.");
  };

  const download = () => {
    const blob = new Blob([exportBackup(state)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rockstep-backup-${today}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const restore = async (file: File) => {
    const restored = importBackup(await file.text());
    if (!restored || !restored.profile) { flash("That file isn't a Rockstep backup."); return; }
    onReplace(restored);
    flash("Backup restored.");
  };

  const note = gradeNote(grade, test);
  const aiCount = Object.keys(state.aiBank).length;

  return (
    <div className="page">
      <header className="home-top"><h1 className="page-title">Settings</h1></header>
      {saved && <p className="toast" role="status">{saved}</p>}

      <section className="panel">
        <h2 className="panel-title">Your test</h2>
        <label className="field-label" htmlFor="s-name">Name</label>
        <input id="s-name" className="text-input" value={name} onChange={(e) => setName(e.target.value.slice(0, 30))} />
        <div className="pair">
          <div>
            <label className="field-label" htmlFor="s-grade">Grade</label>
            <select id="s-grade" className="text-input" value={grade} onChange={(e) => setGrade(Number(e.target.value) as Grade)}>
              {[9, 10, 11, 12].map((g) => <option key={g} value={g}>{g}th</option>)}
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="s-test">Test</label>
            <select id="s-test" className="text-input" value={test} onChange={(e) => {
              const t = e.target.value as TestType;
              setTest(t);
              setGoalRw(String(clampToScale(Number(goalRw), t)));
              setGoalMath(String(clampToScale(Number(goalMath), t)));
            }}>
              {TEST_ORDER.map((id) => <option key={id} value={id}>{TESTS[id].name}</option>)}
            </select>
          </div>
        </div>
        {note && <p className="note">{note}</p>}
        <label className="field-label" htmlFor="s-date">Test date</label>
        <input id="s-date" type="date" className="text-input" value={date} min={addDays(today, 1)} onChange={(e) => setDate(e.target.value)} />
        {date && date <= today && <p className="field-error">Pick a date after today.</p>}
        <div className="pair">
          <ScoreField label="Reading & Writing goal" value={goalRw} onChange={setGoalRw} test={test} />
          <ScoreField label="Math goal" value={goalMath} onChange={setGoalMath} test={test} />
        </div>
        <button className="btn primary wide" disabled={profileErrors} onClick={saveProfile}>Save changes</button>
      </section>

      <section className="panel">
        <h2 className="panel-title">Got a new score?</h2>
        <p className="hint">Current starting point: Reading & Writing {p.start.rw}, Math {p.start.math}.</p>
        <label className="field-label" htmlFor="s-ntest">Which test was it?</label>
        <select id="s-ntest" className="text-input" value={newTest} onChange={(e) => setNewTest(e.target.value as TestType)}>
          {TEST_ORDER.map((id) => <option key={id} value={id}>{TESTS[id].name}</option>)}
        </select>
        <div className="pair">
          <ScoreField label="Reading & Writing" value={newRw} onChange={setNewRw} test={newTest} />
          <ScoreField label="Math" value={newMath} onChange={setNewMath} test={newTest} />
        </div>
        <button className="btn ghost wide" disabled={scoreErrors} onClick={saveScores}>Update starting point</button>
      </section>

      <section className="panel">
        <h2 className="panel-title">AI questions</h2>
        {ai === undefined && <p className="hint">Checking the server…</p>}
        {ai === null && <p className="hint">Couldn't reach the server. The built-in question bank still works.</p>}
        {ai && ai.configured && <p className="hint">Connected to {ai.model}. {aiCount} AI questions saved on this device.</p>}
        {ai && !ai.configured && <p className="hint">Not set up. Add OPENROUTER_API_KEY in your Vercel project settings. Until then, lessons use the built-in bank.</p>}
        {ai?.needsCode && (
          <>
            <label className="field-label" htmlFor="s-code">Access code</label>
            <input id="s-code" className="text-input" value={code} type="password" autoComplete="off" onChange={(e) => setCode(e.target.value)} />
            <button className="btn ghost wide" onClick={() => { onUpdate((s) => ({ ...s, settings: { ...s.settings, accessCode: code.trim() } })); flash("Access code saved."); }}>Save code</button>
          </>
        )}
      </section>

      <section className="panel">
        <h2 className="panel-title">Backup</h2>
        <p className="hint">Progress is saved in this browser. Download a backup now and then, especially before switching devices.</p>
        <div className="pair">
          <button className="btn ghost" onClick={download}>Download backup</button>
          <button className="btn ghost" onClick={() => fileRef.current?.click()}>Restore backup</button>
        </div>
        <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) restore(f); e.target.value = ""; }} />
      </section>

      <section className="panel">
        <h2 className="panel-title">Start over</h2>
        {!confirmReset ? (
          <button className="btn danger-ghost wide" onClick={() => setConfirmReset(true)}>Erase all progress</button>
        ) : (
          <>
            <p className="hint">This deletes your streak, XP, and route on this device. Download a backup first if you might want it.</p>
            <div className="pair">
              <button className="btn ghost" onClick={() => setConfirmReset(false)}>Cancel</button>
              <button className="btn danger" onClick={onReset}>Erase everything</button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
