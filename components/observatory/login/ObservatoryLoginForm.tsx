'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { OBSERVATORY_HOME, safeObservatoryNext } from '@/lib/observatory/routes';

export default function ObservatoryLoginForm() {
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
        body: JSON.stringify({ username, password }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setError(data.error ?? 'No se pudo entrar.');
        return;
      }
      router.replace(next || OBSERVATORY_HOME);
      router.refresh();
    } catch {
      setError('No se pudo entrar. Inténtalo de nuevo.');
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="obs-login__form" onSubmit={onSubmit}>
      <label className="obs-login__field">
        Correo
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
        Contraseña
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
        {pending ? 'Entrando…' : 'Entrar'}
      </button>
      <Link className="obs-login__back" href="/nexus">
        Volver a Nexus
      </Link>
    </form>
  );
}
