import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n/config';
import { SITE_ORIGIN } from '@/lib/seo/site';

export function siteUrl(locale: Locale, path: string): string {
  return `${SITE_ORIGIN}${localePath(locale, path)}`;
}

type LocalizedMetaInput = {
  title: string;
  description: string;
  keywords?: string;
  openGraph: {
    title: string;
    description: string;
    type?: 'website' | 'article';
    images?: readonly {
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }[];
  };
};

export function buildLocalizedPageMetadata(
  locale: Locale,
  path: string,
  meta: LocalizedMetaInput
): Metadata {
  const canonical = siteUrl(locale, path);
  const ogImages = meta.openGraph.images?.map((image) => ({
    url: image.url.startsWith('http') ? image.url : `${SITE_ORIGIN}${image.url}`,
    ...(image.width ? { width: image.width } : {}),
    ...(image.height ? { height: image.height } : {}),
    ...(image.alt ? { alt: image.alt } : {}),
  }));

  return {
    title: meta.title,
    description: meta.description,
    ...(meta.keywords ? { keywords: meta.keywords } : {}),
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
      type: meta.openGraph.type ?? 'website',
      siteName: 'Anto',
      ...(locale === 'en' ? { locale: 'en_US' as const } : { locale: 'es_CL' as const }),
      ...(ogImages?.length ? { images: ogImages } : {}),
    },
    ...(ogImages?.length
      ? {
          twitter: {
            card: 'summary_large_image' as const,
            title: meta.openGraph.title,
            description: meta.openGraph.description,
            images: [ogImages[0].url],
          },
        }
      : {}),
  };
}
