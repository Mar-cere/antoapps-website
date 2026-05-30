import { APP_VERSION } from '@/lib/app-version';
import type { Locale } from '@/lib/i18n/config';

const SITE_ORIGIN = 'https://antoapps.com';

type JsonLd = Record<string, unknown>;

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
      'Asistente de IA (bienestar emocional)',
      'Detección de Crisis',
      'Análisis Emocional',
      'Herramientas de Bienestar',
      'Privacidad Total',
      'Disponible 24/7',
    ],
  },
  en: {
    operatingSystem: 'iOS (direct download), Android (early access)',
    description:
      'Mobile emotional wellness app with AI (GPT-5.4 Mini), emotional analysis, crisis detection, and wellness tools available 24/7. Not a substitute for clinical care.',
    featureList: [
      'AI assistant (emotional wellness)',
      'Crisis detection',
      'Emotional analysis',
      'Wellness tools',
      'Full privacy',
      'Available 24/7',
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
      price: '3990',
      priceCurrency: 'CLP',
    },
    description: copy.description,
    screenshot: `${SITE_ORIGIN}/assets/images/antoIcon.png`,
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
