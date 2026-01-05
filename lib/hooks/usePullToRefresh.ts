'use client';

import { useEffect, useRef, useState } from 'react';

interface UsePullToRefreshOptions {
  onRefresh: () => Promise<void> | void;
  threshold?: number; // Distancia en píxeles para activar
  disabled?: boolean;
  resistance?: number; // Resistencia al scroll (0-1)
}

export function usePullToRefresh({
  onRefresh,
  threshold = 80,
  disabled = false,
  resistance = 0.5,
}: UsePullToRefreshOptions) {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (disabled) return;

    const element = elementRef.current || document.documentElement;
    let touchStartY = 0;
    let isDragging = false;

    const handleTouchStart = (e: TouchEvent) => {
      // Solo activar si estamos en la parte superior de la página
      if (window.scrollY <= 0) {
        touchStartY = e.touches[0].clientY;
        isDragging = true;
        startY.current = touchStartY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || window.scrollY > 0) {
        isDragging = false;
        return;
      }

      currentY.current = e.touches[0].clientY;
      const deltaY = currentY.current - touchStartY;

      if (deltaY > 0) {
        // Prevenir scroll nativo mientras hacemos pull
        e.preventDefault();
        
        const distance = deltaY * resistance;
        setPullDistance(distance);
        setIsPulling(distance > 10);

        // Agregar clase al body para estilos
        if (distance > 0) {
          document.body.classList.add('pull-to-refresh-active');
        }
      }
    };

    const handleTouchEnd = async () => {
      if (!isDragging) return;

      isDragging = false;
      document.body.classList.remove('pull-to-refresh-active');

      if (pullDistance >= threshold && !isRefreshing) {
        setIsRefreshing(true);
        setIsPulling(false);
        
        try {
          await onRefresh();
        } catch (error) {
          console.error('Error en pull-to-refresh:', error);
        } finally {
          setIsRefreshing(false);
          setPullDistance(0);
        }
      } else {
        // Animación de rebote si no alcanzó el threshold
        setPullDistance(0);
        setIsPulling(false);
      }
    };

    // Solo en dispositivos táctiles
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      element.addEventListener('touchstart', handleTouchStart, { passive: false });
      element.addEventListener('touchmove', handleTouchMove, { passive: false });
      element.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      document.body.classList.remove('pull-to-refresh-active');
    };
  }, [disabled, threshold, resistance, pullDistance, isRefreshing, onRefresh]);

  return {
    elementRef,
    isPulling,
    pullDistance,
    isRefreshing,
  };
}

