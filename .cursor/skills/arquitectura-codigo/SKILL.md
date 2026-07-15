---
name: arquitectura-codigo
description: Convenciones de arquitectura del sitio de Anto (Next.js 14 App Router). Define dónde vive cada cosa (app, components, lib, styles), el patrón thin-wrapper de páginas, Server vs Client Components, hooks, copy i18n, estilos CSS globales, invariantes y validación. Actívala al crear o modificar rutas, páginas, componentes, hooks, estilos o al decidir dónde ubicar código nuevo.
paths:
  - "app/**"
  - "components/**"
  - "lib/**"
  - "styles/**"
---

# Arquitectura de código — Anto (Next.js 14 App Router)

Guía para ubicar y estructurar código nuevo siguiendo las convenciones reales del repositorio. Consúltala antes de crear rutas, componentes o lógica, para mantener coherencia con el resto del código.

## Cuándo usar

- Al crear o modificar rutas, páginas o layouts en `app/`.
- Al crear o mover componentes, hooks o utilidades.
- Al decidir dónde ubicar lógica nueva (UI vs dominio) o estilos.
- Al agregar validaciones/invariantes de contenido.

## Mapa de carpetas (dónde vive cada cosa)

| Carpeta | Responsabilidad |
|---------|-----------------|
| `app/` | App Router: rutas, layouts, metadata, API routes, `sitemap.ts`, `robots.ts`, OG images. El sitio indexable vive en el route group `app/(site)/`. |
| `components/` | UI React: páginas compuestas, secciones, layout, forms, SEO, analytics, primitivos `ui/`. |
| `lib/` | Lógica de dominio **sin UI**: i18n/copy, SEO, hooks, pricing, device, server (MongoDB/Gmail), invariantes. |
| `styles/` | CSS **global** por capas (tokens → base → layout → components → pages → theme → utilities). |
| `public/` | Assets estáticos servidos tal cual (`manifest*.json`, `sw.js`, imágenes, SVG). |
| `scripts/` | Validadores pre-merge (`validate-*.ts`) y utilidades de build. `main.js` + `modules/` son legacy del sitio HTML estático, no se usan en Next.js. |

No hay `middleware.ts` ni `next-intl`: el locale se infiere de la URL (ver skill `i18n-bilingue`).

## Patrón de páginas: thin wrapper

`app/**/page.tsx` es un **Server Component mínimo**: exporta `metadata` y delega en un componente de `components/pages/` pasando `locale` explícito. No pongas lógica ni JSX de contenido en `page.tsx`.

```tsx
// app/(site)/contacto/page.tsx
import ContactPageContent from '@/components/pages/ContactPageContent';
import { contactPageMetadata } from '@/lib/i18n/copy/contact';

export const metadata = contactPageMetadata('es');

export default function ContactoPage() {
  return <ContactPageContent locale="es" />;
}
```

El par en inglés (`app/(site)/en/contacto/page.tsx`) es idéntico salvo `('en')` y `locale="en"`. Excepciones al destino `components/pages/`: bienvenida (`components/bienvenida/`), legal (`LegalPageContent` con `copy`), guías (`PsychoeducationGuidePageContent`), 404 (`NotFoundContent`).

## Server vs Client Components

- `app/**/page.tsx` y layouts: **Server Components** (sin `'use client'`).
- `components/pages/*` y `components/sections/*`: **Client Components** (`'use client'`).
- Hooks en `lib/hooks/*` y `lib/i18n/hooks/*`: siempre `'use client'`.
- Server Components puros para contenido estático: p. ej. `components/legal/LegalDocument.tsx`.
- Los `*PageContent` montan `LocaleProvider` + `<ClientInitializer />` (efectos globales de cliente: navegación, animaciones de scroll, FAQ, tooltips, service worker, analytics). `ClientInitializer` no renderiza UI (`return null`).

## Dónde vive la lógica (`lib/`)

- i18n y copy: `lib/i18n/` (core) y `lib/i18n/copy/**` (todo el texto bilingüe).
- SEO / fuentes de verdad de rutas: `lib/seo/` (`indexable-routes.ts`, `metadata-paths.ts`, `build-sitemap.ts`, `sitemap-invariants.ts`).
- Hooks de comportamiento cliente: `lib/hooks/`.
- Dominio específico: `lib/home/`, `lib/bienvenida/`, `lib/psychoeducation/`, `lib/pricing/`, `lib/device/`, `lib/analytics/`, `lib/assets/`.
- Integraciones de servidor (API routes): `lib/server/` (`mongodb.ts`, `gmail.ts`).

Regla: **la lógica de dominio no debe importar componentes**; los componentes consumen `lib/` mediante getters (`getXCopy(locale)`).

## Estilos

- CSS **global**, no CSS Modules (excepto la ruta opaca de validación).
- Entrada global: `styles/main.css` (importado en `app/(site)/layout.tsx`).
- CSS por feature: se importa dentro del TSX que lo usa (`import '@/styles/components/contact.css'`).
- Usa tokens CSS (`--color-*`, `--spacing-*`, `--font-size-*`) de `styles/tokens/`, no valores mágicos.
- Prefijos de clases: `lad-` solo en la landing de ads (`/bienvenida`), `home-` en el home landing (BEM), `btn`/`btn-primary` para botones. Clases `reveal-on-scroll`, `data-fade-section`, `data-stagger-item` activan animaciones vía `useScrollAnimations`.

## Convenciones TypeScript

- Alias de import: usa siempre `@/…` desde código de aplicación (`@/components`, `@/lib`, `@/styles`).
- Copy y metadata bilingüe: `Record<Locale, ...>` con getters públicos (`getXCopy(locale)`, `xPageMetadata(locale)`).
- Constantes inmutables y narrowing: `as const` (rutas, slugs, variantes, OG locale).
- Predomina `export type` para shapes de props y copy; `interface` solo en casos puntuales.
- `Locale` (`'es' | 'en'`), `DEFAULT_LOCALE`, `LOCALES` viven en `lib/i18n/config.ts`.

## Invariantes y validación

- Reglas de negocio/contenido viven en `lib/*/invariants.ts`, exportando `assertXInvariants(): string[]` (lista de errores, vacía = OK) que itera `LOCALES` y etiqueta con `[locale]`.
- Cada invariante crítico tiene un `scripts/validate-*.ts` que lo ejecuta (delegación) o valida inline.
- Cadena: `prebuild` → `validate-sitemap`; `postbuild` → `validate-sitemap-artifacts`; `npm run validate` → `validate:landing` + `type-check`.
- Al agregar contenido crítico, añade su invariante + validador y corre `npm run validate` antes de merge.

## Convenciones de nombres

| Elemento | Convención | Ejemplo |
|----------|------------|---------|
| Carpetas de ruta (`app/`) | kebab-case en español | `sobre-nosotros` |
| Componentes React | PascalCase.tsx | `HomePageContent.tsx` |
| Página compuesta | `<Nombre>PageContent.tsx` en `components/pages/` | `ContactPageContent.tsx` |
| Hooks | `use<Nombre>.ts` en `lib/hooks/` | `useNavigation.ts` |
| Invariantes | `*-invariants.ts` / `invariants.ts` | `copy-invariants.ts` |
| CSS | kebab-case alineado al feature | `home-landing-final.css` |
| Getters de copy | `getXCopy(locale)` / `xPageMetadata(locale)` | `getContactPageCopy` |

## Checklist para código nuevo

1. **Ruta nueva** → crear par `app/(site)/<slug>/page.tsx` + `app/(site)/en/<slug>/page.tsx` (thin wrapper).
2. **Componente de página** → en `components/pages/` (o dominio) con prop `locale`, montando `LocaleProvider` + `ClientInitializer`.
3. **Texto** → en `lib/i18n/copy/` como `Record<Locale, ...>` + getter; nunca hardcodear en JSX.
4. **Metadata** → `xPageMetadata(locale)` vía `buildLocalizedPageMetadata`; registrar path en `lib/seo/`.
5. **UI interactiva** → `'use client'`; lógica reutilizable como hook en `lib/hooks/`.
6. **Estilos** → CSS global en `styles/`, import local en el componente, usando tokens.
7. **Calidad** → invariante en `lib/*/invariants.ts` + `scripts/validate-*.ts`; `npm run validate`.
8. **Imports** → siempre con alias `@/…`.

Complementa esta skill con `i18n-bilingue` (reglas de contenido bilingüe y estilo) y `narrativa-producto-anto` (propósito y principios de producto).
