import CompararPageContent from '@/components/pages/CompararPageContent';
import { compararPageMetadata } from '@/lib/i18n/copy/comparar';

export const metadata = compararPageMetadata('en');

export default function CompararPageEn() {
  return <CompararPageContent locale="en" />;
}
