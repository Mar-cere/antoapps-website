'use client';

import { useEffect, useState } from 'react';
import { detectInAppBrowser } from '@/lib/device/in-app-browser';
import type { BienvenidaCopy } from '@/lib/i18n/copy/bienvenida';

type InstagramBrowserHintProps = {
  copy: BienvenidaCopy['inAppHint'];
  locale: 'es' | 'en';
};

export default function InstagramBrowserHint({ copy, locale }: InstagramBrowserHintProps) {
  const [platform, setPlatform] = useState<'ios' | 'android' | null>(null);

  useEffect(() => {
    setPlatform(detectInAppBrowser());
  }, []);

  if (!platform) return null;

  const browserAction =
    platform === 'ios' ? copy.iosBrowser : copy.androidBrowser;

  return (
    <div className="lad-inapp-hint" role="status">
      <p>
        {locale === 'en' ? (
          <>
            If download does not open, tap <strong>⋯</strong> at the top right and choose{' '}
            <strong>{browserAction}</strong>.
          </>
        ) : (
          <>
            Si la descarga no abre, toca <strong>⋯</strong> arriba a la derecha y elige{' '}
            <strong>{browserAction}</strong>.
          </>
        )}
      </p>
    </div>
  );
}
