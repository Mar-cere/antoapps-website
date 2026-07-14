import type { Metadata } from 'next';
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

function featuredLinksForLocale(locale: Locale): ResourceFeaturedLink[] {
  const guideLinks = FEATURED_GUIDE_SLUGS.map((slug) => {
    const guide = getPsychoeducationGuide(locale, slug)!;
    return {
      href: psychoeducationGuidePath(locale, slug),
      label: guide.hero.title,
    };
  });

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
        title: 'Anto app features (v1.5.0)',
        description:
          'Overview of conversation modes, bilingual support, structured protocols, tasks, habits, and more.',
        type: 'guia',
        category: 'producto',
        link: localePath(locale, '/app'),
      },
      {
        id: 'site-2',
        title: 'Version history and updates',
        description:
          'Full public changelog: techniques hub, insights graph, persistent session, clinical scales, and protocols.',
        type: 'guia',
        category: 'producto',
        link: localePath(locale, '/changelog'),
      },
      {
        id: 'site-3',
        title: 'Security and privacy',
        description:
          'How Anto protects your data: encryption, authentication, and privacy practices explained.',
        type: 'guia',
        category: 'privacidad',
        link: localePath(locale, '/seguridad'),
      },
      {
        id: 'site-4',
        title: 'Scientific evidence',
        description:
          'Studies on digital mental health, therapeutic chatbots, and mobile interventions that support Anto\'s approach.',
        type: 'guia',
        category: 'clinical',
        link: localePath(locale, '/investigacion'),
      },
      {
        id: 'site-5',
        title: 'Frequently asked questions',
        description:
          'Answers about the AI assistant, techniques hub, clinical scales, conversation modes, pricing, and the 1-day trial.',
        type: 'guia',
        category: 'producto',
        link: homeFaq,
      },
    ];
  }

  return [
    {
      id: 'site-1',
      title: 'Funcionalidades de Anto (v1.5.0)',
      description:
        'Resumen de modos de conversación, hub de técnicas, soporte bilingüe, protocolos estructurados, tareas y hábitos.',
      type: 'guia',
      category: 'producto',
      link: localePath(locale, '/app'),
    },
    {
      id: 'site-2',
      title: 'Historial de versiones y novedades',
      description:
        'Changelog público: hub de técnicas, grafo de insights, sesión persistente, escalas clínicas y protocolos.',
      type: 'guia',
      category: 'producto',
      link: localePath(locale, '/changelog'),
    },
    {
      id: 'site-3',
      title: 'Seguridad y privacidad',
      description:
        'Cómo Anto protege tus datos: cifrado, autenticación y prácticas de privacidad explicadas.',
      type: 'guia',
      category: 'privacidad',
      link: localePath(locale, '/seguridad'),
    },
    {
      id: 'site-4',
      title: 'Evidencia científica',
      description:
        'Estudios sobre salud mental digital, chatbots terapéuticos e intervenciones móviles que respaldan el enfoque de Anto.',
      type: 'guia',
      category: 'clinical',
      link: localePath(locale, '/investigacion'),
    },
    {
      id: 'site-5',
      title: 'Preguntas frecuentes',
      description:
        'Respuestas sobre el asistente IA, hub de técnicas, escalas clínicas, modos de conversación, precios y la prueba de 1 día.',
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
        title: 'Resources - Anto | Psychoeducation and Mental Health Guides',
        description:
          'Psychoeducation on CBT, depression, anxiety, OCD/ERP, trauma, anger, grounding, PHQ-9/GAD-7, self-compassion, sleep, and mindfulness — plus Anto product guides.',
        openGraphTitle: 'Resources - Anto',
        openGraphDescription:
          'Psychoeducation guides and references on clinical tools, Anto features, and emotional wellness with AI.',
        canonicalPath: CANONICAL_PATH,
      },
      hero: {
        title: 'Resource Library',
        subtitle:
          'Psychoeducation guides on evidence-based techniques, plus references about Anto and clinical wellbeing',
      },
      featured: {
        ariaLabel: 'Featured guides and pages',
        links: featuredLinksForLocale(locale),
      },
      library: {
        filters: [
          { id: 'all', label: 'All' },
          { id: 'psicoeducacion', label: 'Psychoeducation' },
          { id: 'guia', label: 'Site guides' },
          { id: 'clinical', label: 'Clinical' },
          { id: 'producto', label: 'Product' },
          { id: 'privacidad', label: 'Privacy' },
        ],
        searchPlaceholder: 'Search resources...',
        searchAriaLabel: 'Search resources',
        emptyMessage: 'No resources found with the current filters.',
        viewResourceLabel: 'View guide',
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
      title: 'Recursos - Anto | Psicoeducación y Guías de Salud Mental',
      description:
        'Psicoeducación sobre TCC, depresión, ansiedad, TOC/ERP, trauma, ira, grounding, PHQ-9/GAD-7, autocompasión, sueño y mindfulness — más guías sobre Anto.',
      openGraphTitle: 'Recursos - Anto',
      openGraphDescription:
        'Guías de psicoeducación y referencias sobre herramientas clínicas, funcionalidades de Anto y bienestar emocional con IA.',
      canonicalPath: CANONICAL_PATH,
    },
    hero: {
      title: 'Biblioteca de Recursos',
      subtitle:
        'Guías de psicoeducación sobre técnicas basadas en evidencia, más referencias sobre Anto y bienestar clínico',
    },
    featured: {
      ariaLabel: 'Guías y páginas destacadas',
      links: featuredLinksForLocale(locale),
    },
    library: {
      filters: [
        { id: 'all', label: 'Todos' },
        { id: 'psicoeducacion', label: 'Psicoeducación' },
        { id: 'guia', label: 'Guías del sitio' },
        { id: 'clinical', label: 'Clínico' },
        { id: 'producto', label: 'Producto' },
        { id: 'privacidad', label: 'Privacidad' },
      ],
      searchPlaceholder: 'Buscar recursos...',
      searchAriaLabel: 'Buscar recursos',
      emptyMessage: 'No se encontraron recursos con los filtros actuales.',
      viewResourceLabel: 'Ver guía',
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
