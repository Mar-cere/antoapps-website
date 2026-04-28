'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import DownloadLink from '@/components/DownloadLink';
import AndroidEarlyAccessForm from '@/components/forms/AndroidEarlyAccessForm';
import { APP_STORE_BADGE_SVG_PATH, GOOGLE_PLAY_BADGE_SVG_PATH } from '@/lib/download-links';

type HeroDualCtaProps = {
  storeHref: string;
  landingVariant: 'A' | 'B';
};

export default function HeroDualCta({ storeHref, landingVariant }: HeroDualCtaProps) {
  const [showAndroidInput, setShowAndroidInput] = useState(false);
  const [autoFocusAndroidInput, setAutoFocusAndroidInput] = useState(false);

  useEffect(() => {
    if (showAndroidInput) {
      setAutoFocusAndroidInput(true);
    }
  }, [showAndroidInput]);

  return (
    <div className="lad-hero-fold-cta" id="descargar">
      <div className="lad-dual-badges">
        <DownloadLink
          href={storeHref}
          className="lad-store-badge-link lad-store-badge-link--primary"
          trackingPlacement="bienvenida_hero_store_badge"
          trackingPage="/bienvenida"
          trackingLabel={`hero_store_badge_variant_${landingVariant}`}
          aria-label="Descargar Anto en App Store"
        >
          <Image
            src={APP_STORE_BADGE_SVG_PATH}
            alt=""
            width={150}
            height={50}
            className="lad-store-badge-img lad-store-badge-img--hero"
            priority
          />
        </DownloadLink>

        <button
          type="button"
          className="lad-play-badge-trigger"
          onClick={() => setShowAndroidInput((prev) => !prev)}
          aria-expanded={showAndroidInput}
          aria-controls="android-early-access-bienvenida"
          aria-label="Abrir formulario de acceso anticipado Android"
        >
          <Image
            src={GOOGLE_PLAY_BADGE_SVG_PATH}
            alt="Acceso anticipado Android"
            width={150}
            height={50}
            className="lad-store-badge-img"
            priority
          />
        </button>
      </div>

      <div className={`lad-android-reveal ${showAndroidInput ? 'is-open' : ''}`}>
        <AndroidEarlyAccessForm
          id="android-early-access-bienvenida"
          placement="bienvenida_hero_android_early_access"
          page="/bienvenida"
          className="android-early-access android-early-access--landing"
          compact
          autoFocus={autoFocusAndroidInput}
          buttonLabel="Recibir acceso Android"
        />
      </div>
      <p className="lad-hero-cta-micro">Apple descarga directa · Android acceso anticipado por correo.</p>
    </div>
  );
}

