import type { Metadata } from 'next';
import { Suspense } from 'react';
import ObservatoryLoginForm from '@/components/observatory/login/ObservatoryLoginForm';
import '@/styles/pages/observatory-ingreso.css';

export const metadata: Metadata = {
  title: 'Ingreso desarrolladores · Anto',
  description: 'Acceso privado al observatorio de Nexus. No indexar.',
  robots: { index: false, follow: false },
};

export default function NexusIngresoPage() {
  return (
    <main className="obs-login">
      <div className="obs-login__panel">
        <h1>Ingreso desarrolladores</h1>
        <p>Acceso de operador al observatorio de Nexus. No es una cuenta de producto.</p>
        <Suspense fallback={<p className="obs-login__fallback">Cargando…</p>}>
          <ObservatoryLoginForm />
        </Suspense>
      </div>
    </main>
  );
}
