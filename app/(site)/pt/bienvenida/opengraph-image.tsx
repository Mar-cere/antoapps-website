import {
  bienvenidaOgImageAlt,
  bienvenidaOpenGraphImage,
  BIENVENIDA_OG_CONTENT_TYPE,
  BIENVENIDA_OG_SIZE,
} from '@/lib/bienvenida/opengraph-image';

export const runtime = 'edge';
export const alt = bienvenidaOgImageAlt('pt');
export const size = BIENVENIDA_OG_SIZE;
export const contentType = BIENVENIDA_OG_CONTENT_TYPE;

export default function BienvenidaOpenGraphImagePt() {
  return bienvenidaOpenGraphImage('pt');
}
