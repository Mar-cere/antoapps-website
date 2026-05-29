export type BienvenidaVariant = 'A' | 'B';

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
