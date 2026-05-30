import LegalPageContent from '@/components/pages/LegalPageContent';
import { getTermsPageCopy, termsPageMetadata } from '@/lib/i18n/copy/terms';

export const metadata = termsPageMetadata('en');

export default function TerminosPageEn() {
  return <LegalPageContent locale="en" copy={getTermsPageCopy('en')} />;
}
