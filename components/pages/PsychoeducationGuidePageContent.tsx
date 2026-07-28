'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, type CSSProperties } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';
import type { PsychoeducationGuide } from '@/lib/i18n/copy/pages/psychoeducation';
import {
  getPsychoeducationGuide,
  psychoeducationGuidePath,
} from '@/lib/i18n/copy/pages/psychoeducation';
import { LocaleProvider } from '@/lib/i18n/context';
import HomeMinimalNav from '@/components/layout/HomeMinimalNav';
import HomeMinimalFooter from '@/components/layout/HomeMinimalFooter';
import HomeV2ChatVignette from '@/components/sections/HomeV2ChatVignette';
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
  mapIndexLabel: string;
  mapIndexAria: string;
  mapIndexToggle: string;
  refsExpandHint: string;
  refsCollapseHint: string;
  guideKindDefault: string;
  guideKindDossier: string;
  guideKindBrief: string;
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
    mapIndexLabel: 'Mapa',
    mapIndexAria: 'Índice del mapa',
    mapIndexToggle: 'Ver mapa',
    refsExpandHint: 'Mostrar',
    refsCollapseHint: 'Ocultar',
    guideKindDefault: 'Guía',
    guideKindDossier: 'Mapa',
    guideKindBrief: 'Guía breve',
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
    mapIndexLabel: 'Map',
    mapIndexAria: 'Map index',
    mapIndexToggle: 'Show map',
    refsExpandHint: 'Show',
    refsCollapseHint: 'Hide',
    guideKindDefault: 'Guide',
    guideKindDossier: 'Map',
    guideKindBrief: 'Brief guide',
  },
};

function resolveGuideHref(locale: Locale, href: string, external?: boolean): string {
  if (external || href.startsWith('http://') || href.startsWith('https://')) {
    return href;
  }
  return localePath(locale, href);
}

function sectionAnchorId(heading: string, index: number): string {
  const slug = heading
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
  return `mapa-${index + 1}-${slug || 'seccion'}`;
}

function findSectionAnchor(
  sections: PsychoeducationGuide['sections'],
  sectionHeading: string
): string | null {
  const index = sections.findIndex((section) => section.heading === sectionHeading);
  if (index < 0) return null;
  return sectionAnchorId(sections[index].heading, index);
}

export default function PsychoeducationGuidePageContent({
  locale,
  slug,
  guide,
}: PsychoeducationGuidePageContentProps) {
  const ui = uiCopy[locale];
  const articlePath = `/recursos/${slug}`;
  const resourcesHref = localePath(locale, ui.resourcesHref);
  const homeHref = localePath(locale, '/');
  const hasCrisisEmphasis = guide.sections.some((section) => section.emphasis === 'crisis');
  const scanAnchor = guide.hero.scanLink
    ? findSectionAnchor(guide.sections, guide.hero.scanLink.sectionHeading)
    : null;
  const companionInHero =
    Boolean(guide.hero.companionLink) &&
    (guide.hero.companionLink?.placement ?? 'hero') === 'hero';
  const companionAfterFigure =
    Boolean(guide.hero.companionLink) &&
    guide.hero.companionLink?.placement === 'afterFigure';
  const guideKind =
    guide.layout === 'dossier'
      ? ui.guideKindDossier
      : guide.layout === 'brief'
        ? ui.guideKindBrief
        : ui.guideKindDefault;
  const collapseReferences = guide.layout === 'brief' || guide.layout === 'dossier';
  const sectionIds = guide.sections.map((section, index) =>
    sectionAnchorId(section.heading, index)
  );

  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [tocOpen, setTocOpen] = useState(true);

  useEffect(() => {
    if (guide.layout !== 'dossier' || sectionIds.length === 0) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSectionId(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [guide.layout, sectionIds.join('|')]);

  useEffect(() => {
    if (guide.layout !== 'dossier') return;
    const mq = window.matchMedia('(min-width: 960px)');
    const sync = () => setTocOpen(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [guide.layout]);

  const companionBlock = guide.hero.companionLink ? (
    <p className="psycho-guide__companion reveal-on-scroll">
      {guide.hero.companionLink.support ? (
        <span className="psycho-guide__companion-support">
          {guide.hero.companionLink.support}{' '}
        </span>
      ) : null}
      <Link
        href={resolveGuideHref(locale, guide.hero.companionLink.href)}
        className="psycho-guide__companion-link"
      >
        {guide.hero.companionLink.label}
      </Link>
    </p>
  ) : null;

  const referencesList = guide.references ? (
    <ol className="psycho-guide__refs-list">
      {guide.references.items.map((ref) => (
        <li key={ref.href} className="psycho-guide__refs-item">
          <p className="psycho-guide__refs-apa">
            <a
              href={ref.href}
              className="psycho-guide__refs-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {ref.apa}
            </a>
            <span className="visually-hidden">{ui.externalLinkHint}</span>
          </p>
          {ref.note ? <p className="psycho-guide__refs-note">{ref.note}</p> : null}
        </li>
      ))}
    </ol>
  ) : null;

  return (
    <LocaleProvider locale={locale}>
      <div className="home-v2-shell psycho-guide-shell">
        <ClientInitializer />
        <ArticleJsonLd locale={locale} path={articlePath} guide={guide} />
        <HomeMinimalNav
          locale={locale}
          ctaHref={localePath(locale, '/bienvenida')}
          ctaLabel={locale === 'en' ? 'Support' : 'Apoyo'}
          ctaAria={
            locale === 'en'
              ? 'Continue to Anto support'
              : 'Continuar al apoyo en Anto'
          }
        />
        <main
          id="main-content"
          className={`home-landing-page home-landing-page--v2 psycho-guide${
            guide.layout === 'dossier'
              ? ' psycho-guide--dossier'
              : guide.layout === 'brief'
                ? ' psycho-guide--brief'
                : ''
          }`}
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

                <div className="psycho-guide__masthead">
                  <header className="psycho-guide__header reveal-on-scroll">
                    <p className="psycho-guide__eyebrow">
                      Anto · {guideKind} · {ui.readingTime(guide.readingMinutes)}
                    </p>
                    <h1 className="psycho-guide__title">{guide.hero.title}</h1>
                    <p className="psycho-guide__subtitle">{guide.hero.subtitle}</p>
                    {guide.hero.scanLink && scanAnchor ? (
                      <p className="psycho-guide__scan reveal-on-scroll">
                        <a href={`#${scanAnchor}`} className="psycho-guide__scan-link">
                          {guide.hero.scanLink.label}
                        </a>
                      </p>
                    ) : null}
                    {companionInHero ? companionBlock : null}
                  </header>

                  {guide.pullQuote ? (
                    <blockquote className="psycho-guide__pullquote reveal-on-scroll">
                      <p>{guide.pullQuote}</p>
                    </blockquote>
                  ) : null}
                </div>

                {guide.figure ? (
                  <figure
                    className="psycho-guide__figure reveal-on-scroll"
                    style={
                      {
                        ...(guide.figure.objectPosition
                          ? { '--psycho-figure-position': guide.figure.objectPosition }
                          : null),
                        ...(guide.figure.desktopAspectRatio
                          ? { '--psycho-figure-desktop-aspect': guide.figure.desktopAspectRatio }
                          : null),
                      } as CSSProperties
                    }
                  >
                    <div className="psycho-guide__figure-frame">
                      <Image
                        src={guide.figure.src}
                        alt={guide.figure.alt}
                        width={guide.figure.width}
                        height={guide.figure.height}
                        className="psycho-guide__figure-img"
                        sizes="(max-width: 720px) 100vw, (max-width: 1100px) 92vw, min(76rem, 100vw)"
                        priority
                      />
                      {guide.figure.caption ? (
                        <figcaption className="psycho-guide__figure-caption">
                          {guide.figure.caption}
                        </figcaption>
                      ) : null}
                    </div>
                  </figure>
                ) : null}

                {companionAfterFigure ? (
                  <div className="psycho-guide__companion-slot">{companionBlock}</div>
                ) : null}

                <div
                  className={
                    guide.layout === 'dossier'
                      ? 'psycho-guide__dossier'
                      : 'psycho-guide__dossier psycho-guide__dossier--passthrough'
                  }
                >
                  {guide.layout === 'dossier' ? (
                    <nav className="psycho-guide__index reveal-on-scroll" aria-label={ui.mapIndexAria}>
                      <details
                        className="psycho-guide__index-panel"
                        open={tocOpen}
                        onToggle={(event) => {
                          setTocOpen((event.target as HTMLDetailsElement).open);
                        }}
                      >
                        <summary className="psycho-guide__index-summary">
                          <span className="psycho-guide__index-label">{ui.mapIndexLabel}</span>
                          <span className="psycho-guide__index-toggle">{ui.mapIndexToggle}</span>
                        </summary>
                        <ol className="psycho-guide__index-list">
                          {guide.sections.map((section, index) => {
                            const id = sectionAnchorId(section.heading, index);
                            const isActive = activeSectionId === id;
                            return (
                              <li key={section.heading} className="psycho-guide__index-item">
                                <a
                                  href={`#${id}`}
                                  className={`psycho-guide__index-link${
                                    isActive ? ' is-active' : ''
                                  }`}
                                  aria-current={isActive ? 'location' : undefined}
                                >
                                  <span className="psycho-guide__index-num" aria-hidden="true">
                                    {String(index + 1).padStart(2, '0')}
                                  </span>
                                  <span className="psycho-guide__index-text">{section.heading}</span>
                                </a>
                              </li>
                            );
                          })}
                        </ol>
                      </details>
                    </nav>
                  ) : null}

                  <div className="psycho-guide__stream">
                    <div className="psycho-guide__body">
                      {guide.sections.map((section, index) => {
                        const ListTag = section.ordered ? 'ol' : 'ul';
                        const showProduct =
                          guide.productMoment?.afterHeading === section.heading
                            ? guide.productMoment
                            : null;
                        const anchorId = sectionAnchorId(section.heading, index);

                        return (
                          <div key={section.heading} className="psycho-guide__section-stack">
                            <section
                              id={anchorId}
                              className={`psycho-guide__section${
                                section.ordered ? ' psycho-guide__section--steps' : ''
                              }${
                                section.emphasis === 'crisis'
                                  ? ' psycho-guide__section--crisis'
                                  : ''
                              } reveal-on-scroll`}
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
                              {section.link ? (
                                <p className="psycho-guide__section-action">
                                  {section.link.external ||
                                  section.link.href.startsWith('http://') ||
                                  section.link.href.startsWith('https://') ? (
                                    <a
                                      href={section.link.href}
                                      className="psycho-guide__section-link"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {section.link.label}
                                      <span className="visually-hidden">
                                        {' '}
                                        {ui.externalLinkHint}
                                      </span>
                                    </a>
                                  ) : (
                                    <Link
                                      href={resolveGuideHref(locale, section.link.href)}
                                      className="psycho-guide__section-link"
                                    >
                                      {section.link.label}
                                    </Link>
                                  )}
                                </p>
                              ) : null}
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
                                <div className="psycho-guide__product-stage">
                                  <HomeV2ChatVignette
                                    thread={showProduct.chat}
                                    locale={locale}
                                    size="moment"
                                    className="psycho-guide__product-chat"
                                  />
                                  <div className="psycho-guide__product-suggestions">
                                    <p className="psycho-guide__product-suggestions-label">
                                      {showProduct.suggestionsLabel}
                                    </p>
                                    <ul
                                      className="psycho-guide__product-suggestions-list"
                                      aria-label={
                                        locale === 'en'
                                          ? 'Example phrases shown in the app'
                                          : 'Ejemplos de frases en la app'
                                      }
                                    >
                                      {showProduct.suggestions.map((suggestion) => (
                                        <li key={suggestion}>
                                          <span className="psycho-guide__product-chip">
                                            {suggestion}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </aside>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>

                    <div className="psycho-guide__closing">
                      {guide.furtherReading ? (
                        <aside
                          className="psycho-guide__further reveal-on-scroll"
                          aria-labelledby="psycho-guide-further-title"
                        >
                          <h2 id="psycho-guide-further-title" className="psycho-guide__further-title">
                            {guide.furtherReading.title}
                          </h2>
                          <p className="psycho-guide__further-support">
                            {guide.furtherReading.support}
                          </p>
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
                                      <span
                                        className="psycho-guide__further-link-meta"
                                        aria-hidden="true"
                                      >
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
                                      <span
                                        className="psycho-guide__further-link-meta"
                                        aria-hidden="true"
                                      >
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

                      {/* Default: refs abiertas en el cierre. Brief/dossier: APA tras CTA en details (confianza sin muro). */}
                      {guide.references && !collapseReferences ? (
                        <aside
                          className="psycho-guide__refs reveal-on-scroll"
                          aria-labelledby="psycho-guide-refs-title"
                        >
                          <h2 id="psycho-guide-refs-title" className="psycho-guide__refs-title">
                            {guide.references.title}
                          </h2>
                          <p className="psycho-guide__refs-support">{guide.references.support}</p>
                          {referencesList}
                        </aside>
                      ) : null}
                    </div>

                    <div className="psycho-guide__outro">
                      <aside className="psycho-guide__disclaimer reveal-on-scroll" role="note">
                        <strong>{ui.disclaimerLabel}</strong>
                        <span>{guide.disclaimer}</span>
                      </aside>

                      <div className="psycho-guide__cta reveal-on-scroll">
                        {guide.ctaBridge ? (
                          <p className="psycho-guide__cta-bridge">{guide.ctaBridge}</p>
                        ) : null}
                        <Link
                          href={localePath(locale, guide.cta.path)}
                          className="psycho-guide__cta-link"
                        >
                          {guide.cta.label}
                        </Link>
                      </div>
                    </div>

                    {guide.references && collapseReferences ? (
                      <aside
                        className="psycho-guide__refs psycho-guide__refs--after-cta reveal-on-scroll"
                        aria-labelledby="psycho-guide-refs-title"
                      >
                        <details className="psycho-guide__refs-details">
                          <summary>
                            <span className="psycho-guide__refs-summary-row">
                              <h2
                                id="psycho-guide-refs-title"
                                className="psycho-guide__refs-title"
                              >
                                {guide.references.title}
                              </h2>
                              <span className="psycho-guide__refs-summary-hint" aria-hidden="true">
                                <span className="psycho-guide__refs-summary-hint--closed">
                                  {ui.refsExpandHint}
                                </span>
                                <span className="psycho-guide__refs-summary-hint--open">
                                  {ui.refsCollapseHint}
                                </span>
                              </span>
                            </span>
                            <span className="psycho-guide__refs-support">
                              {guide.references.support}
                            </span>
                          </summary>
                          {referencesList}
                        </details>
                      </aside>
                    ) : null}

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
                </div>
              </div>
            </article>
          </div>
        </main>
        <HomeMinimalFooter locale={locale} switchPath={articlePath} />
        <CookieConsent
          compact
          bannerDelayMs={hasCrisisEmphasis ? 14000 : 6000}
          showAfterScrollPx={hasCrisisEmphasis ? 900 : 320}
        />
      </div>
    </LocaleProvider>
  );
}
