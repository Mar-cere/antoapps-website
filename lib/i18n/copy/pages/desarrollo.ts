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

export type DesarrolloTechCategory = {
  icon: string;
  title: string;
  items: string[];
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
    title: string;
    subtitle: string;
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
    title: 'Frontend Móvil',
    description: 'React Native con Expo para desarrollo multiplataforma',
    tags: ['React Native', 'Expo', 'TypeScript'],
  },
  {
    icon: '🌐',
    title: 'Frontend Web',
    description: 'Next.js, HTML5, CSS3 y JavaScript modular',
    tags: ['Next.js', 'HTML5', 'CSS3', 'PWA'],
  },
  {
    icon: '⚙️',
    title: 'Backend API',
    description: 'Node.js con Express.js para APIs RESTful',
    tags: ['Node.js', 'Express.js', 'REST API', 'WebSockets'],
  },
  {
    icon: '🤖',
    title: 'IA y ML',
    description: 'GPT-5.4 Mini para procesamiento de lenguaje natural',
    tags: ['GPT-5.4 Mini', 'NLP', 'Machine Learning'],
  },
  {
    icon: '💾',
    title: 'Base de Datos',
    description: 'MongoDB para almacenamiento escalable',
    tags: ['MongoDB', 'Mongoose', 'Redis'],
  },
];

const architectureLayersEn: DesarrolloArchitectureLayer[] = [
  {
    icon: '📱',
    title: 'Mobile Frontend',
    description: 'React Native with Expo for cross-platform development',
    tags: ['React Native', 'Expo', 'TypeScript'],
  },
  {
    icon: '🌐',
    title: 'Web Frontend',
    description: 'Next.js, HTML5, CSS3, and modular JavaScript',
    tags: ['Next.js', 'HTML5', 'CSS3', 'PWA'],
  },
  {
    icon: '⚙️',
    title: 'Backend API',
    description: 'Node.js with Express.js for RESTful APIs',
    tags: ['Node.js', 'Express.js', 'REST API', 'WebSockets'],
  },
  {
    icon: '🤖',
    title: 'AI and ML',
    description: 'GPT-5.4 Mini for natural language processing',
    tags: ['GPT-5.4 Mini', 'NLP', 'Machine Learning'],
  },
  {
    icon: '💾',
    title: 'Database',
    description: 'MongoDB for scalable storage',
    tags: ['MongoDB', 'Mongoose', 'Redis'],
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
    title: 'Frontend Móvil',
    items: [
      'React Native — multiplataforma',
      'Expo SDK',
      'React Navigation',
      'AsyncStorage',
      'Socket.IO Client',
      'Notificaciones Push',
    ],
  },
  {
    icon: '🌐',
    title: 'Frontend Web',
    items: [
      'Next.js — App Router',
      'HTML5 semántico',
      'CSS3 con tokens de diseño',
      'Service Workers — PWA',
      'Web APIs',
      'TypeScript',
    ],
  },
  {
    icon: '⚡',
    title: 'Backend',
    items: [
      'Node.js',
      'Express.js',
      'MongoDB + Mongoose',
      'Socket.IO (WebSockets)',
      'Winston (Logging)',
      'Sentry (Error Tracking)',
    ],
  },
  {
    icon: '🤖',
    title: 'Inteligencia Artificial',
    items: [
      'OpenAI GPT-5.4 Mini API',
      'Procesamiento de lenguaje natural',
      'Análisis emocional',
      'Detección de patrones',
    ],
  },
  {
    icon: '🔒',
    title: 'Seguridad',
    items: [
      'JWT (Autenticación)',
      'bcrypt (Hasheo)',
      'Helmet (Headers)',
      'Joi (Validación)',
      'DOMPurify (Sanitización)',
      'Rate Limiting',
    ],
  },
  {
    icon: '🚀',
    title: 'DevOps & Tools',
    items: [
      'Git + GitHub Actions',
      'Vercel/Netlify',
      'Sentry',
      'ESLint/Prettier',
      'Postman',
      'SSL/HTTPS',
    ],
  },
];

const techStackEn: DesarrolloTechCategory[] = [
  {
    icon: '📱',
    title: 'Mobile Frontend',
    items: [
      'React Native — cross-platform',
      'Expo SDK',
      'React Navigation',
      'AsyncStorage',
      'Socket.IO Client',
      'Push Notifications',
    ],
  },
  {
    icon: '🌐',
    title: 'Web Frontend',
    items: [
      'Next.js — App Router',
      'Semantic HTML5',
      'CSS3 with design tokens',
      'Service Workers — PWA',
      'Web APIs',
      'TypeScript',
    ],
  },
  {
    icon: '⚡',
    title: 'Backend',
    items: [
      'Node.js',
      'Express.js',
      'MongoDB + Mongoose',
      'Socket.IO (WebSockets)',
      'Winston (Logging)',
      'Sentry (Error Tracking)',
    ],
  },
  {
    icon: '🤖',
    title: 'Artificial Intelligence',
    items: [
      'OpenAI GPT-5.4 Mini API',
      'Natural language processing',
      'Emotional analysis',
      'Pattern detection',
    ],
  },
  {
    icon: '🔒',
    title: 'Security',
    items: [
      'JWT (Authentication)',
      'bcrypt (Hashing)',
      'Helmet (Headers)',
      'Joi (Validation)',
      'DOMPurify (Sanitization)',
      'Rate Limiting',
    ],
  },
  {
    icon: '🚀',
    title: 'DevOps & Tools',
    items: [
      'Git + GitHub Actions',
      'Vercel/Netlify',
      'Sentry',
      'ESLint/Prettier',
      'Postman',
      'SSL/HTTPS',
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
  { value: '15K+', label: 'Líneas de Código' },
  { value: '50+', label: 'Componentes Reutilizables' },
  { value: '97%+', label: 'Cobertura de Tests' },
  { value: '<2s', label: 'Tiempo de Respuesta' },
  { value: '99.9%', label: 'Uptime' },
  { value: 'A+', label: 'Security Score' },
];

const metricsEn: DesarrolloMetric[] = [
  { value: '15K+', label: 'Lines of Code' },
  { value: '50+', label: 'Reusable Components' },
  { value: '97%+', label: 'Test Coverage' },
  { value: '<2s', label: 'Response Time' },
  { value: '99.9%', label: 'Uptime' },
  { value: 'A+', label: 'Security Score' },
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
        title: 'Development - Anto | Development Process',
        description:
          'Learn how Anto was built, the technologies used, the development process, and the technical challenges overcome.',
        openGraphTitle: 'Development - Anto',
        openGraphDescription: 'Learn how Anto was built and the technologies used.',
        canonicalPath: CANONICAL_PATH,
      },
      hero: {
        title: 'Development Process',
        subtitle:
          'A technical look at Anto development: architecture, technologies, and design decisions',
      },
      architecture: {
        sectionTitle: 'System Architecture',
        intro:
          'Anto was built with a focus on scalability, security, and user experience. The architecture is designed to handle millions of conversations while maintaining user data privacy and security.',
        layers: architectureLayersEn,
      },
      process: {
        sectionTitle: 'Development Process',
        sectionSubtitle: 'Agile methodology and iterative approach',
        steps: processStepsEn,
      },
      techStack: {
        title: 'Complete Technology Stack',
        introBefore: 'Real technologies used in Anto development according to the',
        repoLinkLabel: 'official repository',
        repoLinkHref: GITHUB_REPO,
        categories: techStackEn,
        githubCtaLabel: 'View Repository on GitHub →',
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
        bio: 'Full-Stack Developer specialized in mental health applications and AI technologies.',
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
        title: 'Interested in the Code?',
        description:
          'This project demonstrates skills in full-stack development, software architecture, and best practices. If you are interested in more technical details or collaborating, feel free to contact me.',
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
      title: 'Desarrollo - Anto | Proceso de Desarrollo',
      description:
        'Conoce cómo se desarrolló Anto, las tecnologías utilizadas, el proceso de desarrollo y los desafíos técnicos superados.',
      openGraphTitle: 'Desarrollo - Anto',
      openGraphDescription: 'Conoce cómo se desarrolló Anto y las tecnologías utilizadas.',
      canonicalPath: CANONICAL_PATH,
    },
    hero: {
      title: 'Proceso de Desarrollo',
      subtitle:
        'Una mirada técnica al desarrollo de Anto: arquitectura, tecnologías y decisiones de diseño',
    },
    architecture: {
      sectionTitle: 'Arquitectura del Sistema',
      intro:
        'Anto fue desarrollado con un enfoque en escalabilidad, seguridad y experiencia de usuario. La arquitectura está diseñada para manejar millones de conversaciones mientras mantiene la privacidad y seguridad de los datos de los usuarios.',
      layers: architectureLayersEs,
    },
    process: {
      sectionTitle: 'Proceso de Desarrollo',
      sectionSubtitle: 'Metodología ágil y enfoque iterativo',
      steps: processStepsEs,
    },
    techStack: {
      title: 'Stack Tecnológico Completo',
      introBefore: 'Tecnologías reales utilizadas en el desarrollo de Anto según el',
      repoLinkLabel: 'repositorio oficial',
      repoLinkHref: GITHUB_REPO,
      categories: techStackEs,
      githubCtaLabel: 'Ver Repositorio en GitHub →',
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
      bio: 'Desarrollador Full-Stack especializado en aplicaciones de salud mental y tecnologías de IA.',
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
      title: '¿Interesado en el Código?',
      description:
        'Este proyecto demuestra habilidades en desarrollo full-stack, arquitectura de software, y mejores prácticas. Si estás interesado en conocer más detalles técnicos o colaborar, no dudes en contactarme.',
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
