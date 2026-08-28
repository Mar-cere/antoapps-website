import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n/config';
import { buildLocalizedPageMetadata } from '@/lib/i18n/metadata';

const CANONICAL_PATH = '/nexus';

export type NexusNavItem = {
  href: string;
  label: string;
};

export type NexusEventCopy = {
  id: 'memory' | 'pattern' | 'knowledge' | 'strategy';
  title: string;
  subtitle: string;
};

export type NexusPageCopy = {
  skip: string;
  meta: {
    title: string;
    description: string;
    keywords: string;
    openGraphTitle: string;
    openGraphDescription: string;
    canonicalPath: string;
    ogAlt: string;
  };
  nav: {
    aria: string;
    logoAria: string;
    wordmark: string;
    menuLabel: string;
    menuClose: string;
    items: readonly NexusNavItem[];
    cta: string;
    ctaHref: string;
  };
  hero: {
    eyebrow: string;
    line1: string;
    line2: string;
    line3Prefix: string;
    highlight: string;
    supportLines: readonly string[];
  };
  status: {
    active: string;
    thinking: string;
    liveAria: string;
  };
  events: readonly NexusEventCopy[];
  aside: string;
  organismAria: string;
};

const copyByLocale: Record<Locale, NexusPageCopy> = {
  es: {
    skip: 'Saltar al contenido',
    meta: {
      title: 'Inside Anto Nexus | Anto',
      description:
        'Cada conversación forma la inteligencia que te comprende. Mira cómo Anto conecta conocimiento, contexto y aprendizaje en un sistema vivo.',
      keywords:
        'Anto Nexus, inteligencia adaptativa, acompañamiento emocional, contexto personal, aprendizaje continuo',
      openGraphTitle: 'Inside Anto Nexus',
      openGraphDescription:
        'Cada conversación forma la inteligencia que te comprende. Un sistema que conecta conocimiento, contexto y aprendizaje.',
      canonicalPath: CANONICAL_PATH,
      ogAlt: 'Inside Anto Nexus. Cada conversación forma la inteligencia que te comprende.',
    },
    nav: {
      aria: 'Navegación de Nexus',
      logoAria: 'Anto, ir al inicio',
      wordmark: 'anto.',
      menuLabel: 'Abrir menú',
      menuClose: 'Cerrar menú',
      items: [
        { href: localePath('es', '/app'), label: 'Cómo funciona' },
        { href: localePath('es', '/investigacion'), label: 'Ciencia' },
        { href: localePath('es', '/seguridad'), label: 'Seguridad' },
        { href: localePath('es', '/desarrollo'), label: 'Evolución' },
        { href: localePath('es', '/sobre-nosotros'), label: 'Sobre Anto' },
      ],
      cta: 'Probar Anto',
      ctaHref: localePath('es', '/bienvenida'),
    },
    hero: {
      eyebrow: 'Inside Anto Nexus',
      line1: 'Cada conversación',
      line2: 'forma la inteligencia',
      line3Prefix: 'que ',
      highlight: 'te comprende.',
      supportLines: [
        'Anto conecta conocimiento psicológico,',
        'contexto personal y aprendizaje continuo',
        'para entender lo que importa ahora',
        'y encontrar el camino más útil.',
      ],
    },
    status: {
      active: 'Sistema activo',
      thinking: 'Nexus está pensando',
      liveAria: 'Estado del sistema: activo. Nexus está pensando.',
    },
    events: [
      { id: 'memory', title: 'Recuerdo recuperado', subtitle: 'Un hilo de esta conversación' },
      { id: 'pattern', title: 'Patrón conectado', subtitle: 'Una señal que se repite' },
      { id: 'strategy', title: 'Estrategia elegida', subtitle: 'El siguiente paso más útil' },
    ],
    aside: 'Nexus no solo recuerda. Sigue construyendo contexto.',
    organismAria: 'Visualización decorativa de un campo de inteligencia en movimiento.',
  },
  en: {
    skip: 'Skip to content',
    meta: {
      title: 'Inside Anto Nexus | Anto',
      description:
        'Every conversation shapes the intelligence that understands you. Watch how Anto connects knowledge, personal context and continuous learning in a living system.',
      keywords:
        'Anto Nexus, adaptive intelligence, emotional companion, personal context, continuous learning',
      openGraphTitle: 'Inside Anto Nexus',
      openGraphDescription:
        'Every conversation shapes the intelligence that understands you. A system that connects knowledge, context and learning.',
      canonicalPath: CANONICAL_PATH,
      ogAlt: 'Inside Anto Nexus. Every conversation shapes the intelligence that understands you.',
    },
    nav: {
      aria: 'Nexus navigation',
      logoAria: 'Anto, go to home',
      wordmark: 'anto.',
      menuLabel: 'Open menu',
      menuClose: 'Close menu',
      items: [
        { href: localePath('en', '/app'), label: 'How it works' },
        { href: localePath('en', '/investigacion'), label: 'Science' },
        { href: localePath('en', '/seguridad'), label: 'Safety' },
        { href: localePath('en', '/desarrollo'), label: 'Roadmap' },
        { href: localePath('en', '/sobre-nosotros'), label: 'About Anto' },
      ],
      cta: 'Try Anto',
      ctaHref: localePath('en', '/bienvenida'),
    },
    hero: {
      eyebrow: 'Inside Anto Nexus',
      line1: 'Every conversation',
      line2: 'shapes the intelligence',
      line3Prefix: 'that ',
      highlight: 'understands you.',
      supportLines: [
        'Anto connects psychological knowledge,',
        'personal context and continuous learning',
        'to understand what matters now',
        'and find the most useful way forward.',
      ],
    },
    status: {
      active: 'System active',
      thinking: 'Nexus is thinking',
      liveAria: 'System status: active. Nexus is thinking.',
    },
    events: [
      { id: 'memory', title: 'Memory recalled', subtitle: 'A thread from this conversation' },
      { id: 'pattern', title: 'Pattern connected', subtitle: 'A signal that keeps returning' },
      { id: 'strategy', title: 'Strategy selected', subtitle: 'The most useful next step' },
    ],
    aside: 'Nexus does not just remember. It keeps building context.',
    organismAria: 'Decorative visualization of a living intelligence field in motion.',
  },
};

export function getNexusPageCopy(locale: Locale): NexusPageCopy {
  return copyByLocale[locale];
}

export function nexusPageMetadata(locale: Locale): Metadata {
  const { meta } = copyByLocale[locale];
  return buildLocalizedPageMetadata(locale, meta.canonicalPath, {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.openGraphTitle,
      description: meta.openGraphDescription,
    },
  });
}
