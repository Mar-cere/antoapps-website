import ChangelogPageContent from '@/components/pages/ChangelogPageContent';
import { changelogPageMetadata } from '@/lib/i18n/copy/pages/changelog';

export const metadata = changelogPageMetadata('en');

export default function ChangelogPageEn() {
  return <ChangelogPageContent locale="en" />;
}
