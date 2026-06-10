import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n/config';
import { buildLocalizedPageMetadata } from '@/lib/i18n/metadata';

const CANONICAL_PATH = '/recursos';

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
  library: {
    filters: ResourceFilter[];
    searchPlaceholder: string;
    searchAriaLabel: string;
    emptyMessage: string;
    viewResourceLabel: string;
    resources: ResourceItem[];
  };
};

function resourcesForLocale(locale: Locale): ResourceItem[] {
  if (locale === 'en') {
    return [
      {
        id: '1',
        title: 'What are PHQ-9 and GAD-7 scales?',
        description:
          'Guide to the validated clinical scales Anto uses for depression and anxiety tracking, with scientific context.',
        type: 'guia',
        category: 'clinical',
        link: localePath(locale, '/investigacion'),
      },
      {
        id: '2',
        title: 'Anto app features (v1.4.1)',
        description:
          'Overview of conversation modes, bilingual support, structured protocols, tasks, habits, and more.',
        type: 'guia',
        category: 'producto',
        link: localePath(locale, '/app'),
      },
      {
        id: '3',
        title: 'Version history and updates',
        description:
          'Full public changelog: i18n, chat UX, 1-day trial, clinical scales, and structured protocols.',
        type: 'guia',
        category: 'producto',
        link: localePath(locale, '/changelog'),
      },
      {
        id: '4',
        title: 'Security and privacy',
        description:
          'How Anto protects your data: encryption, authentication, and privacy practices explained.',
        type: 'guia',
        category: 'privacidad',
        link: localePath(locale, '/seguridad'),
      },
      {
        id: '5',
        title: 'Scientific evidence',
        description:
          'Studies on digital mental health, therapeutic chatbots, and mobile interventions that support Anto\'s approach.',
        type: 'guia',
        category: 'clinical',
        link: localePath(locale, '/investigacion'),
      },
      {
        id: '6',
        title: 'Frequently asked questions',
        description:
          'Answers about the AI assistant, clinical scales, conversation modes, pricing, and the 1-day trial.',
        type: 'guia',
        category: 'producto',
        link: localePath(locale, '/recursos'),
      },
    ];
  }

  return [
    {
      id: '1',
      title: '¿Qué son las escalas PHQ-9 y GAD-7?',
      description:
        'Guía sobre las escalas clínicas validadas que Anto usa para seguimiento de depresión y ansiedad, con contexto científico.',
      type: 'guia',
      category: 'clinical',
      link: localePath(locale, '/investigacion'),
    },
    {
      id: '2',
      title: 'Funcionalidades de Anto (v1.4.1)',
      description:
        'Resumen de modos de conversación, soporte bilingüe, protocolos estructurados, tareas, hábitos y más.',
      type: 'guia',
      category: 'producto',
      link: localePath(locale, '/app'),
    },
    {
      id: '3',
      title: 'Historial de versiones y novedades',
      description:
        'Changelog público completo: i18n, UX de chat, prueba 1 día, escalas clínicas y protocolos estructurados.',
      type: 'guia',
      category: 'producto',
      link: localePath(locale, '/changelog'),
    },
    {
      id: '4',
      title: 'Seguridad y privacidad',
      description:
        'Cómo Anto protege tus datos: cifrado, autenticación y prácticas de privacidad explicadas.',
      type: 'guia',
      category: 'privacidad',
      link: localePath(locale, '/seguridad'),
    },
    {
      id: '5',
      title: 'Evidencia científica',
      description:
        'Estudios sobre salud mental digital, chatbots terapéuticos e intervenciones móviles que respaldan el enfoque de Anto.',
      type: 'guia',
      category: 'clinical',
      link: localePath(locale, '/investigacion'),
    },
    {
      id: '6',
      title: 'Preguntas frecuentes',
      description:
        'Respuestas sobre el asistente IA, escalas clínicas, modos de conversación, precios y la prueba de 1 día.',
      type: 'guia',
      category: 'producto',
      link: localePath(locale, '/recursos'),
    },
  ];
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
        title: 'Resources - Anto | Mental Health Guides and References',
        description:
          'Guides on PHQ-9/GAD-7 scales, Anto features, scientific evidence, security, and FAQs for emotional wellness with AI.',
        openGraphTitle: 'Resources - Anto',
        openGraphDescription:
          'Guides and references on clinical scales, Anto features, and mental wellness with AI.',
        canonicalPath: CANONICAL_PATH,
      },
      hero: {
        title: 'Resource Library',
        subtitle:
          'Guides and references about Anto, clinical scales, scientific evidence, and emotional wellness',
      },
      library: {
        filters: [
          { id: 'all', label: 'All' },
          { id: 'guia', label: 'Guides' },
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
      title: 'Recursos - Anto | Guías y Referencias de Salud Mental',
      description:
        'Guías sobre escalas PHQ-9/GAD-7, funcionalidades de Anto, evidencia científica, seguridad y preguntas frecuentes sobre bienestar emocional con IA.',
      openGraphTitle: 'Recursos - Anto',
      openGraphDescription:
        'Guías y referencias sobre escalas clínicas, funcionalidades de Anto y bienestar emocional con IA.',
      canonicalPath: CANONICAL_PATH,
    },
    hero: {
      title: 'Biblioteca de Recursos',
      subtitle:
        'Guías y referencias sobre Anto, escalas clínicas, evidencia científica y bienestar emocional',
    },
    library: {
      filters: [
        { id: 'all', label: 'Todos' },
        { id: 'guia', label: 'Guías' },
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
