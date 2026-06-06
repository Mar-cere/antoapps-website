import { prefersReducedMotion } from '@/lib/device/motion';

export const LAD_OPEN_ANDROID_FORM_EVENT = 'lad-open-android-form';

const SCROLL_SETTLE_MS = 350;

export function dispatchOpenAndroidForm(): void {
  if (typeof window === 'undefined') return;

  const open = () => {
    window.dispatchEvent(new CustomEvent(LAD_OPEN_ANDROID_FORM_EVENT));
  };

  if (prefersReducedMotion()) {
    open();
    return;
  }

  window.setTimeout(open, SCROLL_SETTLE_MS);
}

export function scrollToHeroCta(): void {
  if (typeof window === 'undefined') return;
  const heroCta = document.getElementById('descargar');
  heroCta?.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'center',
  });
}
