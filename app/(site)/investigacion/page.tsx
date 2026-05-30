import ResearchPageContent from '@/components/pages/ResearchPageContent';
import { researchPageMetadata } from '@/lib/i18n/copy/pages/research';

export const metadata = researchPageMetadata('es');

export default function InvestigacionPage() {
  return <ResearchPageContent locale="es" />;
}
