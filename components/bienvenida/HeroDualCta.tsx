'use client';

import { useEffect, useState } from 'react';
import DownloadLink from '@/components/DownloadLink';
import AndroidEarlyAccessForm from '@/components/forms/AndroidEarlyAccessForm';
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
  const [showAndroidInput, setShowAndroidInput] = useState(false);
  const [autoFocusAndroidInput, setAutoFocusAndroidInput] = useState(false);
  const isFinal = placement === 'final';
  const primaryCtaText = primaryCtaLabel(copy, landingVariant, isFinal);

  useEffect(() => {
    if (showAndroidInput) {
      setAutoFocusAndroidInput(true);
    }
  }, [showAndroidInput]);

  const handleAndroidClick = () => {
    setShowAndroidInput((prev) => {
      const next = !prev;
      if (next) {
        setAutoFocusAndroidInput(true);
      }
      return next;
    });
  };

  return (
    <div
      className={`lad-hero-fold-cta ${isFinal ? 'lad-hero-fold-cta--final' : ''}`}
      id={isFinal ? 'descargar-final' : 'descargar'}
    >
      <div className="lad-hero-cta-row">
        <DownloadLink
          href={storeHref}
          className="btn btn-primary btn-large lad-hero-cta-btn lad-hero-cta-btn--ios"
          trackingPlacement={
            isFinal ? 'bienvenida_final_primary_cta' : 'bienvenida_hero_primary_cta'
          }
          trackingPage={pagePath}
          trackingLabel={
            isFinal
              ? `final_primary_variant_${landingVariant}`
              : `hero_primary_variant_${landingVariant}`
          }
          aria-label={copy.trial.aria}
        >
          {primaryCtaText}
        </DownloadLink>

        <button
          type="button"
          className={`btn btn-secondary btn-large lad-hero-cta-btn lad-hero-cta-btn--android ${
            showAndroidInput ? 'is-active' : ''
          }`}
          onClick={handleAndroidClick}
          aria-expanded={showAndroidInput}
          aria-controls="android-early-access-bienvenida"
        >
          {copy.androidHeroCta}
        </button>
      </div>

      <p className="lad-hero-trial-line">{copy.trial.line}</p>
      <p className="lad-hero-pricing-line">{copy.trial.pricingLine}</p>

      <p className="lad-hero-privacy" aria-label={copy.privacyBadge}>
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

      <div className={`lad-android-reveal ${showAndroidInput ? 'is-open' : ''}`}>
        <AndroidEarlyAccessForm
          locale={locale}
          id="android-early-access-bienvenida"
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
