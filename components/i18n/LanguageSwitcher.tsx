import type { Locale } from '@/lib/i18n/config';
import { localePath } from '@/lib/i18n/config';
import Link from 'next/link';

type LanguageSwitcherProps = {
  locale: Locale;
  /** Ruta sin prefijo de idioma, p. ej. `/bienvenida` o `/` */
  path: string;
  className?: string;
};

export default function LanguageSwitcher({ locale, path, className = '' }: LanguageSwitcherProps) {
  const esHref = localePath('es', path);
  const enHref = localePath('en', path);

  return (
    <nav
      className={`lad-lang-switch ${className}`.trim()}
      aria-label={locale === 'en' ? 'Language' : 'Idioma'}
    >
      <Link
        href={esHref}
        lang="es"
        aria-current={locale === 'es' ? 'page' : undefined}
        className={locale === 'es' ? 'is-active' : undefined}
      >
        ES
      </Link>
      <span aria-hidden="true">·</span>
      <Link
        href={enHref}
        lang="en"
        aria-current={locale === 'en' ? 'page' : undefined}
        className={locale === 'en' ? 'is-active' : undefined}
      >
        EN
      </Link>
    </nav>
  );
}
