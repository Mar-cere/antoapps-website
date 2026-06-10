import type { Metadata } from 'next';
import BienvenidaLanding, { bienvenidaMetadata } from '@/components/bienvenida/BienvenidaLanding';
import { getServerLandingDevice } from '@/lib/device/landing-device-server';
import { parseBienvenidaVariant } from '@/lib/bienvenida/parse-variant';

export const metadata: Metadata = bienvenidaMetadata('es');

type BienvenidaLandingPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function BienvenidaLandingPage({ searchParams }: BienvenidaLandingPageProps) {
  return (
    <BienvenidaLanding
      locale="es"
      landingVariant={parseBienvenidaVariant(searchParams?.ab)}
      initialDevice={getServerLandingDevice()}
    />
  );
}
