'use client';

import { useState, useRef, FormEvent } from 'react';
import type { ClipboardEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { CERT_VALIDACION_STORAGE_KEY, type ValidacionExitoPayload } from '@/lib/validacion-certificado';
import styles from './validacion.module.css';

const UDP_FIC_URL =
  'https://www.udp.cl/pregrado-y-formacion-general/facultades/facultad-de-ingenieria-y-ciencias/';

type ApiOk = ValidacionExitoPayload | { ok: true; status: 'NO_ENCONTRADO'; message: string };

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
  const router = useRouter();
  const pathname = usePathname();
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [auditParts, setAuditParts] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultState>({ kind: 'idle' });
  const auditRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

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
      if (data.status === 'VERIFICADO' || data.status === 'ANULADO') {
        sessionStorage.setItem(CERT_VALIDACION_STORAGE_KEY, JSON.stringify(data));
        router.push(`${pathname}/resultado`);
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

          {result.kind === 'success' && result.data.status === 'NO_ENCONTRADO' ? (
            <div style={{ padding: '0 1rem 1rem' }}>
              <div className={`${styles.result} ${styles.resultNeutral}`} role="status">
                <div className={styles.resultTitle}>Sin coincidencia</div>
                <p style={{ margin: 0, color: '#475569' }}>{result.data.message}</p>
              </div>
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
          </div>
        </section>
      </div>
    </div>
  );
}
