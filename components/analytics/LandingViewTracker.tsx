'use client';

import { useEffect } from 'react';
import { persistAttributionFromLocation } from '@/lib/analytics/attribution';
import { trackCustomEvent, withAttribution } from '@/lib/analytics/events';

type LandingViewTrackerProps = {
  page: string;
  landingVariant: 'A' | 'B';
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

