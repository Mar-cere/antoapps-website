'use client';

import { useEffect } from 'react';

export function useScrollAnimations() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observar elementos con data-reveal
    const revealElements = document.querySelectorAll('[data-reveal], .reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
}

export function useStaggerAnimation() {
  useEffect(() => {
    const staggerContainers = document.querySelectorAll('[data-stagger]');

    staggerContainers.forEach((container) => {
      const items = container.querySelectorAll('[data-stagger-item]');
      items.forEach((item, index) => {
        (item as HTMLElement).style.animationDelay = `${index * 0.1}s`;
      });
    });
  }, []);
}

