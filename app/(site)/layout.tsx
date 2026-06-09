import type { Metadata } from 'next';
import '../../styles/main.css';
import { APP_VERSION } from '@/lib/app-version';
import ClientScripts from '@/components/ClientScripts';

export const metadata: Metadata = {
  metadataBase: new URL('https://antoapps.com'),
  keywords:
    'salud mental, terapia, AI, asistente virtual, bienestar emocional, apoyo emocional, terapia online, salud mental app, inteligencia artificial, bienestar mental',
  authors: [{ name: 'Marcelo Ull Marambio', url: 'https://github.com/Mar-cere' }],
  creator: 'Marcelo Ull Marambio',
  publisher: 'AntoApps',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.json',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#030A24',
  viewportFit: 'cover' as const,
};

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Anto',
  softwareVersion: APP_VERSION,
  applicationCategory: 'HealthApplication',
  operatingSystem: 'iOS (descarga directa), Android (acceso anticipado)',
  offers: {
    '@type': 'Offer',
    price: '4.20',
    priceCurrency: 'USD',
  },
  description:
    'Aplicación móvil de bienestar emocional con IA (GPT-5.4 Mini), análisis emocional, detección de crisis y herramientas de bienestar 24/7. No sustituye atención clínica.',
  screenshot: 'https://antoapps.com/assets/images/antoIcon.png',
  featureList: [
    'Asistente de IA (bienestar emocional)',
    'Detección de Crisis',
    'Análisis Emocional',
    'Herramientas de Bienestar',
    'Privacidad Total',
    'Disponible 24/7',
  ],
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Anto',
  url: 'https://antoapps.com',
  logo: 'https://antoapps.com/assets/images/antoIcon.png',
  description: 'Mejorando la salud mental, una conversación a la vez.',
  sameAs: [
    'https://www.linkedin.com/in/marcelo-ull-marambio-7314a6177/',
    'https://t.me/marcere23',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'soporte@antoapps.com',
    contactType: 'customer service',
  },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      {children}
      <ClientScripts />
    </>
  );
}
