export type BienvenidaVariant = 'A' | 'B';

/** Período de prueba en App Store — fuente única para /bienvenida */
export const BIENVENIDA_TRIAL_SHORT = '1 día gratis';

export const BIENVENIDA_TRIAL_HERO_CTA: Record<BienvenidaVariant, string> = {
  A: `Empieza en iPhone — ${BIENVENIDA_TRIAL_SHORT}`,
  B: `Descargar en iPhone — ${BIENVENIDA_TRIAL_SHORT}`,
};

export const BIENVENIDA_TRIAL_STICKY_CTA: Record<BienvenidaVariant, string> = {
  A: `Empieza — ${BIENVENIDA_TRIAL_SHORT}`,
  B: `Descargar — ${BIENVENIDA_TRIAL_SHORT}`,
};

export const BIENVENIDA_TRIAL_FINAL_CTA = `Descargar en App Store — ${BIENVENIDA_TRIAL_SHORT}`;

export const BIENVENIDA_TRIAL_LINE = `${BIENVENIDA_TRIAL_SHORT} · cancelas cuando quieras en App Store`;

export const BIENVENIDA_TRIAL_ARIA =
  'Descargar Anto en App Store. Incluye 1 día de prueba gratis.';

export const BIENVENIDA_TRIAL_STICKY_ARIA =
  'Descargar Anto en App Store. Prueba gratis de 1 día.';

export const BIENVENIDA_TRIAL_FAQ_ANSWER =
  'La descarga es gratis y tienes 1 día de prueba sin costo. Después, el plan mensual parte desde $3.990 CLP. Puedes cancelar cuando quieras desde App Store.';

export const BIENVENIDA_META_DESCRIPTION =
  'Cuando tu mente va a mil, escribe lo que sientes y recibe guía clara en segundos. Prueba 1 día gratis en iPhone.';

export const BIENVENIDA_SOCIAL_DESCRIPTION =
  'Descarga en App Store. ★ 5.0 · Prueba 1 día gratis.';

export const BIENVENIDA_OG_SUBLINE =
  'Escribe como te salga y recibe claridad práctica en segundos. Prueba 1 día gratis en iPhone.';

export function bienvenidaHeroTitleLine2(variant: BienvenidaVariant): string {
  return variant === 'B'
    ? 'Anto te ayuda a ordenarlo'
    : 'Ordena lo que sientes con Anto';
}

export function bienvenidaHeroLead(variant: BienvenidaVariant): string {
  return variant === 'B'
    ? 'Escribes lo que sientes y recibes guía clara en segundos.'
    : 'Escribe lo que sientes y recibe guía clara en segundos.';
}

export const BIENVENIDA_HOW_STEPS = [
  'Escribe lo que sientes, sin filtro.',
  'Recibe claridad y un paso concreto para hoy.',
  'Vuelve cuando lo necesites.',
] as const;

export const BIENVENIDA_FINAL_HEADLINE = '¿Quieres probar Anto?';

export const BIENVENIDA_DISCLAIMER =
  'Anto no sustituye terapia ni atención clínica. Si estás en crisis, busca ayuda profesional o de emergencia en tu país.';
