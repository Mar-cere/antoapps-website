import type { Metadata } from 'next';
import LegalPageContent from '@/components/pages/LegalPageContent';
import { getPrivacyPageCopy, privacyPageMetadata } from '@/lib/i18n/copy/privacy';

const meta = privacyPageMetadata('es');

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.openGraph.title,
    description: meta.openGraph.description,
    url: meta.openGraph.url,
  },
};

export default function PrivacidadPage() {
  return <LegalPageContent locale="es" copy={getPrivacyPageCopy('es')} />;
}
