/**
 * Los escenarios de demo usan nombres de stage del documento maestro.
 * La sala de control lee el pipeline real de nexus_turn_traces.
 * Este puente no inventa DecisionRecord ni texto de usuario.
 */
import type { ScenarioId, TraceSpan } from '@/lib/observatory/data/types';

export const SIM_EVENT_MAP: Record<string, string> = {
  user_message: 'turn.started',
  consent_check: 'consent.checked',
  persona_snapshot: 'persona.snapshotted',
  deliberation: 'decision.deliberated',
  experience_plan: 'experience.planned',
  delivery: 'turn.completed',
};

type ExtrasOverlay = {
  mode: 'shadow' | 'applied';
  decision: 'allow' | 'suppress';
  applied: boolean;
  activeDomain: string;
  domainSource: string;
  thirdPartyBand: string;
  reasonCodes: string[];
  candidateKindsBefore: string[];
  candidateKindsAfter: string[];
  selectedCandidateKind: string;
  candidateCountBefore: number;
  candidateCountAfter: number;
  muteFlags: string[];
  slice: string;
  cue: string;
  experienceMode: string;
};

const DEFAULT_EXTRAS: ExtrasOverlay = {
  mode: 'shadow',
  decision: 'suppress',
  applied: false,
  activeDomain: 'self',
  domainSource: 'current',
  thirdPartyBand: 'none',
  reasonCodes: ['listen_cue'],
  candidateKindsBefore: [],
  candidateKindsAfter: [],
  selectedCandidateKind: 'none',
  candidateCountBefore: 0,
  candidateCountAfter: 0,
  muteFlags: [],
  slice: 'none',
  cue: 'listen',
  experienceMode: 'shadow',
};

const SCENARIO_EXTRAS: Record<ScenarioId, ExtrasOverlay> = {
  venting: {
    ...DEFAULT_EXTRAS,
    reasonCodes: ['listen_cue', 'vent_only'],
    candidateKindsBefore: ['mindfulness'],
    candidateCountBefore: 1,
    slice: 'vent',
  },
  couple_conflict: {
    ...DEFAULT_EXTRAS,
    activeDomain: 'relationship',
    thirdPartyBand: 'relationship',
    reasonCodes: ['third_party_concern', 'listen_cue'],
    candidateKindsBefore: ['exposure'],
    candidateCountBefore: 1,
    slice: 'couple',
  },
  high_uncertainty: {
    ...DEFAULT_EXTRAS,
    cue: 'clarify_once',
    reasonCodes: ['listen_cue'],
  },
  governance_block: {
    ...DEFAULT_EXTRAS,
    decision: 'suppress',
    reasonCodes: ['safety_precedence'],
    muteFlags: ['hard_stop'],
    cue: 'honor_acceptance',
  },
  abstain_evidence: {
    ...DEFAULT_EXTRAS,
    reasonCodes: ['ambiguous_candidates'],
  },
  cortex_pattern: {
    ...DEFAULT_EXTRAS,
    slice: 'vent',
    reasonCodes: ['listen_cue'],
  },
};

function remapStructured(eventType: string, structured: TraceSpan['structured']): TraceSpan['structured'] {
  const out: TraceSpan['structured'] = { ...structured };
  if (typeof out.decision_act === 'string' && out.choice == null) {
    out.choice = out.decision_act === 'listen' ? 'validate' : out.decision_act;
  }
  if (typeof out.selected === 'string' && out.choice == null) {
    out.choice = out.selected.includes('validate') ? 'validate' : out.selected;
  }
  if (typeof out.ttft_ms === 'number' && out.ttftMs == null) out.ttftMs = out.ttft_ms;
  if (typeof out.safety_route === 'string' && out.safetyRoute == null) out.safetyRoute = out.safety_route;
  if (eventType === 'decision.deliberated' && out.mode == null) out.mode = 'runtime';
  if (eventType === 'turn.started') {
    if (out.surface == null) out.surface = 'registered';
    if (out.transport == null) out.transport = 'http';
    if (out.packId == null) out.packId = 'sim';
  }
  if (eventType === 'experience.planned' && out.conversionSuppression == null) {
    out.conversionSuppression = 'none';
  }
  return out;
}

export function remapSimSpans(spans: TraceSpan[]): TraceSpan[] {
  return spans.map((span) => {
    const canonical = SIM_EVENT_MAP[span.canonical_name] ?? span.canonical_name;
    return {
      ...span,
      canonical_name: canonical,
      stage_id: canonical,
      structured: remapStructured(canonical, span.structured),
    };
  });
}

function extraSpan(
  eventType: string,
  component: TraceSpan['component'],
  structured: TraceSpan['structured'],
  what: string
): TraceSpan {
  return {
    span_id: `sim_${eventType}`,
    canonical_name: eventType,
    stage_id: eventType,
    component,
    status: 'completed',
    duration_ms: 1,
    confidence: null,
    result: eventType,
    constraints_applied: [],
    structured,
    what_happened: what,
  };
}

export function enrichScenarioSpans(scenarioId: ScenarioId, spans: TraceSpan[]): TraceSpan[] {
  const remapped = remapSimSpans(spans);
  const present = new Set(remapped.map((span) => span.canonical_name));
  const extras = SCENARIO_EXTRAS[scenarioId] ?? DEFAULT_EXTRAS;
  const injected: TraceSpan[] = [];

  if (!present.has('state.estimated')) {
    injected.push(
      extraSpan(
        'state.estimated',
        'state',
        {
          activationBand: 'mid',
          loadBand: 'mid',
          opennessBand: 'open',
          timeBand: 'ok',
          claimType: 'pattern_candidate',
        },
        'Bandas de State. Candidato, no hecho. Fixture de demo.'
      )
    );
  }
  if (!present.has('experience.evaluated')) {
    injected.push(
      extraSpan(
        'experience.evaluated',
        'experience',
        { cue: extras.cue, mode: extras.experienceMode },
        'Cue de progresión post-respuesta. Fixture de demo. No afirma beneficio.'
      )
    );
  }
  if (!present.has('extras.evaluated')) {
    injected.push(
      extraSpan(
        'extras.evaluated',
        'experience',
        {
          mode: extras.mode,
          decision: extras.decision,
          applied: extras.applied,
          activeDomain: extras.activeDomain,
          domainSource: extras.domainSource,
          thirdPartyBand: extras.thirdPartyBand,
          reasonCodes: extras.reasonCodes,
          candidateKindsBefore: extras.candidateKindsBefore,
          candidateKindsAfter: extras.candidateKindsAfter,
          selectedCandidateKind: extras.selectedCandidateKind,
          candidateCountBefore: extras.candidateCountBefore,
          candidateCountAfter: extras.candidateCountAfter,
          muteFlags: extras.muteFlags,
        },
        'Eligibilidad de extras conversacionales. Fixture de demo. Sin copy de usuario.'
      )
    );
  }
  if (!present.has('relational.shadowed')) {
    injected.push(
      extraSpan(
        'relational.shadowed',
        'cortex',
        { slice: extras.slice, stance: 'listen', mode: 'shadow' },
        'Sombra relacional. Serie propia, sin fusionar pareja y desahogo. Fixture de demo.'
      )
    );
  }

  const started = remapped.find((span) => span.canonical_name === 'turn.started');
  if (started && extras.muteFlags.length > 0) {
    started.structured = {
      ...started.structured,
      muteFlags: extras.muteFlags,
      safetyRoute: extras.muteFlags.includes('hard_stop') ? 'hard_stop' : started.structured.safetyRoute ?? 'none',
    };
  }

  return [...remapped, ...injected];
}
