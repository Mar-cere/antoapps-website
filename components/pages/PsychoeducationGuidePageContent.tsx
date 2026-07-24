'use client';

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
  },
};

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

                <div className="psycho-guide__body">
                  {guide.sections.map((section) => (
                    <section key={section.heading} className="psycho-guide__section reveal-on-scroll">
                      <h2>{section.heading}</h2>
                      {section.paragraphs?.map((paragraph) => (
                        <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                      ))}
                      {section.bullets && (
                        <ul>
                          {section.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))}
                </div>

                <aside className="psycho-guide__disclaimer reveal-on-scroll" role="note">
                  <strong>{ui.disclaimerLabel}</strong>
                  <span>{guide.disclaimer}</span>
                </aside>

                <div className="psycho-guide__cta reveal-on-scroll">
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
