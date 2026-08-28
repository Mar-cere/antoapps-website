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
      "One person. I'll get back when I can.",
    openGraph: {
      title: 'Contact | Anto',
      description: "One person. I'll get back when I can.",
      url: 'https://antoapps.com/en/contacto',
    },
  },
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
          "One person. I'll get back when I can.",
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
  };
}
export function contactPageMetadata(locale: Locale): Metadata {

  const meta = metadataByLocale[locale];
  return buildLocalizedPageMetadata(locale, '/contacto', meta);
}

export function getContactPageCopy(locale: Locale): ContactPageCopy {
  return buildContactPageCopy(locale);
}
