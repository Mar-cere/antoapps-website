import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n/config';
import { buildLocalizedPageMetadata } from '@/lib/i18n/metadata';
import { getEditorialImagePath } from '@/lib/assets/editorial-images';

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
    title: 'Contacto | Una persona te responde',
    description:
      'Te respondo cuando pueda. Escribe por la app, por tu cuenta o por un problema.',
    openGraph: {
      title: 'Contacto | Una persona te responde',
      description:
        'Te respondo cuando pueda. Escribe por la app, por tu cuenta o por un problema.',
      url: 'https://antoapps.com/contacto',
    },
  },
  en: {
    title: 'Contact | One person writes back',
    description:
      "I'll get back when I can. Write about the app, your account, or a problem.",
    openGraph: {
      title: 'Contact | One person writes back',
      description:
        "I'll get back when I can. Write about the app, your account, or a problem.",
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
        title: 'One person writes back',
        subtitle:
          "I'll get back when I can. Write about the app, your account, or a problem.",
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
      title: 'Una persona te responde',
      subtitle:
        'Te respondo cuando pueda. Escribe por la app, por tu cuenta o por un problema.',
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
  const alt =
    locale === 'en'
      ? 'Rainy night desk with an open notebook and a warm lamp'
      : 'Escritorio de noche con lluvia en la ventana, libreta abierta y lámpara cálida';
  return buildLocalizedPageMetadata(locale, '/contacto', {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      images: [
        {
          url: getEditorialImagePath('deskRain'),
          width: 1536,
          height: 1024,
          alt,
        },
      ],
    },
  });
}

export function getContactPageCopy(locale: Locale): ContactPageCopy {
  return buildContactPageCopy(locale);
}
