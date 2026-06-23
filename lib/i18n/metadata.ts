import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n/config';
import { SITE_ORIGIN } from '@/lib/seo/site';

export function siteUrl(locale: Locale, path: string): string {
  return `${SITE_ORIGIN}${localePath(locale, path)}`;
}

type LocalizedMetaInput = {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
  };
};

export function buildLocalizedPageMetadata(
  locale: Locale,
  path: string,
  meta: LocalizedMetaInput
): Metadata {
  const canonical = siteUrl(locale, path);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: {
        es: siteUrl('es', path),
        en: siteUrl('en', path),
        'x-default': siteUrl('es', path),
      },
    },
    openGraph: {
      title: meta.openGraph.title,
      description: meta.openGraph.description,
      url: canonical,
      type: 'website',
      siteName: 'Anto',
      ...(locale === 'en' ? { locale: 'en_US' as const } : { locale: 'es_CL' as const }),
    },
  };
}
