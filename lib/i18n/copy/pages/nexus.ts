import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n/config';
import { buildLocalizedPageMetadata } from '@/lib/i18n/metadata';

const CANONICAL_PATH = '/nexus';

export type NexusNavItem = {
  href: string;
  label: string;
};

export type NexusEventCopy = {
  id: 'memory' | 'pattern' | 'strategy';
  title: string;
  subtitle: string;
};

export type NexusBeatId = 'memory' | 'pattern' | 'strategy';

export type NexusActiveBeat = 'hero' | NexusBeatId | 'after';

export type NexusBeatCopy = {
  id: NexusBeatId;
  title: string;
  paragraphs: readonly string[];
};

export type NexusTrustItem = {
  id: 'privacy' | 'science' | 'limits';
  title: string;
  body: string;
  href: string;
  linkLabel: string;
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
  sequence: {
    aria: string;
    beats: readonly NexusBeatCopy[];
  };
  bridge: {
    lead: string;
    promise: string;
  };
  invite: {
    title: string;
    cta: string;
    ctaHref: string;
    limit: string;
  };
  trust: {
    aria: string;
    items: readonly NexusTrustItem[];
  };
  organismAria: string;
};

const copyByLocale: Record<Locale, NexusPageCopy> = {
  es: {
    skip: 'Saltar al contenido',
    meta: {
      title: 'Inside Anto Nexus | Anto',
      description:
        'Cada conversación forma la inteligencia que te comprende. Recuerdo, patrón y estrategia en un sistema vivo. Complementa; no sustituye atención profesional.',
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
        'No responde a un mensaje aislado.',
        'Recupera el contexto previo y lo usa en este turno.',
      ],
    },
    status: {
      active: 'Sistema activo',
      thinking: 'Nexus está pensando',
      liveAria: 'Estado del sistema: activo. Nexus está pensando.',
    },
    events: [
      { id: 'memory', title: 'Recuerdo recuperado', subtitle: 'Contexto de esta conversación' },
      { id: 'pattern', title: 'Patrón conectado', subtitle: 'Recurrencia en el proceso' },
      { id: 'strategy', title: 'Estrategia elegida', subtitle: 'Siguiente movimiento útil' },
    ],
    sequence: {
      aria: 'Cómo Nexus usa un recuerdo, un patrón y una estrategia',
      beats: [
        {
          id: 'memory',
          title: 'Recupera el hilo',
          paragraphs: [
            'El insomnio de anoche. La conversación que no cerraste.',
            'Anto recupera el contexto previo, lo que sigue abierto, y lo incorpora a este turno.',
            'La respuesta se apoya en ese historial, no en el último mensaje aislado.',
          ],
        },
        {
          id: 'pattern',
          title: 'Nombra lo que se repite',
          paragraphs: [
            'La misma prisa al anochecer. El mismo nudo cuando hablas de casa.',
            'Lee la recurrencia en el proceso. No etiqueta a la persona; nombra lo que vuelve.',
            'Eso permite responder al estado actual, no solo al texto de este segundo.',
          ],
        },
        {
          id: 'strategy',
          title: 'Elige el siguiente paso',
          paragraphs: [
            'Una pregunta precisa. Un límite. Un paso que se puede dar ahora.',
            'Con memoria y patrón, selecciona el siguiente movimiento más útil para este momento.',
            'No genera un discurso. Elige una dirección concreta para actuar ahora.',
          ],
        },
      ],
    },
    bridge: {
      lead: 'Nexus no solo recuerda. Integra cada turno al contexto que ya existe.',
      promise: 'Por eso no vuelves a empezar de cero.',
    },
    invite: {
      title: 'Cuando quieras, empieza.',
      cta: 'Probar Anto',
      ctaHref: localePath('es', '/bienvenida'),
      limit: 'Anto no sustituye terapia ni atención clínica.',
    },
    trust: {
      aria: 'Privacidad, ciencia y límites',
      items: [
        {
          id: 'privacy',
          title: 'Privacidad',
          body: 'Las conversaciones van cifradas. Solo tú inicias sesión en tu cuenta.',
          href: localePath('es', '/seguridad'),
          linkLabel: 'Seguridad',
        },
        {
          id: 'science',
          title: 'Ciencia',
          body: 'Anto se informa en literatura clínica y nombra sus límites. No afirma ensayos propios.',
          href: localePath('es', '/investigacion'),
          linkLabel: 'Investigación',
        },
        {
          id: 'limits',
          title: 'Límites',
          body: 'No diagnostica ni sustituye a un profesional. Si estás en crisis, busca ayuda de emergencia en tu país.',
          href: localePath('es', '/seguridad'),
          linkLabel: 'Límites clínicos',
        },
      ],
    },
    organismAria: 'Visualización decorativa de un campo de inteligencia en movimiento.',
  },
  en: {
    skip: 'Skip to content',
    meta: {
      title: 'Inside Anto Nexus | Anto',
      description:
        'Every conversation shapes the intelligence that understands you. Memory, pattern and strategy in a living system. Complements; does not replace professional care.',
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
        'It does not answer an isolated message.',
        'It retrieves prior context and uses it in this reply.',
      ],
    },
    status: {
      active: 'System active',
      thinking: 'Nexus is thinking',
      liveAria: 'System status: active. Nexus is thinking.',
    },
    events: [
      { id: 'memory', title: 'Memory recalled', subtitle: 'Context from this conversation' },
      { id: 'pattern', title: 'Pattern connected', subtitle: 'Recurrence in the process' },
      { id: 'strategy', title: 'Strategy selected', subtitle: 'Most useful next move' },
    ],
    sequence: {
      aria: 'How Nexus uses a memory, a pattern and a strategy',
      beats: [
        {
          id: 'memory',
          title: 'Recovers the thread',
          paragraphs: [
            'Last night without sleep. The conversation you did not close.',
            'Anto retrieves prior context, what remains open, and brings it into this reply.',
            'The answer rests on that history, not on the last isolated message.',
          ],
        },
        {
          id: 'pattern',
          title: 'Names what repeats',
          paragraphs: [
            'The same rush at dusk. The same knot when home comes up.',
            'It reads recurrence in the process. It does not label the person; it names what returns.',
            'That lets it answer the current state, not only the text of this second.',
          ],
        },
        {
          id: 'strategy',
          title: 'Chooses the next step',
          paragraphs: [
            'A precise question. A boundary. A step you can take now.',
            'With memory and pattern, it selects the most useful next move for this moment.',
            'It does not generate a speech. It chooses a concrete direction to act on now.',
          ],
        },
      ],
    },
    bridge: {
      lead: 'Nexus does not just remember. It incorporates each reply into the context that already exists.',
      promise: 'That is why you do not start from scratch again.',
    },
    invite: {
      title: 'Start when you are ready.',
      cta: 'Try Anto',
      ctaHref: localePath('en', '/bienvenida'),
      limit: 'Anto does not replace therapy or clinical care.',
    },
    trust: {
      aria: 'Privacy, science and limits',
      items: [
        {
          id: 'privacy',
          title: 'Privacy',
          body: 'Conversations are encrypted. Only you sign in to your account.',
          href: localePath('en', '/seguridad'),
          linkLabel: 'Safety',
        },
        {
          id: 'science',
          title: 'Science',
          body: 'Anto is informed by clinical literature and names its limits. It does not claim trials of its own.',
          href: localePath('en', '/investigacion'),
          linkLabel: 'Research',
        },
        {
          id: 'limits',
          title: 'Limits',
          body: 'It does not diagnose or replace a professional. If you are in crisis, seek emergency help in your country.',
          href: localePath('en', '/seguridad'),
          linkLabel: 'Clinical limits',
        },
      ],
    },
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
