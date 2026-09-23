import ContactPageContent from '@/components/pages/ContactPageContent';
import EditorialWebPageJsonLd from '@/components/seo/EditorialWebPageJsonLd';
import { contactPageMetadata } from '@/lib/i18n/copy/contact';

export const metadata = contactPageMetadata('es');

export default function ContactoPage() {
  return (
    <>
      <EditorialWebPageJsonLd locale="es" path="/contacto" />
      <ContactPageContent locale="es" />
    </>
  );
}
