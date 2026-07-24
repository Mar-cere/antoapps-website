import type { Locale } from '@/lib/i18n/config';
import { siteUrl } from '@/lib/i18n/metadata';
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
    ])
    .join(' ');

  const topicNames = guide.sections.map((section) => section.heading);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: guide.hero.title,
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
        isPartOf: {
          '@type': 'CollectionPage',
          '@id': `${hubUrl}#collection`,
          name: isEn ? 'Anto resources' : 'Recursos Anto',
          url: hubUrl,
        },
        author: {
          '@type': 'Organization',
          name: 'Anto',
          url: 'https://antoapps.com',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Anto',
          url: 'https://antoapps.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://antoapps.com/assets/images/antoIcon.png',
          },
        },
        articleBody: bodyText,
        about: [
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
        ],
        keywords: topicNames.join(', '),
      },
      getGuideBreadcrumbJsonLd(locale, path, guide.hero.title),
    ],
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
