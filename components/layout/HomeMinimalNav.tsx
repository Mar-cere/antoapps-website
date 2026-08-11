'use client';

import Image from 'next/image';
import Link from 'next/link';
import DownloadLink from '@/components/DownloadLink';
import type { LandingDevice } from '@/lib/device/landing-device';
import { appStoreHref, googlePlayHref } from '@/lib/download-links';
import { useLandingDevice } from '@/lib/hooks/useLandingDevice';
import type { Locale } from '@/lib/i18n/config';
import { getHomeLandingFinalCopy } from '@/lib/i18n/copy/home/landing-final';

type HomeMinimalNavProps = {
  locale: Locale;
  /** Si se define, el CTA navega a este ancla (p. ej. `#precios`). */
  ctaHref?: string;
  /** Etiqueta del CTA (por defecto copy de landing final). */
  ctaLabel?: string;
  /** Aria del CTA (App Store / ancla). */
  ctaAria?: string;
  /** Aria del CTA en Android cuando el destino es device-store. */
  ctaAriaAndroid?: string;
  /** Hint SSR para evitar flash de store incorrecta. */
  initialDevice?: LandingDevice;
};

export default function HomeMinimalNav({
  locale,
  ctaHref,
  ctaLabel,
  ctaAria,
  ctaAriaAndroid,
  initialDevice = 'ios',
}: HomeMinimalNavProps) {
  const copy = getHomeLandingFinalCopy(locale);
  const homeHref = locale === 'en' ? '/en' : '/';
  const pagePath = homeHref;
  const label = ctaLabel ?? copy.minimalNav.cta;
  const device = useLandingDevice(initialDevice);
  const storeHref = device === 'android' ? googlePlayHref(locale) : appStoreHref();
  const aria =
    !ctaHref && device === 'android'
      ? (ctaAriaAndroid ?? ctaAria ?? copy.hero.androidStoreAria)
      : (ctaAria ?? copy.hero.storeAria);

  return (
    <header className="home-landing-nav" role="banner">
      <nav className="home-landing-nav__inner" aria-label={copy.minimalNav.aria}>
        <Link href={homeHref} className="home-landing-nav__brand" aria-label={copy.minimalNav.logoAria}>
          <span className="home-landing-nav__icon" aria-hidden="true">
            <Image
              src="/assets/images/antoIcon.png"
              alt=""
              width={28}
              height={28}
              className="home-landing-nav__logo"
              priority
            />
          </span>
          <span className="home-landing-nav__name">Anto</span>
        </Link>
        {ctaHref ? (
          <Link href={ctaHref} className="home-landing-nav__cta" aria-label={aria}>
            {label}
          </Link>
        ) : (
          <DownloadLink
            href={storeHref}
            className="home-landing-nav__cta"
            trackingPlacement="home_minimal_nav_cta"
            trackingPage={pagePath}
            trackingLabel={
              device === 'android' ? 'home_minimal_nav_android' : 'home_minimal_nav_ios'
            }
            aria-label={aria}
          >
            {label}
          </DownloadLink>
        )}
      </nav>
    </header>
  );
}
