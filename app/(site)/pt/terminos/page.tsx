import LegalPageContent from '@/components/pages/LegalPageContent';
import EditorialWebPageJsonLd from '@/components/seo/EditorialWebPageJsonLd';
import { getTermsPageCopy, termsPageMetadata } from '@/lib/i18n/copy/terms';

export const metadata = termsPageMetadata('pt');

export default function TerminosPagePt() {
  return (
    <>
      <EditorialWebPageJsonLd locale="pt" path="/terminos" />
      <LegalPageContent locale="pt" copy={getTermsPageCopy('pt')} />
    </>
  );
}
