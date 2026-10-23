import type { MetadataRoute } from 'next';
import { hasPortugueseLegalPage, localePath, type LegalLocale } from '@/lib/i18n/config';
import { INDEXABLE_ROUTES } from '@/lib/seo/indexable-routes';
import { PSYCHOEDUCATION_INDEXABLE_ROUTES } from '@/lib/seo/psychoeducation-routes';
import { SITE_ORIGIN } from '@/lib/seo/site';

const ALL_INDEXABLE_ROUTES = [...INDEXABLE_ROUTES, ...PSYCHOEDUCATION_INDEXABLE_ROUTES];

function absoluteUrl(locale: LegalLocale, logicalPath: string): string {
  return `${SITE_ORIGIN}${localePath(locale, logicalPath)}`;
}

function buildLanguageAlternates(logicalPath: string): Record<string, string> {
  const esUrl = absoluteUrl('es', logicalPath);
  const enUrl = absoluteUrl('en', logicalPath);
  const languages: Record<string, string> = {
    es: esUrl,
    en: enUrl,
    'x-default': esUrl,
  };
  if (hasPortugueseLegalPage(logicalPath)) {
    languages['pt-BR'] = absoluteUrl('pt', logicalPath);
  }
  return languages;
}

/**
 * Genera entradas del sitemap con hreflang (alternates.languages).
 * Cada ruta ES/EN aparece una vez. Las páginas legales suman pt-BR.
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

    if (hasPortugueseLegalPage(route.path)) {
      entries.push({
        url: absoluteUrl('pt', route.path),
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priorityEn,
        alternates: { languages },
      });
    }
  }

  return entries;
}

/** Número esperado de URLs en el sitemap (es/en de cada ruta, más las legales pt-BR). */
export function expectedSitemapUrlCount(): number {
  const bilingual = (INDEXABLE_ROUTES.length + PSYCHOEDUCATION_INDEXABLE_ROUTES.length) * 2;
  const portugueseLegal = ALL_INDEXABLE_ROUTES.filter((route) => hasPortugueseLegalPage(route.path)).length;
  return bilingual + portugueseLegal;
}

/** Todas las URLs absolutas que debe contener el sitemap. */
export function allSitemapAbsoluteUrls(): string[] {
  return buildSitemapEntries().map((entry) => entry.url);
}
