import { nexusOpenGraphImage, NEXUS_OG_CONTENT_TYPE, NEXUS_OG_SIZE } from '@/lib/nexus/opengraph-image';
import { getNexusPageCopy } from '@/lib/i18n/copy/pages/nexus';

export const runtime = 'edge';
export const alt = getNexusPageCopy('es').meta.ogAlt;
export const size = NEXUS_OG_SIZE;
export const contentType = NEXUS_OG_CONTENT_TYPE;

export default function NexusOpenGraphImage() {
  return nexusOpenGraphImage('es');
}
