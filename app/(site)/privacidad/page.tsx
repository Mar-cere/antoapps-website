import LegalPageContent from '@/components/pages/LegalPageContent';
import EditorialWebPageJsonLd from '@/components/seo/EditorialWebPageJsonLd';
import { getPrivacyPageCopy, privacyPageMetadata } from '@/lib/i18n/copy/privacy';

export const metadata = privacyPageMetadata('es');

export default function PrivacidadPage() {
  return (
    <>
      <EditorialWebPageJsonLd locale="es" path="/privacidad" />
      <LegalPageContent locale="es" copy={getPrivacyPageCopy('es')} />
    </>
  );
}
