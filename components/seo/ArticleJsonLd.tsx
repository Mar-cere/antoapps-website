import type { Locale } from '@/lib/i18n/config';
import { siteUrl } from '@/lib/i18n/metadata';
import { SITE_ORIGIN } from '@/lib/seo/site';
import type { PsychoeducationGuide } from '@/lib/i18n/copy/pages/psychoeducation';
import {
  getGuideBreadcrumbJsonLd,
  RESOURCES_COLLECTION_DATE_MODIFIED,
  RESOURCES_COLLECTION_DATE_PUBLISHED,
} from '@/lib/i18n/copy/seo/resources-json-ld';

type ArticleJsonLdProps = {
  locale: Locale;
  path: string;
  guide: PsychoeducationGuide;
};

export function getArticleJsonLd(locale: Locale, path: string, guide: PsychoeducationGuide) {
  const url = siteUrl(locale, path);
  const hubUrl = siteUrl(locale, '/recursos');
  const isEn = locale === 'en';
  const bodyText = guide.sections
    .flatMap((section) => [
      ...(section.paragraphs ?? []),
      ...(section.bullets ?? []),
      ...(section.bands ?? []).flatMap((group) => [
        group.label,
        ...group.items.map((item) => `${item.range} ${item.label}`),
        ...(group.note ? [group.note] : []),
      ]),
    ])
    .join(' ');

  const topicNames = guide.sections.map((section) => section.heading);
  const keywordSet = [
    ...(guide.meta.keywords?.split(',').map((k) => k.trim()).filter(Boolean) ?? []),
    ...topicNames,
    guide.hero.title,
  ];
  const keywords = [...new Set(keywordSet)].join(', ');

  const imageUrl = guide.figure
    ? guide.figure.src.startsWith('http')
      ? guide.figure.src
      : `${SITE_ORIGIN}${guide.figure.src}`
    : undefined;

  const about = [
    {
      '@type': 'Thing',
      name: isEn
        ? 'Mental health psychoeducation'
        : 'Psicoeducación en salud mental',
    },
    ...topicNames.slice(0, 6).map((name) => ({
      '@type': 'Thing',
      name,
    })),
  ];

  const article: Record<string, unknown> = {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: guide.hero.title,
    alternativeHeadline: guide.meta.openGraphTitle,
    description: guide.meta.description,
    inLanguage: isEn ? 'en' : 'es',
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    datePublished: RESOURCES_COLLECTION_DATE_PUBLISHED,
    dateModified: RESOURCES_COLLECTION_DATE_MODIFIED,
    timeRequired: `PT${guide.readingMinutes}M`,
    articleSection: guide.layout === 'dossier'
      ? isEn
        ? 'Clinical map'
        : 'Mapa clínico'
      : isEn
        ? 'Brief guide'
        : 'Guía breve',
    isPartOf: {
      '@type': 'CollectionPage',
      '@id': `${hubUrl}#collection`,
      name: isEn ? 'Anto resources' : 'Recursos Anto',
      url: hubUrl,
    },
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
    articleBody: bodyText,
    about,
    keywords,
    isAccessibleForFree: true,
    educationalUse: isEn ? 'Psychoeducation' : 'Psicoeducación',
  };

  if (imageUrl && guide.figure) {
    article.image = [
      {
        '@type': 'ImageObject',
        url: imageUrl,
        width: guide.figure.width,
        height: guide.figure.height,
        caption: guide.figure.caption ?? guide.figure.alt,
      },
    ];
    article.thumbnailUrl = imageUrl;
  }

  const speakableSelectors = ['.psycho-guide__title', '.psycho-guide__subtitle'];
  if (guide.pullQuote) {
    speakableSelectors.push('.psycho-guide__pullquote');
  }
  if (guide.figure?.caption) {
    speakableSelectors.push('.psycho-guide__figure-caption');
  }
  article.speakable = {
    '@type': 'SpeakableSpecification',
    cssSelector: speakableSelectors,
  };

  const companionHref =
    guide.hero.companionLink?.href ??
    guide.furtherReading?.links.find(
      (link) => !link.external && link.href.startsWith('/recursos/')
    )?.href;
  if (companionHref) {
    const companionUrl = companionHref.startsWith('http')
      ? companionHref
      : siteUrl(locale, companionHref);
    article.relatedLink = companionUrl;
    article.significantLink = companionUrl;
  }

  if (guide.references?.items.length) {
    article.citation = guide.references.items.map((ref) => ({
      '@type': 'ScholarlyArticle',
      name: ref.apa,
      url: ref.href,
      ...(ref.note ? { description: ref.note } : {}),
    }));
  }

  const graph: Record<string, unknown>[] = [
    article,
    getGuideBreadcrumbJsonLd(locale, path, guide.hero.title),
  ];

  if (guide.howTo) {
    const howTo: Record<string, unknown> = {
      '@type': 'HowTo',
      '@id': `${url}#howto`,
      name: guide.howTo.name,
      description: guide.howTo.description,
      inLanguage: isEn ? 'en' : 'es',
      ...(guide.howTo.totalTime ? { totalTime: guide.howTo.totalTime } : {}),
      step: guide.howTo.steps.map((text, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: text,
        text,
      })),
    };
    if (imageUrl) {
      howTo.image = imageUrl;
    }
    graph.push(howTo);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export default function ArticleJsonLd({ locale, path, guide }: ArticleJsonLdProps) {
  const block = getArticleJsonLd(locale, path, guide);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
    />
  );
}
