'use client';

import Clarity from '@microsoft/clarity';

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim() || '';

let clarityInitialized = false;

function isProductionHost(): boolean {
  if (typeof window === 'undefined') return false;
  const host = window.location.hostname;
  return host !== 'localhost' && host !== '127.0.0.1';
}

/** Inicializa Clarity solo tras consentimiento (mismo patrón que Meta Pixel / GA). */
export function initClarity(): void {
  if (typeof window === 'undefined' || !CLARITY_PROJECT_ID || clarityInitialized) return;

  if (!isProductionHost()) {
    console.log('Clarity deshabilitado en desarrollo');
    return;
  }

  Clarity.init(CLARITY_PROJECT_ID);
  Clarity.consentV2({
    ad_Storage: 'granted',
    analytics_Storage: 'granted',
  });
  clarityInitialized = true;
}

export function trackClarityEvent(eventName: string): void {
  if (typeof window === 'undefined' || typeof window.clarity !== 'function') return;
  Clarity.event(eventName);
}
