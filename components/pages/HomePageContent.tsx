'use client';

import type { Locale } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import HomeMinimalNav from '@/components/layout/HomeMinimalNav';
import HomeMinimalFooter from '@/components/layout/HomeMinimalFooter';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import PullToRefresh from '@/components/ui/PullToRefresh';
import Hero from '@/components/sections/Hero';
import HomeFeatureShowcase from '@/components/sections/HomeFeatureShowcase';
import HomeCredentials from '@/components/sections/HomeCredentials';
import HomePricingSimple from '@/components/sections/HomePricingSimple';
import HomeExploreLinks from '@/components/sections/HomeExploreLinks';
import HomeReviewsSection from '@/components/sections/HomeReviewsSection';
import HomeFaqCompact from '@/components/sections/HomeFaqCompact';
import HomeFinalCta from '@/components/sections/HomeFinalCta';
import HomeFooterTrust from '@/components/sections/HomeFooterTrust';
import HomeLandingAtmosphere from '@/components/home/HomeLandingAtmosphere';
import FaqJsonLd from '@/components/seo/FaqJsonLd';
import '@/styles/pages/home-landing-final.css';

type HomePageContentProps = {
  locale: Locale;
};

export default function HomePageContent({ locale }: HomePageContentProps) {
  return (
    <LocaleProvider locale={locale}>
      <ClientInitializer />
      <HomeMinimalNav locale={locale} />
      <PullToRefresh
        onRefresh={async () => {
          if (typeof window !== 'undefined') {
            window.location.reload();
          }
        }}
        threshold={80}
      >
        <main id="main-content" className="home-landing-page" role="main" lang={locale}>
          <HomeLandingAtmosphere />
          <div className="home-landing-page__content">
            <Hero locale={locale} />
            <div className="home-landing-sep" aria-hidden="true" />
            <HomeReviewsSection locale={locale} />
            <div className="home-landing-sep" aria-hidden="true" />
            <HomeFeatureShowcase locale={locale} />
            <div className="home-landing-sep" aria-hidden="true" />
            <HomeCredentials locale={locale} />
            <div className="home-landing-sep" aria-hidden="true" />
            <HomePricingSimple locale={locale} />
            <div className="home-landing-sep" aria-hidden="true" />
            <HomeFaqCompact locale={locale} />
            <HomeFinalCta locale={locale} />
            <div className="home-landing-sep" aria-hidden="true" />
            <HomeExploreLinks locale={locale} />
            <HomeFooterTrust locale={locale} />
          </div>
        </main>
      </PullToRefresh>
      <HomeMinimalFooter locale={locale} />
      <FaqJsonLd />
      <CookieConsent compact bannerDelayMs={3000} showAfterScrollPx={120} />
    </LocaleProvider>
  );
}
