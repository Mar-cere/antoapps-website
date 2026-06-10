'use client';

import { useEffect, useState } from 'react';
import { detectLandingDevice, type LandingDevice } from '@/lib/device/landing-device';

export type { LandingDevice };

export function useLandingDevice(initialDevice: LandingDevice = 'ios'): LandingDevice {
  const [device, setDevice] = useState<LandingDevice>(initialDevice);

  useEffect(() => {
    const detected = detectLandingDevice();
    if (detected !== 'unknown') {
      setDevice(detected);
    }
  }, []);

  return device;
}
