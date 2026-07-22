import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { homeOgImageAlt, homeOgImageSize } from '@/lib/home/opengraph-image';
import { getTrialCopy } from '@/lib/i18n/copy/trial';
import { siteUrl } from '@/lib/i18n/metadata';

/**
 * Metadata de la home publicada (voz editorial home-v2).
 * Title alineado al H1; description con intenciones naturales (ansiedad, entre sesiones).
 */
export function homePageMetadata(locale: Locale): Metadata {
  const trial = getTrialCopy(locale);
  const canonical = siteUrl(locale, '/');
  const ogImageUrl = siteUrl(locale, '/opengraph-image');

  const alternates = {
    canonical,
    languages: {
      es: siteUrl('es', '/'),
      en: siteUrl('en', '/'),
      'x-default': siteUrl('es', '/'),
    },
  };

  const ogImage = {
    url: ogImageUrl,
    width: homeOgImageSize.width,
    height: homeOgImageSize.height,
    alt: homeOgImageAlt(locale),
  };

  if (locale === 'en') {
    return {
      title: 'Anto — When everything costs a little more | Ongoing emotional support',
      description:
        'Ongoing emotional support for anxiety and quiet hours — between therapy sessions or day to day. Write what you feel, leave with clarity and one concrete step. AI assistance in the background. Complements care; does not replace a human therapist. Available on iPhone. Free 1-day trial.',
      alternates,
      openGraph: {
        type: 'website',
        url: canonical,
        title: 'Anto — When everything costs a little more',
        description: `Emotional support for anxiety and quiet hours on iPhone — between sessions or day to day. Complements care; does not replace a human therapist. ${trial.short}.`,
        siteName: 'Anto',
        locale: 'en_US',
        images: [ogImage],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Anto — When everything costs a little more',
        description: `Emotional support for anxiety and quiet hours on iPhone — between sessions or day to day. Complements care; does not replace a human therapist. ${trial.short}.`,
        images: [ogImageUrl],
      },
    };
  }

  return {
    title: 'Anto — Cuando todo cuesta un poco más | Acompañamiento emocional',
    description:
      'Acompañamiento emocional continuo para ansiedad y horas quietas — entre sesiones de terapia o en el día a día. Escribe lo que sientes, sal con claridad y un paso concreto. Apoyo de IA en segundo plano. Complementa — no reemplaza — a un terapeuta humano. Disponible en iPhone. Prueba de 1 día gratis.',
    alternates,
    openGraph: {
      type: 'website',
      url: canonical,
      title: 'Anto — Cuando todo cuesta un poco más',
      description: `Acompañamiento emocional para ansiedad y horas quietas en iPhone — entre sesiones o en el día a día. Complementa — no reemplaza — a un terapeuta humano. ${trial.pricingNote}`,
      images: [ogImage],
      siteName: 'Anto',
      locale: 'es_CL',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Anto — Cuando todo cuesta un poco más',
      description: `Acompañamiento emocional para ansiedad y horas quietas en iPhone — entre sesiones o en el día a día. Complementa — no reemplaza — a un terapeuta humano. ${trial.short}.`,
      images: [ogImageUrl],
    },
  };
}
