import type { Locale } from '@/lib/i18n/config';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';
import { homePageMetadata } from '@/lib/i18n/copy/pages/home-metadata';

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

    if (!title.toLowerCase().includes(accent.toLowerCase())) {
      errors.push(`${tag} metadata.title debe incluir hero.titleAccent ("${accent}")`);
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

    const ogImages = meta.openGraph?.images;
    const ogImage = Array.isArray(ogImages) ? ogImages[0] : ogImages;
    const altText =
      ogImage && typeof ogImage === 'object' && 'alt' in ogImage && typeof ogImage.alt === 'string'
        ? ogImage.alt
        : '';
    const imageUrl =
      ogImage && typeof ogImage === 'object' && 'url' in ogImage
        ? metaText(ogImage.url)
        : typeof ogImage === 'string'
          ? ogImage
          : '';
    if (!imageUrl.includes('/opengraph-image')) {
      errors.push(`${tag} openGraph image debe usar /opengraph-image generado`);
    }
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
