import type { Locale } from '@/lib/i18n/config';

/** Dimensiones de los assets de landing (sin notch/status bar, ~2.5×). */
export const APP_SCREENSHOT_WIDTH = 1178;
export const APP_SCREENSHOT_HEIGHT = 2345;

/** Screenshots usados en bienvenida y home legacy */
export const APP_SCREENSHOT_PATHS = {
  chat: '/assets/images/hero/anto-chat-conversation.webp',
  home: '/assets/images/hero/anto-home-dashboard.webp',
} as const;

/** Screenshots de la landing principal (mockup final) */
export const HOME_LANDING_SCREENSHOT_PATHS = {
  chatAnxiety: '/assets/images/hero/anto-chat-anxiety.webp',
  sessionSummary: '/assets/images/hero/anto-session-summary.webp',
  tccProtocol: '/assets/images/hero/anto-tcc-protocol.webp',
  weeklySummary: '/assets/images/hero/anto-weekly-summary.webp',
  emotionalDashboard: '/assets/images/hero/anto-emotional-dashboard.webp',
} as const;

export type AppScreenshotKey = keyof typeof APP_SCREENSHOT_PATHS;
export type HomeLandingScreenshotKey = keyof typeof HOME_LANDING_SCREENSHOT_PATHS;

export const APP_SCREENSHOT_KEYS = ['chat', 'home'] as const satisfies readonly AppScreenshotKey[];

const altByKey: Record<AppScreenshotKey, Record<Locale, string>> = {
  chat: {
    es: 'Conversación real en Anto — el usuario escribe que no puede dormir y Anto responde con empatía y un paso concreto',
    en: 'Real Anto conversation — user writes they cannot sleep and Anto responds with empathy and a concrete step',
  },
  home: {
    es: 'Pantalla de inicio de Anto con hábitos, continuidad del chat y pendientes',
    en: 'Anto home screen with habits, chat continuity, and tasks',
  },
};

const homeLandingAltByKey: Record<HomeLandingScreenshotKey, Record<Locale, string>> = {
  chatAnxiety: {
    es: 'Anto respondiendo a ansiedad laboral con empatía y sugerencias concretas',
    en: 'Anto responding to work anxiety with empathy and concrete suggestions',
  },
  sessionSummary: {
    es: 'Resumen de sesión de Anto mostrando patrón de pensamiento detectado',
    en: 'Anto session summary showing detected thought pattern',
  },
  tccProtocol: {
    es: 'Protocolo de pensamiento automático TCC en Anto, paso 1 de 3',
    en: 'Automatic thought CBT protocol in Anto, step 1 of 3',
  },
  weeklySummary: {
    es: 'Resumen semanal de Anto con métricas de bienestar',
    en: 'Anto weekly summary with wellbeing metrics',
  },
  emotionalDashboard: {
    es: 'Panel de tendencias emocionales y seguimiento en Anto',
    en: 'Emotional trends and tracking dashboard in Anto',
  },
};

const labelByKey: Record<AppScreenshotKey, Record<Locale, string>> = {
  chat: { es: 'Chat de apoyo', en: 'Support chat' },
  home: { es: 'Tu día organizado', en: 'Your day, organized' },
};

const descriptionByKey: Record<AppScreenshotKey, Record<Locale, string>> = {
  chat: {
    es: 'Escribe lo que sientes y recibe claridad en segundos.',
    en: 'Write what you feel and get clarity in seconds.',
  },
  home: {
    es: 'Hábitos, pendientes y seguimiento en un solo lugar.',
    en: 'Habits, tasks, and tracking in one place.',
  },
};

export function getAppScreenshotAlt(key: AppScreenshotKey, locale: Locale): string {
  return altByKey[key][locale];
}

export function getHomeLandingScreenshotAlt(key: HomeLandingScreenshotKey, locale: Locale): string {
  return homeLandingAltByKey[key][locale];
}

export function getAppScreenshotLabel(key: AppScreenshotKey, locale: Locale): string {
  return labelByKey[key][locale];
}

export function getAppScreenshotDescription(key: AppScreenshotKey, locale: Locale): string {
  return descriptionByKey[key][locale];
}

export function getAppScreenshotPath(key: AppScreenshotKey): string {
  return APP_SCREENSHOT_PATHS[key];
}

export function getHomeLandingScreenshotPath(key: HomeLandingScreenshotKey): string {
  return HOME_LANDING_SCREENSHOT_PATHS[key];
}

/** URL absoluta para schema.org y metadatos */
export function getAppScreenshotUrl(key: AppScreenshotKey, origin = 'https://antoapps.com'): string {
  return `${origin}${APP_SCREENSHOT_PATHS[key]}`;
}
