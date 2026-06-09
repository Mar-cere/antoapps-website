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
      'Aplicación móvil de bienestar emocional con IA (GPT-5.4 Mini), análisis emocional, detección de crisis y herramientas de bienestar 24/7. No sustituye atención clínica.',
    featureList: [
      'Asistente de IA con GPT-5.4 Mini',
      'Escalas clínicas PHQ-9 y GAD-7',
      '8 protocolos terapéuticos estructurados',
      'Detección de 15 distorsiones cognitivas',
      'Detección de crisis 24/7',
      'Modos de conversación',
      'App bilingüe español e inglés',
      'Tareas, hábitos y diario de gratitud',
      'Resúmenes de sesión localizados',
      'Prueba gratuita de 1 día',
    ],
  },
  en: {
    operatingSystem: 'iOS (direct download), Android (early access)',
    description:
      'Mobile emotional wellness app with AI (GPT-5.4 Mini), emotional analysis, crisis detection, and wellness tools available 24/7. Not a substitute for clinical care.',
    featureList: [
      'AI assistant with GPT-5.4 Mini',
      'PHQ-9 and GAD-7 clinical scales',
      '8 structured therapeutic protocols',
      'Detection of 15 cognitive distortions',
      '24/7 crisis detection',
      'Conversation modes',
      'Bilingual Spanish and English app',
      'Tasks, habits, and gratitude journal',
      'Localised session summaries',
      '1-day free trial',
    ],
  },
};

const orgCopy: Record<Locale, { description: string }> = {
  es: {
    description: 'Mejorando la salud mental, una conversación a la vez.',
  },
  en: {
    description: 'Improving mental health, one conversation at a time.',
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
  const { faqData } = getHomeFaqCopy(locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
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

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Anto',
    url,
    inLanguage: locale === 'en' ? 'en' : 'es',
    publisher: {
      '@type': 'Organization',
      name: 'Anto',
      url: SITE_ORIGIN,
    },
  };
}
