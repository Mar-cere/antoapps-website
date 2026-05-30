import type { Metadata } from 'next';
import LegalPageContent from '@/components/pages/LegalPageContent';
import { getTermsPageCopy, termsPageMetadata } from '@/lib/i18n/copy/terms';

const meta = termsPageMetadata('es');

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.openGraph.title,
    description: meta.openGraph.description,
    url: meta.openGraph.url,
  },
};

export default function TerminosPage() {
  return <LegalPageContent locale="es" copy={getTermsPageCopy('es')} />;
}
