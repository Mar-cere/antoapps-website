# AGENTS.md

## Cursor Cloud specific instructions

Este repositorio es el **sitio web de marketing de Anto** (Next.js 14 + TypeScript, App Router). No hay backend propio dentro del repo: las páginas son estáticas/SSR y el formulario de contacto usa la Gmail API mediante variables de entorno opcionales.

### Servicio único: sitio web Next.js

- Node 22 está disponible y es compatible (Next 14 requiere Node >= 18.17).
- Las dependencias ya quedan instaladas por el update script (`npm ci`).
- Comandos estándar (definidos en `package.json`):
  - Desarrollo: `npm run dev` → sirve en `http://localhost:3000`.
  - Build de producción: `npm run build` (ejecuta `prebuild`/`postbuild` que validan el sitemap).
  - Type-check: `npm run type-check`.
  - Validaciones de contenido/landing: `npm run validate` (incluye `validate:landing` + `type-check`).

### Gotchas no obvios

- `npm run lint` (`next lint`) está **roto** por incompatibilidad entre `eslint@9` y `eslint-config-next`/Next 14: imprime `Invalid Options: Unknown options: useEslintrc, ...` aunque sale con código 0. Es un problema pre-existente del repo, no del entorno. Para verificación de calidad de código usa `npm run type-check` y `npm run validate`. El build no se ve afectado porque `next.config.js` tiene `eslint.ignoreDuringBuilds: true`.
- El formulario de contacto (`/contacto` → `app/api/contact`) solo envía correos reales si se definen las variables `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`, `GMAIL_USER` (ver `.env.example`). Sin ellas la UI funciona y se puede llenar/enviar, pero el envío fallará en el backend; esto es esperado en desarrollo.
- Variables de entorno opcionales (analytics, URLs de tiendas, backend) están en `.env.example`; ninguna es necesaria para levantar el sitio en desarrollo.
