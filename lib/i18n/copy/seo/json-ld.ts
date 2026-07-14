import { APP_VERSION } from '@/lib/app-version';
import type { Locale } from '@/lib/i18n/config';
import { getHomeFaqCopy } from '@/lib/i18n/copy/home/faq';

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
    operatingSystem: 'iOS (descarga directa), Android (acceso anticipado)',
    description:
      'App de acompañamiento emocional continuo en iPhone. Apoyo entre sesiones o en el día a día, con asistencia de IA en segundo plano, herramientas de bienestar y seguimiento. No sustituye atención clínica: un terapeuta o profesional humano sigue siendo lo más recomendable.',
    featureList: [
      'Acompañamiento emocional continuo',
      'Escalas clínicas PHQ-9 y GAD-7',
      '8 protocolos estructurados basados en evidencia',
      'Detección de crisis 24/7',
      'Hub de técnicas',
      'Tareas y hábitos unificados',
      'Grafo de insights y memoria de temas',
      'WAI post-sesión (alianza terapéutica)',
      'App bilingüe español e inglés',
      'Disponible en iPhone',
      'Prueba gratuita de 1 día',
    ],
  },
  en: {
    operatingSystem: 'iOS (direct download), Android (early access)',
    description:
      'Ongoing emotional support app for iPhone. Support between sessions or day to day, with AI assistance in the background, wellbeing tools, and tracking. Does not replace clinical care — a human therapist or professional remains the stronger recommendation.',
    featureList: [
      'Ongoing emotional support',
      'PHQ-9 and GAD-7 clinical scales',
      '8 evidence-based structured protocols',
      '24/7 crisis detection',
      'Techniques hub',
      'Unified tasks and habits',
      'Insights graph and topic memory',
      'Post-session WAI (therapeutic alliance)',
      'Bilingual Spanish and English app',
      'Available on iPhone',
      '1-day free trial',
    ],
  },
};

const orgCopy: Record<Locale, { description: string }> = {
  es: {
    description:
      'Anto ofrece acompañamiento emocional continuo: un lugar donde aterrizar entre sesiones o en el día a día. Complementa — no reemplaza — la atención de un terapeuta o profesional humano.',
  },
  en: {
    description:
      'Anto provides ongoing emotional support: a place to land between sessions or day to day. It complements — does not replace — care from a human therapist or professional.',
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

export function getFaqPageJsonLd(locale: Locale): JsonLd {
  const { faqData, faqMoreData } = getHomeFaqCopy(locale);
  const allFaqs = [...faqData, ...faqMoreData];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((faq) => ({
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
      ? 'Anto — ongoing emotional support on iPhone. A place for your mind to land. Complements clinical care; does not replace a human therapist.'
      : 'Anto — acompañamiento emocional continuo en iPhone. Un lugar donde aterrizar. Complementa la atención clínica; no reemplaza a un terapeuta humano.';

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
  };
}
