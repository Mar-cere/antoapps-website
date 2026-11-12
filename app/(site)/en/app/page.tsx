import AppPageContent from '@/components/pages/AppPageContent';
import EditorialWebPageJsonLd from '@/components/seo/EditorialWebPageJsonLd';
import { appPageMetadata } from '@/lib/i18n/copy/app';

export const metadata = appPageMetadata('en');

export default function AppPageEn() {
  return (
    <>
      <EditorialWebPageJsonLd locale="en" path="/app" />
      <AppPageContent locale="en" />
    </>
  );
}
