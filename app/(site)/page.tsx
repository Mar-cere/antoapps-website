import HomeV2PageContent from '@/components/pages/HomeV2PageContent';
import { homePageMetadata } from '@/lib/i18n/copy/pages/home-metadata';

export const metadata = homePageMetadata('es');

export default function Home() {
  return <HomeV2PageContent locale="es" />;
}
