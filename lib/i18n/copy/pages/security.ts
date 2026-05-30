import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n/config';
import { buildLocalizedPageMetadata } from '@/lib/i18n/metadata';
const CANONICAL_PATH = '/seguridad';
const DEVELOPER_EMAIL = 'marcelo.ull@antoapps.com';

export type SecurityFaqItem = {
  question: string;
  answer: string;
};

export type SecurityCertification = {
  icon: string;
  title: string;
  description: string;
  linkLabel?: string;
  linkHref?: string;
  status?: string;
};

export type SecurityMeasure = {
  icon: string;
  title: string;
  description: string;
  details: string[];
};

export type SecurityReport = {
  title: string;
  description: string;
  buttonLabel?: string;
  buttonHref?: string;
  status?: string;
};

export type SecurityPageCopy = {
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
    badges: string[];
  };
  overview: {
    sectionTitle: string;
    intro: string;
    certificationsTitle: string;
    certifications: SecurityCertification[];
  };
  measures: {
    sectionTitle: string;
    items: SecurityMeasure[];
  };
  reports: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: SecurityReport[];
  };
  faq: {
    sectionTitle: string;
    items: SecurityFaqItem[];
  };
};

export const SECURITY_FAQ_ES: SecurityFaqItem[] = [
  {
    question: '¿Dónde se almacenan mis datos?',
    answer:
      'Tus datos se almacenan en servidores seguros ubicados en centros de datos de nivel empresarial con certificaciones SOC 2 y ISO 27001. Utilizamos proveedores de cloud líderes en la industria que garantizan redundancia, backups automáticos, y protección física de los servidores.',
  },
  {
    question: '¿Quién puede acceder a mis conversaciones?',
    answer:
      'Solo tú puedes acceder a tus conversaciones. Ni siquiera nuestros administradores pueden leer el contenido de tus mensajes debido a la encriptación end-to-end. El sistema de IA procesa tus mensajes de forma segura sin que humanos puedan verlos.',
  },
  {
    question: '¿Qué pasa si hay una brecha de seguridad?',
    answer:
      'En el improbable caso de una brecha de seguridad, te notificaremos inmediatamente (dentro de 72 horas según GDPR) y tomaremos todas las medidas necesarias para mitigar el impacto. Tenemos un plan de respuesta a incidentes documentado y probado regularmente.',
  },
  {
    question: '¿Cómo puedo verificar la seguridad de Anto?',
    answer: `Puedes revisar nuestros reportes de seguridad públicos, certificaciones, y políticas. También ofrecemos reportes de seguridad bajo NDA para clientes empresariales. Si tienes preguntas específicas, contacta a nuestro desarrollador principal en ${DEVELOPER_EMAIL}.`,
  },
];

export const SECURITY_FAQ_EN: SecurityFaqItem[] = [
  {
    question: 'Where is my data stored?',
    answer:
      'Your data is stored on secure servers in enterprise-grade data centers with SOC 2 and ISO 27001 certifications. We use industry-leading cloud providers that guarantee redundancy, automatic backups, and physical server protection.',
  },
  {
    question: 'Who can access my conversations?',
    answer:
      'Only you can access your conversations. Not even our administrators can read the content of your messages due to end-to-end encryption. The AI system processes your messages securely without humans being able to view them.',
  },
  {
    question: 'What happens if there is a security breach?',
    answer:
      'In the unlikely event of a security breach, we will notify you immediately (within 72 hours per GDPR) and take all necessary measures to mitigate the impact. We have a documented incident response plan that is tested regularly.',
  },
  {
    question: 'How can I verify Anto\'s security?',
    answer: `You can review our public security reports, certifications, and policies. We also offer security reports under NDA for enterprise clients. If you have specific questions, contact our lead developer at ${DEVELOPER_EMAIL}.`,
  },
];

const certificationsEs: SecurityCertification[] = [
  {
    icon: '🇪🇺',
    title: 'GDPR Compliant',
    description:
      'Cumplimiento total con el Reglamento General de Protección de Datos de la UE. Tus derechos están completamente protegidos.',
    linkLabel: 'Más sobre GDPR →',
    linkHref: 'https://gdpr.eu',
  },
  {
    icon: '🇺🇸',
    title: 'HIPAA Compliant',
    description:
      'Cumplimiento con la Ley de Portabilidad y Responsabilidad del Seguro Médico de EE.UU. para datos de salud protegidos.',
    linkLabel: 'Más sobre HIPAA →',
    linkHref: 'https://www.hhs.gov/hipaa',
  },
  {
    icon: '✅',
    title: 'SOC 2 Type II',
    description:
      'Auditoría independiente que verifica nuestros controles de seguridad, disponibilidad, procesamiento, confidencialidad y privacidad.',
    status: 'En proceso de certificación',
  },
  {
    icon: '🔐',
    title: 'ISO 27001',
    description:
      'Estándar internacional para sistemas de gestión de seguridad de la información. Implementamos todos los controles requeridos.',
    status: 'En proceso de certificación',
  },
];

const certificationsEn: SecurityCertification[] = [
  {
    icon: '🇪🇺',
    title: 'GDPR Compliant',
    description:
      'Full compliance with the EU General Data Protection Regulation. Your rights are fully protected.',
    linkLabel: 'Learn more about GDPR →',
    linkHref: 'https://gdpr.eu',
  },
  {
    icon: '🇺🇸',
    title: 'HIPAA Compliant',
    description:
      'Compliance with the U.S. Health Insurance Portability and Accountability Act for protected health data.',
    linkLabel: 'Learn more about HIPAA →',
    linkHref: 'https://www.hhs.gov/hipaa',
  },
  {
    icon: '✅',
    title: 'SOC 2 Type II',
    description:
      'Independent audit verifying our security, availability, processing, confidentiality, and privacy controls.',
    status: 'Certification in progress',
  },
  {
    icon: '🔐',
    title: 'ISO 27001',
    description:
      'International standard for information security management systems. We implement all required controls.',
    status: 'Certification in progress',
  },
];

const measuresEs: SecurityMeasure[] = [
  {
    icon: '🔐',
    title: 'Encriptación End-to-End',
    description:
      'Todas las conversaciones están encriptadas con AES-256, el mismo estándar usado por bancos y gobiernos. Las claves de encriptación son únicas para cada usuario y se almacenan de forma segura.',
    details: [
      'AES-256 para datos en reposo',
      'TLS 1.3 para datos en tránsito',
      'Claves de encriptación únicas por usuario',
      'Rotación automática de claves',
    ],
  },
  {
    icon: '🛡️',
    title: 'Autenticación Multifactor',
    description:
      'Sistema robusto de autenticación con múltiples capas de seguridad para proteger tu cuenta.',
    details: [
      'Autenticación de dos factores (2FA)',
      'Tokens JWT seguros con expiración',
      'Detección de accesos sospechosos',
      'Notificaciones de seguridad',
    ],
  },
  {
    icon: '🔍',
    title: 'Monitoreo y Detección',
    description: 'Monitoreo continuo 24/7 para detectar y prevenir amenazas de seguridad.',
    details: [
      'Monitoreo en tiempo real',
      'Detección de intrusiones (IDS)',
      'Análisis de comportamiento anómalo',
      'Alertas automáticas',
    ],
  },
  {
    icon: '🚫',
    title: 'Protección contra Ataques',
    description: 'Múltiples capas de protección contra diversos tipos de ataques cibernéticos.',
    details: [
      'Rate limiting y DDoS protection',
      'Firewall de aplicación web (WAF)',
      'Protección contra SQL injection',
      'Sanitización de inputs',
    ],
  },
  {
    icon: '💾',
    title: 'Backups y Recuperación',
    description: 'Tus datos están respaldados de forma segura con redundancia geográfica.',
    details: [
      'Backups automáticos diarios',
      'Almacenamiento en múltiples ubicaciones',
      'Pruebas de recuperación regulares',
      'RTO (Recovery Time Objective) < 4 horas',
    ],
  },
  {
    icon: '👥',
    title: 'Control de Acceso',
    description:
      'Principio de menor privilegio: solo el personal autorizado puede acceder a datos específicos.',
    details: [
      'Control de acceso basado en roles (RBAC)',
      'Auditoría de accesos',
      'Separación de entornos (dev/staging/prod)',
      'Acceso con doble autenticación para empleados',
    ],
  },
];

const measuresEn: SecurityMeasure[] = [
  {
    icon: '🔐',
    title: 'End-to-End Encryption',
    description:
      'All conversations are encrypted with AES-256, the same standard used by banks and governments. Encryption keys are unique per user and stored securely.',
    details: [
      'AES-256 for data at rest',
      'TLS 1.3 for data in transit',
      'Unique encryption keys per user',
      'Automatic key rotation',
    ],
  },
  {
    icon: '🛡️',
    title: 'Multi-Factor Authentication',
    description: 'Robust authentication system with multiple security layers to protect your account.',
    details: [
      'Two-factor authentication (2FA)',
      'Secure JWT tokens with expiration',
      'Suspicious access detection',
      'Security notifications',
    ],
  },
  {
    icon: '🔍',
    title: 'Monitoring and Detection',
    description: 'Continuous 24/7 monitoring to detect and prevent security threats.',
    details: [
      'Real-time monitoring',
      'Intrusion detection (IDS)',
      'Anomalous behavior analysis',
      'Automatic alerts',
    ],
  },
  {
    icon: '🚫',
    title: 'Attack Protection',
    description: 'Multiple layers of protection against various types of cyberattacks.',
    details: [
      'Rate limiting and DDoS protection',
      'Web application firewall (WAF)',
      'SQL injection protection',
      'Input sanitization',
    ],
  },
  {
    icon: '💾',
    title: 'Backups and Recovery',
    description: 'Your data is securely backed up with geographic redundancy.',
    details: [
      'Daily automatic backups',
      'Storage in multiple locations',
      'Regular recovery testing',
      'RTO (Recovery Time Objective) < 4 hours',
    ],
  },
  {
    icon: '👥',
    title: 'Access Control',
    description:
      'Principle of least privilege: only authorized personnel can access specific data.',
    details: [
      'Role-based access control (RBAC)',
      'Access auditing',
      'Environment separation (dev/staging/prod)',
      'Dual authentication for employees',
    ],
  },
];

function buildSecurityPageCopy(locale: Locale): SecurityPageCopy {
  if (locale === 'en') {
    return {
      breadcrumbs: {
        homeLabel: 'Home',
        homeHref: localePath(locale, '/'),
        currentLabel: 'Security',
      },
      meta: {
        title: 'Security - Anto | Military-Grade Data Protection',
        description:
          'Learn about all the security measures we implement in Anto. E2E encryption, certifications, audits, and compliance with GDPR, HIPAA, and more.',
        openGraphTitle: 'Security - Anto',
        openGraphDescription: 'Military-grade data protection in Anto.',
        canonicalPath: CANONICAL_PATH,
      },
      hero: {
        title: 'Military-Grade Security',
        subtitle:
          'Your privacy and security are our top priority. We implement industry best practices to protect your data.',
        badges: ['🔒 AES-256', '🛡️ GDPR', '⚖️ HIPAA', '✅ SOC 2', '🔐 ISO 27001'],
      },
      overview: {
        sectionTitle: 'Our Commitment to Security',
        intro:
          'At Anto, we understand that mental health data is extremely sensitive. That is why we built our platform from the ground up with security as a fundamental priority. Every byte of information is protected with multiple layers of security.',
        certificationsTitle: 'Certifications and Compliance',
        certifications: certificationsEn,
      },
      measures: {
        sectionTitle: 'Implemented Security Measures',
        items: measuresEn,
      },
      reports: {
        sectionTitle: 'Transparency and Reports',
        sectionSubtitle: 'We believe in full transparency about our security practices',
        items: [
          {
            title: '📊 Security Reports',
            description:
              'We publish quarterly reports on our security status, incidents (if any), and improvements implemented.',
            buttonLabel: 'View Latest Report',
            buttonHref: '#',
          },
          {
            title: '🔒 Responsible Disclosure Policy',
            description:
              'If you find a security vulnerability, we encourage you to report it responsibly. We have a rewards program.',
            buttonLabel: 'Report Vulnerability',
            buttonHref: `mailto:${DEVELOPER_EMAIL}`,
          },
          {
            title: '✅ External Audits',
            description:
              'We conduct regular security audits with independent firms to ensure our controls are effective.',
            status: 'Last audit: Q4 2025',
          },
        ],
      },
      faq: {
        sectionTitle: 'Frequently Asked Security Questions',
        items: SECURITY_FAQ_EN,
      },
    };
  }

  return {
    breadcrumbs: {
      homeLabel: 'Inicio',
      homeHref: localePath(locale, '/'),
      currentLabel: 'Seguridad',
    },
    meta: {
      title: 'Seguridad - Anto | Protección de Datos de Grado Militar',
      description:
        'Conoce todas las medidas de seguridad que implementamos en Anto. Encriptación E2E, certificaciones, auditorías y compliance con GDPR, HIPAA y más.',
      openGraphTitle: 'Seguridad - Anto',
      openGraphDescription: 'Protección de datos de grado militar en Anto.',
      canonicalPath: CANONICAL_PATH,
    },
    hero: {
      title: 'Seguridad de Grado Militar',
      subtitle:
        'Tu privacidad y seguridad son nuestra máxima prioridad. Implementamos las mejores prácticas de la industria para proteger tus datos.',
      badges: ['🔒 AES-256', '🛡️ GDPR', '⚖️ HIPAA', '✅ SOC 2', '🔐 ISO 27001'],
    },
    overview: {
      sectionTitle: 'Nuestro Compromiso con la Seguridad',
      intro:
        'En Anto, entendemos que los datos de salud mental son extremadamente sensibles. Por eso, hemos construido nuestra plataforma desde cero con seguridad como prioridad fundamental. Cada byte de información está protegido con múltiples capas de seguridad.',
      certificationsTitle: 'Certificaciones y Compliance',
      certifications: certificationsEs,
    },
    measures: {
      sectionTitle: 'Medidas de Seguridad Implementadas',
      items: measuresEs,
    },
    reports: {
      sectionTitle: 'Transparencia y Reportes',
      sectionSubtitle: 'Creemos en la transparencia total sobre nuestras prácticas de seguridad',
      items: [
        {
          title: '📊 Reportes de Seguridad',
          description:
            'Publicamos reportes trimestrales sobre el estado de nuestra seguridad, incidentes (si los hay), y mejoras implementadas.',
          buttonLabel: 'Ver Último Reporte',
          buttonHref: '#',
        },
        {
          title: '🔒 Política de Divulgación Responsable',
          description:
            'Si encuentras una vulnerabilidad de seguridad, te animamos a reportarla de forma responsable. Tenemos un programa de recompensas.',
          buttonLabel: 'Reportar Vulnerabilidad',
          buttonHref: `mailto:${DEVELOPER_EMAIL}`,
        },
        {
          title: '✅ Auditorías Externas',
          description:
            'Realizamos auditorías de seguridad regulares con firmas independientes para asegurar que nuestros controles son efectivos.',
          status: 'Última auditoría: Q4 2025',
        },
      ],
    },
    faq: {
      sectionTitle: 'Preguntas Frecuentes sobre Seguridad',
      items: SECURITY_FAQ_ES,
    },
  };
}

export function getSecurityPageCopy(locale: Locale): SecurityPageCopy {
  return buildSecurityPageCopy(locale);
}

export function securityPageMetadata(locale: Locale): Metadata {
  const { meta } = buildSecurityPageCopy(locale);
  return buildLocalizedPageMetadata(locale, meta.canonicalPath, {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.openGraphTitle,
      description: meta.openGraphDescription,
    },
  });
}
