import {
  homeOgImageAlt,
  homeOgImageContentType,
  homeOgImageSize,
  renderHomeOpenGraphImage,
} from '@/lib/home/opengraph-image';

export const runtime = 'edge';
export const alt = homeOgImageAlt('pt');
export const size = homeOgImageSize;
export const contentType = homeOgImageContentType;

export default function HomePtOpenGraphImage() {
  return renderHomeOpenGraphImage('pt');
}
