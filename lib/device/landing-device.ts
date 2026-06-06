export type LandingDevice = 'ios' | 'android' | 'desktop' | 'unknown';

function isIosUserAgent(ua: string): boolean {
  if (/iPhone|iPad|iPod/i.test(ua)) return true;

  if (typeof navigator !== 'undefined') {
    const platform = navigator.platform ?? '';
    const maxTouchPoints = navigator.maxTouchPoints ?? 0;
    if (platform === 'MacIntel' && maxTouchPoints > 1) return true;
  }

  return false;
}

export function detectLandingDevice(userAgent?: string): LandingDevice {
  const ua = userAgent ?? (typeof navigator !== 'undefined' ? navigator.userAgent : '');
  if (!ua) return 'unknown';
  if (isIosUserAgent(ua)) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  return 'desktop';
}
