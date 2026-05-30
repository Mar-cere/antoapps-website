'use client';

import { useEffect, useState } from 'react';

function isInstagramInAppBrowser(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isInApp = /Instagram|FBAN|FBAV|FBIOS|Line\//i.test(ua);
  return isIOS && isInApp;
}

type InstagramBrowserHintProps = {
  locale: 'es' | 'en';
};

export default function InstagramBrowserHint({ locale }: InstagramBrowserHintProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(isInstagramInAppBrowser());
  }, []);

  if (!visible) return null;

  return (
    <div className="lad-inapp-hint" role="status">
      <p>
        {locale === 'en' ? (
          <>
            If download does not open, tap <strong>⋯</strong> at the top right and choose{' '}
            <strong>Open in Safari</strong>.
          </>
        ) : (
          <>
            Si la descarga no abre, toca <strong>⋯</strong> arriba a la derecha y elige{' '}
            <strong>Abrir en Safari</strong>.
          </>
        )}
      </p>
    </div>
  );
}
