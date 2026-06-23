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
    subtitle: `Lo más reciente en la versión ${APP_VERSION}: un home más humano y herramientas que conectan con tu día a día.`,
    versionBadge: APP_VERSION_LABEL,
    footnote:
      'Escalas PHQ-9/GAD-7, protocolos estructurados y detección de crisis siguen disponibles en Características.',
    items: [
      {
        icon: '🏠',
        title: 'Home y dashboard renovados',
        description:
          'Insight inicial personalizado, racha de ecosistema centrada en el chat y un panel de foco más claro para empezar el día.',
      },
      {
        icon: '🧰',
        title: 'Hub de técnicas terapéuticas',
        description:
          'Catálogo completo de técnicas en la navegación, acceso rápido, lienzo ABC interactivo y conexión con el grafo de insights.',
      },
      {
        icon: '✅',
        title: 'Tareas y hábitos unificados',
        description:
          'Una sola pantalla para organizar tu rutina, con tono de bienestar, Pomodoro al enfocar una tarea y copy más humano.',
      },
      {
        icon: '📊',
        title: 'Resumen e informe accionables',
        description:
          '«Lo que te ayuda» navegable, WAI post-sesión (alianza terapéutica) y memoria de temas recurrentes en el chat.',
      },
      {
        icon: '🔐',
        title: 'Sesión persistente y onboarding',
        description:
          'Vuelve a la app sin reingresar contraseña cada vez; onboarding rediseñado con beneficios, validación y tema claro/oscuro.',
      },
      {
        icon: '💬',
        title: 'Chat más robusto',
        description:
          'Sugerencias que persisten al reabrir, mejor manejo de pensamientos intrusivos y señales ampliadas (anhedonia, imagen corporal, bullying).',
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
    subtitle: `The latest in version ${APP_VERSION}: a more human home and tools that connect to your daily routine.`,
    versionBadge: APP_VERSION_LABEL,
    footnote:
      'PHQ-9/GAD-7 scales, structured protocols, and crisis detection remain available in Features.',
    items: [
      {
        icon: '🏠',
        title: 'Renewed home and dashboard',
        description:
          'Personalized home insight, chat-centered ecosystem streak, and a clearer focus panel to start your day.',
      },
      {
        icon: '🧰',
        title: 'Therapeutic techniques hub',
        description:
          'Full techniques catalog in navigation, quick access, interactive ABC canvas, and connection to the insights graph.',
      },
      {
        icon: '✅',
        title: 'Unified tasks and habits',
        description:
          'One screen to organize your routine, with wellness tone, Pomodoro when focusing a task, and more human copy.',
      },
      {
        icon: '📊',
        title: 'Actionable summary and report',
        description:
          'Navigable "what helps you", post-session WAI (therapeutic alliance), and recurring topic memory in chat.',
      },
      {
        icon: '🔐',
        title: 'Persistent session and onboarding',
        description:
          'Return without re-entering your password every time; redesigned onboarding with benefits, validation, and light/dark theme.',
      },
      {
        icon: '💬',
        title: 'More robust chat',
        description:
          'Suggestions persist when reopening, better handling of intrusive thoughts, and expanded signals (anhedonia, body image, bullying).',
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
