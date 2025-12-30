'use client';

import { useEffect } from 'react';

export function useNavigation() {
  useEffect(() => {
    // Smooth scroll para enlaces internos
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement;
      
      if (link && link.hash) {
        e.preventDefault();
        const targetId = link.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
}

export function useMobileMenu() {
  useEffect(() => {
    // Cerrar menú con tecla Escape
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        
        if (navMenu?.classList.contains('active')) {
          navMenu.classList.remove('active');
          navToggle?.classList.remove('active');
          navToggle?.setAttribute('aria-expanded', 'false');
          navToggle?.focus();
        }
      }
    };

    // Cerrar menú al hacer click fuera
    const handleClickOutside = (e: MouseEvent) => {
      const navMenu = document.getElementById('navMenu');
      const navToggle = document.getElementById('navToggle');
      const target = e.target as HTMLElement;

      if (
        navMenu &&
        navToggle &&
        !navMenu.contains(target) &&
        !navToggle.contains(target) &&
        navMenu.classList.contains('active')
      ) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    
    if (navMenu && navToggle) {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      const newExpanded = !isExpanded;
      navToggle.setAttribute('aria-expanded', String(newExpanded));
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    }
  };

  return { toggleMenu };
}

