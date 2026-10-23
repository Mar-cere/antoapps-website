import LegalPageContent from '@/components/pages/LegalPageContent';
import EditorialWebPageJsonLd from '@/components/seo/EditorialWebPageJsonLd';
import { getPrivacyPageCopy, privacyPageMetadata } from '@/lib/i18n/copy/privacy';

export const metadata = privacyPageMetadata('pt');

export default function PrivacidadPagePt() {
  return (
    <>
      <EditorialWebPageJsonLd locale="pt" path="/privacidad" />
      <LegalPageContent locale="pt" copy={getPrivacyPageCopy('pt')} />
    </>
  );
}
