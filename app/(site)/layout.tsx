import type { Metadata } from 'next';
import '../../styles/main.css';
import SiteJsonLd from '@/components/seo/SiteJsonLd';
import ClientScripts from '@/components/ClientScripts';

export const metadata: Metadata = {
  metadataBase: new URL('https://antoapps.com'),
  keywords: [
    'Anto',
    'acompañamiento emocional',
    'bienestar emocional',
    'ansiedad',
    'entre sesiones',
    'salud mental',
    'app salud mental',
    'terapia complementaria',
    'TCC',
    'emotional support app',
    'anxiety support',
    'between therapy sessions',
  ].join(', '),
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

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteJsonLd />
      {children}
      <ClientScripts />
    </>
  );
}
