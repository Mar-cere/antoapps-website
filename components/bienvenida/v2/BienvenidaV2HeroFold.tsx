'use client';

import { useEffect, useId, useState } from 'react';
import DownloadLink from '@/components/DownloadLink';
import AndroidWaitlistCounter from '@/components/bienvenida/AndroidWaitlistCounter';
import InstagramBrowserHint from '@/components/bienvenida/InstagramBrowserHint';
import BienvenidaV2StoreCta from '@/components/bienvenida/v2/BienvenidaV2StoreCta';
import AndroidEarlyAccessForm from '@/components/forms/AndroidEarlyAccessForm';
import { LAD_OPEN_ANDROID_FORM_EVENT } from '@/lib/bienvenida/android-form-events';
import type { LandingDevice } from '@/lib/device/landing-device';
import { prefersReducedMotion } from '@/lib/device/motion';
import { useLandingDevice } from '@/lib/hooks/useLandingDevice';
import type { Locale } from '@/lib/i18n/config';
import type { BienvenidaCopy, BienvenidaVariant } from '@/lib/i18n/copy/bienvenida';

type BienvenidaV2HeroFoldProps = {
  storeHref: string;
  pagePath: string;
  landingVariant: BienvenidaVariant;
  copy: BienvenidaCopy;
  locale: Locale;
  initialDevice?: LandingDevice;
  placement?: 'hero' | 'final';
};

export default function BienvenidaV2HeroFold({
  storeHref,
  pagePath,
  landingVariant,
  copy,
  locale,
  initialDevice = 'ios',
  placement = 'hero',
}: BienvenidaV2HeroFoldProps) {
  const device = useLandingDevice(initialDevice);
  const reactId = useId();
  const v2 = copy.v2;
  const isHero = placement === 'hero';
  const [androidFormOpen, setAndroidFormOpen] = useState(initialDevice === 'android');
  const [autoFocusAndroid, setAutoFocusAndroid] = useState(false);
  const androidFormId = isHero
    ? 'android-early-access-bienvenida-v2-hero'
    : 'android-early-access-bienvenida-v2-final';

  useEffect(() => {
    if (!isHero) return;
    const handler = () => {
      setAndroidFormOpen(true);
      if (!prefersReducedMotion()) setAutoFocusAndroid(true);
    };
    window.addEventListener(LAD_OPEN_ANDROID_FORM_EVENT, handler);
    return () => window.removeEventListener(LAD_OPEN_ANDROID_FORM_EVENT, handler);
  }, [isHero]);

  useEffect(() => {
    if (isHero && device === 'android') {
      setAndroidFormOpen(true);
      if (!prefersReducedMotion()) setAutoFocusAndroid(true);
    }
  }, [device, isHero]);

  const handleAndroidLink = () => {
    setAndroidFormOpen(true);
    if (!prefersReducedMotion()) setAutoFocusAndroid(true);
    document.getElementById(androidFormId)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  const showIosStoreCta = device === 'ios' || device === 'desktop';
  // En iOS el Android waitlist no debe competir en el fold: solo en el CTA final.
  const showAndroidLink = !isHero && (device === 'ios' || device === 'desktop');
  const showAndroidLead = device === 'android';
  const showAndroidForm = device === 'android' || (!isHero && androidFormOpen);

  return (
    <div
      className={`lad-v2-fold ${isHero ? '' : 'lad-v2-fold--final'}`}
      id={isHero ? 'descargar' : 'descargar-final'}
    >
      {showAndroidLead && (
        <p className="lad-v2-android-lead">{copy.androidDevice.waitlistLine}</p>
      )}

      {showIosStoreCta && (
        <BienvenidaV2StoreCta
          storeHref={storeHref}
          pagePath={pagePath}
          landingVariant={landingVariant}
          copy={copy}
          placement={placement}
        />
      )}

      {showIosStoreCta && <p className="lad-v2-cta-micro">{v2.ctaMicro}</p>}

      {isHero && showIosStoreCta && (
        <p className="lad-v2-cta-rating">{copy.trustStrip.ratingOnAppStore}</p>
      )}

      {isHero && showIosStoreCta && (
        <InstagramBrowserHint copy={copy.inAppHint} locale={locale} variant="cta" />
      )}

      {showAndroidLink && (
        <button type="button" className="lad-v2-android-link" onClick={handleAndroidLink}>
          {v2.androidLink}
        </button>
      )}

      {showAndroidForm && (
        <div className="lad-v2-android-form is-open" id={`${reactId}-android-panel`}>
          <AndroidWaitlistCounter locale={locale} labelTemplate={copy.androidWaitlist.counterTemplate} />
          <AndroidEarlyAccessForm
            locale={locale}
            id={androidFormId}
            placement={
              isHero
                ? 'bienvenida_v2_hero_android_early_access'
                : 'bienvenida_v2_final_android_early_access'
            }
            page={pagePath}
            landingVariant={landingVariant}
            className="android-early-access android-early-access--landing"
            compact
            autoFocus={autoFocusAndroid}
            buttonLabel={copy.androidCta}
            incentiveLine={device === 'android' ? undefined : copy.androidWaitlist.incentive}
          />
        </div>
      )}

      {showAndroidLead && (
        <p className="lad-v2-ios-fallback">
          <DownloadLink
            href={storeHref}
            className="lad-v2-ios-fallback-link"
            trackingPlacement={
              isHero ? 'bienvenida_v2_hero_ios_fallback' : 'bienvenida_v2_final_ios_fallback'
            }
            trackingPage={pagePath}
            trackingLabel={`ios_fallback_${landingVariant}`}
          >
            {copy.androidDevice.iosFallback}
          </DownloadLink>
        </p>
      )}
    </div>
  );
}
