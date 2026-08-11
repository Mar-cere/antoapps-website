'use client';

import PremiumStoreCta from '@/components/ui/PremiumStoreCta';
import { appStoreHref, googlePlayHref } from '@/lib/download-links';
import type { Locale } from '@/lib/i18n/config';

export type PremiumStoreCtaPairCopy = {
  ctaStoreLabel: string;
  ctaStoreText: string;
  ctaBadge: string;
  storeAria: string;
  ctaPlayLabel: string;
  ctaPlayText: string;
  ctaPlayBadge: string;
  androidStoreAria: string;
};

type PremiumStoreCtaPairProps = {
  locale: Locale;
  copy: PremiumStoreCtaPairCopy;
  trackingPage: string;
  trackingPlacementPrefix: string;
  trackingLabel: string;
  className?: string;
};

/** Par App Store + Google Play con el mismo CTA premium. */
export default function PremiumStoreCtaPair({
  locale,
  copy,
  trackingPage,
  trackingPlacementPrefix,
  trackingLabel,
  className = '',
}: PremiumStoreCtaPairProps) {
  return (
    <div className={`premium-store-cta-stack ${className}`.trim()}>
      <PremiumStoreCta
        store="apple"
        storeHref={appStoreHref()}
        storeLabel={copy.ctaStoreLabel}
        storeName={copy.ctaStoreText}
        badge={copy.ctaBadge}
        ariaLabel={copy.storeAria}
        trackingPlacement={`${trackingPlacementPrefix}_app_store`}
        trackingPage={trackingPage}
        trackingLabel={`${trackingLabel}_ios`}
      />
      <PremiumStoreCta
        store="google"
        storeHref={googlePlayHref(locale)}
        storeLabel={copy.ctaPlayLabel}
        storeName={copy.ctaPlayText}
        badge={copy.ctaPlayBadge}
        ariaLabel={copy.androidStoreAria}
        trackingPlacement={`${trackingPlacementPrefix}_play_store`}
        trackingPage={trackingPage}
        trackingLabel={`${trackingLabel}_android`}
      />
    </div>
  );
}
