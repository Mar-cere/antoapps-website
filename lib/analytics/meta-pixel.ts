'use client';

import type { AttributionContext } from '@/lib/analytics/attribution';

declare global {
  interface Window {
    fbq?: FbqFunction;
    _fbq?: FbqFunction;
  }
}

type FbqFunction = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
  push: FbqFunction;
};

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || '';

let metaPixelInitialized = false;

function isProductionHost(): boolean {
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname;
  return host !== 'localhost' && host !== '127.0.0.1';
}

export function initMetaPixel(): void {
  if (typeof window === 'undefined' || !META_PIXEL_ID || metaPixelInitialized) return;
  if (!isProductionHost()) {
    console.log('Meta Pixel deshabilitado en desarrollo');
    return;
  }

  if (!window.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
      } else {
        fbq.queue.push(args);
      }
    } as FbqFunction;

    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.push = fbq;
    window.fbq = fbq;
    window._fbq = fbq;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript?.parentNode?.insertBefore(script, firstScript);
  }

  window.fbq('init', META_PIXEL_ID);
  window.fbq('track', 'PageView');
  metaPixelInitialized = true;
}

type MetaEventParams = Record<string, string | number | boolean | undefined>;

function normalizeMetaParams(params: MetaEventParams): MetaEventParams {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined));
}

export function trackMetaCustomEvent(eventName: string, params: MetaEventParams = {}): void {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('trackCustom', eventName, normalizeMetaParams(params));
}

export function trackMetaStoreClick(params: MetaEventParams & AttributionContext = {}): void {
  if (typeof window === 'undefined' || !window.fbq) return;

  const normalized = normalizeMetaParams(params);
  trackMetaCustomEvent('AppStoreClick', normalized);
  window.fbq(
    'track',
    'Lead',
    normalizeMetaParams({
      content_name: 'app_store',
      content_category: 'app_download_intent',
      ...normalized,
    })
  );
}
