/** Período de prueba en App Store — fuente única para todo el sitio (español por defecto) */
import { getTrialCopy } from '@/lib/i18n/copy/trial';

const es = getTrialCopy('es');

export const APP_TRIAL_SHORT = es.short;
export const APP_TRIAL_LABEL = es.label;
export const APP_TRIAL_FAQ_PREMIUM_ANSWER = es.faqPremiumAnswer;
export const APP_TRIAL_FAQ_PRICING_ANSWER = es.faqPricingAnswer;
export const APP_TRIAL_DIFFERENTIATOR_SUFFIX = es.differentiatorSuffix;
export const APP_TRIAL_PRICING_NOTE = es.pricingNote;
export const APP_TRIAL_HERO_NOTE = es.heroNote;
