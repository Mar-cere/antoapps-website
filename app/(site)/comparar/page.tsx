import CompararPageContent from '@/components/pages/CompararPageContent';
import { compararPageMetadata } from '@/lib/i18n/copy/comparar';

export const metadata = compararPageMetadata('es');

export default function CompararPage() {
  return <CompararPageContent locale="es" />;
}
