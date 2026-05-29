'use client';

import Link from 'next/link';
import { useCookieConsent } from '@/lib/hooks/useCookieConsent';
import '@/styles/components/cookie-consent.css';

type CookieConsentProps = {
  compact?: boolean;
  /** Retraso antes de mostrar (ms). Por defecto 500. */
  bannerDelayMs?: number;
  /** Mostrar también tras scroll (px). */
  showAfterScrollPx?: number;
};

export default function CookieConsent({
  compact = false,
  bannerDelayMs,
  showAfterScrollPx,
}: CookieConsentProps) {
  const { showBanner, acceptCookies, rejectCookies } = useCookieConsent({
    bannerDelayMs,
    showAfterScrollPx,
  });

  if (!showBanner) return null;

  return (
    <div
      id="cookieConsent"
      className={`cookie-consent ${showBanner ? 'show' : ''} ${compact ? 'cookie-consent--compact' : ''}`}
    >
      <div className="cookie-consent-content">
        <div className="cookie-consent-text">
          {!compact && <h4>🍪 Uso de Cookies</h4>}
          <p>
            {compact ? (
              <>
                Usamos cookies para analítica.{' '}
                <Link href="/privacidad" target="_blank">
                  Privacidad
                </Link>
                .
              </>
            ) : (
              <>
                Utilizamos cookies para mejorar tu experiencia, analizar el tráfico del sitio y
                personalizar el contenido. Al hacer clic en &quot;Aceptar&quot;, consientes el uso de
                cookies según nuestra{' '}
                <Link href="/privacidad" target="_blank">
                  Política de Privacidad
                </Link>
                .
              </>
            )}
          </p>
        </div>
        <div className="cookie-consent-actions">
          <button className="btn btn-secondary" onClick={rejectCookies}>
            Rechazar
          </button>
          <button className="btn btn-primary" onClick={acceptCookies}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
