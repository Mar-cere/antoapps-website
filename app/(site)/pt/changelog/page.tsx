import ChangelogPageContent from '@/components/pages/ChangelogPageContent';
import EditorialWebPageJsonLd from '@/components/seo/EditorialWebPageJsonLd';
import { changelogPageMetadata } from '@/lib/i18n/copy/pages/changelog';

export const metadata = changelogPageMetadata('pt');

export default function ChangelogPagePt() {
  return (
    <>
      <EditorialWebPageJsonLd locale="pt" path="/changelog" />
      <ChangelogPageContent locale="pt" />
    </>
  );
}
