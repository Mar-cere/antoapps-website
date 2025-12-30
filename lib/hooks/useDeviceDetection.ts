'use client';

import { useEffect } from 'react';

export function useDeviceDetection() {
  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const body = document.body;

      // Limpiar clases anteriores
      body.classList.remove('is-mobile', 'is-tablet', 'is-desktop', 'is-foldable', 'is-portrait', 'is-landscape');

      // Detectar tipo de dispositivo
      if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
        body.classList.add('is-tablet');
      } else if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
        body.classList.add('is-mobile');
      } else {
        body.classList.add('is-desktop');
      }

      // Detectar orientación
      if (window.innerHeight > window.innerWidth) {
        body.classList.add('is-portrait');
      } else {
        body.classList.add('is-landscape');
      }

      // Detectar foldable (samsung)
      if (/samsung/i.test(userAgent) && 'getBattery' in navigator) {
        body.classList.add('is-foldable');
      }
    };

    detectDevice();
    window.addEventListener('resize', detectDevice);
    window.addEventListener('orientationchange', detectDevice);

    return () => {
      window.removeEventListener('resize', detectDevice);
      window.removeEventListener('orientationchange', detectDevice);
    };
  }, []);
}

