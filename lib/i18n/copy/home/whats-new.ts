import { APP_VERSION, APP_VERSION_LABEL } from '@/lib/app-version';
import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';

export type WhatsNewItem = {
  icon: string;
  title: string;
  description: string;
};

export type WhatsNewCopy = {
  title: string;
  subtitle: string;
  versionBadge: string;
  footnote: string;
  items: WhatsNewItem[];
  cta: {
    changelogLabel: string;
    changelogHref: string;
    appLabel: string;
    appHref: string;
  };
};

const whatsNewCopy: Record<Locale, WhatsNewCopy> = {
  es: {
    title: 'Novedades en Anto',
    subtitle: `Cambios recientes en la versión ${APP_VERSION}. El catálogo completo de funciones está en la sección siguiente.`,
    versionBadge: APP_VERSION_LABEL,
    footnote:
      'Escalas clínicas, protocolos, detección de crisis y más se describen en Características Principales — aquí solo destacamos lo nuevo en esta versión.',
    items: [
      {
        icon: '🌍',
        title: 'App bilingüe (ES/EN)',
        description:
          'Interfaz, chat, correos, notificaciones y checkout en tu idioma, con backend que responde en español o inglés.',
      },
      {
        icon: '💬',
        title: 'Modos y preferencias de respuesta',
        description:
          'Elige el enfoque del chat (práctico, exploratorio o estructurado) y ajusta el estilo cuando la app lo permita.',
      },
      {
        icon: '✨',
        title: 'Experiencia de uso refinada',
        description:
          'Chat más claro, resúmenes de sesión con fechas localizadas, diario de gratitud mejorado y navegación con soporte dark mode.',
      },
    ],
    cta: {
      changelogLabel: 'Ver historial completo →',
      changelogHref: localePath('es', '/changelog'),
      appLabel: 'Conocer la app →',
      appHref: localePath('es', '/app'),
    },
  },
  en: {
    title: 'What\'s New in Anto',
    subtitle: `Recent changes in version ${APP_VERSION}. The full feature set is in the next section.`,
    versionBadge: APP_VERSION_LABEL,
    footnote:
      'Clinical scales, protocols, crisis detection, and more are covered under Key Features — this block highlights what shipped in this version only.',
    items: [
      {
        icon: '🌍',
        title: 'Bilingual app (ES/EN)',
        description:
          'Interface, chat, emails, notifications, and checkout in your language, with a backend that replies in Spanish or English.',
      },
      {
        icon: '💬',
        title: 'Modes and response preferences',
        description:
          'Pick how the chat supports you (practical, exploratory, or structured) and tune the style when the app allows it.',
      },
      {
        icon: '✨',
        title: 'Refined day-to-day experience',
        description:
          'Clearer chat UI, session summaries with localised dates, an improved gratitude journal, and navigation with dark mode support.',
      },
    ],
    cta: {
      changelogLabel: 'View full history →',
      changelogHref: localePath('en', '/changelog'),
      appLabel: 'Explore the app →',
      appHref: localePath('en', '/app'),
    },
  },
};

export function getWhatsNewCopy(locale: Locale): WhatsNewCopy {
  return whatsNewCopy[locale];
}
