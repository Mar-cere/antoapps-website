import type { Metadata } from 'next';
import BienvenidaLanding, { bienvenidaMetadata } from '@/components/bienvenida/BienvenidaLanding';
import { getServerLandingDevice } from '@/lib/device/landing-device-server';
import { parseBienvenidaVariant } from '@/lib/bienvenida/parse-variant';

export const metadata: Metadata = bienvenidaMetadata('en');

type BienvenidaLandingPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function BienvenidaLandingPageEn({ searchParams }: BienvenidaLandingPageProps) {
  return (
    <BienvenidaLanding
      locale="en"
      landingVariant={parseBienvenidaVariant(searchParams?.ab)}
      initialDevice={getServerLandingDevice()}
    />
  );
}
