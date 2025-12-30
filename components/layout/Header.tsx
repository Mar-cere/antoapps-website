'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useMobileMenu } from '@/lib/hooks/useNavigation';
import '@/styles/layout/header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleMenu } = useMobileMenu();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/#caracteristicas', label: 'Características' },
    { href: '/desarrollo', label: 'Desarrollo' },
    { href: '/contacto', label: 'Contacto' },
  ];

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    toggleMenu();
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav" role="navigation" aria-label="Navegación principal">
        <div className="container">
          <div className="nav-brand">
            <Link href="/" className="logo" aria-label="Anto - Ir a inicio">
              <Image
                src="/assets/images/antoIcon.png"
                alt="Anto Logo"
                width={40}
                height={40}
                className="logo-icon"
                priority
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
              />
              <span>Anto</span>
            </Link>
          </div>

          <ul
            id="navMenu"
            className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}
            role="menubar"
          >
            {navLinks.map((link) => (
              <li key={link.href} role="none">
                <Link
                  href={link.href}
                  className="nav-link"
                  role="menuitem"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <Link href="/contacto" className="btn btn-primary" aria-label="Contactar">
              Contactar
            </Link>
            <Link href="#descargar" className="btn btn-secondary" aria-label="Descargar la aplicación Anto">
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

