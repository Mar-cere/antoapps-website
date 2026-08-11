'use client';

import Image from 'next/image';
import AppReviewCard from '@/components/ui/AppReviewCard';
import PremiumStoreCtaPair from '@/components/ui/PremiumStoreCtaPair';
import {
  APP_SCREENSHOT_HEIGHT,
  APP_SCREENSHOT_WIDTH,
  getHomeLandingScreenshotAlt,
  getHomeLandingScreenshotPath,
} from '@/lib/assets/app-screenshots';
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
            <PremiumStoreCtaPair
              locale={locale}
              copy={copy}
              trackingPage={pagePath}
              trackingPlacementPrefix="home_hero"
              trackingLabel="home_hero_final"
            />
            <p className="home-landing-cta-micro">{copy.ctaMicro}</p>
            <HomeHeroTrust locale={locale} />
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
              quality={95}
              sizes="(max-width: 899px) 70vw, 20rem"
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
