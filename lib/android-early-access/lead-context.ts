import type { Locale } from '@/lib/i18n/config';
import type { BienvenidaVariant } from '@/lib/i18n/copy/bienvenida';

export type AndroidLeadContext = {
  email: string;
  page: string;
  pageUrl?: string;
  placement: string;
  source: string;
  locale: Locale;
  landingVariant?: BienvenidaVariant;
  submittedAt: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

const LOCALE_LABELS: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
};

export function resolveLeadLocale(page: string, locale?: string): Locale {
  if (locale === 'es' || locale === 'en') return locale;
  if (page.startsWith('/en/') || page === '/en') return 'en';
  return 'es';
}

export function formatAndroidLeadTelegramMessage(input: AndroidLeadContext): string {
  const localeLabel = LOCALE_LABELS[input.locale];
  const pageDisplay = input.pageUrl?.trim() || input.page;
  const lines = [
    'Nuevo registro Android Early Access',
    `Idioma: ${localeLabel} (${input.locale})`,
    `Email: ${input.email}`,
    `Página: ${pageDisplay}`,
  ];

  if (input.landingVariant) {
    lines.push(`Variante landing: ${input.landingVariant}`);
  }

  lines.push(
    `Placement: ${input.placement}`,
    `Source: ${input.source}`
  );

  if (input.utmSource || input.utmMedium || input.utmCampaign) {
    const utmParts = [
      input.utmSource && `source=${input.utmSource}`,
      input.utmMedium && `medium=${input.utmMedium}`,
      input.utmCampaign && `campaign=${input.utmCampaign}`,
    ].filter(Boolean);
    lines.push(`UTM: ${utmParts.join(' · ')}`);
  }

  lines.push(`At: ${input.submittedAt}`);

  return lines.join('\n');
}
