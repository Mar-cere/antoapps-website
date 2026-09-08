'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useObservatory } from '@/components/observatory/shell/ObservatoryProvider';
import { StatusMark } from '@/components/observatory/ui/StatusMark';
import { OBSERVATORY_NAV } from '@/lib/observatory/routes';

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
        <path d="M4 13.5l4-9 6 9" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
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
    </div>
  );
}
