'use client';

import DownloadLink from '@/components/DownloadLink';
import type { BienvenidaVariant } from '@/lib/i18n/copy/bienvenida';
import type { BienvenidaCopy } from '@/lib/i18n/copy/bienvenida';
import { AppleIcon } from '@/components/bienvenida/v2/BienvenidaV2Icons';

type BienvenidaV2StoreCtaProps = {
  storeHref: string;
  pagePath: string;
  landingVariant: BienvenidaVariant;
  copy: BienvenidaCopy;
  placement: 'hero' | 'final' | 'sticky';
  className?: string;
};

export default function BienvenidaV2StoreCta({
  storeHref,
  pagePath,
  landingVariant,
  copy,
  placement,
  className = '',
}: BienvenidaV2StoreCtaProps) {
  const v2 = copy.v2;
  const trackingPlacement =
    placement === 'hero'
      ? 'bienvenida_v2_hero_cta'
      : placement === 'final'
        ? 'bienvenida_v2_final_cta'
        : 'bienvenida_v2_sticky_cta';
  const trackingLabel = `${placement}_variant_${landingVariant}`;

  return (
    <DownloadLink
      href={storeHref}
      className={`lad-v2-store-cta ${className}`.trim()}
      trackingPlacement={trackingPlacement}
      trackingPage={pagePath}
      trackingLabel={trackingLabel}
      aria-label={copy.trial.aria}
    >
      <span className="lad-v2-store-cta__left">
        <span className="lad-v2-store-cta__icon" aria-hidden="true">
          <AppleIcon />
        </span>
        <span className="lad-v2-store-cta__text">
          <span className="lad-v2-store-cta__label">{v2.ctaStoreLabel}</span>
          <span className="lad-v2-store-cta__name">{v2.ctaStoreText}</span>
        </span>
      </span>
      <span className="lad-v2-store-cta__badge">{v2.ctaBadge}</span>
    </DownloadLink>
  );
}
