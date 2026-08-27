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
  params: Promise<{ slug: string }>;
};

export function generateStaticParams(): { slug: PsychoeducationSlug }[] {
  return PSYCHOEDUCATION_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  if (!isPsychoeducationSlug(slug)) {
    return {};
  }
  return psychoeducationGuideMetadata('es', slug);
}

export default async function PsychoeducationGuidePageEs({ params }: PageProps) {
  const { slug } = await params;
  if (!isPsychoeducationSlug(slug)) {
    notFound();
  }

  const guide = getPsychoeducationGuide('es', slug);
  if (!guide) {
    notFound();
  }

  return (
    <PsychoeducationGuidePageContent locale="es" slug={slug} guide={guide} />
  );
}
