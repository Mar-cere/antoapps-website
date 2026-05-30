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

  return (
    <div
      className={`lad-hero-fold-cta ${isFinal ? 'lad-hero-fold-cta--final' : ''}`}
      id={isFinal ? 'descargar-final' : 'descargar'}
    >
      <DownloadLink
        href={storeHref}
        className="btn btn-primary btn-large lad-hero-cta-btn"
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

      <p className="lad-hero-trial-line">{copy.trial.line}</p>

      {!isFinal && (
        <>
          <button
            type="button"
            className="lad-android-waitlist-trigger"
            onClick={() => setShowAndroidInput((prev) => !prev)}
            aria-expanded={showAndroidInput}
            aria-controls="android-early-access-bienvenida"
          >
            {copy.androidWaitlist}
          </button>

          <div className={`lad-android-reveal ${showAndroidInput ? 'is-open' : ''}`}>
            <AndroidEarlyAccessForm
              locale={locale}
              id="android-early-access-bienvenida"
              placement="bienvenida_hero_android_early_access"
              page={pagePath}
              className="android-early-access android-early-access--landing"
              compact
              autoFocus={autoFocusAndroidInput}
              buttonLabel={copy.androidCta}
            />
          </div>
        </>
      )}
    </div>
  );
}
