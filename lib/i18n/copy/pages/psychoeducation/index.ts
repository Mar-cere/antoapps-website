import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';
import { getPsychoeducationGuideEn } from './en';
import { getPsychoeducationGuideEs } from './es';
import {
  PSYCHOEDUCATION_SLUGS,
  type PsychoeducationGuide,
  type PsychoeducationSlug,
} from './types';

export {
  PSYCHOEDUCATION_SLUGS,
  type PsychoeducationGuide,
  type PsychoeducationSection,
  type PsychoeducationSlug,
} from './types';

export function isPsychoeducationSlug(slug: string): slug is PsychoeducationSlug {
  return (PSYCHOEDUCATION_SLUGS as readonly string[]).includes(slug);
}

export function getPsychoeducationGuide(
  locale: Locale,
  slug: string
): PsychoeducationGuide | undefined {
  if (!isPsychoeducationSlug(slug)) {
    return undefined;
  }
  return locale === 'en' ? getPsychoeducationGuideEn(slug) : getPsychoeducationGuideEs(slug);
}

export function getAllPsychoeducationGuides(locale: Locale): PsychoeducationGuide[] {
  return PSYCHOEDUCATION_SLUGS.map((slug) => getPsychoeducationGuide(locale, slug)!);
}

export function psychoeducationGuidePath(locale: Locale, slug: PsychoeducationSlug): string {
  return localePath(locale, `/recursos/${slug}`);
}

export function psychoeducationLogicalPaths(): string[] {
  return PSYCHOEDUCATION_SLUGS.map((slug) => `/recursos/${slug}`);
}
