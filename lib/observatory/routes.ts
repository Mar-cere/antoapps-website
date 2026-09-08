export const OBSERVATORY_HOME = '/observatorio';
export const OBSERVATORY_LOGIN = '/nexus/ingreso';
export const OBSERVATORY_COOKIE = 'obs_session';

export const OBSERVATORY_NAV = [
  { href: '/observatorio', label: 'Resumen' },
  { href: '/observatorio/en-vivo', label: 'En vivo' },
  { href: '/observatorio/decisiones', label: 'Decisiones' },
  { href: '/observatorio/cortex', label: 'Cortex' },
  { href: '/observatorio/roadmap', label: 'Roadmap' },
] as const;

export function isObservatoryPath(pathname: string): boolean {
  return pathname === OBSERVATORY_HOME || pathname.startsWith(`${OBSERVATORY_HOME}/`);
}

export function safeObservatoryNext(value: string | null | undefined): string {
  if (value && isObservatoryPath(value)) return value;
  return OBSERVATORY_HOME;
}
