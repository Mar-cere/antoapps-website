/**
 * Contratos canónicos de Anto Nexus (documento maestro v2.2, cap. 13).
 * La UI solo consume estos tipos; no inventa razonamiento privado.
 */

export type DataProvenance = 'simulated' | 'unavailable' | 'derived';

export type ComponentId =
  | 'psyche'
  | 'persona'
  | 'state'
  | 'cortex'
  | 'nexus_engine'
  | 'experience'
  | 'governance';

export type PipelineStageId =
  | 'user_message'
  | 'consent_check'
  | 'state_persona'
  | 'psyche_retrieval'
  | 'candidate_generation'
  | 'governance_filter'
  | 'deliberation'
  | 'experience_plan'
  | 'delivery'
  | 'outcomes_evals';

export type SpanStatus =
  | 'idle'
  | 'queued'
  | 'active'
  | 'completed'
  | 'failed'
  | 'warning'
  | 'blocked'
  | 'skipped';

export type SystemLifecycle = 'idle' | 'active' | 'completed' | 'failed' | 'warning';

/** Lienzo de producto (persona). Nunca almacena deliberación interna. */
export type ProductDecisionSurface = 'Decision';

export type DecisionAct =
  | 'listen'
  | 'ask'
  | 'structure'
  | 'intervene'
  | 'abstain'
  | 'blocked';

export type ConstraintResult = 'pass' | 'fail' | 'not_evaluated';

export type EpistemicStatus =
  | 'observation'
  | 'correlation'
  | 'hypothesis'
  | 'experiment'
  | 'confirmed_evidence'
  | 'rejected_finding';

export type OutcomeHorizon =
  | 'O0_safety'
  | 'O1_immediate'
  | 'O2_session'
  | 'O3_short_term'
  | 'O4_longitudinal'
  | 'O5_autonomy'
  | 'operational';

export type OutcomeSource =
  | 'user_self_report'
  | 'language_inferred'
  | 'observed_behavior'
  | 'evaluator'
  | 'unavailable';

export type RagStatus = 'green' | 'amber' | 'red' | 'pending';

export type ProgramWorkStatus =
  | 'not_started'
  | 'planned_active'
  | 'in_progress'
  | 'complete'
  | 'blocked';

export type EvaluatorId =
  | 'safety'
  | 'epistemic'
  | 'persona'
  | 'conversation'
  | 'experience'
  | 'outcome'
  | 'autonomy';

export type EvalRunStatus = 'queued' | 'running' | 'completed' | 'failed' | 'pending';

export type ProvenanceField<T> = {
  value: T;
  provenance: DataProvenance;
  note?: string;
};

export type TurnContext = {
  turn_id: string;
  message_ref: string;
  session_ref: string;
  transport: 'http' | 'sse' | 'socket';
  surface: 'registered' | 'guest';
  identity_mode: 'authenticated' | 'anonymous';
  memory_mode: 'policy_bound' | 'none';
  product_extras_mode: 'governed' | 'muted';
  locale: string;
  timezone: string;
  schema_version: string;
  safety: {
    signal_level: 'LOW' | 'WARNING' | 'MEDIUM' | 'HIGH';
    route: 'none' | 'hard_stop' | 'protocol_93' | 'soft_19' | 'safeguard_239' | 'other';
  };
  consent_purposes: string[];
  content_minimized: string;
};

export type TraceSpan = {
  span_id: string;
  canonical_name: string;
  stage_id: PipelineStageId;
  component: ComponentId | 'runtime';
  status: SpanStatus;
  duration_ms: number | null;
  confidence: number | null;
  result: string;
  constraints_applied: string[];
  structured: Record<string, string | number | boolean | null>;
  what_happened: string;
};

export type TraceEnvelope = {
  trace_id: string;
  session_ref: string;
  subject_ref: string;
  schema_version: string;
  content_mode: 'off';
  started_at: string;
  completed_at: string | null;
  current_stage: PipelineStageId | null;
  spans: TraceSpan[];
  provenance: DataProvenance;
};

export type CandidateScore = {
  psyche: number | null;
  persona: number | null;
  state: number | null;
  cortex: number | null;
  burden: number;
  risk: number;
};

export type CandidateRecord = {
  candidate_id: string;
  label: string;
  scores: CandidateScore;
  result: 'selected' | 'discarded' | 'reserve';
  discard_code: string | null;
};

export type AbstentionRecord = {
  kind:
    | 'epistemic'
    | 'contradictory'
    | 'intent_ambiguous'
    | 'outcome_uncertain'
    | 'safety'
    | 'consent'
    | 'model_disagreement';
  ladder_step:
    | 'degrade_precision'
    | 'express_tentativeness'
    | 'ask'
    | 'offer_choice'
    | 'no_intervene'
    | 'escalate';
  code: string;
};

export type DecisionRecord = {
  decision_id: string;
  context_ref: string;
  trace_ref: string;
  scenario_id: ScenarioId;
  summary_context: string;
  candidates: CandidateRecord[];
  hard_constraints: {
    safety: ConstraintResult;
    consent: ConstraintResult;
  };
  selected: string | null;
  decision_act: DecisionAct;
  confidence: number | null;
  runner_up_margin: number | null;
  reasons: string[];
  evidence_refs: string[];
  abstention: AbstentionRecord | null;
  policy_versions: {
    nexus: string;
    governance: string;
    psyche?: string;
  };
  provenance: DataProvenance;
};

export type ExperiencePlan = {
  plan_id: string;
  decision_ref: string;
  modality: string;
  first_move: string;
  max_questions: number;
  response_budget_words: number;
  tool_offer: string;
  follow_up: string;
  tone: string;
  personalization_refs: string[];
  consent_required: string[];
  stop_conditions: string[];
  experiment_id: string | null;
  blocked: boolean;
  block_reason: string | null;
  provenance: DataProvenance;
};

export type OutcomeEvent = {
  event_id: string;
  decision_ref: string;
  outcome_type: string;
  horizon: OutcomeHorizon;
  value: number | null;
  source: OutcomeSource;
  confidence: number | null;
  instrument_version: string | null;
  missingness_reason: string | null;
  experiment_ref: string | null;
  definition: string;
  provenance: DataProvenance;
};

export type ReviewCase = {
  case_id: string;
  trigger: string;
  impact_class: 'IG0' | 'IG1' | 'IG2' | 'IG3';
  incident_severity: 'SEV0' | 'SEV1' | 'SEV2' | 'SEV3' | null;
  review_priority: 'low' | 'medium' | 'high';
  subject_scope: string;
  evidence_pack: string[];
  pii_mode: 'redacted';
  requested_decision: string;
  due_at: string;
  status: 'open' | 'paused' | 'closed';
  decision: string | null;
  rationale_codes: string[];
  epistemic_status: EpistemicStatus;
  provenance: DataProvenance;
};

export type ComponentStatus = {
  id: ComponentId;
  name: string;
  role: string;
  lifecycle: SystemLifecycle;
  participating: boolean;
  participation_note: string;
  program_status: ProgramWorkStatus;
  sprint_ref: string;
  last_signal: string;
  provenance: DataProvenance;
};

export type SprintRecord = {
  sprint_no: number;
  title: string;
  phase: string;
  objective: string;
  deliverables: string;
  dependencies: string;
  metrics: string;
  exit_gate: string;
  owner_capability: string;
  owner_person: string;
  work_status: ProgramWorkStatus;
  rag: RagStatus;
  rag_reason: string;
  blocked_by: string | null;
};

export type LaunchGate = {
  id: 'LG0' | 'LG1' | 'LG2' | 'LG3' | 'LG4' | 'LG5' | 'LG6';
  name: string;
  description: string;
  rag: RagStatus;
  explanation: string;
};

export type ProgramSnapshot = {
  phase_id: string;
  phase_title: string;
  current_sprint: number;
  last_updated: string;
  sprints: SprintRecord[];
  launch_gates: LaunchGate[];
  provenance: DataProvenance;
};

export type AlertItem = {
  alert_id: string;
  severity: 'info' | 'warning' | 'failed';
  title: string;
  detail: string;
  related_component: ComponentId | 'program';
  href: '/en-vivo' | '/decisiones' | '/cortex' | '/roadmap';
  provenance: DataProvenance;
};

export type MetricItem = {
  metric_id: string;
  label: string;
  value: string;
  family: 'decision' | 'experience' | 'generation' | 'outcome' | 'safety' | 'autonomy' | 'system' | 'learning';
  definition: string;
  caveat: string;
  provenance: DataProvenance;
};

export type ActivityItem = {
  activity_id: string;
  at: string;
  title: string;
  detail: string;
  component: ComponentId | 'runtime';
  provenance: DataProvenance;
};

export type HypothesisCard = {
  hypothesis_id: string;
  title: string;
  epistemic_status: EpistemicStatus;
  cohort: string;
  proposed_test: string;
  uncertainty: string;
  owner: string;
  provenance: DataProvenance;
};

export type ExperimentSpec = {
  experiment_id: string;
  hypothesis: string;
  status: 'draft' | 'shadow' | 'canary' | 'stopped' | 'unavailable';
  primary: string;
  guardrails: string[];
  provenance: DataProvenance;
};

export type DriftMonitor = {
  monitor_id: string;
  name: string;
  status: SystemLifecycle;
  detail: string;
  provenance: DataProvenance;
};

export type EvalQueueItem = {
  eval_id: string;
  evaluator: EvaluatorId;
  question: string;
  status: EvalRunStatus;
  lag_ms: number | null;
  trace_ref: string;
  provenance: DataProvenance;
};

export type AutonomySignal = {
  dimension: string;
  healthy_signal: string;
  risk_signal: string;
  current: string;
  provenance: DataProvenance;
};

export type ScenarioId =
  | 'venting'
  | 'couple_conflict'
  | 'high_uncertainty'
  | 'governance_block'
  | 'abstain_evidence'
  | 'cortex_pattern';

export type StageScript = {
  stage_id: PipelineStageId;
  label: string;
  canonical_name: string;
  component: ComponentId | 'runtime';
  duration_ms: number;
  status_on_complete: SpanStatus;
  what_happened: string;
  result: string;
  confidence: number | null;
  constraints_applied: string[];
  structured: Record<string, string | number | boolean | null>;
};

export type ScenarioDefinition = {
  id: ScenarioId;
  title: string;
  intent: string;
  subject_ref: string;
  session_ref: string;
  content_minimized: string;
  stages: StageScript[];
  decision: DecisionRecord;
  experience: ExperiencePlan;
  outcomes: OutcomeEvent[];
  review_case: ReviewCase | null;
  hypotheses: HypothesisCard[];
};

export type ObservatorySnapshot = {
  mode: 'simulation';
  system_lifecycle: SystemLifecycle;
  processing: string;
  stage_label: string;
  current_stage: PipelineStageId | null;
  last_updated: string;
  components: ComponentStatus[];
  alerts: AlertItem[];
  metrics: MetricItem[];
  activity: ActivityItem[];
  program: ProgramSnapshot;
  traces: TraceEnvelope[];
  decisions: DecisionRecord[];
  plans: ExperiencePlan[];
  outcomes: OutcomeEvent[];
  reviews: ReviewCase[];
  eval_queue: EvalQueueItem[];
  hypotheses: HypothesisCard[];
  experiments: ExperimentSpec[];
  drift: DriftMonitor[];
  autonomy: AutonomySignal[];
  evidence_freshness: ProvenanceField<string>;
  review_debt: ProvenanceField<string>;
};

export type ObservatoryDataSource = {
  kind: 'simulated' | 'http' | 'sse' | 'mongodb';
  getSnapshot(): ObservatorySnapshot;
  listScenarios(): ScenarioDefinition[];
  getScenario(id: ScenarioId): ScenarioDefinition;
};
