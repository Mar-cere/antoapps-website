'use client';

import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import { getSecurityPageCopy } from '@/lib/i18n/copy/pages/security';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';
import HomeMinimalNav from '@/components/layout/HomeMinimalNav';
import HomeMinimalFooter from '@/components/layout/HomeMinimalFooter';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import '@/styles/pages/home-landing-final.css';
import '@/styles/pages/home-v2.css';
import '@/styles/components/security-page.css';

type SecurityPageContentProps = {
  locale: Locale;
};

export default function SecurityPageContent({ locale }: SecurityPageContentProps) {
  const copy = getSecurityPageCopy(locale);
  const nav = getHomeV2Copy(locale).nav;

  return (
    <LocaleProvider locale={locale}>
      <div className="home-v2-shell security-shell">
        <ClientInitializer />
        <HomeMinimalNav
          locale={locale}
          ctaHref={localePath(locale, '/bienvenida')}
          ctaLabel={nav.cta}
        />
        <main
          id="main-content"
          className="home-landing-page home-landing-page--v2 security-page"
          role="main"
          lang={locale}
        >
          <div className="home-landing-page__content">
            <article className="security-page__article">
              <div className="home-landing-container">
                <nav className="security-page__crumb" aria-label={copy.crumbAria}>
                  <Link href={copy.breadcrumbs.homeHref} className="security-page__crumb-link">
                    {copy.breadcrumbs.homeLabel}
                  </Link>
                  <span className="security-page__crumb-sep" aria-hidden="true">
                    /
                  </span>
                  <span className="security-page__crumb-current">{copy.breadcrumbs.currentLabel}</span>
                </nav>

                <header className="security-page__masthead">
                  <h1 className="security-page__title">{copy.hero.title}</h1>
                  <p className="security-page__support">{copy.hero.support}</p>
                </header>

                <div className="security-page__care">
                  {copy.care.items.map((item) => (
                    <section key={item.title} className="security-page__care-item">
                      <h2 className="security-page__care-title">{item.title}</h2>
                      <p className="security-page__care-body">{item.body}</p>
                    </section>
                  ))}
                </div>

                <section className="security-page__not" aria-labelledby="security-not-title">
                  <h2 id="security-not-title" className="security-page__not-title">
                    {copy.notThis.title}
                  </h2>
                  <p className="security-page__not-intro">{copy.notThis.intro}</p>
                  <ul className="security-page__not-list">
                    {copy.notThis.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <div className="security-page__closing">
                  <p className="security-page__disclaimer">{copy.closing.disclaimer}</p>
                  <section
                    className="security-page__contact"
                    aria-labelledby="security-contact-title"
                  >
                    <h2 id="security-contact-title" className="security-page__contact-title">
                      {copy.closing.contactTitle}
                    </h2>
                    <p className="security-page__contact-lead">
                      {copy.closing.contactLead}{' '}
                      <a href={`mailto:${copy.closing.contactEmail}`}>{copy.closing.contactEmail}</a>
                    </p>
                    <p className="security-page__contact-report">{copy.closing.report}</p>
                  </section>
                </div>
              </div>
            </article>
          </div>
        </main>
        <HomeMinimalFooter locale={locale} switchPath="/seguridad" />
      </div>
      <CookieConsent compact bannerDelayMs={3000} showAfterScrollPx={120} />
    </LocaleProvider>
  );
}
