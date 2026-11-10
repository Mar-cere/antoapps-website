import type { Locale } from '@/lib/i18n/config';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';
import { homePageMetadata } from '@/lib/i18n/copy/pages/home-metadata';
import { homeOgImageAlt } from '@/lib/home/opengraph-image';

const LOCALES: readonly Locale[] = ['es', 'en', 'pt'];

const LEGACY_HEADLINE = /apoyo emocional 24\/7|24\/7 emotional support|home v2|sandbox/i;
const CLINICAL_OR_LEGACY_INTENT =
  /ansiedad|ansiedade|anxiety|entre sesiones|entre sessões|between (therapy )?sessions|diagn[oó]stic|diagnostica|treats? |cura |cure /i;

const TITLE_MAX = 60;
const DESCRIPTION_MAX = 155;

function metaText(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && 'absolute' in value) {
    const absolute = (value as { absolute?: string }).absolute;
    return typeof absolute === 'string' ? absolute : '';
  }
  return '';
}

function charCount(value: string): number {
  return [...value].length;
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
      if (!/^Qué es Anto: app de acompañamiento emocional$/.test(title)) {
        errors.push(`${tag} metadata.title debe responder «qué es Anto», sin sustituir el H1`);
      }
    } else if (locale === 'pt') {
      if (!/^O que é a Anto: app de acompanhamento emocional$/.test(title)) {
        errors.push(`${tag} metadata.title deve responder «o que é a Anto», sem substituir o H1`);
      }
    } else if (!/^What is Anto\? An emotional support app$/.test(title)) {
      errors.push(`${tag} metadata.title must answer “what is Anto”, and leave the H1 unchanged`);
    }

    if (charCount(title) > TITLE_MAX) {
      errors.push(`${tag} metadata.title supera ${TITLE_MAX} caracteres (${charCount(title)})`);
    }
    if (charCount(description) > DESCRIPTION_MAX) {
      errors.push(
        `${tag} metadata.description supera ${DESCRIPTION_MAX} caracteres (${charCount(description)})`
      );
    }

    if (!ogTitle.toLowerCase().includes(accent.toLowerCase())) {
      errors.push(`${tag} openGraph.title debe incluir hero.titleAccent ("${accent}")`);
    }

    if (LEGACY_HEADLINE.test(title) || LEGACY_HEADLINE.test(ogTitle) || LEGACY_HEADLINE.test(description)) {
      errors.push(`${tag} metadata usa headline legacy o copy de sandbox`);
    }

    if (CLINICAL_OR_LEGACY_INTENT.test(title) || CLINICAL_OR_LEGACY_INTENT.test(description)) {
      errors.push(
        `${tag} title/description no deben usar términos clínicos ni intenciones legacy (ansiedad / entre sesiones)`
      );
    }

    if (!description.trim() || !ogDescription.trim()) {
      errors.push(`${tag} metadata description/ogDescription vacíos`);
    }
    if (!/\bapp\b/i.test(description)) {
      errors.push(`${tag} metadata.description debe decir que Anto es una app`);
    }

    if (locale === 'es') {
      if (!/paso concreto/i.test(description) || !/da vueltas|escribir/i.test(description)) {
        errors.push(`${tag} metadata.description debe reflejar la voz editorial`);
      }
      if (!/iPhone/i.test(description) || !/Android/i.test(description)) {
        errors.push(`${tag} metadata.description debe mencionar iPhone y Android`);
      }
      if (!/prueba|1 d[ií]a/i.test(description)) {
        errors.push(`${tag} metadata.description debe mencionar la prueba de 1 día`);
      }
      if (!/no reemplaza|no sustituye/i.test(description)) {
        errors.push(`${tag} metadata.description debe aclarar que no reemplaza terapia`);
      }
    } else if (locale === 'pt') {
      if (!/passo concreto/i.test(description) || !/em loop|escrever/i.test(description)) {
        errors.push(`${tag} metadata.description deve refletir a voz editorial`);
      }
      if (!/iPhone/i.test(description) || !/Android/i.test(description)) {
        errors.push(`${tag} metadata.description deve mencionar iPhone e Android`);
      }
      if (!/teste|1 dia/i.test(description)) {
        errors.push(`${tag} metadata.description deve mencionar o teste de 1 dia`);
      }
      if (!/não substitui/i.test(description)) {
        errors.push(`${tag} metadata.description deve deixar claro que não substitui terapia`);
      }
    } else {
      if (!/concrete step/i.test(description) || !/looping|write/i.test(description)) {
        errors.push(`${tag} metadata.description must reflect editorial voice`);
      }
      if (!/iPhone/i.test(description) || !/Android/i.test(description)) {
        errors.push(`${tag} metadata.description must mention iPhone and Android`);
      }
      if (!/trial|1-day/i.test(description)) {
        errors.push(`${tag} metadata.description must mention the 1-day trial`);
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
