import LegalPageContent from '@/components/pages/LegalPageContent';
import EditorialWebPageJsonLd from '@/components/seo/EditorialWebPageJsonLd';
import { getPrivacyPageCopy, privacyPageMetadata } from '@/lib/i18n/copy/privacy';

export const metadata = privacyPageMetadata('en');

export default function PrivacidadPageEn() {
  return (
    <>
      <EditorialWebPageJsonLd locale="en" path="/privacidad" />
      <LegalPageContent locale="en" copy={getPrivacyPageCopy('en')} />
    </>
  );
}
