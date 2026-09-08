'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type {
  ComponentStatus,
  ObservatorySnapshot,
  ScenarioDefinition,
  ScenarioId,
  TraceEnvelope,
} from '@/lib/data/types';
import { defaultSource } from '@/lib/data/source';
import { participatingFor, STAGE_LABELS } from '@/lib/copy/labels';
import {
  currentStageId,
  isFinished,
  liveSpans,
  totalDuration,
} from '@/lib/simulation/engine';

type ObservatoryContextValue = {
  snapshot: ObservatorySnapshot;
  scenarios: ScenarioDefinition[];
  scenario: ScenarioDefinition;
  scenarioId: ScenarioId;
  playing: boolean;
  speed: 0.5 | 1 | 2 | 4;
  elapsedMs: number;
  selectedStageId: string | null;
  setScenarioId: (id: ScenarioId) => void;
  play: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  setSpeed: (speed: 0.5 | 1 | 2 | 4) => void;
  selectStage: (id: string | null) => void;
};

const ObservatoryContext = createContext<ObservatoryContextValue | null>(null);

export function ObservatoryProvider({ children }: { children: ReactNode }) {
  const source = defaultSource;
  const scenarios = useMemo(() => source.listScenarios(), []);
  const base = useMemo(() => source.getSnapshot(), []);

  const [scenarioId, setScenarioIdState] = useState<ScenarioId>('venting');
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<0.5 | 1 | 2 | 4>(1);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [selectedStageId, setSelectedStageId] = useState<string | null>(null);
  const [clock, setClock] = useState(base.last_updated);

  const scenario = useMemo(
    () => scenarios.find((s) => s.id === scenarioId) ?? scenarios[0],
    [scenarios, scenarioId]
  );

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setElapsedMs((prev) => {
        const next = prev + 40 * speed;
        const total = totalDuration(scenario);
        if (next >= total) {
          setPlaying(false);
          return total;
        }
        return next;
      });
    }, 40);
    return () => window.clearInterval(id);
  }, [playing, speed, scenario]);

  useEffect(() => {
    const tick = () => setClock(new Date().toISOString());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const setScenarioId = useCallback((id: ScenarioId) => {
    setScenarioIdState(id);
    setElapsedMs(0);
    setPlaying(false);
    setSelectedStageId(null);
  }, []);

  const play = useCallback(() => {
    setElapsedMs(1);
    setPlaying(true);
    setSelectedStageId(null);
  }, []);

  const pause = useCallback(() => setPlaying(false), []);
  const resume = useCallback(() => {
    if (!isFinished(scenario, elapsedMs)) setPlaying(true);
  }, [elapsedMs, scenario]);

  const reset = useCallback(() => {
    setElapsedMs(0);
    setPlaying(false);
    setSelectedStageId(null);
  }, []);

  const snapshot = useMemo<ObservatorySnapshot>(() => {
    const spans = liveSpans(scenario, elapsedMs);
    const stage = currentStageId(scenario, elapsedMs);
    const finished = isFinished(scenario, elapsedMs);
    const started = elapsedMs > 0 || playing;
    const participating = participatingFor(stage);
    const liveTrace: TraceEnvelope = {
      trace_id: scenario.decision.trace_ref,
      session_ref: scenario.session_ref,
      subject_ref: scenario.subject_ref,
      schema_version: 'trace_v1_sim',
      content_mode: 'off',
      started_at: started ? '2026-09-08T13:40:00Z' : '',
      completed_at: finished ? '2026-09-08T13:41:12Z' : null,
      current_stage: stage,
      spans,
      provenance: 'simulated',
    };

    const components: ComponentStatus[] = base.components.map((c) => {
      const on = participating.includes(c.id);
      let lifecycle = c.lifecycle;
      if (!started) lifecycle = 'idle';
      else if (on && playing) lifecycle = 'active';
      else if (finished && on) {
        const span = spans.find((s) => s.component === c.id);
        if (span?.status === 'failed') lifecycle = 'failed';
        else if (span?.status === 'blocked' || span?.status === 'warning') lifecycle = 'warning';
        else lifecycle = 'completed';
      } else if (started) lifecycle = 'idle';
      return {
        ...c,
        participating: on,
        lifecycle,
      };
    });

    let system: ObservatorySnapshot['system_lifecycle'] = 'idle';
    if (playing) system = 'active';
    else if (finished) {
      const bad = spans.some((s) => s.status === 'failed');
      const warn = spans.some((s) => s.status === 'blocked' || s.status === 'warning');
      system = bad ? 'failed' : warn ? 'warning' : 'completed';
    }

    const processing = !started
      ? 'Ningún turno en curso. Nexus de producción no está implementado. Esto es una simulación del contrato.'
      : `Turno ${scenario.session_ref} · ${scenario.title}`;

    return {
      ...base,
      system_lifecycle: system,
      processing,
      stage_label: stage ? STAGE_LABELS[stage] : started && finished ? 'Turno cerrado' : 'En espera',
      current_stage: stage,
      last_updated: clock,
      components,
      traces: [liveTrace, ...base.traces.filter((t) => t.trace_id !== liveTrace.trace_id)],
    };
  }, [base, clock, elapsedMs, playing, scenario]);

  const value: ObservatoryContextValue = {
    snapshot,
    scenarios,
    scenario,
    scenarioId,
    playing,
    speed,
    elapsedMs,
    selectedStageId,
    setScenarioId,
    play,
    pause,
    resume,
    reset,
    setSpeed,
    selectStage: setSelectedStageId,
  };

  return <ObservatoryContext.Provider value={value}>{children}</ObservatoryContext.Provider>;
}

export function useObservatory() {
  const ctx = useContext(ObservatoryContext);
  if (!ctx) throw new Error('useObservatory requiere ObservatoryProvider');
  return ctx;
}
