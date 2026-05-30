import DesarrolloPageContent from '@/components/pages/DesarrolloPageContent';
import { desarrolloPageMetadata } from '@/lib/i18n/copy/pages/desarrollo';

export const metadata = desarrolloPageMetadata('es');

export default function DesarrolloPage() {
  return <DesarrolloPageContent locale="es" />;
}
