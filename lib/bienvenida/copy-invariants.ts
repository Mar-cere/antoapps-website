import type { Locale } from '@/lib/i18n/config';
import {
  APP_SCREENSHOT_PATHS,
  HOME_LANDING_SCREENSHOT_PATHS,
} from '@/lib/assets/app-screenshots';
import { getBienvenidaCopy } from '@/lib/i18n/copy/bienvenida';
import { BIENVENIDA_VARIANTS } from '@/lib/bienvenida/parse-variant';

const LOCALES: readonly Locale[] = ['es', 'en'];
const VARIANTS = BIENVENIDA_VARIANTS;

const PLACEHOLDER_AUTHORS = /usuario de app store|app store user/i;

export function assertBienvenidaCopyInvariants(): string[] {
  const errors: string[] = [];

  for (const locale of LOCALES) {
    const copy = getBienvenidaCopy(locale);
    const tag = `[${locale}]`;

    for (const variant of VARIANTS) {
      if (!copy.hero.subheadline[variant]?.trim()) {
        errors.push(`${tag} hero.subheadline.${variant} vacío`);
      }
      if (!copy.hero.titleLine2[variant]?.trim()) {
        errors.push(`${tag} hero.titleLine2.${variant} vacío`);
      }
      if (!copy.trial.heroCta[variant]?.trim()) {
        errors.push(`${tag} trial.heroCta.${variant} vacío`);
      }
      if (!copy.trial.stickyCta[variant]?.trim()) {
        errors.push(`${tag} trial.stickyCta.${variant} vacío`);
      }
    }

    if (copy.reviews.items.length < 2) {
      errors.push(`${tag} reviews: se requieren al menos 2 fragmentos`);
    }

    for (const review of copy.reviews.items) {
      if (!review.quote.trim() || !review.author.trim()) {
        errors.push(`${tag} review incompleta`);
      }
      if (PLACEHOLDER_AUTHORS.test(review.author)) {
        errors.push(`${tag} review.author genérico: "${review.author}"`);
      }
    }

    if (copy.clinicalPillars.items.length !== 3) {
      errors.push(`${tag} clinicalPillars: se requieren 3 ítems`);
    }

    if (copy.conversationDemo.messages.length < 3) {
      errors.push(`${tag} conversationDemo: se requieren al menos 3 mensajes`);
    }

    if (copy.audience.items.length !== 3) {
      errors.push(`${tag} audience: se requieren 3 escenarios`);
    }

    if (!copy.androidWaitlist.incentive.trim()) {
      errors.push(`${tag} androidWaitlist.incentive vacío`);
    }

    if (!copy.androidWaitlist.counterTemplate.includes('{count}')) {
      errors.push(`${tag} androidWaitlist.counterTemplate sin placeholder {count}`);
    }

    if (
      locale === 'es' &&
      !/IA|apoyo emocional/i.test(copy.meta.socialDescription)
    ) {
      errors.push(`${tag} meta.socialDescription debería mencionar IA/apoyo emocional`);
    }

    if (
      locale === 'en' &&
      !/AI|emotional/i.test(copy.meta.socialDescription)
    ) {
      errors.push(`${tag} meta.socialDescription should mention AI/emotional support`);
    }

    const v2 = copy.v2;
    if (!v2.eyebrow.trim() || !v2.heroTitlePrefix.trim() || !v2.heroTitleHighlight.trim()) {
      errors.push(`${tag} v2 hero copy incompleto`);
    }
    if (!v2.heroSub.trim() || !v2.ctaMicro.trim() || !v2.androidLink.trim()) {
      errors.push(`${tag} v2 CTA copy incompleto`);
    }
    if (!v2.heroReview.quote.trim() || !v2.heroReview.author.trim()) {
      errors.push(`${tag} v2.heroReview incompleta`);
    }
    if (v2.features.length !== 4) {
      errors.push(`${tag} v2.features debe tener 4 ítems`);
    }
    if (v2.trustItems.length !== 3) {
      errors.push(`${tag} v2.trustItems debe tener 3 ítems`);
    }
    if (v2.chatScreenshot.src !== HOME_LANDING_SCREENSHOT_PATHS.chatAnxiety) {
      errors.push(`${tag} v2.chatScreenshot.src debe usar HOME_LANDING_SCREENSHOT_PATHS.chatAnxiety`);
    }
    if (!v2.chatScreenshot.alt.trim()) {
      errors.push(`${tag} v2.chatScreenshot.alt vacío`);
    }
    if (v2.dashboard.image.src !== APP_SCREENSHOT_PATHS.home) {
      errors.push(`${tag} v2.dashboard.image.src debe usar APP_SCREENSHOT_PATHS.home`);
    }
    for (const image of copy.screenshots.images) {
      if (!image.src.trim() || !image.alt.trim()) {
        errors.push(`${tag} screenshots.images incompleto`);
      }
    }
  }

  return errors;
}
