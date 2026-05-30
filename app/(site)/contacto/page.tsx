import ContactPageContent from '@/components/pages/ContactPageContent';
import { contactPageMetadata } from '@/lib/i18n/copy/contact';

export const metadata = contactPageMetadata('es');

export default function ContactoPage() {
  return <ContactPageContent locale="es" />;
}
