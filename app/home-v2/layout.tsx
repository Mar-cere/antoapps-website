import type { Metadata } from 'next';
import '../../styles/main.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://antoapps.com'),
  title: 'Anto - Home v2 (editorial)',
  description:
    'Variante editorial emocional de la landing Anto. Sandbox no indexable.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function HomeV2Layout({ children }: { children: React.ReactNode }) {
  return children;
}
