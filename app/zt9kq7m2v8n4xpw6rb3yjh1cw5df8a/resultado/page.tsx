'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  CERT_VALIDACION_STORAGE_KEY,
  type ValidacionExitoPayload,
} from '@/lib/validacion-certificado';
import styles from './resultado.module.css';

function formatFecha(iso: string) {
  try {
    const [y, m, d] = iso.split('-').map(Number);
    if (!y || !m || !d) return iso;
    return new Intl.DateTimeFormat('es-CL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(y, m - 1, d));
  } catch {
    return iso;
  }
}

export default function ResultadoCertificadoPage() {
  const router = useRouter();
  const pathname = usePathname();
  const basePath = pathname.replace(/\/resultado\/?$/, '') || '/';
  const [payload, setPayload] = useState<ValidacionExitoPayload | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = typeof window !== 'undefined' ? sessionStorage.getItem(CERT_VALIDACION_STORAGE_KEY) : null;
    if (!raw) {
      router.replace(basePath);
      return;
    }
    try {
      const data = JSON.parse(raw) as ValidacionExitoPayload;
      if (!data?.ok || (data.status !== 'VERIFICADO' && data.status !== 'ANULADO') || !data.record) {
        router.replace(basePath);
        return;
      }
      setPayload(data);
    } catch {
      router.replace(basePath);
      return;
    }
    setReady(true);
  }, [router, basePath]);

  if (!ready || !payload) {
    return (
      <div className={styles.page}>
        <p className={styles.loading}>Cargando resultado…</p>
      </div>
    );
  }

  const r = payload.record;
  const esAnulado = payload.status === 'ANULADO';

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.topBar}>
          <Link href={basePath} className={styles.backLink}>
            ← Volver a validar certificado
          </Link>
          {esAnulado ? (
            <span className={styles.badgeBad}>No vigente</span>
          ) : (
            <span className={styles.badgeOk}>Válido</span>
          )}
        </div>

        <h1 className={styles.title}>Resultado de la validación</h1>
        <p className={styles.lead}>
          Los datos mostrados corresponden a la demostración. En producción, la institución define el alcance
          exacto de la información.
        </p>

        <section className={styles.card} aria-labelledby="sec-titular">
          <h2 id="sec-titular" className={styles.cardHeader}>
            1 · Datos básicos del titular
          </h2>
          <div className={styles.cardBody}>
            <p style={{ margin: '0 0 0.75rem', fontSize: '0.82rem', color: '#64748b' }}>
              Mínimo necesario para confirmar identidad en la consulta.
            </p>
            <dl className={styles.defList}>
              <div className={styles.row}>
                <dt className={styles.dt}>Nombre completo</dt>
                <dd className={styles.dd}>{r.nombreCompleto}</dd>
              </div>
              <div className={styles.row}>
                <dt className={styles.dt}>RUT</dt>
                <dd className={styles.dd}>{r.rutEnmascarado}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className={styles.card} aria-labelledby="sec-tipo">
          <h2 id="sec-tipo" className={styles.cardHeader}>
            2 · Tipo de certificado
          </h2>
          <div className={styles.cardBody}>
            <p style={{ margin: '0 0 0.75rem', fontSize: '0.82rem', color: '#64748b' }}>
              Referencia al catálogo de certificados (demostración).
            </p>
            <dl className={styles.defList}>
              <div className={styles.row}>
                <dt className={styles.dt}>Tipo</dt>
                <dd className={styles.dd}>{r.tipoCertificado}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className={styles.card} aria-labelledby="sec-academico">
          <h2 id="sec-academico" className={styles.cardHeader}>
            3 · Datos académicos clave
          </h2>
          <div className={styles.cardBody}>
            <dl className={styles.defList}>
              <div className={styles.row}>
                <dt className={styles.dt}>Carrera</dt>
                <dd className={styles.dd}>{r.carrera}</dd>
              </div>
              <div className={styles.row}>
                <dt className={styles.dt}>Grado</dt>
                <dd className={styles.dd}>{r.grado}</dd>
              </div>
              <div className={styles.row}>
                <dt className={styles.dt}>Título profesional</dt>
                <dd className={styles.dd}>{r.tituloProfesional}</dd>
              </div>
              <div className={styles.row}>
                <dt className={styles.dt}>Estado</dt>
                <dd className={styles.dd}>{r.estadoAcademico}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className={styles.card} aria-labelledby="sec-fecha">
          <h2 id="sec-fecha" className={styles.cardHeader}>
            4 · Solicitud, emisión y documento
          </h2>
          <div className={styles.cardBody}>
            <dl className={styles.defList}>
              {r.fechaSolicitudEmision ? (
                <div className={styles.row}>
                  <dt className={styles.dt}>Solicitud de emisión</dt>
                  <dd className={styles.dd}>{formatFecha(r.fechaSolicitudEmision)}</dd>
                </div>
              ) : null}
              <div className={styles.row}>
                <dt className={styles.dt}>Emisión del documento</dt>
                <dd className={styles.dd}>{formatFecha(r.fechaEmision)}</dd>
              </div>
              <div className={styles.row}>
                <dt className={styles.dt}>Nº documento</dt>
                <dd className={styles.dd} style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.85rem' }}>
                  {r.numeroDocumento}
                </dd>
              </div>
              <div className={styles.row}>
                <dt className={styles.dt}>Auditoría Autentia</dt>
                <dd className={styles.dd} style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.85rem' }}>
                  {r.auditoria}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className={styles.card} aria-labelledby="sec-validez">
          <h2 id="sec-validez" className={styles.cardHeader}>
            5 · Estado de validez
          </h2>
          <div className={styles.cardBody}>
            <p style={{ margin: '0 0 0.75rem', fontSize: '0.82rem', color: '#64748b' }}>
              Objetivo principal de la consulta: autenticidad y firma electrónica.
            </p>
            <dl className={styles.defList}>
              <div className={styles.row}>
                <dt className={styles.dt}>Estado</dt>
                <dd className={styles.dd}>
                  <strong>{r.estadoValidez === 'VÁLIDO' ? 'Válido' : 'No vigente'}</strong>
                  {' · '}
                  {r.etiquetaValidez}
                </dd>
              </div>
              <div className={styles.row}>
                <dt className={styles.dt}>Firma electrónica</dt>
                <dd className={styles.dd}>
                  {r.firmaElectronicaVerificada
                    ? 'Confirmada — documento auténtico según esta consulta'
                    : 'No validada como vigente'}
                </dd>
              </div>
            </dl>
            <div
              className={`${styles.highlightBox} ${esAnulado ? styles.warn : ''}`}
              role="status"
            >
              <div className={styles.highlightTitle}>
                {r.firmaElectronicaVerificada ? 'Confirmación de firma' : 'Aviso'}
              </div>
              {r.mensajeFirmaElectronica}
              {esAnulado && payload.message ? (
                <>
                  <hr className={styles.divider} />
                  {payload.message}
                </>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
