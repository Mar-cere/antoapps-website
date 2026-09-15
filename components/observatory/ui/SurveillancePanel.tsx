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
    <section className="surveillance" aria-label="Fuera de este poll">
      <div className="row-between">
        <h3>Fuera de este poll</h3>
        <Provenance kind={live ? 'unavailable' : surveillance.provenance} />
      </div>
      <p>Semantic Cortex, reviews y gates LG0–LG6 no salen de este snapshot. No se rellenan con ceros.</p>
      {surveillance.command ? (
        <details className="obs-fold">
          <summary>Comando de ops</summary>
          <p className="kv">
            <code>{surveillance.command}</code>
          </p>
          <p className="s">{surveillance.note}</p>
        </details>
      ) : (
        <p className="s">{surveillance.note}</p>
      )}
    </section>
  );
}
