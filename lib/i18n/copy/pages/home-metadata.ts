import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { homeOgImageAlt, homeOgImageSize } from '@/lib/home/opengraph-image';
import { getTrialCopy } from '@/lib/i18n/copy/trial';
import { siteUrl } from '@/lib/i18n/metadata';

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
      title: 'Anto — A place for your mind to land | Ongoing emotional support',
      description:
        'Ongoing emotional support for when you need a place to land — with thoughtful AI assistance in the background. Anto can walk with you between sessions or day to day; it does not replace clinical care — a human therapist or professional remains the stronger recommendation. Available on iPhone.',
      alternates,
      openGraph: {
        type: 'website',
        url: canonical,
        title: 'Anto — A place for your mind to land',
        description: `Ongoing emotional support on iPhone. Complements care — does not replace a human therapist. ${trial.short}.`,
        siteName: 'Anto',
        locale: 'en_US',
        images: [ogImage],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Anto — A place for your mind to land',
        description: `Ongoing emotional support on iPhone. Complements care — does not replace a human therapist. ${trial.short}.`,
        images: [ogImageUrl],
      },
    };
  }

  return {
    title: 'Anto — Tu mente tiene un lugar donde aterrizar | Acompañamiento emocional',
    description:
      'Acompañamiento emocional continuo para cuando necesitas un lugar donde aterrizar — con apoyo de IA en segundo plano. Anto te acompaña entre sesiones o en el día a día; no sustituye atención clínica — un terapeuta o profesional humano sigue siendo lo más recomendable. Disponible en iPhone.',
    alternates,
    openGraph: {
      type: 'website',
      url: canonical,
      title: 'Anto — Tu mente tiene un lugar donde aterrizar',
      description: `Acompañamiento emocional continuo en iPhone. Complementa — no reemplaza — a un terapeuta humano. ${trial.pricingNote}`,
      images: [ogImage],
      siteName: 'Anto',
      locale: 'es_CL',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Anto — Tu mente tiene un lugar donde aterrizar',
      description: `Acompañamiento emocional continuo en iPhone. Complementa — no reemplaza — a un terapeuta humano. ${trial.short}.`,
      images: [ogImageUrl],
    },
  };
}
