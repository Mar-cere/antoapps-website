import AppPageContent from '@/components/pages/AppPageContent';
import EditorialWebPageJsonLd from '@/components/seo/EditorialWebPageJsonLd';
import { appPageMetadata } from '@/lib/i18n/copy/app';
import { APP_VERSION_LABEL } from '@/lib/app-version';

export const metadata = appPageMetadata('es', APP_VERSION_LABEL);

export default function AppPage() {
  return (
    <>
      <EditorialWebPageJsonLd locale="es" path="/app" />
      <AppPageContent locale="es" />
    </>
  );
}
