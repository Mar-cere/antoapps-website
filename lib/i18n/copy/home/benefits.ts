import type { Locale } from '@/lib/i18n/config';

export type BenefitItem = {
  title: string;
  description: string;
};

export type BenefitTabId = 'usuarios' | 'profesionales' | 'organizaciones';

export type HomeBenefitsCopy = {
  title: string;
  subtitle: string;
  tabs: {
    id: BenefitTabId;
    label: string;
  }[];
  items: Record<BenefitTabId, BenefitItem[]>;
};

const benefitsCopy: Record<Locale, HomeBenefitsCopy> = {
  es: {
    title: 'Beneficios para Todos',
    subtitle: 'Anto ofrece beneficios únicos según tus necesidades. Descubre cómo podemos ayudarte.',
    tabs: [
      { id: 'usuarios', label: 'Para Usuarios' },
      { id: 'profesionales', label: 'Para Profesionales' },
      { id: 'organizaciones', label: 'Para Organizaciones' },
    ],
    items: {
      usuarios: [
        {
          title: 'Acceso Inmediato 24/7',
          description:
            'Sin esperas, sin citas, disponible cuando lo necesites. El asistente AI está siempre disponible, incluso en horarios nocturnos o fines de semana cuando otros servicios no están disponibles.',
        },
        {
          title: 'Privacidad Garantizada',
          description:
            'Tus conversaciones son completamente confidenciales con encriptación de extremo a extremo. Nunca compartimos tu información y cumplimos con todas las regulaciones de protección de datos.',
        },
        {
          title: 'Personalización Total',
          description:
            'Respuestas adaptadas a tu situación y necesidades específicas. El sistema aprende de ti y se adapta a tu estilo de comunicación, historial emocional y preferencias personales.',
        },
        {
          title: 'Herramientas Prácticas',
          description:
            'Más de 100 ejercicios y técnicas que puedes aplicar en tu día a día, incluyendo mindfulness, meditación, técnicas de respiración y ejercicios de relajación diseñados por profesionales.',
        },
        {
          title: 'Seguimiento de Progreso',
          description:
            'Visualiza tu bienestar emocional a lo largo del tiempo con gráficos detallados, reportes semanales y mensuales, e insights personalizados sobre tu progreso.',
        },
        {
          title: 'Detección Proactiva de Crisis',
          description:
            'El sistema identifica señales de riesgo y te ofrece recursos inmediatos, líneas de ayuda, y apoyo de emergencia cuando lo necesites.',
        },
      ],
      profesionales: [
        {
          title: 'Complemento Terapéutico',
          description:
            'Herramienta de apoyo entre sesiones para tus pacientes. Permite que tus pacientes tengan acceso a apoyo continuo y herramientas de bienestar cuando no están en sesión contigo.',
        },
        {
          title: 'Seguimiento Continuo',
          description:
            'Monitoreo del progreso emocional de tus pacientes con reportes agregados y anonimizados. Visualiza tendencias y patrones que pueden enriquecer tus sesiones.',
        },
        {
          title: 'Alertas de Crisis',
          description:
            'Notificaciones tempranas para intervención oportuna. Recibe alertas cuando el sistema detecta señales de riesgo en tus pacientes, permitiéndote intervenir proactivamente.',
        },
        {
          title: 'Dashboard Profesional',
          description:
            'Accede a un panel de control completo con analytics, reportes detallados, y herramientas de gestión para múltiples pacientes de forma segura y privada.',
        },
        {
          title: 'Integración con Práctica',
          description:
            'Los pacientes pueden compartir sus reportes y análisis contigo de forma segura, enriqueciendo vuestras sesiones con datos objetivos sobre su bienestar.',
        },
      ],
      organizaciones: [
        {
          title: 'Bienestar Corporativo Integral',
          description:
            'Mejora el bienestar mental de tu equipo con acceso 24/7 a apoyo emocional. Ofrece a tus empleados una herramienta discreta y accesible para gestionar su salud mental.',
        },
        {
          title: 'Reducción de Ausentismo',
          description:
            'Estudios muestran que el acceso a herramientas de salud mental reduce significativamente los días de baja. Organizaciones que usan Anto reportan hasta un 30% de reducción en ausentismo relacionado con salud mental.',
        },
        {
          title: 'Dashboard de Analytics',
          description:
            'Insights agregados y anonimizados sobre el bienestar de tu organización. Identifica tendencias, áreas de mejora, y el impacto de tus programas de bienestar sin comprometer la privacidad individual.',
        },
        {
          title: 'Gestión Centralizada',
          description:
            'Administra usuarios, configura políticas de uso, y gestiona suscripciones desde un panel centralizado. Ideal para departamentos de RRHH y programas de bienestar corporativo.',
        },
        {
          title: 'ROI Medible',
          description:
            'Mide el retorno de inversión de tus programas de bienestar con métricas claras: reducción de ausentismo, mejora de productividad, y satisfacción de empleados.',
        },
        {
          title: 'Privacidad Garantizada',
          description:
            'Los datos individuales nunca son accesibles. Solo recibes reportes agregados y anonimizados que respetan completamente la privacidad de tus empleados.',
        },
      ],
    },
  },
  en: {
    title: 'Benefits for Everyone',
    subtitle: 'Anto offers unique benefits tailored to your needs. Discover how we can help you.',
    tabs: [
      { id: 'usuarios', label: 'For Users' },
      { id: 'profesionales', label: 'For Professionals' },
      { id: 'organizaciones', label: 'For Organisations' },
    ],
    items: {
      usuarios: [
        {
          title: 'Immediate 24/7 Access',
          description:
            'No waiting, no appointments — available when you need it. The AI assistant is always available, including at night and on weekends when other services may not be.',
        },
        {
          title: 'Privacy Guaranteed',
          description:
            'Your conversations are fully confidential with end-to-end encryption. We never share your information and comply with all data protection regulations.',
        },
        {
          title: 'Full Personalisation',
          description:
            'Responses tailored to your situation and specific needs. The system learns from you and adapts to your communication style, emotional history, and personal preferences.',
        },
        {
          title: 'Practical Tools',
          description:
            'Over 100 exercises and techniques you can use in daily life, including mindfulness, meditation, breathing techniques, and relaxation exercises designed by professionals.',
        },
        {
          title: 'Progress Tracking',
          description:
            'Visualise your emotional wellbeing over time with detailed charts, weekly and monthly reports, and personalised insights about your progress.',
        },
        {
          title: 'Proactive Crisis Detection',
          description:
            'The system identifies risk signals and offers immediate resources, helplines, and emergency support when you need it.',
        },
      ],
      profesionales: [
        {
          title: 'Therapeutic Complement',
          description:
            'A support tool between sessions for your patients. Allows your patients to access ongoing support and wellbeing tools when they are not in session with you.',
        },
        {
          title: 'Continuous Monitoring',
          description:
            'Monitoring of your patients\' emotional progress with aggregated, anonymised reports. Visualise trends and patterns that can enrich your sessions.',
        },
        {
          title: 'Crisis Alerts',
          description:
            'Early notifications for timely intervention. Receive alerts when the system detects risk signals in your patients, allowing you to intervene proactively.',
        },
        {
          title: 'Professional Dashboard',
          description:
            'Access a complete control panel with analytics, detailed reports, and management tools for multiple patients securely and privately.',
        },
        {
          title: 'Practice Integration',
          description:
            'Patients can share their reports and analyses with you securely, enriching your sessions with objective data about their wellbeing.',
        },
      ],
      organizaciones: [
        {
          title: 'Comprehensive Corporate Wellbeing',
          description:
            'Improve your team\'s mental wellbeing with 24/7 access to emotional support. Offer your employees a discreet, accessible tool to manage their mental health.',
        },
        {
          title: 'Reduced Absenteeism',
          description:
            'Studies show that access to mental health tools significantly reduces sick days. Organisations using Anto report up to a 30% reduction in mental health-related absenteeism.',
        },
        {
          title: 'Analytics Dashboard',
          description:
            'Aggregated, anonymised insights about your organisation\'s wellbeing. Identify trends, areas for improvement, and the impact of your wellbeing programmes without compromising individual privacy.',
        },
        {
          title: 'Centralised Management',
          description:
            'Manage users, configure usage policies, and handle subscriptions from a central panel. Ideal for HR departments and corporate wellbeing programmes.',
        },
        {
          title: 'Measurable ROI',
          description:
            'Measure the return on investment of your wellbeing programmes with clear metrics: reduced absenteeism, improved productivity, and employee satisfaction.',
        },
        {
          title: 'Privacy Guaranteed',
          description:
            'Individual data is never accessible. You only receive aggregated, anonymised reports that fully respect your employees\' privacy.',
        },
      ],
    },
  },
};

export function getHomeBenefitsCopy(locale: Locale): HomeBenefitsCopy {
  return benefitsCopy[locale];
}
