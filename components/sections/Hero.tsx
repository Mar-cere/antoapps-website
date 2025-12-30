'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParticles } from '@/lib/hooks/useParticles';
import '@/styles/components/sections.css';

export default function Hero() {
  const particlesRef = useParticles();

  return (
    <section id="inicio" className="hero" data-fade-section aria-labelledby="hero-title">
      <div ref={particlesRef} className="particles" id="particles"></div>
      <div className="container">
        <div className="hero-content reveal-on-scroll">
          <h1 className="hero-title" id="hero-title">
            Tu apoyo emocional 24/7, siempre disponible
          </h1>
          <p className="hero-subtitle reveal-on-scroll">
            Salud mental accesible para todos. IA que entiende, escucha y apoya. Tu bienestar mental es nuestra prioridad.
          </p>
          <div className="hero-stats">
            <div className="hero-stat-item">
              <span className="hero-stat-icon">🔒</span>
              <span className="hero-stat-value">100%</span>
              <span className="hero-stat-label">privado y seguro</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-icon">⏰</span>
              <span className="hero-stat-value">24/7</span>
              <span className="hero-stat-label">disponible</span>
            </div>
          </div>
          <div className="hero-cta">
            <Link href="#descargar" className="btn btn-primary btn-large">
              Comenzar Prueba Gratis
            </Link>
            <Link href="#como-funciona" className="btn btn-secondary btn-large">
              Saber Más
            </Link>
          </div>
          <div className="hero-badges">
            <Link href="#" className="badge" aria-label="Descargar en App Store" rel="noopener noreferrer">
              <svg width="120" height="40" viewBox="0 0 120 40" fill="none" aria-hidden="true">
                <rect width="120" height="40" rx="8" fill="#000" />
                <text x="60" y="25" fill="#fff" textAnchor="middle" fontSize="12" fontWeight="600">
                  App Store
                </text>
              </svg>
            </Link>
            <Link href="#" className="badge" aria-label="Descargar en Google Play" rel="noopener noreferrer">
              <svg width="120" height="40" viewBox="0 0 120 40" fill="none" aria-hidden="true">
                <rect width="120" height="40" rx="8" fill="#000" />
                <text x="60" y="25" fill="#fff" textAnchor="middle" fontSize="12" fontWeight="600">
                  Google Play
                </text>
              </svg>
            </Link>
          </div>
        </div>
        <div className="hero-image reveal-on-scroll">
          <div className="phone-mockup" data-parallax="0.2" data-magnetic="0.2">
            <div className="phone-screen">
              <div className="app-preview">
                <Image
                  src="/assets/images/antoIcon.png"
                  alt="Anto App"
                  className="app-icon-large"
                  width={120}
                  height={120}
                  priority
                  quality={90}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

