'use client';

import { useCallback, useEffect, useId, useState } from 'react';
import AppStoreBadge from '@/components/AppStoreBadge';
import DownloadLink from '@/components/DownloadLink';
import AndroidWaitlistCounter from '@/components/bienvenida/AndroidWaitlistCounter';
import AndroidEarlyAccessForm from '@/components/forms/AndroidEarlyAccessForm';
import {
  LAD_DESKTOP_CHOOSE_ANDROID_EVENT,
  LAD_OPEN_ANDROID_FORM_EVENT,
} from '@/lib/bienvenida/android-form-events';
import { prefersReducedMotion } from '@/lib/device/motion';
import { useLandingDevice } from '@/lib/hooks/useLandingDevice';
import type { Locale } from '@/lib/i18n/config';
import type { BienvenidaCopy, BienvenidaVariant } from '@/lib/i18n/copy/bienvenida';

type HeroDualCtaProps = {
  storeHref: string;
  landingVariant: BienvenidaVariant;
  pagePath: string;
  copy: BienvenidaCopy;
  locale?: Locale;
  placement?: 'hero' | 'final';
};

type DesktopChoice = 'iphone' | 'android' | null;

function primaryCtaLabel(
  copy: BienvenidaCopy,
  variant: BienvenidaVariant,
  isFinal: boolean
): string {
  if (isFinal) {
    return copy.trial.finalCta;
  }
  return copy.trial.heroCta[variant];
}

type TrustLinesProps = {
  copy: BienvenidaCopy;
  showIosTrial: boolean;
};

function TrustLines({ copy, showIosTrial }: TrustLinesProps) {
  return (
    <>
      {showIosTrial && <p className="lad-hero-trial-line">{copy.trial.line}</p>}
      {showIosTrial && <p className="lad-hero-no-cc-line">{copy.trial.noCreditCard}</p>}
      {showIosTrial && <p className="lad-hero-pricing-line">{copy.trial.pricingLine}</p>}
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
    </>
  );
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
  const [desktopChoice, setDesktopChoice] = useState<DesktopChoice>(null);
  const isFinal = placement === 'final';
  const isHero = !isFinal;
  const primaryCtaText = primaryCtaLabel(copy, landingVariant, isFinal);
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

    const openHandler = () => openAndroidForm(true);
    const desktopAndroidHandler = () => {
      setDesktopChoice('android');
      openAndroidForm(true);
    };

    window.addEventListener(LAD_OPEN_ANDROID_FORM_EVENT, openHandler);
    window.addEventListener(LAD_DESKTOP_CHOOSE_ANDROID_EVENT, desktopAndroidHandler);
    return () => {
      window.removeEventListener(LAD_OPEN_ANDROID_FORM_EVENT, openHandler);
      window.removeEventListener(LAD_DESKTOP_CHOOSE_ANDROID_EVENT, desktopAndroidHandler);
    };
  }, [isHero, openAndroidForm]);

  useEffect(() => {
    if (showAndroidInput && !prefersReducedMotion()) {
      setAutoFocusAndroidInput(true);
    }
  }, [showAndroidInput]);

  const handleAndroidToggle = () => {
    setShowAndroidInput((prev) => {
      const next = !prev;
      if (next && !prefersReducedMotion()) {
        setAutoFocusAndroidInput(true);
      }
      return next;
    });
  };

  const handleDesktopAndroid = () => {
    setDesktopChoice('android');
    openAndroidForm(true);
  };

  const resetDesktopChoice = () => {
    setDesktopChoice(null);
    setShowAndroidInput(false);
    setAutoFocusAndroidInput(false);
  };

  const iosTrackingPlacement = isFinal
    ? 'bienvenida_final_primary_cta'
    : 'bienvenida_hero_primary_cta';
  const iosTrackingLabel = isFinal
    ? `final_primary_variant_${landingVariant}`
    : `hero_primary_variant_${landingVariant}`;

  const renderIosStoreCta = (useBadge: boolean, className = '') => {
    if (useBadge) {
      return (
        <DownloadLink
          href={storeHref}
          className={`lad-hero-cta-badge-wrap lad-hero-cta-btn--ios ${className}`.trim()}
          trackingPlacement={iosTrackingPlacement}
          trackingPage={pagePath}
          trackingLabel={`${iosTrackingLabel}_badge`}
          aria-label={copy.trial.aria}
        >
          <AppStoreBadge locale={locale} className="lad-hero-store-badge" priority />
        </DownloadLink>
      );
    }

    return (
      <DownloadLink
        href={storeHref}
        className={`btn btn-primary btn-large lad-hero-cta-btn lad-hero-cta-btn--ios ${className}`.trim()}
        trackingPlacement={iosTrackingPlacement}
        trackingPage={pagePath}
        trackingLabel={iosTrackingLabel}
        aria-label={copy.trial.aria}
      >
        {primaryCtaText}
      </DownloadLink>
    );
  };

  const renderAndroidForm = (alwaysOpen = false) => {
    const isOpen = alwaysOpen || showAndroidInput;
    return (
      <div
        className={`lad-android-reveal ${isOpen ? 'is-open lad-android-reveal--static' : ''}`}
        aria-hidden={!isOpen}
      >
        <AndroidWaitlistCounter
          locale={locale}
          labelTemplate={copy.androidWaitlist.counterTemplate}
        />
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
          incentiveLine={alwaysOpen ? undefined : copy.androidWaitlist.incentive}
        />
      </div>
    );
  };

  const renderPending = () => (
    <div
      className={`lad-hero-fold-cta lad-hero-fold-cta--pending ${isFinal ? 'lad-hero-fold-cta--final' : ''}`}
      id={isFinal ? 'descargar-final' : 'descargar'}
      aria-busy="true"
    >
      <div className="lad-hero-cta-pending" />
    </div>
  );

  if (device === 'unknown') {
    return renderPending();
  }

  if (device === 'ios') {
    return (
      <div
        className={`lad-hero-fold-cta ${isFinal ? 'lad-hero-fold-cta--final' : ''} ${deviceModifier}`}
        id={isFinal ? 'descargar-final' : 'descargar'}
      >
        {isHero ? (
          <div className="lad-hero-cta-row lad-hero-cta-row--ios">
            {renderIosStoreCta(true)}
            <button
              type="button"
              id={androidButtonId}
              className={`btn btn-secondary btn-large lad-hero-cta-btn lad-hero-cta-btn--android ${
                showAndroidInput ? 'is-active' : ''
              }`}
              onClick={handleAndroidToggle}
              aria-expanded={showAndroidInput}
              aria-controls={androidFormId}
            >
              {copy.androidHeroCta}
            </button>
          </div>
        ) : (
          <div className="lad-hero-cta-single">{renderIosStoreCta(false)}</div>
        )}
        <TrustLines copy={copy} showIosTrial />
        {isHero && renderAndroidForm()}
      </div>
    );
  }

  if (device === 'android') {
    return (
      <div
        className={`lad-hero-fold-cta ${isFinal ? 'lad-hero-fold-cta--final' : ''} ${deviceModifier}`}
        id={isFinal ? 'descargar-final' : 'descargar'}
      >
        <p className="lad-hero-android-lead">{copy.androidDevice.waitlistLine}</p>
        {renderAndroidForm(true)}
        <TrustLines copy={copy} showIosTrial={false} />
        <p className="lad-hero-ios-fallback">
          <DownloadLink
            href={storeHref}
            className="lad-hero-ios-fallback-link"
            trackingPlacement={
              isFinal ? 'bienvenida_final_ios_fallback' : 'bienvenida_hero_ios_fallback'
            }
            trackingPage={pagePath}
            trackingLabel={`ios_fallback_${landingVariant}`}
          >
            {copy.androidDevice.iosFallback}
          </DownloadLink>
        </p>
      </div>
    );
  }

  // Desktop (y fallback)
  if (desktopChoice === null) {
    return (
      <div
        className={`lad-hero-fold-cta ${isFinal ? 'lad-hero-fold-cta--final' : ''} ${deviceModifier}`}
        id={isFinal ? 'descargar-final' : 'descargar'}
      >
        <p className="lad-desktop-picker-prompt">{copy.desktopPicker.prompt}</p>
        <div className="lad-desktop-picker" role="group" aria-label={copy.desktopPicker.prompt}>
          <button
            type="button"
            className="btn btn-secondary lad-desktop-picker-btn"
            onClick={() => setDesktopChoice('iphone')}
          >
            {copy.desktopPicker.iphone}
          </button>
          <button
            type="button"
            className="btn btn-secondary lad-desktop-picker-btn"
            onClick={handleDesktopAndroid}
          >
            {copy.desktopPicker.android}
          </button>
        </div>
        <TrustLines copy={copy} showIosTrial={false} />
      </div>
    );
  }

  if (desktopChoice === 'iphone') {
    return (
      <div
        className={`lad-hero-fold-cta ${isFinal ? 'lad-hero-fold-cta--final' : ''} ${deviceModifier}`}
        id={isFinal ? 'descargar-final' : 'descargar'}
      >
        <div className="lad-hero-cta-single">{renderIosStoreCta(true, 'lad-hero-cta-badge-wrap--desktop')}</div>
        <p className="lad-desktop-iphone-hint">{copy.desktopPicker.iphoneHint}</p>
        <TrustLines copy={copy} showIosTrial />
        <button type="button" className="lad-desktop-change-device" onClick={resetDesktopChoice}>
          {copy.desktopPicker.changeDevice}
        </button>
      </div>
    );
  }

  return (
    <div
      className={`lad-hero-fold-cta ${isFinal ? 'lad-hero-fold-cta--final' : ''} ${deviceModifier}`}
      id={isFinal ? 'descargar-final' : 'descargar'}
    >
      <p className="lad-hero-android-lead">{copy.androidDevice.waitlistLine}</p>
      {renderAndroidForm(true)}
      <TrustLines copy={copy} showIosTrial={false} />
      <button type="button" className="lad-desktop-change-device" onClick={resetDesktopChoice}>
        {copy.desktopPicker.changeDevice}
      </button>
    </div>
  );
}
