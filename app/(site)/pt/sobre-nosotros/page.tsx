import AboutPageContent from '@/components/pages/AboutPageContent';
import EditorialWebPageJsonLd from '@/components/seo/EditorialWebPageJsonLd';
import { aboutPageMetadata } from '@/lib/i18n/copy/pages/about-metadata';

export const metadata = aboutPageMetadata('pt');

export default function AboutPagePt() {
  return (
    <>
      <EditorialWebPageJsonLd locale="pt" path="/sobre-nosotros" />
      <AboutPageContent locale="pt" />
    </>
  );
}
