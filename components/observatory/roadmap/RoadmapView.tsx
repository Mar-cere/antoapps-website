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
          Programa de 18 sprints del documento maestro v2.2. Nada se marca implementado si solo
          está diseñado. Los responsables reales se asignan en Sprint 0.
        </p>
      </header>

      <section className="band">
        <article>
          <p className="k">Fase actual</p>
          <p className="v">{program.phase_title}</p>
          <p className="d">Horizonte 0-3 meses: observabilidad y control. No bandits ni auto-promotion.</p>
        </article>
        <article>
          <p className="k">Sprint actual</p>
          <p className="v">Sprint {program.current_sprint}</p>
          <p className="d">Taxonomía de eventos y baseline. Trabajo planificado, no producción.</p>
        </article>
        <article>
          <p className="k">Completados</p>
          <p className="v">{program.sprints.filter((s) => s.work_status === 'complete').length}</p>
          <p className="d">Ningún sprint del programa se declara cerrado en esta versión.</p>
        </article>
        <article>
          <p className="k">Bloqueos</p>
          <p className="v">{program.sprints.filter((s) => s.blocked_by).length}</p>
          <p className="d">No hay bloqueo técnico simulado. Falta ownership real.</p>
        </article>
      </section>

      <section>
        <h3 style={{ margin: '0 0 8px' }}>Launch gates LG0-LG6</h3>
        <div className="gates">
          {program.launch_gates.map((g) => (
            <article key={g.id} className="gate">
              <h4>
                {g.id} {g.name}
              </h4>
              <p className={`rag ${g.rag}`}>{g.rag}</p>
              <p>{g.explanation}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="split">
        <section className="panel sprint-list">
          <div className="row-between">
            <h3>Sprints</h3>
            <Provenance kind={program.provenance} />
          </div>
          {program.sprints.map((s) => (
            <button
              key={s.sprint_no}
              type="button"
              onClick={() => setOpen(s.sprint_no)}
              className={s.sprint_no === open ? 'current' : undefined}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 0,
                borderBottom: '1px solid var(--color-border)',
                padding: '12px 0',
                cursor: 'pointer',
              }}
            >
              <span className="row-between">
                <span className="t">
                  Sprint {s.sprint_no} · {s.title}
                </span>
                <span className={`rag ${s.rag}`}>{s.rag}</span>
              </span>
              <span className="s">{s.phase}</span>
            </button>
          ))}
        </section>
        {current ? (
          <section className="panel inspector">
            <h3>
              Sprint {current.sprint_no}
            </h3>
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
          </section>
        ) : null}
      </div>
    </div>
  );
}
