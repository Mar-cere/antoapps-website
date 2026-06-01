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

export type AppInsightCard = {
  icon: string;
  value?: string;
  label: string;
  description: string;
};

export type AppAdvancedFeature = {
  icon: string;
  title: string;
  description: string;
  listItems: string[];
};

export type AppTechSpecCard = {
  title: string;
  items: string[];
};

export type AppPageCopy = {
  breadcrumbs: { homeLabel: string; homeHref: string; currentLabel: string };
  hero: {
    title: string;
    subtitle: string;
    githubLinkText: string;
    badges: {
      versionLabel: string;
      earlyAccess: string;
      privacy: string;
      realtime: string;
    };
  };
  latestUpdates: {
    title: string;
    subtitle: string;
    cards: AppInsightCard[];
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
  insights: {
    title: string;
    subtitle: string;
    cards: AppInsightCard[];
  };
  advancedFeatures: {
    title: string;
    subtitle: string;
    versionHighlight: string;
    features: AppAdvancedFeature[];
  };
  techSpecs: {
    title: string;
    subtitle: string;
    cards: AppTechSpecCard[];
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
    title: 'La Aplicación - Anto | Características e Insights',
    description:
      'Anto {versionLabel} (Expo): asistente de bienestar emocional con GPT-5.4 Mini, escalas PHQ-9/GAD-7, protocolos estructurados y detección de crisis. Incluye novedades recientes y accesos rápidos.',
    openGraph: {
      title: 'La Aplicación - Anto',
      description: 'Características, insights y novedades de la aplicación Anto.',
      url: 'https://antoapps.com/app',
    },
  },
  en: {
    title: 'The App - Anto | Features and Insights',
    description:
      'Anto {versionLabel} (Expo): emotional wellness assistant with GPT-5.4 Mini, PHQ-9/GAD-7 scales, structured protocols, and crisis detection. Includes recent updates and quick links.',
    openGraph: {
      title: 'The App - Anto',
      description: 'Features, insights, and recent updates of the Anto app.',
      url: 'https://antoapps.com/en/app',
    },
  },
};

function buildAdvancedFeaturesEs(): AppAdvancedFeature[] {
  return [
    {
      icon: '🤖',
      title: 'Chat Conversacional Avanzado con GPT-5.4 Mini',
      description:
        'Integración directa con OpenAI API (GPT-5.4 Mini): tono profesional y práctico por defecto, contexto emocional y memoria de conversación. Evaluación con escalas, distorsiones cognitivas y protocolos estructurados; ajustes de estilo cuando la app lo permite.',
      listItems: [
        'Integración con OpenAI GPT-5.4 Mini',
        'Memoria de conversaciones en MongoDB',
        'Procesamiento de lenguaje natural (NLP)',
        'Respuestas contextualmente relevantes',
        'WebSockets para tiempo real',
        '✅ Escalas clínicas validadas (PHQ-9, GAD-7)',
        '✅ Detección de 15 tipos de distorsiones cognitivas',
        '✅ 8 protocolos terapéuticos estructurados',
        '✅ Reportes profesionales con estadísticas',
      ],
    },
    {
      icon: '🚨',
      title: 'Sistema Automático de Detección de Crisis',
      description:
        'Algoritmos que analizan patrones de lenguaje y comportamiento para detectar señales de crisis. Activa protocolos de emergencia automáticamente con notificaciones a contactos de confianza vía Twilio y SendGrid.',
      listItems: [
        'Detección automática de patrones de riesgo',
        'Alertas inmediatas a contactos designados',
        'Notificaciones vía WhatsApp/SMS (Twilio)',
        'Emails de emergencia (SendGrid)',
        'Seguimiento post-crisis automatizado',
      ],
    },
    {
      icon: '📋',
      title: 'Sistema de Tareas y Hábitos',
      description:
        'Gestión completa de tareas terapéuticas y seguimiento de hábitos saludables. Recordatorios inteligentes y análisis de correlaciones entre hábitos y bienestar emocional.',
      listItems: [
        'Creación y seguimiento de tareas',
        'Establecimiento de hábitos saludables',
        'Recordatorios personalizados',
        'Análisis de cumplimiento y progreso',
        'Correlación con bienestar emocional',
      ],
    },
    {
      icon: '💳',
      title: 'Integración con Mercado Pago',
      description:
        'Sistema de suscripciones completo con procesamiento de pagos seguro. Gestión automática de planes, renovaciones y cancelaciones.',
      listItems: [
        'Procesamiento seguro de pagos',
        'Gestión automática de suscripciones',
        'Múltiples planes flexibles',
        'Renovaciones automáticas',
        'Cancelación en cualquier momento',
      ],
    },
    {
      icon: '📊',
      title: 'Dashboard de Métricas y Progreso',
      description:
        'Visualización completa de tu bienestar emocional con gráficos, tendencias y reportes detallados. Análisis de patrones a lo largo del tiempo. Ahora con escalas clínicas automáticas y estadísticas de distorsiones cognitivas.',
      listItems: [
        'Gráficos de estado emocional',
        'Identificación de patrones temporales',
        'Reportes semanales y mensuales',
        'Métricas de progreso personalizadas',
        'Exportación de datos',
        '✅ Escalas clínicas validadas (PHQ-9, GAD-7)',
        '✅ Estadísticas de distorsiones cognitivas',
        '✅ Reportes profesionales con análisis detallado',
      ],
    },
    {
      icon: '🔔',
      title: 'Notificaciones Push Nativas',
      description:
        'Sistema de notificaciones push configurado para recordatorios de bienestar, alertas de crisis y actualizaciones importantes. Respeto por preferencias y horarios del usuario.',
      listItems: [
        'Notificaciones push nativas (iOS/Android)',
        'Recordatorios de tareas y hábitos',
        'Alertas de seguimiento emocional',
        'Notificaciones de crisis (configurables)',
        'Control granular de notificaciones',
      ],
    },
  ];
}

function buildAdvancedFeaturesEn(): AppAdvancedFeature[] {
  return [
    {
      icon: '🤖',
      title: 'Advanced Conversational Chat with GPT-5.4 Mini',
      description:
        'Direct integration with the OpenAI API (GPT-5.4 Mini): professional, practical tone by default, emotional context, and conversation memory. Assessment with scales, cognitive distortions, and structured protocols; style adjustments when the app allows.',
      listItems: [
        'OpenAI GPT-5.4 Mini integration',
        'Conversation memory in MongoDB',
        'Natural language processing (NLP)',
        'Contextually relevant responses',
        'WebSockets for real-time use',
        '✅ Validated clinical scales (PHQ-9, GAD-7)',
        '✅ Detection of 15 types of cognitive distortions',
        '✅ 8 structured therapeutic protocols',
        '✅ Professional reports with statistics',
      ],
    },
    {
      icon: '🚨',
      title: 'Automatic Crisis Detection System',
      description:
        'Algorithms analyze language and behavior patterns to detect crisis signals. Automatically triggers emergency protocols with notifications to trusted contacts via Twilio and SendGrid.',
      listItems: [
        'Automatic detection of risk patterns',
        'Immediate alerts to designated contacts',
        'WhatsApp/SMS notifications (Twilio)',
        'Emergency emails (SendGrid)',
        'Automated post-crisis follow-up',
      ],
    },
    {
      icon: '📋',
      title: 'Tasks and Habits System',
      description:
        'Full management of therapeutic tasks and healthy habit tracking. Smart reminders and analysis of correlations between habits and emotional wellness.',
      listItems: [
        'Task creation and tracking',
        'Healthy habit building',
        'Personalized reminders',
        'Compliance and progress analysis',
        'Correlation with emotional wellness',
      ],
    },
    {
      icon: '💳',
      title: 'Mercado Pago Integration',
      description:
        'Complete subscription system with secure payment processing. Automatic plan, renewal, and cancellation management.',
      listItems: [
        'Secure payment processing',
        'Automatic subscription management',
        'Multiple flexible plans',
        'Automatic renewals',
        'Cancel anytime',
      ],
    },
    {
      icon: '📊',
      title: 'Metrics and Progress Dashboard',
      description:
        'Full view of your emotional wellness with charts, trends, and detailed reports. Pattern analysis over time. Now with automatic clinical scales and cognitive distortion statistics.',
      listItems: [
        'Emotional state charts',
        'Temporal pattern identification',
        'Weekly and monthly reports',
        'Personalized progress metrics',
        'Data export',
        '✅ Validated clinical scales (PHQ-9, GAD-7)',
        '✅ Cognitive distortion statistics',
        '✅ Professional reports with detailed analysis',
      ],
    },
    {
      icon: '🔔',
      title: 'Native Push Notifications',
      description:
        'Push notification system for wellness reminders, crisis alerts, and important updates. Respects user preferences and schedules.',
      listItems: [
        'Native push notifications (iOS/Android)',
        'Task and habit reminders',
        'Emotional check-in alerts',
        'Crisis notifications (configurable)',
        'Granular notification controls',
      ],
    },
  ];
}

function buildAppPageCopy(locale: Locale): AppPageCopy {
  const trial = getTrialCopy(locale);
  const isEn = locale === 'en';

  if (isEn) {
    return {
      breadcrumbs: {
        homeLabel: 'Home',
        homeHref: localePath(locale, '/'),
        currentLabel: 'The App',
      },
      hero: {
        title: 'Meet the Anto App',
        subtitle:
          'Published version {version} (Expo). See what the app includes, how it works under the hood, and links to the open-source code.',
        githubLinkText: 'View code on GitHub',
        badges: {
          versionLabel: '{versionLabel}',
          earlyAccess: '📱 iOS + Android early access',
          privacy: '🔒 100% Private',
          realtime: '⚡ Real-Time',
        },
      },
      latestUpdates: {
        title: 'Recent Anto Updates',
        subtitle: 'The latest published across the Anto ecosystem, reflected on this site.',
        cards: [
          {
            icon: '🆕',
            label: 'Updated Welcome flow',
            description:
              'New onboarding narrative with clearer value proposition and a more visible download CTA.',
          },
          {
            icon: '🔒',
            label: 'More privacy transparency',
            description:
              'Direct links and contextual text to the privacy policy were added within the flow.',
          },
          {
            icon: '📌',
            label: 'Version tracking',
            description:
              'The changelog stays aligned with the published version for easier traceability.',
          },
        ],
        note: {
          beforeChangelog: 'See the full detail in',
          changelogLabel: 'Changelog',
          changelogHref: localePath(locale, '/changelog'),
          betweenChangelogBienvenida: ', explore the',
          bienvenidaLabel: 'Welcome',
          bienvenidaHref: localePath(locale, '/bienvenida'),
          betweenBienvenidaPrivacidad: ' flow, and read',
          privacidadLabel: 'Privacy',
          privacidadHref: localePath(locale, '/privacidad'),
          afterPrivacidad: '.',
        },
      },
      insights: {
        title: 'App Insights',
        subtitle: 'Data and metrics that show Anto’s impact on mental wellness',
        cards: [
          {
            icon: '💬',
            value: '<2.5s',
            label: 'AI response time',
            description:
              'GPT-5.4 Mini integration optimized for fast, contextual real-time responses via Socket.IO',
          },
          {
            icon: '📊',
            value: '97%+',
            label: 'Tests passing',
            description:
              'Automated test coverage that ensures stability and reliability with every update',
          },
          {
            icon: '🛡️',
            value: 'E2E',
            label: 'Full encryption',
            description:
              'All communications protected with JWT, bcrypt, and robust validation with Joi and DOMPurify',
          },
          {
            icon: '⚡',
            value: 'Real-time',
            label: 'Instant communication',
            description:
              'WebSockets with Socket.IO for real-time chat, push notifications, and multi-device sync',
          },
          {
            icon: '🚨',
            value: 'Auto',
            label: 'Crisis detection',
            description:
              'Proactive system that detects risk patterns and triggers emergency protocols with Twilio and SendGrid',
          },
          {
            icon: '📈',
            value: '35%',
            label: 'Symptom reduction',
            description:
              'Scientific studies show significant reduction in depression and anxiety symptoms after 8 weeks of consistent use',
          },
        ],
      },
      advancedFeatures: {
        title: 'Advanced Features',
        subtitle: 'Features that make Anto a unique tool for your mental wellness.',
        versionHighlight:
          '{versionLabel}: current store release with recent language, chat, and free-trial improvements',
        features: buildAdvancedFeaturesEn(),
      },
      techSpecs: {
        title: 'Technical Specifications',
        subtitle: 'Technical details on app performance and capabilities',
        cards: [
          {
            title: '📱 Frontend (React Native)',
            items: [
              'Cross-platform React Native',
              'Expo for rapid development',
              'React Navigation',
              'AsyncStorage for local data',
              'Socket.IO Client for real-time',
              'Native push notifications',
            ],
          },
          {
            title: '⚙️ Backend (Node.js)',
            items: [
              'Node.js and Express.js',
              'MongoDB with Mongoose',
              'Socket.IO for WebSockets',
              'OpenAI API (GPT-5.4 Mini)',
              'Winston for logging',
              'Sentry for error tracking',
            ],
          },
          {
            title: '🔒 Security and Privacy',
            items: [
              'JWT authentication',
              'bcrypt password hashing',
              'Helmet security headers',
              'Joi robust validation',
              'DOMPurify sanitization',
              'Rate limiting and DDoS protection',
            ],
          },
          {
            title: '🔗 Integrations',
            items: [
              'Mercado Pago for payments',
              'SendGrid for email',
              'Twilio for WhatsApp/SMS',
              'OpenAI for conversational AI',
              'Sentry for monitoring',
              'SSL/HTTPS on all connections',
            ],
          },
        ],
      },
      cta: {
        title: 'Ready to get started?',
        subtitle: `Download Anto now and begin your journey toward better mental wellness. ${trial.heroNote}`,
        downloadLabel: 'Download Now',
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
      title: 'Conoce la Aplicación Anto',
      subtitle:
        'Versión publicada {version} (Expo). Descubre qué incluye la app, cómo funciona por dentro y enlaces al código abierto.',
      githubLinkText: 'Ver código en GitHub',
      badges: {
        versionLabel: '{versionLabel}',
        earlyAccess: '📱 iOS + Android acceso anticipado',
        privacy: '🔒 100% Privado',
        realtime: '⚡ Tiempo Real',
      },
    },
    latestUpdates: {
      title: 'Novedades Recientes de Anto',
      subtitle: 'Lo más reciente publicado en el ecosistema Anto y reflejado en esta web.',
      cards: [
        {
          icon: '🆕',
          label: 'Flujo de Bienvenida actualizado',
          description:
            'Nueva narrativa de onboarding con mejor claridad de propuesta de valor y CTA de descarga más visible.',
        },
        {
          icon: '🔒',
          label: 'Más transparencia de privacidad',
          description:
            'Se incorporaron accesos directos y texto contextual a la política de privacidad dentro del flujo.',
        },
        {
          icon: '📌',
          label: 'Seguimiento de versiones',
          description:
            'El historial de cambios se mantiene alineado con la versión publicada para facilitar trazabilidad.',
        },
      ],
      note: {
        beforeChangelog: 'Revisa el detalle completo en',
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
    insights: {
      title: 'Insights de la Aplicación',
      subtitle: 'Datos y métricas que demuestran el impacto de Anto en el bienestar mental',
      cards: [
        {
          icon: '💬',
          value: '<2.5s',
          label: 'Respuesta del AI',
          description:
            'Integración con GPT-5.4 Mini optimizada para respuestas rápidas y contextuales en tiempo real mediante Socket.IO',
        },
        {
          icon: '📊',
          value: '97%+',
          label: 'Tests pasando',
          description:
            'Cobertura de tests automatizados que garantizan estabilidad y confiabilidad en cada actualización',
        },
        {
          icon: '🛡️',
          value: 'E2E',
          label: 'Encriptación completa',
          description:
            'Todas las comunicaciones protegidas con JWT, bcrypt y validación robusta con Joi y DOMPurify',
        },
        {
          icon: '⚡',
          value: 'Real-time',
          label: 'Comunicación instantánea',
          description:
            'WebSockets con Socket.IO para chat en tiempo real, notificaciones push y sincronización multi-dispositivo',
        },
        {
          icon: '🚨',
          value: 'Auto',
          label: 'Detección de crisis',
          description:
            'Sistema proactivo que detecta patrones de riesgo y activa protocolos de emergencia con Twilio y SendGrid',
        },
        {
          icon: '📈',
          value: '35%',
          label: 'Reducción de síntomas',
          description:
            'Estudios científicos demuestran reducción significativa en síntomas de depresión y ansiedad tras 8 semanas de uso consistente',
        },
      ],
    },
    advancedFeatures: {
      title: 'Características Avanzadas',
      subtitle: 'Funcionalidades que hacen de Anto una herramienta única para tu bienestar mental.',
      versionHighlight:
        '{versionLabel}: línea actual en tiendas, con mejoras recientes de idioma, chat y prueba gratuita.',
      features: buildAdvancedFeaturesEs(),
    },
    techSpecs: {
      title: 'Especificaciones Técnicas',
      subtitle: 'Detalles técnicos sobre el rendimiento y capacidades de la aplicación',
      cards: [
        {
          title: '📱 Frontend (React Native)',
          items: [
            'React Native multiplataforma',
            'Expo para desarrollo rápido',
            'React Navigation',
            'AsyncStorage para datos locales',
            'Socket.IO Client para tiempo real',
            'Notificaciones push nativas',
          ],
        },
        {
          title: '⚙️ Backend (Node.js)',
          items: [
            'Node.js y Express.js',
            'MongoDB con Mongoose',
            'Socket.IO para WebSockets',
            'OpenAI API (GPT-5.4 Mini)',
            'Winston para logging',
            'Sentry para error tracking',
          ],
        },
        {
          title: '🔒 Seguridad y Privacidad',
          items: [
            'JWT para autenticación',
            'bcrypt para hasheo de contraseñas',
            'Helmet con headers de seguridad',
            'Joi para validación robusta',
            'DOMPurify para sanitización',
            'Rate limiting y protección DDoS',
          ],
        },
        {
          title: '🔗 Integraciones',
          items: [
            'Mercado Pago para pagos',
            'SendGrid para emails',
            'Twilio para WhatsApp/SMS',
            'OpenAI para IA conversacional',
            'Sentry para monitoreo',
            'SSL/HTTPS en todas las conexiones',
          ],
        },
      ],
    },
    cta: {
      title: '¿Listo para comenzar?',
      subtitle: `Descarga Anto ahora y comienza tu viaje hacia un mejor bienestar mental. ${trial.heroNote}`,
      downloadLabel: 'Descargar Ahora',
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
