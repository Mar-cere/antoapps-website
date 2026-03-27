'use client';

import { useState, FormEvent } from 'react';
import styles from './validacion.module.css';

type ApiRecord = {
  folio: string;
  degree: string;
  program: string;
  graduateMasked: string;
  year: number;
};

type ApiOk =
  | {
      ok: true;
      status: 'VERIFICADO';
      record: ApiRecord;
    }
  | {
      ok: true;
      status: 'NO_ENCONTRADO';
      message: string;
    }
  | {
      ok: true;
      status: 'ANULADO';
      message: string;
      record: ApiRecord;
    };

type ApiErr = {
  ok: false;
  error: string;
  fields?: Record<string, string>;
};

type ResultState =
  | { kind: 'idle' }
  | { kind: 'success'; data: ApiOk }
  | { kind: 'error'; message: string; fields?: Record<string, string> };

const INSTITUTIONS = [
  { value: 'UCH', label: 'Universidad de Chile (simulado)' },
  { value: 'PUC', label: 'Pontificia Universidad Católica (simulado)' },
  { value: 'USACH', label: 'Universidad de Santiago (simulado)' },
];

export default function ValidacionAcademicaPage() {
  const [inst, setInst] = useState('');
  const [folio, setFolio] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultState>({ kind: 'idle' });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult({ kind: 'idle' });
    try {
      const res = await fetch('/api/validar-titulo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inst,
          folio: folio.trim(),
          year: year.trim() === '' ? NaN : Number.parseInt(year, 10),
        }),
      });
      const data = (await res.json()) as ApiOk | ApiErr;
      if (!data.ok) {
        setResult({
          kind: 'error',
          message: data.error,
          fields: data.fields,
        });
        setLoading(false);
        return;
      }
      setResult({ kind: 'success', data });
    } catch {
      setResult({
        kind: 'error',
        message: 'No se pudo contactar al servidor. ¿Está corriendo `next dev` o `next start`?',
      });
    }
    setLoading(false);
  }

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <span className={styles.badge}>Demo técnico · sin vínculo al sitio principal</span>
        <h1 className={styles.title}>Validador de títulos universitarios</h1>
        <p className={styles.lead}>
          Envío de datos simulado: la API usa un registro ficticio para demostrar estados{' '}
          <strong>verificado</strong>, <strong>no encontrado</strong> y <strong>anulado</strong>. No
          sustituye una consulta oficial ante la institución o el Ministerio de Educación.
        </p>

        <form className={styles.card} onSubmit={onSubmit} noValidate>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="inst">
              Institución
            </label>
            <select
              id="inst"
              className={styles.select}
              value={inst}
              onChange={(e) => setInst(e.target.value)}
              required
              aria-invalid={result.kind === 'error' && !!result.fields?.inst}
            >
              <option value="">Selecciona…</option>
              {INSTITUTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            {result.kind === 'error' && result.fields?.inst ? (
              <p className={styles.error}>{result.fields.inst}</p>
            ) : null}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="folio">
              Folio del título
            </label>
            <input
              id="folio"
              className={styles.input}
              type="text"
              autoComplete="off"
              placeholder="Ej. TIT-2021-100234"
              value={folio}
              onChange={(e) => setFolio(e.target.value)}
              aria-invalid={result.kind === 'error' && !!result.fields?.folio}
            />
            <p className={styles.hint}>Patrón: TIT-AAAA-NÚMERO (4 a 8 dígitos finales).</p>
            {result.kind === 'error' && result.fields?.folio ? (
              <p className={styles.error}>{result.fields.folio}</p>
            ) : null}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="year">
              Año de emisión
            </label>
            <input
              id="year"
              className={styles.input}
              type="number"
              min={1990}
              max={new Date().getFullYear() + 1}
              placeholder="Ej. 2021"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              aria-invalid={result.kind === 'error' && !!result.fields?.year}
            />
            {result.kind === 'error' && result.fields?.year ? (
              <p className={styles.error}>{result.fields.year}</p>
            ) : null}
          </div>

          {result.kind === 'error' && !result.fields?.folio && !result.fields?.inst && !result.fields?.year ? (
            <p className={styles.error} role="alert">
              {result.message}
            </p>
          ) : null}

          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? 'Validando…' : 'Validar registro'}
          </button>

          {result.kind === 'success' ? (
            <ResultPanel data={result.data} />
          ) : null}
        </form>

        <div className={styles.samples}>
          <strong style={{ color: 'rgba(232,238,244,0.82)' }}>Datos de prueba en el simulador:</strong>
          <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.1rem' }}>
            <li>
              <code>UCH</code> · <code>TIT-2021-100234</code> · año <code>2021</code> → vigente
            </li>
            <li>
              <code>PUC</code> · <code>TIT-2019-008821</code> · año <code>2019</code> → vigente
            </li>
            <li>
              <code>USACH</code> · <code>TIT-2018-550012</code> · año <code>2018</code> → anulado
            </li>
          </ul>
          <p style={{ margin: '0.75rem 0 0' }}>
            URL directa (no está en el menú del sitio):{' '}
            <code>/zt9kq7m2v8n4xpw6rb3yjh1cw5df8a</code>
          </p>
        </div>
      </div>
    </div>
  );
}

function ResultPanel({ data }: { data: ApiOk }) {
  if (data.status === 'VERIFICADO') {
    return (
      <div className={`${styles.result} ${styles.resultOk}`} role="status">
        <div className={styles.resultTitle}>Título verificado (simulación)</div>
        <p style={{ margin: 0, opacity: 0.92 }}>
          El registro coincide con el simulador. Datos parciales mostrados por privacidad.
        </p>
        <RecordList record={data.record} />
      </div>
    );
  }
  if (data.status === 'ANULADO') {
    return (
      <div className={`${styles.result} ${styles.resultBad}`} role="status">
        <div className={styles.resultTitle}>Título anulado (simulación)</div>
        <p style={{ margin: 0, opacity: 0.92 }}>{data.message}</p>
        <RecordList record={data.record} />
      </div>
    );
  }
  return (
    <div className={`${styles.result} ${styles.resultNeutral}`} role="status">
      <div className={styles.resultTitle}>Sin coincidencia en el simulador</div>
      <p style={{ margin: 0, opacity: 0.92 }}>{data.message}</p>
    </div>
  );
}

function RecordList({ record }: { record: ApiRecord }) {
  return (
    <dl className={styles.dl}>
      <dt>Folio</dt>
      <dd>{record.folio}</dd>
      <dt>Grado</dt>
      <dd>{record.degree}</dd>
      <dt>Programa</dt>
      <dd>{record.program}</dd>
      <dt>Titular (enmascarado)</dt>
      <dd>{record.graduateMasked}</dd>
      <dt>Año</dt>
      <dd>{record.year}</dd>
    </dl>
  );
}
