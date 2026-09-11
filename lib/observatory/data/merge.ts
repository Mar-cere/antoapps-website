import type {
  AlertItem,
  ComponentStatus,
  ObservatorySnapshot,
  SurveillanceNote,
  TraceEnvelope,
} from '@/lib/observatory/data/types';
import { storyFromTrace } from '@/lib/observatory/data/turnDecision';
import { buildStaticSnapshot } from '@/lib/observatory/data/views';

function pickArray<T>(remote: Partial<ObservatorySnapshot>, key: keyof ObservatorySnapshot): T[] | undefined {
  const value = remote[key];
  return Array.isArray(value) ? (value as T[]) : undefined;
}

function mergeComponents(baseline: ComponentStatus[], remote?: ComponentStatus[]): ComponentStatus[] {
  if (!remote?.length) return baseline;
  const byId = new Map(remote.map((item) => [item.id, item]));
  return baseline.map((base) => {
    const live = byId.get(base.id);
    if (!live) return { ...base, lifecycle: 'idle', participating: false };
    return {
      ...base,
      lifecycle: live.lifecycle,
      participating: live.participating,
      participation_note: live.participation_note,
      last_signal: live.last_signal,
      provenance: live.provenance,
    };
  });
}

const LIVE_SURVEILLANCE: SurveillanceNote = {
  provenance: 'unavailable',
  source: 'script_offline',
  command: 'node backend/scripts/reportNexusReviewCases.js --days=7',
  note: 'Semantic Cortex, Evidence Surveillance y launch gates LG0–LG6 no están en este projector live. No se fingen ReviewCases.',
};

const IN_FLIGHT_MS = 120_000;

function isTerminalTrace(trace: TraceEnvelope): boolean {
  const stage = String(trace.current_stage ?? '');
  return Boolean(trace.completed_at) || stage === 'turn.completed' || stage === 'turn.failed';
}

export function deriveInFlight(traces: TraceEnvelope[], lastEventAt: string | null, now = Date.now()): boolean {
  const latest = traces[0];
  if (!latest || isTerminalTrace(latest)) return false;
  const iso = lastEventAt ?? latest.started_at;
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) return false;
  return now - ms < IN_FLIGHT_MS;
}

function withSoftLandingAlert(traces: TraceEnvelope[], alerts: AlertItem[]): AlertItem[] {
  if (alerts.some((alert) => alert.alert_id === 'extras_applied_soft_landing')) return alerts;
  const count = traces.filter((trace) => {
    const story = storyFromTrace(trace);
    return story.extrasMode === 'applied' && story.muteFlags.includes('soft_landing');
  }).length;
  if (count === 0) return alerts;
  return [
    ...alerts,
    {
      alert_id: 'extras_applied_soft_landing',
      severity: 'warning',
      title: 'Canary de extras con mute soft_landing',
      detail: `${count} turno(s) con extras.mode=applied y muteFlags.soft_landing. El canary está vivo; el inventario gobernado puede estar vacío.`,
      related_component: 'experience',
      href: '/observatorio/decisiones',
      provenance: 'derived',
    },
  ];
}

export function applyRemoteSnapshot(remote: Partial<ObservatorySnapshot>): ObservatorySnapshot {
  const baseline = buildStaticSnapshot();
  const traces = (pickArray<ObservatorySnapshot['traces'][number]>(remote, 'traces') ?? []).map((t) => ({
    ...t,
    content_mode: 'off' as const,
  }));
  const lastEventAt = remote.last_event_at ?? traces[0]?.completed_at ?? traces[0]?.started_at ?? null;
  const inFlight = typeof remote.in_flight === 'boolean' ? remote.in_flight : deriveInFlight(traces, lastEventAt);
  const alerts = withSoftLandingAlert(traces, pickArray<ObservatorySnapshot['alerts'][number]>(remote, 'alerts') ?? []);
  const metrics = pickArray<ObservatorySnapshot['metrics'][number]>(remote, 'metrics') ?? [];
  const activity = pickArray<ObservatorySnapshot['activity'][number]>(remote, 'activity') ?? [];
  const components = pickArray<ObservatorySnapshot['components'][number]>(remote, 'components');

  return {
    ...baseline,
    mode: 'live',
    system_lifecycle: remote.system_lifecycle ?? (inFlight ? 'active' : 'idle'),
    in_flight: inFlight,
    last_event_at: lastEventAt,
    pack_id: remote.pack_id ?? traces[0]?.pack_id ?? null,
    processing:
      remote.processing ??
      (inFlight
        ? 'Turno en curso. Content off. /health no implica un turno en vuelo.'
        : traces.length > 0
          ? 'En espera. Turnos publicados. Content off.'
          : 'En espera. No hay turnos en la ventana del projector.'),
    stage_label: remote.stage_label ?? (inFlight ? String(traces[0]?.current_stage ?? 'En curso') : 'En espera'),
    current_stage: remote.current_stage ?? traces[0]?.current_stage ?? null,
    last_updated: remote.last_updated ?? new Date().toISOString(),
    components: mergeComponents(baseline.components, components),
    alerts,
    metrics,
    activity,
    program: baseline.program,
    traces,
    decisions: [],
    plans: [],
    outcomes: [],
    reviews: [],
    eval_queue: [],
    hypotheses: [],
    experiments: [],
    drift: [],
    autonomy: [],
    surveillance: remote.surveillance ?? LIVE_SURVEILLANCE,
    evidence_freshness: remote.evidence_freshness ?? {
      value: 'Sin surveillance en este projector',
      provenance: 'unavailable',
      note: LIVE_SURVEILLANCE.note,
    },
    review_debt: remote.review_debt ?? {
      value: 'Sin ReviewCase en este projector',
      provenance: 'unavailable',
      note: LIVE_SURVEILLANCE.note,
    },
  };
}
