import { APP_VERSION } from '@/lib/app-version';
import type { Locale } from '@/lib/i18n/config';
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
      'App de acompañamiento emocional continuo en iPhone y Android para ansiedad y horas quietas — entre sesiones de terapia o en el día a día. Escribe lo que sientes, sal con claridad y un paso concreto. Asistencia de IA en segundo plano, memoria de temas, hub de técnicas y chequeos. Complementa — no reemplaza — a un terapeuta humano.',
    featureList: [
      'Acompañamiento emocional continuo',
      'Memoria de temas y patrones',
      'Hub de técnicas (TCC, exposición, mindfulness)',
      'Lienzo ABC interactivo',
      'Grafo de insights y lo que te ayuda',
      'WAI post-sesión (alianza terapéutica)',
      'Sesión persistente e insight diario',
      'Chequeos quietos de bienestar',
      'Conversaciones cifradas',
      'App bilingüe español e inglés',
      'Disponible en iPhone y Android',
      'Prueba gratuita de 1 día',
    ],
  },
  en: {
    operatingSystem: 'iOS (App Store), Android (Google Play)',
    description:
      'Ongoing emotional support app for iPhone and Android for anxiety and quiet hours — between therapy sessions or day to day. Write what you feel, leave with clarity and one concrete step. AI assistance in the background, theme memory, techniques hub, and check-ins. Complements — does not replace — a human therapist.',
    featureList: [
      'Ongoing emotional support',
      'Theme memory and patterns',
      'Techniques hub (CBT, exposure, mindfulness)',
      'Interactive ABC canvas',
      'Insights graph and what helps you',
      'Post-session WAI (therapeutic alliance)',
      'Persistent session and daily insight',
      'Quiet wellbeing check-ins',
      'Encrypted conversations',
      'Bilingual Spanish and English app',
      'Available on iPhone and Android',
      '1-day free trial',
    ],
  },
};

const orgCopy: Record<Locale, { description: string }> = {
  es: {
    description:
      'Anto ofrece acompañamiento emocional continuo para ansiedad y horas quietas: un lugar donde aterrizar entre sesiones de terapia o en el día a día. Complementa — no reemplaza — la atención de un terapeuta o profesional humano.',
  },
  en: {
    description:
      'Anto provides ongoing emotional support for anxiety and quiet hours: a place to land between therapy sessions or day to day. It complements — does not replace — care from a human therapist or professional.',
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
    sameAs: [
      'https://www.linkedin.com/in/marcelo-ull-marambio-7314a6177/',
      'https://t.me/marcere23',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'soporte@antoapps.com',
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

export function getWebSiteJsonLd(locale: Locale): JsonLd {
  const url = locale === 'en' ? `${SITE_ORIGIN}/en` : SITE_ORIGIN;
  const description =
    locale === 'en'
      ? 'Anto — when everything costs a little more. Ongoing emotional support on iPhone and Android for anxiety and quiet hours, between therapy sessions or day to day. Complements clinical care; does not replace a human therapist.'
      : 'Anto — cuando todo cuesta un poco más. Acompañamiento emocional continuo en iPhone y Android para ansiedad y horas quietas, entre sesiones de terapia o en el día a día. Complementa la atención clínica; no reemplaza a un terapeuta humano.';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Anto',
    url,
    description,
    inLanguage: locale === 'en' ? 'en' : 'es',
    publisher: {
      '@type': 'Organization',
      name: 'Anto',
      url: SITE_ORIGIN,
    },
    significantLink: [
      `${SITE_ORIGIN}/llms.txt`,
      `${SITE_ORIGIN}/llms-full.txt`,
      `${SITE_ORIGIN}/recursos`,
      DEFAULT_APP_STORE_URL,
      DEFAULT_GOOGLE_PLAY_URL_ES,
    ],
  };
}
