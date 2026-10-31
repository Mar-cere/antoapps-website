'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { localePath, type Locale } from '@/lib/i18n/config';
import { OBSERVATORY_HOME, safeObservatoryNext } from '@/lib/observatory/routes';

const formCopy = {
  es: {
    email: 'Correo',
    password: 'Contraseña',
    submit: 'Entrar',
    pending: 'Entrando…',
    back: 'Volver a Nexus',
    error: 'No se pudo entrar.',
    retry: 'No se pudo entrar. Inténtalo de nuevo.',
  },
  en: {
    email: 'Email',
    password: 'Password',
    submit: 'Sign in',
    pending: 'Signing in…',
    back: 'Back to Nexus',
    error: 'Could not sign in.',
    retry: 'Could not sign in. Try again.',
  },
  pt: {
    email: 'E-mail',
    password: 'Senha',
    submit: 'Entrar',
    pending: 'Entrando…',
    back: 'Voltar ao Nexus',
    error: 'Não foi possível entrar.',
    retry: 'Não foi possível entrar. Tente de novo.',
  },
} as const;

type ObservatoryLoginFormProps = {
  locale?: Locale;
};

export default function ObservatoryLoginForm({ locale = 'es' }: ObservatoryLoginFormProps) {
  const copy = formCopy[locale];
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeObservatoryNext(searchParams.get('next'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const response = await fetch('/api/observatorio/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, locale }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setError(data.error ?? copy.error);
        return;
      }
      router.replace(next || OBSERVATORY_HOME);
      router.refresh();
    } catch {
      setError(copy.retry);
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="obs-login__form" onSubmit={onSubmit}>
      <label className="obs-login__field">
        {copy.email}
        <input
          type="email"
          name="username"
          autoComplete="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </label>
      <label className="obs-login__field">
        {copy.password}
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>
      {error ? (
        <p className="obs-login__error" role="alert">
          {error}
        </p>
      ) : null}
      <button className="obs-login__submit" type="submit" disabled={pending}>
        {pending ? copy.pending : copy.submit}
      </button>
      <Link className="obs-login__back" href={localePath(locale, '/nexus')}>
        {copy.back}
      </Link>
    </form>
  );
}
