import type { Metadata } from 'next';
import BienvenidaLanding, { bienvenidaMetadata } from '@/components/bienvenida/BienvenidaLanding';

export const metadata: Metadata = bienvenidaMetadata('en');

type BienvenidaLandingPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

function parseVariant(value: string | string[] | undefined): 'A' | 'B' {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw?.toLowerCase() === 'b' ? 'B' : 'A';
}

export default function BienvenidaLandingPageEn({ searchParams }: BienvenidaLandingPageProps) {
  return (
    <BienvenidaLanding locale="en" landingVariant={parseVariant(searchParams?.ab)} />
  );
}
