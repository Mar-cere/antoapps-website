import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n/config';
import { buildLocalizedPageMetadata } from '@/lib/i18n/metadata';
import { getEditorialImagePath } from '@/lib/assets/editorial-images';

const CANONICAL_PATH = '/seguridad';
const DEVELOPER_EMAIL = 'marcelo.ull@antoapps.com';
const SUPPORT_EMAIL = 'soporte@antoapps.com';
const EDITORIAL_WIDTH = 1536;
const EDITORIAL_HEIGHT = 1024;

export type SecurityTake = {
  title: string;
  body: string;
};

export type SecurityFigure = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type SecurityPageCopy = {
  breadcrumbs: { homeLabel: string; homeHref: string; currentLabel: string };
  crumbAria: string;
  meta: {
    title: string;
    description: string;
    openGraphTitle: string;
    openGraphDescription: string;
    canonicalPath: string;
  };
  hero: {
    title: string;
  };
  pullQuote: string;
  reading: {
    title: string;
    paragraphs: readonly string[];
  };
  figure: SecurityFigure;
  takes: {
    title: string;
    items: readonly SecurityTake[];
  };
  limits: {
    title: string;
    body: string;
  };
  contact: {
    title: string;
    securityLead: string;
    securityEmail: string;
    dataLead: string;
    dataEmail: string;
    privacyPrefix: string;
    privacyLabel: string;
    privacyHref: string;
  };
};

function buildSecurityPageCopy(locale: Locale): SecurityPageCopy {
  const privacyHref = localePath(locale, '/privacidad');
  const figureSrc = getEditorialImagePath('morningPause');

  if (locale === 'en') {
    return {
      breadcrumbs: {
        homeLabel: 'Home',
        homeHref: localePath(locale, '/'),
        currentLabel: 'Security',
      },
      crumbAria: 'Breadcrumb',
      meta: {
        title: 'How we care for what you write - Anto',
        description:
          'Anto keeps the thread so you do not start over. It travels encrypted (TLS) and is stored encrypted. Anto and the model read the text. Not a substitute for therapy.',
        openGraphTitle: 'How we care for what you write - Anto',
        openGraphDescription:
          'Why the thread is read, encryption in transit and at rest, how to ask for deletion. Not a clinical service.',
        canonicalPath: CANONICAL_PATH,
      },
      hero: {
        title: 'How we care for what you write',
      },
      pullQuote:
        'Anto keeps the thread so you do not start from a blank page. That means reading what you write. It does not mean an audience.',
      reading: {
        title: 'Why it is read',
        paragraphs: [
          'To accompany you, Anto needs the words: to reply, remember what returns, and offer a next step. That is the promise of not starting over. Anto and the model read those words to provide the service.',
          'The thread is not sold. It is not used for ads.',
        ],
      },
      figure: {
        src: figureSrc,
        alt: 'Person seen from behind walking through a living room, phone in hand, window light',
        caption: 'The thread stays in your account. Not on a stage.',
        width: EDITORIAL_WIDTH,
        height: EDITORIAL_HEIGHT,
      },
      takes: {
        title: 'The path and the store',
        items: [
          {
            title: 'On the way',
            body: 'Traffic between your device and the servers goes over HTTPS (TLS). That protects the path. When it arrives, the service reads the text: this is not end-to-end encryption.',
          },
          {
            title: 'Stored',
            body: 'Data is stored encrypted at rest, AES-256, on our servers. That is infrastructure encryption.',
          },
          {
            title: 'Who reads',
            body: 'You, when you sign in. Anto and the model, to reply and remember. The model is an AI provider that processes the text.',
          },
          {
            title: 'Asking to delete',
            body: 'You can ask us to delete your account and your data. We do so according to our retention policies and legal requirements.',
          },
        ],
      },
      limits: {
        title: 'Limits',
        body: 'Anto does not replace therapy or professional clinical care. If you are in crisis, seek emergency help in your country.',
      },
      contact: {
        title: 'Contact',
        securityLead: 'If you find a security issue, write to',
        securityEmail: DEVELOPER_EMAIL,
        dataLead: 'To access your data or ask for deletion, write to',
        dataEmail: SUPPORT_EMAIL,
        privacyPrefix: 'The legal detail is in the',
        privacyLabel: 'privacy policy',
        privacyHref,
      },
    };
  }

  return {
    breadcrumbs: {
      homeLabel: 'Inicio',
      homeHref: localePath(locale, '/'),
      currentLabel: 'Seguridad',
    },
    crumbAria: 'Miga de pan',
    meta: {
      title: 'Cómo cuidamos lo que escribes - Anto',
      description:
        'Anto guarda el hilo para no empezar de cero. Viaja cifrado (TLS) y se guarda cifrado. Anto y el modelo leen el texto. No sustituye terapia.',
      openGraphTitle: 'Cómo cuidamos lo que escribes - Anto',
      openGraphDescription:
        'Por qué se lee el hilo, cifrado en tránsito y en reposo, cómo pedir que se borre. No es un servicio clínico.',
      canonicalPath: CANONICAL_PATH,
    },
    hero: {
      title: 'Cómo cuidamos lo que escribes',
    },
    pullQuote:
      'Anto guarda el hilo para no volver a empezar en blanco. Eso pide leer lo que escribes. No pide una audiencia.',
    reading: {
      title: 'Por qué se lee',
      paragraphs: [
        'Para acompañarte, Anto necesita el texto: responder, recordar lo que vuelve, ofrecer un siguiente paso. Esa es la promesa de no empezar de cero. Anto y el modelo leen esas palabras para prestar el servicio.',
        'El hilo no se vende. No se usa para anuncios.',
      ],
    },
    figure: {
      src: figureSrc,
      alt: 'Persona de espaldas camina por el salón con el teléfono en la mano, luz de ventana',
      caption: 'El hilo se queda en tu cuenta. No en un escenario.',
      width: EDITORIAL_WIDTH,
      height: EDITORIAL_HEIGHT,
    },
    takes: {
      title: 'El camino y el archivo',
      items: [
        {
          title: 'En el camino',
          body: 'El tráfico entre tu dispositivo y los servidores va por HTTPS (TLS). Eso protege el trayecto. Al llegar, el servicio lee el texto: no es cifrado de extremo a extremo.',
        },
        {
          title: 'Guardado',
          body: 'Los datos se guardan cifrados en reposo, AES-256, en nuestros servidores. Es cifrado de infraestructura.',
        },
        {
          title: 'Quién lee',
          body: 'Tú, al iniciar sesión. Anto y el modelo, para responderte y recordar. El modelo es un proveedor de IA que procesa el texto.',
        },
        {
          title: 'Pedir que se borre',
          body: 'Puedes pedir que borremos tu cuenta y tus datos. Lo hacemos según nuestras políticas de retención y requisitos legales.',
        },
      ],
    },
    limits: {
      title: 'Límites',
      body: 'Anto no sustituye terapia ni atención clínica profesional. Si estás en crisis, busca ayuda de emergencia en tu país.',
    },
    contact: {
      title: 'Contacto',
      securityLead: 'Si encuentras un fallo de seguridad, escribe a',
      securityEmail: DEVELOPER_EMAIL,
      dataLead: 'Para acceder a tus datos o pedir que se borren, escribe a',
      dataEmail: SUPPORT_EMAIL,
      privacyPrefix: 'El detalle legal está en la',
      privacyLabel: 'política de privacidad',
      privacyHref,
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
