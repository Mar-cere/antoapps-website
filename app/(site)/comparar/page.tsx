import type { Metadata } from 'next';
import CompararPageContent from '@/components/pages/CompararPageContent';
import { compararPageMetadata } from '@/lib/i18n/copy/comparar';

const meta = compararPageMetadata('es');

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.openGraph.title,
    description: meta.openGraph.description,
    url: meta.openGraph.url,
  },
};

export default function CompararPage() {
  return <CompararPageContent locale="es" />;
}
