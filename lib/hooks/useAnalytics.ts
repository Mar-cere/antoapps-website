'use client';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

export function initAnalytics() {
  if (typeof window === 'undefined') return;

  // Solo cargar en producción
  if (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  ) {
    console.log('Google Analytics deshabilitado en desarrollo');
    return;
  }

  // Cargar Google Analytics
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer!.push(args);
  }
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
  });

  window.gtag = gtag;
}

export function trackEvent(
  action: string,
  category: string,
  label: string = '',
  value: number = 0
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

export function trackPageView(pagePath: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pagePath,
    });
  }
}

export function trackDownload(platform: string) {
  trackEvent('download', 'engagement', platform, 1);
}

export function trackCTA(ctaText: string) {
  trackEvent('cta_click', 'engagement', ctaText, 1);
}

export function trackFormSubmit(formType: string) {
  trackEvent('form_submit', 'engagement', formType, 1);
}

