import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n/config';
import { APP_VERSION } from '@/lib/app-version';

const SITE_ORIGIN = 'https://antoapps.com';
const CANONICAL_PATH = '/changelog';
const GITHUB_REPO = 'https://github.com/Mar-cere/Anto';

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
    statusNoteBefore: string;
    repoLinkLabel: string;
    repoLinkHref: string;
    statusNoteAfter: string;
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
    textBetweenLinks: string;
    githubLinkLabel: string;
    githubLinkHref: string;
    textAfterGithub: string;
  };
};

function siteUrl(locale: Locale, path: string): string {
  return `${SITE_ORIGIN}${localePath(locale, path)}`;
}

const versionsEs: ChangelogVersion[] = [
  {
    version: APP_VERSION,
    date: '2026-05-29',
    status: 'current',
    highlights: [
      `Versión ${APP_VERSION} (Expo) — línea actual en tiendas`,
      'Mejoras continuas de experiencia en chat y bienestar emocional',
      'Preferencias de tono y estilo de respuesta del asistente',
      'Transparencia de privacidad integrada en la conversación',
    ],
    changes: [
      { type: 'improvement', description: 'Refinamiento general de UX y estabilidad en la línea 1.4.x' },
      { type: 'improvement', description: 'Chat: coherencia de tono, contexto y flujo conversacional' },
      { type: 'improvement', description: 'Preferencias de conversación y ajustes de estilo de respuesta' },
      {
        type: 'feature',
        description: 'Mantiene escalas PHQ-9/GAD-7, distorsiones cognitivas y protocolos estructurados',
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
      {
        type: 'feature',
        description:
          'Mantiene escalas PHQ-9/GAD-7, distorsiones cognitivas y protocolos estructurados de versiones anteriores',
      },
    ],
  },
  {
    version: '1.1.0',
    date: '2026-01-08',
    status: 'stable',
    highlights: [
      'Sistema de chat mejorado con escalas clínicas validadas',
      'Detección avanzada de distorsiones cognitivas (15 tipos)',
      '8 protocolos terapéuticos estructurados basados en evidencia',
      'Reportes profesionales con estadísticas detalladas',
      'Optimizaciones móviles avanzadas',
    ],
    changes: [
      {
        type: 'feature',
        description:
          'Escalas clínicas validadas: PHQ-9 para depresión y GAD-7 para ansiedad con evaluación automática',
      },
      {
        type: 'feature',
        description: 'Detección automática de 15 tipos de distorsiones cognitivas durante las conversaciones',
      },
      {
        type: 'feature',
        description:
          '8 protocolos terapéuticos estructurados basados en evidencia científica (Depresión, Ansiedad, Trauma, TOC, TEPT, etc.)',
      },
      {
        type: 'feature',
        description:
          'Reportes profesionales con análisis detallado de progreso, escalas clínicas y estadísticas de distorsiones cognitivas',
      },
      {
        type: 'improvement',
        description:
          'Sistema de chat mejorado con evaluación clínica automática y protocolos personalizados según detecciones',
      },
      {
        type: 'improvement',
        description:
          'Análisis emocional avanzado ahora incluye evaluación clínica objetiva mediante escalas validadas',
      },
      {
        type: 'improvement',
        description:
          'Dashboard de métricas actualizado con visualización de escalas clínicas y distorsiones cognitivas',
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
      'Detección de crisis en tiempo real',
    ],
    changes: [
      {
        type: 'feature',
        description: 'Asistente de IA con conversaciones orientadas al bienestar y técnicas basadas en evidencia',
      },
      { type: 'feature', description: 'Sistema de detección de crisis en tiempo real con alertas tempranas' },
      {
        type: 'feature',
        description: 'Análisis emocional avanzado con seguimiento de patrones y estados de ánimo',
      },
      {
        type: 'feature',
        description: 'Herramientas de bienestar: ejercicios de mindfulness, meditación y técnicas de relajación',
      },
      { type: 'feature', description: 'Encriptación end-to-end para máxima privacidad y seguridad de datos' },
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
    version: APP_VERSION,
    date: '2026-05-29',
    status: 'current',
    highlights: [
      `Version ${APP_VERSION} (Expo) — current store release`,
      'Continuous improvements to chat experience and emotional wellness',
      'Assistant tone and response style preferences',
      'Privacy transparency integrated into conversations',
    ],
    changes: [
      { type: 'improvement', description: 'General UX refinement and stability in the 1.4.x line' },
      { type: 'improvement', description: 'Chat: tone consistency, context, and conversational flow' },
      { type: 'improvement', description: 'Conversation preferences and response style settings' },
      {
        type: 'feature',
        description: 'Retains PHQ-9/GAD-7 scales, cognitive distortions, and structured protocols',
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
      {
        type: 'feature',
        description:
          'Retains PHQ-9/GAD-7 scales, cognitive distortions, and structured protocols from previous versions',
      },
    ],
  },
  {
    version: '1.1.0',
    date: '2026-01-08',
    status: 'stable',
    highlights: [
      'Enhanced chat system with validated clinical scales',
      'Advanced detection of cognitive distortions (15 types)',
      '8 evidence-based structured therapeutic protocols',
      'Professional reports with detailed statistics',
      'Advanced mobile optimizations',
    ],
    changes: [
      {
        type: 'feature',
        description:
          'Validated clinical scales: PHQ-9 for depression and GAD-7 for anxiety with automatic assessment',
      },
      {
        type: 'feature',
        description: 'Automatic detection of 15 types of cognitive distortions during conversations',
      },
      {
        type: 'feature',
        description:
          '8 evidence-based structured therapeutic protocols (Depression, Anxiety, Trauma, OCD, PTSD, etc.)',
      },
      {
        type: 'feature',
        description:
          'Professional reports with detailed progress analysis, clinical scales, and cognitive distortion statistics',
      },
      {
        type: 'improvement',
        description:
          'Enhanced chat system with automatic clinical assessment and personalized protocols based on detections',
      },
      {
        type: 'improvement',
        description:
          'Advanced emotional analysis now includes objective clinical assessment through validated scales',
      },
      {
        type: 'improvement',
        description: 'Updated metrics dashboard with clinical scales and cognitive distortion visualization',
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
      'Real-time crisis detection',
    ],
    changes: [
      {
        type: 'feature',
        description: 'AI assistant with wellness-oriented conversations and evidence-based techniques',
      },
      { type: 'feature', description: 'Real-time crisis detection system with early alerts' },
      {
        type: 'feature',
        description: 'Advanced emotional analysis with pattern and mood tracking',
      },
      {
        type: 'feature',
        description: 'Wellness tools: mindfulness exercises, meditation, and relaxation techniques',
      },
      { type: 'feature', description: 'End-to-end encryption for maximum data privacy and security' },
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
        title: 'Version History | Anto',
        description: `Anto app version history (Expo). Current version ${APP_VERSION}: chat improvements, response preferences, and conversation privacy.`,
        openGraphTitle: 'Version History | Anto',
        openGraphDescription: `Anto app changelog: ${APP_VERSION} released, clinical scales, protocols, and more.`,
        canonicalPath: CANONICAL_PATH,
      },
      header: {
        title: 'Version History',
        subtitle: 'Version history and updates for the Anto application',
        storeVersionBadge: `Store version: ${APP_VERSION}`,
        statusNoteBefore: 'Published according to the app (Expo) and the',
        repoLinkLabel: 'Anto repository README',
        repoLinkHref: GITHUB_REPO,
        statusNoteAfter: `. The ${APP_VERSION} line continues with chat improvements, tone and response preferences, privacy information in the conversation flow, plus PHQ-9/GAD-7 scales, cognitive distortions, and structured protocols.`,
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
        textBetweenLinks: 'or visit our',
        githubLinkLabel: 'GitHub repository',
        githubLinkHref: GITHUB_REPO,
        textAfterGithub: 'to report issues.',
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
      title: 'Control de versiones | Anto',
      description: `Historial de versiones de la app Anto (Expo). Versión actual ${APP_VERSION}: mejoras de chat, preferencias de respuesta y privacidad en conversación.`,
      openGraphTitle: 'Control de versiones | Anto',
      openGraphDescription: `Changelog de la aplicación Anto: ${APP_VERSION} publicada, escalas clínicas, protocolos y más.`,
      canonicalPath: CANONICAL_PATH,
    },
    header: {
      title: 'Control de Versiones',
      subtitle: 'Historial de versiones y actualizaciones de la aplicación Anto',
      storeVersionBadge: `Versión en tiendas: ${APP_VERSION}`,
      statusNoteBefore: 'Publicada según la app (Expo) y el',
      repoLinkLabel: 'README del repositorio Anto',
      repoLinkHref: GITHUB_REPO,
      statusNoteAfter: `. La línea ${APP_VERSION} continúa con mejoras de chat, preferencias de tono y respuesta, información de privacidad en el flujo de conversación, además de escalas PHQ-9/GAD-7, distorsiones cognitivas y protocolos estructurados.`,
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
      textBetweenLinks: 'o visita nuestro',
      githubLinkLabel: 'repositorio en GitHub',
      githubLinkHref: GITHUB_REPO,
      textAfterGithub: 'para reportar issues.',
    },
  };
}

export function getChangelogPageCopy(locale: Locale): ChangelogPageCopy {
  return buildChangelogPageCopy(locale);
}

export function changelogPageMetadata(locale: Locale): Metadata {
  const { meta } = buildChangelogPageCopy(locale);
  const canonical = siteUrl(locale, meta.canonicalPath);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: {
        es: siteUrl('es', meta.canonicalPath),
        en: siteUrl('en', meta.canonicalPath),
        'x-default': siteUrl('es', meta.canonicalPath),
      },
    },
    openGraph: {
      title: meta.openGraphTitle,
      description: meta.openGraphDescription,
      url: canonical,
      type: 'website',
      siteName: 'Anto',
    },
    twitter: {
      card: 'summary',
      title: meta.openGraphTitle,
      description: meta.description,
    },
  };
}
