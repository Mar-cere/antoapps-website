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
Descargar Anto: **par igual** App Store + Google Play en hero, pricing y Final CTA (`PremiumStoreCtaPair`). Nav “Descargar” abre la store del dispositivo (iOS → App Store, Android → Play; desktop → App Store). Sin sección `#android` dedicada. La figura de chat no lleva otro par de tiendas.

## Product proof
Dos capturas de la app actual, carbón, sin teal: el chat después del reconocimiento y una micro-guía junto al fundamento. Archivos `anto-now-chat-{es,en}.webp` y `anto-now-guide-{es,en}.webp`. Si falta un archivo, esa figura no se publica. No hay pantalla de «un paso»; ese paso aparece dentro del hilo. Prohibida la franja de tres pestañas.

## Sprint A–C contracts (binding)
1. Hero budget: brand + H1 + apoyo corto + par de stores + ancla chat/foto. Límite clínico con fuerza en FAQ + coda Explore (no en el support del hero).
2. Peak-end: Final CTA es el último beat editorial. Explore va **antes** del Final CTA.
3. Fotografía de cierre distinta del hero (`sleeplessNight` ≠ `evening`).
4. Cookie: sólido sin blur; no tapa `#precios` / Final CTA. Aparece solo con **delay Y scroll** (desktop 8s/900px; móvil 12s/1600px). Barra compacta en viewport estrecho.
5. Motion: dos capas. Controles a escala 0.95 (~120 ms). Página: el titular del hero entra por líneas; las figuras entran con opacidad y un desplazamiento (640–800 ms, una vez) y recortan en hover. Las burbujas del chat del hero se leen una vez, sin bucle. `prefers-reduced-motion` apaga las dos capas.
6. Sin franja hero-metric; paneles sin eyebrows de plantilla.
7. Explore: hub + 1 guía featured + app (iPhone y Android) + seguridad. Copy muted/disclaimer con contraste tintado al secondary.
8. Shell: todas las secciones usan `.home-landing-container` / `--hl-max`; medida de lectura (`ch`) solo en prosa, no tubos de layout distintos entre secciones.

## Memorable moment
Reconocimiento observacional (*Cuando todo cuesta un poco más*) + viñeta de chat nocturna.

## Constraints
Materia visual: Anto Nexus esencial (periwinkle, fondo plano, sans de sistema, card con hairline). Foto y narrativa: `editorial-emotional-web`, sin reabrir teal ni glass. Paridad ES/EN de estructura y claims. No Tailwind migration. `styles/tokens/colors.css` es legado; al tocar esta superficie, migrar sus roles.
