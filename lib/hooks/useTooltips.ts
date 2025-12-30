'use client';

import { useEffect } from 'react';

export function useTooltips() {
  useEffect(() => {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');

    tooltipElements.forEach((element) => {
      // Soporte de teclado
      element.addEventListener('focus', () => {
        element.setAttribute(
          'aria-describedby',
          'tooltip-' + Math.random().toString(36).substring(2, 9)
        );
      });

      // Soporte táctil para móvil
      if ('ontouchstart' in window) {
        let touchTimeout: NodeJS.Timeout;
        element.addEventListener('touchstart', (e) => {
          e.preventDefault();
          clearTimeout(touchTimeout);
          element.setAttribute('data-tooltip-visible', 'true');

          touchTimeout = setTimeout(() => {
            element.removeAttribute('data-tooltip-visible');
          }, 3000);
        });
      }
    });

    // Cerrar tooltips al hacer click fuera
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-tooltip]')) {
        tooltipElements.forEach((el) => {
          el.removeAttribute('data-tooltip-visible');
        });
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
}

