import type { Locale } from '@/lib/i18n/config';
import { siteUrl } from '@/lib/i18n/metadata';
import { SITE_ORIGIN } from '@/lib/seo/site';
import { getResearchPageCopy } from '@/lib/i18n/copy/pages/research';

const RESEARCH_PATH = '/investigacion';
const DATE_PUBLISHED = '2026-05-01';
const DATE_MODIFIED = '2026-07-24';

type ResearchJsonLdProps = {
  locale: Locale;
};

export function getResearchJsonLd(locale: Locale) {
  const copy = getResearchPageCopy(locale);
  const url = siteUrl(locale, RESEARCH_PATH);
  const homeUrl = siteUrl(locale, '/');
  const isEn = locale === 'en';

  const imageUrl = copy.figure.src.startsWith('http')
    ? copy.figure.src
    : `${SITE_ORIGIN}${copy.figure.src}`;

  const about = [
    {
      '@type': 'Thing',
      name: isEn
        ? 'Digital mental health evidence'
        : 'Evidencia en salud mental digital',
    },
    ...copy.takes.items.map((take) => ({
      '@type': 'Thing',
      name: take.title,
    })),
  ];

  const webPage: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: copy.hero.title,
    headline: copy.hero.title,
    description: copy.meta.description,
    inLanguage: isEn ? 'en' : 'es',
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_ORIGIN}/#website`,
      name: 'Anto',
      url: SITE_ORIGIN,
    },
    about,
    keywords: copy.meta.keywords,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: copy.figure.width,
      height: copy.figure.height,
      caption: copy.figure.caption,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: [
        '.research-page__title',
        '.research-page__subtitle',
        '.research-page__pullquote',
        '.research-page__trust-list',
      ],
    },
    citation: copy.references.items.map((ref) => ({
      '@type': 'ScholarlyArticle',
      name: ref.label,
      description: ref.apa,
      url: ref.href,
    })),
    author: {
      '@type': 'Organization',
      name: 'Anto',
      url: SITE_ORIGIN,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Anto',
      url: SITE_ORIGIN,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/assets/images/antoIcon.png`,
      },
    },
  };

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: copy.breadcrumbs.homeLabel,
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: copy.breadcrumbs.currentLabel,
        item: url,
      },
    ],
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [webPage, breadcrumb],
  };
}

export default function ResearchJsonLd({ locale }: ResearchJsonLdProps) {
  const block = getResearchJsonLd(locale);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
    />
  );
}
