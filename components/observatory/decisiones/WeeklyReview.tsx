'use client';

import { useState } from 'react';
import { CopyRef } from '@/components/observatory/ui/CopyRef';
import { MuteChips } from '@/components/observatory/ui/MuteChips';
import { factLabel, sliceLabel } from '@/lib/observatory/copy/labels';
import { weeklyReviewMessage } from '@/lib/observatory/copy/weekReading';
import { formatTurnWhen } from '@/lib/observatory/data/turnDecision';
import type { WeeklyReview, WeeklyReviewMark, WeeklyReviewRow } from '@/lib/observatory/data/types';

const MARK_LABEL: Record<WeeklyReviewMark, string> = {
  esperada: 'Esperada. No es bug.',
  a_mirar: 'A mirar.',
  applied: 'Applied. Estado prohibido.',
};

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function rowFacts(row: WeeklyReviewRow) {
  return [
    ['Lectura', MARK_LABEL[row.mark]],
    ['Fecha', formatTurnWhen(row.at ?? '')],
    ['Quién', factLabel(row.surface)],
    ['Slice', sliceLabel(row.slice)],
    ['Supresión', factLabel(row.conversionSuppression)],
    ['Activación', factLabel(row.activationBand)],
    ['Ruta de safety', factLabel(row.safetyRoute)],
    ['Riesgo', factLabel(row.riskClass)],
    ['Cue', factLabel(row.cue)],
    ['Modo', factLabel(row.mode)],
    ['Motivo', factLabel(row.reason)],
    ['Decisión de extras', factLabel(row.extrasDecision)],
    ['Dominio', factLabel(row.extrasDomain)],
  ] as const;
}

export function WeeklyReviewPanel({
  review,
  error,
  stageLabel,
}: {
  review: WeeklyReview | null;
  error: string | null;
  stageLabel: string;
}) {
  const [mark, setMark] = useState<'all' | WeeklyReviewMark>('all');
  const [selectedRef, setSelectedRef] = useState<string | null>(null);
  const rows = review?.rows ?? [];
  const visible = mark === 'all' ? rows : rows.filter((row) => row.mark === mark);
  const selected = visible.find((row) => row.ref === selectedRef) ?? visible[0] ?? null;
  const message = error ?? weeklyReviewMessage(review);
  const tone = review?.truncated || review?.reading === 'watch' ? 'vigilar' : 'no_es_bug';
  const empty = rows.length > 0 ? 'Ninguna fila coincide con el filtro.' : message;

  return (
    <div className="page">
      <header>
        <h2>Decisiones</h2>
        <p>Filas marcadas de los últimos 7 días, en Cuenta. Sin texto de conversación.</p>
      </header>
      <p className="s">En vivo: {stageLabel}.</p>
      <form className="turn-filters" onSubmit={(event) => event.preventDefault()} aria-label="Filtro de la revisión">
        <label>
          Lectura
          <select value={mark} onChange={(event) => setMark(event.target.value as 'all' | WeeklyReviewMark)}>
            <option value="all">Todas</option>
            <option value="a_mirar">A mirar</option>
            <option value="esperada">Esperadas</option>
            <option value="applied">Applied</option>
          </select>
        </label>
        <p className="s">
          {visible.length} de {rows.length}
        </p>
      </form>

      {rows.length > 0 && !error ? (
        <p className="week-reading" data-note={tone}>
          {message}
        </p>
      ) : null}

      {visible.length === 0 || !selected ? (
        <div className="empty">{rows.length > 0 && !error ? empty : message}</div>
      ) : (
        <div className="decision-layout">
          <section className="turn-rail">
            <h3>Filas marcadas</h3>
            <div className="list turn-picker" role="listbox" aria-label="Filas marcadas de la semana">
              {visible.map((row) => (
                <button
                  key={row.ref}
                  type="button"
                  role="option"
                  aria-selected={row.ref === selected.ref}
                  data-case={row.mark === 'esperada' ? undefined : 'suppression'}
                  onClick={() => setSelectedRef(row.ref)}
                >
                  <span className="t">
                    {row.ref}
                    {row.mark === 'esperada' ? (
                      <span className="s">No es bug</span>
                    ) : (
                      <span className="turn-case">{row.mark === 'applied' ? 'Applied' : 'A mirar'}</span>
                    )}
                  </span>
                  <span className="s">
                    {formatTurnWhen(row.at ?? '')} · {sliceLabel(row.slice)} · {factLabel(row.conversionSuppression)}
                  </span>
                </button>
              ))}
            </div>
          </section>
          <div className="decision-main">
            <section className="decision-lead">
              <p className="decision-headline">{MARK_LABEL[selected.mark]}</p>
              <p className="s">
                <CopyRef label="turno" value={selected.ref} />
              </p>
            </section>
            <dl className="turn-context" aria-label="Fila marcada">
              {rowFacts(selected).map(([label, value]) => (
                <Field key={label} label={label} value={value} />
              ))}
              <div>
                <dt>Silencio</dt>
                <dd>{selected.muteFlags.length === 0 ? 'Ninguno' : <MuteChips flags={selected.muteFlags} />}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
