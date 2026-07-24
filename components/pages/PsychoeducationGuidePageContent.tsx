'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';
import type { PsychoeducationGuide } from '@/lib/i18n/copy/pages/psychoeducation';
import {
  getPsychoeducationGuide,
  psychoeducationGuidePath,
} from '@/lib/i18n/copy/pages/psychoeducation';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';
import { LocaleProvider } from '@/lib/i18n/context';
import HomeMinimalNav from '@/components/layout/HomeMinimalNav';
import HomeMinimalFooter from '@/components/layout/HomeMinimalFooter';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import ArticleJsonLd from '@/components/seo/ArticleJsonLd';
import '@/styles/pages/home-landing-final.css';
import '@/styles/pages/home-v2.css';
import '@/styles/components/psychoeducation-article.css';

type PsychoeducationGuidePageContentProps = {
  locale: Locale;
  slug: string;
  guide: PsychoeducationGuide;
};

type GuideUiCopy = {
  resourcesLabel: string;
  resourcesHref: string;
  homeLabel: string;
  readingTime: (minutes: number) => string;
  relatedTitle: string;
  disclaimerLabel: string;
  backToLibrary: string;
  crumbAria: string;
  externalLinkHint: string;
};

const uiCopy: Record<Locale, GuideUiCopy> = {
  es: {
    resourcesLabel: 'Recursos',
    resourcesHref: '/recursos',
    homeLabel: 'Inicio',
    readingTime: (m) => `${m} min de lectura`,
    relatedTitle: 'Guías relacionadas',
    disclaimerLabel: 'Aviso',
    backToLibrary: 'Volver a recursos',
    crumbAria: 'Breadcrumb',
    externalLinkHint: 'Abre en una pestaña nueva',
  },
  en: {
    resourcesLabel: 'Resources',
    resourcesHref: '/recursos',
    homeLabel: 'Home',
    readingTime: (m) => `${m} min read`,
    relatedTitle: 'Related guides',
    disclaimerLabel: 'Note',
    backToLibrary: 'Back to resources',
    crumbAria: 'Breadcrumb',
    externalLinkHint: 'Opens in a new tab',
  },
};

function resolveGuideHref(locale: Locale, href: string, external?: boolean): string {
  if (external || href.startsWith('http://') || href.startsWith('https://')) {
    return href;
  }
  return localePath(locale, href);
}

export default function PsychoeducationGuidePageContent({
  locale,
  slug,
  guide,
}: PsychoeducationGuidePageContentProps) {
  const ui = uiCopy[locale];
  const nav = getHomeV2Copy(locale).nav;
  const articlePath = `/recursos/${slug}`;
  const resourcesHref = localePath(locale, ui.resourcesHref);
  const homeHref = localePath(locale, '/');

  return (
    <LocaleProvider locale={locale}>
      <div className="home-v2-shell psycho-guide-shell">
        <ClientInitializer />
        <ArticleJsonLd locale={locale} path={articlePath} guide={guide} />
        <HomeMinimalNav
          locale={locale}
          ctaHref={localePath(locale, '/bienvenida')}
          ctaLabel={nav.cta}
        />
        <main
          id="main-content"
          className="home-landing-page home-landing-page--v2 psycho-guide"
          role="main"
          lang={locale}
        >
          <div className="home-landing-page__content">
            <article className="psycho-guide__article" data-fade-section>
              <div className="home-landing-container">
                <nav className="psycho-guide__crumb" aria-label={ui.crumbAria}>
                  <Link href={homeHref} className="psycho-guide__crumb-link">
                    {ui.homeLabel}
                  </Link>
                  <span className="psycho-guide__crumb-sep" aria-hidden="true">
                    /
                  </span>
                  <Link href={resourcesHref} className="psycho-guide__crumb-link">
                    {ui.resourcesLabel}
                  </Link>
                  <span className="psycho-guide__crumb-sep" aria-hidden="true">
                    /
                  </span>
                  <span className="psycho-guide__crumb-current">{guide.hero.title}</span>
                </nav>

                <header className="psycho-guide__header reveal-on-scroll">
                  <p className="psycho-guide__eyebrow">
                    {locale === 'en' ? 'Guide' : 'Guía'} · {ui.readingTime(guide.readingMinutes)}
                  </p>
                  <h1 className="psycho-guide__title">{guide.hero.title}</h1>
                  <p className="psycho-guide__subtitle">{guide.hero.subtitle}</p>
                </header>

                {guide.figure ? (
                  <figure className="psycho-guide__figure reveal-on-scroll">
                    <div className="psycho-guide__figure-frame">
                      <Image
                        src={guide.figure.src}
                        alt={guide.figure.alt}
                        width={guide.figure.width}
                        height={guide.figure.height}
                        className="psycho-guide__figure-img"
                        sizes="(max-width: 720px) 100vw, 46rem"
                        priority
                      />
                    </div>
                    {guide.figure.caption ? (
                      <figcaption className="psycho-guide__figure-caption">
                        {guide.figure.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                ) : null}

                {guide.pullQuote ? (
                  <blockquote className="psycho-guide__pullquote reveal-on-scroll">
                    <p>{guide.pullQuote}</p>
                  </blockquote>
                ) : null}

                <div className="psycho-guide__body">
                  {guide.sections.map((section) => {
                    const ListTag = section.ordered ? 'ol' : 'ul';
                    const showProduct =
                      guide.productMoment?.afterHeading === section.heading
                        ? guide.productMoment
                        : null;

                    return (
                      <div key={section.heading} className="psycho-guide__section-stack">
                        <section
                          className={`psycho-guide__section${section.ordered ? ' psycho-guide__section--steps' : ''} reveal-on-scroll`}
                        >
                          <h2>{section.heading}</h2>
                          {section.paragraphs?.map((paragraph) => (
                            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                          ))}
                          {section.bullets && (
                            <ListTag>
                              {section.bullets.map((bullet) => (
                                <li key={bullet}>{bullet}</li>
                              ))}
                            </ListTag>
                          )}
                        </section>

                        {showProduct ? (
                          <aside
                            className="psycho-guide__product reveal-on-scroll"
                            aria-labelledby="psycho-guide-product-title"
                          >
                            <div className="psycho-guide__product-copy">
                              <h2
                                id="psycho-guide-product-title"
                                className="psycho-guide__product-title"
                              >
                                {showProduct.title}
                              </h2>
                              <p className="psycho-guide__product-body">{showProduct.body}</p>
                            </div>
                            <figure className="psycho-guide__product-figure">
                              <div className="psycho-guide__product-frame">
                                <Image
                                  src={showProduct.figure.src}
                                  alt={showProduct.figure.alt}
                                  width={showProduct.figure.width}
                                  height={showProduct.figure.height}
                                  className="psycho-guide__product-img"
                                  sizes="(max-width: 720px) 220px, 260px"
                                />
                              </div>
                            </figure>
                          </aside>
                        ) : null}
                      </div>
                    );
                  })}
                </div>

                {guide.furtherReading ? (
                  <aside
                    className="psycho-guide__further reveal-on-scroll"
                    aria-labelledby="psycho-guide-further-title"
                  >
                    <h2 id="psycho-guide-further-title" className="psycho-guide__further-title">
                      {guide.furtherReading.title}
                    </h2>
                    <p className="psycho-guide__further-support">{guide.furtherReading.support}</p>
                    <ul className="psycho-guide__further-list">
                      {guide.furtherReading.links.map((link) => {
                        const href = resolveGuideHref(locale, link.href, link.external);
                        const isExternal =
                          Boolean(link.external) ||
                          link.href.startsWith('http://') ||
                          link.href.startsWith('https://');
                        const className = 'psycho-guide__further-link';

                        return (
                          <li key={link.href}>
                            {isExternal ? (
                              <a
                                href={href}
                                className={className}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <span className="psycho-guide__further-link-text">
                                  <span className="psycho-guide__further-link-label">
                                    {link.label}
                                  </span>
                                  <span className="psycho-guide__further-link-desc">
                                    {link.description}
                                  </span>
                                </span>
                                <span className="psycho-guide__further-link-meta" aria-hidden="true">
                                  ↗
                                </span>
                                <span className="visually-hidden">{ui.externalLinkHint}</span>
                              </a>
                            ) : (
                              <Link href={href} className={className}>
                                <span className="psycho-guide__further-link-text">
                                  <span className="psycho-guide__further-link-label">
                                    {link.label}
                                  </span>
                                  <span className="psycho-guide__further-link-desc">
                                    {link.description}
                                  </span>
                                </span>
                                <span className="psycho-guide__further-link-meta" aria-hidden="true">
                                  →
                                </span>
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </aside>
                ) : null}

                <aside className="psycho-guide__disclaimer reveal-on-scroll" role="note">
                  <strong>{ui.disclaimerLabel}</strong>
                  <span>{guide.disclaimer}</span>
                </aside>

                <div className="psycho-guide__cta reveal-on-scroll">
                  {guide.ctaBridge ? (
                    <p className="psycho-guide__cta-bridge">{guide.ctaBridge}</p>
                  ) : null}
                  <Link href={localePath(locale, guide.cta.path)} className="psycho-guide__cta-link">
                    {guide.cta.label}
                  </Link>
                </div>

                {guide.relatedSlugs.length > 0 && (
                  <nav
                    className="psycho-guide__related reveal-on-scroll"
                    aria-label={ui.relatedTitle}
                  >
                    <h2 className="psycho-guide__related-title">{ui.relatedTitle}</h2>
                    <ul className="psycho-guide__related-list">
                      {guide.relatedSlugs.map((relatedSlug) => {
                        const related = getPsychoeducationGuide(locale, relatedSlug);
                        if (!related) return null;
                        return (
                          <li key={relatedSlug}>
                            <Link
                              href={psychoeducationGuidePath(locale, relatedSlug)}
                              className="psycho-guide__related-link"
                            >
                              <span>{related.hero.title}</span>
                              <span aria-hidden="true">→</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                )}

                <p className="psycho-guide__back reveal-on-scroll">
                  <Link href={resourcesHref}>{ui.backToLibrary}</Link>
                </p>
              </div>
            </article>
          </div>
        </main>
        <HomeMinimalFooter locale={locale} switchPath={articlePath} />
        <CookieConsent compact bannerDelayMs={6000} showAfterScrollPx={320} />
      </div>
    </LocaleProvider>
  );
}
