---
name: i18n-bilingue
description: Reglas de internacionalización del sitio de Anto. Todo contenido visible debe codificarse SIEMPRE en español (por defecto) e inglés, con paridad de rutas y copys, y usando español neutro sin modismos ni voseo. Actívala al crear o editar páginas, rutas, componentes con texto, copys, metadata/SEO, sitemap o cualquier contenido de cara al usuario.
paths:
  - "app/**"
  - "components/**"
  - "lib/**"
---

# i18n bilingüe (es/en) + español neutro

Regla base: **nada se codifica en un solo idioma.** Cada pieza de contenido de cara al usuario debe existir en español (locale por defecto) e inglés, con paridad de rutas, copys y metadata. Además, el español debe ser **neutro**, sin modismos, voseo ni regionalismos que dificulten la comprensión.

## Cuándo usar

- Al crear o editar páginas, rutas o componentes que muestren texto.
- Al escribir o modificar copys, metadata, JSON-LD, Open Graph o el sitemap.
- Al agregar guías de psicoeducación u otro contenido dinámico.
- Al redactar cualquier texto de cara al usuario (labels, mensajes, errores, aria-labels).

## Arquitectura i18n del repositorio

La i18n es **basada en rutas** (no usa `next-intl` ni `middleware.ts`). El idioma se infiere solo de la URL.

- **Español (por defecto)**: rutas raíz en `app/(site)/` → `/`, `/contacto`, ...
- **Inglés**: prefijo `/en` en `app/(site)/en/` → `/en`, `/en/contacto`, ...
- Los **slugs se mantienen en español** en ambos idiomas (`/en/contacto`, no `/en/contact`). Lo único que cambia es el prefijo `/en`.
- El copy visible vive centralizado en TypeScript bajo `lib/i18n/copy/` como objetos `Record<Locale, ...>` con getters `getXCopy(locale)`. No se escribe texto suelto en los componentes.

Helpers clave en `lib/i18n/`:

- `config.ts`: tipo `Locale` (`'es' | 'en'`), `DEFAULT_LOCALE`, `LOCALES`, `localePath(locale, path)`.
- `path-from-pathname.ts`: `localeFromPathname()`, `pathWithoutLocale()`.
- `metadata.ts`: `buildLocalizedPageMetadata()` (canonical + hreflang `es`/`en`/`x-default`).

Fuentes de verdad de SEO/rutas:

- `lib/seo/indexable-routes.ts` y `lib/seo/metadata-paths.ts`: paths lógicos **sin** prefijo `/en`.
- `lib/seo/psychoeducation-routes.ts` + `PSYCHOEDUCATION_SLUGS`: guías dinámicas.
- Sitemap generado en `lib/seo/build-sitemap.ts` (cada URL con `alternates.languages` y `x-default` → ES).

## Reglas obligatorias

1. **Paridad de rutas**: por cada `app/(site)/<ruta>/page.tsx` debe existir `app/(site)/en/<ruta>/page.tsx` con el mismo slug. Las `page.tsx` son wrappers finos que pasan `locale` explícito al componente compartido.
2. **Copy centralizado y bilingüe**: agrega el texto en `lib/i18n/copy/` como `Record<Locale, ...>` con ambos idiomas completos. Nunca dejes una clave solo en `es` o solo en `en`.
3. **Metadata localizada**: exporta `xPageMetadata(locale)` usando `buildLocalizedPageMetadata()` (o el patrón de home/bienvenida en casos especiales). Debe incluir `alternates.languages` con `es`, `en` y `x-default` (siempre ES). Open Graph: `es_CL` para ES, `en_US` para EN.
4. **Enlaces internos con prefijo correcto**: en copy/nav EN los enlaces internos llevan prefijo `/en`; en ES no lo llevan. Usa `localePath(locale, path)` en lugar de construir URLs a mano.
5. **Registro en fuentes de verdad**: registra el path lógico (sin `/en`) en `lib/seo/indexable-routes.ts` y `lib/seo/metadata-paths.ts`. Si es guía, agrega el slug a `PSYCHOEDUCATION_SLUGS` y su contenido en `es.ts` y `en.ts`.
6. **Atributo de idioma**: respeta `lang` en `<html>` y en contenedores de sección (`lang={locale}`). No fijes idioma en duro salvo el default `es` del root.
7. **Validación antes de merge**: ejecuta `npm run validate` (incluye `validate:landing` + `type-check`). Los scripts `scripts/validate-*` verifican paridad es/en de rutas, copys, metadata, sitemap/hreflang y llms.txt.

## Reglas de estilo: español neutro

- Usa **español neutro latinoamericano**. Evita modismos y regionalismos.
- **Prohibido el voseo**: usa `tú` (no `vos`). Evita formas como `podés`, `tenés`, `querés`, `mirá`, `dale`, `che`.
- Registro por contexto (convención existente):
  - **Tú**: marketing, producto, FAQ, seguridad (ej. "Tu mente tiene un lugar donde aterrizar").
  - **Usted**: solo textos legales formales (términos, privacidad).
- Tono empático, cálido y clínicamente responsable. Mantén los disclaimers de que Anto no sustituye atención profesional.
- El inglés debe ser natural y neutro (evita jerga regional). No es una traducción literal del español; adapta el mensaje conservando el significado y el tono.
- Coherencia de mercado: el footer/legal en ES referencia Chile (`es_CL`); no lo elimines en cambios de copy.

## Checklist para contenido nuevo bilingüe

1. Crear `app/(site)/<ruta>/page.tsx` **y** `app/(site)/en/<ruta>/page.tsx` (mismo slug).
2. Crear copy en `lib/i18n/copy/` con `Record<Locale, ...>` y getter `getXCopy(locale)`, ambos idiomas completos.
3. Exportar metadata con `buildLocalizedPageMetadata()` (canonical + hreflang es/en/x-default).
4. Registrar el path lógico en `lib/seo/indexable-routes.ts` y `lib/seo/metadata-paths.ts`.
5. Si es guía: slug en `PSYCHOEDUCATION_SLUGS` + contenido en `es.ts` y `en.ts`.
6. Enlaces: EN con prefijo `/en`, ES sin prefijo (vía `localePath`).
7. Revisar estilo: español neutro, sin voseo ni modismos; inglés natural y neutro.
8. Ejecutar `npm run validate` y corregir hasta que pase.
