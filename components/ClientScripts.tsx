'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { localeFromPathname } from '@/lib/i18n/path-from-pathname';
import { getSiteLayoutCopy } from '@/lib/i18n/copy/home';

export default function ClientScripts() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname ?? '/');
  const ui = getSiteLayoutCopy(locale).ui;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const scrollToTopBtn = document.getElementById('scrollToTop');

      if (scrollToTopBtn) {
        const handleScroll = () => {
          if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
          } else {
            scrollToTopBtn.classList.remove('show');
          }
        };

        window.addEventListener('scroll', handleScroll);

        scrollToTopBtn.addEventListener('click', () => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        });

        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }
    }
  }, []);

  return (
    <button
      id="scrollToTop"
      className="scroll-to-top"
      aria-label={ui.scrollToTop}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
