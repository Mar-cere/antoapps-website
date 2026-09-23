import ChangelogPageContent from '@/components/pages/ChangelogPageContent';
import EditorialWebPageJsonLd from '@/components/seo/EditorialWebPageJsonLd';
import { changelogPageMetadata } from '@/lib/i18n/copy/pages/changelog';

export const metadata = changelogPageMetadata('en');

export default function ChangelogPageEn() {
  return (
    <>
      <EditorialWebPageJsonLd locale="en" path="/changelog" />
      <ChangelogPageContent locale="en" />
    </>
  );
}
