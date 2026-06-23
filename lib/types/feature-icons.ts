export type FeatureIconId =
  | 'ai'
  | 'scales'
  | 'protocols'
  | 'brain'
  | 'crisis'
  | 'tasks'
  | 'language'
  | 'clock'
  | 'techniques'
  | 'insights'
  | 'dashboard';

/** Lista canónica para validación de iconos en copy y componentes. */
export const FEATURE_ICON_IDS = [
  'ai',
  'scales',
  'protocols',
  'brain',
  'crisis',
  'tasks',
  'language',
  'clock',
  'techniques',
  'insights',
  'dashboard',
] as const satisfies readonly FeatureIconId[];

export type SecurityIconId = 'encryption' | 'compliance' | 'auth';

export const SECURITY_ICON_IDS = ['encryption', 'compliance', 'auth'] as const satisfies readonly SecurityIconId[];
