import ResourcesPageContent from '@/components/pages/ResourcesPageContent';
import { resourcesPageMetadata } from '@/lib/i18n/copy/pages/resources';

export const metadata = resourcesPageMetadata('pt');

export default function ResourcesPagePt() {
  return <ResourcesPageContent locale="pt" />;
}
