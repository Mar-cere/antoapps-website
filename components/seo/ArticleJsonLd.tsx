import type { Locale } from '@/lib/i18n/config';
import { siteUrl } from '@/lib/i18n/metadata';
import type { PsychoeducationGuide } from '@/lib/i18n/copy/pages/psychoeducation';

type ArticleJsonLdProps = {
  locale: Locale;
  path: string;
  guide: PsychoeducationGuide;
};

export function getArticleJsonLd(locale: Locale, path: string, guide: PsychoeducationGuide) {
  const url = siteUrl(locale, path);
  const bodyText = guide.sections
    .flatMap((section) => [
      ...(section.paragraphs ?? []),
      ...(section.bullets ?? []),
    ])
    .join(' ');

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.hero.title,
    description: guide.meta.description,
    inLanguage: locale === 'en' ? 'en' : 'es',
    url,
    mainEntityOfPage: url,
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
    about: {
      '@type': 'Thing',
      name: locale === 'en' ? 'Mental health psychoeducation' : 'Psicoeducación en salud mental',
    },
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
