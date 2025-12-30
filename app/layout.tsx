import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/main.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Anto - Tu apoyo emocional 24/7 | Salud Mental con IA',
  description: 'Anto - Tu apoyo emocional 24/7. Aplicación móvil de salud mental con asistente AI terapéutico, análisis emocional avanzado, detección de crisis y herramientas de bienestar mental.',
  keywords: 'salud mental, terapia, AI, asistente virtual, bienestar emocional, apoyo emocional, terapia online, salud mental app, inteligencia artificial, bienestar mental',
  authors: [{ name: 'Marcelo Ull Marambio', url: 'https://github.com/Mar-cere' }],
  creator: 'Marcelo Ull Marambio',
  publisher: 'AntoApps',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: 'https://antoapps.com',
    title: 'Anto - Tu apoyo emocional 24/7',
    description: 'Aplicación móvil de salud mental con asistente AI terapéutico, análisis emocional y herramientas de bienestar. Disponible 24/7.',
    images: [
      {
        url: 'https://antoapps.com/assets/images/antoIcon.png',
        width: 1200,
        height: 630,
        alt: 'Anto - Salud Mental con IA',
      },
    ],
    siteName: 'Anto',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anto - Tu apoyo emocional 24/7',
    description: 'Aplicación móvil de salud mental con asistente AI terapéutico, análisis emocional y herramientas de bienestar.',
    images: ['https://antoapps.com/assets/images/antoIcon.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  metadataBase: new URL('https://antoapps.com'),
  alternates: {
    canonical: 'https://antoapps.com',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#030A24',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <link rel="canonical" href="https://antoapps.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Anto',
              applicationCategory: 'HealthApplication',
              operatingSystem: 'iOS, Android',
              offers: {
                '@type': 'Offer',
                price: '3990',
                priceCurrency: 'CLP',
              },
              description:
                'Aplicación móvil de salud mental con asistente AI terapéutico, análisis emocional avanzado, detección de crisis y herramientas de bienestar mental 24/7.',
              screenshot: 'https://antoapps.com/assets/images/antoIcon.png',
              featureList: [
                'Asistente AI Terapéutico',
                'Detección de Crisis',
                'Análisis Emocional',
                'Herramientas de Bienestar',
                'Privacidad Total',
                'Disponible 24/7',
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
                email: 'marcelo.ull@antoapps.com',
                contactType: 'customer service',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

