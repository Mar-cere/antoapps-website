import LegalPageContent from '@/components/pages/LegalPageContent';
import { getTermsPageCopy, termsPageMetadata } from '@/lib/i18n/copy/terms';

export const metadata = termsPageMetadata('es');

export default function TerminosPage() {
  return <LegalPageContent locale="es" copy={getTermsPageCopy('es')} />;
}
