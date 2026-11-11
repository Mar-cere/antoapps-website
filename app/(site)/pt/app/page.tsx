import AppPageContent from '@/components/pages/AppPageContent';
import EditorialWebPageJsonLd from '@/components/seo/EditorialWebPageJsonLd';
import { appPageMetadata } from '@/lib/i18n/copy/app';

export const metadata = appPageMetadata('pt');

export default function AppPagePt() {
  return (
    <>
      <EditorialWebPageJsonLd locale="pt" path="/app" />
      <AppPageContent locale="pt" />
    </>
  );
}
