'use client';

import { useEffect } from 'react';
import { persistAttributionFromLocation } from '@/lib/analytics/attribution';
import {
  trackBienvenidaLandingViewGa,
  trackBienvenidaLandingViewMeta,
} from '@/lib/analytics/bienvenida-events';
import { initMetaPixel } from '@/lib/analytics/meta-pixel';

type BienvenidaLandingTrackerProps = {
  landingVariant: 'A' | 'B';
  pagePath: string;
};

function hasMarketingConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('cookieConsent') === 'accepted';
}

export default function BienvenidaLandingTracker({
  landingVariant,
  pagePath,
}: BienvenidaLandingTrackerProps) {
  useEffect(() => {
    persistAttributionFromLocation();
    trackBienvenidaLandingViewGa({ page: pagePath, landingVariant });

    if (hasMarketingConsent()) {
      initMetaPixel();
      trackBienvenidaLandingViewMeta({ page: pagePath, landingVariant });
    }

    const onConsentGranted = () => {
      initMetaPixel();
      trackBienvenidaLandingViewMeta({ page: pagePath, landingVariant });
    };

    window.addEventListener('cookie-consent-accepted', onConsentGranted);
    return () => window.removeEventListener('cookie-consent-accepted', onConsentGranted);
  }, [landingVariant, pagePath]);

  return null;
}
