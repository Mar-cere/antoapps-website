import HomeV2PageContent from '@/components/pages/HomeV2PageContent';
import { homePageMetadata } from '@/lib/i18n/copy/pages/home-metadata';

export const metadata = homePageMetadata('en');

export default function HomeEn() {
  return <HomeV2PageContent locale="en" />;
}
