import type { Metadata } from 'next';
import { APP_VERSION_LABEL } from '@/lib/app-version';
import { localePath, type Locale } from '@/lib/i18n/config';
import { buildLocalizedPageMetadata } from '@/lib/i18n/metadata';
import {
  PSYCHOEDUCATION_SLUGS,
  getPsychoeducationGuide,
  psychoeducationGuidePath,
  type PsychoeducationSlug,
} from '@/lib/i18n/copy/pages/psychoeducation';

const CANONICAL_PATH = '/recursos';

/** Guías priorizadas en hub y enlaces destacados (SEO + GSC). */
const FEATURED_GUIDE_SLUGS = [
  'escalas-phq9-gad7',
  'que-es-tcc',
  'grounding-ansiedad-crisis',
  'higiene-sueno-salud-mental',
] as const satisfies readonly PsychoeducationSlug[];

export type ResourceItem = {
  id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  link: string;
};

export type ResourceFilter = {
  id: string;
  label: string;
};

export type ResourceFeaturedLink = {
  href: string;
  label: string;
};

export type ResourcesPageCopy = {
  breadcrumbs: { homeLabel: string; homeHref: string; currentLabel: string };
  meta: {
    title: string;
    description: string;
    openGraphTitle: string;
    openGraphDescription: string;
    canonicalPath: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  featured: {
    ariaLabel: string;
    links: ResourceFeaturedLink[];
  };
  library: {
    filtersAriaLabel: string;
    filters: ResourceFilter[];
    searchPlaceholder: string;
    searchAriaLabel: string;
    emptyMessage: string;
    viewResourceLabel: string;
    resources: ResourceItem[];
  };
};

function orderedPsychoeducationSlugs(): PsychoeducationSlug[] {
  const featured = new Set<string>(FEATURED_GUIDE_SLUGS);
  const rest = PSYCHOEDUCATION_SLUGS.filter((slug) => !featured.has(slug));
  return [...FEATURED_GUIDE_SLUGS, ...rest];
}

function psychoeducationResources(locale: Locale): ResourceItem[] {
  return orderedPsychoeducationSlugs().map((slug, index) => {
    const guide = getPsychoeducationGuide(locale, slug)!;
    return {
      id: `pe-${index + 1}`,
      title: guide.hero.title,
      description: guide.meta.description,
      type: 'psicoeducacion',
      category: 'psicoeducacion',
      link: psychoeducationGuidePath(locale, slug),
    };
  });
}

const FEATURED_SHORT_LABELS: Record<Locale, Record<(typeof FEATURED_GUIDE_SLUGS)[number], string>> = {
  es: {
    'escalas-phq9-gad7': 'Escalas PHQ-9 y GAD-7',
    'que-es-tcc': 'Qué es la TCC',
    'grounding-ansiedad-crisis': 'Grounding para ansiedad',
    'higiene-sueno-salud-mental': 'Higiene del sueño',
  },
  en: {
    'escalas-phq9-gad7': 'PHQ-9 and GAD-7 scales',
    'que-es-tcc': 'What is CBT',
    'grounding-ansiedad-crisis': 'Grounding for anxiety',
    'higiene-sueno-salud-mental': 'Sleep hygiene',
  },
};

function featuredLinksForLocale(locale: Locale): ResourceFeaturedLink[] {
  const guideLinks = FEATURED_GUIDE_SLUGS.map((slug) => ({
    href: psychoeducationGuidePath(locale, slug),
    label: FEATURED_SHORT_LABELS[locale][slug],
  }));

  if (locale === 'en') {
    return [
      ...guideLinks,
      { href: localePath(locale, '/app'), label: 'Anto for iPhone' },
      { href: localePath(locale, '/seguridad'), label: 'Security & privacy' },
    ];
  }

  return [
    ...guideLinks,
    { href: localePath(locale, '/app'), label: 'Anto para iPhone' },
    { href: localePath(locale, '/seguridad'), label: 'Seguridad y privacidad' },
  ];
}

function siteResources(locale: Locale): ResourceItem[] {
  const homeFaq = `${localePath(locale, '/')}#faq`;

  if (locale === 'en') {
    return [
      {
        id: 'site-1',
        title: `Anto on iPhone (${APP_VERSION_LABEL})`,
        description:
          'Ongoing emotional support: conversation, techniques hub, bilingual use, structured protocols, and daily tools.',
        type: 'guia',
        category: 'producto',
        link: localePath(locale, '/app'),
      },
      {
        id: 'site-2',
        title: 'Version history and updates',
        description:
          'Public changelog: techniques hub, insights, persistent session, scales, and protocols.',
        type: 'guia',
        category: 'producto',
        link: localePath(locale, '/changelog'),
      },
      {
        id: 'site-3',
        title: 'Security and privacy',
        description:
          'How Anto protects conversations: encryption, authentication, and privacy practices.',
        type: 'guia',
        category: 'privacidad',
        link: localePath(locale, '/seguridad'),
      },
      {
        id: 'site-4',
        title: 'Scientific evidence',
        description:
          'References on digital emotional support and mobile interventions that inform Anto\'s approach.',
        type: 'guia',
        category: 'clinical',
        link: localePath(locale, '/investigacion'),
      },
      {
        id: 'site-5',
        title: 'Frequently asked questions',
        description:
          'Answers about accompaniment, techniques, scales, pricing, and the 1-day trial.',
        type: 'guia',
        category: 'producto',
        link: homeFaq,
      },
    ];
  }

  return [
    {
      id: 'site-1',
      title: `Anto en iPhone (${APP_VERSION_LABEL})`,
      description:
        'Acompañamiento emocional continuo: conversación, hub de técnicas, uso bilingüe, protocolos y herramientas del día a día.',
      type: 'guia',
      category: 'producto',
      link: localePath(locale, '/app'),
    },
    {
      id: 'site-2',
      title: 'Historial de versiones y novedades',
      description:
        'Changelog público: hub de técnicas, insights, sesión persistente, escalas y protocolos.',
      type: 'guia',
      category: 'producto',
      link: localePath(locale, '/changelog'),
    },
    {
      id: 'site-3',
      title: 'Seguridad y privacidad',
      description:
        'Cómo Anto protege las conversaciones: cifrado, autenticación y prácticas de privacidad.',
      type: 'guia',
      category: 'privacidad',
      link: localePath(locale, '/seguridad'),
    },
    {
      id: 'site-4',
      title: 'Evidencia científica',
      description:
        'Referencias sobre apoyo emocional digital e intervenciones móviles que informan el enfoque de Anto.',
      type: 'guia',
      category: 'clinical',
      link: localePath(locale, '/investigacion'),
    },
    {
      id: 'site-5',
      title: 'Preguntas frecuentes',
      description:
        'Respuestas sobre acompañamiento, técnicas, escalas, precios y la prueba de 1 día.',
      type: 'guia',
      category: 'producto',
      link: homeFaq,
    },
  ];
}

function resourcesForLocale(locale: Locale): ResourceItem[] {
  const guides = psychoeducationResources(locale);
  const site = siteResources(locale);
  const productFirst = site.filter((item) => item.id === 'site-1' || item.id === 'site-3');
  const productRest = site.filter((item) => item.id !== 'site-1' && item.id !== 'site-3');
  // Destacadas → app/seguridad → resto de guías → resto del sitio
  const featuredGuideItems = guides.slice(0, FEATURED_GUIDE_SLUGS.length);
  const otherGuides = guides.slice(FEATURED_GUIDE_SLUGS.length);
  return [...featuredGuideItems, ...productFirst, ...otherGuides, ...productRest];
}

function buildResourcesPageCopy(locale: Locale): ResourcesPageCopy {
  const resources = resourcesForLocale(locale);
  const isEn = locale === 'en';

  if (isEn) {
    return {
      breadcrumbs: {
        homeLabel: 'Home',
        homeHref: localePath(locale, '/'),
        currentLabel: 'Resources',
      },
      meta: {
        title: 'Resources — Anto | Psychoeducation guides for anxiety and quiet hours',
        description:
          'Psychoeducation on CBT, anxiety, depression, grounding, sleep, PHQ-9/GAD-7, and more — plus Anto on iPhone, privacy, and evidence. Complements care; does not replace a therapist.',
        openGraphTitle: 'Resources — Anto',
        openGraphDescription:
          'Clear psychoeducation guides and Anto product references for anxiety and everyday emotional support.',
        canonicalPath: CANONICAL_PATH,
      },
      hero: {
        title: 'Guides to land with',
        subtitle:
          'Short psychoeducation on anxiety, techniques, and patterns — plus how Anto works. Not a substitute for professional care.',
      },
      featured: {
        ariaLabel: 'Featured guides and pages',
        links: featuredLinksForLocale(locale),
      },
      library: {
        filtersAriaLabel: 'Filter resources',
        filters: [
          { id: 'all', label: 'All' },
          { id: 'psicoeducacion', label: 'Psychoeducation' },
          { id: 'guia', label: 'Site guides' },
          { id: 'clinical', label: 'Evidence' },
          { id: 'producto', label: 'Product' },
          { id: 'privacidad', label: 'Privacy' },
        ],
        searchPlaceholder: 'Search guides…',
        searchAriaLabel: 'Search guides',
        emptyMessage: 'No guides match these filters.',
        viewResourceLabel: 'Read',
        resources,
      },
    };
  }

  return {
    breadcrumbs: {
      homeLabel: 'Inicio',
      homeHref: localePath(locale, '/'),
      currentLabel: 'Recursos',
    },
    meta: {
      title: 'Recursos — Anto | Guías de psicoeducación para ansiedad y horas quietas',
      description:
        'Psicoeducación sobre TCC, ansiedad, depresión, grounding, sueño, PHQ-9/GAD-7 y más — más Anto en iPhone, privacidad y evidencia. Complementa; no reemplaza a un terapeuta.',
      openGraphTitle: 'Recursos — Anto',
      openGraphDescription:
        'Guías claras de psicoeducación y referencias de Anto para ansiedad y acompañamiento emocional cotidiano.',
      canonicalPath: CANONICAL_PATH,
    },
    hero: {
      title: 'Guías para aterrizar',
      subtitle:
        'Psicoeducación breve sobre ansiedad, técnicas y patrones — y cómo funciona Anto. No sustituye atención profesional.',
    },
    featured: {
      ariaLabel: 'Guías y páginas destacadas',
      links: featuredLinksForLocale(locale),
    },
    library: {
      filtersAriaLabel: 'Filtrar recursos',
      filters: [
        { id: 'all', label: 'Todos' },
        { id: 'psicoeducacion', label: 'Psicoeducación' },
        { id: 'guia', label: 'Guías del sitio' },
        { id: 'clinical', label: 'Evidencia' },
        { id: 'producto', label: 'Producto' },
        { id: 'privacidad', label: 'Privacidad' },
      ],
      searchPlaceholder: 'Buscar guías…',
      searchAriaLabel: 'Buscar guías',
      emptyMessage: 'Ninguna guía coincide con estos filtros.',
      viewResourceLabel: 'Leer',
      resources,
    },
  };
}

export function getResourcesPageCopy(locale: Locale): ResourcesPageCopy {
  return buildResourcesPageCopy(locale);
}

export function resourcesPageMetadata(locale: Locale): Metadata {
  const { meta } = buildResourcesPageCopy(locale);
  return buildLocalizedPageMetadata(locale, meta.canonicalPath, {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.openGraphTitle,
      description: meta.openGraphDescription,
    },
  });
}
