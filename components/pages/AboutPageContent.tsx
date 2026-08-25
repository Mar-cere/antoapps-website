'use client';

import type { Locale } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import { getAboutPageCopy } from '@/lib/i18n/copy/pages/about';
import { getHomeLandingFinalCopy } from '@/lib/i18n/copy/home/landing-final';
import HomeMinimalNav from '@/components/layout/HomeMinimalNav';
import HomeMinimalFooter from '@/components/layout/HomeMinimalFooter';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import PremiumStoreCtaPair from '@/components/ui/PremiumStoreCtaPair';
import '@/styles/pages/home-landing-final.css';
import '@/styles/components/about.css';

type AboutPageContentProps = {
  locale: Locale;
};

export default function AboutPageContent({ locale }: AboutPageContentProps) {
  const copy = getAboutPageCopy(locale);
  const homeHero = getHomeLandingFinalCopy(locale).hero;
  const pagePath = locale === 'en' ? '/en/sobre-nosotros' : '/sobre-nosotros';
  const storeCopy = {
    ...homeHero,
    ctaBadge: copy.storeBadge,
    ctaPlayBadge: copy.storeBadge,
  };

  return (
    <LocaleProvider locale={locale}>
      <ClientInitializer />
      <div className="about-page">
        <HomeMinimalNav locale={locale} />
        <main id="main-content" className="about-page__main" lang={locale}>
          <div className="about-page__column">
            <h1 className="about-page__title">{copy.h1}</h1>
            <p className="about-page__lede">{copy.lede}</p>
            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph} className="about-page__body">
                {paragraph}
              </p>
            ))}
            <div className="about-page__stores">
              <PremiumStoreCtaPair
                locale={locale}
                copy={storeCopy}
                trackingPage={pagePath}
                trackingPlacementPrefix="about"
                trackingLabel="about_stores"
              />
            </div>
            <p className="about-page__micro">{copy.microcopy}</p>
            <p className="about-page__disclaimer">{copy.disclaimer}</p>
          </div>
        </main>
        <HomeMinimalFooter locale={locale} switchPath="/sobre-nosotros" />
      </div>
      <CookieConsent compact bannerDelayMs={3000} showAfterScrollPx={120} />
    </LocaleProvider>
  );
}
