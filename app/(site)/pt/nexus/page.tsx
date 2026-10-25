import NexusPageContent from '@/components/pages/NexusPageContent';
import { nexusPageMetadata } from '@/lib/i18n/copy/pages/nexus';

export const metadata = nexusPageMetadata('pt');

export default function NexusPagePt() {
  return <NexusPageContent locale="pt" />;
}
