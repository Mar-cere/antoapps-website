'use client';

import { useEffect, useRef } from 'react';

/**
 * Hook para aplicar animaciones mejoradas al hacer scroll
 */
export function useEnhancedScrollAnimations() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          entry.target.classList.add('stagger-animated');
        }
      });
    }, observerOptions);

    // Observar elementos con clases de animación
    const elementsToAnimate = document.querySelectorAll(
      '.reveal-on-scroll-enhanced, .stagger-item, [data-parallax]'
    );

    elementsToAnimate.forEach((el) => observer.observe(el));

    return () => {
      elementsToAnimate.forEach((el) => observer.unobserve(el));
    };
  }, []);
}

/**
 * Hook para aplicar efectos magnéticos a elementos
 */
export function useMagneticEffect<T extends HTMLElement = HTMLButtonElement>(
  strength: number = 0.3
) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const moveX = x * strength;
      const moveY = y * strength;

      element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = '';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.style.transform = '';
    };
  }, [strength]);

  return elementRef;
}

/**
 * Hook para aplicar hover effects mejorados
 */
export function useEnhancedHover() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Agregar clases mejoradas a elementos específicos
    const cards = document.querySelectorAll('.feature-card, .value-card, .pricing-card, .metric-card, .challenge-card, .decision-card, .quality-category, .impact-category');
    cards.forEach((card) => {
      card.classList.add('card-hover-enhanced');
    });

    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach((btn) => {
      btn.classList.add('btn-enhanced');
    });

    const links = document.querySelectorAll('a:not(.btn)');
    links.forEach((link) => {
      if (!link.classList.contains('nav-link')) {
        link.classList.add('link-hover-enhanced');
      }
    });

    const icons = document.querySelectorAll('.feature-icon, .value-icon, .metric-icon');
    icons.forEach((icon) => {
      icon.classList.add('icon-hover-enhanced');
    });
  }, []);
}

