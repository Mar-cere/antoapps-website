/** Fotografía editorial para la home publicada. */

export const EDITORIAL_IMAGE_PATHS = {
  evening: '/assets/images/editorial/anto-editorial-hero-evening.webp',
  deskRain: '/assets/images/editorial/anto-editorial-desk-rain.webp',
  morningPause: '/assets/images/editorial/anto-editorial-morning-pause.webp',
  thoughtLoop: '/assets/images/editorial/anto-editorial-thought-loop.webp',
  /** Cierre / peak-end: distinta del hero `evening`. */
  sleeplessNight: '/assets/images/editorial/anto-editorial-sleepless-night.webp',
} as const;

export type EditorialImageKey = keyof typeof EDITORIAL_IMAGE_PATHS;

export function getEditorialImagePath(key: EditorialImageKey): string {
  return EDITORIAL_IMAGE_PATHS[key];
}
