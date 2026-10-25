import { getEditorialImagePath } from '@/lib/assets/editorial-images';
import { localePath, type Locale } from '@/lib/i18n/config';
import { siteUrl } from '@/lib/i18n/metadata';
import {
  getAllPsychoeducationGuides,
  type PsychoeducationGuide,
} from '@/lib/i18n/copy/pages/psychoeducation';
import { getResourcesPageCopy } from '@/lib/i18n/copy/pages/resources';

const RESOURCES_PATH = '/recursos';
const SITE_ORG = 'https://antoapps.com';

function schemaInLanguage(locale: Locale): 'en' | 'es' | 'pt-BR' {
  if (locale === 'en') return 'en';
  if (locale === 'pt') return 'pt-BR';
  return 'es';
}

function locText(locale: Locale, en: string, pt: string, es: string): string {
  if (locale === 'en') return en;
  if (locale === 'pt') return pt;
  return es;
}

/** Fecha de publicación de la colección (ISO date). */
export const RESOURCES_COLLECTION_DATE_PUBLISHED = '2026-05-01';
/** Última actualización relevante del hub / guías para schema. */
export const RESOURCES_COLLECTION_DATE_MODIFIED = '2026-07-28';

export function getResourcesCollectionJsonLd(locale: Locale) {
  const copy = getResourcesPageCopy(locale);
  const hubUrl = siteUrl(locale, RESOURCES_PATH);
  const homeUrl = siteUrl(locale, '/');
  const guides = getAllPsychoeducationGuides(locale);

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
        inLanguage: schemaInLanguage(locale),
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `${SITE_ORG}${getEditorialImagePath('morningPause')}`,
          caption: locText(
            locale,
            'Morning light on an empty chair by the window',
            'Luz da manhã sobre uma cadeira vazia junto à janela',
            'Luz de mañana sobre una silla vacía junto a la ventana'
          ),
        },
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
            name: locText(locale, 'Anxiety psychoeducation', 'Psicoeducação sobre ansiedade', 'Psicoeducación sobre ansiedad'),
          },
          {
            '@type': 'Thing',
            name: locText(
              locale,
              'Grounding and sensory regulation (5-4-3-2-1)',
              'Grounding e regulação sensorial (5-4-3-2-1)',
              'Grounding y regulación sensorial (5-4-3-2-1)'
            ),
          },
          {
            '@type': 'Thing',
            name: locText(
              locale,
              'Cognitive behavioural therapy (CBT)',
              'Terapia cognitivo-comportamental (TCC)',
              'Terapia cognitivo-conductual (TCC)'
            ),
          },
          {
            '@type': 'Thing',
            name: locText(locale, 'Cognitive distortions', 'Distorções cognitivas', 'Distorsiones cognitivas'),
          },
          {
            '@type': 'Thing',
            name: locText(locale, 'Cognitive restructuring', 'Reestruturação cognitiva', 'Reestructuración cognitiva'),
          },
          {
            '@type': 'Thing',
            name: locText(locale, 'Behavioural experiments', 'Experimentos comportamentais', 'Experimentos conductuales'),
          },
          {
            '@type': 'Thing',
            name: locText(
              locale,
              'Sleep and insomnia psychoeducation',
              'Psicoeducação sobre sono e insônia',
              'Psicoeducación sobre sueño e insomnio'
            ),
          },
          {
            '@type': 'Thing',
            name: locText(
              locale,
              'Emotional support education',
              'Educação em acompanhamento emocional',
              'Educación en acompañamiento emocional'
            ),
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
        name: locText(
          locale,
          'Anto psychoeducation guides',
          'Guias de psicoeducação da Anto',
          'Guías de psicoeducación de Anto'
        ),
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
  const homeLabel = locText(locale, 'Home', 'Início', 'Inicio');
  const hubLabel = locText(locale, 'Resources', 'Recursos', 'Recursos');

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
