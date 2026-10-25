import SecurityPageContent from '@/components/pages/SecurityPageContent';
import EditorialWebPageJsonLd from '@/components/seo/EditorialWebPageJsonLd';
import { securityPageMetadata } from '@/lib/i18n/copy/pages/security-metadata';

export const metadata = securityPageMetadata('pt');

export default function SecurityPagePt() {
  return (
    <>
      <EditorialWebPageJsonLd locale="pt" path="/seguridad" />
      <SecurityPageContent locale="pt" />
    </>
  );
}
