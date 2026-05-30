import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';

export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <>
      <ClientInitializer />
      <Header />
      <main>
        <section className="error-page">
          <div className="container">
            <div className="error-404-inner">
              <div className="error-404-code">404</div>
              <h1 className="error-404-title">Página no encontrada</h1>
              <p className="error-404-lead">Lo sentimos, la página que buscas no existe.</p>
              <div className="error-404-actions">
                <Link href="/" className="btn btn-primary btn-large">
                  Volver al Inicio
                </Link>
                <Link href="/bienvenida" className="btn btn-secondary btn-large">
                  Descargar
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
