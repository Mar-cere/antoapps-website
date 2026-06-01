'use client';

import { Suspense, lazy } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StickyNav from '@/components/layout/StickyNav';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import FaqJsonLd from '@/components/seo/FaqJsonLd';
import PullToRefresh from '@/components/ui/PullToRefresh';
import Hero from '@/components/sections/Hero';
import WhatsNew from '@/components/sections/WhatsNew';
import Features from '@/components/sections/Features';
import AppShowcase from '@/components/sections/AppShowcase';
import Benefits from '@/components/sections/Benefits';
import Technologies from '@/components/sections/Technologies';
import Skeleton from '@/components/ui/Skeleton';

const ScienceBacked = lazy(() => import('@/components/sections/ScienceBacked'));
const Pricing = lazy(() => import('@/components/sections/Pricing'));
const Security = lazy(() => import('@/components/sections/Security'));
const AIExplained = lazy(() => import('@/components/sections/AIExplained'));
const FAQ = lazy(() => import('@/components/sections/FAQ'));

function SectionSkeleton() {
  return (
    <div className="section-skeleton">
      <div className="container">
        <div className="reveal-on-scroll">
          <Skeleton variant="text" width="60%" height="2.5rem" lines={1} />
        </div>
        <div className="reveal-on-scroll section-skeleton__subtitle">
          <Skeleton variant="text" width="80%" height="1.25rem" lines={1} />
        </div>
        <div className="section-skeleton__grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-card reveal-on-scroll">
              <Skeleton variant="rectangular" width="100%" height="200px" />
              <div className="section-skeleton__card-body">
                <Skeleton variant="text" width="60%" height="1.5rem" lines={1} />
                <Skeleton variant="text" width="100%" height="1rem" lines={2} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type HomePageContentProps = {
  locale: Locale;
};

export default function HomePageContent({ locale }: HomePageContentProps) {
  return (
    <LocaleProvider locale={locale}>
      <ClientInitializer />
      <FaqJsonLd />
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
        <main id="main-content" role="main" lang={locale}>
          <Hero locale={locale} />
          <AppShowcase locale={locale} />
          <Features locale={locale} />
          <Benefits locale={locale} />
          <Suspense fallback={<SectionSkeleton />}>
            <ScienceBacked locale={locale} />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <Pricing locale={locale} />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <Security locale={locale} />
          </Suspense>
          <WhatsNew locale={locale} />
          <Technologies locale={locale} />
          <Suspense fallback={<SectionSkeleton />}>
            <AIExplained locale={locale} />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <FAQ locale={locale} />
          </Suspense>
        </main>
      </PullToRefresh>
      <Footer />
      <CookieConsent />
    </LocaleProvider>
  );
}
