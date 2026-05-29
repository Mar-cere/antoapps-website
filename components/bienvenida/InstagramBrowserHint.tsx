'use client';

import { useEffect, useState } from 'react';

function isInstagramInAppBrowser(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isInApp = /Instagram|FBAN|FBAV|FBIOS|Line\//i.test(ua);
  return isIOS && isInApp;
}

export default function InstagramBrowserHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(isInstagramInAppBrowser());
  }, []);

  if (!visible) return null;

  return (
    <div className="lad-inapp-hint" role="status">
      <p>
        Si la descarga no abre, toca <strong>⋯</strong> arriba a la derecha y elige{' '}
        <strong>Abrir en Safari</strong>.
      </p>
    </div>
  );
}
