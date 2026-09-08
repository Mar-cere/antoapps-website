import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { ObservatoryProvider } from '@/components/shell/ObservatoryProvider';
import { AppShell } from '@/components/shell/AppShell';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nexus Observatory',
  description: 'Observatorio privado de Anto Nexus. Solo lectura. No indexar.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        {/*
          THESIS: Un observatorio de misión calmado para ver Nexus decidir y a Cortex aprender, sin hero comercial ni estética cyberpunk.
          OWN-WORLD: Azul profundo Anto, teal y colores de componente como puntos, densidad de operación, hairlines, banner de simulación permanente.
          STORY: El operador ve estado, turno, componentes, alertas y el sprint real del programa, sabiendo qué es simulado.
          FIRST VIEWPORT: Banda de cuatro respuestas, sesión activa, sprint, mapa de componentes, alertas y métricas con definición.
          FORM: user-pinned Operate observatory
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
        */}
        <ObservatoryProvider>
          <AppShell>{children}</AppShell>
        </ObservatoryProvider>
      </body>
    </html>
  );
}
