import type { Locale } from '@/lib/i18n/config';
import type { BienvenidaVariant } from '@/lib/i18n/copy/bienvenida';
import { isBienvenidaVariant } from '@/lib/bienvenida/parse-variant';
import { resolveLeadLocale, type AndroidLeadContext } from '@/lib/android-early-access/lead-context';

export type EarlyAccessPayload = {
  email?: string;
  source?: string;
  placement?: string;
  page?: string;
  pageUrl?: string;
  locale?: string;
  landingVariant?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

function cleanText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value.trim() : fallback;
}

function parseLandingVariant(value: unknown): BienvenidaVariant | undefined {
  const raw = cleanText(value).toUpperCase();
  if (!raw) return undefined;
  return isBienvenidaVariant(raw) ? (raw as BienvenidaVariant) : undefined;
}

export function parseEarlyAccessPayload(
  body: EarlyAccessPayload,
  submittedAt: string
): Omit<AndroidLeadContext, 'email'> & { email: string } | null {
  const email = cleanText(body.email).toLowerCase();
  if (!email) return null;

  const page = cleanText(body.page, '/');
  const pageUrl = cleanText(body.pageUrl);
  const locale: Locale = resolveLeadLocale(pageUrl || page, cleanText(body.locale));

  return {
    email,
    page,
    pageUrl: pageUrl || undefined,
    placement: cleanText(body.placement, 'unknown'),
    source: cleanText(body.source, 'website'),
    locale,
    landingVariant: parseLandingVariant(body.landingVariant),
    submittedAt,
    utmSource: cleanText(body.utm_source) || undefined,
    utmMedium: cleanText(body.utm_medium) || undefined,
    utmCampaign: cleanText(body.utm_campaign) || undefined,
  };
}
