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
            'Sin esperas ni citas: apoyo cuando lo necesites, también de noche o en fin de semana.',
        },
        {
          title: 'Privacidad Garantizada',
          description:
            'Conversaciones confidenciales con encriptación de extremo a extremo. No vendemos tus datos.',
        },
        {
          title: 'Apoyo que se adapta a ti',
          description:
            'Respuestas según tu situación, con modos de conversación y preferencias de estilo cuando la app lo permite.',
        },
        {
          title: 'Detección Proactiva de Crisis',
          description:
            'Si detectamos señales de riesgo, te orientamos hacia recursos y líneas de ayuda de inmediato.',
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
            'No waiting or appointments — support when you need it, including nights and weekends.',
        },
        {
          title: 'Privacy Guaranteed',
          description:
            'Confidential conversations with end-to-end encryption. We do not sell your data.',
        },
        {
          title: 'Support that adapts to you',
          description:
            'Responses tailored to your situation, with conversation modes and style preferences when the app allows.',
        },
        {
          title: 'Proactive Crisis Detection',
          description:
            'If we detect risk signals, we guide you toward resources and helplines right away.',
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
