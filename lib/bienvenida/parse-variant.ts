import type { BienvenidaVariant } from '@/lib/i18n/copy/bienvenida';

export const BIENVENIDA_VARIANTS = ['A', 'B', 'C'] as const satisfies readonly BienvenidaVariant[];

export function parseBienvenidaVariant(
  value: string | string[] | undefined
): BienvenidaVariant {
  const raw = Array.isArray(value) ? value[0] : value;
  const normalized = raw?.trim().toLowerCase();

  // La variante C (V2) es la mejor para conversión y es el default: el tráfico
  // sin parámetro `?ab=` (p. ej. el link de Instagram) aterriza directo en ella.
  // A y B quedan accesibles solo de forma explícita para tests/comparaciones.
  if (normalized === 'a') return 'A';
  if (normalized === 'b') return 'B';
  return 'C';
}

export function isBienvenidaVariant(value: string): value is Lowercase<BienvenidaVariant> | BienvenidaVariant {
  const v = value.toUpperCase();
  return v === 'A' || v === 'B' || v === 'C';
}
