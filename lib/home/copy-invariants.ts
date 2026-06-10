import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';
import {
  HOME_LANDING_SCREENSHOT_PATHS,
  getHomeLandingScreenshotPath,
} from '@/lib/assets/app-screenshots';
import { getHomeLandingFinalCopy } from '@/lib/i18n/copy/home/landing-final';
import { PRICING_USD } from '@/lib/pricing/plans';

const LOCALES: readonly Locale[] = ['es', 'en'];

const PLACEHOLDER_AUTHORS = /usuario de app store|app store user/i;

const FOOTER_LINK_PATHS: Record<Locale, readonly string[]> = {
  es: [
    localePath('es', '/privacidad'),
    localePath('es', '/terminos'),
    localePath('es', '/contacto'),
    localePath('es', '/changelog'),
  ],
  en: [
    localePath('en', '/privacidad'),
    localePath('en', '/terminos'),
    localePath('en', '/contacto'),
    localePath('en', '/changelog'),
  ],
};

export function assertHomeLandingCopyInvariants(): string[] {
  const errors: string[] = [];

  for (const locale of LOCALES) {
    const copy = getHomeLandingFinalCopy(locale);
    const tag = `[${locale}]`;

    const hero = copy.hero;
    if (!hero.kicker.trim() || !hero.titleAccent.trim() || !hero.subtitle.trim()) {
      errors.push(`${tag} hero copy incompleto`);
    }
    if (!hero.heroReview.quote.trim() || !hero.heroReview.author.trim()) {
      errors.push(`${tag} heroReview incompleta`);
    }
    if (PLACEHOLDER_AUTHORS.test(hero.heroReview.author)) {
      errors.push(`${tag} heroReview.author genérico`);
    }
    if (!hero.ctaMicro.includes('·')) {
      errors.push(`${tag} hero.ctaMicro debe incluir separadores de confianza`);
    }
    if (!hero.ctaMicro.toLowerCase().includes('tarjeta') && locale === 'es') {
      errors.push(`${tag} hero.ctaMicro debe mencionar tarjeta`);
    }
    if (!hero.ctaMicro.toLowerCase().includes('card') && locale === 'en') {
      errors.push(`${tag} hero.ctaMicro must mention card`);
    }
    if (!copy.minimalNav.cta.trim()) {
      errors.push(`${tag} minimalNav.cta vacío`);
    }
    if (copy.faqLite.items.length !== 4) {
      errors.push(`${tag} faqLite debe tener 4 ítems`);
    }
    if (!copy.finalCta.title.trim() || !copy.finalCta.subtitle.trim()) {
      errors.push(`${tag} finalCta incompleto`);
    }
    if (!copy.reviews.title.trim()) {
      errors.push(`${tag} reviews.title vacío`);
    }
    if (copy.minimalFooter.links.length !== 4) {
      errors.push(`${tag} minimalFooter debe tener 4 enlaces`);
    }
    if (!copy.minimalFooter.linksAria.trim()) {
      errors.push(`${tag} minimalFooter.linksAria vacío`);
    }
    const expectedFooterPaths = FOOTER_LINK_PATHS[locale];
    for (const link of copy.minimalFooter.links) {
      if (!link.href.trim() || !link.label.trim()) {
        errors.push(`${tag} minimalFooter link incompleto`);
      }
      if (locale === 'es' && link.href.startsWith('/en')) {
        errors.push(`${tag} minimalFooter link no debe usar prefijo /en: ${link.href}`);
      }
      if (locale === 'en' && !link.href.startsWith('/en')) {
        errors.push(`${tag} minimalFooter link debe usar prefijo /en: ${link.href}`);
      }
    }
    const footerHrefs = copy.minimalFooter.links.map((l) => l.href);
    for (const expected of expectedFooterPaths) {
      if (!footerHrefs.includes(expected)) {
        errors.push(`${tag} minimalFooter falta enlace esperado: ${expected}`);
      }
    }
    if (!copy.minimalFooter.copyright.includes('2026')) {
      errors.push(`${tag} minimalFooter.copyright debe incluir año 2026`);
    }
    if (locale === 'es' && !copy.minimalFooter.copyright.toLowerCase().includes('chile')) {
      errors.push(`${tag} minimalFooter.copyright debe mencionar Chile`);
    }
    if (!getHomeLandingScreenshotPath(hero.heroScreenshot)) {
      errors.push(`${tag} heroScreenshot inválido`);
    }

    if (copy.featureRows.length !== 4) {
      errors.push(`${tag} featureRows debe tener 4 ítems`);
    }

    const productRow = copy.featureRows.find((r) => r.id === 'product');
    if (!productRow) {
      errors.push(`${tag} featureRows debe incluir fila "product" (ancla #home-feat-product)`);
    }

    for (const path of Object.values(HOME_LANDING_SCREENSHOT_PATHS)) {
      if (!path.endsWith('.webp')) {
        errors.push(`${tag} screenshot home debe ser WebP: ${path}`);
      }
    }

    for (const row of copy.featureRows) {
      if (!row.eyebrow.trim() || !row.titleHighlight.trim() || !row.subtitle.trim()) {
        errors.push(`${tag} feature row "${row.id}" incompleta`);
      }
      if (row.tags.length < 3) {
        errors.push(`${tag} feature row "${row.id}" debe tener al menos 3 tags`);
      }
      const hasConcreteTag = row.tags.some((t) => /\d/.test(t));
      if (!hasConcreteTag) {
        errors.push(`${tag} feature row "${row.id}" debe incluir al menos un tag con dato numérico`);
      }
      if (!(row.screenshot in HOME_LANDING_SCREENSHOT_PATHS)) {
        errors.push(`${tag} feature row "${row.id}" screenshot key inválida`);
      }
    }

    if (copy.credentials.stats.length !== 4) {
      errors.push(`${tag} credentials.stats debe tener 4 ítems`);
    }
    for (const stat of copy.credentials.stats) {
      if (!stat.detail.trim()) {
        errors.push(`${tag} credentials stat "${stat.label}" sin detail`);
      }
    }
    if (copy.credentials.protocols.length !== 3) {
      errors.push(`${tag} credentials.protocols debe tener 3 ítems`);
    }

    if (copy.pricing.cards.length !== 4) {
      errors.push(`${tag} pricing.cards debe tener 4 ítems`);
    }

    const popular = copy.pricing.cards.filter((c) => c.popular);
    if (popular.length !== 1) {
      errors.push(`${tag} pricing debe tener exactamente 1 plan popular`);
    }

    const monthCard = copy.pricing.cards[0];
    if (!monthCard.price.includes(PRICING_USD.month.toFixed(2))) {
      errors.push(
        `${tag} pricing mes (${monthCard.price}) no coincide con PRICING_USD.month (${PRICING_USD.month})`
      );
    }

    if (copy.footerTrust.items.length !== 3) {
      errors.push(`${tag} footerTrust debe tener 3 ítems`);
    }
    if (!copy.footerTrust.disclaimer.toLowerCase().includes('crisis')) {
      errors.push(`${tag} footerTrust.disclaimer debe mencionar crisis`);
    }
  }

  return errors;
}
