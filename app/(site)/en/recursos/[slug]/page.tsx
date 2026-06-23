import { notFound } from 'next/navigation';
import PsychoeducationGuidePageContent from '@/components/pages/PsychoeducationGuidePageContent';
import {
  getPsychoeducationGuide,
  isPsychoeducationSlug,
  PSYCHOEDUCATION_SLUGS,
  type PsychoeducationSlug,
} from '@/lib/i18n/copy/pages/psychoeducation';
import { psychoeducationGuideMetadata } from '@/lib/i18n/copy/pages/psychoeducation/metadata';

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams(): { slug: PsychoeducationSlug }[] {
  return PSYCHOEDUCATION_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps) {
  if (!isPsychoeducationSlug(params.slug)) {
    return {};
  }
  return psychoeducationGuideMetadata('en', params.slug);
}

export default function PsychoeducationGuidePageEn({ params }: PageProps) {
  if (!isPsychoeducationSlug(params.slug)) {
    notFound();
  }

  const guide = getPsychoeducationGuide('en', params.slug);
  if (!guide) {
    notFound();
  }

  return (
    <PsychoeducationGuidePageContent locale="en" slug={params.slug} guide={guide} />
  );
}
