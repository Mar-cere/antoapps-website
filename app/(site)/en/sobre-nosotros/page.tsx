import AboutPageContent from '@/components/pages/AboutPageContent';
import { aboutPageMetadata } from '@/lib/i18n/copy/pages/about';

export const metadata = aboutPageMetadata('en');

export default function AboutPageEn() {
  return <AboutPageContent locale="en" />;
}
