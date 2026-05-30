import type { Metadata } from 'next';
import LegalPageContent from '@/components/pages/LegalPageContent';
import { getTermsPageCopy, termsPageMetadata } from '@/lib/i18n/copy/terms';

const meta = termsPageMetadata('en');

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: {
    canonical: 'https://antoapps.com/en/terminos',
    languages: {
      es: 'https://antoapps.com/terminos',
      en: 'https://antoapps.com/en/terminos',
      'x-default': 'https://antoapps.com/terminos',
    },
  },
  openGraph: {
    title: meta.openGraph.title,
    description: meta.openGraph.description,
    url: meta.openGraph.url,
    locale: 'en_US',
  },
};

export default function TerminosPageEn() {
  return <LegalPageContent locale="en" copy={getTermsPageCopy('en')} />;
}
