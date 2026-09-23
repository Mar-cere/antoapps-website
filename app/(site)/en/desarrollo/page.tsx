import DesarrolloPageContent from '@/components/pages/DesarrolloPageContent';
import EditorialWebPageJsonLd from '@/components/seo/EditorialWebPageJsonLd';
import { desarrolloPageMetadata } from '@/lib/i18n/copy/pages/desarrollo';

export const metadata = desarrolloPageMetadata('en');

export default function DesarrolloPageEn() {
  return (
    <>
      <EditorialWebPageJsonLd locale="en" path="/desarrollo" />
      <DesarrolloPageContent locale="en" />
    </>
  );
}