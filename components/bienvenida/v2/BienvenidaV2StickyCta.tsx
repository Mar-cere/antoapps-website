'use client';

import { useEffect, useState } from 'react';
import BienvenidaV2StoreCta from '@/components/bienvenida/v2/BienvenidaV2StoreCta';
import {
  dispatchOpenAndroidForm,
  scrollToHeroCta,
} from '@/lib/bienvenida/android-form-events';
import { getAttributionContext } from '@/lib/analytics/attribution';
import { trackCustomEvent, withAttribution } from '@/lib/analytics/events';
import type { LandingDevice } from '@/lib/device/landing-device';
import { useLandingDevice } from '@/lib/hooks/useLandingDevice';
import type { BienvenidaCopy, BienvenidaVariant } from '@/lib/i18n/copy/bienvenida';

type BienvenidaV2StickyCtaProps = {
  storeHref: string;
  landingVariant: BienvenidaVariant;
  pagePath: string;
  copy: BienvenidaCopy;
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
  initialDevice = 'ios',
}: BienvenidaV2StickyCtaProps) {
  const device = useLandingDevice(initialDevice);
  const [visible, setVisible] = useState(false);

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

  const handleAndroidSticky = () => {
    trackStickyAction('android_waitlist', pagePath, landingVariant);
    scrollToHeroCta();
    dispatchOpenAndroidForm();
  };

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
        <button type="button" className="lad-v2-sticky__alt" onClick={handleAndroidSticky}>
          {copy.trial.stickyAndroidCta}
        </button>
      )}
      {device === 'desktop' && (
        <button type="button" className="lad-v2-sticky__alt" onClick={handleDesktopSticky}>
          {copy.trial.stickyDesktopCta}
        </button>
      )}
    </div>
  );
}
