'use client';

import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';
import type { PsychoeducationGuide } from '@/lib/i18n/copy/pages/psychoeducation';
import {
  getPsychoeducationGuide,
  psychoeducationGuidePath,
} from '@/lib/i18n/copy/pages/psychoeducation';
import { LocaleProvider } from '@/lib/i18n/context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleJsonLd from '@/components/seo/ArticleJsonLd';
import '@/styles/components/psychoeducation-article.css';

type PsychoeducationGuidePageContentProps = {
  locale: Locale;
  slug: string;
  guide: PsychoeducationGuide;
};

type GuideUiCopy = {
  resourcesLabel: string;
  resourcesHref: string;
  readingTime: (minutes: number) => string;
  relatedTitle: string;
  disclaimerLabel: string;
  backToLibrary: string;
};

const uiCopy: Record<Locale, GuideUiCopy> = {
  es: {
    resourcesLabel: 'Recursos',
    resourcesHref: '/recursos',
    readingTime: (m) => `${m} min de lectura`,
    relatedTitle: 'Guías relacionadas',
    disclaimerLabel: 'Aviso importante',
    backToLibrary: '← Volver a la biblioteca',
  },
  en: {
    resourcesLabel: 'Resources',
    resourcesHref: '/recursos',
    readingTime: (m) => `${m} min read`,
    relatedTitle: 'Related guides',
    disclaimerLabel: 'Important notice',
    backToLibrary: '← Back to library',
  },
};

export default function PsychoeducationGuidePageContent({
  locale,
  slug,
  guide,
}: PsychoeducationGuidePageContentProps) {
  const ui = uiCopy[locale];
  const articlePath = `/recursos/${slug}`;

  return (
    <LocaleProvider locale={locale}>
      <ClientInitializer />
      <ArticleJsonLd locale={locale} path={articlePath} guide={guide} />
      <Header />
      <main lang={locale} className="psycho-guide">
        <Breadcrumbs
          items={[
            { label: locale === 'en' ? 'Home' : 'Inicio', href: localePath(locale, '/') },
            { label: ui.resourcesLabel, href: localePath(locale, ui.resourcesHref) },
            { label: guide.hero.title },
          ]}
        />

        <article className="psycho-guide__article" data-fade-section>
          <div className="container container--narrow">
            <header className="psycho-guide__header reveal-on-scroll">
              <p className="psycho-guide__eyebrow">
                {locale === 'en' ? 'Psychoeducation' : 'Psicoeducación'} ·{' '}
                {ui.readingTime(guide.readingMinutes)}
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
              <strong>{ui.disclaimerLabel}:</strong> {guide.disclaimer}
            </aside>

            <div className="psycho-guide__cta reveal-on-scroll">
              <Link href={localePath(locale, guide.cta.path)} className="btn btn-primary">
                {guide.cta.label}
              </Link>
            </div>

            {guide.relatedSlugs.length > 0 && (
              <nav className="psycho-guide__related reveal-on-scroll" aria-label={ui.relatedTitle}>
                <h2 className="psycho-guide__related-title">{ui.relatedTitle}</h2>
                <ul>
                  {guide.relatedSlugs.map((relatedSlug) => {
                    const related = getPsychoeducationGuide(locale, relatedSlug);
                    if (!related) return null;
                    return (
                      <li key={relatedSlug}>
                        <Link href={psychoeducationGuidePath(locale, relatedSlug)}>
                          {related.hero.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            )}

            <p className="psycho-guide__back reveal-on-scroll">
              <Link href={localePath(locale, ui.resourcesHref)}>{ui.backToLibrary}</Link>
            </p>
          </div>
        </article>
      </main>
      <Footer />
      <CookieConsent />
    </LocaleProvider>
  );
}
