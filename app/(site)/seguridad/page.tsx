import SecurityPageContent from '@/components/pages/SecurityPageContent';
import EditorialWebPageJsonLd from '@/components/seo/EditorialWebPageJsonLd';
import { securityPageMetadata } from '@/lib/i18n/copy/pages/security-metadata';

export const metadata = securityPageMetadata('es');

export default function SeguridadPage() {
  return (
    <>
      <EditorialWebPageJsonLd locale="es" path="/seguridad" />
      <SecurityPageContent locale="es" />
    </>
  );
}
