import { prefersReducedMotion } from '@/lib/device/motion';

/** Scroll al bloque de CTAs del hero en landings de bienvenida. */
export function scrollToHeroCta(): void {
  if (typeof window === 'undefined') return;
  const heroCta = document.getElementById('descargar');
  heroCta?.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'center',
  });
}
