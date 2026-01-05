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
    const calculateHeaderHeight = () => {
      const header = document.querySelector('.header, .sticky-header') as HTMLElement;
      if (header) {
        // Usar offsetHeight que es más preciso que getBoundingClientRect para elementos fixed
        const height = header.offsetHeight || header.getBoundingClientRect().height;
        if (height > 0) {
          const roundedHeight = Math.ceil(height);
          setHeaderHeight(roundedHeight);
          
          // Actualizar el sticky nav inmediatamente si está visible
          if (isVisible) {
            const stickyNav = document.querySelector('.sticky-nav') as HTMLElement;
            if (stickyNav) {
              stickyNav.style.top = `${roundedHeight}px`;
            }
          }
        }
      }
    };

    // Calcular inmediatamente y después de delays para asegurar que el header esté renderizado
    calculateHeaderHeight();
    const timeoutId1 = setTimeout(calculateHeaderHeight, 50);
    const timeoutId2 = setTimeout(calculateHeaderHeight, 200);

    // Recalcular en resize
    window.addEventListener('resize', calculateHeaderHeight);
    
    // Recalcular cuando cambie el scroll (el header puede cambiar de tamaño al hacer scroll)
    const handleScroll = () => {
      requestAnimationFrame(calculateHeaderHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      window.removeEventListener('resize', calculateHeaderHeight);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

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
    // Actualizar posición top del sticky nav cuando cambia la altura del header o visibilidad
    if (isVisible) {
      // Recalcular altura del header cada vez que se hace visible
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

  // Asegurar que headerHeight sea válido
  const topPosition = headerHeight > 0 ? headerHeight : 40;

  return (
    <nav className="sticky-nav" aria-label="Navegación rápida" style={{ top: `${topPosition}px` }}>
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

