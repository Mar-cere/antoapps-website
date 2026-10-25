import type { MetadataRoute } from 'next';
import { localePath, type Locale } from '@/lib/i18n/config';
import { INDEXABLE_ROUTES } from '@/lib/seo/indexable-routes';
import { PSYCHOEDUCATION_INDEXABLE_ROUTES } from '@/lib/seo/psychoeducation-routes';
import { SITE_ORIGIN } from '@/lib/seo/site';

const ALL_INDEXABLE_ROUTES = [...INDEXABLE_ROUTES, ...PSYCHOEDUCATION_INDEXABLE_ROUTES];

function absoluteUrl(locale: Locale, logicalPath: string): string {
  return `${SITE_ORIGIN}${localePath(locale, logicalPath)}`;
}

function buildLanguageAlternates(logicalPath: string): Record<string, string> {
  const esUrl = absoluteUrl('es', logicalPath);
  return {
    es: esUrl,
    en: absoluteUrl('en', logicalPath),
    'pt-BR': absoluteUrl('pt', logicalPath),
    'x-default': esUrl,
  };
}

/**
 * Genera entradas del sitemap con hreflang (alternates.languages).
 * Cada ruta lógica aparece en español, inglés y portugués de Brasil.
 */
export function buildSitemapEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of ALL_INDEXABLE_ROUTES) {
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

    entries.push({
      url: absoluteUrl('pt', route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priorityEn,
      alternates: { languages },
    });
  }

  return entries;
}

/** Número esperado de URLs en el sitemap (es, en y pt-BR de cada ruta). */
export function expectedSitemapUrlCount(): number {
  return (INDEXABLE_ROUTES.length + PSYCHOEDUCATION_INDEXABLE_ROUTES.length) * 3;
}

/** Todas las URLs absolutas que debe contener el sitemap. */
export function allSitemapAbsoluteUrls(): string[] {
  return buildSitemapEntries().map((entry) => entry.url);
}
