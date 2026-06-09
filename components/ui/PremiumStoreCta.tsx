'use client';

import DownloadLink from '@/components/DownloadLink';
import { AppleIcon } from '@/components/bienvenida/v2/BienvenidaV2Icons';

export type PremiumStoreCtaProps = {
  storeHref: string;
  storeLabel: string;
  storeName: string;
  badge: string;
  ariaLabel: string;
  trackingPlacement: string;
  trackingPage: string;
  trackingLabel: string;
  className?: string;
};

export default function PremiumStoreCta({
  storeHref,
  storeLabel,
  storeName,
  badge,
  ariaLabel,
  trackingPlacement,
  trackingPage,
  trackingLabel,
  className = '',
}: PremiumStoreCtaProps) {
  return (
    <DownloadLink
      href={storeHref}
      className={`premium-store-cta ${className}`.trim()}
      trackingPlacement={trackingPlacement}
      trackingPage={trackingPage}
      trackingLabel={trackingLabel}
      aria-label={ariaLabel}
    >
      <span className="premium-store-cta__left">
        <span className="premium-store-cta__icon" aria-hidden="true">
          <AppleIcon />
        </span>
        <span className="premium-store-cta__text">
          <span className="premium-store-cta__label">{storeLabel}</span>
          <span className="premium-store-cta__name">{storeName}</span>
        </span>
      </span>
      <span className="premium-store-cta__badge">{badge}</span>
    </DownloadLink>
  );
}
