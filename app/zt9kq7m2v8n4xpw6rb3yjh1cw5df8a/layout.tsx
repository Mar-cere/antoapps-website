import type { Metadata } from 'next';

const validatorPublicBase = process.env.NEXT_PUBLIC_VALIDATOR_PUBLIC_URL?.replace(/\/$/, '') ?? '';

export const metadata: Metadata = {
  title: 'Validar certificado',
  description:
    'Verificación de número de documento y código de auditoría. Resultados de demostración.',
  robots: { index: false, follow: false },
  icons: {
    icon: [{ url: '/assets/neutral-doc-icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/assets/neutral-doc-icon.svg', type: 'image/svg+xml' }],
  },
  ...(validatorPublicBase ? { metadataBase: new URL(`${validatorPublicBase}/`) } : {}),
  openGraph: {
    title: 'Validar certificado',
    description: 'Verificación de documento y auditoría. Demostración.',
    type: 'website',
    ...(validatorPublicBase ? { url: validatorPublicBase } : {}),
  },
  twitter: {
    card: 'summary',
    title: 'Validar certificado',
    description: 'Verificación de documento y auditoría.',
  },
};

export const viewport = {
  themeColor: '#f0f2f5',
};

export default function ConsultaRegistroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
