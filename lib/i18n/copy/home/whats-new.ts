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
    subtitle: `Lo más reciente en la versión ${APP_VERSION} y la línea 1.4.x — más allá del chat básico.`,
    versionBadge: APP_VERSION_LABEL,
    items: [
      {
        icon: '🌍',
        title: 'App bilingüe (ES/EN)',
        description:
          'Interfaz, chat, correos, notificaciones push y checkout en español e inglés, con backend consciente del idioma.',
      },
      {
        icon: '💬',
        title: 'Modos de conversación',
        description:
          'Distintos enfoques según lo que necesites: orientación práctica, exploración emocional o acompañamiento estructurado.',
      },
      {
        icon: '🏥',
        title: 'Escalas PHQ-9 y GAD-7',
        description:
          'Evaluación automática con escalas clínicas validadas para depresión y ansiedad, con historial y tendencias.',
      },
      {
        icon: '🧠',
        title: '15 distorsiones cognitivas',
        description:
          'Detección durante el chat con intervenciones sugeridas para patrones como catastrofismo o pensamiento todo-o-nada.',
      },
      {
        icon: '📋',
        title: '8 protocolos estructurados',
        description:
          'Rutas basadas en evidencia para depresión, ansiedad, trauma, TOC, TEPT, ira, autocompasión e higiene del sueño.',
      },
      {
        icon: '✅',
        title: 'Tareas y hábitos',
        description:
          'Organiza actividades terapéuticas, establece recordatorios y sigue rutinas saludables vinculadas a tu bienestar.',
      },
      {
        icon: '📝',
        title: 'Diario de gratitud y resúmenes',
        description:
          'Herramientas diarias de reflexión y continuidad entre sesiones con resúmenes localizados en tu idioma.',
      },
      {
        icon: '🎁',
        title: 'Prueba de 1 día',
        description:
          'Explora todas las funciones premium antes de suscribirte. Cancela cuando quieras desde App Store.',
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
    subtitle: `The latest in version ${APP_VERSION} and the 1.4.x line — beyond basic chat.`,
    versionBadge: APP_VERSION_LABEL,
    items: [
      {
        icon: '🌍',
        title: 'Bilingual app (ES/EN)',
        description:
          'Interface, chat, emails, push notifications, and checkout in Spanish and English, with a language-aware backend.',
      },
      {
        icon: '💬',
        title: 'Conversation modes',
        description:
          'Different approaches depending on what you need: practical guidance, emotional exploration, or structured support.',
      },
      {
        icon: '🏥',
        title: 'PHQ-9 and GAD-7 scales',
        description:
          'Automatic assessment with validated clinical scales for depression and anxiety, with history and trends.',
      },
      {
        icon: '🧠',
        title: '15 cognitive distortions',
        description:
          'Detection during chat with suggested interventions for patterns like catastrophising or all-or-nothing thinking.',
      },
      {
        icon: '📋',
        title: '8 structured protocols',
        description:
          'Evidence-based paths for depression, anxiety, trauma, OCD, PTSD, anger, self-compassion, and sleep hygiene.',
      },
      {
        icon: '✅',
        title: 'Tasks and habits',
        description:
          'Organise therapeutic activities, set reminders, and track healthy routines linked to your wellbeing.',
      },
      {
        icon: '📝',
        title: 'Gratitude journal and summaries',
        description:
          'Daily reflection tools and continuity between sessions with summaries localised in your language.',
      },
      {
        icon: '🎁',
        title: '1-day trial',
        description:
          'Explore all premium features before subscribing. Cancel anytime from the App Store.',
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
