import DesarrolloPageContent from '@/components/pages/DesarrolloPageContent';
import { desarrolloPageMetadata } from '@/lib/i18n/copy/pages/desarrollo';

export const metadata = desarrolloPageMetadata('en');

export default function DesarrolloPageEn() {
  return <DesarrolloPageContent locale="en" />;
}
