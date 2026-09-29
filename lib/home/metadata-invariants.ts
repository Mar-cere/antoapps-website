import type { Locale } from '@/lib/i18n/config';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';
import { homePageMetadata } from '@/lib/i18n/copy/pages/home-metadata';
import { homeOgImageAlt } from '@/lib/home/opengraph-image';

const LOCALES: readonly Locale[] = ['es', 'en'];

const LEGACY_HEADLINE = /apoyo emocional 24\/7|24\/7 emotional support|home v2|sandbox/i;

function metaText(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && 'absolute' in value) {
    const absolute = (value as { absolute?: string }).absolute;
    return typeof absolute === 'string' ? absolute : '';
  }
  return '';
}

/** Invariantes SEO de la home publicada (voz editorial). */
export function assertHomeMetadataInvariants(): string[] {
  const errors: string[] = [];

  for (const locale of LOCALES) {
    const copy = getHomeV2Copy(locale);
    const meta = homePageMetadata(locale);
    const tag = `[${locale}]`;
    const accent = copy.hero.titleAccent.replace(/\.$/, '').trim();

    const title = metaText(meta.title);
    const ogTitle = metaText(meta.openGraph?.title);
    const twitterTitle = metaText(meta.twitter?.title);
    const description = metaText(meta.description);
    const ogDescription = metaText(meta.openGraph?.description);

    if (!title || !ogTitle || !twitterTitle) {
      errors.push(`${tag} metadata title/og/twitter incompletos`);
    }

    if (locale === 'es') {
      if (!/^Anto, app de acompañamiento emocional \| Ansiedad, entre sesiones$/.test(title)) {
        errors.push(`${tag} metadata.title debe nombrar la app y la intención, sin sustituir el H1`);
      }
    } else if (!/^Anto, an emotional support app \| Anxiety, between sessions$/.test(title)) {
      errors.push(`${tag} metadata.title must name the app and the intent, and leave the H1 unchanged`);
    }
    if (!ogTitle.toLowerCase().includes(accent.toLowerCase())) {
      errors.push(`${tag} openGraph.title debe incluir hero.titleAccent ("${accent}")`);
    }

    if (LEGACY_HEADLINE.test(title) || LEGACY_HEADLINE.test(ogTitle) || LEGACY_HEADLINE.test(description)) {
      errors.push(`${tag} metadata usa headline legacy o copy de sandbox`);
    }

    if (!description.trim() || !ogDescription.trim()) {
      errors.push(`${tag} metadata description/ogDescription vacíos`);
    }
    if (!/\bapp\b/i.test(description)) {
      errors.push(`${tag} metadata.description debe decir que Anto es una app`);
    }

    if (locale === 'es') {
      if (!/acompaña|horas quietas|paso concreto/i.test(description)) {
        errors.push(`${tag} metadata.description debe reflejar la voz editorial`);
      }
      if (!/ansiedad/i.test(description) || !/entre sesiones/i.test(description)) {
        errors.push(`${tag} metadata.description debe incluir intenciones (ansiedad, entre sesiones)`);
      }
      if (!/iPhone/i.test(description) || !/prueba|gratis/i.test(description)) {
        errors.push(`${tag} metadata.description debe mencionar iPhone y prueba`);
      }
      if (!/no reemplaza|no sustituye/i.test(description)) {
        errors.push(`${tag} metadata.description debe aclarar que no reemplaza terapia`);
      }
    } else {
      if (!/quiet hours|concrete step|ongoing emotional/i.test(description)) {
        errors.push(`${tag} metadata.description must reflect editorial voice`);
      }
      if (!/anxiety/i.test(description) || !/between (therapy )?sessions/i.test(description)) {
        errors.push(`${tag} metadata.description must include intents (anxiety, between sessions)`);
      }
      if (!/iPhone/i.test(description) || !/trial|free/i.test(description)) {
        errors.push(`${tag} metadata.description must mention iPhone and trial`);
      }
      if (!/does not replace|doesn't replace/i.test(description)) {
        errors.push(`${tag} metadata.description must clarify it does not replace therapy`);
      }
    }

    // El archivo está en el route group (site). Next sirve
    // /opengraph-image-<sufijo>, no /opengraph-image. Declarar images aquí
    // sustituye esa URL y el HTML anuncia un 404.
    if (meta.openGraph && Object.prototype.hasOwnProperty.call(meta.openGraph, 'images')) {
      errors.push(
        `${tag} openGraph.images no debe fijarse: lo publica app/(site)/opengraph-image.tsx`
      );
    }
    if (meta.twitter && Object.prototype.hasOwnProperty.call(meta.twitter, 'images')) {
      errors.push(
        `${tag} twitter.images no debe fijarse: debe heredar la imagen de la convención de archivo`
      );
    }
    const altText = homeOgImageAlt(locale);
    if (!altText.toLowerCase().includes(accent.toLowerCase())) {
      errors.push(`${tag} openGraph image alt debe incluir hero.titleAccent`);
    }

    const canonical =
      meta.alternates && typeof meta.alternates === 'object' && 'canonical' in meta.alternates
        ? metaText(meta.alternates.canonical)
        : '';
    if (!canonical || canonical.includes('home-v2')) {
      errors.push(`${tag} canonical debe apuntar a la home (/), no a /home-v2`);
    }
  }

  return errors;
}
