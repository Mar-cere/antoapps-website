import ResearchPageContent from '@/components/pages/ResearchPageContent';
import ResearchJsonLd from '@/components/seo/ResearchJsonLd';
import { researchPageMetadata } from '@/lib/i18n/copy/pages/research';

export const metadata = researchPageMetadata('en');

export default function ResearchPageEn() {
  return (
    <>
      <ResearchJsonLd locale="en" />
      <ResearchPageContent locale="en" />
    </>
  );
}
