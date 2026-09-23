import AboutPageContent from '@/components/pages/AboutPageContent';
import EditorialWebPageJsonLd from '@/components/seo/EditorialWebPageJsonLd';
import { aboutPageMetadata } from '@/lib/i18n/copy/pages/about-metadata';

export const metadata = aboutPageMetadata('es');

export default function SobreNosotrosPage() {
  return (
    <>
      <EditorialWebPageJsonLd locale="es" path="/sobre-nosotros" />
      <AboutPageContent locale="es" />
    </>
  );
}
