import { APP_VERSION } from '@/lib/app-version';
import type { Locale } from '@/lib/i18n/config';
import { FEATURE_ICON_IDS } from '@/lib/types/feature-icons';
import { getHomeFaqCopy } from '@/lib/i18n/copy/home/faq';
import { getHomeSectionsCopy } from '@/lib/i18n/copy/home/sections';
import { getWhatsNewCopy } from '@/lib/i18n/copy/home/whats-new';
import { getHomeLandingFinalCopy } from '@/lib/i18n/copy/home/landing-final';
import {
  getFaqPageJsonLd,
  getSoftwareApplicationJsonLd,
} from '@/lib/i18n/copy/seo/json-ld';

const LOCALES: readonly Locale[] = ['es', 'en'];

const EXPECTED_FEATURE_CARD_COUNT = 9;
const EXPECTED_WHATS_NEW_ITEMS = 6;
const EXPECTED_FAQ_VISIBLE = 11;

const V15_LANDING_MARKERS: Record<Locale, RegExp[]> = {
  es: [/hub de técnicas/i, /grafo/i, /sesión persistente|insight diario/i],
  en: [/techniques hub/i, /graph/i, /persistent session|daily insight/i],
};

const V15_JSON_LD_MARKERS: Record<Locale, RegExp[]> = {
  es: [/hub de técnicas/i, /grafo de insights/i, /WAI/i, /sesión persistente/i],
  en: [/techniques hub/i, /insights graph/i, /WAI/i, /persistent session/i],
};

function collectFaqIds(locale: Locale): number[] {
  const { faqData, faqMoreData } = getHomeFaqCopy(locale);
  return [...faqData, ...faqMoreData].map((item) => item.id);
}

function landingFeatureText(locale: Locale): string {
  const copy = getHomeLandingFinalCopy(locale);
  return copy.featureRows.map((row) => `${row.subtitle} ${row.tags.join(' ')}`).join(' ');
}

export function assertHomeCopyInvariants(): string[] {
  const errors: string[] = [];

  for (const locale of LOCALES) {
    const tag = `[${locale}]`;
    const sections = getHomeSectionsCopy(locale);
    const whatsNew = getWhatsNewCopy(locale);
    const faq = getHomeFaqCopy(locale);
    const cards = sections.features.cards;

    if (cards.length !== EXPECTED_FEATURE_CARD_COUNT) {
      errors.push(`${tag} features.cards debe tener ${EXPECTED_FEATURE_CARD_COUNT} ítems (tiene ${cards.length})`);
    }

    const cardTitles = new Set(cards.map((card) => card.title));
    if (cardTitles.size !== cards.length) {
      errors.push(`${tag} features.cards tiene títulos duplicados`);
    }

    for (const card of cards) {
      if (!card.title.trim() || !card.description.trim()) {
        errors.push(`${tag} feature card incompleta`);
      }
      if (!FEATURE_ICON_IDS.includes(card.icon)) {
        errors.push(`${tag} feature card usa icono inválido: ${card.icon}`);
      }
    }

    if (!sections.features.subtitle.includes('1.5')) {
      errors.push(`${tag} features.subtitle debe mencionar versión 1.5`);
    }

    if (whatsNew.items.length !== EXPECTED_WHATS_NEW_ITEMS) {
      errors.push(`${tag} whats-new debe tener ${EXPECTED_WHATS_NEW_ITEMS} ítems`);
    }
    if (!whatsNew.subtitle.includes(APP_VERSION)) {
      errors.push(`${tag} whats-new.subtitle debe incluir APP_VERSION (${APP_VERSION})`);
    }
    if (!whatsNew.versionBadge.includes(APP_VERSION)) {
      errors.push(`${tag} whats-new.versionBadge debe incluir APP_VERSION`);
    }

    if (faq.faqData.length !== EXPECTED_FAQ_VISIBLE) {
      errors.push(`${tag} faqData debe tener ${EXPECTED_FAQ_VISIBLE} ítems`);
    }

    const allFaq = [...faq.faqData, ...faq.faqMoreData];
    const faqIds = allFaq.map((item) => item.id);
    const uniqueFaqIds = new Set(faqIds);
    if (uniqueFaqIds.size !== faqIds.length) {
      errors.push(`${tag} FAQ tiene ids duplicados`);
    }

    for (const item of allFaq) {
      if (!item.question.trim() || !item.answer.trim()) {
        errors.push(`${tag} FAQ id ${item.id} incompleta`);
      }
    }

    const requiredV15FaqQuestions: Record<Locale, RegExp[]> = {
      es: [/hub de técnicas/i, /WAI post-sesión/i, /iniciar sesión cada vez/i],
      en: [/techniques hub/i, /post-session WAI/i, /log in every time/i],
    };
    const faqQuestions = allFaq.map((item) => item.question).join('\n');
    for (const pattern of requiredV15FaqQuestions[locale]) {
      if (!pattern.test(faqQuestions)) {
        errors.push(`${tag} FAQ falta pregunta v1.5 esperada: ${pattern}`);
      }
    }

    const landingText = landingFeatureText(locale);
    for (const pattern of V15_LANDING_MARKERS[locale]) {
      if (!pattern.test(landingText)) {
        errors.push(`${tag} landing-final featureRows debe reflejar v1.5 (${pattern})`);
      }
    }

    const software = getSoftwareApplicationJsonLd(locale);
    const featureList = Array.isArray(software.featureList)
      ? (software.featureList as string[]).join(' ')
      : '';
    for (const pattern of V15_JSON_LD_MARKERS[locale]) {
      if (!pattern.test(featureList)) {
        errors.push(`${tag} JSON-LD featureList falta marcador v1.5 (${pattern})`);
      }
    }

    const faqJsonLd = getFaqPageJsonLd(locale);
    const mainEntity = Array.isArray(faqJsonLd.mainEntity) ? faqJsonLd.mainEntity : [];
    if (mainEntity.length !== allFaq.length) {
      errors.push(
        `${tag} FAQ JSON-LD (${mainEntity.length}) no coincide con FAQ copy (${allFaq.length})`
      );
    }
  }

  const esCards = getHomeSectionsCopy('es').features.cards.length;
  const enCards = getHomeSectionsCopy('en').features.cards.length;
  if (esCards !== enCards) {
    errors.push(`[es/en] features.cards desalineados (${esCards} vs ${enCards})`);
  }

  const esFaqCount = collectFaqIds('es').length;
  const enFaqCount = collectFaqIds('en').length;
  if (esFaqCount !== enFaqCount) {
    errors.push(`[es/en] FAQ total desalineado (${esFaqCount} vs ${enFaqCount})`);
  }

  return errors;
}
