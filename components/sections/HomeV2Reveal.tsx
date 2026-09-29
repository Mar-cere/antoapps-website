'use client';

import { useEffect } from 'react';

/** Entradas editoriales, una vez. Sin JS la página queda visible. */
export default function HomeV2Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-home-reveal]'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      nodes.forEach((node) => node.classList.add('is-in'));
      return;
    }

    root.classList.add('home-v2-motion');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.22, rootMargin: '0px 0px -6% 0px' },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      root.classList.remove('home-v2-motion');
    };
  }, []);

  return null;
}
