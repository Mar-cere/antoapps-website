import HomePageContent from '@/components/pages/HomePageContent';
import { homePageMetadata } from '@/lib/i18n/copy/pages/home-metadata';

export const metadata = homePageMetadata('en');

export default function HomeEn() {
  return <HomePageContent locale="en" />;
}
