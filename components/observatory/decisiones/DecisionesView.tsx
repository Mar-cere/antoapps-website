'use client';

import { useMemo, useState } from 'react';
import { TurnPicker } from '@/components/observatory/live/TurnPicker';
import { useObservatory } from '@/components/observatory/shell/ObservatoryProvider';
import { Provenance } from '@/components/observatory/ui/Provenance';
import { StatusMark } from '@/components/observatory/ui/StatusMark';
import {
  choiceLabel,
  DECISION_ACT_LABELS,
  factLabel,
  scenarioLabel,
  sliceLabel,
  stageLabel,
} from '@/lib/observatory/copy/labels';
import { storyFromTrace } from '@/lib/observatory/data/turnDecision';
import type { DecisionRecord } from '@/lib/observatory/data/types';

export function DecisionesView() {
  const { snapshot, selectedTrace, selectTrace, selectedStageId, selectStage } = useObservatory();
  const [recordId, setRecordId] = useState(snapshot.decisions[0]?.decision_id ?? '');
  const record = snapshot.decisions.find((d) => d.decision_id === recordId) ?? snapshot.decisions[0];
  const plan = snapshot.plans.find((p) => p.decision_ref === record?.decision_id);
  const story = selectedTrace ? storyFromTrace(selectedTrace) : null;
  const selectedSpan =
    story?.path.find((span) => span.stage_id === selectedStageId) ?? story?.path[0] ?? null;

  return (
    <div className="page">
      <header>
        <h2>Decisiones</h2>
        <p>
          Cómo se decidió el turno publicado: Engine en runtime, forma de Experience y sombra del
          pipeline implícito. DecisionRecord de colección sigue vacío a propósito. No hay cadena
          privada de razonamiento.
        </p>
      </header>

      {!selectedTrace || !story ? (
        <div className="empty">
          No hay turnos en este snapshot. El runtime debe publicar traces[] en GET /v1/observatory/snapshot.
        </div>
      ) : (
        <div className="decision-layout">
          <section className="turn-rail">
            <h3>Turnos</h3>
            <TurnPicker
              traces={snapshot.traces}
              selectedId={selectedTrace.trace_id}
              onSelect={selectTrace}
            />
          </section>

          <div className="decision-main">
            <section className="decision-lead">
              <div className="row-between">
                <p className="session-id">{selectedTrace.session_ref}</p>
                <Provenance kind={selectedTrace.provenance} />
              </div>
              <p className="decision-headline">{story.headline}</p>
              <p className="s">
                {selectedTrace.subject_ref} · content {selectedTrace.content_mode}
                {story.split ? ' · Engine y sombra no coinciden' : ''}
              </p>
            </section>

            <section
              className="decision-field"
              aria-label="Engine, forma y sombra"
              data-split={story.split ? 'yes' : 'no'}
            >
              <article className="decision-node" data-role="engine">
                <span className="decision-node__star" aria-hidden="true" />
                <h3>Nexus Engine</h3>
                <p className="decision-choice">{choiceLabel(story.engineChoice)}</p>
                <p className="s">
                  {factLabel(story.engineMode)} · {factLabel(story.engineDeliberation)}
                </p>
                <p className="s">
                  {story.engineCandidates == null
                    ? 'Sin recuento de candidatos'
                    : `${story.engineCandidates} candidatos contados, sin puntuaciones`}
                </p>
              </article>
              <article className="decision-node" data-role="experience">
                <span className="decision-node__star" aria-hidden="true" />
                <h3>Experience</h3>
                <p className="decision-choice">{choiceLabel(story.modality)}</p>
                <p className="s">Modalidad del plan de forma. No es un ExperiencePlan persistido.</p>
                <p className="s">
                  Cue {factLabel(story.cue)} · {factLabel(story.reason)}
                </p>
              </article>
              <article className="decision-node" data-role="shadow" data-split={story.split ? 'yes' : 'no'}>
                <span className="decision-node__star" aria-hidden="true" />
                <h3>Sombra</h3>
                <p className="decision-choice">{choiceLabel(story.shadowChoice)}</p>
                <p className="s">
                  {factLabel(story.shadowMode)} · {factLabel(story.shadowDeliberation)}
                </p>
                <p className="s">Observa el pipeline implícito. No reescribe la respuesta.</p>
              </article>
            </section>

            <dl className="inspector decision-facts">
              <dt>Safety</dt>
              <dd>{factLabel(story.safetyRoute)}</dd>
              <dt>Riesgo</dt>
              <dd>{factLabel(story.riskClass)}</dd>
              <dt>Persona</dt>
              <dd>{factLabel(story.personaGrant)}</dd>
              <dt>Slice relacional</dt>
              <dd>{sliceLabel(story.slice)}</dd>
              <dt>Postura relacional</dt>
              <dd>{choiceLabel(story.stance)}</dd>
              <dt>State</dt>
              <dd>
                activación {factLabel(story.activationBand)} · carga {factLabel(story.loadBand)} ·
                apertura {factLabel(story.opennessBand)} · tiempo {factLabel(story.timeBand)}
              </dd>
              <dt>Trajectory</dt>
              <dd>{factLabel(story.directionBand)}</dd>
              <dt>TTFT</dt>
              <dd>{story.ttftMs == null ? 'No medida' : `${story.ttftMs} ms. Cortex no entra aquí.`}</dd>
              <dt>Restricciones</dt>
              <dd>
                {story.engineConstraintCount == null
                  ? 'Sin dato'
                  : `${story.engineConstraintCount} en el Engine`}
              </dd>
            </dl>

            <section className="decision-orbit">
              <h3>Recorrido de la decisión</h3>
              <div className="decision-path">
                {story.path.map((span, index) => (
                  <button
                    key={span.span_id}
                    type="button"
                    className="path-node"
                    aria-selected={selectedSpan?.span_id === span.span_id}
                    onClick={() => selectStage(span.stage_id)}
                  >
                    <span className="idx">{String(index + 1).padStart(2, '0')}</span>
                    <strong>{stageLabel(span.canonical_name)}</strong>
                    <StatusMark status={span.status} />
                  </button>
                ))}
              </div>
              {selectedSpan ? (
                <p className="s" style={{ marginTop: 12 }}>
                  {selectedSpan.what_happened}
                </p>
              ) : null}
            </section>
          </div>
        </div>
      )}

      {snapshot.decisions.length > 0 ? (
        <div className="split" style={{ marginTop: 18 }}>
          <section className="panel">
            <h3>DecisionRecord (simulación)</h3>
            <div className="list">
              {snapshot.decisions.map((d) => (
                <button key={d.decision_id} type="button" onClick={() => setRecordId(d.decision_id)}>
                  <span className="t">
                    {scenarioLabel(d.scenario_id)} · {DECISION_ACT_LABELS[d.decision_act] ?? d.decision_act}
                  </span>
                  <span className="s">
                    {d.decision_id} · {d.selected ?? 'sin elección'}
                  </span>
                </button>
              ))}
            </div>
          </section>
          {record ? <RecordPanel record={record} /> : null}
        </div>
      ) : null}

      {plan ? (
        <section className="panel" style={{ marginTop: 14 }}>
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
      ) : null}
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
        <dd>{DECISION_ACT_LABELS[record.decision_act] ?? record.decision_act}</dd>
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
        Descartadas / reserva:{' '}
        {discarded.map((c) => `${c.candidate_id}${c.discard_code ? ` (${c.discard_code})` : ''}`).join('; ')}
      </p>
    </section>
  );
}
