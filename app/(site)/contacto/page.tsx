import type { Metadata } from 'next';
import ContactPageContent from '@/components/pages/ContactPageContent';
import { contactPageMetadata } from '@/lib/i18n/copy/contact';

const meta = contactPageMetadata('es');

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.openGraph.title,
    description: meta.openGraph.description,
    url: meta.openGraph.url,
  },
};

export default function ContactoPage() {
  return <ContactPageContent locale="es" />;
}
