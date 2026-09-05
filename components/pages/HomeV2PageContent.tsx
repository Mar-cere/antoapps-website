'use client';

import type { Locale } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import type { LandingDevice } from '@/lib/device/landing-device';
import HomeMinimalNav from '@/components/layout/HomeMinimalNav';
import HomeMinimalFooter from '@/components/layout/HomeMinimalFooter';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import PullToRefresh from '@/components/ui/PullToRefresh';
import HomeV2Hero from '@/components/sections/HomeV2Hero';
import HomeV2Recognize from '@/components/sections/HomeV2Recognize';
import HomeV2InPhone from '@/components/sections/HomeV2InPhone';
import HomeV2Moments from '@/components/sections/HomeV2Moments';
import HomeV2Foundation from '@/components/sections/HomeV2Foundation';
import HomeV2Still from '@/components/sections/HomeV2Still';
import HomeV2Reviews from '@/components/sections/HomeV2Reviews';
import HomeV2Pricing from '@/components/sections/HomeV2Pricing';
import HomeV2Faq from '@/components/sections/HomeV2Faq';
import HomeV2FinalCta from '@/components/sections/HomeV2FinalCta';
import HomeV2Explore from '@/components/sections/HomeV2Explore';
import FaqJsonLd from '@/components/seo/FaqJsonLd';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';
import '@/styles/pages/home-landing-final.css';
import '@/styles/pages/home-v2.css';

type HomeV2PageContentProps = {
  locale: Locale;
  initialDevice?: LandingDevice;
};

/** Home publicada — editorial Anto. */
export default function HomeV2PageContent({
  locale,
  initialDevice = 'ios',
}: HomeV2PageContentProps) {
  const { nav, hero } = getHomeV2Copy(locale);

  return (
    <LocaleProvider locale={locale}>
      <div className="home-v2-shell">
        <ClientInitializer />
        <HomeMinimalNav
          locale={locale}
          ctaLabel={nav.cta}
          ctaAria={hero.storeAria}
          ctaAriaAndroid={hero.androidStoreAria}
          initialDevice={initialDevice}
        />
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
              <HomeV2InPhone locale={locale} />
              <HomeV2Moments locale={locale} />
              <HomeV2Foundation locale={locale} />
              <HomeV2Still locale={locale} />
              <HomeV2Reviews locale={locale} />
              <HomeV2Pricing locale={locale} />
              <HomeV2Faq locale={locale} />
              <HomeV2Explore locale={locale} />
              <HomeV2FinalCta locale={locale} />
            </div>
          </main>
        </PullToRefresh>
        <HomeMinimalFooter locale={locale} />
        <FaqJsonLd />
        <CookieConsent
          compact
          bannerDelayMs={8000}
          showAfterScrollPx={900}
          mobileBannerDelayMs={12000}
          mobileShowAfterScrollPx={1600}
        />
      </div>
    </LocaleProvider>
  );
}
