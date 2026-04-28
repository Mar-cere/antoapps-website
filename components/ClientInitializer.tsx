'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useNavigation } from '@/lib/hooks/useNavigation';
import { useDeviceDetection } from '@/lib/hooks/useDeviceDetection';
import { useScrollAnimations, useStaggerAnimation } from '@/lib/hooks/useScrollAnimations';
import { useEnhancedScrollAnimations, useEnhancedHover } from '@/lib/hooks/useEnhancedAnimations';
import { useFAQ } from '@/lib/hooks/useFAQ';
import { useTooltips } from '@/lib/hooks/useTooltips';
import { useLazyLoading } from '@/lib/hooks/useLazyLoading';
import { useServiceWorker, usePWAInstall } from '@/lib/hooks/useServiceWorker';
import { usePerformanceMonitoring } from '@/lib/hooks/usePerformanceMonitoring';
import { trackPageView } from '@/lib/hooks/useAnalytics';

export default function ClientInitializer() {
  const pathname = usePathname();

  useNavigation();
  useDeviceDetection();
  useScrollAnimations();
  useStaggerAnimation();
  useEnhancedScrollAnimations();
  useEnhancedHover();
  useFAQ();
  useTooltips();
  useLazyLoading();
  useServiceWorker();
  usePWAInstall();
  usePerformanceMonitoring();

  useEffect(() => {
    // Console message
    console.log('%cAnto App', 'color: #1ADDDB; font-size: 24px; font-weight: bold;');
    console.log('%cMejorando la salud mental, una conversación a la vez.', 'color: #A3B8E8; font-size: 14px;');
  }, []);

  useEffect(() => {
    trackPageView(pathname || '/');
  }, [pathname]);

  return null;
}

