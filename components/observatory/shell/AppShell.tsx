'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useObservatory } from '@/components/observatory/shell/ObservatoryProvider';
import { StatusMark } from '@/components/observatory/ui/StatusMark';
import { OBSERVATORY_NAV } from '@/lib/observatory/routes';
import type { ObservatoryConnection } from '@/lib/observatory/data/types';

function isActive(pathname: string, href: string) {
  if (href === '/observatorio') return pathname === '/observatorio';
  return pathname.startsWith(href);
}

function NavGlyph({ name, filled }: { name: (typeof OBSERVATORY_NAV)[number]['label']; filled: boolean }) {
  const stroke = filled ? 1.8 : 1.4;
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      {name === 'Resumen' ? (
        <>
          <rect x="2.5" y="2.5" width="5.5" height="5.5" rx="1" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={stroke} />
          <rect x="10" y="2.5" width="5.5" height="5.5" rx="1" fill="none" stroke="currentColor" strokeWidth={stroke} />
          <rect x="2.5" y="10" width="5.5" height="5.5" rx="1" fill="none" stroke="currentColor" strokeWidth={stroke} />
          <rect x="10" y="10" width="5.5" height="5.5" rx="1" fill="none" stroke="currentColor" strokeWidth={stroke} />
        </>
      ) : null}
      {name === 'En vivo' ? (
        <circle cx="9" cy="9" r="5.5" fill="none" stroke="currentColor" strokeWidth={stroke} />
      ) : null}
      {name === 'Decisiones' ? (
        <>
          <circle cx="9" cy="4.6" r="1.55" fill="currentColor" />
          <circle cx="4.4" cy="12.6" r="1.35" fill="currentColor" />
          <circle cx="13.6" cy="12.2" r="1.35" fill="currentColor" />
          <path d="M9 4.6L4.4 12.6l9.2-.4L9 4.6" fill="none" stroke="currentColor" strokeWidth={stroke} />
        </>
      ) : null}
      {name === 'Cortex' ? (
        <>
          <circle cx="5" cy="9" r="1.4" fill="currentColor" />
          <circle cx="9" cy="5.5" r="1.4" fill="currentColor" />
          <circle cx="13" cy="9" r="1.4" fill="currentColor" />
          <circle cx="9" cy="12.5" r="1.4" fill="currentColor" />
          <path d="M5 9h8M9 5.5v7" fill="none" stroke="currentColor" strokeWidth={stroke} />
        </>
      ) : null}
      {name === 'Roadmap' ? (
        <path d="M3 13.5h12M5 13.5V6.5l4 2 4-3v8" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinejoin="round" />
      ) : null}
    </svg>
  );
}

function connectionBanner(connection: ObservatoryConnection) {
  if (connection.kind === 'http' && connection.reachable) {
    return {
      kind: 'live',
      title: 'Runtime conectado',
      text: 'Vistas derivadas. El dashboard no consulta Mongo ni el warehouse. Contenido de conversación off.',
    };
  }
  if (connection.configured) {
    const detail = connection.detail.endsWith('.') ? connection.detail : `${connection.detail}.`;
    return {
      kind: 'down',
      title: 'Runtime no alcanzable',
      text: `${detail} Se muestran fixtures hasta que GET /v1/observatory/snapshot responda.`,
    };
  }
  return {
    kind: 'sim',
    title: 'Modo simulación',
    text: 'Sin URL de runtime. Datos ficticios. No es tráfico de producción ni una segunda fuente de verdad.',
  };
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { snapshot, connection, refresh } = useObservatory();
  const updated = snapshot.last_updated.slice(11, 19);
  const banner = connectionBanner(connection);

  return (
    <div className="shell">
      <div className="sim-banner" data-kind={banner.kind} role="status">
        <strong>{banner.title}</strong>
        <span>{banner.text}</span>
      </div>
      <header className="header">
        <div className="header-brand">
          <h1>Nexus Observatory</h1>
          <p>Solo lectura · observatorio privado</p>
        </div>
        <div className="header-meta">
          <StatusMark status={snapshot.system_lifecycle} />
          <span>Actualizado {updated} UTC</span>
          {connection.configured ? (
            <button type="button" className="obs-logout" onClick={refresh}>
              Actualizar
            </button>
          ) : null}
          <form action="/api/observatorio/logout" method="post">
            <button type="submit" className="obs-logout">
              Salir
            </button>
          </form>
        </div>
      </header>
      <nav className="nav" aria-label="Vistas">
        {OBSERVATORY_NAV.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={active ? 'active' : undefined}
              aria-current={active ? 'page' : undefined}
            >
              <NavGlyph name={item.label} filled={active} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <main className="main">{children}</main>
      <nav className="mobile-nav" aria-label="Vistas móviles">
        {OBSERVATORY_NAV.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={active ? 'active' : undefined}
              aria-current={active ? 'page' : undefined}
            >
              <NavGlyph name={item.label} filled={active} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
