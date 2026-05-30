import type { Metadata } from 'next';
import { APP_VERSION } from '@/lib/app-version';
import type { Locale } from '@/lib/i18n/config';
import { getTrialCopy } from '@/lib/i18n/copy/trial';
import { siteUrl } from '@/lib/i18n/metadata';

const OG_IMAGE = 'https://antoapps.com/assets/images/antoIcon.png';

export function homePageMetadata(locale: Locale): Metadata {
  const trial = getTrialCopy(locale);
  const canonical = siteUrl(locale, '/');

  const alternates = {
    canonical,
    languages: {
      es: siteUrl('es', '/'),
      en: siteUrl('en', '/'),
      'x-default': siteUrl('es', '/'),
    },
  };

  const ogImage = {
    url: OG_IMAGE,
    width: 1200,
    height: 630,
    alt: locale === 'en' ? 'Anto — Mental wellness with AI' : 'Anto - Salud Mental con IA',
  };

  if (locale === 'en') {
    return {
      title: 'Anto — Your 24/7 emotional support | Mental wellness with AI',
      description:
        'When you feel overwhelmed, write what you are going through and get clear, practical guidance in seconds. Try free for 1 day on iPhone.',
      alternates,
      openGraph: {
        type: 'website',
        url: canonical,
        title: 'Anto — Your 24/7 emotional support',
        description: `Mental wellness app with AI. Available 24/7. ${trial.short} on iPhone.`,
        siteName: 'Anto',
        locale: 'en_US',
        images: [ogImage],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Anto — Your 24/7 emotional support',
        description: `Mental wellness app with AI. ${trial.short} on iPhone.`,
        images: [OG_IMAGE],
      },
    };
  }

  return {
    title: 'Anto - Tu apoyo emocional 24/7 | Salud Mental con IA',
    description:
      'Anto - Tu apoyo emocional 24/7. App de bienestar emocional con IA (GPT-5.4 Mini), tono profesional y práctico, escalas PHQ-9/GAD-7, protocolos basados en evidencia y detección de crisis. No sustituye atención clínica.',
    alternates,
    openGraph: {
      type: 'website',
      url: canonical,
      title: 'Anto - Tu apoyo emocional 24/7',
      description: `App de bienestar emocional con IA, análisis emocional y herramientas de bienestar. Disponible 24/7. Versión publicada ${APP_VERSION}. ${trial.pricingNote}`,
      images: [ogImage],
      siteName: 'Anto',
      locale: 'es_CL',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Anto - Tu apoyo emocional 24/7',
      description: `App de bienestar emocional con IA, análisis emocional y herramientas de bienestar. Versión ${APP_VERSION}.`,
      images: [OG_IMAGE],
    },
  };
}
