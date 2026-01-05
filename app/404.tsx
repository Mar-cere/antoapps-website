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
        <section className="error-page" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '6rem', fontWeight: 700, marginBottom: '1rem' }}>404</h1>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Página no encontrada</h2>
            <p style={{ marginBottom: '2rem', color: 'var(--secondary-color)' }}>
              Lo sentimos, la página que buscas no existe.
            </p>
            <Link href="/" className="btn btn-primary btn-large">
              Volver al Inicio
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}

