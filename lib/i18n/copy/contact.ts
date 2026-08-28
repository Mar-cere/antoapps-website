import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n/config';
import { buildLocalizedPageMetadata } from '@/lib/i18n/metadata';

export type ContactPageMetadata = {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
  };
};

export type ContactGithubLink = {
  href: string;
  label: string;
};

export type ContactMethod = {
  icon: string;
  title: string;
  description: string;
  email?: string;
  githubLinks?: ContactGithubLink[];
};

export type ContactSocialLink = {
  icon: string;
  label: string;
  href: string;
};

export type ContactFormCopy = {
  labels: {
    name: string;
    email: string;
    message: string;
    requiredMark: string;
  };
  submit: string;
  sending: string;
  success: {
    title: string;
    message: string;
    dismiss: string;
  };
  toast: {
    error: string;
  };
  validation: {
    required: string;
    emailInvalid: string;
    minLength: (min: number) => string;
  };
};

export type ContactPageCopy = {
  breadcrumbs: { homeLabel: string; homeHref: string; currentLabel: string };
  hero: {
    title: string;
    subtitle: string;
  };
  formSection: {
    title: string;
    form: ContactFormCopy;
  };
  contactInfo: {
    title: string;
    methods: ContactMethod[];
  };
  social: {
    title: string;
    links: ContactSocialLink[];
  };
  quickCtaAria: string;
};

const metadataByLocale: Record<Locale, ContactPageMetadata> = {
  es: {
    title: 'Contacto | Anto',
    description:
      'Una persona. Te respondo cuando pueda.',
    openGraph: {
      title: 'Contacto | Anto',
      description: 'Una persona. Te respondo cuando pueda.',
      url: 'https://antoapps.com/contacto',
    },
  },
  en: {
    title: 'Contact | Anto',
    description:
      'One person. I'll get back when I can.',
    openGraph: {
      title: 'Contact | Anto',
      description: 'One person. I'll get back when I can.',
      url: 'https://antoapps.com/en/contacto',
    },
  },
};

const sharedContactMethods = {
  primaryEmail: 'marcelo.ull@antoapps.com',
  githubProfile: 'https://github.com/Mar-cere',
  githubWebsite: 'https://github.com/Mar-cere/antoapps-website',
  linkedin: 'https://www.linkedin.com/in/marcelo-ull-marambio-7314a6177/',
  telegram: 'https://t.me/marcere23',
};

function buildContactPageCopy(locale: Locale): ContactPageCopy {
  if (locale === 'en') {
    return {
      breadcrumbs: {
        homeLabel: 'Home',
        homeHref: localePath(locale, '/'),
        currentLabel: 'Contact',
      },
      hero: {
        title: 'Contact',
        subtitle:
          'One person. I'll get back when I can.',
      },
      formSection: {
        title: 'Send us a message',
        form: {
          labels: {
            name: 'Name',
            email: 'Email',
            message: 'Message',
            requiredMark: '*',
          },
          submit: 'Send',
          sending: 'Sending...',
          success: {
            title: 'Message sent',
            message:
              'I received your message and will get back when I can. Check your inbox in case I need more details.',
            dismiss: 'Send another message',
          },
          toast: {
            error: 'Error sending the message. Please try again.',
          },
          validation: {
            required: 'This field is required',
            emailInvalid: 'Please enter a valid email address',
            minLength: (min) => `This field must be at least ${min} characters`,
          },
        },
      },
      contactInfo: {
        title: 'Other ways to reach us',
        methods: [
          {
            icon: '📧',
            title: 'Primary Email',
            description: 'For general inquiries, support, and privacy',
            email: sharedContactMethods.primaryEmail,
          },
          {
            icon: '👨‍💻',
            title: 'Lead Developer',
            description: 'Marcelo Ull Marambio',
            email: sharedContactMethods.primaryEmail,
            githubLinks: [
              {
                href: sharedContactMethods.githubProfile,
                label: '💻 GitHub: @Mar-cere',
              },
              {
                href: sharedContactMethods.githubWebsite,
                label: '🌐 Repository: Website',
              },
            ],
          },
          {
            icon: '💼',
            title: 'Business',
            description: 'Corporate plans and business inquiries',
            email: sharedContactMethods.primaryEmail,
          },
          {
            icon: '⏰',
            title: 'Response Time',
            description: 'We usually respond within 24 hours',
          },
        ],
      },
      social: {
        title: 'Social Media',
        links: [
          { icon: '💼', label: 'LinkedIn', href: sharedContactMethods.linkedin },
          { icon: '✈️', label: 'Telegram', href: sharedContactMethods.telegram },
          { icon: '💻', label: 'GitHub', href: sharedContactMethods.githubProfile },
        ],
      },
      quickCtaAria: 'Go to contact form',
    };
  }

  return {
    breadcrumbs: {
      homeLabel: 'Inicio',
      homeHref: localePath(locale, '/'),
      currentLabel: 'Contacto',
    },
      hero: {
        title: 'Contacto',
        subtitle:
          'Una persona. Te respondo cuando pueda.',
      },
      formSection: {
        title: 'Envíanos un mensaje',
        form: {
          labels: {
            name: 'Nombre',
            email: 'Email',
            message: 'Mensaje',
            requiredMark: '*',
          },
          submit: 'Enviar',
          sending: 'Enviando...',
          success: {
            title: 'Mensaje enviado',
            message:
              'Recibí tu mensaje y te respondo cuando pueda. Revisa tu bandeja por si necesito más datos.',
            dismiss: 'Enviar otro mensaje',
          },
        toast: {
          error: 'Error al enviar el mensaje. Por favor, intenta nuevamente.',
        },
        validation: {
          required: 'Este campo es obligatorio',
          emailInvalid: 'Por favor ingresa un email válido',
          minLength: (min) => `Este campo debe tener al menos ${min} caracteres`,
        },
      },
    },
    contactInfo: {
      title: 'Otras formas de contactarnos',
      methods: [
        {
          icon: '📧',
          title: 'Email Principal',
          description: 'Para consultas generales, soporte y privacidad',
          email: sharedContactMethods.primaryEmail,
        },
        {
          icon: '👨‍💻',
          title: 'Desarrollador Principal',
          description: 'Marcelo Ull Marambio',
          email: sharedContactMethods.primaryEmail,
          githubLinks: [
            {
              href: sharedContactMethods.githubProfile,
              label: '💻 GitHub: @Mar-cere',
            },
            {
              href: sharedContactMethods.githubWebsite,
              label: '🌐 Repositorio: Sitio Web',
            },
          ],
        },
        {
          icon: '💼',
          title: 'Empresas',
          description: 'Planes corporativos y consultas comerciales',
          email: sharedContactMethods.primaryEmail,
        },
        {
          icon: '⏰',
          title: 'Tiempo de Respuesta',
          description: 'Generalmente respondemos en menos de 24 horas',
        },
      ],
    },
    social: {
      title: 'Redes Sociales',
      links: [
        { icon: '💼', label: 'LinkedIn', href: sharedContactMethods.linkedin },
        { icon: '✈️', label: 'Telegram', href: sharedContactMethods.telegram },
        { icon: '💻', label: 'GitHub', href: sharedContactMethods.githubProfile },
      ],
    },
    quickCtaAria: 'Ir al formulario de contacto',
  };
}

export function contactPageMetadata(locale: Locale): Metadata {
  const meta = metadataByLocale[locale];
  return buildLocalizedPageMetadata(locale, '/contacto', meta);
}

export function getContactPageCopy(locale: Locale): ContactPageCopy {
  return buildContactPageCopy(locale);
}
