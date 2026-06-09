import type { BienvenidaVariant } from '@/lib/i18n/copy/bienvenida';

export const BIENVENIDA_VARIANTS = ['A', 'B', 'C'] as const satisfies readonly BienvenidaVariant[];

export function parseBienvenidaVariant(
  value: string | string[] | undefined
): BienvenidaVariant {
  const raw = Array.isArray(value) ? value[0] : value;
  const normalized = raw?.trim().toLowerCase();

  if (normalized === 'b') return 'B';
  if (normalized === 'c') return 'C';
  return 'A';
}

export function isBienvenidaVariant(value: string): value is Lowercase<BienvenidaVariant> | BienvenidaVariant {
  const v = value.toUpperCase();
  return v === 'A' || v === 'B' || v === 'C';
}
