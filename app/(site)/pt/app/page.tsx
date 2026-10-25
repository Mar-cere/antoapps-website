import AppPageContent from '@/components/pages/AppPageContent';
import EditorialWebPageJsonLd from '@/components/seo/EditorialWebPageJsonLd';
import { appPageMetadata } from '@/lib/i18n/copy/app';
import { APP_VERSION_LABEL } from '@/lib/app-version';

export const metadata = appPageMetadata('pt', APP_VERSION_LABEL);

export default function AppPagePt() {
  return (
    <>
      <EditorialWebPageJsonLd locale="pt" path="/app" />
      <AppPageContent locale="pt" />
    </>
  );
}
