import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n/config';
import { buildLocalizedPageMetadata } from '@/lib/i18n/metadata';
import { getTrialCopy } from '@/lib/i18n/copy/trial';

export type AppPageMetadata = {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
  };
};

export type AppBenefitCard = {
  icon: string;
  label: string;
  description: string;
};

export type AppPageCopy = {
  breadcrumbs: { homeLabel: string; homeHref: string; currentLabel: string };
  hero: {
    title: string;
    subtitle: string;
    githubLinkText: string;
    badges: {
      versionLabel: string;
      availability: string;
      privacy: string;
      languages: string;
    };
  };
  whatIs: {
    title: string;
    body: string;
  };
  benefits: {
    title: string;
    subtitle: string;
    cards: AppBenefitCard[];
  };
  latestUpdates: {
    title: string;
    subtitle: string;
    cards: AppBenefitCard[];
    note: {
      beforeChangelog: string;
      changelogLabel: string;
      changelogHref: string;
      betweenChangelogBienvenida: string;
      bienvenidaLabel: string;
      bienvenidaHref: string;
      betweenBienvenidaPrivacidad: string;
      privacidadLabel: string;
      privacidadHref: string;
      afterPrivacidad: string;
    };
  };
  featuresLink: {
    title: string;
    subtitle: string;
    label: string;
    href: string;
  };
  cta: {
    title: string;
    subtitle: string;
    downloadLabel: string;
    downloadHref: string;
    contactLabel: string;
    contactHref: string;
  };
};

const metadataByLocale: Record<Locale, AppPageMetadata> = {
  es: {
    title: 'La Aplicación - Anto | Qué es y qué te aporta',
    description:
      'Conoce Anto: aplicación de bienestar emocional con acompañamiento por IA, privacidad y herramientas para tu día a día. Versión {versionLabel}.',
    openGraph: {
      title: 'La Aplicación - Anto',
      description: 'Qué es Anto, sus beneficios y cómo puede acompañarte en tu bienestar emocional.',
      url: 'https://antoapps.com/app',
    },
  },
  en: {
    title: 'The App - Anto | What it is and how it helps',
    description:
      'Meet Anto: an emotional wellness app with AI support, privacy, and tools for everyday care. Version {versionLabel}.',
    openGraph: {
      title: 'The App - Anto',
      description: 'What Anto is, its benefits, and how it can support your emotional wellbeing.',
      url: 'https://antoapps.com/en/app',
    },
  },
};

function buildAppPageCopy(locale: Locale): AppPageCopy {
  const trial = getTrialCopy(locale);
  const isEn = locale === 'en';
  const featuresHref = localePath(locale, '/#caracteristicas');

  if (isEn) {
    return {
      breadcrumbs: {
        homeLabel: 'Home',
        homeHref: localePath(locale, '/'),
        currentLabel: 'The App',
      },
      hero: {
        title: 'Your emotional wellness, in your pocket',
        subtitle:
          'Anto is a mobile app that accompanies you with guided conversation, self-care tools, and support when you need it most. Current version {version}.',
        githubLinkText: 'Open-source code on GitHub',
        badges: {
          versionLabel: '{versionLabel}',
          availability: '⏰ Available 24/7',
          privacy: '🔒 Private by design',
          languages: '🌍 Spanish and English',
        },
      },
      whatIs: {
        title: 'What is Anto?',
        body: 'It is not a replacement for therapy or clinical care. It is a daily companion: you write how you feel, receive clear guidance, and build habits that support your wellbeing—with respect for your privacy and your pace.',
      },
      benefits: {
        title: 'Why use Anto',
        subtitle: 'Benefits you feel from the first conversations—not a feature checklist.',
        cards: [
          {
            icon: '💬',
            label: 'Someone to talk to, anytime',
            description:
              'Open the app when your mind races or you need clarity. No appointments or waiting lists.',
          },
          {
            icon: '🎯',
            label: 'Guidance that fits you',
            description:
              'Responses adapt to what you share: practical steps, emotional exploration, or structured support.',
          },
          {
            icon: '🔒',
            label: 'A safe space',
            description:
              'Your conversations stay confidential. You control what you share and how you use the app.',
          },
          {
            icon: '🧘',
            label: 'Tools for everyday life',
            description:
              'Tasks, habits, journaling, and reminders that connect with how you actually feel—not abstract theory.',
          },
          {
            icon: '📈',
            label: 'See your progress',
            description:
              'Trends and summaries help you notice patterns and celebrate small wins over time.',
          },
          {
            icon: '🚨',
            label: 'Support in difficult moments',
            description:
              'If the app detects risk signals, it can guide you toward resources and people you trust.',
          },
        ],
      },
      latestUpdates: {
        title: 'What we have been improving',
        subtitle: 'A quick look at recent changes in the app and on this site.',
        cards: [
          {
            icon: '🆕',
            label: 'Clearer welcome experience',
            description: 'Onboarding that explains the value of Anto before you download.',
          },
          {
            icon: '🔒',
            label: 'More privacy transparency',
            description: 'Easier access to the privacy policy from key flows.',
          },
          {
            icon: '📌',
            label: 'Version history',
            description: 'Changelog aligned with the version published in the stores.',
          },
        ],
        note: {
          beforeChangelog: 'Full detail in the',
          changelogLabel: 'Changelog',
          changelogHref: localePath(locale, '/changelog'),
          betweenChangelogBienvenida: ', explore the',
          bienvenidaLabel: 'Welcome',
          bienvenidaHref: localePath(locale, '/bienvenida'),
          betweenBienvenidaPrivacidad: ' flow, and read',
          privacidadLabel: 'Privacy',
          privacidadHref: localePath(locale, '/privacidad'),
          afterPrivacidad: ' policy.',
        },
      },
      featuresLink: {
        title: 'Looking for the full feature list?',
        subtitle:
          'Clinical scales, protocols, conversation modes, and technical details live on the home page.',
        label: 'View all features',
        href: featuresHref,
      },
      cta: {
        title: 'Ready to try Anto?',
        subtitle: `Download the app and start at your own pace. ${trial.heroNote}`,
        downloadLabel: 'Download',
        downloadHref: localePath(locale, '/bienvenida'),
        contactLabel: 'Contact',
        contactHref: localePath(locale, '/contacto'),
      },
    };
  }

  return {
    breadcrumbs: {
      homeLabel: 'Inicio',
      homeHref: localePath(locale, '/'),
      currentLabel: 'La Aplicación',
    },
    hero: {
      title: 'Tu bienestar emocional, en el bolsillo',
      subtitle:
        'Anto es una aplicación móvil que te acompaña con conversación guiada, herramientas de autocuidado y apoyo cuando más lo necesitas. Versión actual {version}.',
      githubLinkText: 'Código abierto en GitHub',
      badges: {
        versionLabel: '{versionLabel}',
        availability: '⏰ Disponible 24/7',
        privacy: '🔒 Privacidad primero',
        languages: '🌍 Español e inglés',
      },
    },
    whatIs: {
      title: '¿Qué es Anto?',
      body: 'No sustituye terapia ni atención clínica. Es un acompañante para el día a día: escribes cómo te sientes, recibes orientación clara y construyes hábitos que cuidan tu bienestar, con respeto por tu privacidad y tu ritmo.',
    },
    benefits: {
      title: 'Por qué usar Anto',
      subtitle: 'Beneficios que notas desde las primeras conversaciones, no un listado técnico.',
      cards: [
        {
          icon: '💬',
          label: 'Alguien con quien hablar, siempre',
          description:
            'Abre la app cuando tu mente va a mil o necesitas claridad. Sin citas ni listas de espera.',
        },
        {
          icon: '🎯',
          label: 'Guía que se adapta a ti',
          description:
            'Las respuestas se ajustan a lo que compartes: pasos prácticos, exploración emocional o apoyo estructurado.',
        },
        {
          icon: '🔒',
          label: 'Un espacio seguro',
          description:
            'Tus conversaciones son confidenciales. Tú decides qué compartir y cómo usar la app.',
        },
        {
          icon: '🧘',
          label: 'Herramientas para el día a día',
          description:
            'Tareas, hábitos, diario y recordatorios conectados con cómo te sientes de verdad.',
        },
        {
          icon: '📈',
          label: 'Ver tu progreso',
          description:
            'Tendencias y resúmenes te ayudan a notar patrones y celebrar avances pequeños.',
        },
        {
          icon: '🚨',
          label: 'Apoyo en momentos difíciles',
          description:
            'Si detectamos señales de riesgo, la app puede orientarte hacia recursos y personas de confianza.',
        },
      ],
    },
    latestUpdates: {
      title: 'Qué hemos ido mejorando',
      subtitle: 'Un vistazo breve a cambios recientes en la app y en este sitio.',
      cards: [
        {
          icon: '🆕',
          label: 'Bienvenida más clara',
          description: 'Onboarding que explica el valor de Anto antes de descargar.',
        },
        {
          icon: '🔒',
          label: 'Más transparencia de privacidad',
          description: 'Acceso más directo a la política de privacidad en flujos clave.',
        },
        {
          icon: '📌',
          label: 'Historial de versiones',
          description: 'Changelog alineado con la versión publicada en las tiendas.',
        },
      ],
      note: {
        beforeChangelog: 'Detalle completo en',
        changelogLabel: 'Control de Versiones',
        changelogHref: localePath(locale, '/changelog'),
        betweenChangelogBienvenida: ', conoce el flujo de',
        bienvenidaLabel: 'Bienvenida',
        bienvenidaHref: localePath(locale, '/bienvenida'),
        betweenBienvenidaPrivacidad: ' y consulta',
        privacidadLabel: 'Privacidad',
        privacidadHref: localePath(locale, '/privacidad'),
        afterPrivacidad: '.',
      },
    },
    featuresLink: {
      title: '¿Buscas el detalle de funciones?',
      subtitle:
        'Escalas clínicas, protocolos, modos de conversación y especificaciones están en la sección Características del inicio.',
      label: 'Ver todas las características',
      href: featuresHref,
    },
    cta: {
      title: '¿Listo para probar Anto?',
      subtitle: `Descarga la app y empieza a tu ritmo. ${trial.heroNote}`,
      downloadLabel: 'Descargar',
      downloadHref: localePath(locale, '/bienvenida'),
      contactLabel: 'Contactar',
      contactHref: localePath(locale, '/contacto'),
    },
  };
}

const appPageCopyCache: Partial<Record<Locale, AppPageCopy>> = {};

export function appPageMetadata(locale: Locale, versionLabel?: string): Metadata {
  const meta = metadataByLocale[locale];
  const description = versionLabel
    ? meta.description.replace('{versionLabel}', versionLabel)
    : meta.description;

  return buildLocalizedPageMetadata(locale, '/app', {
    title: meta.title,
    description,
    openGraph: meta.openGraph,
  });
}

export function getAppPageCopy(locale: Locale): AppPageCopy {
  if (!appPageCopyCache[locale]) {
    appPageCopyCache[locale] = buildAppPageCopy(locale);
  }
  return appPageCopyCache[locale]!;
}
