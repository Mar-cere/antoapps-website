'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import '@/styles/components/sticky-nav.css';

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'inicio', label: 'Inicio', href: '#inicio' },
  { id: 'caracteristicas', label: 'Características', href: '#caracteristicas' },
  { id: 'beneficios', label: 'Beneficios', href: '#beneficios' },
  { id: 'precios', label: 'Precios', href: '#precios' },
  { id: 'faq', label: 'FAQ', href: '#faq' },
];

export default function StickyNav() {
  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [isVisible, setIsVisible] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(48);

  useEffect(() => {
    // Calcular altura real del header
    const header = document.querySelector('.header, .sticky-header');
    if (header) {
      const height = header.getBoundingClientRect().height;
      setHeaderHeight(height);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);

      // Detectar sección activa
      const sections = navItems.map(item => {
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
      }).filter(Boolean) as Array<{ id: string; top: number; bottom: number }>;

      const current = sections.find(
        section => scrollY >= section.top - 100 && scrollY < section.bottom - 100
      );

      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Llamar una vez al montar

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      // Calcular altura total: header + sticky nav
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
    // Actualizar posición top del sticky nav cuando cambia la altura del header
    const stickyNav = document.querySelector('.sticky-nav') as HTMLElement;
    if (stickyNav) {
      stickyNav.style.top = `${headerHeight}px`;
    }
  }, [headerHeight]);

  if (!isVisible) return null;

  return (
    <nav className="sticky-nav" aria-label="Navegación rápida" style={{ top: `${headerHeight}px` }}>
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

