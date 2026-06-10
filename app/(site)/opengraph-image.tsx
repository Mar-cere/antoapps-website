import {
  homeOgImageAlt,
  homeOgImageContentType,
  homeOgImageSize,
  renderHomeOpenGraphImage,
} from '@/lib/home/opengraph-image';

export const runtime = 'edge';
export const alt = homeOgImageAlt('es');
export const size = homeOgImageSize;
export const contentType = homeOgImageContentType;

export default function HomeOpenGraphImage() {
  return renderHomeOpenGraphImage('es');
}
