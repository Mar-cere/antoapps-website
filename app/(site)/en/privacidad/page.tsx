import type { Metadata } from 'next';
import LegalPageContent from '@/components/pages/LegalPageContent';
import { getPrivacyPageCopy, privacyPageMetadata } from '@/lib/i18n/copy/privacy';

const meta = privacyPageMetadata('en');

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: {
    canonical: 'https://antoapps.com/en/privacidad',
    languages: {
      es: 'https://antoapps.com/privacidad',
      en: 'https://antoapps.com/en/privacidad',
      'x-default': 'https://antoapps.com/privacidad',
    },
  },
  openGraph: {
    title: meta.openGraph.title,
    description: meta.openGraph.description,
    url: meta.openGraph.url,
    locale: 'en_US',
  },
};

export default function PrivacidadPageEn() {
  return <LegalPageContent locale="en" copy={getPrivacyPageCopy('en')} />;
}
