import ContactPageContent from '@/components/pages/ContactPageContent';
import EditorialWebPageJsonLd from '@/components/seo/EditorialWebPageJsonLd';
import { contactPageMetadata } from '@/lib/i18n/copy/contact';

export const metadata = contactPageMetadata('pt');

export default function ContactoPagePt() {
  return (
    <>
      <EditorialWebPageJsonLd locale="pt" path="/contacto" />
      <ContactPageContent locale="pt" />
    </>
  );
}
