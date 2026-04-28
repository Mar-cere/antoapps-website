'use client';

export type AttributionContext = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
};

const ATTRIBUTION_STORAGE_KEY = 'anto_last_attribution';
const ATTRIBUTION_QUERY_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'fbclid',
] as const;

function hasAttributionData(context: AttributionContext): boolean {
  return ATTRIBUTION_QUERY_KEYS.some((key) => Boolean(context[key]));
}

export function readAttributionFromUrl(url: URL): AttributionContext {
  const context: AttributionContext = {};

  for (const key of ATTRIBUTION_QUERY_KEYS) {
    const value = url.searchParams.get(key);
    if (value) {
      context[key] = value;
    }
  }

  return context;
}

export function persistAttributionFromLocation(): AttributionContext {
  if (typeof window === 'undefined') return {};

  const context = readAttributionFromUrl(new URL(window.location.href));
  if (hasAttributionData(context)) {
    sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(context));
    return context;
  }

  return getAttributionContext();
}

export function getAttributionContext(): AttributionContext {
  if (typeof window === 'undefined') return {};

  const stored = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
  if (!stored) return {};

  try {
    return JSON.parse(stored) as AttributionContext;
  } catch {
    return {};
  }
}
