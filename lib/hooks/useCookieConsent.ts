'use client';

import { useEffect, useState } from 'react';
import { trackCustomEvent } from '@/lib/analytics/events';

export function useCookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    // Verificar si ya hay consentimiento
    const savedConsent = localStorage.getItem('cookieConsent');
    
    if (savedConsent) {
      setConsent(savedConsent);
      if (savedConsent === 'accepted') {
        // Cargar analytics si está disponible
        if (typeof window !== 'undefined') {
          import('@/lib/hooks/useAnalytics').then((module) => {
            module.initAnalytics();
          });
          import('@/lib/analytics/meta-pixel').then((module) => {
            module.initMetaPixel();
          });
        }
      }
    } else {
      // Mostrar banner después de un delay
      setTimeout(() => {
        setShowBanner(true);
      }, 500);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setConsent('accepted');
    setShowBanner(false);
    
    // Cargar analytics
    if (typeof window !== 'undefined') {
      import('@/lib/hooks/useAnalytics').then((module) => {
        module.initAnalytics();
        trackCustomEvent('cookie_consent', { status: 'accepted' });
      });
      import('@/lib/analytics/meta-pixel').then((module) => {
        module.initMetaPixel();
      });
    }
  };

  const rejectCookies = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setConsent('rejected');
    setShowBanner(false);
    trackCustomEvent('cookie_consent', { status: 'rejected' });
  };

  return {
    showBanner,
    consent,
    acceptCookies,
    rejectCookies,
  };
}

