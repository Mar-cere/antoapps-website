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
  return psychoeducationGuideMetadata('es', params.slug);
}

export default function PsychoeducationGuidePageEs({ params }: PageProps) {
  if (!isPsychoeducationSlug(params.slug)) {
    notFound();
  }

  const guide = getPsychoeducationGuide('es', params.slug);
  if (!guide) {
    notFound();
  }

  return (
    <PsychoeducationGuidePageContent locale="es" slug={params.slug} guide={guide} />
  );
}
