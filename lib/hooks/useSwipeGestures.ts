'use client';

import { useEffect, useRef } from 'react';

interface SwipeGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number; // Distancia mínima en píxeles
  velocity?: number; // Velocidad mínima (píxeles/ms)
  preventDefault?: boolean;
  disabled?: boolean;
}

export function useSwipeGestures({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
  velocity = 0.3,
  preventDefault = false,
  disabled = false,
  elementRef,
}: SwipeGestureOptions & { elementRef?: React.RefObject<HTMLElement> } = {}) {
  const defaultElementRef = useRef<HTMLElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const ref = elementRef || defaultElementRef;

  useEffect(() => {
    if (disabled) return;

    const element = ref.current || document.documentElement;
    let touchStart: { x: number; y: number; time: number } | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStart = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      };
      touchStartRef.current = touchStart;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStart) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStart.x;
      const deltaY = touch.clientY - touchStart.y;
      const deltaTime = Date.now() - touchStart.time;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const speed = distance / deltaTime;

      // Verificar threshold y velocidad
      if (distance >= threshold && speed >= velocity) {
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);

        // Determinar dirección principal
        if (absX > absY) {
          // Swipe horizontal
          if (deltaX > 0) {
            onSwipeRight?.();
          } else {
            onSwipeLeft?.();
          }
        } else {
          // Swipe vertical
          if (deltaY > 0) {
            onSwipeDown?.();
          } else {
            onSwipeUp?.();
          }
        }

        if (preventDefault) {
          e.preventDefault();
        }
      }

      touchStart = null;
      touchStartRef.current = null;
    };

    // Solo en dispositivos táctiles
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      element.addEventListener('touchstart', handleTouchStart, { passive: !preventDefault });
      element.addEventListener('touchend', handleTouchEnd, { passive: !preventDefault });
    }

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [disabled, threshold, velocity, preventDefault, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, ref]);

  return ref;
}

