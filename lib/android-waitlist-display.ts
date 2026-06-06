/** Mínimo visible en UI si la base aún tiene pocos registros. Sobreescribible con env. */
const DEFAULT_DISPLAY_FLOOR = 847;

export function getAndroidWaitlistDisplayFloor(): number {
  const raw = process.env.NEXT_PUBLIC_ANDROID_WAITLIST_DISPLAY_FLOOR?.trim();
  const parsed = raw ? Number.parseInt(raw, 10) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_DISPLAY_FLOOR;
}

export function resolveWaitlistDisplayCount(actualCount: number): number {
  return Math.max(actualCount, getAndroidWaitlistDisplayFloor());
}
