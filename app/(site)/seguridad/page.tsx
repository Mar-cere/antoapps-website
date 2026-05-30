import SecurityPageContent from '@/components/pages/SecurityPageContent';
import { securityPageMetadata } from '@/lib/i18n/copy/pages/security';

export const metadata = securityPageMetadata('es');

export default function SeguridadPage() {
  return <SecurityPageContent locale="es" />;
}
