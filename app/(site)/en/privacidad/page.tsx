import LegalPageContent from '@/components/pages/LegalPageContent';
import { getPrivacyPageCopy, privacyPageMetadata } from '@/lib/i18n/copy/privacy';

export const metadata = privacyPageMetadata('en');

export default function PrivacidadPageEn() {
  return <LegalPageContent locale="en" copy={getPrivacyPageCopy('en')} />;
}
