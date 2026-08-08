'use client';

import { useEffect } from 'react';
import { initClarity } from '@/lib/analytics/clarity';

/** Arranca Clarity en el root si el usuario ya aceptó cookies, o al aceptar. */
export default function ClarityAnalytics() {
  useEffect(() => {
    const tryInit = () => {
      if (localStorage.getItem('cookieConsent') === 'accepted') {
        initClarity();
      }
    };

    tryInit();
    window.addEventListener('cookie-consent-accepted', tryInit);
    return () => window.removeEventListener('cookie-consent-accepted', tryInit);
  }, []);

  return null;
}
