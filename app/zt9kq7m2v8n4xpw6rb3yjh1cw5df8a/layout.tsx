import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Validación de título universitario · Demo técnico',
  description:
    'Demostración de validación de registros académicos. Datos y respuestas son simulados para fines de prueba.',
  robots: { index: false, follow: false },
};

export default function ValidacionAcademicaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
