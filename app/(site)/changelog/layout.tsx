import type { Metadata } from 'next';

const canonical = 'https://antoapps.com/changelog';

export const metadata: Metadata = {
  title: 'Control de versiones | Anto',
  description:
    'Historial de versiones de la app Anto (Expo). Versión actual 1.2.2: mejoras de chat, preferencias de respuesta y privacidad en conversación.',
  alternates: { canonical },
  openGraph: {
    title: 'Control de versiones | Anto',
    description:
      'Changelog de la aplicación Anto: 1.2.2 publicada, escalas clínicas, protocolos y más.',
    url: canonical,
    type: 'website',
    siteName: 'Anto',
  },
  twitter: {
    card: 'summary',
    title: 'Control de versiones | Anto',
    description: 'Historial de versiones de la app Anto.',
  },
};

export default function ChangelogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
