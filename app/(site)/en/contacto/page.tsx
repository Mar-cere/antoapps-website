import ContactPageContent from '@/components/pages/ContactPageContent';
import EditorialWebPageJsonLd from '@/components/seo/EditorialWebPageJsonLd';
import { contactPageMetadata } from '@/lib/i18n/copy/contact';

export const metadata = contactPageMetadata('en');

export default function ContactoPageEn() {
  return (
    <>
      <EditorialWebPageJsonLd locale="en" path="/contacto" />
      <ContactPageContent locale="en" />
    </>
  );
}
