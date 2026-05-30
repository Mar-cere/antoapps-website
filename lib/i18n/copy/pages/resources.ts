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

const resourcesEs: ResourceItem[] = [
  {
    id: '1',
    title: 'Guía de Manejo de Ansiedad',
    description: 'Estrategias prácticas para manejar la ansiedad en el día a día',
    type: 'pdf',
    category: 'ansiedad',
    link: '#',
  },
  {
    id: '2',
    title: 'Técnicas de Mindfulness',
    description: 'Aprende técnicas de atención plena para reducir el estrés',
    type: 'ebook',
    category: 'mindfulness',
    link: '#',
  },
  {
    id: '3',
    title: 'Podcast: Salud Mental Digital',
    description: 'Episodio sobre el futuro de la salud mental con IA',
    type: 'podcast',
    category: 'tecnologia',
    link: '#',
  },
];

const resourcesEn: ResourceItem[] = [
  {
    id: '1',
    title: 'Anxiety Management Guide',
    description: 'Practical strategies for managing anxiety in daily life',
    type: 'pdf',
    category: 'anxiety',
    link: '#',
  },
  {
    id: '2',
    title: 'Mindfulness Techniques',
    description: 'Learn mindfulness techniques to reduce stress',
    type: 'ebook',
    category: 'mindfulness',
    link: '#',
  },
  {
    id: '3',
    title: 'Podcast: Digital Mental Health',
    description: 'Episode on the future of mental health with AI',
    type: 'podcast',
    category: 'technology',
    link: '#',
  },
];

function buildResourcesPageCopy(locale: Locale): ResourcesPageCopy {
  if (locale === 'en') {
    return {
      breadcrumbs: {
        homeLabel: 'Home',
        homeHref: localePath(locale, '/'),
        currentLabel: 'Resources',
      },
      meta: {
        title: 'Resources - Anto | Mental Health Resource Library',
        description:
          'Access our complete library of mental health resources: ebooks, PDF guides, videos, podcasts, checklists, and more.',
        openGraphTitle: 'Resources - Anto',
        openGraphDescription: 'Complete library of mental health resources.',
        canonicalPath: CANONICAL_PATH,
      },
      hero: {
        title: 'Resource Library',
        subtitle: 'Access our complete collection of educational resources on mental health',
      },
      library: {
        filters: [
          { id: 'all', label: 'All' },
          { id: 'ebook', label: 'Ebooks' },
          { id: 'pdf', label: 'PDF Guides' },
          { id: 'video', label: 'Videos' },
          { id: 'podcast', label: 'Podcasts' },
        ],
        searchPlaceholder: 'Search resources...',
        searchAriaLabel: 'Search resources',
        emptyMessage: 'No resources found with the current filters.',
        viewResourceLabel: 'View Resource',
        resources: resourcesEn,
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
      title: 'Recursos - Anto | Biblioteca de Recursos de Salud Mental',
      description:
        'Accede a nuestra biblioteca completa de recursos de salud mental: ebooks, guías PDF, videos, podcasts, checklists y más.',
      openGraphTitle: 'Recursos - Anto',
      openGraphDescription: 'Biblioteca completa de recursos de salud mental.',
      canonicalPath: CANONICAL_PATH,
    },
    hero: {
      title: 'Biblioteca de Recursos',
      subtitle: 'Accede a nuestra colección completa de recursos educativos sobre salud mental',
    },
    library: {
      filters: [
        { id: 'all', label: 'Todos' },
        { id: 'ebook', label: 'Ebooks' },
        { id: 'pdf', label: 'Guías PDF' },
        { id: 'video', label: 'Videos' },
        { id: 'podcast', label: 'Podcasts' },
      ],
      searchPlaceholder: 'Buscar recursos...',
      searchAriaLabel: 'Buscar recursos',
      emptyMessage: 'No se encontraron recursos con los filtros actuales.',
      viewResourceLabel: 'Ver Recurso',
      resources: resourcesEs,
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
