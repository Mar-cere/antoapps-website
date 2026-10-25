import ResearchPageContent from '@/components/pages/ResearchPageContent';
import ResearchJsonLd from '@/components/seo/ResearchJsonLd';
import { researchPageMetadata } from '@/lib/i18n/copy/pages/research';

export const metadata = researchPageMetadata('pt');

export default function ResearchPagePt() {
  return (
    <>
      <ResearchJsonLd locale="pt" />
      <ResearchPageContent locale="pt" />
    </>
  );
}
