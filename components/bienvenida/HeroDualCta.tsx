'use client';

import { useEffect, useState } from 'react';
import DownloadLink from '@/components/DownloadLink';
import AndroidEarlyAccessForm from '@/components/forms/AndroidEarlyAccessForm';
import {
  BIENVENIDA_TRIAL_ARIA,
  BIENVENIDA_TRIAL_FINAL_CTA,
  BIENVENIDA_TRIAL_HERO_CTA,
  BIENVENIDA_TRIAL_SHORT,
} from '@/lib/bienvenida-copy';

type HeroDualCtaProps = {
  storeHref: string;
  landingVariant: 'A' | 'B';
  placement?: 'hero' | 'final';
};

function primaryCtaLabel(variant: 'A' | 'B', isFinal: boolean): string {
  if (isFinal) {
    return BIENVENIDA_TRIAL_FINAL_CTA;
  }
  return BIENVENIDA_TRIAL_HERO_CTA[variant];
}

export default function HeroDualCta({
  storeHref,
  landingVariant,
  placement = 'hero',
}: HeroDualCtaProps) {
  const [showAndroidInput, setShowAndroidInput] = useState(false);
  const [autoFocusAndroidInput, setAutoFocusAndroidInput] = useState(false);
  const isFinal = placement === 'final';
  const primaryCtaText = primaryCtaLabel(landingVariant, isFinal);

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
        trackingPage="/bienvenida"
        trackingLabel={
          isFinal
            ? `final_primary_variant_${landingVariant}`
            : `hero_primary_variant_${landingVariant}`
        }
        aria-label={BIENVENIDA_TRIAL_ARIA}
      >
        {primaryCtaText}
      </DownloadLink>

      <p className="lad-hero-trial-line">
        <strong>{BIENVENIDA_TRIAL_SHORT}</strong> · cancelas cuando quieras en App Store
      </p>

      {!isFinal && (
        <>
          <button
            type="button"
            className="lad-android-waitlist-trigger"
            onClick={() => setShowAndroidInput((prev) => !prev)}
            aria-expanded={showAndroidInput}
            aria-controls="android-early-access-bienvenida"
          >
            ¿Usas Android? Únete a la lista de espera
          </button>

          <div className={`lad-android-reveal ${showAndroidInput ? 'is-open' : ''}`}>
            <AndroidEarlyAccessForm
              id="android-early-access-bienvenida"
              placement="bienvenida_hero_android_early_access"
              page="/bienvenida"
              className="android-early-access android-early-access--landing"
              compact
              autoFocus={autoFocusAndroidInput}
              buttonLabel="Quiero acceso Android"
            />
          </div>
        </>
      )}
    </div>
  );
}
