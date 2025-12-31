'use client';

import { useEffect, useRef } from 'react';

interface UseParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
  disabled?: boolean;
}

/**
 * Hook para aplicar efectos parallax sutiles a elementos
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: UseParallaxOptions = {}
) {
  const { speed = 0.5, direction = 'up', disabled = false } = options;
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (disabled || typeof window === 'undefined') return;

    const element = elementRef.current;
    if (!element) return;

    // Verificar si el usuario prefiere movimiento reducido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = element.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          // Solo aplicar parallax si el elemento está visible
          if (rect.bottom >= 0 && rect.top <= windowHeight) {
            const elementCenter = rect.top + rect.height / 2;
            const windowCenter = windowHeight / 2;
            const distance = elementCenter - windowCenter;
            const offset = distance * speed * (direction === 'up' ? -1 : 1);
            
            element.style.transform = `translateY(${offset}px)`;
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Ejecutar una vez al montar

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (element) {
        element.style.transform = '';
      }
    };
  }, [speed, direction, disabled]);

  return elementRef;
}

/**
 * Hook para aplicar parallax a múltiples elementos con diferentes velocidades
 */
export function useParallaxMultiple(
  elements: Array<{ ref: React.RefObject<HTMLElement>; speed: number; direction?: 'up' | 'down' }>
) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;

          elements.forEach(({ ref, speed, direction = 'up' }) => {
            const element = ref.current;
            if (!element) return;

            const rect = element.getBoundingClientRect();
            
            if (rect.bottom >= 0 && rect.top <= windowHeight) {
              const elementCenter = rect.top + rect.height / 2;
              const windowCenter = windowHeight / 2;
              const distance = elementCenter - windowCenter;
              const offset = distance * speed * (direction === 'up' ? -1 : 1);
              
              element.style.transform = `translateY(${offset}px)`;
            }
          });

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      elements.forEach(({ ref }) => {
        if (ref.current) {
          ref.current.style.transform = '';
        }
      });
    };
  }, [elements]);
}

