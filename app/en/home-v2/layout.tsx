import type { Metadata } from 'next';
import '../../../styles/main.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://antoapps.com'),
  title: 'Anto - Home v2 (editorial, EN)',
  description:
    'Editorial emotional variant of the Anto landing. Non-indexable sandbox.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function HomeV2EnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
