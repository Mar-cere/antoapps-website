import HomeV2PageContent from '@/components/pages/HomeV2PageContent';
import { getServerLandingDevice } from '@/lib/device/landing-device-server';
import { homePageMetadata } from '@/lib/i18n/copy/pages/home-metadata';

export const metadata = homePageMetadata('pt');

export default async function HomePt() {
  const initialDevice = await getServerLandingDevice();
  return <HomeV2PageContent locale="pt" initialDevice={initialDevice} />;
}
