'use client';

import { useEffect, useState } from 'react';
import { trackCustomEvent } from '@/lib/analytics/events';

type UseCookieConsentOptions = {
  /** Retraso mínimo antes de mostrar el banner (ms). */
  bannerDelayMs?: number;
  /** Mostrar también tras desplazarse esta cantidad de px. */
  showAfterScrollPx?: number;
};

export function useCookieConsent(options: UseCookieConsentOptions = {}) {
  const { bannerDelayMs = 500, showAfterScrollPx } = options;
  const [showBanner, setShowBanner] = useState(false);
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookieConsent');

    if (savedConsent) {
      setConsent(savedConsent);
      if (savedConsent === 'accepted') {
        if (typeof window !== 'undefined') {
          import('@/lib/hooks/useAnalytics').then((module) => {
            module.initAnalytics();
          });
          import('@/lib/analytics/meta-pixel').then((module) => {
            module.initMetaPixel();
          });
        }
      }
      return;
    }

    let shown = false;
    const revealBanner = () => {
      if (shown) return;
      shown = true;
      setShowBanner(true);
    };

    const delayTimer = window.setTimeout(revealBanner, bannerDelayMs);

    const onScroll = () => {
      if (showAfterScrollPx != null && window.scrollY >= showAfterScrollPx) {
        revealBanner();
      }
    };

    if (showAfterScrollPx != null) {
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    return () => {
      window.clearTimeout(delayTimer);
      if (showAfterScrollPx != null) {
        window.removeEventListener('scroll', onScroll);
      }
    };
  }, [bannerDelayMs, showAfterScrollPx]);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setConsent('accepted');
    setShowBanner(false);

    if (typeof window !== 'undefined') {
      import('@/lib/hooks/useAnalytics').then((module) => {
        module.initAnalytics();
        trackCustomEvent('cookie_consent', { status: 'accepted' });
      });
      import('@/lib/analytics/meta-pixel').then((module) => {
        module.initMetaPixel();
      });
      window.dispatchEvent(new Event('cookie-consent-accepted'));
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
