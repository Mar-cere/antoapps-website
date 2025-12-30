'use client';

import { useEffect } from 'react';
import { useNavigation } from '@/lib/hooks/useNavigation';
import { useDeviceDetection } from '@/lib/hooks/useDeviceDetection';
import { useScrollAnimations, useStaggerAnimation } from '@/lib/hooks/useScrollAnimations';
import { useFAQ } from '@/lib/hooks/useFAQ';
import { useTooltips } from '@/lib/hooks/useTooltips';
import { useLazyLoading } from '@/lib/hooks/useLazyLoading';
import { useServiceWorker, usePWAInstall } from '@/lib/hooks/useServiceWorker';
import { usePerformanceMonitoring } from '@/lib/hooks/usePerformanceMonitoring';

export default function ClientInitializer() {
  useNavigation();
  useDeviceDetection();
  useScrollAnimations();
  useStaggerAnimation();
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

  return null;
}

