import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n/config';
import { buildLocalizedPageMetadata } from '@/lib/i18n/metadata';
const CANONICAL_PATH = '/desarrollo';

const GITHUB_REPO = 'https://github.com/Mar-cere/Anto';
const GITHUB_WEBSITE = 'https://github.com/Mar-cere/antoapps-website';
const GITHUB_PROFILE = 'https://github.com/Mar-cere';
const LINKEDIN_PROFILE = 'https://www.linkedin.com/in/marcelo-ull-marambio-7314a6177/';
const DEVELOPER_EMAIL = 'marcelo.ull@antoapps.com';

export type DesarrolloArchitectureLayer = {
  icon: string;
  title: string;
  description: string;
  tags: string[];
};

export type DesarrolloProcessStep = {
  title: string;
  description: string;
  details: string[];
};

export type DesarrolloTechItem = {
  name: string;
  spec: string;
};

export type DesarrolloTechCategory = {
  icon: string;
  title: string;
  items: DesarrolloTechItem[];
};

export type DesarrolloChallenge = {
  icon: string;
  title: string;
  challenge: string;
  solution: string;
};

export type DesarrolloMetric = {
  value: string;
  label: string;
};

export type DesarrolloPageCopy = {
  breadcrumbs: { homeLabel: string; homeHref: string; currentLabel: string };
  meta: {
    title: string;
    description: string;
    openGraphTitle: string;
    openGraphDescription: string;
    canonicalPath: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    stackLine: string;
    highlightTechs: string[];
  };
  architecture: {
    sectionTitle: string;
    intro: string;
    layers: DesarrolloArchitectureLayer[];
  };
  process: {
    sectionTitle: string;
    sectionSubtitle: string;
    steps: DesarrolloProcessStep[];
  };
  techStack: {
    title: string;
    introBefore: string;
    repoLinkLabel: string;
    repoLinkHref: string;
    categories: DesarrolloTechCategory[];
    githubCtaLabel: string;
    githubCtaHref: string;
  };
  challenges: {
    sectionTitle: string;
    challengeLabel: string;
    solutionLabel: string;
    items: DesarrolloChallenge[];
  };
  metrics: {
    sectionTitle: string;
    items: DesarrolloMetric[];
  };
  developer: {
    sectionTitle: string;
    name: string;
    bio: string;
    email: string;
    githubAriaLabel: string;
    githubLabel: string;
    githubHref: string;
    linkedinAriaLabel: string;
    linkedinLabel: string;
    linkedinHref: string;
    reposTitle: string;
    appRepoLabel: string;
    appRepoHref: string;
    websiteRepoLabel: string;
    websiteRepoHref: string;
  };
  cta: {
    title: string;
    description: string;
    contactLabel: string;
    contactHref: string;
    emailLabel: string;
    emailHref: string;
  };
};

const architectureLayersEs: DesarrolloArchitectureLayer[] = [
  {
    icon: '📱',
    title: 'Cliente móvil',
    description:
      'React Native + Expo (EAS Build). Estado local con AsyncStorage, navegación con React Navigation, cliente Socket.IO para eventos en tiempo real.',
    tags: ['React Native', 'Expo SDK', 'TypeScript', 'Socket.IO Client'],
  },
  {
    icon: '🌐',
    title: 'Cliente web',
    description:
      'Next.js 14 App Router, TypeScript estricto, CSS con design tokens, PWA con Service Workers y rutas i18n ES/EN.',
    tags: ['Next.js 14', 'React 18', 'TypeScript', 'PWA'],
  },
  {
    icon: '⚙️',
    title: 'API y tiempo real',
    description:
      'Node.js + Express.js: REST JSON, middleware de seguridad (Helmet, rate limit), WebSockets con Socket.IO y logging estructurado (Winston).',
    tags: ['Node.js', 'Express.js', 'Socket.IO', 'REST + WS'],
  },
  {
    icon: '🤖',
    title: 'Capa de IA',
    description:
      'OpenAI GPT-5.4 Mini vía API REST: prompts con contexto de sesión, historial en MongoDB y análisis de sentimiento previo a cada respuesta.',
    tags: ['GPT-5.4 Mini', 'OpenAI API', 'NLP', 'Prompt pipeline'],
  },
  {
    icon: '💾',
    title: 'Persistencia',
    description:
      'MongoDB + Mongoose (documentos de usuario, chat, suscripciones). Redis para caché de sesión y colas de respuesta frecuentes.',
    tags: ['MongoDB', 'Mongoose', 'Redis', 'Índices compuestos'],
  },
];

const architectureLayersEn: DesarrolloArchitectureLayer[] = [
  {
    icon: '📱',
    title: 'Mobile client',
    description:
      'React Native + Expo (EAS Build). Local state with AsyncStorage, React Navigation, Socket.IO client for real-time events.',
    tags: ['React Native', 'Expo SDK', 'TypeScript', 'Socket.IO Client'],
  },
  {
    icon: '🌐',
    title: 'Web client',
    description:
      'Next.js 14 App Router, strict TypeScript, CSS design tokens, PWA with Service Workers, and ES/EN i18n routes.',
    tags: ['Next.js 14', 'React 18', 'TypeScript', 'PWA'],
  },
  {
    icon: '⚙️',
    title: 'API and real-time',
    description:
      'Node.js + Express.js: JSON REST, security middleware (Helmet, rate limit), Socket.IO WebSockets, and structured logging (Winston).',
    tags: ['Node.js', 'Express.js', 'Socket.IO', 'REST + WS'],
  },
  {
    icon: '🤖',
    title: 'AI layer',
    description:
      'OpenAI GPT-5.4 Mini via REST API: session-context prompts, MongoDB chat history, and sentiment analysis before each reply.',
    tags: ['GPT-5.4 Mini', 'OpenAI API', 'NLP', 'Prompt pipeline'],
  },
  {
    icon: '💾',
    title: 'Persistence',
    description:
      'MongoDB + Mongoose (user, chat, subscription documents). Redis for session cache and frequent-response queues.',
    tags: ['MongoDB', 'Mongoose', 'Redis', 'Compound indexes'],
  },
];

const processStepsEs: DesarrolloProcessStep[] = [
  {
    title: 'Planificación y Diseño',
    description:
      'Análisis de requisitos, diseño de arquitectura, wireframes y prototipos. Definición de stack tecnológico y estructura de base de datos.',
    details: [
      'Diseño de arquitectura del sistema',
      'Prototipado de UI/UX',
      'Definición de APIs',
      'Planificación de sprints',
    ],
  },
  {
    title: 'Desarrollo del Backend',
    description:
      'Implementación de APIs RESTful, integración con servicios de IA, sistema de autenticación y autorización, y configuración de base de datos.',
    details: [
      'API REST con Express.js',
      'Integración con GPT-5.4 Mini',
      'Sistema de autenticación JWT',
      'Encriptación end-to-end',
      'WebSockets para tiempo real',
    ],
  },
  {
    title: 'Desarrollo del Frontend',
    description:
      'Desarrollo de la aplicación móvil con React Native y del sitio web con Next.js, implementando PWA y optimizaciones de rendimiento.',
    details: [
      'Aplicación móvil multiplataforma',
      'Sitio web responsive',
      'PWA con Service Workers',
      'Optimizaciones de rendimiento',
      'Animaciones y microinteracciones',
    ],
  },
  {
    title: 'Integración y Testing',
    description:
      'Integración de todos los componentes, pruebas unitarias, de integración y de usuario. Optimización de rendimiento y seguridad.',
    details: [
      'Testing unitario y de integración',
      'Pruebas de seguridad',
      'Optimización de rendimiento',
      'Testing de carga',
      'Corrección de bugs',
    ],
  },
  {
    title: 'Despliegue y Monitoreo',
    description:
      'Despliegue en producción, configuración de CI/CD, monitoreo de errores y rendimiento, y actualizaciones continuas.',
    details: [
      'Despliegue en Vercel/Netlify',
      'CI/CD con GitHub Actions',
      'Monitoreo con Sentry',
      'Analytics y métricas',
      'Actualizaciones continuas',
    ],
  },
];

const processStepsEn: DesarrolloProcessStep[] = [
  {
    title: 'Planning and Design',
    description:
      'Requirements analysis, architecture design, wireframes, and prototypes. Technology stack definition and database structure.',
    details: [
      'System architecture design',
      'UI/UX prototyping',
      'API definition',
      'Sprint planning',
    ],
  },
  {
    title: 'Backend Development',
    description:
      'RESTful API implementation, AI service integration, authentication and authorization system, and database configuration.',
    details: [
      'REST API with Express.js',
      'GPT-5.4 Mini integration',
      'JWT authentication system',
      'End-to-end encryption',
      'WebSockets for real-time',
    ],
  },
  {
    title: 'Frontend Development',
    description:
      'Mobile app development with React Native and website with Next.js, implementing PWA and performance optimizations.',
    details: [
      'Cross-platform mobile app',
      'Responsive website',
      'PWA with Service Workers',
      'Performance optimizations',
      'Animations and micro-interactions',
    ],
  },
  {
    title: 'Integration and Testing',
    description:
      'Integration of all components, unit, integration, and user testing. Performance and security optimization.',
    details: [
      'Unit and integration testing',
      'Security testing',
      'Performance optimization',
      'Load testing',
      'Bug fixes',
    ],
  },
  {
    title: 'Deployment and Monitoring',
    description:
      'Production deployment, CI/CD configuration, error and performance monitoring, and continuous updates.',
    details: [
      'Deployment on Vercel/Netlify',
      'CI/CD with GitHub Actions',
      'Monitoring with Sentry',
      'Analytics and metrics',
      'Continuous updates',
    ],
  },
];

const techStackEs: DesarrolloTechCategory[] = [
  {
    icon: '📱',
    title: 'Frontend móvil',
    items: [
      { name: 'React Native', spec: 'iOS + Android · código compartido' },
      { name: 'Expo SDK', spec: 'EAS Build · OTA updates' },
      { name: 'TypeScript', spec: 'Tipado estricto en toda la app' },
      { name: 'React Navigation', spec: 'Stack + tabs nativos' },
      { name: 'Socket.IO Client', spec: 'Eventos bidireccionales <2.5s' },
      { name: 'Expo Notifications', spec: 'Push APNs / FCM' },
    ],
  },
  {
    icon: '🌐',
    title: 'Frontend web',
    items: [
      { name: 'Next.js 14', spec: 'App Router · SSR/SSG' },
      { name: 'React 18', spec: 'Server + Client Components' },
      { name: 'TypeScript 5', spec: 'tsc --noEmit en CI' },
      { name: 'CSS design tokens', spec: 'Variables · dark mode' },
      { name: 'Service Workers', spec: 'PWA offline-first' },
      { name: 'socket.io-client', spec: 'Sync con backend en vivo' },
    ],
  },
  {
    icon: '⚡',
    title: 'Backend',
    items: [
      { name: 'Node.js', spec: 'Runtime LTS · APIs JSON' },
      { name: 'Express.js', spec: 'Middleware chain · REST' },
      { name: 'MongoDB + Mongoose', spec: 'Esquemas · índices de chat' },
      { name: 'Socket.IO', spec: 'Rooms por usuario · heartbeat' },
      { name: 'Winston', spec: 'Logs estructurados JSON' },
      { name: 'Sentry', spec: 'Trazas de error en producción' },
    ],
  },
  {
    icon: '🤖',
    title: 'IA y datos',
    items: [
      { name: 'OpenAI GPT-5.4 Mini', spec: 'Chat completions · streaming' },
      { name: 'Pipeline de prompts', spec: 'Contexto + tono clínico-práctico' },
      { name: 'Análisis de sentimiento', spec: 'Pre-filtro antes del LLM' },
      { name: 'Detección de crisis', spec: 'Patrones + Twilio / SendGrid' },
      { name: 'Redis', spec: 'Caché de sesión y respuestas' },
      { name: 'i18n backend', spec: 'Respuestas ES/EN según locale' },
    ],
  },
  {
    icon: '🔒',
    title: 'Seguridad',
    items: [
      { name: 'JWT + refresh', spec: 'Sesiones con expiración' },
      { name: 'bcrypt', spec: 'Cost factor 12 en passwords' },
      { name: 'Helmet.js', spec: 'CSP · HSTS · XSS' },
      { name: 'Joi', spec: 'Validación de payloads API' },
      { name: 'DOMPurify', spec: 'Sanitización de inputs' },
      { name: 'Rate limiting', spec: 'Anti-abuso por IP y usuario' },
    ],
  },
  {
    icon: '🚀',
    title: 'DevOps e integraciones',
    items: [
      { name: 'GitHub Actions', spec: 'CI: lint · type-check · build' },
      { name: 'Vercel', spec: 'Deploy web · preview branches' },
      { name: 'Mercado Pago', spec: 'Suscripciones in-app' },
      { name: 'SendGrid', spec: 'Emails transaccionales' },
      { name: 'Twilio', spec: 'WhatsApp/SMS en crisis' },
      { name: 'ESLint + Prettier', spec: 'Estilo unificado en monorepo' },
    ],
  },
];

const techStackEn: DesarrolloTechCategory[] = [
  {
    icon: '📱',
    title: 'Mobile frontend',
    items: [
      { name: 'React Native', spec: 'iOS + Android · shared codebase' },
      { name: 'Expo SDK', spec: 'EAS Build · OTA updates' },
      { name: 'TypeScript', spec: 'Strict typing across the app' },
      { name: 'React Navigation', spec: 'Native stack + tabs' },
      { name: 'Socket.IO Client', spec: 'Bidirectional events <2.5s' },
      { name: 'Expo Notifications', spec: 'Push APNs / FCM' },
    ],
  },
  {
    icon: '🌐',
    title: 'Web frontend',
    items: [
      { name: 'Next.js 14', spec: 'App Router · SSR/SSG' },
      { name: 'React 18', spec: 'Server + Client Components' },
      { name: 'TypeScript 5', spec: 'tsc --noEmit in CI' },
      { name: 'CSS design tokens', spec: 'Variables · dark mode' },
      { name: 'Service Workers', spec: 'PWA offline-first' },
      { name: 'socket.io-client', spec: 'Live sync with backend' },
    ],
  },
  {
    icon: '⚡',
    title: 'Backend',
    items: [
      { name: 'Node.js', spec: 'LTS runtime · JSON APIs' },
      { name: 'Express.js', spec: 'Middleware chain · REST' },
      { name: 'MongoDB + Mongoose', spec: 'Schemas · chat indexes' },
      { name: 'Socket.IO', spec: 'Per-user rooms · heartbeat' },
      { name: 'Winston', spec: 'Structured JSON logs' },
      { name: 'Sentry', spec: 'Production error traces' },
    ],
  },
  {
    icon: '🤖',
    title: 'AI and data',
    items: [
      { name: 'OpenAI GPT-5.4 Mini', spec: 'Chat completions · streaming' },
      { name: 'Prompt pipeline', spec: 'Context + clinical-practical tone' },
      { name: 'Sentiment analysis', spec: 'Pre-filter before LLM' },
      { name: 'Crisis detection', spec: 'Patterns + Twilio / SendGrid' },
      { name: 'Redis', spec: 'Session and response cache' },
      { name: 'Backend i18n', spec: 'ES/EN replies by locale' },
    ],
  },
  {
    icon: '🔒',
    title: 'Security',
    items: [
      { name: 'JWT + refresh', spec: 'Sessions with expiry' },
      { name: 'bcrypt', spec: 'Cost factor 12 on passwords' },
      { name: 'Helmet.js', spec: 'CSP · HSTS · XSS' },
      { name: 'Joi', spec: 'API payload validation' },
      { name: 'DOMPurify', spec: 'Input sanitisation' },
      { name: 'Rate limiting', spec: 'Anti-abuse per IP and user' },
    ],
  },
  {
    icon: '🚀',
    title: 'DevOps and integrations',
    items: [
      { name: 'GitHub Actions', spec: 'CI: lint · type-check · build' },
      { name: 'Vercel', spec: 'Web deploy · preview branches' },
      { name: 'Mercado Pago', spec: 'In-app subscriptions' },
      { name: 'SendGrid', spec: 'Transactional email' },
      { name: 'Twilio', spec: 'WhatsApp/SMS on crisis' },
      { name: 'ESLint + Prettier', spec: 'Unified style in monorepo' },
    ],
  },
];

const challengesEs: DesarrolloChallenge[] = [
  {
    icon: '⚡',
    title: 'Rendimiento en Tiempo Real',
    challenge: 'Procesar y responder conversaciones en tiempo real con baja latencia.',
    solution:
      'Implementación de WebSockets con Socket.IO, caché con Redis, y optimización de queries a la base de datos.',
  },
  {
    icon: '🔒',
    title: 'Seguridad y Privacidad',
    challenge: 'Garantizar la privacidad total de conversaciones sensibles sobre salud mental.',
    solution:
      'Encriptación end-to-end, autenticación JWT, headers de seguridad, y cumplimiento GDPR/HIPAA.',
  },
  {
    icon: '📱',
    title: 'Multiplataforma',
    challenge: 'Mantener consistencia entre iOS, Android y Web.',
    solution: 'React Native para móvil, código compartido, y diseño responsive para web.',
  },
  {
    icon: '🤖',
    title: 'Integración con IA',
    challenge: 'Integrar GPT de forma eficiente y con contexto emocional.',
    solution:
      'Sistema de prompts optimizados, caché de respuestas comunes, y análisis de sentimiento previo.',
  },
  {
    icon: '📊',
    title: 'Escalabilidad',
    challenge: 'Escalar para manejar millones de usuarios y conversaciones.',
    solution:
      'Arquitectura modular, bases de datos distribuidas, CDN, y auto-scaling en la nube.',
  },
  {
    icon: '🎨',
    title: 'Experiencia de Usuario',
    challenge: 'Crear una interfaz intuitiva y accesible para todos los usuarios.',
    solution:
      'Diseño centrado en el usuario, testing constante, accesibilidad WCAG, y feedback continuo.',
  },
];

const challengesEn: DesarrolloChallenge[] = [
  {
    icon: '⚡',
    title: 'Real-Time Performance',
    challenge: 'Process and respond to conversations in real time with low latency.',
    solution:
      'WebSockets with Socket.IO, Redis caching, and optimized database queries.',
  },
  {
    icon: '🔒',
    title: 'Security and Privacy',
    challenge: 'Ensure total privacy of sensitive mental health conversations.',
    solution:
      'End-to-end encryption, JWT authentication, security headers, and GDPR/HIPAA compliance.',
  },
  {
    icon: '📱',
    title: 'Cross-Platform',
    challenge: 'Maintain consistency across iOS, Android, and Web.',
    solution: 'React Native for mobile, shared code, and responsive design for web.',
  },
  {
    icon: '🤖',
    title: 'AI Integration',
    challenge: 'Integrate GPT efficiently with emotional context.',
    solution:
      'Optimized prompt system, common response caching, and prior sentiment analysis.',
  },
  {
    icon: '📊',
    title: 'Scalability',
    challenge: 'Scale to handle millions of users and conversations.',
    solution:
      'Modular architecture, distributed databases, CDN, and cloud auto-scaling.',
  },
  {
    icon: '🎨',
    title: 'User Experience',
    challenge: 'Create an intuitive and accessible interface for all users.',
    solution:
      'User-centered design, constant testing, WCAG accessibility, and continuous feedback.',
  },
];

const metricsEs: DesarrolloMetric[] = [
  { value: '15K+', label: 'LOC TypeScript/JS' },
  { value: '3', label: 'Clientes (iOS · Android · Web)' },
  { value: '97%+', label: 'Tests en CI' },
  { value: '<2.5s', label: 'Latencia chat (p95)' },
  { value: 'REST+WS', label: 'API dual (HTTP + Socket.IO)' },
  { value: '6', label: 'Capas de seguridad activas' },
];

const metricsEn: DesarrolloMetric[] = [
  { value: '15K+', label: 'LOC TypeScript/JS' },
  { value: '3', label: 'Clients (iOS · Android · Web)' },
  { value: '97%+', label: 'CI test pass rate' },
  { value: '<2.5s', label: 'Chat latency (p95)' },
  { value: 'REST+WS', label: 'Dual API (HTTP + Socket.IO)' },
  { value: '6', label: 'Active security layers' },
];

const heroHighlightTechs = [
  'React Native',
  'Expo SDK',
  'Next.js 14',
  'TypeScript',
  'Node.js',
  'Express.js',
  'MongoDB',
  'Socket.IO',
  'Redis',
  'GPT-5.4 Mini',
  'OpenAI API',
  'JWT',
  'GitHub Actions',
  'Vercel',
  'Sentry',
  'Twilio',
  'SendGrid',
  'Mercado Pago',
];

function buildDesarrolloPageCopy(locale: Locale): DesarrolloPageCopy {
  if (locale === 'en') {
    return {
      breadcrumbs: {
        homeLabel: 'Home',
        homeHref: localePath(locale, '/'),
        currentLabel: 'Development',
      },
      meta: {
        title: 'Development - Anto | Stack, Architecture and Open Source',
        description:
          'Full-stack technical documentation: React Native, Next.js 14, Node.js, MongoDB, Socket.IO, OpenAI GPT-5.4 Mini, and production security.',
        openGraphTitle: 'Development - Anto | Technology Stack',
        openGraphDescription:
          'React Native · Next.js · Node.js · MongoDB · GPT-5.4 Mini — how Anto is engineered.',
        canonicalPath: CANONICAL_PATH,
      },
      hero: {
        badge: 'Production stack · Open source',
        title: 'The engineering behind Anto',
        subtitle:
          'Full-stack architecture, conversational AI, and real-time messaging — documented from the official repository.',
        stackLine:
          'React Native (Expo) → Express.js / Socket.IO → MongoDB → OpenAI GPT-5.4 Mini',
        highlightTechs: heroHighlightTechs,
      },
      architecture: {
        sectionTitle: 'Layered architecture',
        intro:
          'Five decoupled layers: mobile and web clients, Node.js API with WebSockets, AI pipeline with session context, and MongoDB + Redis persistence. Each layer has its own scaling and security policies.',
        layers: architectureLayersEn,
      },
      process: {
        sectionTitle: 'Build pipeline',
        sectionSubtitle: 'From monorepo to production deploy (Vercel + EAS + GitHub Actions)',
        steps: processStepsEn,
      },
      techStack: {
        title: 'Production technology stack',
        introBefore: 'Libraries and services in the',
        repoLinkLabel: 'Anto monorepo',
        repoLinkHref: GITHUB_REPO,
        categories: techStackEn,
        githubCtaLabel: 'Browse source on GitHub →',
        githubCtaHref: GITHUB_REPO,
      },
      challenges: {
        sectionTitle: 'Technical Challenges and Solutions',
        challengeLabel: 'Challenge:',
        solutionLabel: 'Solution:',
        items: challengesEn,
      },
      metrics: {
        sectionTitle: 'Development Metrics',
        items: metricsEn,
      },
      developer: {
        sectionTitle: 'Lead Developer',
        name: 'Marcelo Ull Marambio',
        bio: 'Full-stack engineer: React Native/Expo, Next.js, Node.js, MongoDB, Socket.IO, and OpenAI integrations for production mental-health products.',
        email: DEVELOPER_EMAIL,
        githubAriaLabel: 'Marcelo Ull Marambio on GitHub',
        githubLabel: 'GitHub',
        githubHref: GITHUB_PROFILE,
        linkedinAriaLabel: 'Marcelo Ull Marambio on LinkedIn',
        linkedinLabel: 'LinkedIn',
        linkedinHref: LINKEDIN_PROFILE,
        reposTitle: 'Repositories',
        appRepoLabel: '📱 Anto App',
        appRepoHref: GITHUB_REPO,
        websiteRepoLabel: '🌐 Website',
        websiteRepoHref: GITHUB_WEBSITE,
      },
      cta: {
        title: 'Want to dive into the code?',
        description:
          'Open-source repositories with TypeScript, automated CI, and documented architecture. For audits, integrations, or collaboration on the stack, get in touch.',
        contactLabel: 'Contact',
        contactHref: localePath(locale, '/contacto'),
        emailLabel: 'Direct Email',
        emailHref: `mailto:${DEVELOPER_EMAIL}`,
      },
    };
  }

  return {
    breadcrumbs: {
      homeLabel: 'Inicio',
      homeHref: localePath(locale, '/'),
      currentLabel: 'Desarrollo',
    },
    meta: {
      title: 'Desarrollo - Anto | Stack, arquitectura y código abierto',
      description:
        'Documentación técnica full-stack: React Native, Next.js 14, Node.js, MongoDB, Socket.IO, OpenAI GPT-5.4 Mini y seguridad en producción.',
      openGraphTitle: 'Desarrollo - Anto | Stack tecnológico',
      openGraphDescription:
        'React Native · Next.js · Node.js · MongoDB · GPT-5.4 Mini — así está construido Anto.',
      canonicalPath: CANONICAL_PATH,
    },
    hero: {
      badge: 'Stack en producción · Código abierto',
      title: 'La ingeniería detrás de Anto',
      subtitle:
        'Arquitectura full-stack, IA conversacional y mensajería en tiempo real — documentado desde el repositorio oficial.',
      stackLine:
        'React Native (Expo) → Express.js / Socket.IO → MongoDB → OpenAI GPT-5.4 Mini',
      highlightTechs: heroHighlightTechs,
    },
    architecture: {
      sectionTitle: 'Arquitectura en capas',
      intro:
        'Cinco capas desacopladas: clientes móvil y web, API Node.js con WebSockets, pipeline de IA con contexto de sesión, y persistencia MongoDB + Redis. Cada capa tiene políticas propias de escalado y seguridad.',
      layers: architectureLayersEs,
    },
    process: {
      sectionTitle: 'Pipeline de construcción',
      sectionSubtitle: 'Del monorepo al deploy en producción (Vercel + EAS + GitHub Actions)',
      steps: processStepsEs,
    },
    techStack: {
      title: 'Stack tecnológico en producción',
      introBefore: 'Librerías y servicios del',
      repoLinkLabel: 'monorepo Anto',
      repoLinkHref: GITHUB_REPO,
      categories: techStackEs,
      githubCtaLabel: 'Explorar código en GitHub →',
      githubCtaHref: GITHUB_REPO,
    },
    challenges: {
      sectionTitle: 'Desafíos Técnicos y Soluciones',
      challengeLabel: 'Desafío:',
      solutionLabel: 'Solución:',
      items: challengesEs,
    },
    metrics: {
      sectionTitle: 'Métricas de Desarrollo',
      items: metricsEs,
    },
    developer: {
      sectionTitle: 'Desarrollador Principal',
      name: 'Marcelo Ull Marambio',
      bio: 'Ingeniero full-stack: React Native/Expo, Next.js, Node.js, MongoDB, Socket.IO e integraciones OpenAI en productos de salud mental en producción.',
      email: DEVELOPER_EMAIL,
      githubAriaLabel: 'GitHub de Marcelo Ull Marambio',
      githubLabel: 'GitHub',
      githubHref: GITHUB_PROFILE,
      linkedinAriaLabel: 'LinkedIn de Marcelo Ull Marambio',
      linkedinLabel: 'LinkedIn',
      linkedinHref: LINKEDIN_PROFILE,
      reposTitle: 'Repositorios',
      appRepoLabel: '📱 Aplicación Anto',
      appRepoHref: GITHUB_REPO,
      websiteRepoLabel: '🌐 Sitio Web',
      websiteRepoHref: GITHUB_WEBSITE,
    },
    cta: {
      title: '¿Quieres revisar el código?',
      description:
        'Repositorios open source con TypeScript, CI automatizado y arquitectura documentada. Para auditorías, integraciones o colaboración en el stack, escríbeme.',
      contactLabel: 'Contactar',
      contactHref: localePath(locale, '/contacto'),
      emailLabel: 'Email Directo',
      emailHref: `mailto:${DEVELOPER_EMAIL}`,
    },
  };
}

export function getDesarrolloPageCopy(locale: Locale): DesarrolloPageCopy {
  return buildDesarrolloPageCopy(locale);
}

export function desarrolloPageMetadata(locale: Locale): Metadata {
  const { meta } = buildDesarrolloPageCopy(locale);
  return buildLocalizedPageMetadata(locale, meta.canonicalPath, {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.openGraphTitle,
      description: meta.openGraphDescription,
    },
  });
}
