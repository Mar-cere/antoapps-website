import LegalPageContent from '@/components/pages/LegalPageContent';
import EditorialWebPageJsonLd from '@/components/seo/EditorialWebPageJsonLd';
import { getTermsPageCopy, termsPageMetadata } from '@/lib/i18n/copy/terms';

export const metadata = termsPageMetadata('en');

export default function TerminosPageEn() {
  return (
    <>
      <EditorialWebPageJsonLd locale="en" path="/terminos" />
      <LegalPageContent locale="en" copy={getTermsPageCopy('en')} />
    </>
  );
}
