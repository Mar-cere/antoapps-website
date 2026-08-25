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
    subtitle: 'Elige tu perfil y revisa en qué te ayuda Anto.',
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
            'Conversaciones confidenciales, cifradas en tránsito (TLS) y en reposo. Anto y el modelo leen el texto para prestar el servicio. No vendemos tus datos.',
        },
        {
          title: 'Apoyo que se adapta a ti',
          description:
            'Respuestas según tu situación, con modos de conversación y preferencias de estilo cuando la app lo permite.',
        },
        {
          title: 'Apoyo si estás en crisis',
          description:
            'Te orientamos hacia recursos y líneas de ayuda. No reemplaza una emergencia ni a un profesional.',
        },
      ],
      profesionales: [
        {
          title: 'Apoyo entre sesiones',
          description:
            'Tus pacientes tienen continuidad con herramientas de bienestar cuando no están en consulta contigo.',
        },
        {
          title: 'Seguimiento anonimizado',
          description:
            'Tendencias agregadas del progreso emocional para orientar el trabajo en sesión.',
        },
        {
          title: 'Recursos para el paciente',
          description:
            'Pueden acceder a líneas de ayuda y recursos. Eso no sustituye tu criterio clínico ni una urgencia.',
        },
        {
          title: 'Datos para la consulta',
          description:
            'Los pacientes pueden compartir reportes contigo de forma segura, si ellos lo eligen.',
        },
      ],
      organizaciones: [
        {
          title: 'Bienestar accesible 24/7',
          description:
            'Apoyo emocional discreto para todo el equipo, cualquier día y a cualquier hora.',
        },
        {
          title: 'Privacidad por diseño',
          description:
            'Solo métricas agregadas: nunca accedes a conversaciones individuales de empleados.',
        },
        {
          title: 'Panel para RRHH',
          description:
            'Usuarios, políticas de uso y suscripciones desde un único lugar de gestión.',
        },
        {
          title: 'Impacto en el equipo',
          description:
            'Visibilidad del bienestar organizacional para ajustar programas sin comprometer datos personales.',
        },
      ],
    },
  },
  en: {
    title: 'Benefits for Everyone',
    subtitle: 'Pick your profile and see how Anto can help.',
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
            'Confidential conversations, encrypted in transit (TLS) and at rest. Anto and the model read the text to provide the service. We do not sell your data.',
        },
        {
          title: 'Support that adapts to you',
          description:
            'Responses tailored to your situation, with conversation modes and style preferences when the app allows.',
        },
        {
          title: 'Support if you are in crisis',
          description:
            'We point you toward resources and helplines. It does not replace an emergency or a professional.',
        },
      ],
      profesionales: [
        {
          title: 'Support between sessions',
          description:
            'Your patients get continuity with wellbeing tools when they are not in session with you.',
        },
        {
          title: 'Anonymised monitoring',
          description:
            'Aggregated emotional progress trends to guide your work in session.',
        },
        {
          title: 'Recursos para el paciente',
          description:
            'Pueden acceder a líneas de ayuda y recursos. Eso no sustituye tu criterio clínico ni una urgencia.',
        },
        {
          title: 'Data for sessions',
          description:
            'Patients can share reports with you securely, if they choose to.',
        },
      ],
      organizaciones: [
        {
          title: '24/7 accessible wellbeing',
          description:
            'Discreet emotional support for the whole team, any day and any time.',
        },
        {
          title: 'Privacy by design',
          description:
            'Aggregated metrics only — you never access employees\' individual conversations.',
        },
        {
          title: 'HR dashboard',
          description:
            'Users, usage policies, and subscriptions from one management hub.',
        },
        {
          title: 'Team-wide impact',
          description:
            'Organisational wellbeing visibility to tune programmes without exposing personal data.',
        },
      ],
    },
  },
};

export function getHomeBenefitsCopy(locale: Locale): HomeBenefitsCopy {
  return benefitsCopy[locale];
}
