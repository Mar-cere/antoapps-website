'use client';

import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import { getResourcesPageCopy } from '@/lib/i18n/copy/pages/resources';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import Breadcrumbs from '@/components/Breadcrumbs';
import ResourcesLibrary from '@/components/resources/ResourcesLibrary';
import '@/styles/components/resources-library.css';

type ResourcesPageContentProps = {
  locale: Locale;
};

export default function ResourcesPageContent({ locale }: ResourcesPageContentProps) {
  const copy = getResourcesPageCopy(locale);

  return (
    <LocaleProvider locale={locale}>
      <ClientInitializer />
      <Header />
      <main lang={locale}>
        <Breadcrumbs
          items={[
            { label: copy.breadcrumbs.homeLabel, href: copy.breadcrumbs.homeHref },
            { label: copy.breadcrumbs.currentLabel },
          ]}
        />

        <section className="resources-hero" data-fade-section>
          <div className="container">
            <h1 className="resources-title reveal-on-scroll">{copy.hero.title}</h1>
            <p className="resources-subtitle reveal-on-scroll">{copy.hero.subtitle}</p>
            <nav className="resources-featured reveal-on-scroll" aria-label={copy.featured.ariaLabel}>
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
      </main>
      <Footer />
      <CookieConsent />
    </LocaleProvider>
  );
}
