'use client';

import { useEffect, useState } from 'react';
import DownloadLink from '@/components/DownloadLink';
import {
  dispatchOpenAndroidForm,
  scrollToHeroCta,
} from '@/lib/bienvenida/android-form-events';
import { getAttributionContext } from '@/lib/analytics/attribution';
import { trackCustomEvent, withAttribution } from '@/lib/analytics/events';
import { useLandingDevice } from '@/lib/hooks/useLandingDevice';
import type { LandingDevice } from '@/lib/device/landing-device';
import type { BienvenidaCopy, BienvenidaVariant } from '@/lib/i18n/copy/bienvenida';

type BienvenidaStickyCtaProps = {
  storeHref: string;
  landingVariant: BienvenidaVariant;
  pagePath: string;
  copy: BienvenidaCopy;
  initialDevice?: LandingDevice;
};

function trackStickyAction(action: string, pagePath: string, landingVariant: BienvenidaVariant) {
  trackCustomEvent(
    'bienvenida_sticky_action',
    withAttribution({
      action,
      page: pagePath,
      landing_variant: landingVariant,
    }, getAttributionContext())
  );
}

export default function BienvenidaStickyCta({
  storeHref,
  landingVariant,
  pagePath,
  copy,
  initialDevice = 'ios',
}: BienvenidaStickyCtaProps) {
  const device = useLandingDevice(initialDevice);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroCta = document.getElementById('descargar');
    if (!heroCta) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
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

  const renderCta = () => {
    if (device === 'android') {
      return (
        <button
          type="button"
          className="btn btn-primary lad-sticky-cta-btn"
          onClick={handleAndroidSticky}
          aria-label={copy.trial.stickyAndroidAria}
        >
          {copy.trial.stickyAndroidCta}
        </button>
      );
    }

    if (device === 'desktop') {
      return (
        <button
          type="button"
          className="btn btn-primary lad-sticky-cta-btn"
          onClick={handleDesktopSticky}
          aria-label={copy.trial.stickyDesktopAria}
        >
          {copy.trial.stickyDesktopCta}
        </button>
      );
    }

    return (
      <DownloadLink
        href={storeHref}
        className="btn btn-primary lad-sticky-cta-btn"
        trackingPlacement="bienvenida_sticky_cta"
        trackingPage={pagePath}
        trackingLabel={`sticky_variant_${landingVariant}`}
        aria-label={copy.trial.stickyAria}
      >
        {copy.trial.stickyCta[landingVariant]}
      </DownloadLink>
    );
  };

  return (
    <div
      className={`lad-sticky-cta ${visible ? 'is-visible' : ''}`}
      aria-hidden={!visible}
    >
      {renderCta()}
    </div>
  );
}
