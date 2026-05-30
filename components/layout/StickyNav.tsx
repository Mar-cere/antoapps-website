'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/lib/i18n/context';
import type { Locale } from '@/lib/i18n/config';
import { localeFromPathname } from '@/lib/i18n/path-from-pathname';
import { getSiteLayoutCopy } from '@/lib/i18n/copy/home';
import '@/styles/components/sticky-nav.css';

function resolveLocale(pathname: string, contextLocale: Locale): Locale {
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    return 'en';
  }
  if (pathname === '/') {
    return contextLocale;
  }
  return localeFromPathname(pathname);
}

export default function StickyNav() {
  const pathname = usePathname();
  const contextLocale = useLocale();
  const locale = resolveLocale(pathname ?? '', contextLocale);
  const copy = getSiteLayoutCopy(locale);
  const navItems = copy.stickyNav.items;

  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [isVisible, setIsVisible] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(48);

  useEffect(() => {
    const calculateHeaderHeight = () => {
      const header = document.querySelector('.header, .sticky-header') as HTMLElement;
      if (header) {
        const height = header.offsetHeight || header.getBoundingClientRect().height;
        if (height > 0) {
          const roundedHeight = Math.ceil(height);
          setHeaderHeight(roundedHeight);

          if (isVisible) {
            const stickyNav = document.querySelector('.sticky-nav') as HTMLElement;
            if (stickyNav) {
              stickyNav.style.top = `${roundedHeight}px`;
            }
          }
        }
      }
    };

    calculateHeaderHeight();
    const timeoutId1 = setTimeout(calculateHeaderHeight, 50);
    const timeoutId2 = setTimeout(calculateHeaderHeight, 200);

    window.addEventListener('resize', calculateHeaderHeight);

    const handleScrollForHeight = () => {
      requestAnimationFrame(calculateHeaderHeight);
    };
    window.addEventListener('scroll', handleScrollForHeight, { passive: true });

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      window.removeEventListener('resize', calculateHeaderHeight);
      window.removeEventListener('scroll', handleScrollForHeight);
    };
  }, [isVisible]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);

      const sections = navItems
        .map((item) => {
          const element = document.querySelector(item.href);
          if (element) {
            const rect = element.getBoundingClientRect();
            return {
              id: item.id,
              top: rect.top + scrollY,
              bottom: rect.bottom + scrollY,
            };
          }
          return null;
        })
        .filter(Boolean) as Array<{ id: string; top: number; bottom: number }>;

      const current = sections.find(
        (section) => scrollY >= section.top - 100 && scrollY < section.bottom - 100
      );

      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const stickyNav = document.querySelector('.sticky-nav');
      const stickyNavHeight = stickyNav ? stickyNav.getBoundingClientRect().height : 40;
      const totalOffset = headerHeight + stickyNavHeight;

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - totalOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (isVisible) {
      const header = document.querySelector('.header, .sticky-header') as HTMLElement;
      if (header) {
        const height = header.offsetHeight || header.getBoundingClientRect().height;
        const finalHeight = Math.ceil(height);

        const stickyNav = document.querySelector('.sticky-nav') as HTMLElement;
        if (stickyNav && finalHeight > 0) {
          stickyNav.style.top = `${finalHeight}px`;
          setHeaderHeight(finalHeight);
        }
      }
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const topPosition = headerHeight > 0 ? headerHeight : 40;

  return (
    <nav
      className="sticky-nav"
      aria-label={copy.stickyNav.aria}
      style={{ top: `${topPosition}px` }}
    >
      <div className="sticky-nav-container">
        <ul className="sticky-nav-list">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`sticky-nav-link ${activeSection === item.id ? 'active' : ''}`}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
