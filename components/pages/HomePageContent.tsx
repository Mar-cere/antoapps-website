'use client';

import type { Locale } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StickyNav from '@/components/layout/StickyNav';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import PullToRefresh from '@/components/ui/PullToRefresh';
import Hero from '@/components/sections/Hero';
import HomeFeatureShowcase from '@/components/sections/HomeFeatureShowcase';
import HomeCredentials from '@/components/sections/HomeCredentials';
import HomePricingSimple from '@/components/sections/HomePricingSimple';
import HomeExploreLinks from '@/components/sections/HomeExploreLinks';
import HomeFooterTrust from '@/components/sections/HomeFooterTrust';
import '@/styles/pages/home-landing-final.css';

type HomePageContentProps = {
  locale: Locale;
};

export default function HomePageContent({ locale }: HomePageContentProps) {
  return (
    <LocaleProvider locale={locale}>
      <ClientInitializer />
      <Header />
      <StickyNav />
      <PullToRefresh
        onRefresh={async () => {
          if (typeof window !== 'undefined') {
            window.location.reload();
          }
        }}
        threshold={80}
      >
        <main id="main-content" className="home-landing-page" role="main" lang={locale}>
          <Hero locale={locale} />
          <div className="home-landing-sep" aria-hidden="true" />
          <HomeFeatureShowcase locale={locale} />
          <div className="home-landing-sep" aria-hidden="true" />
          <HomeCredentials locale={locale} />
          <div className="home-landing-sep" aria-hidden="true" />
          <HomePricingSimple locale={locale} />
          <div className="home-landing-sep" aria-hidden="true" />
          <HomeExploreLinks locale={locale} />
          <HomeFooterTrust locale={locale} />
        </main>
      </PullToRefresh>
      <Footer />
      <CookieConsent />
    </LocaleProvider>
  );
}
