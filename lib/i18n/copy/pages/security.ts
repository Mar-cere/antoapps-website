import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n/config';
import { buildLocalizedPageMetadata } from '@/lib/i18n/metadata';

const CANONICAL_PATH = '/seguridad';
const DEVELOPER_EMAIL = 'marcelo.ull@antoapps.com';

export type SecurityCareBlock = {
  title: string;
  body: string;
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
    support: string;
  };
  care: {
    items: readonly SecurityCareBlock[];
  };
  notThis: {
    title: string;
    intro: string;
    items: readonly string[];
  };
  closing: {
    disclaimer: string;
    contactTitle: string;
    contactLead: string;
    contactEmail: string;
    report: string;
  };
};

function buildSecurityPageCopy(locale: Locale): SecurityPageCopy {
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
          'Conversations are encrypted in transit (TLS) and at rest. Anto and the model read the text to provide the service. Anto does not diagnose or replace therapy.',
        openGraphTitle: 'How we care for what you write - Anto',
        openGraphDescription:
          'TLS in transit, encryption at rest. Anto and the model read the text. Not a clinical service.',
        canonicalPath: CANONICAL_PATH,
      },
      hero: {
        title: 'How we care for what you write',
        support:
          'Conversations travel encrypted and are stored encrypted. Anto and the model read the text to provide the service.',
      },
      care: {
        items: [
          {
            title: 'In transit',
            body: 'Traffic between your device and the servers goes over HTTPS (TLS). That protects the path while messages are moving.',
          },
          {
            title: 'At rest',
            body: 'Data is stored encrypted at rest, AES-256, on the host (Render). This is infrastructure encryption, not a unique key per person.',
          },
          {
            title: 'Who reads',
            body: 'You, when you sign in. Anto and the model, so they can reply. The model is an AI provider that processes the text. We do not sell the thread or use it for ads.',
          },
        ],
      },
      notThis: {
        title: 'What this is not',
        intro: 'These claims are not true of Anto today:',
        items: [
          'Not HIPAA',
          'Not SOC 2',
          'Not ISO 27001',
          'Not end-to-end encryption',
          'No published external audit',
          'No rewards programme',
        ],
      },
      closing: {
        disclaimer:
          'Anto does not replace therapy or professional clinical care. If you are in crisis, seek emergency help in your country.',
        contactTitle: 'Contact',
        contactLead: 'Technical questions:',
        contactEmail: DEVELOPER_EMAIL,
        report:
          'If you find a security issue, write to the same address. There is no rewards programme.',
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
        'Las conversaciones van cifradas en tránsito (TLS) y en reposo. Anto y el modelo leen el texto para prestar el servicio. Anto no diagnostica ni sustituye terapia.',
      openGraphTitle: 'Cómo cuidamos lo que escribes - Anto',
      openGraphDescription:
        'TLS en tránsito, cifrado en reposo. Anto y el modelo leen el texto. No es un servicio clínico.',
      canonicalPath: CANONICAL_PATH,
    },
    hero: {
      title: 'Cómo cuidamos lo que escribes',
      support:
        'Las conversaciones viajan cifradas y se guardan cifradas. Anto y el modelo leen el texto para prestar el servicio.',
    },
    care: {
      items: [
        {
          title: 'Tránsito',
          body: 'El tráfico entre tu dispositivo y los servidores va por HTTPS (TLS). Así se protege el camino mientras los mensajes están en movimiento.',
        },
        {
          title: 'Reposo',
          body: 'Los datos se guardan cifrados en reposo, AES-256, en el hosting (Render). Es cifrado de infraestructura, no una clave única por persona.',
        },
        {
          title: 'Quién lee',
          body: 'Tú, al iniciar sesión. Anto y el modelo, para responderte. El modelo es un proveedor de IA que procesa el texto. No vendemos el hilo ni lo usamos para anuncios.',
        },
      ],
    },
    notThis: {
      title: 'Qué no es',
      intro: 'Estas afirmaciones no aplican a Anto hoy:',
      items: [
        'No es HIPAA',
        'No es SOC 2',
        'No es ISO 27001',
        'No hay cifrado de extremo a extremo',
        'No hay auditoría externa publicada',
        'No hay programa de recompensas',
      ],
    },
    closing: {
      disclaimer:
        'Anto no sustituye terapia ni atención clínica profesional. Si estás en crisis, busca ayuda de emergencia en tu país.',
      contactTitle: 'Contacto',
      contactLead: 'Preguntas técnicas:',
      contactEmail: DEVELOPER_EMAIL,
      report:
        'Si encuentras un fallo de seguridad, escribe al mismo correo. No hay programa de recompensas.',
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
