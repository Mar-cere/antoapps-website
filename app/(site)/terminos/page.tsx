import LegalPageContent from '@/components/pages/LegalPageContent';
import EditorialWebPageJsonLd from '@/components/seo/EditorialWebPageJsonLd';
import { getTermsPageCopy, termsPageMetadata } from '@/lib/i18n/copy/terms';

export const metadata = termsPageMetadata('es');

export default function TerminosPage() {
  return (
    <>
      <EditorialWebPageJsonLd locale="es" path="/terminos" />
      <LegalPageContent locale="es" copy={getTermsPageCopy('es')} />
    </>
  );
}
