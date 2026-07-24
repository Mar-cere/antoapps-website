'use client';

import Image from 'next/image';
import Link from 'next/link';
import { localePath, type Locale } from '@/lib/i18n/config';
import { LocaleProvider } from '@/lib/i18n/context';
import {
  getResearchPageCopy,
  type ResearchProductMedia,
} from '@/lib/i18n/copy/pages/research';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';
import HomeMinimalNav from '@/components/layout/HomeMinimalNav';
import HomeMinimalFooter from '@/components/layout/HomeMinimalFooter';
import HomeV2ChatVignette from '@/components/sections/HomeV2ChatVignette';
import HomeV2EvidencePanel from '@/components/sections/HomeV2EvidencePanel';
import HomeV2SessionSummary from '@/components/sections/HomeV2SessionSummary';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import '@/styles/pages/home-landing-final.css';
import '@/styles/pages/home-v2.css';
import '@/styles/components/research.css';

type ResearchPageContentProps = {
  locale: Locale;
};

function ResearchProductMediaView({
  media,
  locale,
}: {
  media: ResearchProductMedia;
  locale: Locale;
}) {
  switch (media.kind) {
    case 'chat':
      return (
        <HomeV2ChatVignette
          thread={media.chat}
          locale={locale}
          size="moment"
          className="research-page__vignette"
        />
      );
    case 'evidence':
      return (
        <HomeV2EvidencePanel evidence={media.evidence} className="research-page__vignette" />
      );
    case 'summary':
      return (
        <HomeV2SessionSummary summary={media.summary} className="research-page__vignette" />
      );
  }
}

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
                  aria-labelledby="research-reading-title"
                >
                  <h2 id="research-reading-title">{copy.reading.title}</h2>
                  {copy.reading.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </section>

                <figure className="research-page__figure reveal-on-scroll">
                  <div className="research-page__figure-frame">
                    <Image
                      src={copy.figure.src}
                      alt={copy.figure.alt}
                      width={copy.figure.width}
                      height={copy.figure.height}
                      className="research-page__figure-img"
                      sizes="(max-width: 720px) 100vw, 46rem"
                      priority
                    />
                  </div>
                  <figcaption className="research-page__figure-caption">
                    {copy.figure.caption}
                  </figcaption>
                </figure>

                <section
                  className="research-page__takes reveal-on-scroll"
                  aria-labelledby="research-takes-title"
                >
                  <h2 id="research-takes-title" className="research-page__takes-title">
                    {copy.takes.title}
                  </h2>
                  <p className="research-page__section-support">{copy.takes.support}</p>
                  <ul className="research-page__takes-list">
                    {copy.takes.items.map((take) => (
                      <li key={take.title} className="research-page__take">
                        <h3 className="research-page__take-title">{take.title}</h3>
                        <p className="research-page__take-body">{take.body}</p>
                      </li>
                    ))}
                  </ul>
                </section>

                <section
                  className="research-page__product reveal-on-scroll"
                  aria-labelledby="research-product-title"
                >
                  <h2 id="research-product-title" className="research-page__product-title">
                    {copy.product.title}
                  </h2>
                  <p className="research-page__section-support">{copy.product.support}</p>
                  <ul className="research-page__product-list">
                    {copy.product.items.map((item) => (
                      <li key={item.title} className="research-page__product-item">
                        <div className="research-page__product-copy">
                          <h3 className="research-page__product-item-title">{item.title}</h3>
                          <p className="research-page__product-item-body">{item.body}</p>
                        </div>
                        <div className="research-page__product-media">
                          <ResearchProductMediaView media={item.media} locale={locale} />
                        </div>
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
                  className="research-page__trust reveal-on-scroll"
                  aria-labelledby="research-trust-title"
                >
                  <h2 id="research-trust-title" className="research-page__trust-title">
                    {copy.trust.title}
                  </h2>
                  <p className="research-page__section-support">{copy.trust.support}</p>
                  <ul className="research-page__trust-list">
                    {copy.trust.bullets.map((bullet) => (
                      <li key={bullet.slice(0, 40)}>{bullet}</li>
                    ))}
                  </ul>
                </aside>

                <aside
                  className="research-page__refs reveal-on-scroll"
                  aria-labelledby="research-refs-title"
                >
                  <h2 id="research-refs-title" className="research-page__refs-title">
                    {copy.references.title}
                  </h2>
                  <p className="research-page__section-support">{copy.references.support}</p>
                  <details className="research-page__refs-details">
                    <summary className="research-page__refs-summary">
                      {copy.references.summaryLabel}
                    </summary>
                    <ol className="research-page__refs-list">
                      {copy.references.items.map((ref) => (
                        <li key={ref.href} className="research-page__refs-item">
                          <p className="research-page__refs-label">{ref.label}</p>
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
                  </details>
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
