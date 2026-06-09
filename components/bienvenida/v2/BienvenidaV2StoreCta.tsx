'use client';

import DownloadLink from '@/components/DownloadLink';
import PremiumStoreCta from '@/components/ui/PremiumStoreCta';
import type { BienvenidaVariant } from '@/lib/i18n/copy/bienvenida';
import type { BienvenidaCopy } from '@/lib/i18n/copy/bienvenida';

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
    <PremiumStoreCta
      storeHref={storeHref}
      storeLabel={v2.ctaStoreLabel}
      storeName={v2.ctaStoreText}
      badge={v2.ctaBadge}
      ariaLabel={copy.trial.aria}
      trackingPlacement={trackingPlacement}
      trackingPage={pagePath}
      trackingLabel={trackingLabel}
      className={className}
    />
  );
}
