import type { Locale } from '@/lib/i18n/config';
import { getBienvenidaCopy } from '@/lib/i18n/copy/bienvenida';

const LOCALES: readonly Locale[] = ['es', 'en'];

const PLACEHOLDER_AUTHORS = /usuario de app store|app store user/i;

export function assertBienvenidaCopyInvariants(): string[] {
  const errors: string[] = [];

  for (const locale of LOCALES) {
    const copy = getBienvenidaCopy(locale);
    const tag = `[${locale}]`;

    if (!copy.hero.subheadline.A.trim() || !copy.hero.subheadline.B.trim()) {
      errors.push(`${tag} hero.subheadline vacío`);
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
  }

  return errors;
}
