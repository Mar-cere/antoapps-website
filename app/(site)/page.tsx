import HomeV2PageContent from '@/components/pages/HomeV2PageContent';
import { getHomeProductScreens } from '@/lib/assets/product-screens.server';
import { getServerLandingDevice } from '@/lib/device/landing-device-server';
import { homePageMetadata } from '@/lib/i18n/copy/pages/home-metadata';

export const metadata = homePageMetadata('es');

export default async function Home() {
  const initialDevice = await getServerLandingDevice();
  const screens = getHomeProductScreens('es');
  return <HomeV2PageContent locale="es" initialDevice={initialDevice} screens={screens} />;
}
