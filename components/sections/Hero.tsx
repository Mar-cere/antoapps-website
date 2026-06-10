'use client';

import { useId, useState } from 'react';
import Image from 'next/image';
import AppReviewCard from '@/components/ui/AppReviewCard';
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
import { getHomeLandingFinalCopy } from '@/lib/i18n/copy/home/landing-final';
import HomeHeroTrust from '@/components/sections/HomeHeroTrust';
import HomeKickerSparkle from '@/components/ui/HomeKickerSparkle';
import '@/styles/pages/home-landing-final.css';

type HeroProps = {
  locale?: Locale;
};

export default function Hero({ locale = 'es' }: HeroProps) {
  const copy = getHomeLandingFinalCopy(locale).hero;
  const pagePath = locale === 'en' ? '/en' : '/';
  const androidFormId = useId().replace(/:/g, '');
  const [androidFormOpen, setAndroidFormOpen] = useState(false);

  return (
    <section id="inicio" className="home-landing-hero" data-fade-section aria-labelledby="hero-title">
      <div className="home-landing-container home-landing-hero__grid">
        <div className="home-landing-hero__left reveal-on-scroll">
          <div className="home-landing-kicker">
            <HomeKickerSparkle className="home-landing-kicker__icon" />
            <span>{copy.kicker}</span>
          </div>
          <h1 className="home-landing-hero__title" id="hero-title">
            {copy.titleLine1}
            <br />
            {copy.titleLine2} <em>{copy.titleAccent}</em>
          </h1>
          <p className="home-landing-hero__sub">{copy.subtitle}</p>
          <div className="home-landing-cta-wrap">
            <PremiumStoreCta
              storeHref={appStoreHref()}
              storeLabel={copy.ctaStoreLabel}
              storeName={copy.ctaStoreText}
              badge={copy.ctaBadge}
              ariaLabel={copy.storeAria}
              trackingPlacement="home_hero_store_cta"
              trackingPage={pagePath}
              trackingLabel="home_hero_final"
            />
            <p className="home-landing-cta-micro">{copy.ctaMicro}</p>
            <HomeHeroTrust locale={locale} />
            <button
              type="button"
              className="home-landing-android-link"
              onClick={() => {
                setAndroidFormOpen(true);
                document.getElementById(androidFormId)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              }}
            >
              {copy.androidLink}
            </button>
          </div>
          <div className={`home-landing-android-form ${androidFormOpen ? 'is-open' : ''}`}>
            <AndroidEarlyAccessForm
              locale={locale}
              id={androidFormId}
              placement="home_hero_android_early_access"
              page={pagePath}
              compact
              autoFocus={androidFormOpen}
              buttonLabel={copy.androidCta}
            />
          </div>
        </div>

        <div className="home-landing-hero__right reveal-on-scroll">
          <div className="home-landing-screen home-landing-screen--hero">
            <Image
              src={getHomeLandingScreenshotPath(copy.heroScreenshot)}
              alt={getHomeLandingScreenshotAlt(copy.heroScreenshot, locale)}
              width={APP_SCREENSHOT_WIDTH}
              height={APP_SCREENSHOT_HEIGHT}
              className="home-landing-screen__img"
              priority
              quality={90}
            />
          </div>
          <AppReviewCard
            quote={copy.heroReview.quote}
            author={copy.heroReview.author}
            source={copy.heroReview.source}
            starsAria={copy.starsAria}
            className="home-landing-review-pill"
          />
        </div>
      </div>
    </section>
  );
}
