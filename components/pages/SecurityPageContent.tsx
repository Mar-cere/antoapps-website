'use client';

import Image from 'next/image';
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
            <article className="security-page__article" data-fade-section>
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

                <div className="security-page__masthead">
                  <header className="security-page__header">
                    <h1 className="security-page__title">{copy.hero.title}</h1>
                  </header>
                  <blockquote className="security-page__pullquote">
                    <p>{copy.pullQuote}</p>
                  </blockquote>
                </div>

                <section
                  className="security-page__section security-page__reading"
                  aria-labelledby="security-reading-title"
                >
                  <h2 id="security-reading-title">{copy.reading.title}</h2>
                  {copy.reading.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </section>

                <figure className="security-page__figure">
                  <div className="security-page__figure-frame">
                    <Image
                      src={copy.figure.src}
                      alt={copy.figure.alt}
                      width={copy.figure.width}
                      height={copy.figure.height}
                      className="security-page__figure-img"
                      sizes="(max-width: 720px) 100vw, (max-width: 1100px) 90vw, 76rem"
                      priority
                    />
                  </div>
                  <figcaption className="security-page__figure-caption">
                    {copy.figure.caption}
                  </figcaption>
                </figure>

                <section className="security-page__takes" aria-labelledby="security-takes-title">
                  <h2 id="security-takes-title" className="security-page__takes-title">
                    {copy.takes.title}
                  </h2>
                  <ul className="security-page__takes-list">
                    {copy.takes.items.map((take) => (
                      <li key={take.title} className="security-page__take">
                        <h3 className="security-page__take-title">{take.title}</h3>
                        <p className="security-page__take-body">{take.body}</p>
                      </li>
                    ))}
                  </ul>
                </section>

                <div className="security-page__closing">
                  <section
                    className="security-page__section security-page__limits"
                    aria-labelledby="security-limits-title"
                  >
                    <h2 id="security-limits-title">{copy.limits.title}</h2>
                    <p>{copy.limits.body}</p>
                  </section>
                  <section
                    className="security-page__contact"
                    aria-labelledby="security-contact-title"
                  >
                    <h2 id="security-contact-title" className="security-page__contact-title">
                      {copy.contact.title}
                    </h2>
                    <p className="security-page__contact-line">
                      {copy.contact.securityLead}{' '}
                      <a href={`mailto:${copy.contact.securityEmail}`}>{copy.contact.securityEmail}</a>
                      {'.'}
                    </p>
                    <p className="security-page__contact-line">
                      {copy.contact.dataLead}{' '}
                      <a href={`mailto:${copy.contact.dataEmail}`}>{copy.contact.dataEmail}</a>
                      {'.'}
                    </p>
                    <p className="security-page__contact-line">
                      {copy.contact.privacyPrefix}{' '}
                      <Link href={copy.contact.privacyHref}>{copy.contact.privacyLabel}</Link>{'.'}
                    </p>
                  </section>
                </div>
              </div>
            </article>
          </div>
        </main>
        <HomeMinimalFooter locale={locale} switchPath="/seguridad" />
      </div>
      <CookieConsent compact bannerDelayMs={6000} showAfterScrollPx={120} />
    </LocaleProvider>
  );
}
