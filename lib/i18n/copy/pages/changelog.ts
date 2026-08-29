import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n/config';
import { APP_VERSION } from '@/lib/app-version';
import { buildLocalizedPageMetadata } from '@/lib/i18n/metadata';

const CANONICAL_PATH = '/changelog';

export type ChangelogChangeType = 'feature' | 'improvement' | 'fix' | 'security' | 'breaking';

export type ChangelogChangeItem = {
  type: ChangelogChangeType;
  description: string;
};

export type ChangelogVersionStatus = 'current' | 'stable' | 'beta' | 'deprecated';

export type ChangelogVersion = {
  version: string;
  date: string;
  status?: ChangelogVersionStatus;
  highlights?: string[];
  changes: ChangelogChangeItem[];
};

export type ChangelogPageCopy = {
  breadcrumbs: { homeLabel: string; homeHref: string; currentLabel: string };
  meta: {
    title: string;
    description: string;
    openGraphTitle: string;
    openGraphDescription: string;
    canonicalPath: string;
  };
  header: {
    title: string;
    subtitle: string;
    storeVersionBadge: string;
    statusText: string;
  };
  versionLabels: {
    highlightsTitle: string;
    changesTitle: string;
    statusCurrent: string;
    statusStable: string;
    statusBeta: string;
    statusDeprecated: string;
  };
  dateLocale: string;
  versions: ChangelogVersion[];
  footer: {
    textBeforeContact: string;
    contactLinkLabel: string;
    contactHref: string;
    textAfterContact: string;
  };
};

const versionsEs: ChangelogVersion[] = [
  {
    version: '1.6.1',
    date: '2026-08-27',
    status: 'current',
    highlights: [
      'Onboarding más corto: un tour de 3 pasos que termina en el chat.',
      'Las escalas de auto-chequeo ya no salen al empezar.',
      'El interés inicial es opcional. Inicio espera hasta que hay un hilo.',
    ],
    changes: [],
  },
  {
    version: '1.5.0',
    date: '2026-06-23',
    status: 'stable',
    highlights: [
      `Versión 1.5.0 (Expo) — línea actual en tiendas (iOS build 39, Android 25)`,
      'Home y dashboard rediseñados con insights rotativos y foco unificado',
      'Sesión persistente, onboarding renovado y grafo conectado al chat',
    ],
    changes: [
      {
        type: 'feature',
        description:
          'Dashboard consolidado: insight inicial humanizado, racha de ecosistema centrada en chat y home optimizado',
      },
      {
        type: 'feature',
        description:
          'Hub de técnicas en la barra de navegación: catálogo completo, acceso rápido y lienzo ABC interactivo',
      },
      {
        type: 'feature',
        description:
          'Tareas y hábitos unificados en una pantalla, con tono de bienestar y Pomodoro al enfocar una tarea',
      },
      {
        type: 'feature',
        description:
          'Grafo e insights conectados a técnicas concretas; memoria de temas recurrentes integrada al prompt del chat',
      },
      {
        type: 'feature',
        description:
          'Resumen e informe observacional rediseñados con «lo que te ayuda» navegable y UX accionable',
      },
      {
        type: 'improvement',
        description:
          'Onboarding y bienvenida rediseñados: beneficios, validación, tema claro/oscuro y carga sin parpadeos',
      },
      {
        type: 'improvement',
        description:
          'Sesión persistente: la app restaura tu sesión sin pedir contraseña en cada apertura; refresh automático de JWT',
      },
      {
        type: 'improvement',
        description:
          'Chat: sugerencias persistidas al reabrir, mejor manejo de pensamientos intrusivos y continuidad en mensajes breves',
      },
      {
        type: 'improvement',
        description:
          'Análisis emocional ampliado: detección de anhedonia adolescente, imagen corporal y bullying',
      },
      {
        type: 'improvement',
        description: 'Paywall rediseñado con memoria del día y plan anual destacado',
      },
      {
        type: 'improvement',
        description: 'Android: minSdk 26 para compatibilidad con Health Connect',
      },
      {
        type: 'fix',
        description: 'Contactos de emergencia, crisis y alertas restaurados; cierre de onboarding y acceso al chat corregidos',
      },
    ],
  },
  {
    version: '1.4.1',
    date: '2026-05-30',
    status: 'stable',
    highlights: [
      'Versión 1.4.1 (Expo) — iOS build 31, Android 17',
      'Prueba gratuita estandarizada a 1 día',
      'Dark mode en navegación y mejoras de UX en chat',
    ],
    changes: [
      {
        type: 'improvement',
        description:
          'Período de prueba unificado a 1 día (APP_TRIAL_DAYS) en registro, suscripción y comunicaciones',
      },
      {
        type: 'improvement',
        description:
          'FloatingNavBar con dark mode, iconos dinámicos y mejor visibilidad en distintos temas',
      },
      {
        type: 'improvement',
        description:
          'Chat: cabecera simplificada; resúmenes de sesión con fechas localizadas (ES/EN)',
      },
      {
        type: 'improvement',
        description: 'Diario de gratitud: footer refinado y mejor interacción con teclado',
      },
    ],
  },
  {
    version: '1.4.0',
    date: '2026-05-26',
    status: 'stable',
    highlights: [
      'Internacionalización app-wide (español e inglés)',
      'Backend de chat consciente del idioma del usuario',
      'Modos de conversación y flujo de chat ampliado',
      'Recuperación de contraseña y estado de suscripción mejorados',
    ],
    changes: [
      {
        type: 'feature',
        description: 'i18n completo en app, correos, push y checkout: soporte ES/EN en frontend y backend',
      },
      {
        type: 'feature',
        description: 'Chat backend con respuestas y resúmenes adaptados al idioma del perfil',
      },
      {
        type: 'feature',
        description: 'Nuevos modos de conversación integrados en la experiencia de chat',
      },
      {
        type: 'improvement',
        description: 'Resúmenes de sesión y dashboard con localización y cierre de sesión emocional mejorado',
      },
      {
        type: 'improvement',
        description: 'Flujo de recuperación de contraseña con validación reforzada',
      },
      {
        type: 'improvement',
        description: 'Visualización del estado de suscripción y período de prueba más clara en la app',
      },
      {
        type: 'improvement',
        description: 'Emails de retención y resumen semanal con lógica de regalo de prueba mejorada',
      },
    ],
  },
  {
    version: '1.2.7',
    date: '2026-03-27',
    status: 'stable',
    highlights: [
      'Versión 1.2.7 (Expo)',
      'Mejor experiencia de chat (v1.2.x)',
      'Preferencias de tono y estilo de respuesta del asistente (cuando la app lo ofrece)',
      'Transparencia: privacidad integrada en la conversación',
    ],
    changes: [
      { type: 'improvement', description: 'Chat: refinamiento de UX y coherencia con perfil de usuario y API' },
      {
        type: 'improvement',
        description: 'Preferencias de conversación: ajustes de estilo de respuesta cuando aplica',
      },
      {
        type: 'improvement',
        description: 'Transparencia: información de privacidad integrada en la experiencia de chat',
      },
    ],
  },
  {
    version: '1.1.0',
    date: '2026-01-08',
    status: 'stable',
    highlights: [
      'Detección avanzada de distorsiones cognitivas (15 tipos)',
      'Optimizaciones móviles avanzadas',
    ],
    changes: [
      {
        type: 'feature',
        description: 'Detección automática de 15 tipos de distorsiones cognitivas durante las conversaciones',
      },
      {
        type: 'improvement',
        description:
          'Sistema de chat mejorado con seguimiento emocional y herramientas del hub según el contexto',
      },
      {
        type: 'improvement',
        description:
          'Análisis emocional avanzado ahora incluye seguimiento de tendencias a lo largo del tiempo',
      },
      { type: 'feature', description: 'Pull-to-refresh en dispositivos móviles para actualizar contenido fácilmente' },
      { type: 'feature', description: 'Gestos swipe mejorados para navegación móvil y cierre de menús' },
      {
        type: 'improvement',
        description: 'Optimizaciones táctiles: áreas táctiles aumentadas (48px mínimo), feedback visual mejorado',
      },
      {
        type: 'improvement',
        description: 'Viewport optimizado para dispositivos con notch (iPhone X y superiores)',
      },
      {
        type: 'improvement',
        description: 'Menú móvil mejorado con gestos swipe para cerrar y animaciones más fluidas',
      },
      { type: 'improvement', description: 'Prevención de zoom accidental en inputs móviles (font-size: 16px)' },
      {
        type: 'improvement',
        description: 'Scroll táctil optimizado con -webkit-overflow-scrolling: touch y scroll snap',
      },
      { type: 'fix', description: 'Corregido problema de expansión en preguntas frecuentes (FAQ)' },
    ],
  },
  {
    version: '1.0.0',
    date: '2025-01-15',
    highlights: [
      'Lanzamiento inicial de Anto',
      'Asistente de IA para bienestar emocional',
    ],
    changes: [
      {
        type: 'feature',
        description: 'Asistente de IA con conversaciones orientadas al bienestar y técnicas basadas en evidencia',
      },
      {
        type: 'feature',
        description: 'Análisis emocional avanzado con seguimiento de patrones y estados de ánimo',
      },
      {
        type: 'feature',
        description: 'Herramientas de bienestar: ejercicios de mindfulness, meditación y técnicas de relajación',
      },
      { type: 'feature', description: 'Cifrado en tránsito (TLS) y en reposo para proteger los datos' },
      { type: 'feature', description: 'Disponibilidad 24/7 sin límites de uso ni esperas' },
      { type: 'feature', description: 'Sistema de autenticación seguro con JWT y autenticación biométrica' },
      { type: 'feature', description: 'Integración con Mercado Pago para suscripciones y pagos seguros' },
      { type: 'feature', description: 'Interfaz intuitiva y accesible diseñada para todos los usuarios' },
      { type: 'feature', description: 'Sistema de reportes y seguimiento de progreso emocional' },
      { type: 'feature', description: 'Notificaciones push personalizadas para recordatorios y apoyo' },
      { type: 'feature', description: 'Soporte para iOS y Android con React Native' },
    ],
  },
];

const versionsEn: ChangelogVersion[] = [
  {
    version: '1.6.1',
    date: '2026-08-27',
    status: 'current',
    highlights: [
      'Shorter onboarding: a 3-step tour that ends in chat.',
      'Self-check scales no longer appear when you start.',
      'Starting interest is optional. Home waits until there is a thread.',
    ],
    changes: [],
  },
  {
    version: '1.5.0',
    date: '2026-06-23',
    status: 'stable',
    highlights: [
      `Version 1.5.0 (Expo) — current store release (iOS build 39, Android 25)`,
      'Redesigned home and dashboard with rotating insights and unified focus',
      'Persistent session, renewed onboarding, and graph connected to chat',
    ],
    changes: [
      {
        type: 'feature',
        description:
          'Consolidated dashboard: humanized home insight, chat-centered ecosystem streak, and optimized home',
      },
      {
        type: 'feature',
        description:
          'Techniques hub in the nav bar: full catalog, quick access, and interactive ABC canvas',
      },
      {
        type: 'feature',
        description:
          'Unified tasks and habits screen with wellness tone and Pomodoro when focusing a task',
      },
      {
        type: 'feature',
        description:
          'Graph and insights linked to concrete techniques; recurring topic memory in the chat prompt',
      },
      {
        type: 'feature',
        description:
          'Redesigned summary and observational report with navigable "what helps you" and actionable UX',
      },
      {
        type: 'improvement',
        description:
          'Redesigned onboarding and welcome: benefits, validation, light/dark theme, and flicker-free bootstrap',
      },
      {
        type: 'improvement',
        description:
          'Persistent session: restores without asking for password on every open; automatic JWT refresh',
      },
      {
        type: 'improvement',
        description:
          'Chat: suggestions persist when reopening, better handling of intrusive thoughts and short-message continuity',
      },
      {
        type: 'improvement',
        description:
          'Expanded emotional analysis: adolescent anhedonia, body image, and bullying detection',
      },
      {
        type: 'improvement',
        description: 'Redesigned paywall with day memory and highlighted annual plan',
      },
      {
        type: 'improvement',
        description: 'Android: minSdk 26 for Health Connect compatibility',
      },
      {
        type: 'fix',
        description: 'Emergency contacts, crisis, and alerts restored; onboarding close and chat access fixed',
      },
    ],
  },
  {
    version: '1.4.1',
    date: '2026-05-30',
    status: 'stable',
    highlights: [
      'Version 1.4.1 (Expo) — iOS build 31, Android 17',
      '1-day free trial standardized',
      'Dark mode navigation and chat UX improvements',
    ],
    changes: [
      {
        type: 'improvement',
        description:
          'Trial period unified to 1 day (APP_TRIAL_DAYS) in registration, subscription, and communications',
      },
      {
        type: 'improvement',
        description:
          'FloatingNavBar with dark mode, dynamic icons, and improved visibility across themes',
      },
      {
        type: 'improvement',
        description:
          'Chat: simplified header; session summaries with localized dates (ES/EN)',
      },
      {
        type: 'improvement',
        description: 'Gratitude journal: refined footer and improved keyboard interaction',
      },
    ],
  },
  {
    version: '1.4.0',
    date: '2026-05-26',
    status: 'stable',
    highlights: [
      'App-wide internationalization (Spanish and English)',
      'Language-aware chat backend',
      'Conversation modes and expanded chat flow',
    ],
    changes: [
      {
        type: 'feature',
        description: 'Full i18n in app, emails, push, and checkout: ES/EN support in frontend and backend',
      },
      {
        type: 'feature',
        description: 'Chat backend with responses and summaries adapted to the user profile language',
      },
      {
        type: 'feature',
        description: 'New conversation modes integrated into the chat experience',
      },
      {
        type: 'improvement',
        description: 'Password recovery flow with reinforced validation',
      },
    ],
  },
  {
    version: '1.2.7',
    date: '2026-03-27',
    status: 'stable',
    highlights: [
      'Version 1.2.7 (Expo)',
      'Improved chat experience (v1.2.x)',
      'Assistant tone and response style preferences (when available in the app)',
      'Transparency: privacy integrated into conversations',
    ],
    changes: [
      { type: 'improvement', description: 'Chat: UX refinement and consistency with user profile and API' },
      {
        type: 'improvement',
        description: 'Conversation preferences: response style settings when applicable',
      },
      {
        type: 'improvement',
        description: 'Transparency: privacy information integrated into the chat experience',
      },
    ],
  },
  {
    version: '1.1.0',
    date: '2026-01-08',
    status: 'stable',
    highlights: [
      'Advanced detection of cognitive distortions (15 types)',
      'Advanced mobile optimizations',
    ],
    changes: [
      {
        type: 'feature',
        description: 'Automatic detection of 15 types of cognitive distortions during conversations',
      },
      {
        type: 'improvement',
        description:
          'Enhanced chat system with emotional tracking and hub tools according to context',
      },
      {
        type: 'improvement',
        description:
          'Advanced emotional analysis now includes trend tracking over time',
      },
      { type: 'feature', description: 'Pull-to-refresh on mobile devices to easily update content' },
      { type: 'feature', description: 'Improved swipe gestures for mobile navigation and menu closing' },
      {
        type: 'improvement',
        description: 'Touch optimizations: increased touch targets (48px minimum), improved visual feedback',
      },
      {
        type: 'improvement',
        description: 'Viewport optimized for devices with notch (iPhone X and above)',
      },
      {
        type: 'improvement',
        description: 'Improved mobile menu with swipe gestures to close and smoother animations',
      },
      { type: 'improvement', description: 'Accidental zoom prevention on mobile inputs (font-size: 16px)' },
      {
        type: 'improvement',
        description: 'Optimized touch scrolling with -webkit-overflow-scrolling: touch and scroll snap',
      },
      { type: 'fix', description: 'Fixed expansion issue in frequently asked questions (FAQ)' },
    ],
  },
  {
    version: '1.0.0',
    date: '2025-01-15',
    highlights: [
      'Initial launch of Anto',
      'AI assistant for emotional wellness',
    ],
    changes: [
      {
        type: 'feature',
        description: 'AI assistant with wellness-oriented conversations and evidence-based techniques',
      },
      {
        type: 'feature',
        description: 'Advanced emotional analysis with pattern and mood tracking',
      },
      {
        type: 'feature',
        description: 'Wellness tools: mindfulness exercises, meditation, and relaxation techniques',
      },
      { type: 'feature', description: 'Encryption in transit (TLS) and at rest to protect data' },
      { type: 'feature', description: '24/7 availability with no usage limits or waiting times' },
      { type: 'feature', description: 'Secure authentication system with JWT and biometric authentication' },
      { type: 'feature', description: 'Mercado Pago integration for subscriptions and secure payments' },
      { type: 'feature', description: 'Intuitive and accessible interface designed for all users' },
      { type: 'feature', description: 'Reporting system and emotional progress tracking' },
      { type: 'feature', description: 'Personalized push notifications for reminders and support' },
      { type: 'feature', description: 'Support for iOS and Android with React Native' },
    ],
  },
];

function buildChangelogPageCopy(locale: Locale): ChangelogPageCopy {
  if (locale === 'en') {
    return {
      breadcrumbs: {
        homeLabel: 'Home',
        homeHref: localePath(locale, '/'),
        currentLabel: 'Changelog',
      },
      meta: {
        title: 'Version history | Anto',
        description: `Anto app version history (Expo). Current version ${APP_VERSION}: 1-day trial, i18n ES/EN, and chat UX improvements.`,
        openGraphTitle: 'Version history | Anto',
        openGraphDescription: `Anto app changelog: ${APP_VERSION} published with i18n and chat improvements.`,
        canonicalPath: CANONICAL_PATH,
      },
      header: {
        title: 'Version history',
        subtitle: 'Version history and updates for the Anto application',
        storeVersionBadge: `Store version: ${APP_VERSION}`,
        statusText: `This site is the public reference for Anto version history and product updates.`,
      },
      versionLabels: {
        highlightsTitle: 'Highlights',
        changesTitle: 'Changes',
        statusCurrent: 'Current',
        statusStable: 'Stable',
        statusBeta: 'Beta',
        statusDeprecated: 'Deprecated',
      },
      dateLocale: 'en-US',
      versions: versionsEn,
      footer: {
        textBeforeContact: 'Have suggestions or found a bug? Contact us through',
        contactLinkLabel: 'our contact form',
        contactHref: localePath(locale, '/contacto'),
        textAfterContact: ' to report issues or request support.',
      },
    };
  }

  return {
    breadcrumbs: {
      homeLabel: 'Inicio',
      homeHref: localePath(locale, '/'),
      currentLabel: 'Changelog',
    },
    meta: {
      title: 'Historial de versiones | Anto',
      description: `Historial de versiones de la app Anto (Expo). Versión actual ${APP_VERSION}: prueba 1 día, i18n ES/EN y mejoras de UX de chat.`,
      openGraphTitle: 'Historial de versiones | Anto',
      openGraphDescription: `Changelog de la aplicación Anto: ${APP_VERSION} publicada con i18n y mejoras de chat.`,
      canonicalPath: CANONICAL_PATH,
    },
    header: {
      title: 'Historial de versiones',
      subtitle: 'Historial de versiones y actualizaciones de la aplicación Anto',
      storeVersionBadge: `Versión en tiendas: ${APP_VERSION}`,
      statusText: `Este sitio es la referencia pública del historial de versiones y novedades de Anto.`,
    },
    versionLabels: {
      highlightsTitle: 'Destacados',
      changesTitle: 'Cambios',
      statusCurrent: 'Actual',
      statusStable: 'Estable',
      statusBeta: 'Beta',
      statusDeprecated: 'Deprecado',
    },
    dateLocale: 'es-ES',
    versions: versionsEs,
    footer: {
      textBeforeContact: '¿Tienes sugerencias o encontraste un error? Contáctanos a través de',
      contactLinkLabel: 'nuestro formulario de contacto',
      contactHref: localePath(locale, '/contacto'),
      textAfterContact: ' para reportar incidencias o solicitar soporte.',
    },
  };
}

export function getChangelogPageCopy(locale: Locale): ChangelogPageCopy {
  return buildChangelogPageCopy(locale);
}

export function changelogPageMetadata(locale: Locale): Metadata {
  const { meta } = buildChangelogPageCopy(locale);

  return {
    ...buildLocalizedPageMetadata(locale, meta.canonicalPath, {
      title: meta.title,
      description: meta.description,
      openGraph: {
        title: meta.openGraphTitle,
        description: meta.openGraphDescription,
      },
    }),
    twitter: {
      card: 'summary',
      title: meta.openGraphTitle,
      description: meta.description,
    },
  };
}
