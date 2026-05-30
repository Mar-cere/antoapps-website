import ChangelogPageContent from '@/components/pages/ChangelogPageContent';
import { changelogPageMetadata } from '@/lib/i18n/copy/pages/changelog';

export const metadata = changelogPageMetadata('es');

export default function ChangelogPage() {
  return <ChangelogPageContent locale="es" />;
}
