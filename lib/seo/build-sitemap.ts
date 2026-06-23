import type { MetadataRoute } from 'next';
import { localePath, type Locale } from '@/lib/i18n/config';
import { INDEXABLE_ROUTES } from '@/lib/seo/indexable-routes';
import { SITE_ORIGIN } from '@/lib/seo/site';

function absoluteUrl(locale: Locale, logicalPath: string): string {
  return `${SITE_ORIGIN}${localePath(locale, logicalPath)}`;
}

function buildLanguageAlternates(logicalPath: string): Record<string, string> {
  const esUrl = absoluteUrl('es', logicalPath);
  const enUrl = absoluteUrl('en', logicalPath);
  return {
    es: esUrl,
    en: enUrl,
    'x-default': esUrl,
  };
}

/**
 * Genera entradas del sitemap con hreflang (alternates.languages) para cada
 * par ES/EN. Cada URL aparece una vez con referencias cruzadas al otro idioma.
 */
export function buildSitemapEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of INDEXABLE_ROUTES) {
    const languages = buildLanguageAlternates(route.path);
    const lastModified = new Date(route.lastModified);

    entries.push({
      url: absoluteUrl('es', route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priorityEs,
      alternates: { languages },
    });

    entries.push({
      url: absoluteUrl('en', route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priorityEn,
      alternates: { languages },
    });
  }

  return entries;
}

/** Número esperado de URLs en el sitemap (2 idiomas × rutas indexables). */
export function expectedSitemapUrlCount(): number {
  return INDEXABLE_ROUTES.length * 2;
}

/** Todas las URLs absolutas que debe contener el sitemap. */
export function allSitemapAbsoluteUrls(): string[] {
  return buildSitemapEntries().map((entry) => entry.url);
}
