'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function usePerformanceMonitoring() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        if (lastEntry) {
          const lcpValue = lastEntry.renderTime || lastEntry.loadTime;
          console.log('LCP:', lcpValue);
          // Enviar a analytics si está disponible
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'LCP',
              value: Math.round(lcpValue),
            });
          }
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          const fidValue = entry.processingStart - entry.startTime;
          console.log('FID:', fidValue);
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'FID',
              value: Math.round(fidValue),
            });
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as any[];
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        console.log('CLS:', clsValue);
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'CLS',
            value: Math.round(clsValue * 1000),
          });
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    }

    // Page load time (usando Navigation Timing API)
    try {
      const perfEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (perfEntries.length > 0) {
        const navTiming = perfEntries[0];
        const loadTime = navTiming.loadEventEnd - navTiming.fetchStart;
        console.log('Page Load Time:', loadTime, 'ms');
      }
    } catch (e) {
      // Fallback para navegadores que no soportan Navigation Timing API
      console.log('Navigation Timing API no disponible');
    }
  }, [pathname]);
}

