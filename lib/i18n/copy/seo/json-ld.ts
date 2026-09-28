import { APP_VERSION } from '@/lib/app-version';
import { localePath, type Locale } from '@/lib/i18n/config';
import { getEditorialImagePath } from '@/lib/assets/editorial-images';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';
import { DEFAULT_APP_STORE_URL, DEFAULT_GOOGLE_PLAY_URL_ES } from '@/lib/download-links';

import { getAppScreenshotUrl } from '@/lib/assets/app-screenshots';

type JsonLd = Record<string, unknown>;

const SITE_ORIGIN = 'https://antoapps.com';

const softwareCopy: Record<
  Locale,
  {
    operatingSystem: string;
    description: string;
    featureList: string[];
  }
> = {
  es: {
    operatingSystem: 'iOS (App Store), Android (Google Play)',
    description:
      'App de acompañamiento emocional continuo en iPhone y Android para la ansiedad y las horas quietas, entre sesiones o en el día a día. Memoria, un paso concreto, hub de técnicas (TCC, grounding) y chequeos. Asistencia de IA en segundo plano. No sustituye a un terapeuta humano.',
    featureList: [
      'Acompañamiento emocional continuo',
      'Memoria de temas y patrones',
      'Hub de técnicas (TCC, exposición, mindfulness)',
      'Lienzo ABC interactivo',
      'Grafo de insights, lo que te ayuda y WAI post-sesión',
      'Sesión persistente e insight diario',
      'Chequeos quietos para notar patrones',
      'Conversaciones cifradas en tránsito (TLS) y en reposo; Anto y el modelo leen el texto',
      'App bilingüe español e inglés',
      'Disponible en iPhone y Android',
      'Prueba gratuita de 1 día',
    ],
  },
  en: {
    operatingSystem: 'iOS (App Store), Android (Google Play)',
    description:
      'Ongoing emotional support app for iPhone and Android, for anxiety and quiet hours, between sessions or day to day. Memory, one concrete step, a techniques hub (CBT, grounding), and check-ins. AI assistance in the background. Does not replace a human therapist.',
    featureList: [
      'Ongoing emotional support',
      'Theme memory and patterns',
      'Techniques hub (CBT, exposure, mindfulness)',
      'Interactive ABC canvas',
      'Insights graph, what helps you, and post-session WAI',
      'Persistent session and daily insight',
      'Quiet check-ins to notice patterns',
      'Conversations encrypted in transit (TLS) and at rest; Anto and the model read the text',
      'Bilingual Spanish and English app',
      'Available on iPhone and Android',
      '1-day free trial',
    ],
  },
};

const orgCopy: Record<Locale, { description: string }> = {
  es: {
    description:
      'Anto ofrece acompañamiento emocional continuo para la ansiedad y las horas quietas, entre sesiones o en el día a día. Complementa la atención clínica y no reemplaza a un terapeuta humano.',
  },
  en: {
    description:
      'Anto provides ongoing emotional support for anxiety and quiet hours, between sessions or day to day. It complements clinical care and does not replace a human therapist.',
  },
};

export function getSoftwareApplicationJsonLd(locale: Locale): JsonLd {
  const copy = softwareCopy[locale];

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Anto',
    softwareVersion: APP_VERSION,
    applicationCategory: 'HealthApplication',
    inLanguage: locale === 'en' ? 'en' : 'es',
    operatingSystem: copy.operatingSystem,
    offers: {
      '@type': 'Offer',
      price: '4.20',
      priceCurrency: 'USD',
    },
    description: copy.description,
    screenshot: getAppScreenshotUrl('chat', SITE_ORIGIN),
    featureList: copy.featureList,
    url: locale === 'en' ? `${SITE_ORIGIN}/en` : SITE_ORIGIN,
    downloadUrl: [DEFAULT_APP_STORE_URL, DEFAULT_GOOGLE_PLAY_URL_ES],
    installUrl: [DEFAULT_APP_STORE_URL, DEFAULT_GOOGLE_PLAY_URL_ES],
  };
}

export function getOrganizationJsonLd(locale: Locale): JsonLd {
  const copy = orgCopy[locale];

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Anto',
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/assets/images/antoIcon.png`,
    description: copy.description,
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'marcelo.ull@antoapps.com',
      contactType: 'customer service',
      availableLanguage: ['Spanish', 'English'],
    },
  };
}

/** FAQPage alineado al FAQ visible en la home publicada. */
export function getFaqPageJsonLd(locale: Locale): JsonLd {
  const items = getHomeV2Copy(locale).faq.items;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

function websiteDescription(locale: Locale): string {
  return locale === 'en'
    ? 'Anto — when everything costs a little more. Ongoing emotional support on iPhone and Android for anxiety and quiet hours, between sessions or day to day. Does not replace a human therapist.'
    : 'Anto — cuando todo cuesta un poco más. Acompañamiento emocional continuo en iPhone y Android para la ansiedad y las horas quietas, entre sesiones o en el día a día. No sustituye a un terapeuta humano.';
}

export function getWebSiteJsonLd(locale: Locale): JsonLd {
  const url = locale === 'en' ? `${SITE_ORIGIN}/en` : SITE_ORIGIN;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Anto',
    url,
    description: websiteDescription(locale),
    inLanguage: locale === 'en' ? 'en' : 'es',
    publisher: {
      '@type': 'Organization',
      name: 'Anto',
      url: SITE_ORIGIN,
    },
    significantLink: [
      `${SITE_ORIGIN}/llms.txt`,
      `${SITE_ORIGIN}/llms-full.txt`,
      `${SITE_ORIGIN}${localePath(locale, '/recursos')}`,
      `${SITE_ORIGIN}${localePath(locale, '/nexus')}`,
      `${SITE_ORIGIN}${localePath(locale, '/investigacion')}`,
      `${SITE_ORIGIN}${localePath(locale, '/seguridad')}`,
      `${SITE_ORIGIN}${localePath(locale, '/app')}`,
      DEFAULT_APP_STORE_URL,
      DEFAULT_GOOGLE_PLAY_URL_ES,
    ],
  };
}

/** WebPage de la home: el H1 visible y la foto del hero, para buscadores y agentes. */
export function getHomeWebPageJsonLd(locale: Locale): JsonLd {
  const hero = getHomeV2Copy(locale).hero;
  const headline = `${hero.titleLine1} ${hero.titleAccent}`.replace(/\s+/g, ' ').trim();
  const url = locale === 'en' ? `${SITE_ORIGIN}/en` : SITE_ORIGIN;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: headline,
    headline,
    url,
    description: websiteDescription(locale),
    inLanguage: locale === 'en' ? 'en' : 'es',
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${SITE_ORIGIN}${getEditorialImagePath('evening')}`,
      caption: hero.imageAlt,
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'Anto',
      url: SITE_ORIGIN,
    },
    about: {
      '@type': 'SoftwareApplication',
      name: 'Anto',
      url,
    },
  };
}

export type EditorialWebPageInput = {
  locale: Locale;
  path: string;
  name: string;
  headline: string;
  description: string;
  imagePath?: string;
  imageCaption?: string;
};

/** WebPage de una ruta marketing: mismo contrato que la home. La foto entra solo si la página la muestra. */
export function getEditorialWebPageJsonLd(input: EditorialWebPageInput): JsonLd {
  const url = `${SITE_ORIGIN}${localePath(input.locale, input.path)}`;
  const image =
    input.imagePath
      ? {
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: input.imagePath.startsWith('http')
              ? input.imagePath
              : `${SITE_ORIGIN}${input.imagePath}`,
            ...(input.imageCaption ? { caption: input.imageCaption } : {}),
          },
        }
      : {};

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: input.name,
    headline: input.headline,
    url,
    description: input.description,
    inLanguage: input.locale === 'en' ? 'en' : 'es',
    ...image,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Anto',
      url: SITE_ORIGIN,
    },
    about: {
      '@type': 'SoftwareApplication',
      name: 'Anto',
      url: input.locale === 'en' ? `${SITE_ORIGIN}/en` : SITE_ORIGIN,
    },
  };
}
