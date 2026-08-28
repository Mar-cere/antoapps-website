import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n/config';
import { buildLocalizedPageMetadata } from '@/lib/i18n/metadata';
const CANONICAL_PATH = '/desarrollo';

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
    intro: string;
    categories: DesarrolloTechCategory[];
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
    description: 'React Native + Expo. Navegación nativa y Socket.IO.',
    tags: ['React Native', 'Expo', 'TypeScript', 'Socket.IO'],
  },
  {
    icon: '🌐',
    title: 'Cliente web',
    description: 'Next.js, TypeScript, rutas ES/EN.',
    tags: ['Next.js', 'React', 'TypeScript', 'CSS'],
  },
  {
    icon: '⚙️',
    title: 'API y tiempo real',
    description: 'Express, REST, Socket.IO, logs Winston.',
    tags: ['Node.js', 'Express', 'Socket.IO', 'Winston'],
  },
  {
    icon: '🤖',
    title: 'Capa de IA',
    description: 'OpenAI, prompts con contexto de sesión, historial en MongoDB.',
    tags: ['OpenAI', 'Prompts', 'MongoDB', 'Redis'],
  },
  {
    icon: '💾',
    title: 'Persistencia',
    description: 'MongoDB (usuarios, chat, suscripciones). Redis para sesión.',
    tags: ['MongoDB', 'Mongoose', 'Redis', 'Índices'],
  },
];

const architectureLayersEn: DesarrolloArchitectureLayer[] = [
  {
    icon: '📱',
    title: 'Mobile client',
    description: 'React Native + Expo. Native navigation and Socket.IO.',
    tags: ['React Native', 'Expo', 'TypeScript', 'Socket.IO'],
  },
  {
    icon: '🌐',
    title: 'Web client',
    description: 'Next.js, TypeScript, ES/EN routes.',
    tags: ['Next.js', 'React', 'TypeScript', 'CSS'],
  },
  {
    icon: '⚙️',
    title: 'API and real-time',
    description: 'Express, REST, Socket.IO, Winston logs.',
    tags: ['Node.js', 'Express', 'Socket.IO', 'Winston'],
  },
  {
    icon: '🤖',
    title: 'AI layer',
    description: 'OpenAI, session-context prompts, chat history in MongoDB.',
    tags: ['OpenAI', 'Prompts', 'MongoDB', 'Redis'],
  },
  {
    icon: '💾',
    title: 'Persistence',
    description: 'MongoDB (users, chat, subscriptions). Redis for session.',
    tags: ['MongoDB', 'Mongoose', 'Redis', 'Indexes'],
  },
];

const processStepsEs: DesarrolloProcessStep[] = [
  {
    title: 'Plan',
    description: 'Arquitectura, APIs, cómo se ve.',
    details: [],
  },
  {
    title: 'API',
    description: 'Express, OpenAI, JWT. Cifrado en tránsito (TLS) y en reposo. Anto y el modelo leen el texto. WebSockets.',
    details: [],
  },
  {
    title: 'Clientes',
    description: 'React Native y Next.js.',
    details: [],
  },
  {
    title: 'Revisión',
    description: 'Lint, types, build en GitHub Actions.',
    details: [],
  },
  {
    title: 'Deploy',
    description: 'Sitio en Vercel, API en Render, Sentry.',
    details: [],
  },
];

const processStepsEn: DesarrolloProcessStep[] = [
  {
    title: 'Plan',
    description: 'Architecture, APIs, how it looks.',
    details: [],
  },
  {
    title: 'API',
    description: 'Express, OpenAI, JWT. Encryption in transit (TLS) and at rest. Anto and the model read the text. WebSockets.',
    details: [],
  },
  {
    title: 'Clients',
    description: 'React Native and Next.js.',
    details: [],
  },
  {
    title: 'Review',
    description: 'Lint, types, build on GitHub Actions.',
    details: [],
  },
  {
    title: 'Deploy',
    description: 'Site on Vercel, API on Render, Sentry.',
    details: [],
  },
];

const techStackEs: DesarrolloTechCategory[] = [
  {
    icon: '📱',
    title: 'Frontend móvil',
    items: [
      { name: 'React Native', spec: 'iOS y Android' },
      { name: 'Expo', spec: '' },
      { name: 'TypeScript', spec: '' },
      { name: 'React Navigation', spec: '' },
      { name: 'Socket.IO', spec: '' },
      { name: 'Expo Notifications', spec: '' },
    ],
  },
  {
    icon: '🌐',
    title: 'Frontend web',
    items: [
      { name: 'Next.js', spec: '' },
      { name: 'React', spec: '' },
      { name: 'TypeScript', spec: '' },
      { name: 'CSS tokens', spec: '' },
      { name: 'socket.io-client', spec: '' },
    ],
  },
  {
    icon: '⚡',
    title: 'Backend',
    items: [
      { name: 'Node.js', spec: '' },
      { name: 'Express', spec: '' },
      { name: 'MongoDB', spec: '' },
      { name: 'Socket.IO', spec: '' },
      { name: 'Winston', spec: '' },
      { name: 'Sentry', spec: '' },
    ],
  },
  {
    icon: '🤖',
    title: 'IA y datos',
    items: [
      { name: 'OpenAI', spec: '' },
      { name: 'Pipeline de prompts', spec: 'contexto de sesión' },
      { name: 'Redis', spec: '' },
      { name: 'i18n ES/EN', spec: '' },
    ],
  },
  {
    icon: '🔒',
    title: 'Seguridad',
    items: [
      { name: 'JWT + refresh', spec: '' },
      { name: 'bcrypt', spec: '' },
      { name: 'Helmet', spec: '' },
      { name: 'validación de payloads', spec: '' },
      { name: 'rate limiting', spec: '' },
    ],
  },
  {
    icon: '🚀',
    title: 'DevOps e integraciones',
    items: [
      { name: 'GitHub Actions', spec: '' },
      { name: 'Vercel', spec: '' },
      { name: 'Render', spec: '' },
      { name: 'Mercado Pago', spec: '' },
      { name: 'SendGrid', spec: '' },
      { name: 'ESLint', spec: '' },
    ],
  },
];

const techStackEn: DesarrolloTechCategory[] = [
  {
    icon: '📱',
    title: 'Mobile frontend',
    items: [
      { name: 'React Native', spec: 'iOS and Android' },
      { name: 'Expo', spec: '' },
      { name: 'TypeScript', spec: '' },
      { name: 'React Navigation', spec: '' },
      { name: 'Socket.IO', spec: '' },
      { name: 'Expo Notifications', spec: '' },
    ],
  },
  {
    icon: '🌐',
    title: 'Web frontend',
    items: [
      { name: 'Next.js', spec: '' },
      { name: 'React', spec: '' },
      { name: 'TypeScript', spec: '' },
      { name: 'CSS tokens', spec: '' },
      { name: 'socket.io-client', spec: '' },
    ],
  },
  {
    icon: '⚡',
    title: 'Backend',
    items: [
      { name: 'Node.js', spec: '' },
      { name: 'Express', spec: '' },
      { name: 'MongoDB', spec: '' },
      { name: 'Socket.IO', spec: '' },
      { name: 'Winston', spec: '' },
      { name: 'Sentry', spec: '' },
    ],
  },
  {
    icon: '🤖',
    title: 'AI and data',
    items: [
      { name: 'OpenAI', spec: '' },
      { name: 'Prompt pipeline', spec: 'session context' },
      { name: 'Redis', spec: '' },
      { name: 'i18n ES/EN', spec: '' },
    ],
  },
  {
    icon: '🔒',
    title: 'Security',
    items: [
      { name: 'JWT + refresh', spec: '' },
      { name: 'bcrypt', spec: '' },
      { name: 'Helmet', spec: '' },
      { name: 'payload validation', spec: '' },
      { name: 'rate limiting', spec: '' },
    ],
  },
  {
    icon: '🚀',
    title: 'DevOps and integrations',
    items: [
      { name: 'GitHub Actions', spec: '' },
      { name: 'Vercel', spec: '' },
      { name: 'Render', spec: '' },
      { name: 'Mercado Pago', spec: '' },
      { name: 'SendGrid', spec: '' },
      { name: 'ESLint', spec: '' },
    ],
  },
];

const challengesEs: DesarrolloChallenge[] = [
  {
    icon: '⚡',
    title: 'Rendimiento en tiempo real',
    challenge: 'Responder conversaciones al momento.',
    solution: 'WebSockets con Socket.IO, Redis y consultas simples.',
  },
  {
    icon: '🔒',
    title: 'Privacidad',
    challenge: 'Cuidar conversaciones privadas.',
    solution:
      'Cifrado en tránsito (TLS) y en reposo. Anto y el modelo leen el texto. Autenticación JWT y headers de seguridad.',
  },
  {
    icon: '📱',
    title: 'Multiplataforma',
    challenge: 'iOS, Android y web sin tres productos.',
    solution: 'React Native en el teléfono y este sitio en Next.js.',
  },
  {
    icon: '🤖',
    title: 'IA',
    challenge: 'Integrar OpenAI con el hilo de la persona.',
    solution: 'Prompts con contexto de sesión.',
  },
  {
    icon: '📊',
    title: 'Escala',
    challenge: 'Escalar la app y las conversaciones.',
    solution: 'API en Render, sitio en Vercel, GitHub Actions.',
  },
  {
    icon: '🎨',
    title: 'Uso',
    challenge: 'Que se entienda y se pueda usar.',
    solution: 'Una interfaz simple, la misma voz que el resto del sitio.',
  },
];

const challengesEn: DesarrolloChallenge[] = [
  {
    icon: '⚡',
    title: 'Real-time',
    challenge: 'Reply as the conversation happens.',
    solution: 'Socket.IO, Redis, simple queries.',
  },
  {
    icon: '🔒',
    title: 'Privacy',
    challenge: 'Keep conversations private.',
    solution:
      'Encryption in transit (TLS) and at rest. Anto and the model read the text. JWT auth and security headers.',
  },
  {
    icon: '📱',
    title: 'Cross-platform',
    challenge: 'iOS, Android, and web without three products.',
    solution: 'React Native on the phone, Next.js for this site.',
  },
  {
    icon: '🤖',
    title: 'AI',
    challenge: 'Use OpenAI with the person\'s thread.',
    solution: 'Prompts with session context.',
  },
  {
    icon: '📊',
    title: 'Scale',
    challenge: 'Scale the app and conversations.',
    solution: 'API on Render, site on Vercel, GitHub Actions.',
  },
  {
    icon: '🎨',
    title: 'Use',
    challenge: 'Make it understandable and usable.',
    solution: 'A simple interface, the same voice as the rest of the site.',
  },
];

const metricsEs: DesarrolloMetric[] = [];

const metricsEn: DesarrolloMetric[] = [];

const heroHighlightTechs = [
  'React Native',
  'Expo',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Express',
  'MongoDB',
  'Socket.IO',
  'Redis',
  'OpenAI',
  'JWT',
  'GitHub Actions',
  'Vercel',
  'Render',
  'Sentry',
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
        title: 'Development - Anto | Stack and Architecture',
        description:
          'Full-stack architecture, conversational AI, and real-time messaging built for reliable everyday use.',
        openGraphTitle: 'Development - Anto | Technology Stack',
        openGraphDescription:
          'React Native · Next.js · Node.js · MongoDB · OpenAI — how Anto is engineered.',
        canonicalPath: CANONICAL_PATH,
      },
      hero: {
        badge: 'Production stack',
        title: 'The engineering behind Anto',
        subtitle:
          'Full-stack architecture, conversational AI, and real-time messaging built for reliable everyday use.',
        stackLine: 'React Native (Expo) → Express.js / Socket.IO → MongoDB → OpenAI',
        highlightTechs: heroHighlightTechs,
      },
      architecture: {
        sectionTitle: 'Layered architecture',
        intro:
          'Mobile and web clients, Node API with WebSockets, AI pipeline with session context, MongoDB and Redis.',
        layers: architectureLayersEn,
      },
      process: {
        sectionTitle: 'Build pipeline',
        sectionSubtitle: 'From the repo to production (Vercel, Render, EAS, GitHub Actions).',
        steps: processStepsEn,
      },
      techStack: {
        title: 'Production technology stack',
        intro: 'Libraries and services that run the app, the API, and this site.',
        categories: techStackEn,
      },
      challenges: {
        sectionTitle: 'Challenges and solutions',
        challengeLabel: 'Challenge:',
        solutionLabel: 'Solution:',
        items: challengesEn,
      },
      metrics: {
        sectionTitle: 'Development Metrics',
        items: metricsEn,
      },
      developer: {
        sectionTitle: 'Who builds it',
        name: 'Marcelo Ull Marambio',
        bio: 'Full-stack engineer: React Native/Expo, Next.js, Node.js, MongoDB, Socket.IO, and OpenAI integrations.',
        email: DEVELOPER_EMAIL,
        githubAriaLabel: 'Marcelo Ull Marambio on GitHub',
        githubLabel: 'GitHub',
        githubHref: GITHUB_PROFILE,
        linkedinAriaLabel: 'Marcelo Ull Marambio on LinkedIn',
        linkedinLabel: 'LinkedIn',
        linkedinHref: LINKEDIN_PROFILE,
      },
      cta: {
        title: 'If you have a question about how Anto is built, write to me.',
        description: '',
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
      title: 'Desarrollo - Anto | Stack y arquitectura',
      description:
        'Arquitectura full-stack, IA conversacional y mensajería en tiempo real pensadas para un uso fiable en el día a día.',
      openGraphTitle: 'Desarrollo - Anto | Stack tecnológico',
      openGraphDescription:
        'React Native · Next.js · Node.js · MongoDB · OpenAI — así está construido Anto.',
      canonicalPath: CANONICAL_PATH,
    },
    hero: {
      badge: 'Stack en producción',
      title: 'La ingeniería detrás de Anto',
      subtitle:
        'Arquitectura full-stack, IA conversacional y mensajería en tiempo real pensadas para un uso fiable en el día a día.',
      stackLine: 'React Native (Expo) → Express.js / Socket.IO → MongoDB → OpenAI',
      highlightTechs: heroHighlightTechs,
    },
    architecture: {
      sectionTitle: 'Arquitectura en capas',
      intro:
        'Clientes móvil y web, API Node con WebSockets, pipeline de IA con contexto de sesión, persistencia MongoDB y Redis.',
      layers: architectureLayersEs,
    },
    process: {
      sectionTitle: 'Pipeline de construcción',
      sectionSubtitle: 'Del repo a producción (Vercel, Render, EAS, GitHub Actions).',
      steps: processStepsEs,
    },
    techStack: {
      title: 'Stack tecnológico en producción',
      intro: 'Librerías y servicios que mueven la app, la API y este sitio.',
      categories: techStackEs,
    },
    challenges: {
      sectionTitle: 'Desafíos y soluciones',
      challengeLabel: 'Desafío:',
      solutionLabel: 'Solución:',
      items: challengesEs,
    },
    metrics: {
      sectionTitle: 'Métricas de Desarrollo',
      items: metricsEs,
    },
    developer: {
      sectionTitle: 'Quién lo construye',
      name: 'Marcelo Ull Marambio',
      bio: 'Ingeniero full-stack: React Native/Expo, Next.js, Node.js, MongoDB, Socket.IO e integraciones OpenAI.',
      email: DEVELOPER_EMAIL,
      githubAriaLabel: 'GitHub de Marcelo Ull Marambio',
      githubLabel: 'GitHub',
      githubHref: GITHUB_PROFILE,
      linkedinAriaLabel: 'LinkedIn de Marcelo Ull Marambio',
      linkedinLabel: 'LinkedIn',
      linkedinHref: LINKEDIN_PROFILE,
    },
    cta: {
      title: 'Si tenés una duda sobre cómo está armado Anto, escribime.',
      description: '',
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
