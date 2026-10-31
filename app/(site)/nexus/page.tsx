import NexusPageContent from '@/components/pages/NexusPageContent';
import { nexusPageMetadata } from '@/lib/i18n/copy/pages/nexus';

export const metadata = nexusPageMetadata('es');

export const viewport = {
  themeColor: '#101216',
};

export default function NexusPage() {
  return <NexusPageContent locale="es" />;
}
