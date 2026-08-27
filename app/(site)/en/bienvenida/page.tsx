import type { Metadata } from 'next';
import BienvenidaLanding, { bienvenidaMetadata } from '@/components/bienvenida/BienvenidaLanding';
import { getServerLandingDevice } from '@/lib/device/landing-device-server';
import { parseBienvenidaVariant } from '@/lib/bienvenida/parse-variant';

export const metadata: Metadata = bienvenidaMetadata('en');

type BienvenidaLandingPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function BienvenidaLandingPageEn({ searchParams }: BienvenidaLandingPageProps) {
  const params = await searchParams;
  const initialDevice = await getServerLandingDevice();
  return (
    <BienvenidaLanding
      locale="en"
      landingVariant={parseBienvenidaVariant(params?.ab)}
      initialDevice={initialDevice}
    />
  );
}
