import { headers } from 'next/headers';
import { detectLandingDevice, type LandingDevice } from '@/lib/device/landing-device';

/** Dispositivo inferido desde User-Agent en el servidor (fallback: ios para ads/conversión). */
export async function getServerLandingDevice(): Promise<LandingDevice> {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') ?? '';
  const detected = detectLandingDevice(userAgent);
  return detected === 'unknown' ? 'ios' : detected;
}
