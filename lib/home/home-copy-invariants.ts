import { APP_VERSION } from '@/lib/app-version';
import type { Locale } from '@/lib/i18n/config';
import { FEATURE_ICON_IDS } from '@/lib/types/feature-icons';
import { getHomeFaqCopy } from '@/lib/i18n/copy/home/faq';
import { getHomeSectionsCopy } from '@/lib/i18n/copy/home/sections';
import { getWhatsNewCopy } from '@/lib/i18n/copy/home/whats-new';
import { getHomeLandingFinalCopy } from '@/lib/i18n/copy/home/landing-final';
import { getHomeV2Copy } from '@/lib/i18n/copy/home/home-v2';
import { PRICING_USD } from '@/lib/pricing/plans';
import {
  getFaqPageJsonLd,
  getSoftwareApplicationJsonLd,
} from '@/lib/i18n/copy/seo/json-ld';

const LOCALES: readonly Locale[] = ['es', 'en'];

const EXPECTED_FEATURE_CARD_COUNT = 9;
const EXPECTED_WHATS_NEW_ITEMS = 6;
const EXPECTED_FAQ_VISIBLE = 18;

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
    const faqSurface = allFaq.map((item) => `${item.question} ${item.answer}`).join('\n');
    if (/qué protocolos terapéuticos|which therapeutic protocols/i.test(faqSurface)) {
      errors.push(`${tag} FAQ no debe presentar protocolos terapéuticos como producto`);
    }
    if (/detección de crisis proactiva|proactive crisis detection|crisis detection/i.test(faqSurface)) {
      errors.push(`${tag} FAQ no debe vender detección de crisis`);
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
    const publishedFaqCount = getHomeV2Copy(locale).faq.items.length;
    if (mainEntity.length !== publishedFaqCount) {
      errors.push(
        `${tag} FAQ JSON-LD (${mainEntity.length}) no coincide con FAQ home publicada (${publishedFaqCount})`
      );
    }

    // Home-v2 (Sprint A–C): contratos de forma editorial
    const homeV2 = getHomeV2Copy(locale);
    const clinicalInHero =
      /reemplaza|replace|terapeuta humano|human therapist/i.test(homeV2.hero.support);
    if (clinicalInHero) {
      errors.push(`${tag} home-v2 hero.support no debe cargar el límite clínico (va en FAQ/coda)`);
    }
    if (!/crisis/i.test(homeV2.explore.coda.disclaimer)) {
      errors.push(`${tag} home-v2 explore.coda.disclaimer debe mencionar crisis`);
    }
    const appExplore = homeV2.explore.links.find((link) => link.href === '/app');
    if (!appExplore || !/android/i.test(appExplore.description)) {
      errors.push(`${tag} home-v2 explore /app debe mencionar Android`);
    }
    if (homeV2.explore.links.length !== 4) {
      errors.push(`${tag} home-v2 explore debe tener 4 links (hub + guía + app + seguridad)`);
    }
    if (homeV2.moments.length !== 3) {
      errors.push(`${tag} home-v2 moments debe tener 3 ítems`);
    }
    if ('proofSignals' in homeV2.foundation) {
      errors.push(`${tag} home-v2 foundation no debe incluir proofSignals`);
    }
    for (const moment of homeV2.moments) {
      const media = moment.media as { distortion?: { eyebrow?: string }; evidence?: { eyebrow?: string }; privacy?: { eyebrow?: string } };
      const panel = media.distortion ?? media.evidence ?? media.privacy;
      if (panel && 'eyebrow' in panel) {
        errors.push(`${tag} home-v2 moment "${moment.id}" no debe incluir eyebrow de panel`);
      }
    }
    if (homeV2.pricing.cards.filter((card) => card.popular).length !== 1) {
      errors.push(`${tag} home-v2 pricing debe tener exactamente 1 plan popular`);
    }

    const [monthCard, threeCard, sixCard, yearCard] = homeV2.pricing.cards;
    const monthUnit = locale === 'en' ? '/ mo' : '/ mes';
    const perMonthUnit = locale === 'en' ? '/ mo' : '/ mes';
    const threePerMonth = (PRICING_USD.threeMonths / 3).toFixed(2);
    const sixPerMonth = (PRICING_USD.sixMonths / 6).toFixed(2);
    const yearPerMonth = (PRICING_USD.year / 12).toFixed(2);

    if (!monthCard.price.includes(PRICING_USD.month.toFixed(2))) {
      errors.push(`${tag} home-v2 1 mes debe mostrar ${PRICING_USD.month.toFixed(2)}`);
    }
    if (monthCard.unit !== monthUnit) {
      errors.push(`${tag} home-v2 1 mes unit debe ser "${monthUnit}" (sin total duplicado)`);
    }
    if (monthCard.perMonth || monthCard.save) {
      errors.push(`${tag} home-v2 1 mes no debe duplicar total ni badge Ahorra`);
    }
    if (!threeCard.popular) {
      errors.push(`${tag} home-v2 3 meses debe ser el plan popular`);
    }
    if (!threeCard.price.includes(PRICING_USD.threeMonths.toFixed(2))) {
      errors.push(`${tag} home-v2 3 meses número grande debe ser el total ${PRICING_USD.threeMonths.toFixed(2)}`);
    }
    if (threeCard.save) {
      errors.push(`${tag} home-v2 3 meses no debe mostrar Ahorra (no hay ahorro vs 1 mes)`);
    }
    if (!threeCard.perMonth?.includes(threePerMonth) || threePerMonth === PRICING_USD.month.toFixed(2)) {
      errors.push(
        `${tag} home-v2 3 meses /mes debe ser ${threePerMonth} (no redondear a ${PRICING_USD.month.toFixed(2)})`
      );
    }
    if (!threeCard.perMonth?.includes(perMonthUnit)) {
      errors.push(`${tag} home-v2 3 meses debe incluir ${perMonthUnit} bajo el total`);
    }
    if (!sixCard.price.includes(PRICING_USD.sixMonths.toFixed(2)) || !sixCard.perMonth?.includes(sixPerMonth)) {
      errors.push(`${tag} home-v2 6 meses debe mostrar total y ${sixPerMonth}${perMonthUnit}`);
    }
    if (!yearCard.price.includes(PRICING_USD.year.toFixed(2)) || !yearCard.perMonth?.includes(yearPerMonth)) {
      errors.push(`${tag} home-v2 1 año debe mostrar total y ${yearPerMonth}${perMonthUnit}`);
    }
    if (locale === 'es' && (sixCard.save !== 'Ahorra 12%' || yearCard.save !== 'Ahorra 17%')) {
      errors.push(`${tag} home-v2 6 meses/año deben mostrar Ahorra 12% y 17%`);
    }
    if (locale === 'en' && (sixCard.save !== 'Save 12%' || yearCard.save !== 'Save 17%')) {
      errors.push(`${tag} home-v2 6-month/year must show Save 12% and 17%`);
    }

    const heroMessages = homeV2.hero.chat.messages;
    if (heroMessages.length !== 4) {
      errors.push(`${tag} home-v2 hero chat debe tener 4 burbujas (segundo intercambio = móvil)`);
    } else if (locale === 'es') {
      if (!/quedarme en blanco/i.test(heroMessages[2].text)) {
        errors.push(`${tag} home-v2 hero chat móvil (user) debe ser el segundo intercambio`);
      }
      if (!/esta noche solo abre la primera diapositiva/i.test(heroMessages[3].text)) {
        errors.push(`${tag} home-v2 hero chat móvil (Anto) debe ser el segundo intercambio`);
      }
    } else if (
      !/blanking out/i.test(heroMessages[2].text) ||
      !/tonight just open slide one/i.test(heroMessages[3].text)
    ) {
      errors.push(`${tag} home-v2 hero EN debe conservar el último par user+Anto del mock`);
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
