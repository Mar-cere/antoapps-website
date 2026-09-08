import type { ObservatorySnapshot } from '@/lib/observatory/data/types';
import { buildStaticSnapshot } from '@/lib/observatory/data/views';

function pickArray<T>(remote: Partial<ObservatorySnapshot>, key: keyof ObservatorySnapshot): T[] | undefined {
  const value = remote[key];
  return Array.isArray(value) ? (value as T[]) : undefined;
}

export function applyRemoteSnapshot(remote: Partial<ObservatorySnapshot>): ObservatorySnapshot {
  const baseline = buildStaticSnapshot();
  const traces = pickArray<ObservatorySnapshot['traces'][number]>(remote, 'traces');
  const decisions = pickArray<ObservatorySnapshot['decisions'][number]>(remote, 'decisions');
  const plans = pickArray<ObservatorySnapshot['plans'][number]>(remote, 'plans');
  const outcomes = pickArray<ObservatorySnapshot['outcomes'][number]>(remote, 'outcomes');
  const components = pickArray<ObservatorySnapshot['components'][number]>(remote, 'components');
  const alerts = pickArray<ObservatorySnapshot['alerts'][number]>(remote, 'alerts');
  const metrics = pickArray<ObservatorySnapshot['metrics'][number]>(remote, 'metrics');
  const activity = pickArray<ObservatorySnapshot['activity'][number]>(remote, 'activity');
  const reviews = pickArray<ObservatorySnapshot['reviews'][number]>(remote, 'reviews');
  const eval_queue = pickArray<ObservatorySnapshot['eval_queue'][number]>(remote, 'eval_queue');
  const hypotheses = pickArray<ObservatorySnapshot['hypotheses'][number]>(remote, 'hypotheses');
  const experiments = pickArray<ObservatorySnapshot['experiments'][number]>(remote, 'experiments');
  const drift = pickArray<ObservatorySnapshot['drift'][number]>(remote, 'drift');
  const autonomy = pickArray<ObservatorySnapshot['autonomy'][number]>(remote, 'autonomy');

  return {
    ...baseline,
    mode: 'live',
    system_lifecycle: remote.system_lifecycle ?? (traces && traces.length > 0 ? 'active' : 'idle'),
    processing:
      remote.processing ??
      (traces && traces.length > 0
        ? 'Turno publicado por el runtime. Contenido de conversación off.'
        : 'Runtime conectado. No hay turnos publicados todavía.'),
    stage_label: remote.stage_label ?? 'En espera',
    current_stage: remote.current_stage ?? traces?.[0]?.current_stage ?? null,
    last_updated: remote.last_updated ?? new Date().toISOString(),
    components: components ?? baseline.components,
    alerts: alerts ?? [],
    metrics: metrics ?? [],
    activity: activity ?? [],
    program: baseline.program,
    traces: (traces ?? []).map((t) => ({ ...t, content_mode: 'off' })),
    decisions: decisions ?? [],
    plans: plans ?? [],
    outcomes: outcomes ?? [],
    reviews: reviews ?? [],
    eval_queue: eval_queue ?? [],
    hypotheses: hypotheses ?? [],
    experiments: experiments ?? [],
    drift: drift ?? [],
    autonomy: autonomy ?? [],
    evidence_freshness: remote.evidence_freshness ?? {
      value: 'Sin dato de runtime',
      provenance: 'unavailable',
      note: 'El snapshot no trajo frescura de evidencia.',
    },
    review_debt: remote.review_debt ?? {
      value: 'Sin dato de runtime',
      provenance: 'unavailable',
    },
  };
}
