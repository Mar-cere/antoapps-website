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

export type NexusTabId = 'without-thread' | 'with-memory';

export type NexusActiveBeat = 'hero' | 'product-proof' | 'after';

export type NexusTabCopy = {
  id: NexusTabId;
  label: string;
  description: string;
};

export type NexusProductProofCopy = {
  kicker: string;
  title: string;
  dek: string;
  tabs: readonly NexusTabCopy[];
  userMessage: string;
  replies: readonly [string, string];
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
    title: string;
    dek: string;
    storeApp: string;
    storeGoogle: string;
    tryOutline: string;
    tryHref: string;
    micro: string;
    demoLink: string;
    demoHref: string;
  };
  productProof: NexusProductProofCopy;
  invite: {
    title: string;
    storeApp: string;
    storeGoogle: string;
    tryOutline: string;
    tryHref: string;
    micro: string;
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
        'Cada conversación forma la inteligencia que te comprende. Historial, recurrencia y un paso concreto. Complementa; no sustituye atención profesional.',
      keywords:
        'Anto Nexus, inteligencia adaptativa, acompañamiento emocional, contexto personal, aprendizaje continuo',
      openGraphTitle: 'Inside Anto Nexus',
      openGraphDescription:
        'Cada conversación forma la inteligencia que te comprende. Historial, recurrencia y un paso concreto.',
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
      title: 'No empiezas de cero cada noche.',
      dek: 'Lo que ya contaste entra en esta respuesta. No parte de un mensaje aislado.',
      storeApp: 'Descargar en App Store',
      storeGoogle: 'Disponible en Google Play',
      tryOutline: 'Probar Anto',
      tryHref: localePath('es', '/bienvenida'),
      micro: '1 día gratis · Sin tarjeta · Cancela cuando quieras',
      demoLink: 'O mira cómo empieza',
      demoHref: '#mismo-mensaje',
    },
    productProof: {
      kicker: 'En el teléfono',
      title: 'El mismo mensaje. Dos noches distintas.',
      dek: 'Anto no inventa quién eres. Usa lo que ya abriste.',
      tabs: [
        {
          id: 'without-thread',
          label: 'Sin hilo',
          description: 'Como si fuera la primera vez.',
        },
        {
          id: 'with-memory',
          label: 'Con memoria',
          description: 'Con lo de anoche todavía vivo.',
        },
      ],
      userMessage: 'No puedo dormir. Presentación el viernes y la cabeza no para.',
      replies: [
        'Suena agotador. ¿Qué pesa más ahora?',
        'Anoche también te costó dormir por la presentación. Esta noche solo abre la primera diapositiva. Dos minutos.',
      ],
    },
    invite: {
      title: 'Cuando quieras, empieza.',
      storeApp: 'Descargar en App Store',
      storeGoogle: 'Disponible en Google Play',
      tryOutline: 'Probar Anto',
      tryHref: localePath('es', '/bienvenida'),
      micro: '1 día gratis · Sin tarjeta · Cancela cuando quieras',
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
        'Every conversation shapes the intelligence that understands you. History, recurrence and a concrete step. Complements; does not replace professional care.',
      keywords:
        'Anto Nexus, adaptive intelligence, emotional companion, personal context, continuous learning',
      openGraphTitle: 'Inside Anto Nexus',
      openGraphDescription:
        'Every conversation shapes the intelligence that understands you. History, recurrence and a concrete step.',
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
      title: "You don't start from scratch every night.",
      dek: 'What you already shared enters this reply. It does not start from an isolated message.',
      storeApp: 'Download on the App Store',
      storeGoogle: 'Get it on Google Play',
      tryOutline: 'Try Anto',
      tryHref: localePath('en', '/bienvenida'),
      micro: '1 day free · No card · Cancel anytime',
      demoLink: 'Or see how it starts',
      demoHref: '#same-message',
    },
    productProof: {
      kicker: 'On the phone',
      title: 'Same message. Two different nights.',
      dek: "Anto doesn't invent who you are. It uses what you already opened.",
      tabs: [
        {
          id: 'without-thread',
          label: 'No thread',
          description: 'As if it were the first time.',
        },
        {
          id: 'with-memory',
          label: 'With memory',
          description: 'With last night still alive.',
        },
      ],
      userMessage: "Can't sleep. Presentation Friday and my head won't shut up.",
      replies: [
        'That sounds exhausting. What weighs most right now?',
        'Last night sleep was hard because of the presentation too. Tonight just open slide one. Two minutes.',
      ],
    },
    invite: {
      title: 'Start when you are ready.',
      storeApp: 'Download on the App Store',
      storeGoogle: 'Get it on Google Play',
      tryOutline: 'Try Anto',
      tryHref: localePath('en', '/bienvenida'),
      micro: '1 day free · No card · Cancel anytime',
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
