'use client';

import Link from 'next/link';

export default function Security() {
  return (
    <section id="seguridad" className="security-detailed" data-fade-section>
      <div className="container">
        <h2 className="section-title reveal-on-scroll">Seguridad y Privacidad de Grado Militar</h2>
        <p className="section-subtitle reveal-on-scroll">
          Tu privacidad es nuestra máxima prioridad. Implementamos las mejores prácticas de seguridad para
          proteger tus datos.
        </p>

        <div className="security-grid" data-stagger>
          <div className="security-card reveal-on-scroll" data-stagger-item data-magnetic="0.1">
            <div className="security-icon">🔐</div>
            <h3>Encriptación End-to-End</h3>
            <p>
              Todas tus conversaciones están encriptadas con AES-256, el mismo estándar usado por bancos y
              gobiernos. Ni siquiera nosotros podemos leer tus mensajes.
            </p>
            <ul className="security-features">
              <li>✓ Encriptación AES-256</li>
              <li>✓ Claves de encriptación únicas por usuario</li>
              <li>✓ Sin acceso de terceros</li>
              <li>✓ Verificación de integridad de datos</li>
            </ul>
          </div>

          <div className="security-card reveal-on-scroll" data-stagger-item data-magnetic="0.1">
            <div className="security-icon">🛡️</div>
            <h3>Cumplimiento Regulatorio</h3>
            <p>
              Cumplimos con todas las regulaciones internacionales de protección de datos para garantizar
              tu privacidad y seguridad.
            </p>
            <ul className="security-features">
              <li>✓ GDPR (Europa)</li>
              <li>✓ HIPAA (Estados Unidos)</li>
              <li>✓ LGPD (Brasil)</li>
              <li>✓ PIPEDA (Canadá)</li>
            </ul>
          </div>

          <div className="security-card reveal-on-scroll" data-stagger-item data-magnetic="0.1">
            <div className="security-icon">🔒</div>
            <h3>Autenticación Segura</h3>
            <p>
              Sistema de autenticación robusto con múltiples capas de seguridad para proteger tu cuenta.
            </p>
            <ul className="security-features">
              <li>✓ Autenticación de dos factores (2FA)</li>
              <li>✓ Tokens JWT seguros</li>
              <li>✓ Detección de accesos sospechosos</li>
              <li>✓ Sesiones con expiración automática</li>
            </ul>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
          <Link href="/seguridad" className="btn btn-secondary">
            Ver información completa de seguridad →
          </Link>
        </div>
      </div>
    </section>
  );
}
