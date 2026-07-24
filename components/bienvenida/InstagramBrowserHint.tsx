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

  // En Android la ruta útil es waitlist; el hint Safari/Chrome solo aporta en iOS.
  if (platform !== 'ios') return null;

  if (variant === 'cta') {
    return (
      <p className="lad-v2-inapp-cta-note" role="note">
        {locale === 'en' ? (
          <>
            If it doesn&apos;t open: <strong>⋯</strong> → <strong>{browserAction}</strong>
          </>
        ) : (
          <>
            Si no abre: <strong>⋯</strong> → <strong>{browserAction}</strong>
          </>
        )}
      </p>
    );
  }

  return (
    <div className="lad-inapp-hint lad-inapp-hint--quiet" role="status">
      <p>
        {locale === 'en' ? (
          <>
            Tap <strong>⋯</strong> → <strong>{browserAction}</strong> to download
          </>
        ) : (
          <>
            Toca <strong>⋯</strong> → <strong>{browserAction}</strong> para descargar
          </>
        )}
      </p>
    </div>
  );
}
