'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useMobileMenu } from '@/lib/hooks/useNavigation';
import '@/styles/layout/header.css';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { toggleMenu } = useMobileMenu();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú al hacer click fuera
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

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/app', label: 'La App' },
    { href: '/#caracteristicas', label: 'Características' },
    { href: '/desarrollo', label: 'Desarrollo' },
    { href: '/contacto', label: 'Contacto' },
  ];

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    toggleMenu();
  };

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className={`header sticky-header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav" role="navigation" aria-label="Navegación principal">
        <div className="container">
          <div className="nav-brand">
            <Link href="/" className="logo" aria-label="Anto - Ir a inicio">
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

          {/* Overlay para menú móvil */}
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
            className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}
            role="menubar"
          >
            {navLinks.map((link) => {
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
          </ul>

          <div className="nav-actions">
            <Link href="#descargar" className="btn btn-primary" aria-label="Descargar la aplicación Anto">
              Descargar App
            </Link>
            <button
              id="navToggle"
              className={`nav-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={handleMenuToggle}
              aria-label="Abrir o cerrar menú de navegación"
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

