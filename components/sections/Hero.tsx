'use client';

import Image from 'next/image';
import Link from 'next/link';
import DownloadLink from '@/components/DownloadLink';
import { APP_STORE_BADGE_SVG_PATH, appStoreHref } from '@/lib/download-links';
import { useParticles } from '@/lib/hooks/useParticles';
import { useParallax } from '@/lib/hooks/useParallax';
import '@/styles/components/sections.css';

export default function Hero() {
  const particlesRef = useParticles();
  const heroImageRef = useParallax<HTMLDivElement>({ speed: 0.3, direction: 'up' });

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
          <p className="hero-download-pitch reveal-on-scroll">
            Descarga <strong>Anto</strong> en el App Store y lleva el apoyo contigo. En Google Play,{' '}
            <span className="hero-download-pitch-soon">próximamente</span>.
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
            <DownloadLink
              href={appStoreHref()}
              className="store-badge-link"
              aria-label="Descargar Anto en App Store"
            >
              <Image
                src={APP_STORE_BADGE_SVG_PATH}
                alt=""
                width={120}
                height={40}
                className="store-badge-img"
                priority
              />
            </DownloadLink>
            <span
              className="btn btn-secondary btn-large is-disabled btn-soon-store"
              aria-disabled="true"
              aria-label="Google Play (próximamente)"
            >
              Google Play <span className="btn-soon-pill">Próximamente</span>
            </span>
            <Link href="/app" className="btn btn-secondary btn-large">
              Conocer la app
            </Link>
          </div>
        </div>
        <div className="hero-image reveal-on-scroll-enhanced" ref={heroImageRef}>
          <div className="phone-in-hand-container float-enhanced">
            <Image
              src="/assets/images/hero/phone-in-hand.png"
              alt="Anto App - Persona usando la aplicación mostrando la interfaz de chat en tiempo real"
              className="phone-in-hand-image"
              width={800}
              height={1200}
              priority
              quality={95}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
              style={{
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

