'use client';

import DownloadLink from '@/components/DownloadLink';
import GooglePlayBadge from '@/components/GooglePlayBadge';
import InstagramBrowserHint from '@/components/bienvenida/InstagramBrowserHint';
import BienvenidaV2StoreCta from '@/components/bienvenida/v2/BienvenidaV2StoreCta';
import type { LandingDevice } from '@/lib/device/landing-device';
import { googlePlayHref } from '@/lib/download-links';
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
  const v2 = copy.v2;
  const isHero = placement === 'hero';
  const playHref = googlePlayHref(locale);

  const showIosStoreCta = device === 'ios' || device === 'desktop';
  const showAndroidPrimary = device === 'android';
  // En iOS el Play Store no compite en el fold: solo en el CTA final.
  const showAndroidLink = !isHero && (device === 'ios' || device === 'desktop');

  return (
    <div
      className={`lad-v2-fold ${isHero ? '' : 'lad-v2-fold--final'}`}
      id={isHero ? 'descargar' : 'descargar-final'}
    >
      {showAndroidPrimary && (
        <p className="lad-v2-android-lead">{copy.androidDevice.leadLine}</p>
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

      {showAndroidPrimary && (
        <DownloadLink
          href={playHref}
          className="lad-hero-cta-badge-wrap lad-hero-cta-btn--android"
          trackingPlacement={
            isHero ? 'bienvenida_v2_hero_play_store' : 'bienvenida_v2_final_play_store'
          }
          trackingPage={pagePath}
          trackingLabel={`play_store_${landingVariant}`}
          aria-label={copy.androidStoreAria}
        >
          <GooglePlayBadge locale={locale} className="lad-hero-store-badge" priority />
        </DownloadLink>
      )}

      {showIosStoreCta && <p className="lad-v2-cta-micro">{v2.ctaMicro}</p>}

      {isHero && showIosStoreCta && (
        <p className="lad-v2-cta-rating">{copy.trustStrip.ratingOnAppStore}</p>
      )}

      {isHero && showIosStoreCta && (
        <InstagramBrowserHint copy={copy.inAppHint} locale={locale} variant="cta" />
      )}

      {showAndroidLink && (
        <DownloadLink
          href={playHref}
          className="lad-v2-android-link"
          trackingPlacement="bienvenida_v2_final_play_store_link"
          trackingPage={pagePath}
          trackingLabel={`play_link_${landingVariant}`}
          aria-label={copy.androidStoreAria}
        >
          {v2.androidLink}
        </DownloadLink>
      )}

      {showAndroidPrimary && (
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
