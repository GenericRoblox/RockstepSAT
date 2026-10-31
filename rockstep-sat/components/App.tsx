"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { AppState, PathNode, Question, SessionResult, SessionSpec } from "@/lib/types";
import {
  applyRollover, applySession, initialState, levelFromScore, planToday,
  type NextAction, type SessionSummary,
} from "@/lib/engine";
import {
  lessonNeedsAI, lightSession, mistakesSession, nodeSession, placementSession, pool, reviewSession, timedSession,
} from "@/lib/sessions";
import { storage } from "@/lib/storage";
import { isoDate } from "@/lib/dates";
import { generateQuestions, getAIStatus, isGenerating, type AIStatus } from "@/lib/ai-client";
import Onboarding, { type OnboardingResult } from "./Onboarding";
import Home from "./Home";
import SessionPlayer from "./SessionPlayer";
import SessionEnd from "./SessionEnd";
import PlanReady, { PlacementIntro } from "./PlanReady";
import ProgressView from "./ProgressView";
import SettingsView from "./SettingsView";
import { Chart, Gear, Mountain } from "./Icons";

type View =
  | { name: "loading" }
  | { name: "onboarding" }
  | { name: "placementIntro" }
  | { name: "ready" }
  | { name: "home" }
  | { name: "progress" }
  | { name: "settings" }
  | { name: "session"; spec: SessionSpec }
  | { name: "end"; spec: SessionSpec; summary: SessionSummary };

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([p, new Promise<T>((_, rej) => setTimeout(() => rej(new Error("timeout")), ms))]);
}

function addToBank(s: AppState, qs: Question[]): AppState {
  if (!qs.length) return s;
  return { ...s, aiBank: { ...s.aiBank, ...Object.fromEntries(qs.map((q) => [q.id, q])) } };
}

export default function App() {
  const [state, setState] = useState<AppState | null>(null);
  const [view, setView] = useState<View>({ name: "loading" });
  const [today, setToday] = useState(isoDate());
  const [ai, setAi] = useState<AIStatus | null>(null);
  const [preparing, setPreparing] = useState<string | null>(null);
  const stateRef = useRef<AppState | null>(null);
  stateRef.current = state;
  const attempted = useRef<Set<string>>(new Set());

  // Load saved progress once.
  useEffect(() => {
    storage.load().then((saved) => {
      const s = applyRollover(saved ?? initialState(), isoDate());
      setState(s);
      setView(s.profile ? { name: "home" } : { name: "onboarding" });
    });
    getAIStatus().then(setAi);
  }, []);

  // Save on every change.
  useEffect(() => {
    if (state) storage.save(state);
  }, [state]);

  // Roll over to a new day if the app stays open past midnight.
  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState !== "visible") return;
      const d = isoDate();
      if (d !== today) {
        setToday(d);
        setState((s) => (s ? applyRollover(s, d) : s));
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [today]);

  const update = useCallback((fn: (s: AppState) => AppState) => setState((s) => (s ? fn(s) : s)), []);
  const plan = useMemo(() => (state?.profile ? planToday(state, today) : null), [state, today]);
  const accessCode = state?.settings.accessCode || undefined;
  const aiReady = !!ai?.configured && (!ai.needsCode || !!accessCode);

  const fetchAI = useCallback(async (node: PathNode): Promise<Question[]> => {
    const s = stateRef.current!;
    const avoid = pool(s, node.skill!, node.level).map((q) => q.stem.slice(0, 80)).slice(0, 10);
    const qs = await generateQuestions(node.skill!, node.level, avoid, accessCode);
    setState((cur) => (cur ? addToBank(cur, qs) : cur));
    return qs;
  }, [accessCode]);

  // Quietly prepare AI questions for the next lessons while the student is on the home screen.
  useEffect(() => {
    if (view.name !== "home" || !aiReady || !plan || !state) return;
    const path = plan.paths[plan.subject];
    const idx = path.current ? path.nodes.indexOf(path.current) : -1;
    const upcoming = idx >= 0 ? path.nodes.slice(idx, idx + 4).filter((n) => n.kind === "lesson").slice(0, 2) : [];
    (async () => {
      for (const n of upcoming) {
        const key = `${n.skill}-${n.level}`;
        if (attempted.current.has(key) || isGenerating(n.skill!, n.level) || !lessonNeedsAI(stateRef.current!, n)) continue;
        attempted.current.add(key);
        try { await fetchAI(n); } catch { /* the bank covers it */ }
      }
    })();
  }, [view.name, aiReady, plan, state, fetchAI]);

  const launch = (spec: SessionSpec) => {
    if (spec.questions.length === 0) return false;
    setView({ name: "session", spec });
    return true;
  };

  const openNode = async (node: PathNode) => {
    let s = stateRef.current!;
    if (node.kind === "lesson" && aiReady && lessonNeedsAI(s, node)) {
      setPreparing("Setting up your lesson…");
      try {
        const qs = await withTimeout(fetchAI(node), 58_000);
        s = addToBank(s, qs);
      } catch {
        // Fall back to the built-in bank.
      } finally {
        setPreparing(null);
      }
    }
    launch(nodeSession(s, node));
  };

  const onAction = (a: NextAction) => {
    const s = stateRef.current!;
    if (!plan) return;
    switch (a.kind) {
      case "review": {
        const spec = reviewSession(s, a.subject, a.date);
        if (!launch(spec)) {
          update((cur) => ({
            ...cur,
            days: {
              ...cur.days,
              [today]: { ...(cur.days[today] ?? { subject: plan.subject, lessons: 0, timed: false, xp: 0, qids: [] }), review: true },
            },
          }));
        }
        break;
      }
      case "node":
        openNode(a.node);
        break;
      case "timed": {
        const lvl = plan.paths[a.subject].current?.level ?? levelFromScore(s.profile!.start[a.subject]);
        launch(timedSession(s, a.subject, lvl));
        break;
      }
      case "light": {
        const spec = lightSession(s);
        if (spec.questions.length < 4) {
          spec.questions = [...spec.questions, ...timedSession(s, "rw", 3).questions.slice(0, 6), ...timedSession(s, "math", 3).questions.slice(0, 6)];
        }
        launch(spec);
        break;
      }
      case "placement":
        launch(placementSession(s, s.profile!, a.domain));
        break;
      case "bonus":
        if (a.node) openNode(a.node);
        else launch(mistakesSession(s));
        break;
    }
  };

  const onOnboarded = ({ profile }: OnboardingResult) => {
    setState({ ...initialState(), profile, placement: { skills: {}, done: [] } });
    setView({ name: "placementIntro" });
  };

  const onSessionDone = (spec: SessionSpec, result: SessionResult) => {
    if (!plan) return;
    const { state: next, summary } = applySession(stateRef.current!, spec, result, today, plan.subject);
    setState(next);
    setView({ name: "end", spec, summary });
  };

  if (!state || view.name === "loading") {
    return (
      <div className="splash" aria-busy="true">
        <Mountain size={56} className="brand-mark" />
        <span className="wordmark">Rockstep</span>
      </div>
    );
  }

  if (view.name === "onboarding") return <Onboarding onComplete={onOnboarded} />;

  if (view.name === "session") {
    return (
      <SessionPlayer
        key={view.spec.title + view.spec.questions.map((q) => q.id).join()}
        spec={view.spec}
        aiReady={aiReady}
        accessCode={accessCode}
        onDone={(r) => onSessionDone(view.spec, r)}
        onQuit={() => setView({ name: "home" })}
      />
    );
  }

  if (view.name === "end") {
    const toReady = view.summary.placementDone;
    return <SessionEnd spec={view.spec} summary={view.summary} onContinue={() => setView(toReady ? { name: "ready" } : { name: "home" })} />;
  }

  if (!plan) return null;
  if (view.name === "ready") return <PlanReady state={state} plan={plan} onStart={() => setView({ name: "home" })} />;
  if (view.name === "placementIntro") {
    return (
      <PlacementIntro
        state={state}
        onStart={() => onAction({ kind: "placement", domain: plan.next?.kind === "placement" ? plan.next.domain : "ii" })}
        onLater={() => setView({ name: "home" })}
      />
    );
  }

  return (
    <div className="shell">
      <main className="shell-main">
        {view.name === "home" && (
          <Home
            state={state}
            plan={plan}
            onAction={onAction}
            onOpenNode={openNode}
            onGoSettings={() => setView({ name: "settings" })}
            preparing={preparing}
          />
        )}
        {view.name === "progress" && (
          <ProgressView state={state} plan={plan} onPracticeMistakes={() => launch(mistakesSession(state))} />
        )}
        {view.name === "settings" && (
          <SettingsView
            state={state}
            onUpdate={update}
            onReplace={(s) => setState(applyRollover(s, today))}
            onReset={() => { setState(initialState()); setView({ name: "onboarding" }); }}
          />
        )}
      </main>
      <nav className="tabbar" aria-label="Main">
        <button className={view.name === "home" ? "tab on" : "tab"} onClick={() => setView({ name: "home" })}>
          <Mountain size={22} /><span>Climb</span>
        </button>
        <button className={view.name === "progress" ? "tab on" : "tab"} onClick={() => setView({ name: "progress" })}>
          <Chart size={22} /><span>Progress</span>
        </button>
        <button className={view.name === "settings" ? "tab on" : "tab"} onClick={() => setView({ name: "settings" })}>
          <Gear size={22} /><span>Settings</span>
        </button>
      </nav>
      {preparing && (
        <div className="preparing" role="status">
          <span className="spinner" aria-hidden /> {preparing}
        </div>
      )}
    </div>
  );
}
