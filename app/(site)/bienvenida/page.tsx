import type { Metadata } from 'next';
import BienvenidaLanding, { bienvenidaMetadata } from '@/components/bienvenida/BienvenidaLanding';
import EditorialWebPageJsonLd from '@/components/seo/EditorialWebPageJsonLd';
import { getServerLandingDevice } from '@/lib/device/landing-device-server';
import { parseBienvenidaVariant } from '@/lib/bienvenida/parse-variant';

export const metadata: Metadata = bienvenidaMetadata('es');

type BienvenidaLandingPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function BienvenidaLandingPage({ searchParams }: BienvenidaLandingPageProps) {
  const params = await searchParams;
  const initialDevice = await getServerLandingDevice();
  return (
    <>
      <EditorialWebPageJsonLd locale="es" path="/bienvenida" />
      <BienvenidaLanding
        locale="es"
        landingVariant={parseBienvenidaVariant(params?.ab)}
        initialDevice={initialDevice}
      />
    </>
  );
}
