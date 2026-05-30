import SecurityPageContent from '@/components/pages/SecurityPageContent';
import { securityPageMetadata } from '@/lib/i18n/copy/pages/security';

export const metadata = securityPageMetadata('en');

export default function SecurityPageEn() {
  return <SecurityPageContent locale="en" />;
}
