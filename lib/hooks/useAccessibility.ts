'use client';

import { useEffect, useState } from 'react';

export function useAccessibility() {
  const [fontSize, setFontSize] = useState(1);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Cargar preferencias guardadas
    const savedFontSize = localStorage.getItem('fontSize');
    const savedHighContrast = localStorage.getItem('highContrast');
    const savedReducedMotion = localStorage.getItem('reducedMotion');

    if (savedFontSize) {
      setFontSize(parseFloat(savedFontSize));
      document.documentElement.style.fontSize = `${16 * parseFloat(savedFontSize)}px`;
    }

    if (savedHighContrast === 'true') {
      setHighContrast(true);
      document.body.classList.add('high-contrast');
    }

    if (savedReducedMotion === 'true') {
      setReducedMotion(true);
      document.body.classList.add('reduced-motion');
    }

    // Detectar preferencia del sistema para reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      setReducedMotion(true);
      document.body.classList.add('reduced-motion');
    }
  }, []);

  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 0.1, 1.5);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${16 * newSize}px`;
    localStorage.setItem('fontSize', String(newSize));
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 0.1, 0.8);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${16 * newSize}px`;
    localStorage.setItem('fontSize', String(newSize));
  };

  const resetFontSize = () => {
    setFontSize(1);
    document.documentElement.style.fontSize = '16px';
    localStorage.setItem('fontSize', '1');
  };

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    if (newValue) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    localStorage.setItem('highContrast', String(newValue));
  };

  const toggleReducedMotion = () => {
    const newValue = !reducedMotion;
    setReducedMotion(newValue);
    if (newValue) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
    localStorage.setItem('reducedMotion', String(newValue));
  };

  return {
    fontSize,
    highContrast,
    reducedMotion,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    toggleHighContrast,
    toggleReducedMotion,
  };
}

