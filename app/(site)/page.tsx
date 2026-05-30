import HomePageContent from '@/components/pages/HomePageContent';
import { homePageMetadata } from '@/lib/i18n/copy/pages/home-metadata';

export const metadata = homePageMetadata('es');

export default function Home() {
  return <HomePageContent locale="es" />;
}
