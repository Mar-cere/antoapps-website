import { headers } from 'next/headers';
import { detectLandingDevice, type LandingDevice } from '@/lib/device/landing-device';

/** Dispositivo inferido desde User-Agent en el servidor (fallback: ios para ads/conversión). */
export function getServerLandingDevice(): LandingDevice {
  const userAgent = headers().get('user-agent') ?? '';
  const detected = detectLandingDevice(userAgent);
  return detected === 'unknown' ? 'ios' : detected;
}
