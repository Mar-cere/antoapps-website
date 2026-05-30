'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useMobileMenu } from '@/lib/hooks/useNavigation';
import { useSwipeGestures } from '@/lib/hooks/useSwipeGestures';
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher';
import { type Locale } from '@/lib/i18n/config';
import { localeFromPathname, pathWithoutLocale } from '@/lib/i18n/path-from-pathname';
import { getSiteLayoutCopy } from '@/lib/i18n/copy/home';
import '@/styles/layout/header.css';

function resolveLocale(pathname: string): Locale {
  return localeFromPathname(pathname);
}

export default function Header() {
  const pathname = usePathname();
  const locale = resolveLocale(pathname ?? '');
  const copy = getSiteLayoutCopy(locale);
  const homeHref = locale === 'en' ? '/en' : '/';
  const downloadHref = locale === 'en' ? '/en/bienvenida' : '/bienvenida';
  const langSwitchPath = pathWithoutLocale(pathname ?? '/');

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { toggleMenu } = useMobileMenu();

  useSwipeGestures({
    elementRef: menuRef as React.RefObject<HTMLElement>,
    onSwipeLeft: () => {
      if (isMobileMenuOpen && typeof window !== 'undefined' && window.innerWidth <= 768) {
        setIsMobileMenuOpen(false);
        toggleMenu();
      }
    },
    threshold: 50,
    velocity: 0.3,
    disabled: typeof window !== 'undefined' && window.innerWidth > 768,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        overlayRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('.nav-toggle')
      ) {
        setIsMobileMenuOpen(false);
        toggleMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen, toggleMenu]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    toggleMenu();
  };

  const isActiveLink = (href: string) => {
    if (href === '/' || href === '/en') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className={`header sticky-header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav" role="navigation" aria-label={copy.header.navAria}>
        <div className="container">
          <div className="nav-brand">
            <Link href={homeHref} className="logo" aria-label={copy.header.logoAria}>
              <Image
                src="/assets/images/antoIcon.png"
                alt="Anto Logo"
                width={28}
                height={28}
                className="logo-icon"
                priority
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
              />
              <span>Anto</span>
            </Link>
          </div>

          {isMobileMenuOpen && (
            <div
              ref={overlayRef}
              className="nav-overlay"
              onClick={handleMenuToggle}
              aria-hidden="true"
            />
          )}

          <ul
            id="navMenu"
            ref={menuRef}
            className={`nav-menu ${isMobileMenuOpen ? 'active swipeable' : ''}`}
            role="menubar"
          >
            {copy.header.links.map((link) => {
              const isActive = isActiveLink(link.href);
              return (
                <li key={link.href} role="none">
                  <Link
                    href={link.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    role="menuitem"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                    {isActive && <span className="nav-link-indicator" aria-hidden="true" />}
                  </Link>
                </li>
              );
            })}
            <li className="nav-lang-menu-item" role="none">
              <LanguageSwitcher
                locale={locale}
                path={langSwitchPath}
                className="nav-lang-switch nav-lang-switch--menu"
              />
            </li>
          </ul>

          <div className="nav-actions">
            <LanguageSwitcher locale={locale} path={langSwitchPath} className="nav-lang-switch" />
            <Link
              href={downloadHref}
              className="btn btn-primary"
              aria-label={copy.header.downloadAria}
            >
              {copy.header.download}
            </Link>
            <button
              id="navToggle"
              className={`nav-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={handleMenuToggle}
              aria-label={copy.header.menuToggleAria}
              aria-expanded={isMobileMenuOpen}
              aria-controls="navMenu"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
