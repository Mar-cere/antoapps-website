'use client';

import { useEffect, useState } from 'react';
import BienvenidaV2StoreCta from '@/components/bienvenida/v2/BienvenidaV2StoreCta';
import PremiumStoreCta from '@/components/ui/PremiumStoreCta';
import { scrollToHeroCta } from '@/lib/bienvenida/landing-cta-events';
import { getAttributionContext } from '@/lib/analytics/attribution';
import { trackCustomEvent, withAttribution } from '@/lib/analytics/events';
import type { LandingDevice } from '@/lib/device/landing-device';
import { googlePlayHref } from '@/lib/download-links';
import { useLandingDevice } from '@/lib/hooks/useLandingDevice';
import type { Locale } from '@/lib/i18n/config';
import type { BienvenidaCopy, BienvenidaVariant } from '@/lib/i18n/copy/bienvenida';

type BienvenidaV2StickyCtaProps = {
  storeHref: string;
  landingVariant: BienvenidaVariant;
  pagePath: string;
  copy: BienvenidaCopy;
  locale?: Locale;
  initialDevice?: LandingDevice;
};

function trackStickyAction(action: string, pagePath: string, landingVariant: BienvenidaVariant) {
  trackCustomEvent(
    'bienvenida_sticky_action',
    withAttribution(
      {
        action,
        page: pagePath,
        landing_variant: landingVariant,
        layout: 'v2',
      },
      getAttributionContext()
    )
  );
}

export default function BienvenidaV2StickyCta({
  storeHref,
  landingVariant,
  pagePath,
  copy,
  locale = 'es',
  initialDevice = 'ios',
}: BienvenidaV2StickyCtaProps) {
  const device = useLandingDevice(initialDevice);
  const [visible, setVisible] = useState(false);
  const v2 = copy.v2;

  useEffect(() => {
    const heroCta = document.getElementById('descargar');
    if (!heroCta) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-72px 0px 0px 0px' }
    );

    observer.observe(heroCta);
    return () => observer.disconnect();
  }, []);

  const handleDesktopSticky = () => {
    trackStickyAction('desktop_options_scroll', pagePath, landingVariant);
    scrollToHeroCta();
  };

  return (
    <div
      className={`lad-v2-sticky ${visible ? 'is-visible' : ''}`}
      aria-hidden={!visible}
    >
      {device === 'ios' && (
        <BienvenidaV2StoreCta
          storeHref={storeHref}
          pagePath={pagePath}
          landingVariant={landingVariant}
          copy={copy}
          placement="sticky"
        />
      )}
      {device === 'android' && (
        <PremiumStoreCta
          store="google"
          storeHref={googlePlayHref(locale)}
          storeLabel={v2.ctaPlayLabel}
          storeName={v2.ctaPlayText}
          badge={v2.ctaPlayBadge}
          ariaLabel={copy.trial.stickyAndroidAria}
          trackingPlacement="bienvenida_v2_sticky_play_store"
          trackingPage={pagePath}
          trackingLabel={`sticky_play_${landingVariant}`}
        />
      )}
      {device === 'desktop' && (
        <button type="button" className="lad-v2-sticky__alt" onClick={handleDesktopSticky}>
          {copy.trial.stickyDesktopCta}
        </button>
      )}
    </div>
  );
}
