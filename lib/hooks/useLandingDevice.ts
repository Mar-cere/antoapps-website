'use client';

import { useEffect, useState } from 'react';
import { detectLandingDevice, type LandingDevice } from '@/lib/device/landing-device';

export type { LandingDevice };

export function useLandingDevice(): LandingDevice {
  const [device, setDevice] = useState<LandingDevice>('unknown');

  useEffect(() => {
    setDevice(detectLandingDevice());
  }, []);

  return device;
}
