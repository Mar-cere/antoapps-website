'use client';

import { getAttributionContext } from '@/lib/analytics/attribution';
import { trackCustomEvent, withAttribution } from '@/lib/analytics/events';
import { trackMetaStoreClick } from '@/lib/analytics/meta-pixel';

type StoreClickParams = {
  placement: string;
  page: string;
  label?: string;
};

export function trackStoreClick({ placement, page, label }: StoreClickParams): void {
  const attribution = getAttributionContext();
  const payload = withAttribution(
    {
      destination: 'app_store',
      placement,
      page,
      label,
    },
    attribution
  );

  trackCustomEvent('store_click', payload);
  trackMetaStoreClick(payload);
}
