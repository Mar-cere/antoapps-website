import type { Metadata } from 'next';
import CompararPageContent from '@/components/pages/CompararPageContent';
import { compararPageMetadata } from '@/lib/i18n/copy/comparar';

const meta = compararPageMetadata('en');

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: {
    canonical: 'https://antoapps.com/en/comparar',
    languages: {
      es: 'https://antoapps.com/comparar',
      en: 'https://antoapps.com/en/comparar',
      'x-default': 'https://antoapps.com/comparar',
    },
  },
  openGraph: {
    title: meta.openGraph.title,
    description: meta.openGraph.description,
    url: meta.openGraph.url,
    locale: 'en_US',
  },
};

export default function CompararPageEn() {
  return <CompararPageContent locale="en" />;
}
