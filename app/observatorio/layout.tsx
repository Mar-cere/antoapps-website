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
        THESIS: Un observatorio de misión en el mismo campo que /nexus: un nudo decide, el resto orbita, sin hero comercial ni estética cyberpunk.
        OWN-WORLD: Fondo #020711, radiales teal y azul profundo, puntos como en la constelación, hairlines, Engine adelantado, Experience y Sombra a la deriva.
        STORY: El operador lee cómo se decidió el turno en el mismo mundo visual de Nexus, sabiendo qué es simulado.
        FIRST VIEWPORT: Campo profundo, nudo adelantado, lista de turnos o estado, facts y recorrido en órbita.
        FORM: user-pinned Operate observatory
        FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
      */}
      <ObservatoryProvider>
        <AppShell>{children}</AppShell>
      </ObservatoryProvider>
    </div>
  );
}
