'use client';

import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientScripts from '@/components/ClientScripts';
import CookieConsent from '@/components/CookieConsent';
import Skeleton from '@/components/ui/Skeleton';
import '@/styles/components/changelog.css';

interface ChangeItem {
  type: 'feature' | 'improvement' | 'fix' | 'security' | 'breaking';
  description: string;
}

interface Version {
  version: string;
  date: string;
  status: 'current' | 'stable' | 'beta' | 'deprecated';
  changes: ChangeItem[];
  highlights?: string[];
}

const changelog: Version[] = [
  {
    version: '1.0.0',
    date: '2025-01-15',
    status: 'current',
    highlights: [
      'Lanzamiento inicial de Anto',
      'Asistente AI terapéutico',
      'Detección de crisis en tiempo real',
    ],
    changes: [
      { type: 'feature', description: 'Asistente AI terapéutico con conversaciones empáticas basadas en terapia cognitivo-conductual' },
      { type: 'feature', description: 'Sistema de detección de crisis en tiempo real con alertas tempranas' },
      { type: 'feature', description: 'Análisis emocional avanzado con seguimiento de patrones y estados de ánimo' },
      { type: 'feature', description: 'Herramientas de bienestar: ejercicios de mindfulness, meditación y técnicas de relajación' },
      { type: 'feature', description: 'Encriptación end-to-end para máxima privacidad y seguridad de datos' },
      { type: 'feature', description: 'Disponibilidad 24/7 sin límites de uso ni esperas' },
      { type: 'feature', description: 'Sistema de autenticación seguro con JWT y autenticación biométrica' },
      { type: 'feature', description: 'Integración con Mercado Pago para suscripciones y pagos seguros' },
      { type: 'feature', description: 'Interfaz intuitiva y accesible diseñada para todos los usuarios' },
      { type: 'feature', description: 'Sistema de reportes y seguimiento de progreso emocional' },
      { type: 'feature', description: 'Notificaciones push personalizadas para recordatorios y apoyo' },
      { type: 'feature', description: 'Soporte para iOS y Android con React Native' },
    ],
  },
];

function ChangelogContent() {
  return (
    <div className="changelog-container">
      <div className="changelog-header">
        <h1 className="changelog-title">Control de Versiones</h1>
        <p className="changelog-subtitle">
          Historial de versiones y actualizaciones de la aplicación Anto
        </p>
        <div className="changelog-status-note">
          <span className="status-badge status-badge-review">📱 En Revisión</span>
          <p className="status-text">
            La versión 1.0.0 está actualmente en proceso de revisión en las tiendas de aplicaciones.
            Próximamente disponible en App Store y Google Play.
          </p>
        </div>
      </div>

      <div className="changelog-timeline">
        {changelog.map((version, index) => (
          <div
            key={version.version}
            className={`version-card ${version.status === 'current' ? 'version-current' : ''}`}
            data-stagger-item
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="version-header">
              <div className="version-info">
                <div className="version-number-wrapper">
                  <span className="version-number">{version.version}</span>
                  {version.status === 'current' && (
                    <span className="version-badge version-badge-current">Actual</span>
                  )}
                  {version.status === 'stable' && (
                    <span className="version-badge version-badge-stable">Estable</span>
                  )}
                  {version.status === 'beta' && (
                    <span className="version-badge version-badge-beta">Beta</span>
                  )}
                  {version.status === 'deprecated' && (
                    <span className="version-badge version-badge-deprecated">Deprecado</span>
                  )}
                </div>
                <span className="version-date">{new Date(version.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>

            {version.highlights && version.highlights.length > 0 && (
              <div className="version-highlights">
                <h3 className="highlights-title">Destacados</h3>
                <ul className="highlights-list">
                  {version.highlights.map((highlight, idx) => (
                    <li key={idx} className="highlight-item">
                      <span className="highlight-icon">✨</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="version-changes">
              <h3 className="changes-title">Cambios</h3>
              <ul className="changes-list">
                {version.changes.map((change, idx) => (
                  <li key={idx} className={`change-item change-${change.type}`}>
                    <span className={`change-icon change-icon-${change.type}`}>
                      {change.type === 'feature' && '✨'}
                      {change.type === 'improvement' && '⚡'}
                      {change.type === 'fix' && '🐛'}
                      {change.type === 'security' && '🔒'}
                      {change.type === 'breaking' && '⚠️'}
                    </span>
                    <span className="change-description">{change.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="changelog-footer">
        <p className="changelog-note">
          ¿Tienes sugerencias o encontraste un error? Contáctanos a través de{' '}
          <a href="/contacto" className="changelog-link">
            nuestro formulario de contacto
          </a>
          {' '}o visita nuestro{' '}
          <a href="https://github.com/Mar-cere/Anto" target="_blank" rel="noopener noreferrer" className="changelog-link">
            repositorio en GitHub
          </a>
          {' '}para reportar issues.
        </p>
      </div>
    </div>
  );
}

function ChangelogSkeleton() {
  return (
    <div className="changelog-container">
      <div className="changelog-header">
        <Skeleton variant="text" width="40%" height="3rem" lines={1} />
        <Skeleton variant="text" width="60%" height="1.5rem" lines={1} />
      </div>
      <div className="changelog-timeline">
        {[1, 2, 3].map((i) => (
          <div key={i} className="version-card">
            <Skeleton variant="text" width="30%" height="2rem" lines={1} />
            <Skeleton variant="text" width="50%" height="1.25rem" lines={1} />
            <Skeleton variant="rectangular" width="100%" height="200px" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ChangelogPage() {
  return (
    <>
      <Header />
      <main id="main-content" role="main" className="changelog-page">
        <div className="container">
          <Suspense fallback={<ChangelogSkeleton />}>
            <ChangelogContent />
          </Suspense>
        </div>
      </main>
      <Footer />
      <ClientScripts />
      <CookieConsent />
    </>
  );
}

