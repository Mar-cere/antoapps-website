'use client';

import { useEffect, useState } from 'react';
import { trackCustomEvent } from '@/lib/analytics/events';

type UseCookieConsentOptions = {
  /** Retraso mínimo antes de mostrar el banner (ms). */
  bannerDelayMs?: number;
  /** Umbral de scroll (px). Si se define, hace falta delay Y scroll. */
  showAfterScrollPx?: number;
  /** Overrides en viewport estrecho (solo si se pasan). */
  mobileBannerDelayMs?: number;
  mobileShowAfterScrollPx?: number;
  mobileMaxWidthPx?: number;
};

function resolveTiming({
  bannerDelayMs = 500,
  showAfterScrollPx,
  mobileBannerDelayMs,
  mobileShowAfterScrollPx,
  mobileMaxWidthPx = 767,
}: UseCookieConsentOptions) {
  const isMobile =
    typeof window !== 'undefined' &&
    window.matchMedia(`(max-width: ${mobileMaxWidthPx}px)`).matches;

  return {
    bannerDelayMs:
      isMobile && mobileBannerDelayMs != null ? mobileBannerDelayMs : bannerDelayMs,
    showAfterScrollPx:
      isMobile && mobileShowAfterScrollPx != null
        ? mobileShowAfterScrollPx
        : showAfterScrollPx,
  };
}

export function useCookieConsent(options: UseCookieConsentOptions = {}) {
  const {
    bannerDelayMs = 500,
    showAfterScrollPx,
    mobileBannerDelayMs,
    mobileShowAfterScrollPx,
    mobileMaxWidthPx = 767,
  } = options;

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
          import('@/lib/analytics/clarity').then((module) => {
            module.initClarity();
          });
        }
      }
      return;
    }

    const timing = resolveTiming({
      bannerDelayMs,
      showAfterScrollPx,
      mobileBannerDelayMs,
      mobileShowAfterScrollPx,
      mobileMaxWidthPx,
    });

    let shown = false;
    let delayReady = false;
    let scrollReady = timing.showAfterScrollPx == null;

    const revealBanner = () => {
      if (shown) return;
      shown = true;
      setShowBanner(true);
    };

    const tryReveal = () => {
      if (delayReady && scrollReady) {
        revealBanner();
      }
    };

    const delayTimer = window.setTimeout(() => {
      delayReady = true;
      tryReveal();
    }, timing.bannerDelayMs);

    const onScroll = () => {
      if (
        timing.showAfterScrollPx != null &&
        window.scrollY >= timing.showAfterScrollPx
      ) {
        scrollReady = true;
        tryReveal();
      }
    };

    if (timing.showAfterScrollPx != null) {
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    return () => {
      window.clearTimeout(delayTimer);
      if (timing.showAfterScrollPx != null) {
        window.removeEventListener('scroll', onScroll);
      }
    };
  }, [
    bannerDelayMs,
    showAfterScrollPx,
    mobileBannerDelayMs,
    mobileShowAfterScrollPx,
    mobileMaxWidthPx,
  ]);

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
      import('@/lib/analytics/clarity').then((module) => {
        module.initClarity();
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
