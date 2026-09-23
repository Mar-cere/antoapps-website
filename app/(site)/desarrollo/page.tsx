import DesarrolloPageContent from '@/components/pages/DesarrolloPageContent';
import EditorialWebPageJsonLd from '@/components/seo/EditorialWebPageJsonLd';
import { desarrolloPageMetadata } from '@/lib/i18n/copy/pages/desarrollo';

export const metadata = desarrolloPageMetadata('es');

export default function DesarrolloPage() {
  return (
    <>
      <EditorialWebPageJsonLd locale="es" path="/desarrollo" />
      <DesarrolloPageContent locale="es" />
    </>
  );
}
