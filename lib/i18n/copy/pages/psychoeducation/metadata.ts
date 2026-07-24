import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { buildLocalizedPageMetadata } from '@/lib/i18n/metadata';
import { getPsychoeducationGuide, type PsychoeducationSlug } from './index';

export function psychoeducationGuideMetadata(
  locale: Locale,
  slug: PsychoeducationSlug
): Metadata {
  const guide = getPsychoeducationGuide(locale, slug);
  if (!guide) {
    return {};
  }

  const path = `/recursos/${slug}`;
  const ogImages = guide.figure
    ? [
        {
          url: guide.figure.src,
          width: guide.figure.width,
          height: guide.figure.height,
          alt: guide.figure.alt,
        },
      ]
    : undefined;

  return buildLocalizedPageMetadata(locale, path, {
    title: guide.meta.title,
    description: guide.meta.description,
    ...(guide.meta.keywords ? { keywords: guide.meta.keywords } : {}),
    openGraph: {
      title: guide.meta.openGraphTitle,
      description: guide.meta.openGraphDescription,
      type: 'article',
      ...(ogImages ? { images: ogImages } : {}),
    },
  });
}
