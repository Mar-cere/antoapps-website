import ResearchPageContent from '@/components/pages/ResearchPageContent';
import { researchPageMetadata } from '@/lib/i18n/copy/pages/research';

export const metadata = researchPageMetadata('en');

export default function ResearchPageEn() {
  return <ResearchPageContent locale="en" />;
}
