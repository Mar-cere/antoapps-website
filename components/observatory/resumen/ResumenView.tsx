'use client';

import Link from 'next/link';
import { TurnDecisionBoard } from '@/components/observatory/decisiones/TurnDecisionBoard';
import { PipelineTape } from '@/components/observatory/live/PipelineTape';
import { ObservatoryLegend } from '@/components/observatory/ui/ObservatoryLegend';
import { ObservatoryClock } from '@/components/observatory/ui/ObservatoryClock';
import { Provenance } from '@/components/observatory/ui/Provenance';
import { SurveillancePanel } from '@/components/observatory/ui/SurveillancePanel';
import { TurnParticipation } from '@/components/observatory/ui/TurnParticipation';
import { useObservatory } from '@/components/observatory/shell/ObservatoryProvider';
import { storyFromTrace } from '@/lib/observatory/data/turnDecision';

export function ResumenView() {
  const { snapshot, scenario, play, demoPlayback, connection, selectedTrace, selectTrace } = useObservatory();
  const sprint = snapshot.program.sprints.find((s) => s.sprint_no === snapshot.program.current_sprint);
  const live = selectedTrace ?? snapshot.traces[0] ?? null;
  const story = live ? storyFromTrace(live) : null;

  return (
    <div className="page">
      <header>
        <h2>Resumen</h2>
        <p>
          Sala de control del turno publicado. /health en 200 no significa que Nexus esté pensando. Provenance
          siempre a la vista.
        </p>
      </header>

      <section className="band" aria-label="Estado general">
        <article className="band__nudo">
          <p className="k">Reloj del projector</p>
          <ObservatoryClock
            inFlight={snapshot.in_flight}
            lastEventAt={snapshot.last_event_at}
            packId={snapshot.pack_id}
            lifecycle={snapshot.system_lifecycle}
          />
          <p className="d">{connection.detail}</p>
        </article>
        <article className="band__process">
          <p className="k">Qué hay en la ventana</p>
          <p className="v">{snapshot.in_flight ? 'Turno en curso' : 'En espera'}</p>
          <p className="d">{snapshot.processing}</p>
        </article>
        <article className="band__stage">
          <p className="k">Último span</p>
          <p className="v">{snapshot.stage_label}</p>
          <p className="d">
            {snapshot.current_stage
              ? `current_stage ${snapshot.current_stage}. No es uptime de Render.`
              : 'Sin turno en la ventana.'}
          </p>
        </article>
        <article className="band__sprint">
          <p className="k">Trabajo de programa</p>
          <p className="v">{snapshot.program.current_work}</p>
          <p className="d">{snapshot.program.current_work_note}</p>
        </article>
      </section>

      <ObservatoryLegend />

      {live && story ? (
        <section>
          <div className="row-between" style={{ marginBottom: 8 }}>
            <h3 style={{ margin: 0 }}>Decisión del último turno</h3>
            <Provenance kind={demoPlayback ? 'simulated' : live.provenance} />
          </div>
          <TurnDecisionBoard story={story} />
          <div style={{ marginTop: 14 }}>
            <PipelineTape trace={live} />
          </div>
          <div className="controls" style={{ marginTop: 12 }}>
            <Link href="/observatorio/en-vivo">Abrir En vivo</Link>
            <Link href="/observatorio/decisiones">Ver la fila completa</Link>
            {demoPlayback ? (
              <button className="primary" type="button" onClick={play}>
                Iniciar simulación
              </button>
            ) : null}
          </div>
        </section>
      ) : (
        <section className="panel">
          <div className="empty">
            {demoPlayback
              ? 'No hay turno simulado en curso. Inicia la simulación o espera un snapshot live.'
              : 'No hay turno publicado por el runtime. El contrato es GET /v1/observatory/snapshot con traces[].'}
            <div className="controls" style={{ marginTop: 12 }}>
              {demoPlayback ? (
                <button className="primary" type="button" onClick={play}>
                  Iniciar simulación
                </button>
              ) : null}
              <Link href="/observatorio/en-vivo">Abrir En vivo</Link>
            </div>
          </div>
        </section>
      )}

      <div className="split">
        <section className="panel">
          <h3>Alertas</h3>
          {snapshot.alerts.length === 0 ? (
            <div className="empty">No hay alertas derivadas en esta ventana.</div>
          ) : (
            snapshot.alerts.map((alert) => (
              <Link key={alert.alert_id} href={alert.href} className="alert" data-sev={alert.severity}>
                <span className="t">{alert.title}</span>
                <span className="s">{alert.detail}</span>
              </Link>
            ))
          )}
        </section>
        <SurveillancePanel surveillance={snapshot.surveillance} live={!demoPlayback} />
      </div>

      <section>
        <div className="row-between" style={{ marginBottom: 8 }}>
          <h3 style={{ margin: 0 }}>Participación en el último turno</h3>
          <span className="s">Solo spans emitidos. Un grafo de 7 componentes in_progress no es este tablero.</span>
        </div>
        {live ? (
          <TurnParticipation trace={live} />
        ) : (
          <div className="empty">Sin turno publicado. Lifecycle no se infiere de /health.</div>
        )}
      </section>

      <section>
        <h3 style={{ margin: '0 0 8px' }}>Métricas derivadas de traces</h3>
        <div className="metrics">
          {snapshot.metrics.length === 0 ? (
            <div className="empty">El snapshot no trajo métricas derivadas.</div>
          ) : null}
          {snapshot.metrics.map((m) => (
            <article key={m.metric_id} className="metric">
              <p className="label">{m.label}</p>
              <p className="value">{m.value}</p>
              <Provenance kind={m.provenance} />
              <details>
                <summary>Qué significa</summary>
                <p>{m.definition}</p>
                <p>{m.caveat}</p>
              </details>
            </article>
          ))}
        </div>
      </section>

      <p className="s">
        {sprint ? `Programa: ${sprint.title}.` : null} {scenario && demoPlayback ? `Escenario de demo: ${scenario.title}.` : null}{' '}
        {live ? (
          <button type="button" className="copy-ref" onClick={() => selectTrace(live.trace_id)}>
            Fijar este turno
          </button>
        ) : null}
      </p>
    </div>
  );
}
