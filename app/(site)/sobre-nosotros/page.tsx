import AboutPageContent from '@/components/pages/AboutPageContent';
import { aboutPageMetadata } from '@/lib/i18n/copy/pages/about';

export const metadata = aboutPageMetadata('es');

export default function SobreNosotrosPage() {
  return <AboutPageContent locale="es" />;
}
