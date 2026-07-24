'use client';

import Link from 'next/link';
import { localePath, type Locale } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import { getResourcesPageCopy } from '@/lib/i18n/copy/pages/resources';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';
import HomeMinimalNav from '@/components/layout/HomeMinimalNav';
import HomeMinimalFooter from '@/components/layout/HomeMinimalFooter';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import ResourcesLibrary from '@/components/resources/ResourcesLibrary';
import '@/styles/pages/home-landing-final.css';
import '@/styles/pages/home-v2.css';
import '@/styles/components/resources-library.css';

type ResourcesPageContentProps = {
  locale: Locale;
};

export default function ResourcesPageContent({ locale }: ResourcesPageContentProps) {
  const copy = getResourcesPageCopy(locale);
  const nav = getHomeV2Copy(locale).nav;

  return (
    <LocaleProvider locale={locale}>
      <div className="home-v2-shell resources-shell">
        <ClientInitializer />
        <HomeMinimalNav
          locale={locale}
          ctaHref={localePath(locale, '/bienvenida')}
          ctaLabel={nav.cta}
        />
        <main
          id="main-content"
          className="home-landing-page home-landing-page--v2 resources-page"
          role="main"
          lang={locale}
        >
          <div className="home-landing-page__content">
            <section className="resources-hero" data-fade-section>
              <div className="home-landing-container">
                <nav className="resources-crumb" aria-label="Breadcrumb">
                  <Link href={copy.breadcrumbs.homeHref} className="resources-crumb__link">
                    {copy.breadcrumbs.homeLabel}
                  </Link>
                  <span className="resources-crumb__sep" aria-hidden="true">
                    /
                  </span>
                  <span className="resources-crumb__current">{copy.breadcrumbs.currentLabel}</span>
                </nav>

                <h1 className="resources-hero__title reveal-on-scroll">{copy.hero.title}</h1>
                <p className="resources-hero__support reveal-on-scroll">{copy.hero.subtitle}</p>

                <nav
                  className="resources-featured reveal-on-scroll"
                  aria-label={copy.featured.ariaLabel}
                >
                  <ul className="resources-featured__list">
                    {copy.featured.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="resources-featured__link">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </section>

            <ResourcesLibrary library={copy.library} />
          </div>
        </main>
        <HomeMinimalFooter locale={locale} switchPath="/recursos" />
        <CookieConsent compact bannerDelayMs={6000} showAfterScrollPx={320} />
      </div>
    </LocaleProvider>
  );
}
