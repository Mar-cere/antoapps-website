import SecurityPageContent from '@/components/pages/SecurityPageContent';
import EditorialWebPageJsonLd from '@/components/seo/EditorialWebPageJsonLd';
import { securityPageMetadata } from '@/lib/i18n/copy/pages/security-metadata';

export const metadata = securityPageMetadata('en');

export default function SecurityPageEn() {
  return (
    <>
      <EditorialWebPageJsonLd locale="en" path="/seguridad" />
      <SecurityPageContent locale="en" />
    </>
  );
}
