'use client';

import { useState } from 'react';
import { useObservatory } from '@/components/observatory/shell/ObservatoryProvider';
import { Provenance } from '@/components/observatory/ui/Provenance';

export function RoadmapView() {
  const { snapshot } = useObservatory();
  const { program } = snapshot;
  const [open, setOpen] = useState(program.current_sprint);
  const current = program.sprints.find((s) => s.sprint_no === open);

  return (
    <div className="page">
      <header>
        <h2>Roadmap</h2>
        <p>
          Programa de 18 sprints del destilado Nexus. Cada cierre es un germen en código: registra,
          observa o reporta según el contrato. No se marca como capacidad que actúe si el destilado
          lo prohíbe. El trabajo vivo es Apply v0.1, que no es Sprint 19.
        </p>
      </header>

      <section className="band" aria-label="Estado del programa">
        <article className="band__nudo">
          <p className="k">Trabajo actual</p>
          <p className="v">{program.current_work}</p>
          <p className="d">{program.current_work_note}</p>
        </article>
        <article className="band__process">
          <p className="k">Fase</p>
          <p className="v">{program.phase_title}</p>
          <p className="d">Horizonte del destilado: 1–18 cerrados como germen. No bandits ni auto-promotion.</p>
        </article>
        <article className="band__stage">
          <p className="k">Completados</p>
          <p className="v">{program.sprints.filter((s) => s.work_status === 'complete').length} de {program.sprints.length}</p>
          <p className="d">Germen cerrado no es canary, ni auto-promotion, ni DecisionRecord de colección.</p>
        </article>
        <article className="band__sprint">
          <p className="k">Bloqueos</p>
          <p className="v">{program.sprints.filter((s) => s.blocked_by).length}</p>
          <p className="d">LG6 sigue blocked: un pass de gate no promociona. No hay Sprint 19.</p>
        </article>
      </section>

      <section className="decision-orbit">
        <h3>Launch gates LG0-LG6</h3>
        <div className="gate-path">
          {program.launch_gates.map((g) => (
            <article key={g.id} className="gate-node" data-rag={g.rag}>
              <h4>
                {g.id} {g.name}
              </h4>
              <p className={`rag ${g.rag}`}>{g.rag}</p>
              <p>{g.explanation}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="decision-layout">
        <section className="turn-rail">
          <div className="row-between">
            <h3>Sprints</h3>
            <Provenance kind={program.provenance} />
          </div>
          <div className="list turn-picker" role="listbox" aria-label="Sprints del programa">
            {program.sprints.map((s) => (
              <button
                key={s.sprint_no}
                type="button"
                role="option"
                aria-selected={s.sprint_no === open}
                onClick={() => setOpen(s.sprint_no)}
              >
                <span className="t">
                  <span className="turn-star" data-rag={s.rag} aria-hidden="true" />
                  Sprint {s.sprint_no} · {s.title}
                </span>
                <span className="s">{s.phase}</span>
              </button>
            ))}
          </div>
        </section>
        {current ? (
          <section className="obs-field sprint-nudo" aria-label={`Sprint ${current.sprint_no}`}>
            <article className="decision-node" data-role="nudo">
              <span className="decision-node__star" aria-hidden="true" />
              <h3>Sprint {current.sprint_no}</h3>
              <p className="decision-choice">{current.title}</p>
              <p className={`rag ${current.rag}`}>{current.rag_reason}</p>
              <dl>
                <dt>Objetivo</dt>
                <dd>{current.objective}</dd>
                <dt>Entregables</dt>
                <dd>{current.deliverables}</dd>
                <dt>Dependencias</dt>
                <dd>{current.dependencies}</dd>
                <dt>Métricas</dt>
                <dd>{current.metrics}</dd>
                <dt>Gate de salida</dt>
                <dd>{current.exit_gate}</dd>
                <dt>Capacidad</dt>
                <dd>{current.owner_capability}</dd>
                <dt>Persona</dt>
                <dd>{current.owner_person}</dd>
                <dt>Estado de trabajo</dt>
                <dd>{current.work_status}</dd>
                <dt>Bloqueo</dt>
                <dd>{current.blocked_by ?? 'Ninguno declarado'}</dd>
              </dl>
            </article>
          </section>
        ) : null}
      </div>
    </div>
  );
}
