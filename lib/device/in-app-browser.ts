export type InAppBrowserPlatform = 'ios' | 'android' | null;

const IN_APP_UA =
  /Instagram|FBAN|FBAV|FBIOS|FB_IAB|TikTok|Musical_ly|Twitter|Line\/|Snapchat|LinkedInApp/i;

export function detectInAppBrowser(userAgent?: string): InAppBrowserPlatform {
  const ua = userAgent ?? (typeof navigator !== 'undefined' ? navigator.userAgent : '');
  if (!ua || !IN_APP_UA.test(ua)) return null;
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  return null;
}
