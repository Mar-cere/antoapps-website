import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { ObservatoryProvider } from '@/components/observatory/shell/ObservatoryProvider';
import { AppShell } from '@/components/observatory/shell/AppShell';
import '@/styles/observatory.css';

export const metadata: Metadata = {
  title: 'Nexus Observatory',
  description: 'Observatorio privado de Anto Nexus. Solo lectura. No indexar.',
  robots: { index: false, follow: false },
};

export default function ObservatoryLayout({ children }: { children: ReactNode }) {
  return (
    <div className="obs-root">
      {/*
        THESIS: Sala de control de gobernanza: qué decidió el turno, de dónde sale el dato, y qué no está en este snapshot.
        OWN-WORLD: Fondo #020711, radiales teal y azul, hairlines, cuatro columnas de decisión, cinta de pipeline.
        STORY: Producto/safety lee Engine, Experience, extras y mute sin Atlas y sin fingir Cortex.
        FIRST VIEWPORT: Reloj honesto, leyenda, decisión de cuatro columnas, cinta en orden de pipeline.
        FORM: user-pinned Operate observatory
        FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
      */}
      <ObservatoryProvider>
        <AppShell>{children}</AppShell>
      </ObservatoryProvider>
    </div>
  );
}
