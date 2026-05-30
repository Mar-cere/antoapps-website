import ResourcesPageContent from '@/components/pages/ResourcesPageContent';
import { resourcesPageMetadata } from '@/lib/i18n/copy/pages/resources';

export const metadata = resourcesPageMetadata('en');

export default function ResourcesPageEn() {
  return <ResourcesPageContent locale="en" />;
}
