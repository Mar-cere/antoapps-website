'use client';

import Link from 'next/link';
import { useCookieConsent } from '@/lib/hooks/useCookieConsent';
import '@/styles/components/cookie-consent.css';

export default function CookieConsent() {
  const { showBanner, acceptCookies, rejectCookies } = useCookieConsent();

  if (!showBanner) return null;

  return (
    <div id="cookieConsent" className={`cookie-consent ${showBanner ? 'show' : ''}`}>
      <div className="cookie-consent-content">
        <div className="cookie-consent-text">
          <h4>🍪 Uso de Cookies</h4>
          <p>
            Utilizamos cookies para mejorar tu experiencia, analizar el tráfico del sitio y
            personalizar el contenido. Al hacer clic en &quot;Aceptar&quot;, consientes el uso de
            cookies según nuestra{' '}
            <Link href="/privacidad" target="_blank">
              Política de Privacidad
            </Link>
            .
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

