'use client';

import DownloadLink from '@/components/DownloadLink';
import { AppleIcon, PlayIcon } from '@/components/bienvenida/v2/BienvenidaV2Icons';

export type PremiumStoreKind = 'apple' | 'google';

export type PremiumStoreCtaProps = {
  storeHref: string;
  storeLabel: string;
  storeName: string;
  badge: string;
  ariaLabel: string;
  trackingPlacement: string;
  trackingPage: string;
  trackingLabel: string;
  store?: PremiumStoreKind;
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
  store = 'apple',
  className = '',
}: PremiumStoreCtaProps) {
  const Icon = store === 'google' ? PlayIcon : AppleIcon;

  return (
    <DownloadLink
      href={storeHref}
      className={`premium-store-cta ${store === 'google' ? 'premium-store-cta--google' : ''} ${className}`.trim()}
      trackingPlacement={trackingPlacement}
      trackingPage={trackingPage}
      trackingLabel={trackingLabel}
      aria-label={ariaLabel}
    >
      <span className="premium-store-cta__left">
        <span className="premium-store-cta__icon" aria-hidden="true">
          <Icon />
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
