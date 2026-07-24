import { localePath, type Locale } from '@/lib/i18n/config';
import { siteUrl } from '@/lib/i18n/metadata';
import {
  getAllPsychoeducationGuides,
  type PsychoeducationGuide,
} from '@/lib/i18n/copy/pages/psychoeducation';
import { getResourcesPageCopy } from '@/lib/i18n/copy/pages/resources';

const RESOURCES_PATH = '/recursos';
const SITE_ORG = 'https://antoapps.com';

/** Fecha de publicación de la colección (ISO date). */
export const RESOURCES_COLLECTION_DATE_PUBLISHED = '2026-05-01';
/** Última actualización relevante del hub / guías para schema. */
export const RESOURCES_COLLECTION_DATE_MODIFIED = '2026-07-24';

export function getResourcesCollectionJsonLd(locale: Locale) {
  const copy = getResourcesPageCopy(locale);
  const hubUrl = siteUrl(locale, RESOURCES_PATH);
  const homeUrl = siteUrl(locale, '/');
  const guides = getAllPsychoeducationGuides(locale);
  const isEn = locale === 'en';

  const itemListElement = guides.map((guide: PsychoeducationGuide, index: number) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: guide.hero.title,
    url: siteUrl(locale, `${RESOURCES_PATH}/${guide.slug}`),
    description: guide.meta.description,
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${hubUrl}#collection`,
        name: copy.meta.openGraphTitle,
        headline: copy.hero.title,
        description: copy.meta.description,
        url: hubUrl,
        inLanguage: isEn ? 'en' : 'es',
        datePublished: RESOURCES_COLLECTION_DATE_PUBLISHED,
        dateModified: RESOURCES_COLLECTION_DATE_MODIFIED,
        isPartOf: {
          '@type': 'WebSite',
          name: 'Anto',
          url: homeUrl,
        },
        about: [
          {
            '@type': 'Thing',
            name: isEn ? 'Anxiety psychoeducation' : 'Psicoeducación sobre ansiedad',
          },
          {
            '@type': 'Thing',
            name: isEn ? 'Cognitive behavioural therapy (CBT)' : 'Terapia cognitivo-conductual (TCC)',
          },
          {
            '@type': 'Thing',
            name: isEn ? 'Emotional support education' : 'Educación en acompañamiento emocional',
          },
        ],
        mainEntity: {
          '@id': `${hubUrl}#itemlist`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Anto',
          url: SITE_ORG,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_ORG}/assets/images/antoIcon.png`,
          },
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${hubUrl}#itemlist`,
        name: isEn
          ? 'Anto psychoeducation guides'
          : 'Guías de psicoeducación de Anto',
        numberOfItems: guides.length,
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        itemListElement,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${hubUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: copy.breadcrumbs.homeLabel,
            item: homeUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: copy.breadcrumbs.currentLabel,
            item: hubUrl,
          },
        ],
      },
    ],
  };
}

export function getGuideBreadcrumbJsonLd(
  locale: Locale,
  path: string,
  guideTitle: string
) {
  const articleUrl = siteUrl(locale, path);
  const hubUrl = siteUrl(locale, RESOURCES_PATH);
  const homeUrl = siteUrl(locale, '/');
  const homeLabel = locale === 'en' ? 'Home' : 'Inicio';
  const hubLabel = locale === 'en' ? 'Resources' : 'Recursos';

  return {
    '@type': 'BreadcrumbList',
    '@id': `${articleUrl}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeLabel,
        item: homeUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: hubLabel,
        item: hubUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: guideTitle,
        item: articleUrl,
      },
    ],
  };
}

/** Path lógico con locale para tests / debug. */
export function resourcesHubLogicalPath(locale: Locale): string {
  return localePath(locale, RESOURCES_PATH);
}
