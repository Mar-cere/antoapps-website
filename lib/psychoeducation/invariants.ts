import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';
import {
  getAllPsychoeducationGuides,
  getPsychoeducationGuide,
  PSYCHOEDUCATION_SLUGS,
} from '@/lib/i18n/copy/pages/psychoeducation';

const LOCALES: readonly Locale[] = ['es', 'en'];

const MIN_SECTIONS = 3;
const MIN_PARAGRAPH_CHARS = 40;

export function assertPsychoeducationInvariants(): string[] {
  const errors: string[] = [];

  if (PSYCHOEDUCATION_SLUGS.length < 8) {
    errors.push(`Se requieren al menos 8 guías de psicoeducación (hay ${PSYCHOEDUCATION_SLUGS.length})`);
  }

  const slugSet = new Set(PSYCHOEDUCATION_SLUGS);
  if (slugSet.size !== PSYCHOEDUCATION_SLUGS.length) {
    errors.push('PSYCHOEDUCATION_SLUGS contiene slugs duplicados');
  }

  for (const locale of LOCALES) {
    const tag = `[${locale}]`;
    const guides = getAllPsychoeducationGuides(locale);

    if (guides.length !== PSYCHOEDUCATION_SLUGS.length) {
      errors.push(`${tag} cantidad de guías (${guides.length}) no coincide con slugs`);
    }

    for (const guide of guides) {
      if (!guide.meta.title.trim() || !guide.meta.description.trim()) {
        errors.push(`${tag} guía "${guide.slug}" sin metadata completa`);
      }
      const disclaimer = guide.disclaimer.toLowerCase();
      const hasClinicalDisclaimer =
        locale === 'es'
          ? /no sustituye|no reemplaza|no es consejo|material educativo|psicoeducación|guía de psicoeducación/.test(
              disclaimer
            )
          : /does not|do not|not a substitute|not medical|educational|psychoeducation/.test(
              disclaimer
            );
      if (!hasClinicalDisclaimer) {
        errors.push(`${tag} guía "${guide.slug}" debe incluir disclaimer clínico`);
      }
      if (guide.sections.length < MIN_SECTIONS) {
        errors.push(`${tag} guía "${guide.slug}" debe tener al menos ${MIN_SECTIONS} secciones`);
      }
      for (const section of guide.sections) {
        if (!section.heading.trim()) {
          errors.push(`${tag} guía "${guide.slug}" tiene sección sin título`);
        }
        const paragraphs = section.paragraphs ?? [];
        const hasContent =
          paragraphs.some((p) => p.trim().length >= MIN_PARAGRAPH_CHARS) ||
          (section.bullets && section.bullets.length > 0);
        if (!hasContent) {
          errors.push(`${tag} guía "${guide.slug}" sección "${section.heading}" sin contenido suficiente`);
        }
      }
      if (!guide.cta.path.startsWith('/')) {
        errors.push(`${tag} guía "${guide.slug}" cta.path inválido`);
      }
      for (const related of guide.relatedSlugs) {
        if (!slugSet.has(related)) {
          errors.push(`${tag} guía "${guide.slug}" relatedSlug inválido: ${related}`);
        }
      }
    }
  }

  for (const slug of PSYCHOEDUCATION_SLUGS) {
    const es = getPsychoeducationGuide('es', slug);
    const en = getPsychoeducationGuide('en', slug);
    if (!es || !en) {
      errors.push(`Falta guía ES/EN para slug "${slug}"`);
    }
    if (es && en && es.slug !== en.slug) {
      errors.push(`Slug desalineado ES/EN para "${slug}"`);
    }
    for (const locale of LOCALES) {
      const path = localePath(locale, `/recursos/${slug}`);
      if (!path.includes(slug)) {
        errors.push(`[${locale}] path de guía inválido para "${slug}": ${path}`);
      }
    }
  }

  return errors;
}
