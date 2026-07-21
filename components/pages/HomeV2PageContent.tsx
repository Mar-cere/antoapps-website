'use client';

import type { Locale } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import HomeMinimalNav from '@/components/layout/HomeMinimalNav';
import HomeMinimalFooter from '@/components/layout/HomeMinimalFooter';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import PullToRefresh from '@/components/ui/PullToRefresh';
import HomeV2Hero from '@/components/sections/HomeV2Hero';
import HomeV2Recognize from '@/components/sections/HomeV2Recognize';
import HomeV2Moments from '@/components/sections/HomeV2Moments';
import HomeV2Reviews from '@/components/sections/HomeV2Reviews';
import HomeV2Pricing from '@/components/sections/HomeV2Pricing';
import HomeV2Faq from '@/components/sections/HomeV2Faq';
import HomeV2FinalCta from '@/components/sections/HomeV2FinalCta';
import HomeFooterTrust from '@/components/sections/HomeFooterTrust';
import FaqJsonLd from '@/components/seo/FaqJsonLd';
import Link from 'next/link';
import '@/styles/pages/home-landing-final.css';
import '@/styles/pages/home-v2.css';

type HomeV2PageContentProps = {
  locale: Locale;
};

/**
 * Home v2 — editorial moderna Anto.
 * Sandbox no indexable; no altera la landing publicada.
 */
export default function HomeV2PageContent({ locale }: HomeV2PageContentProps) {
  const homeHref = locale === 'en' ? '/en' : '/';

  return (
    <LocaleProvider locale={locale}>
      <div className="home-v2-shell">
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
          <main
            id="main-content"
            className="home-landing-page home-landing-page--v2"
            role="main"
            lang={locale}
          >
            <div className="home-landing-page__content">
              <HomeV2Hero locale={locale} />
              <HomeV2Recognize locale={locale} />
              <HomeV2Moments locale={locale} />
              <HomeV2Reviews locale={locale} />
              <HomeV2Pricing locale={locale} />
              <HomeV2Faq locale={locale} />
              <HomeV2FinalCta locale={locale} />
              <HomeFooterTrust locale={locale} />
            </div>
          </main>
        </PullToRefresh>
        <HomeMinimalFooter locale={locale} switchPath="/home-v2" />
        <p className="home-v2-compare">
          <Link href={homeHref}>
            {locale === 'en' ? 'Compare with the live landing' : 'Comparar con la landing publicada'}
          </Link>
        </p>
        <FaqJsonLd />
        <CookieConsent compact bannerDelayMs={3000} showAfterScrollPx={120} />
      </div>
    </LocaleProvider>
  );
}
