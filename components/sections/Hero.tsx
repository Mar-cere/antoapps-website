'use client';

import { useId, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AppReviewCard from '@/components/ui/AppReviewCard';
import MultilineText from '@/components/ui/MultilineText';
import PremiumStoreCta from '@/components/ui/PremiumStoreCta';
import AndroidEarlyAccessForm from '@/components/forms/AndroidEarlyAccessForm';
import {
  APP_SCREENSHOT_HEIGHT,
  APP_SCREENSHOT_WIDTH,
  getAppScreenshotAlt,
  getAppScreenshotPath,
} from '@/lib/assets/app-screenshots';
import { appStoreHref } from '@/lib/download-links';
import type { Locale } from '@/lib/i18n/config';
import { getHomeHeroCopy } from '@/lib/i18n/copy/home-hero';
import '@/styles/pages/home-premium.css';

type HeroProps = {
  locale?: Locale;
};

export default function Hero({ locale = 'es' }: HeroProps) {
  const copy = getHomeHeroCopy(locale);
  const pagePath = locale === 'en' ? '/en' : '/';
  const androidFormId = useId().replace(/:/g, '');
  const [androidFormOpen, setAndroidFormOpen] = useState(false);

  return (
    <section id="inicio" className="hero hero--premium" data-fade-section aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-content reveal-on-scroll">
          <p className="hero-eyebrow">{copy.eyebrow}</p>
          <h1 className="hero-title" id="hero-title">
            <MultilineText text={copy.titlePrefix} />
            <span className="hero-title-accent">
              <MultilineText text={copy.titleHighlight} />
            </span>
          </h1>
          <p className="hero-subtitle reveal-on-scroll">{copy.subtitle}</p>

          <AppReviewCard
            quote={copy.heroReview.quote}
            author={copy.heroReview.author}
            source={copy.heroReview.source}
            starsAria={copy.starsAria}
            className="reveal-on-scroll"
          />

          <div className="hero-cta reveal-on-scroll">
            <PremiumStoreCta
              storeHref={appStoreHref()}
              storeLabel={copy.ctaStoreLabel}
              storeName={copy.ctaStoreText}
              badge={copy.ctaBadge}
              ariaLabel={copy.storeAria}
              trackingPlacement="home_hero_store_cta"
              trackingPage={pagePath}
              trackingLabel="home_hero_premium"
            />
            <p className="hero-cta-micro">{copy.ctaMicro}</p>
            <Link href={copy.appHref} className="btn btn-secondary btn-large hero-secondary-link">
              {copy.ctaSecondary}
            </Link>
            <button
              type="button"
              className="hero-android-link"
              onClick={() => {
                setAndroidFormOpen(true);
                document.getElementById(androidFormId)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              }}
            >
              {copy.androidLink}
            </button>
          </div>

          <div className={`hero-android-form ${androidFormOpen ? 'is-open' : ''}`}>
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

        <div className="hero-visual reveal-on-scroll">
          <div className="hero-screenshot-crop">
            <Image
              src={getAppScreenshotPath('chat')}
              alt={getAppScreenshotAlt('chat', locale)}
              className="hero-screenshot hero-screenshot--chat"
              width={APP_SCREENSHOT_WIDTH}
              height={APP_SCREENSHOT_HEIGHT}
              priority
              quality={90}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
            />
          </div>
        </div>
      </div>
    </section>
  );
}
