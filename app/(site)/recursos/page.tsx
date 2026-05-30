import ResourcesPageContent from '@/components/pages/ResourcesPageContent';
import { resourcesPageMetadata } from '@/lib/i18n/copy/pages/resources';

export const metadata = resourcesPageMetadata('es');

export default function RecursosPage() {
  return <ResourcesPageContent locale="es" />;
}
