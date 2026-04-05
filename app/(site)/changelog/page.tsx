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
  status?: 'current' | 'stable' | 'beta' | 'deprecated';
  changes: ChangeItem[];
  highlights?: string[];
}

const changelog: Version[] = [
  {
    version: '1.2.2',
    date: '2026-03-27',
    status: 'current',
    highlights: [
      'Versión 1.2.2 (Expo) — línea actual en tiendas',
      'Mejor experiencia de chat (v1.2.x)',
      'Preferencias de tono y estilo de respuesta del asistente (cuando la app lo ofrece)',
      'Transparencia: privacidad integrada en la conversación',
    ],
    changes: [
      { type: 'improvement', description: 'Chat: refinamiento de UX y coherencia con perfil de usuario y API' },
      { type: 'improvement', description: 'Preferencias de conversación: ajustes de estilo de respuesta cuando aplica' },
      { type: 'improvement', description: 'Transparencia: información de privacidad integrada en la experiencia de chat' },
      { type: 'feature', description: 'Mantiene escalas PHQ-9/GAD-7, distorsiones cognitivas y protocolos estructurados de versiones anteriores' },
    ],
  },
  {
    version: '1.1.0',
    date: '2026-01-08',
    status: 'stable',
    highlights: [
      'Sistema de chat mejorado con escalas clínicas validadas',
      'Detección avanzada de distorsiones cognitivas (15 tipos)',
      '8 protocolos terapéuticos estructurados basados en evidencia',
      'Reportes profesionales con estadísticas detalladas',
      'Optimizaciones móviles avanzadas',
    ],
    changes: [
      { type: 'feature', description: 'Escalas clínicas validadas: PHQ-9 para depresión y GAD-7 para ansiedad con evaluación automática' },
      { type: 'feature', description: 'Detección automática de 15 tipos de distorsiones cognitivas durante las conversaciones' },
      { type: 'feature', description: '8 protocolos terapéuticos estructurados basados en evidencia científica (Depresión, Ansiedad, Trauma, TOC, TEPT, etc.)' },
      { type: 'feature', description: 'Reportes profesionales con análisis detallado de progreso, escalas clínicas y estadísticas de distorsiones cognitivas' },
      { type: 'improvement', description: 'Sistema de chat mejorado con evaluación clínica automática y protocolos personalizados según detecciones' },
      { type: 'improvement', description: 'Análisis emocional avanzado ahora incluye evaluación clínica objetiva mediante escalas validadas' },
      { type: 'improvement', description: 'Dashboard de métricas actualizado con visualización de escalas clínicas y distorsiones cognitivas' },
      { type: 'feature', description: 'Pull-to-refresh en dispositivos móviles para actualizar contenido fácilmente' },
      { type: 'feature', description: 'Gestos swipe mejorados para navegación móvil y cierre de menús' },
      { type: 'improvement', description: 'Optimizaciones táctiles: áreas táctiles aumentadas (48px mínimo), feedback visual mejorado' },
      { type: 'improvement', description: 'Viewport optimizado para dispositivos con notch (iPhone X y superiores)' },
      { type: 'improvement', description: 'Menú móvil mejorado con gestos swipe para cerrar y animaciones más fluidas' },
      { type: 'improvement', description: 'Prevención de zoom accidental en inputs móviles (font-size: 16px)' },
      { type: 'improvement', description: 'Scroll táctil optimizado con -webkit-overflow-scrolling: touch y scroll snap' },
      { type: 'fix', description: 'Corregido problema de expansión en preguntas frecuentes (FAQ)' },
    ],
  },
  {
    version: '1.0.0',
    date: '2025-01-15',
    highlights: [
      'Lanzamiento inicial de Anto',
      'Asistente de IA para bienestar emocional',
      'Detección de crisis en tiempo real',
    ],
    changes: [
      { type: 'feature', description: 'Asistente de IA con conversaciones orientadas al bienestar y técnicas basadas en evidencia' },
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
          <span className="status-badge status-badge-current-banner">Versión en tiendas: 1.2.2</span>
          <p className="status-text">
            Publicada según la app (Expo) y el{' '}
            <a href="https://github.com/Mar-cere/Anto" target="_blank" rel="noopener noreferrer">
              README del repositorio Anto
            </a>
            . Incluye mejoras de chat (v1.2.x), preferencias de tono y respuesta cuando la app lo ofrece,
            e información de privacidad en el flujo de conversación, además de escalas PHQ-9/GAD-7,
            distorsiones cognitivas y protocolos estructurados ya presentes en 1.1.0.
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

