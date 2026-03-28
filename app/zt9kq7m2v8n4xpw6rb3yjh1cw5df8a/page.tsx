'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import type { ClipboardEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './validacion.module.css';

const UDP_FIC_URL =
  'https://www.udp.cl/pregrado-y-formacion-general/facultades/facultad-de-ingenieria-y-ciencias/';

type ApiRecord = {
  numeroDocumento: string;
  auditoria: string;
  degree: string;
  program: string;
  graduateMasked: string;
  year: number;
};

type ApiOk =
  | { ok: true; status: 'VERIFICADO'; record: ApiRecord }
  | { ok: true; status: 'NO_ENCONTRADO'; message: string }
  | { ok: true; status: 'ANULADO'; message: string; record: ApiRecord };

type ApiErr = {
  ok: false;
  error: string;
  fields?: Record<string, string>;
};

type ResultState =
  | { kind: 'idle' }
  | { kind: 'success'; data: ApiOk }
  | { kind: 'error'; message: string; fields?: Record<string, string> };

function buildAuditoria(parts: string[]) {
  return parts.map((p) => p.trim().toUpperCase()).join('-');
}

function parseAuditoriaPaste(text: string): string[] | null {
  const t = text.trim().toUpperCase().replace(/[^A-Z0-9-]/g, '');
  if (t.includes('-')) {
    const segs = t.split('-').filter(Boolean);
    if (segs.length >= 4) {
      return segs.slice(0, 4).map((s) => s.slice(0, 4));
    }
  }
  const alnum = t.replace(/-/g, '');
  if (alnum.length >= 16) {
    return [
      alnum.slice(0, 4),
      alnum.slice(4, 8),
      alnum.slice(8, 12),
      alnum.slice(12, 16),
    ];
  }
  return null;
}

export default function ValidacionAcademicaPage() {
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [auditParts, setAuditParts] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultState>({ kind: 'idle' });
  const [pageUrl, setPageUrl] = useState<string | null>(null);
  const auditRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    setPageUrl(
      typeof window !== 'undefined'
        ? `${window.location.origin}${window.location.pathname}`
        : null
    );
  }, []);

  function setAuditSegment(index: number, value: string) {
    const v = value.replace(/[^a-z0-9]/gi, '').slice(0, 4).toUpperCase();
    setAuditParts((prev) => {
      const next = [...prev];
      next[index] = v;
      return next;
    });
    if (v.length === 4 && index < 3) {
      auditRefs[index + 1].current?.focus();
    }
  }

  function onAuditPaste(e: ClipboardEvent<HTMLInputElement>) {
    const parsed = parseAuditoriaPaste(e.clipboardData.getData('text'));
    if (parsed) {
      e.preventDefault();
      setAuditParts(parsed);
      auditRefs[3].current?.focus();
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult({ kind: 'idle' });
    const auditoria = buildAuditoria(auditParts);
    try {
      const res = await fetch('/api/rq7vn3k8mx2pw9yt5z', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          numeroDocumento: numeroDocumento.trim(),
          auditoria,
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
        message: 'No se pudo completar la solicitud. Revisa la conexión o intenta más tarde.',
      });
    }
    setLoading(false);
  }

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.headerBlock}>
          <Link
            href={UDP_FIC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.logoLink}
            aria-label="Facultad de Ingeniería y Ciencias, Universidad Diego Portales (sitio externo)"
          >
            <Image
              src="/assets/udp-fic-logo.png"
              alt=""
              width={400}
              height={109}
              className={styles.logoImg}
              priority
              sizes="(max-width: 480px) 100vw, 400px"
            />
          </Link>
          <h1 className={styles.title}>VALIDAR CERTIFICADO</h1>
          <p className={styles.subtitle}>
            Entorno de demostración · no sustituye la validación oficial de la institución
          </p>
        </header>

        <form className={styles.formWrap} onSubmit={onSubmit} noValidate>
          <table className={styles.formTable} role="presentation">
            <tbody>
              <tr className={styles.row}>
                <th className={styles.labelCell} scope="row">
                  Número de Documento (Nº Docto)
                </th>
                <td className={styles.inputCell}>
                  <input
                    id="numeroDocumento"
                    className={styles.docInput}
                    type="text"
                    autoComplete="off"
                    placeholder="Ej. C0BWE5G2T59C6TSOHZ"
                    value={numeroDocumento}
                    onChange={(e) =>
                      setNumeroDocumento(e.target.value.replace(/\s/g, '').toUpperCase())
                    }
                    aria-invalid={result.kind === 'error' && !!result.fields?.numeroDocumento}
                  />
                  {result.kind === 'error' && result.fields?.numeroDocumento ? (
                    <p className={styles.error}>{result.fields.numeroDocumento}</p>
                  ) : null}
                </td>
              </tr>
              <tr className={styles.row}>
                <th className={styles.labelCell} scope="row">
                  Auditoría Autentia
                </th>
                <td className={styles.inputCell}>
                  <div className={styles.auditGroup} role="group" aria-label="Código de auditoría en cuatro bloques">
                    {auditParts.map((part, i) => (
                      <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
                        {i > 0 ? <span className={styles.auditSep}>-</span> : null}
                        <input
                          ref={auditRefs[i]}
                          className={styles.auditBox}
                          type="text"
                          inputMode="text"
                          autoComplete="off"
                          maxLength={4}
                          value={part}
                          onChange={(e) => setAuditSegment(i, e.target.value)}
                          onPaste={onAuditPaste}
                          aria-invalid={result.kind === 'error' && !!result.fields?.auditoria}
                        />
                      </span>
                    ))}
                  </div>
                  {result.kind === 'error' && result.fields?.auditoria ? (
                    <p className={styles.error}>{result.fields.auditoria}</p>
                  ) : null}
                </td>
              </tr>
            </tbody>
          </table>

          {result.kind === 'error' &&
          !result.fields?.numeroDocumento &&
          !result.fields?.auditoria ? (
            <div style={{ padding: '0 1rem' }}>
              <p className={styles.error} role="alert">
                {result.message}
              </p>
            </div>
          ) : null}

          <div className={styles.submitRow}>
            <button type="submit" className={styles.submit} disabled={loading}>
              {loading ? 'Validando…' : 'Validar'}
            </button>
          </div>

          {result.kind === 'success' ? (
            <div style={{ padding: '0 1rem 1rem' }}>
              <ResultPanel data={result.data} />
            </div>
          ) : null}
        </form>

        <section className={styles.guide} aria-labelledby="guide-heading">
          <div id="guide-heading" className={styles.guideBar}>
            Datos al final del Certificado
          </div>
          <div className={styles.guideBody}>
            <figure className={styles.guideFigure}>
              <Image
                src="/assets/certificado-footer-ejemplo.png"
                alt="Ejemplo: en el bloque azul aparece Verificado y Firmado por y el Nº Docto; debajo, en fondo blanco, el texto Auditoría Autentia con el código en cuatro segmentos."
                width={880}
                height={300}
                className={styles.guideReferenceImg}
                sizes="(max-width: 600px) 100vw, 560px"
              />
              <figcaption className={styles.guideCaption}>
                Ejemplo de referencia: el <strong>Nº Docto</strong> suele ir en el recuadro azul junto a la firma; la{' '}
                <strong>Auditoría Autentia</strong> en la franja inferior (formato con guiones).
              </figcaption>
            </figure>

            <div className={styles.guideSpacer}>
              <p className={styles.guideSpacerTitle}>Datos para esta demostración</p>
            </div>
            <div className={styles.guideBlue}>
              <p>Verificado y Firmado por</p>
              <div className={styles.guideSeal} aria-hidden />
              <div className={styles.arrowBlock}>
                <span className={styles.arrow} aria-hidden>
                  ↘
                </span>
                <p className={styles.arrowNote}>
                  <strong>Nº Docto:</strong> aparece junto al bloque de firma (ejemplo:{' '}
                  <span style={{ fontFamily: 'ui-monospace, monospace' }}>C0BWE5G2T59C6TSOHZ</span>).
                </p>
              </div>
              <div className={styles.arrowBlock}>
                <span className={styles.arrow} aria-hidden>
                  ↘
                </span>
                <p className={styles.arrowNote}>
                  <strong>Auditoría Autentia:</strong> cuatro grupos de cuatro caracteres (ejemplo:{' '}
                  <span style={{ fontFamily: 'ui-monospace, monospace' }}>6FFK-PB90-Z3JP-HI3N</span>).
                </p>
              </div>
              <p className={styles.guideLine}>
                - Nº Docto: C0BWE5G2T59C6TSOHZ
                <br />
                Auditoría Autentia: 6FFK-PB90-Z3JP-HI3N
              </p>
            </div>
          </div>
        </section>

        <div className={styles.samples}>
          <strong style={{ color: '#475569' }}>Casos de prueba (demostración):</strong>
          <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.1rem' }}>
            <li>
              <code>C0BWE5G2T59C6TSOHZ</code> + <code>6FFK-PB90-Z3JP-HI3N</code> → <strong>vigente</strong>
            </li>
            <li>
              <code>DEMO1800001F09BD50CE2</code> + <code>DEMO-T1FL-8USS-A1B2</code> → vigente
            </li>
            <li>
              <code>CERT2019008821ABCDEF</code> + <code>PUCC-X2YK-9MZN-C3D4</code> → vigente
            </li>
            <li>
              <code>CERT2018550012FEDCBA</code> + <code>USAC-W3ZL-0NAO-D5E6</code> → anulado
            </li>
          </ul>
          <p style={{ margin: '0.75rem 0 0' }}>
            Ruta relativa: <code>/zt9kq7m2v8n4xpw6rb3yjh1cw5df8a</code>
          </p>
          {pageUrl ? (
            <p style={{ margin: '0.5rem 0 0', wordBreak: 'break-all' }}>
              URL completa: <code>{pageUrl}</code>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ResultPanel({ data }: { data: ApiOk }) {
  if (data.status === 'VERIFICADO') {
    return (
      <div className={`${styles.result} ${styles.resultOk}`} role="status">
        <div className={styles.resultTitle}>Certificado verificado</div>
        <p style={{ margin: 0, color: '#166534' }}>
          Coincidencia en la base de demostración. Datos parciales por privacidad.
        </p>
        <RecordList record={data.record} />
      </div>
    );
  }
  if (data.status === 'ANULADO') {
    return (
      <div className={`${styles.result} ${styles.resultBad}`} role="status">
        <div className={styles.resultTitle}>Certificado anulado</div>
        <p style={{ margin: 0, color: '#991b1b' }}>{data.message}</p>
        <RecordList record={data.record} />
      </div>
    );
  }
  return (
    <div className={`${styles.result} ${styles.resultNeutral}`} role="status">
      <div className={styles.resultTitle}>Sin coincidencia</div>
      <p style={{ margin: 0, color: '#475569' }}>{data.message}</p>
    </div>
  );
}

function RecordList({ record }: { record: ApiRecord }) {
  return (
    <dl className={styles.dl}>
      <dt>Nº documento</dt>
      <dd>{record.numeroDocumento}</dd>
      <dt>Auditoría</dt>
      <dd>{record.auditoria}</dd>
      <dt>Grado / título</dt>
      <dd>{record.degree}</dd>
      <dt>Programa</dt>
      <dd>{record.program}</dd>
      <dt>Titular</dt>
      <dd>{record.graduateMasked}</dd>
      <dt>Año registro</dt>
      <dd>{record.year}</dd>
    </dl>
  );
}
