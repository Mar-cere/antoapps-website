import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientInitializer from '@/components/ClientInitializer';
import CookieConsent from '@/components/CookieConsent';
import Breadcrumbs from '@/components/Breadcrumbs';
import ResourcesLibrary from '@/components/resources/ResourcesLibrary';
import '@/styles/components/resources-library.css';

export const metadata: Metadata = {
  title: 'Recursos - Anto | Biblioteca de Recursos de Salud Mental',
  description:
    'Accede a nuestra biblioteca completa de recursos de salud mental: ebooks, guías PDF, videos, podcasts, checklists y más.',
  openGraph: {
    title: 'Recursos - Anto',
    description: 'Biblioteca completa de recursos de salud mental.',
    url: 'https://antoapps.com/recursos',
  },
};

export default function RecursosPage() {
  return (
    <>
      <ClientInitializer />
      <Header />
      <main>
        <Breadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Recursos' }]} />

        <section className="resources-hero" data-fade-section>
          <div className="container">
            <h1 className="resources-title reveal-on-scroll">Biblioteca de Recursos</h1>
            <p className="resources-subtitle reveal-on-scroll">
              Accede a nuestra colección completa de recursos educativos sobre salud mental
            </p>
          </div>
        </section>

        <ResourcesLibrary />
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}

