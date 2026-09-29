import HomeV2PageContent from '@/components/pages/HomeV2PageContent';
import { getHomeProductScreens } from '@/lib/assets/product-screens.server';
import { getServerLandingDevice } from '@/lib/device/landing-device-server';
import { homePageMetadata } from '@/lib/i18n/copy/pages/home-metadata';

export const metadata = homePageMetadata('en');

export default async function HomeEn() {
  const initialDevice = await getServerLandingDevice();
  const screens = getHomeProductScreens('en');
  return <HomeV2PageContent locale="en" initialDevice={initialDevice} screens={screens} />;
}
