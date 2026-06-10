'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { getHomeLandingFinalCopy } from '@/lib/i18n/copy/home/landing-final';

type HomeLandingStickyNavProps = {
  locale: Locale;
};

export default function HomeLandingStickyNav({ locale }: HomeLandingStickyNavProps) {
  const copy = getHomeLandingFinalCopy(locale);
  const items = copy.stickyNav.items;
  const [activeSection, setActiveSection] = useState(items[0]?.id ?? 'inicio');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 320);

      const sections = items
        .map((item) => {
          const element = document.querySelector(item.href);
          if (!element) return null;
          const rect = element.getBoundingClientRect();
          return { id: item.id, top: rect.top, bottom: rect.bottom };
        })
        .filter((s): s is { id: string; top: number; bottom: number } => s !== null);

      const current = sections.find((s) => s.top <= 140 && s.bottom > 140);
      if (current) {
        setActiveSection(current.id);
      } else if (scrollY < 200) {
        setActiveSection(items[0]?.id ?? 'inicio');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  return (
    <nav
      className={`home-landing-sticky ${isVisible ? 'is-visible' : ''}`}
      aria-label={copy.stickyNav.aria}
      aria-hidden={!isVisible}
    >
      <div className="home-landing-sticky__inner">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`home-landing-sticky__link ${activeSection === item.id ? 'is-active' : ''}`}
            aria-current={activeSection === item.id ? 'true' : undefined}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
