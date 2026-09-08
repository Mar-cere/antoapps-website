'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Pulse,
  SquaresFour,
  Path,
  Graph,
  MapTrifold,
} from '@phosphor-icons/react';
import { useObservatory } from '@/components/shell/ObservatoryProvider';
import { StatusMark } from '@/components/ui/StatusMark';

const ITEMS = [
  { href: '/', label: 'Resumen', icon: SquaresFour },
  { href: '/en-vivo', label: 'En vivo', icon: Pulse },
  { href: '/decisiones', label: 'Decisiones', icon: Path },
  { href: '/cortex', label: 'Cortex', icon: Graph },
  { href: '/roadmap', label: 'Roadmap', icon: MapTrifold },
] as const;

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { snapshot } = useObservatory();
  const updated = snapshot.last_updated.slice(11, 19);

  return (
    <div className="shell">
      <div className="sim-banner" role="status">
        <strong>Modo simulación</strong>
        <span>Datos ficticios y redactados. No es tráfico de producción ni una segunda fuente de verdad.</span>
      </div>
      <header className="header">
        <div className="header-brand">
          <h1>Nexus Observatory</h1>
          <p>Solo lectura · observatorio privado</p>
        </div>
        <div className="header-meta">
          <StatusMark status={snapshot.system_lifecycle} />
          <span>Actualizado {updated} UTC</span>
        </div>
      </header>
      <nav className="nav" aria-label="Vistas">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathname, item.href);
          return (
            <Link key={item.href} href={item.href} className={active ? 'active' : undefined} aria-current={active ? 'page' : undefined}>
              <Icon size={18} weight={active ? 'fill' : 'regular'} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <main className="main">{children}</main>
      <nav className="mobile-nav" aria-label="Vistas móviles">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathname, item.href);
          return (
            <Link key={item.href} href={item.href} className={active ? 'active' : undefined}>
              <Icon size={16} />
              <div>{item.label}</div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
