'use client';

import { useCallback, useEffect, useId, useState } from 'react';
import DownloadLink from '@/components/DownloadLink';
import AndroidWaitlistCounter from '@/components/bienvenida/AndroidWaitlistCounter';
import BienvenidaV2StoreCta from '@/components/bienvenida/v2/BienvenidaV2StoreCta';
import { StarIcon } from '@/components/bienvenida/v2/BienvenidaV2Icons';
import AndroidEarlyAccessForm from '@/components/forms/AndroidEarlyAccessForm';
import { LAD_OPEN_ANDROID_FORM_EVENT } from '@/lib/bienvenida/android-form-events';
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
  placement?: 'hero' | 'final';
};

export default function BienvenidaV2HeroFold({
  storeHref,
  pagePath,
  landingVariant,
  copy,
  locale,
  placement = 'hero',
}: BienvenidaV2HeroFoldProps) {
  const device = useLandingDevice();
  const reactId = useId();
  const v2 = copy.v2;
  const isHero = placement === 'hero';
  const isFinal = !isHero;
  const [androidFormOpen, setAndroidFormOpen] = useState(false);
  const [autoFocusAndroid, setAutoFocusAndroid] = useState(false);
  const androidFormId = isHero
    ? 'android-early-access-bienvenida-v2-hero'
    : 'android-early-access-bienvenida-v2-final';

  const openAndroidForm = useCallback((withFocus = true) => {
    setAndroidFormOpen(true);
    if (withFocus && !prefersReducedMotion()) {
      setAutoFocusAndroid(true);
    }
  }, []);

  useEffect(() => {
    if (!isHero) return;
    const handler = () => openAndroidForm(true);
    window.addEventListener(LAD_OPEN_ANDROID_FORM_EVENT, handler);
    return () => window.removeEventListener(LAD_OPEN_ANDROID_FORM_EVENT, handler);
  }, [isHero, openAndroidForm]);

  useEffect(() => {
    if (isHero && device === 'android') {
      openAndroidForm(!prefersReducedMotion());
    }
  }, [device, isHero, openAndroidForm]);

  const handleAndroidLink = () => {
    openAndroidForm(true);
    document.getElementById(androidFormId)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  if (device === 'unknown') {
    return (
      <div
        className={`lad-v2-fold lad-v2-fold--pending ${isFinal ? 'lad-v2-fold--final' : ''}`}
        id={isHero ? 'descargar' : 'descargar-final'}
        aria-busy="true"
      >
        <div className="lad-v2-fold-pending" aria-hidden="true" />
      </div>
    );
  }

  const showIosStoreCta = device === 'ios' || device === 'desktop';
  const showAndroidLink = isHero && (device === 'ios' || device === 'desktop');
  const showAndroidLead = device === 'android';
  const showAndroidForm = device === 'android' || (isHero && androidFormOpen);

  return (
    <div
      className={`lad-v2-fold ${isFinal ? 'lad-v2-fold--final' : ''}`}
      id={isHero ? 'descargar' : 'descargar-final'}
    >
      {isHero && (
        <figure className="lad-v2-review">
          <div className="lad-v2-review__stars" aria-label={copy.reviews.starsAria}>
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} />
            ))}
          </div>
          <blockquote className="lad-v2-review__quote">&ldquo;{v2.heroReview.quote}&rdquo;</blockquote>
          <figcaption className="lad-v2-review__author">
            {v2.heroReview.author} · {v2.heroReview.source}
          </figcaption>
        </figure>
      )}

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

      {(showIosStoreCta || showAndroidLead) && <p className="lad-v2-cta-micro">{v2.ctaMicro}</p>}

      {showAndroidLink && (
        <button type="button" className="lad-v2-android-link" onClick={handleAndroidLink}>
          {v2.androidLink}
        </button>
      )}

      {showAndroidForm && (
        <div
          className={`lad-v2-android-form is-open`}
          id={`${reactId}-android-panel`}
        >
          <AndroidWaitlistCounter locale={locale} labelTemplate={copy.androidWaitlist.counterTemplate} />
          <AndroidEarlyAccessForm
            locale={locale}
            id={androidFormId}
            placement={
              isFinal
                ? 'bienvenida_v2_final_android_early_access'
                : 'bienvenida_v2_hero_android_early_access'
            }
            page={pagePath}
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
              isFinal ? 'bienvenida_v2_final_ios_fallback' : 'bienvenida_v2_hero_ios_fallback'
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
