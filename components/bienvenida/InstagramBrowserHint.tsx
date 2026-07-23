'use client';

import { useEffect, useState } from 'react';
import { detectInAppBrowser } from '@/lib/device/in-app-browser';
import type { BienvenidaCopy } from '@/lib/i18n/copy/bienvenida';

type InstagramBrowserHintProps = {
  copy: BienvenidaCopy['inAppHint'];
  locale: 'es' | 'en';
  /** banner = arriba; cta = nota corta junto al CTA de descarga */
  variant?: 'banner' | 'cta';
};

export default function InstagramBrowserHint({
  copy,
  locale,
  variant = 'banner',
}: InstagramBrowserHintProps) {
  const [platform, setPlatform] = useState<'ios' | 'android' | null>(null);

  useEffect(() => {
    setPlatform(detectInAppBrowser());
  }, []);

  if (!platform) return null;

  const browserAction = platform === 'ios' ? copy.iosBrowser : copy.androidBrowser;

  if (variant === 'cta') {
    // En Android la ruta útil es waitlist; el hint de Safari/Chrome solo aporta en iOS.
    if (platform !== 'ios') return null;
    return (
      <p className="lad-v2-inapp-cta-note" role="note">
        {locale === 'en' ? (
          <>
            Download blocked? Tap <strong>⋯</strong> → <strong>{browserAction}</strong>
          </>
        ) : (
          <>
            ¿No abre? Toca <strong>⋯</strong> → <strong>{browserAction}</strong>
          </>
        )}
      </p>
    );
  }

  return (
    <div className="lad-inapp-hint" role="status">
      <p>
        {locale === 'en' ? (
          <>
            To download reliably, tap <strong>⋯</strong> at the top right and choose{' '}
            <strong>{browserAction}</strong>.
          </>
        ) : (
          <>
            Para descargar sin fricción, toca <strong>⋯</strong> arriba a la derecha y elige{' '}
            <strong>{browserAction}</strong>.
          </>
        )}
      </p>
    </div>
  );
}
