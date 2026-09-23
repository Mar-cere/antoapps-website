import ChangelogPageContent from '@/components/pages/ChangelogPageContent';
import EditorialWebPageJsonLd from '@/components/seo/EditorialWebPageJsonLd';
import { changelogPageMetadata } from '@/lib/i18n/copy/pages/changelog';

export const metadata = changelogPageMetadata('es');

export default function ChangelogPage() {
  return (
    <>
      <EditorialWebPageJsonLd locale="es" path="/changelog" />
      <ChangelogPageContent locale="es" />
    </>
  );
}
