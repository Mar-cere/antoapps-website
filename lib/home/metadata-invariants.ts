import type { Locale } from '@/lib/i18n/config';
import { getHomeLandingFinalCopy } from '@/lib/i18n/copy/home/landing-final';
import { homePageMetadata } from '@/lib/i18n/copy/pages/home-metadata';

const LOCALES: readonly Locale[] = ['es', 'en'];

const LEGACY_HEADLINE = /apoyo emocional 24\/7|24\/7 emotional support/i;

function metaText(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && 'absolute' in value) {
    const absolute = (value as { absolute?: string }).absolute;
    return typeof absolute === 'string' ? absolute : '';
  }
  return '';
}

export function assertHomeMetadataInvariants(): string[] {
  const errors: string[] = [];

  for (const locale of LOCALES) {
    const copy = getHomeLandingFinalCopy(locale);
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

    if (LEGACY_HEADLINE.test(title) || LEGACY_HEADLINE.test(ogTitle)) {
      errors.push(`${tag} metadata usa headline legacy "24/7"`);
    }

    if (!description.trim() || !ogDescription.trim()) {
      errors.push(`${tag} metadata description/ogDescription vacíos`);
    }

    if (locale === 'es') {
      if (!/protocolos clínicos|IA avanzada/i.test(description)) {
        errors.push(`${tag} metadata.description debe reflejar copy landing-final`);
      }
      if (!/iPhone|prueba/i.test(description)) {
        errors.push(`${tag} metadata.description debe mencionar prueba o iPhone`);
      }
    } else {
      if (!/clinical protocols|advanced AI/i.test(description)) {
        errors.push(`${tag} metadata.description must reflect landing-final copy`);
      }
      if (!/iPhone|trial/i.test(description)) {
        errors.push(`${tag} metadata.description must mention trial or iPhone`);
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
  }

  return errors;
}
