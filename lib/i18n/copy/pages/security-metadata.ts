import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { buildLocalizedPageMetadata } from '@/lib/i18n/metadata';
import { getSecurityPageCopy } from '@/lib/i18n/copy/pages/security';

export function securityPageMetadata(locale: Locale): Metadata {
  const { meta, figure } = getSecurityPageCopy(locale);

  return buildLocalizedPageMetadata(locale, meta.canonicalPath, {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.openGraphTitle,
      description: meta.openGraphDescription,
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
