/** Copy de bienvenida en español — compatibilidad con imports existentes */
import { getBienvenidaCopy } from '@/lib/i18n/copy/bienvenida';
import { getTrialCopy } from '@/lib/i18n/copy/trial';

export type { BienvenidaVariant } from '@/lib/i18n/copy/bienvenida';

const copy = getBienvenidaCopy('es');
const trial = getTrialCopy('es');

export const BIENVENIDA_TRIAL_SHORT = trial.short;

export const BIENVENIDA_TRIAL_HERO_CTA = copy.trial.heroCta;
export const BIENVENIDA_TRIAL_STICKY_CTA = copy.trial.stickyCta;
export const BIENVENIDA_TRIAL_FINAL_CTA = copy.trial.finalCta;
export const BIENVENIDA_TRIAL_LINE = copy.trial.line;
export const BIENVENIDA_TRIAL_ARIA = copy.trial.aria;
export const BIENVENIDA_TRIAL_STICKY_ARIA = copy.trial.stickyAria;
export const BIENVENIDA_TRIAL_FAQ_ANSWER = copy.trial.faqAnswer;

export const BIENVENIDA_META_DESCRIPTION = copy.meta.description;
export const BIENVENIDA_SOCIAL_DESCRIPTION = copy.meta.socialDescription;
export const BIENVENIDA_OG_SUBLINE = copy.meta.ogSubline;

export function bienvenidaHeroTitleLine2(variant: 'A' | 'B'): string {
  return copy.hero.titleLine2[variant];
}

export function bienvenidaHeroLead(variant: 'A' | 'B'): string {
  return copy.hero.lead[variant];
}

export const BIENVENIDA_HOW_STEPS = copy.how.steps;
export const BIENVENIDA_FINAL_HEADLINE = copy.final.headline;
export const BIENVENIDA_DISCLAIMER = copy.disclaimer;
