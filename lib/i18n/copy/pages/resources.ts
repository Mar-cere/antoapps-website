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
const CRISIS_LINES_HREF = 'https://findahelpline.com/';

/**
 * Atajos del hero — orden y labels humanos (no índice clínico).
 * Los slugs siguen apuntando a las mismas guías SEO.
 * Exportado para llms.txt / discovery IA.
 */
export const FEATURED_GUIDE_SLUGS = [
  'grounding-ansiedad-crisis',
  'escalas-phq9-gad7',
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
    /** Párrafo indexable bajo el subtítulo (keywords naturales, tono calmado). */
    seoIntro: string;
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
  crisis: {
    text: string;
    linkLabel: string;
    linkHref: string;
    externalHint: string;
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
    .replace(/\s*Psicoeducação[^.]*\.?/gi, '')
    .replace(/\s*no sustituye[^.]*\.?/gi, '')
    .replace(/\s*does not replace[^.]*\.?/gi, '')
    .replace(/\s*não substitui[^.]*\.?/gi, '')
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

export const FEATURED_HUMAN_LABELS: Record<
  Locale,
  Record<(typeof FEATURED_GUIDE_SLUGS)[number], string>
> = {
  es: {
    'grounding-ansiedad-crisis': 'Cuando la ansiedad sube (grounding)',
    'escalas-phq9-gad7': 'Cómo leer un chequeo de ánimo',
    'distorsiones-cognitivas': 'Pensamientos en bucle',
    'higiene-sueno-salud-mental': 'Cuando no puedes dormir (sueño)',
    'que-es-tcc': 'Pensamientos y emociones (TCC)',
  },
  en: {
    'grounding-ansiedad-crisis': 'When anxiety rises (grounding)',
    'escalas-phq9-gad7': 'How to read a mood check',
    'distorsiones-cognitivas': 'Thoughts in a loop',
    'higiene-sueno-salud-mental': 'When you cannot sleep (sleep)',
    'que-es-tcc': 'Thoughts and emotions (CBT)',
  },
  pt: {
    'grounding-ansiedad-crisis': 'Quando a ansiedade sobe (grounding)',
    'escalas-phq9-gad7': 'Como ler um cheque de humor',
    'distorsiones-cognitivas': 'Pensamentos em loop',
    'higiene-sueno-salud-mental': 'Quando você não consegue dormir (sono)',
    'que-es-tcc': 'Pensamentos e emoções (TCC)',
  },
};

/** Puntos de entrada humanos → URL canónica (SEO + agentes IA). */
export function getResourcesFeaturedEntryPoints(locale: Locale): ResourceFeaturedLink[] {
  return FEATURED_GUIDE_SLUGS.map((slug) => ({
    href: psychoeducationGuidePath(locale, slug),
    label: FEATURED_HUMAN_LABELS[locale][slug],
  }));
}

function featuredLinksForLocale(locale: Locale): ResourceFeaturedLink[] {
  return getResourcesFeaturedEntryPoints(locale);
}

function siteResources(locale: Locale): ResourceItem[] {
  const homeFaq = `${localePath(locale, '/')}#faq`;

  if (locale === 'en') {
    return [
      {
        id: 'site-1',
        title: 'What Anto is',
        description: 'A companion for when everything costs a little more.',
        link: localePath(locale, '/sobre-nosotros'),
      },
      {
        id: 'site-3',
        title: 'Security and privacy',
        description: 'Why the thread is read, how it travels, and how to ask for deletion.',
        link: localePath(locale, '/seguridad'),
      },
      {
        id: 'site-4',
        title: 'Evidence that informs Anto',
        description: 'Category literature, product bridge, honest limits, and APA citations.',
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

  if (locale === 'pt') {
    return [
      {
        id: 'site-1',
        title: 'O que é a Anto',
        description: 'Um acompanhamento para quando tudo custa um pouco mais.',
        link: localePath(locale, '/sobre-nosotros'),
      },
      {
        id: 'site-3',
        title: 'Segurança e privacidade',
        description: 'Por que o fio é lido, como ele viaja e como pedir a exclusão.',
        link: localePath(locale, '/seguridad'),
      },
      {
        id: 'site-4',
        title: 'Evidência que informa a Anto',
        description: 'Literatura de categoria, ponte com o produto, limites honestos e citações APA.',
        link: localePath(locale, '/investigacion'),
      },
      {
        id: 'site-2',
        title: 'Histórico de versões',
        description: 'O que mudou nas versões recentes.',
        link: localePath(locale, '/changelog'),
      },
      {
        id: 'site-5',
        title: 'Perguntas frequentes',
        description: 'Acompanhamento, privacidade, preço e o teste grátis.',
        link: homeFaq,
      },
    ];
  }

  return [
    {
      id: 'site-1',
      title: 'Qué es Anto',
      description: 'Un acompañante para cuando todo cuesta un poco más.',
      link: localePath(locale, '/sobre-nosotros'),
    },
    {
      id: 'site-3',
      title: 'Seguridad y privacidad',
      description: 'Por qué se lee el hilo, cómo viaja y cómo pedir que se borre.',
      link: localePath(locale, '/seguridad'),
    },
    {
      id: 'site-4',
      title: 'Evidencia que informa Anto',
      description: 'Literatura de categoría, puente a producto, límites honestos y citas APA.',
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
  const guidesTitle = locale === 'en' ? 'Guides' : locale === 'pt' ? 'Guias' : 'Guías';
  const antoTitle = locale === 'en' ? 'About Anto' : locale === 'pt' ? 'Sobre a Anto' : 'Sobre Anto';

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
        title: 'Resources — Anto | Psychoeducation for anxiety, CBT, sleep and quiet hours',
        description:
        `${PSYCHOEDUCATION_SLUGS.length} free psychoeducation guides: anxiety, CBT, looping thoughts, sleep, grounding, depression, and more — plus Anto on iPhone and Android, privacy, and evidence. Complements care; does not diagnose or replace a therapist.`,
        openGraphTitle: 'Anto resources — guides for anxiety and quiet hours',
        openGraphDescription:
          'Start with anxiety, looping thoughts, sleep, or CBT. Short educational guides — not a diagnosis.',
        canonicalPath: CANONICAL_PATH,
      },
      hero: {
        title: 'Guides to land with',
        subtitle:
          'Short psychoeducation on anxiety, techniques, and patterns — plus how Anto works. Not a substitute for professional care.',
        seoIntro:
          'Educational guides on anxiety, cognitive behavioural therapy (CBT), looping thoughts, a map of how thoughts get stuck (levels, clusters, small tests), grounding, sleep, depression, emotional regulation, and burnout. Free to read. They complement — and do not diagnose or replace — human therapy.',
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
      crisis: {
        text: 'Anto does not replace therapy or professional clinical care. If you are in crisis, seek emergency help in your country.',
        linkLabel: 'Emergency lines by country',
        linkHref: CRISIS_LINES_HREF,
        externalHint: 'Opens in a new tab',
      },
    };
  }

  if (locale === 'pt') {
    return {
      breadcrumbs: {
        homeLabel: 'Início',
        homeHref: localePath(locale, '/'),
        currentLabel: 'Recursos',
      },
      meta: {
        title: 'Recursos — Anto | Psicoeducação para ansiedade, TCC, sono e horas quietas',
        description:
          `${PSYCHOEDUCATION_SLUGS.length} guias gratuitos de psicoeducação: ansiedade, TCC, pensamentos em loop, sono, grounding, depressão e mais — além da Anto no iPhone e no Android, privacidade e evidência. Complementa; não diagnostica nem substitui um terapeuta.`,
        openGraphTitle: 'Recursos da Anto — guias para ansiedade e horas quietas',
        openGraphDescription:
          'Comece pela ansiedade, pelos pensamentos em loop, pelo sono ou pela TCC. Guias educativos curtos — não são um diagnóstico.',
        canonicalPath: CANONICAL_PATH,
      },
      hero: {
        title: 'Guias para encontrar o chão',
        subtitle:
          'Psicoeducação breve sobre ansiedade, técnicas e padrões — e como a Anto funciona. Não substitui atendimento profissional.',
        seoIntro:
          'Guias educativos sobre ansiedade, terapia cognitivo-comportamental (TCC), pensamentos em loop, um mapa de como os pensamentos se enroscam (níveis, agrupamentos, provas pequenas), grounding, sono, depressão, regulação emocional e burnout. Leitura gratuita. Complementam — não diagnosticam nem substituem — a terapia humana.',
      },
      featured: {
        ariaLabel: 'Comece por aqui',
        links: featuredLinksForLocale(locale),
      },
      library: {
        searchPlaceholder: 'Buscar…',
        searchAriaLabel: 'Buscar recursos',
        emptyMessage: 'Nada corresponde a essa busca.',
        viewResourceLabel: 'Ler',
        groups,
      },
      crisis: {
        text: 'A Anto não substitui terapia nem atendimento clínico profissional. Se você estiver em crise, procure ajuda de emergência no seu país.',
        linkLabel: 'Linhas de emergência por país',
        linkHref: CRISIS_LINES_HREF,
        externalHint: 'Abre numa nova aba',
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
      title: 'Recursos — Anto | Psicoeducación para ansiedad, TCC, sueño y horas quietas',
      description:
        `${PSYCHOEDUCATION_SLUGS.length} guías gratuitas de psicoeducación: ansiedad, TCC, pensamientos en bucle, sueño, grounding, depresión y más — más Anto en iPhone, privacidad y evidencia. Complementa; no diagnostica ni reemplaza a un terapeuta.`,
      openGraphTitle: 'Recursos Anto — guías para ansiedad y horas quietas',
      openGraphDescription:
        'Empieza por ansiedad, pensamientos en bucle, sueño o TCC. Guías educativas breves — no son un diagnóstico.',
      canonicalPath: CANONICAL_PATH,
    },
    hero: {
      title: 'Guías para aterrizar',
      subtitle:
        'Psicoeducación breve sobre ansiedad, técnicas y patrones — y cómo funciona Anto. No sustituye atención profesional.',
      seoIntro:
        'Guías educativas sobre ansiedad, terapia cognitivo-conductual (TCC), pensamientos en bucle, un mapa de cómo se enredan los pensamientos (niveles, agrupaciones, pruebas pequeñas), grounding, sueño, depresión, regulación emocional y burnout. Lectura gratuita. Complementan — no diagnostican ni reemplazan — la terapia humana.',
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
    crisis: {
      text: 'Anto no sustituye terapia ni atención clínica profesional. Si estás en crisis, busca ayuda de emergencia en tu país.',
      linkLabel: 'Líneas de emergencia por país',
      linkHref: CRISIS_LINES_HREF,
      externalHint: 'Abre en una pestaña nueva',
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
