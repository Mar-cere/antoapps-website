import { headers } from 'next/headers';
import NotFoundContent from '@/components/pages/NotFoundContent';
import { isLegalLocale } from '@/lib/i18n/config';

export const dynamic = 'force-dynamic';

export default async function NotFound() {
  const headersList = await headers();
  const headerLocale = headersList.get('x-locale') || 'es';
  const locale = isLegalLocale(headerLocale) ? headerLocale : 'es';

  return <NotFoundContent locale={locale} />;
}
