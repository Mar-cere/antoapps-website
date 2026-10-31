import { Suspense } from 'react';
import type { Locale } from '@/lib/i18n/config';
import { htmlLanguage } from '@/lib/i18n/config';
import ObservatoryLoginForm from '@/components/observatory/login/ObservatoryLoginForm';
import '@/styles/pages/observatory-ingreso.css';

const ingresoCopy = {
  es: {
    title: 'Ingreso desarrolladores',
    lead: 'Acceso de operador al observatorio de Nexus. No es una cuenta de producto.',
    loading: 'Cargando…',
  },
  en: {
    title: 'Developer sign-in',
    lead: 'Operator access to the Nexus observatory. This is not a product account.',
    loading: 'Loading…',
  },
  pt: {
    title: 'Acesso de desenvolvedores',
    lead: 'Acesso de operador ao observatório do Nexus. Não é uma conta do produto.',
    loading: 'Carregando…',
  },
} as const;

type NexusIngresoScreenProps = {
  locale: Locale;
};

export default function NexusIngresoScreen({ locale }: NexusIngresoScreenProps) {
  const copy = ingresoCopy[locale];

  return (
    <main className="obs-login" lang={htmlLanguage(locale)}>
      <div className="obs-login__panel">
        <h1>{copy.title}</h1>
        <p>{copy.lead}</p>
        <Suspense fallback={<p className="obs-login__fallback">{copy.loading}</p>}>
          <ObservatoryLoginForm locale={locale} />
        </Suspense>
      </div>
    </main>
  );
}
