'use client';

import { getAttributionContext } from '@/lib/analytics/attribution';
import { trackCustomEvent, withAttribution } from '@/lib/analytics/events';
import { trackMetaViewContent } from '@/lib/analytics/meta-pixel';
import type { BienvenidaVariant } from '@/lib/i18n/copy/bienvenida';

type BienvenidaLandingParams = {
  page: string;
  landingVariant: BienvenidaVariant;
};

export function trackBienvenidaLandingViewGa({ page, landingVariant }: BienvenidaLandingParams): void {
  const attribution = getAttributionContext();
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
}

export function trackBienvenidaLandingViewMeta({ page, landingVariant }: BienvenidaLandingParams): void {
  const attribution = getAttributionContext();
  trackMetaViewContent(
    withAttribution(
      {
        content_name: 'bienvenida_landing',
        content_category: 'landing_page',
        page,
        landing_variant: landingVariant,
      },
      attribution
    )
  );
}
