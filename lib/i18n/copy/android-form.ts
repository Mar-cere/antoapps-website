import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';

export type AndroidFormCopy = {
  title: string;
  subtitle: string;
  buttonLabel: string;
  compactPlaceholder: string;
  fullPlaceholder: string;
  inputAria: string;
  submitting: string;
  invalidEmail: string;
  success: string;
  error: string;
  compactFootnote: string;
  fullFootnoteBefore: string;
  privacyLink: string;
  successHint: string;
  privacyHref: string;
};

const copy: Record<Locale, AndroidFormCopy> = {
  es: {
    title: 'Acceso anticipado Android',
    subtitle: 'Únete a la lista prioritaria y recibe invitación antes del lanzamiento público.',
    buttonLabel: 'Quiero acceso anticipado',
    compactPlaceholder: 'Tu email para acceso anticipado Android',
    fullPlaceholder: 'tuemail@ejemplo.com',
    inputAria: 'Correo para acceso anticipado Android',
    submitting: 'Enviando...',
    invalidEmail: 'Ingresa un correo válido con formato nombre@dominio.com.',
    success: 'Listo. Te avisaremos por correo cuando se abra tu acceso anticipado.',
    error: 'No pudimos registrar tu correo ahora. Intenta nuevamente en unos minutos.',
    compactFootnote: 'Usa el mismo correo de tu cuenta de Google Play para recibir el acceso.',
    fullFootnoteBefore: 'Cupos limitados. Te contactaremos por correo. Al enviar aceptas nuestra',
    privacyLink: 'Política de Privacidad',
    successHint: 'Revisa tu bandeja y carpeta de spam para encontrar la invitación.',
    privacyHref: '/privacidad',
  },
  en: {
    title: 'Android early access',
    subtitle: 'Join the priority list and get an invite before public launch.',
    buttonLabel: 'I want early access',
    compactPlaceholder: 'Your email for Android early access',
    fullPlaceholder: 'you@example.com',
    inputAria: 'Email for Android early access',
    submitting: 'Sending...',
    invalidEmail: 'Enter a valid email address (name@domain.com).',
    success: 'Done. We will email you when your early access opens.',
    error: 'We could not register your email right now. Please try again in a few minutes.',
    compactFootnote: 'Use the same email as your Google Play account to receive access.',
    fullFootnoteBefore: 'Limited spots. We will contact you by email. By submitting you accept our',
    privacyLink: 'Privacy Policy',
    successHint: 'Check your inbox and spam folder for the invitation.',
    privacyHref: '/en/privacidad',
  },
};

export function getAndroidFormCopy(locale: Locale): AndroidFormCopy {
  const c = copy[locale];
  return {
    ...c,
    privacyHref: localePath(locale, '/privacidad'),
  };
}
