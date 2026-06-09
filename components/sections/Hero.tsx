'use client';

import Image from 'next/image';
import Link from 'next/link';
import DownloadLink from '@/components/DownloadLink';
import AppStoreBadge from '@/components/AppStoreBadge';
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
import { useParticles } from '@/lib/hooks/useParticles';
import { useParallax } from '@/lib/hooks/useParallax';
import '@/styles/components/sections.css';

type HeroProps = {
  locale?: Locale;
};

export default function Hero({ locale = 'es' }: HeroProps) {
  const copy = getHomeHeroCopy(locale);
  const particlesRef = useParticles();
  const heroImageRef = useParallax<HTMLDivElement>({ speed: 0.3, direction: 'up' });

  return (
    <section id="inicio" className="hero" data-fade-section aria-labelledby="hero-title">
      <div ref={particlesRef} className="particles" id="particles"></div>
      <div className="container">
        <div className="hero-content reveal-on-scroll">
          <h1 className="hero-title" id="hero-title">
            {copy.title}
          </h1>
          <p className="hero-subtitle reveal-on-scroll">
            {copy.subtitle}
          </p>
          <p className="hero-download-pitch reveal-on-scroll">
            {copy.downloadLead} {copy.downloadAndroid}
          </p>
          <div className="hero-stats">
            <div className="hero-stat-item">
              <span className="hero-stat-icon">🔒</span>
              <span className="hero-stat-value">100%</span>
              <span className="hero-stat-label">{copy.statPrivate}</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-icon">⏰</span>
              <span className="hero-stat-value">24/7</span>
              <span className="hero-stat-label">{copy.statAvailable}</span>
            </div>
          </div>
          <div className="hero-cta">
            <DownloadLink
              href={appStoreHref()}
              className="store-badge-link"
              trackingPlacement="home_hero_store_badge"
              trackingPage={locale === 'en' ? '/en' : '/'}
              trackingLabel="home_hero_badge"
              aria-label={copy.storeAria}
            >
              <AppStoreBadge locale={locale} priority />
            </DownloadLink>
            <Link href={copy.appHref} className="btn btn-secondary btn-large">
              {copy.ctaSecondary}
            </Link>
          </div>
          <AndroidEarlyAccessForm
            locale={locale}
            id="android-early-access-home"
            placement="home_hero_android_early_access"
            page={locale === 'en' ? '/en' : '/'}
            compact
            buttonLabel={copy.androidCta}
          />
        </div>
        <div className="hero-image reveal-on-scroll-enhanced" ref={heroImageRef}>
          <div className="phone-in-hand-container float-enhanced phone-screenshot-container">
            <Image
              src={getAppScreenshotPath('chat')}
              alt={getAppScreenshotAlt('chat', locale)}
              className="phone-in-hand-image phone-screenshot-image"
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

