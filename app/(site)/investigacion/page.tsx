import ResearchPageContent from '@/components/pages/ResearchPageContent';
import ResearchJsonLd from '@/components/seo/ResearchJsonLd';
import { researchPageMetadata } from '@/lib/i18n/copy/pages/research';

export const metadata = researchPageMetadata('es');

export default function InvestigacionPage() {
  return (
    <>
      <ResearchJsonLd locale="es" />
      <ResearchPageContent locale="es" />
    </>
  );
}
