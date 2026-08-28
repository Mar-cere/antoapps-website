import NexusPageContent from '@/components/pages/NexusPageContent';
import { nexusPageMetadata } from '@/lib/i18n/copy/pages/nexus';

export const metadata = nexusPageMetadata('en');

export default function NexusPageEn() {
  return <NexusPageContent locale="en" />;
}
