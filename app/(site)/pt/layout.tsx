import type { Metadata } from 'next';

export const metadata: Metadata = {
  keywords: [
    'Anto',
    'termos de serviço',
    'política de privacidade',
    'condições de uso',
    'dados pessoais',
  ].join(', '),
};

export default function PtLegalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
