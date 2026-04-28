'use client';

import { getAttributionContext, type AttributionContext } from '@/lib/analytics/attribution';

type EventParams = Record<string, string | number | boolean | undefined>;

function normalizeParams(params: EventParams): EventParams {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined));
}

export function trackCustomEvent(eventName: string, params: EventParams = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', eventName, normalizeParams(params));
}

export function withAttribution(params: EventParams = {}, context?: AttributionContext): EventParams {
  const attribution = context ?? getAttributionContext();
  return {
    ...params,
    ...attribution,
  };
}

