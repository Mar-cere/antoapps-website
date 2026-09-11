import { Provenance } from '@/components/observatory/ui/Provenance';
import type { SurveillanceNote } from '@/lib/observatory/data/types';

export function SurveillancePanel({
  surveillance,
  live,
}: {
  surveillance: SurveillanceNote;
  live: boolean;
}) {
  return (
    <section className="surveillance" aria-label="Vigilancia fuera del projector">
      <div className="row-between">
        <h3>Vigilancia: no está en este projector</h3>
        <Provenance kind={live ? 'unavailable' : surveillance.provenance} />
      </div>
      <p>
        Semantic Cortex, Evidence Surveillance y launch gates LG0–LG6 no salen del poll live. No se rellenan
        ReviewCases ni hipótesis con ceros. LG5 skipped. LG6 blocked. No hay auto-promotion.
      </p>
      <p className="s">{surveillance.note}</p>
      {surveillance.command ? (
        <p className="kv">
          Ops: <code>{surveillance.command}</code>
        </p>
      ) : null}
      <p className="s">
        Tres planos distintos: colección producto <code>metrics</code>, <code>nexus_turn_traces</code>, y Atlas
        Hardware Metrics. Este tablero lee el projector de traces, no Atlas ni /health.
      </p>
    </section>
  );
}
