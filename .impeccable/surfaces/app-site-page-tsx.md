---
version: 1
slug: "app-site-page-tsx"
primary_target: "app/(site)/page.tsx"
related_targets: ["app/(site)/en/page.tsx","route:/","route:/en"]
---

# Home publicada (`/` · `/en`)

## Visitor mode
Persuade

## Audience / job
Visitante que busca apoyo emocional digital y evalúa confianza, claridad y privacidad antes de descargar.

## Primary action
Descargar Anto: **par igual** App Store + Google Play en hero, pricing y Final CTA (mismo componente `PremiumStoreCtaPair`). Sin sección `#android` dedicada.

## Sprint A–C contracts (binding)
1. Hero budget: brand + H1 + apoyo corto + par de stores + ancla chat/foto. Límite clínico con fuerza en FAQ + coda Explore (no en el support del hero).
2. Peak-end: Final CTA es el último beat editorial. Explore va **antes** del Final CTA.
3. Fotografía de cierre distinta del hero (`sleeplessNight` ≠ `evening`).
4. Cookie: sólido sin blur; no tapa `#precios` / Final CTA; scroll ≥900px + delay 8s.
5. Motion: un momento = burbujas del chat hero. Sin reveal genérico en el resto.
6. Sin franja hero-metric; paneles sin eyebrows de plantilla.
7. Explore: hub + 1 guía featured + app (iPhone y Android) + seguridad. Copy muted/disclaimer con contraste tintado al secondary.
8. Shell: todas las secciones usan `.home-landing-container` / `--hl-max`; medida de lectura (`ch`) solo en prosa, no tubos de layout distintos entre secciones.

## Memorable moment
Reconocimiento observacional (*Cuando todo cuesta un poco más*) + viñeta de chat nocturna.

## Constraints
Preserve tokens Anto (teal `#1adddb`, dark `#030a24`), tipografía system/Inter/SF, dirección `editorial-emotional-web`. Paridad ES/EN de estructura y claims. No Tailwind migration.
