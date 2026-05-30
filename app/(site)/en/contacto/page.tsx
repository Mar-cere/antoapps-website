import type { Metadata } from 'next';
import ContactPageContent from '@/components/pages/ContactPageContent';
import { contactPageMetadata } from '@/lib/i18n/copy/contact';

const meta = contactPageMetadata('en');

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: {
    canonical: 'https://antoapps.com/en/contacto',
    languages: {
      es: 'https://antoapps.com/contacto',
      en: 'https://antoapps.com/en/contacto',
      'x-default': 'https://antoapps.com/contacto',
    },
  },
  openGraph: {
    title: meta.openGraph.title,
    description: meta.openGraph.description,
    url: meta.openGraph.url,
    locale: 'en_US',
  },
};

export default function ContactoPageEn() {
  return <ContactPageContent locale="en" />;
}
