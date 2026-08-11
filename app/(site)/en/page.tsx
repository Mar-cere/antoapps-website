import HomeV2PageContent from '@/components/pages/HomeV2PageContent';
import { getServerLandingDevice } from '@/lib/device/landing-device-server';
import { homePageMetadata } from '@/lib/i18n/copy/pages/home-metadata';

export const metadata = homePageMetadata('en');

export default function HomeEn() {
  return <HomeV2PageContent locale="en" initialDevice={getServerLandingDevice()} />;
}
