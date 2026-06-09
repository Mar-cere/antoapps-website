'use client';

import { useEffect } from 'react';
import { persistAttributionFromLocation } from '@/lib/analytics/attribution';
import { trackCustomEvent, withAttribution } from '@/lib/analytics/events';

import type { BienvenidaVariant } from '@/lib/i18n/copy/bienvenida';

type LandingViewTrackerProps = {
  page: string;
  landingVariant: BienvenidaVariant;
};

export default function LandingViewTracker({ page, landingVariant }: LandingViewTrackerProps) {
  useEffect(() => {
    const attribution = persistAttributionFromLocation();

    trackCustomEvent(
      'landing_view',
      withAttribution(
        {
          page,
          landing_variant: landingVariant,
        },
        attribution
      )
    );
  }, [landingVariant, page]);

  return null;
}

