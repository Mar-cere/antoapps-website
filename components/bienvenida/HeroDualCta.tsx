'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DownloadLink from '@/components/DownloadLink';
import AndroidEarlyAccessForm from '@/components/forms/AndroidEarlyAccessForm';
import { APP_STORE_BADGE_SVG_PATH } from '@/lib/download-links';

type HeroDualCtaProps = {
  storeHref: string;
  landingVariant: 'A' | 'B';
  placement?: 'hero' | 'final';
};

function primaryCtaLabel(variant: 'A' | 'B'): string {
  return variant === 'B'
    ? 'Descargar en iPhone — 3 días gratis'
    : 'Empieza en iPhone — 3 días gratis';
}

export default function HeroDualCta({
  storeHref,
  landingVariant,
  placement = 'hero',
}: HeroDualCtaProps) {
  const [showAndroidInput, setShowAndroidInput] = useState(false);
  const [autoFocusAndroidInput, setAutoFocusAndroidInput] = useState(false);
  const isFinal = placement === 'final';
  const primaryCtaText = primaryCtaLabel(landingVariant);

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
        aria-label="Descargar Anto en App Store. Incluye prueba gratis de 3 días."
      >
        {primaryCtaText}
      </DownloadLink>

      <p className="lad-hero-trial-line">
        <strong>3 días gratis</strong> · cancela cuando quieras desde App Store
      </p>

      <div className="lad-dual-badges">
        <DownloadLink
          href={storeHref}
          className="lad-store-badge-link lad-store-badge-link--primary"
          trackingPlacement={
            isFinal ? 'bienvenida_final_store_badge' : 'bienvenida_hero_store_badge'
          }
          trackingPage="/bienvenida"
          trackingLabel={
            isFinal
              ? `final_store_badge_variant_${landingVariant}`
              : `hero_store_badge_variant_${landingVariant}`
          }
          aria-label="Descargar Anto en App Store"
        >
          <Image
            src={APP_STORE_BADGE_SVG_PATH}
            alt=""
            width={150}
            height={50}
            className="lad-store-badge-img lad-store-badge-img--hero"
            priority={!isFinal}
          />
        </DownloadLink>
      </div>

      {!isFinal && (
        <>
          <button
            type="button"
            className="lad-android-waitlist-trigger"
            onClick={() => setShowAndroidInput((prev) => !prev)}
            aria-expanded={showAndroidInput}
            aria-controls="android-early-access-bienvenida"
          >
            Android — lista de espera
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

      <p className="lad-hero-cta-micro">
        {isFinal
          ? 'Tu primera conversación toma menos de 2 minutos.'
          : 'iPhone: descarga inmediata · Android: acceso anticipado por correo.'}
      </p>

      {!isFinal && (
        <p className="lad-cta-privacy">
          <Link href="/privacidad" className="lad-cta-privacy-link">
            Cómo tratamos tus datos
          </Link>
        </p>
      )}
    </div>
  );
}
