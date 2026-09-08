'use client';

import { useMemo, useState } from 'react';
import { useObservatory } from '@/components/shell/ObservatoryProvider';
import { Provenance } from '@/components/ui/Provenance';
import { DECISION_ACT_LABELS, SCENARIO_LABELS } from '@/lib/copy/labels';
import type { DecisionRecord } from '@/lib/data/types';

export function DecisionesView() {
  const { snapshot } = useObservatory();
  const [id, setId] = useState(snapshot.decisions[0]?.decision_id ?? '');
  const record = snapshot.decisions.find((d) => d.decision_id === id) ?? snapshot.decisions[0];
  const plan = snapshot.plans.find((p) => p.decision_ref === record?.decision_id);

  return (
    <div className="page">
      <header>
        <h2>Decisiones</h2>
        <p>
          DecisionRecord es el contrato auditable de Nexus. Decision (con mayúscula) es el lienzo
          de la persona y no guarda candidatos ni scores. No hay cadena privada de razonamiento.
        </p>
      </header>

      <div className="split">
        <section className="panel">
          <h3>DecisionRecord</h3>
          <div className="list">
            {snapshot.decisions.map((d) => (
              <button key={d.decision_id} type="button" onClick={() => setId(d.decision_id)}>
                <span className="t">
                  {SCENARIO_LABELS[d.scenario_id]} · {DECISION_ACT_LABELS[d.decision_act]}
                </span>
                <span className="s">{d.decision_id} · {d.selected ?? 'sin elección'}</span>
              </button>
            ))}
          </div>
        </section>
        {record ? <RecordPanel record={record} /> : null}
      </div>

      {plan ? (
        <section className="panel">
          <div className="row-between">
            <h3>Experience Plan resultante</h3>
            <Provenance kind={plan.provenance} />
          </div>
          {plan.blocked ? <p className="t">{plan.block_reason}</p> : null}
          <dl className="inspector">
            <dt>Modalidad</dt>
            <dd>{plan.modality}</dd>
            <dt>Primer movimiento</dt>
            <dd>{plan.first_move}</dd>
            <dt>Preguntas máximas</dt>
            <dd>{plan.max_questions}</dd>
            <dt>Presupuesto de palabras</dt>
            <dd>{plan.response_budget_words}</dd>
            <dt>Oferta de herramienta</dt>
            <dd>{plan.tool_offer}</dd>
            <dt>Tono</dt>
            <dd>{plan.tone}</dd>
            <dt>Stop</dt>
            <dd>{plan.stop_conditions.join(', ')}</dd>
            <dt>Consentimiento extra</dt>
            <dd>{plan.consent_required.join(', ') || 'Ninguno'}</dd>
          </dl>
        </section>
      ) : (
        <div className="empty">Sin ExperiencePlan. En producción esto llega en Sprint 8.</div>
      )}
    </div>
  );
}

function RecordPanel({ record }: { record: DecisionRecord }) {
  const discarded = useMemo(
    () => record.candidates.filter((c) => c.result === 'discarded' || c.result === 'reserve'),
    [record]
  );
  return (
    <section className="panel inspector">
      <div className="row-between">
        <h3>{record.decision_id}</h3>
        <Provenance kind={record.provenance} />
      </div>
      <p>{record.summary_context}</p>
      <dl>
        <dt>Acto</dt>
        <dd>{DECISION_ACT_LABELS[record.decision_act]}</dd>
        <dt>Elegida</dt>
        <dd>{record.selected ?? 'ninguna'}</dd>
        <dt>Confianza</dt>
        <dd>{record.confidence ?? 'n/a'}</dd>
        <dt>Margen</dt>
        <dd>{record.runner_up_margin ?? 'n/a'}</dd>
        <dt>Constraints</dt>
        <dd>
          safety {record.hard_constraints.safety} · consent {record.hard_constraints.consent}
        </dd>
        <dt>Evidence IDs</dt>
        <dd className="kv">{record.evidence_refs.join(', ')}</dd>
        <dt>Razones</dt>
        <dd>{record.reasons.join(', ')}</dd>
        <dt>Abstención</dt>
        <dd>
          {record.abstention
            ? `${record.abstention.kind} · ${record.abstention.ladder_step} · ${record.abstention.code}`
            : 'No'}
        </dd>
        <dt>Políticas</dt>
        <dd className="kv">
          nexus {record.policy_versions.nexus} · governance {record.policy_versions.governance}
          {record.policy_versions.psyche ? ` · psyche ${record.policy_versions.psyche}` : ''}
        </dd>
      </dl>
      <h3 style={{ marginTop: 16 }}>Candidatos y puntuaciones</h3>
      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th>Candidato</th>
              <th>Psyche</th>
              <th>Persona</th>
              <th>State</th>
              <th>Cortex</th>
              <th>Burden</th>
              <th>Risk</th>
              <th>Resultado</th>
              <th>Código</th>
            </tr>
          </thead>
          <tbody>
            {record.candidates.map((c) => (
              <tr key={c.candidate_id}>
                <td>{c.label}</td>
                <td>{c.scores.psyche ?? '—'}</td>
                <td>{c.scores.persona ?? '—'}</td>
                <td>{c.scores.state ?? '—'}</td>
                <td>{c.scores.cortex ?? '—'}</td>
                <td>{c.scores.burden}</td>
                <td>{c.scores.risk}</td>
                <td>{c.result}</td>
                <td>{c.discard_code ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="s" style={{ marginTop: 10 }}>
        Descartadas / reserva: {discarded.map((c) => `${c.candidate_id}${c.discard_code ? ` (${c.discard_code})` : ''}`).join('; ')}
      </p>
    </section>
  );
}
