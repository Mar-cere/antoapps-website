import DesarrolloPageContent from '@/components/pages/DesarrolloPageContent';
import EditorialWebPageJsonLd from '@/components/seo/EditorialWebPageJsonLd';
import { desarrolloPageMetadata } from '@/lib/i18n/copy/pages/desarrollo';

export const metadata = desarrolloPageMetadata('pt');

export default function DesarrolloPagePt() {
  return (
    <>
      <EditorialWebPageJsonLd locale="pt" path="/desarrollo" />
      <DesarrolloPageContent locale="pt" />
    </>
  );
}