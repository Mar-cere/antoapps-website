'use client';

import Link from 'next/link';
import { localePath, type Locale } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import { getResearchPageCopy } from '@/lib/i18n/copy/pages/research';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';
import HomeMinimalNav from '@/components/layout/HomeMinimalNav';
import HomeMinimalFooter from '@/components/layout/HomeMinimalFooter';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import '@/styles/pages/home-landing-final.css';
import '@/styles/pages/home-v2.css';
import '@/styles/components/research.css';

type ResearchPageContentProps = {
  locale: Locale;
};

export default function ResearchPageContent({ locale }: ResearchPageContentProps) {
  const copy = getResearchPageCopy(locale);
  const nav = getHomeV2Copy(locale).nav;

  return (
    <LocaleProvider locale={locale}>
      <div className="home-v2-shell research-shell">
        <ClientInitializer />
        <HomeMinimalNav
          locale={locale}
          ctaHref={localePath(locale, '/bienvenida')}
          ctaLabel={nav.cta}
        />
        <main
          id="main-content"
          className="home-landing-page home-landing-page--v2 research-page"
          role="main"
          lang={locale}
        >
          <div className="home-landing-page__content">
            <article className="research-page__article" data-fade-section>
              <div className="home-landing-container">
                <nav className="research-page__crumb" aria-label={copy.crumbAria}>
                  <Link href={copy.breadcrumbs.homeHref} className="research-page__crumb-link">
                    {copy.breadcrumbs.homeLabel}
                  </Link>
                  <span className="research-page__crumb-sep" aria-hidden="true">
                    /
                  </span>
                  <span className="research-page__crumb-current">
                    {copy.breadcrumbs.currentLabel}
                  </span>
                </nav>

                <header className="research-page__header reveal-on-scroll">
                  <p className="research-page__eyebrow">
                    {locale === 'en' ? 'Evidence' : 'Evidencia'}
                  </p>
                  <h1 className="research-page__title">{copy.hero.title}</h1>
                  <p className="research-page__subtitle">{copy.hero.subtitle}</p>
                </header>

                <blockquote className="research-page__pullquote reveal-on-scroll">
                  <p>{copy.pullQuote}</p>
                </blockquote>

                <section
                  className="research-page__section reveal-on-scroll"
                  aria-labelledby="research-approach-title"
                >
                  <h2 id="research-approach-title">{copy.approach.title}</h2>
                  {copy.approach.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </section>

                <section
                  className="research-page__pillars reveal-on-scroll"
                  aria-labelledby="research-pillars-title"
                >
                  <h2 id="research-pillars-title" className="research-page__pillars-title">
                    {copy.approach.pillarsTitle}
                  </h2>
                  <ul className="research-page__pillars-list">
                    {copy.approach.pillars.map((pillar) => (
                      <li key={pillar.title} className="research-page__pillar">
                        <h3 className="research-page__pillar-title">{pillar.title}</h3>
                        <p className="research-page__pillar-body">{pillar.body}</p>
                      </li>
                    ))}
                  </ul>
                </section>

                <section
                  className="research-page__literature reveal-on-scroll"
                  aria-labelledby="research-literature-title"
                >
                  <h2 id="research-literature-title">{copy.literature.title}</h2>
                  <p className="research-page__section-support">{copy.literature.support}</p>
                  <ul className="research-page__literature-list">
                    {copy.literature.items.map((item) => (
                      <li key={item.href} className="research-page__literature-item">
                        <p className="research-page__literature-kind">{item.kind}</p>
                        <a
                          href={item.href}
                          className="research-page__literature-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="research-page__literature-label">{item.label}</span>
                          <span className="research-page__literature-meta" aria-hidden="true">
                            ↗
                          </span>
                          <span className="visually-hidden">{copy.externalLinkHint}</span>
                        </a>
                        <p className="research-page__literature-note">{item.note}</p>
                      </li>
                    ))}
                  </ul>
                </section>

                <section
                  className="research-page__section reveal-on-scroll"
                  aria-labelledby="research-limits-title"
                >
                  <h2 id="research-limits-title">{copy.limits.title}</h2>
                  {copy.limits.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </section>

                <aside
                  className="research-page__refs reveal-on-scroll"
                  aria-labelledby="research-refs-title"
                >
                  <h2 id="research-refs-title" className="research-page__refs-title">
                    {copy.references.title}
                  </h2>
                  <p className="research-page__section-support">{copy.references.support}</p>
                  <ol className="research-page__refs-list">
                    {copy.references.items.map((ref) => (
                      <li key={ref.href} className="research-page__refs-item">
                        <p className="research-page__refs-apa">
                          <a
                            href={ref.href}
                            className="research-page__refs-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {ref.apa}
                          </a>
                          <span className="visually-hidden">{copy.externalLinkHint}</span>
                        </p>
                      </li>
                    ))}
                  </ol>
                </aside>

                <aside className="research-page__disclaimer reveal-on-scroll" role="note">
                  <strong>{locale === 'en' ? 'Note' : 'Aviso'}</strong>
                  <span>{copy.disclaimer}</span>
                </aside>

                <div className="research-page__cta reveal-on-scroll">
                  <p className="research-page__cta-bridge">{copy.cta.bridge}</p>
                  <div className="research-page__cta-actions">
                    <Link
                      href={copy.cta.contactHref}
                      className="research-page__cta-link research-page__cta-link--primary"
                    >
                      {copy.cta.contactLabel}
                    </Link>
                    <a
                      href={copy.cta.emailHref}
                      className="research-page__cta-link research-page__cta-link--secondary"
                    >
                      {copy.cta.emailLabel}
                    </a>
                  </div>
                </div>

                <p className="research-page__back reveal-on-scroll">
                  <Link href={copy.resourcesLink.href}>{copy.resourcesLink.label}</Link>
                </p>
              </div>
            </article>
          </div>
        </main>
        <HomeMinimalFooter locale={locale} switchPath="/investigacion" />
        <CookieConsent compact bannerDelayMs={6000} showAfterScrollPx={320} />
      </div>
    </LocaleProvider>
  );
}
