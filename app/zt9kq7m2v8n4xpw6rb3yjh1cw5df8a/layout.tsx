import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Consulta de registro de título',
  description:
    'Formulario de verificación de folio y año de emisión. Los resultados mostrados son generados en entorno de demostración.',
  robots: { index: false, follow: false },
  icons: {
    icon: [{ url: '/assets/neutral-doc-icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/assets/neutral-doc-icon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    title: 'Consulta de registro de título',
    description: 'Verificación de datos de folio. Entorno de demostración.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Consulta de registro de título',
    description: 'Verificación de datos de folio.',
  },
};

export const viewport = {
  themeColor: '#0f1419',
};

export default function ConsultaRegistroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
