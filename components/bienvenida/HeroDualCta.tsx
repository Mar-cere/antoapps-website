'use client';

import { useCallback, useEffect, useId, useState } from 'react';
import AppStoreBadge from '@/components/AppStoreBadge';
import DownloadLink from '@/components/DownloadLink';
import AndroidEarlyAccessForm from '@/components/forms/AndroidEarlyAccessForm';
import AppStoreQr from '@/components/bienvenida/AppStoreQr';
import { LAD_OPEN_ANDROID_FORM_EVENT } from '@/lib/bienvenida/android-form-events';
import { prefersReducedMotion } from '@/lib/device/motion';
import { useLandingDevice } from '@/lib/hooks/useLandingDevice';
import type { Locale } from '@/lib/i18n/config';
import type { BienvenidaCopy } from '@/lib/i18n/copy/bienvenida';

type HeroDualCtaProps = {
  storeHref: string;
  landingVariant: 'A' | 'B';
  pagePath: string;
  copy: BienvenidaCopy;
  locale?: Locale;
  placement?: 'hero' | 'final';
};

function primaryCtaLabel(
  copy: BienvenidaCopy,
  variant: 'A' | 'B',
  isFinal: boolean
): string {
  if (isFinal) {
    return copy.trial.finalCta;
  }
  return copy.trial.heroCta[variant];
}

export default function HeroDualCta({
  storeHref,
  landingVariant,
  pagePath,
  copy,
  locale = 'es',
  placement = 'hero',
}: HeroDualCtaProps) {
  const device = useLandingDevice();
  const reactId = useId();
  const [showAndroidInput, setShowAndroidInput] = useState(false);
  const [autoFocusAndroidInput, setAutoFocusAndroidInput] = useState(false);
  const isFinal = placement === 'final';
  const isHero = !isFinal;
  const primaryCtaText = primaryCtaLabel(copy, landingVariant, isFinal);
  const showDesktopQr = device === 'desktop' && isHero;
  const showIosBadge = device === 'ios' && isHero;
  const deviceModifier = device !== 'unknown' ? `lad-hero-fold-cta--${device}` : '';
  const androidFormId = isFinal
    ? 'android-early-access-bienvenida-final'
    : 'android-early-access-bienvenida-hero';
  const androidButtonId = `${reactId}-android-toggle`;

  const openAndroidForm = useCallback((withFocus = true) => {
    setShowAndroidInput(true);
    if (withFocus && !prefersReducedMotion()) {
      setAutoFocusAndroidInput(true);
    }
  }, []);

  useEffect(() => {
    if (isHero && device === 'android') {
      openAndroidForm(!prefersReducedMotion());
    }
  }, [device, isHero, openAndroidForm]);

  useEffect(() => {
    if (!isHero) return;

    const handler = () => openAndroidForm(true);
    window.addEventListener(LAD_OPEN_ANDROID_FORM_EVENT, handler);
    return () => window.removeEventListener(LAD_OPEN_ANDROID_FORM_EVENT, handler);
  }, [isHero, openAndroidForm]);

  useEffect(() => {
    if (showAndroidInput && !prefersReducedMotion()) {
      setAutoFocusAndroidInput(true);
    }
  }, [showAndroidInput]);

  const handleAndroidClick = () => {
    setShowAndroidInput((prev) => {
      const next = !prev;
      if (next && !prefersReducedMotion()) {
        setAutoFocusAndroidInput(true);
      }
      return next;
    });
  };

  const iosTrackingPlacement = isFinal
    ? 'bienvenida_final_primary_cta'
    : 'bienvenida_hero_primary_cta';
  const iosTrackingLabel = isFinal
    ? `final_primary_variant_${landingVariant}`
    : `hero_primary_variant_${landingVariant}`;

  return (
    <div
      className={`lad-hero-fold-cta ${isFinal ? 'lad-hero-fold-cta--final' : ''} ${deviceModifier}`}
      id={isFinal ? 'descargar-final' : 'descargar'}
    >
      {showDesktopQr && (
        <AppStoreQr
          storeHref={storeHref}
          label={copy.desktopQr.label}
          hint={copy.desktopQr.hint}
          fallbackLink={copy.desktopQr.fallbackLink}
        />
      )}

      <div className="lad-hero-cta-row">
        {showIosBadge ? (
          <DownloadLink
            href={storeHref}
            className="lad-hero-cta-badge-wrap lad-hero-cta-btn--ios"
            trackingPlacement={iosTrackingPlacement}
            trackingPage={pagePath}
            trackingLabel={`${iosTrackingLabel}_badge`}
            aria-label={copy.trial.aria}
          >
            <AppStoreBadge locale={locale} className="lad-hero-store-badge" priority />
          </DownloadLink>
        ) : (
          <DownloadLink
            href={storeHref}
            className="btn btn-primary btn-large lad-hero-cta-btn lad-hero-cta-btn--ios"
            trackingPlacement={iosTrackingPlacement}
            trackingPage={pagePath}
            trackingLabel={iosTrackingLabel}
            aria-label={copy.trial.aria}
          >
            {primaryCtaText}
          </DownloadLink>
        )}

        <button
          type="button"
          id={androidButtonId}
          className={`btn btn-secondary btn-large lad-hero-cta-btn lad-hero-cta-btn--android ${
            showAndroidInput ? 'is-active' : ''
          }`}
          onClick={handleAndroidClick}
          aria-expanded={showAndroidInput}
          aria-controls={androidFormId}
        >
          {copy.androidHeroCta}
        </button>
      </div>

      <p className="lad-hero-trial-line">{copy.trial.line}</p>
      <p className="lad-hero-no-cc-line">{copy.trial.noCreditCard}</p>
      <p className="lad-hero-pricing-line">{copy.trial.pricingLine}</p>

      <p className="lad-hero-privacy">
        <svg
          className="lad-hero-privacy-icon"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="5"
            y="11"
            width="14"
            height="10"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M8 11V8a4 4 0 0 1 8 0v3"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
        {copy.privacyBadge}
      </p>

      <div
        className={`lad-android-reveal ${showAndroidInput ? 'is-open' : ''}`}
        aria-hidden={!showAndroidInput}
      >
        <AndroidEarlyAccessForm
          locale={locale}
          id={androidFormId}
          placement={
            isFinal
              ? 'bienvenida_final_android_early_access'
              : 'bienvenida_hero_android_early_access'
          }
          page={pagePath}
          className="android-early-access android-early-access--landing"
          compact
          autoFocus={autoFocusAndroidInput}
          buttonLabel={copy.androidCta}
        />
      </div>
    </div>
  );
}
