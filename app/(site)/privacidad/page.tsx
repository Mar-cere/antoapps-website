import LegalPageContent from '@/components/pages/LegalPageContent';
import { getPrivacyPageCopy, privacyPageMetadata } from '@/lib/i18n/copy/privacy';

export const metadata = privacyPageMetadata('es');

export default function PrivacidadPage() {
  return <LegalPageContent locale="es" copy={getPrivacyPageCopy('es')} />;
}
