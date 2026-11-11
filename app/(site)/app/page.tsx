import AppPageContent from '@/components/pages/AppPageContent';
import EditorialWebPageJsonLd from '@/components/seo/EditorialWebPageJsonLd';
import { appPageMetadata } from '@/lib/i18n/copy/app';

export const metadata = appPageMetadata('es');

export default function AppPage() {
  return (
    <>
      <EditorialWebPageJsonLd locale="es" path="/app" />
      <AppPageContent locale="es" />
    </>
  );
}
