import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { buildLocalizedPageMetadata } from '@/lib/i18n/metadata';
import { getAboutPageCopy } from '@/lib/i18n/copy/pages/about';

const CANONICAL_PATH = '/sobre-nosotros';

export function aboutPageMetadata(locale: Locale): Metadata {
  const { meta, h1, figure } = getAboutPageCopy(locale);

  return buildLocalizedPageMetadata(locale, CANONICAL_PATH, {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: h1,
      description: meta.description,
      images: [
        {
          url: figure.src,
          width: figure.width,
          height: figure.height,
          alt: figure.alt,
        },
      ],
    },
  });
}
