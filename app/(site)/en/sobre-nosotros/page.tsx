import AboutPageContent from '@/components/pages/AboutPageContent';
import EditorialWebPageJsonLd from '@/components/seo/EditorialWebPageJsonLd';
import { aboutPageMetadata } from '@/lib/i18n/copy/pages/about-metadata';

export const metadata = aboutPageMetadata('en');

export default function AboutPageEn() {
  return (
    <>
      <EditorialWebPageJsonLd locale="en" path="/sobre-nosotros" />
      <AboutPageContent locale="en" />
    </>
  );
}
