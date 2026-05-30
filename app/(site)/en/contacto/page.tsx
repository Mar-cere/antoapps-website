import ContactPageContent from '@/components/pages/ContactPageContent';
import { contactPageMetadata } from '@/lib/i18n/copy/contact';

export const metadata = contactPageMetadata('en');

export default function ContactoPageEn() {
  return <ContactPageContent locale="en" />;
}
