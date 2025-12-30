'use client';

import { useEffect } from 'react';

export default function ClientScripts() {
  useEffect(() => {
    // Inicializar scripts del cliente
    // TODO: Migrar scripts de scripts/main.js aquí
    // Por ahora, cargamos los scripts existentes si están disponibles
    
    if (typeof window !== 'undefined') {
      // Scroll to top button
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
      aria-label="Volver arriba"
      style={{ display: 'none' }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}

