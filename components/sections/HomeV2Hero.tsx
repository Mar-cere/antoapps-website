'use client';

import { useId, useState } from 'react';
import Image from 'next/image';
import PremiumStoreCta from '@/components/ui/PremiumStoreCta';
import AndroidEarlyAccessForm from '@/components/forms/AndroidEarlyAccessForm';
import {
  APP_SCREENSHOT_HEIGHT,
  APP_SCREENSHOT_WIDTH,
  getHomeLandingScreenshotAlt,
  getHomeLandingScreenshotPath,
} from '@/lib/assets/app-screenshots';
import { appStoreHref } from '@/lib/download-links';
import type { Locale } from '@/lib/i18n/config';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';

type HomeV2HeroProps = {
  locale?: Locale;
};

/** Hero tipográfico fuerte + producto visible en el primer viewport (móvil incluido). */
export default function HomeV2Hero({ locale = 'es' }: HomeV2HeroProps) {
  const copy = getHomeV2Copy(locale).hero;
  const pagePath = locale === 'en' ? '/en' : '/';
  const androidFormId = useId().replace(/:/g, '');
  const [androidFormOpen, setAndroidFormOpen] = useState(false);

  return (
    <section id="inicio" className="home-v2-hero" aria-labelledby="home-v2-hero-title">
      <div className="home-landing-container home-v2-hero__grid">
        <div className="home-v2-hero__copy home-v2-motion-text">
          <p className="home-v2-hero__brand">{copy.brand}</p>
          <h1 id="home-v2-hero-title" className="home-v2-hero__title">
            {copy.titleLine1} <em>{copy.titleAccent}</em>
          </h1>
          <p className="home-v2-hero__support">{copy.support}</p>
        </div>

        <div className="home-v2-hero__media home-v2-motion-media">
          <div className="home-v2-hero__screen">
            <Image
              src={getHomeLandingScreenshotPath(copy.screenshot)}
              alt={getHomeLandingScreenshotAlt(copy.screenshot, locale)}
              width={APP_SCREENSHOT_WIDTH}
              height={APP_SCREENSHOT_HEIGHT}
              className="home-v2-hero__screen-img"
              priority
              quality={95}
              sizes="(max-width: 899px) 85vw, 24rem"
            />
          </div>
        </div>

        <div className="home-v2-hero__cta home-v2-motion-text">
          <PremiumStoreCta
            storeHref={appStoreHref()}
            storeLabel={copy.ctaStoreLabel}
            storeName={copy.ctaStoreText}
            badge={copy.ctaBadge}
            ariaLabel={copy.storeAria}
            trackingPlacement="home_v2_hero_store_cta"
            trackingPage={pagePath}
            trackingLabel="home_v2_hero"
          />
          <p className="home-v2-hero__micro">{copy.ctaMicro}</p>
          <button
            type="button"
            className="home-v2-hero__android"
            onClick={() => {
              setAndroidFormOpen(true);
              document.getElementById(androidFormId)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }}
          >
            {copy.androidLink}
          </button>
          <div className={`home-v2-hero__android-form ${androidFormOpen ? 'is-open' : ''}`}>
            <AndroidEarlyAccessForm
              locale={locale}
              id={androidFormId}
              placement="home_v2_hero_android_early_access"
              page={pagePath}
              compact
              autoFocus={androidFormOpen}
              buttonLabel={copy.androidCta}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
