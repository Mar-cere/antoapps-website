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

/**
 * Atajos del hero — orden y labels humanos (no índice clínico).
 * Los slugs siguen apuntando a las mismas guías SEO.
 */
const FEATURED_GUIDE_SLUGS = [
  'grounding-ansiedad-crisis',
  'distorsiones-cognitivas',
  'higiene-sueno-salud-mental',
  'que-es-tcc',
] as const satisfies readonly PsychoeducationSlug[];

export type ResourceItem = {
  id: string;
  title: string;
  description: string;
  link: string;
};

export type ResourceFeaturedLink = {
  href: string;
  label: string;
};

export type ResourceGroup = {
  id: string;
  title: string;
  items: ResourceItem[];
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
    searchPlaceholder: string;
    searchAriaLabel: string;
    emptyMessage: string;
    viewResourceLabel: string;
    groups: ResourceGroup[];
  };
};

function orderedPsychoeducationSlugs(): PsychoeducationSlug[] {
  const featured = new Set<string>(FEATURED_GUIDE_SLUGS);
  const rest = PSYCHOEDUCATION_SLUGS.filter((slug) => !featured.has(slug));
  return [...FEATURED_GUIDE_SLUGS, ...rest];
}

/** Blurb corto para el hub: subtítulo del hero, sin coletilla clínica. */
function hubBlurb(text: string): string {
  return text
    .replace(/\s*Psicoeducación[^.]*\.?/gi, '')
    .replace(/\s*Psychoeducation[^.]*\.?/gi, '')
    .replace(/\s*no sustituye[^.]*\.?/gi, '')
    .replace(/\s*does not replace[^.]*\.?/gi, '')
    .trim();
}

function psychoeducationResources(locale: Locale): ResourceItem[] {
  return orderedPsychoeducationSlugs().map((slug, index) => {
    const guide = getPsychoeducationGuide(locale, slug)!;
    return {
      id: `pe-${index + 1}`,
      title: guide.hero.title,
      description: hubBlurb(guide.hero.subtitle),
      link: psychoeducationGuidePath(locale, slug),
    };
  });
}

const FEATURED_HUMAN_LABELS: Record<
  Locale,
  Record<(typeof FEATURED_GUIDE_SLUGS)[number], string>
> = {
  es: {
    'grounding-ansiedad-crisis': 'Cuando la ansiedad sube',
    'distorsiones-cognitivas': 'Pensamientos en bucle',
    'higiene-sueno-salud-mental': 'No puedo dormir',
    'que-es-tcc': 'Entender la TCC',
  },
  en: {
    'grounding-ansiedad-crisis': 'When anxiety rises',
    'distorsiones-cognitivas': 'Thoughts in a loop',
    'higiene-sueno-salud-mental': "I can't sleep",
    'que-es-tcc': 'Understanding CBT',
  },
};

function featuredLinksForLocale(locale: Locale): ResourceFeaturedLink[] {
  return FEATURED_GUIDE_SLUGS.map((slug) => ({
    href: psychoeducationGuidePath(locale, slug),
    label: FEATURED_HUMAN_LABELS[locale][slug],
  }));
}

function siteResources(locale: Locale): ResourceItem[] {
  const homeFaq = `${localePath(locale, '/')}#faq`;

  if (locale === 'en') {
    return [
      {
        id: 'site-1',
        title: `Anto on iPhone (${APP_VERSION_LABEL})`,
        description: 'Ongoing emotional support on your phone — conversation, techniques, daily tools.',
        link: localePath(locale, '/app'),
      },
      {
        id: 'site-3',
        title: 'Security and privacy',
        description: 'How conversations stay protected.',
        link: localePath(locale, '/seguridad'),
      },
      {
        id: 'site-4',
        title: 'Scientific evidence',
        description: 'References that inform Anto\'s approach.',
        link: localePath(locale, '/investigacion'),
      },
      {
        id: 'site-2',
        title: 'Version history',
        description: 'What changed in recent releases.',
        link: localePath(locale, '/changelog'),
      },
      {
        id: 'site-5',
        title: 'FAQ',
        description: 'Accompaniment, privacy, pricing, and the free trial.',
        link: homeFaq,
      },
    ];
  }

  return [
    {
      id: 'site-1',
      title: `Anto en iPhone (${APP_VERSION_LABEL})`,
      description: 'Acompañamiento emocional en el teléfono — conversación, técnicas, día a día.',
      link: localePath(locale, '/app'),
    },
    {
      id: 'site-3',
      title: 'Seguridad y privacidad',
      description: 'Cómo se protegen las conversaciones.',
      link: localePath(locale, '/seguridad'),
    },
    {
      id: 'site-4',
      title: 'Evidencia científica',
      description: 'Referencias que informan el enfoque de Anto.',
      link: localePath(locale, '/investigacion'),
    },
    {
      id: 'site-2',
      title: 'Historial de versiones',
      description: 'Qué cambió en las últimas versiones.',
      link: localePath(locale, '/changelog'),
    },
    {
      id: 'site-5',
      title: 'Preguntas frecuentes',
      description: 'Acompañamiento, privacidad, precios y la prueba gratis.',
      link: homeFaq,
    },
  ];
}

function groupsForLocale(locale: Locale): ResourceGroup[] {
  const guidesTitle = locale === 'en' ? 'Guides' : 'Guías';
  const antoTitle = locale === 'en' ? 'About Anto' : 'Sobre Anto';

  return [
    {
      id: 'guides',
      title: guidesTitle,
      items: psychoeducationResources(locale),
    },
    {
      id: 'anto',
      title: antoTitle,
      items: siteResources(locale),
    },
  ];
}

function buildResourcesPageCopy(locale: Locale): ResourcesPageCopy {
  const groups = groupsForLocale(locale);

  if (locale === 'en') {
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
        ariaLabel: 'Start here',
        links: featuredLinksForLocale(locale),
      },
      library: {
        searchPlaceholder: 'Search…',
        searchAriaLabel: 'Search resources',
        emptyMessage: 'Nothing matches that search.',
        viewResourceLabel: 'Read',
        groups,
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
      ariaLabel: 'Empieza por aquí',
      links: featuredLinksForLocale(locale),
    },
    library: {
      searchPlaceholder: 'Buscar…',
      searchAriaLabel: 'Buscar recursos',
      emptyMessage: 'Nada coincide con esa búsqueda.',
      viewResourceLabel: 'Leer',
      groups,
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
