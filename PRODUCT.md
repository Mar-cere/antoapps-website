# PRODUCT.md — Anto (SquareAnto)

## Platform
web

## Users
Personas que buscan apoyo emocional digital (usuarios de la app Anto) y visitantes que evalúan la app: confianza, claridad y privacidad. Secundario: profesionales o referentes que revisan evidencia científica.

## Purpose
Sitio oficial de **Anto**, app móvil de acompañamiento emocional con IA. Comunicar valor, confianza y límites con honestidad; informar sobre investigación, features y descarga. No sustituye atención profesional.

## Positioning
Marca cultural y emocional que usa tecnología: cercana, observacional, humana. No clínica, no meditación genérica, no startup de IA, no wellness pastel. La materia visual es Anto Nexus esencial: calmada, plana y premium. En marketing, la fotografía y la narrativa pueden seguir siendo editoriales; no cambian el color, el tipo ni las superficies.

## Brand personality
Calma con personalidad, claridad, sensibilidad, modernidad sin frialdad. Un acento periwinkle. Fondos de papel o carbón, planos. La marca visible es el símbolo M1 Möbius. Nexus es el motor interno y no aparece como wordmark.

## Visual north star
Rule **`anto-nexus-esencial`** y **`DESIGN.md`**: Expression 3 / Accent 2 / Motion 2. Sans del sistema, aire, un periwinkle, movimiento corto. La skill **`editorial-emotional-web`** solo aporta foto, voz y ritmo de marketing.

## Anti-references
- Glass como fondo de card, gradiente lila-azul, partículas, orbital SVG.
- Wordmark «Nexus» en la interfaz, teal `#1adddb`, navy `#030a24`.
- Material (FAB, elevation alta) y serif editorial.
- Estética cream/sand “editorial AI” o landing SaaS de cards anidadas.
- Urgencia de growth hack, tipografía gritona, badges flotantes sobre el hero.
- Estética clínica, chatbot, meditación genérica o iconografía de salud mental (cerebros, lotos, corazones).

## Design principles
1. **Nexus esencial primero**: color, tipo, superficies y motion salen de `anto-nexus-esencial` y `DESIGN.md`.
2. **Identidad en la paleta vigente**: periwinkle `#6868DF` / `#A5A4FF`, papel `#FAFAFC` o carbón `#101216`, sans del sistema. `styles/tokens/colors.css` es legado (teal y navy); no extenderlo.
3. **Composición editorial variable** en marketing: una columna y dos columnas iguales no son el layout por defecto. Cada tramo cambia de escala y de corte. La prosa conserva su medida. El hero de la app es solo tipografía. El movimiento de página es visible y profesional; los controles siguen en escala 0.95. `prefers-reduced-motion` apaga ambos.
4. **Responsive editorial**: mobile-first es el orden CSS; desktop recompondrá (shell vs medida de lectura). No dejar páginas marketing como columna ~46rem centrada. Ver rule `marketing-responsive-editorial` y `editorial-emotional-web/anto-responsive.md`.
5. **Forma home + guías**: anatomía fija (brief/dossier/default), una idea por bloque, ES/EN en paridad, SEO/IA sin “chatbot”. Ver rule `marketing-editorial-form`.
6. **Accesibilidad WCAG 2.1 AA** y `prefers-reduced-motion` no son opcionales. El movimiento es corto (escala 0.95).
7. **Copy observacional** en español neutro: reconocimiento antes que consejo; evitar jerga motivacional vacía.
8. **Imágenes/producto reales** como ancla; mockups de teléfono inclinados y stock clínico están prohibidos por defecto.
9. **Marca visible**: wordmark anto en Inicio; M1 entero en chat, carga, FAQ y onboarding; firma en bienvenida y Sobre Anto. Sin wordmark «Nexus».

## Skills routing
- Materia visual de cualquier UI: rule `anto-nexus-esencial` + `DESIGN.md`.
- Marketing / landing / evaluación estética: esa materia + `editorial-emotional-web` (foto, narrativa y composición variable) + `design-taste-frontend` (composición 6, motion 4, densidad 3; alinear a Nexus esencial).
- Audit / polish / craft estructurado / UI de producto: `/impeccable`.
- Home-v2 / guías `/recursos` / copy / SEO-IA de esas superficies: rule `marketing-editorial-form`.
- Conflicto: Nexus esencial > este archivo > editorial (foto y narrativa) > defaults de Taste/Impeccable.
- No forzar Tailwind ni otro design system empaquetado sobre el CSS actual.

## Design system note
Fuente de verdad visual: `DESIGN.md` y la rule `anto-nexus-esencial`. Los CSS de `styles/tokens/` todavía emiten el sistema anterior; al tocar una superficie, migrar sus roles.

| Rol | Claro | Oscuro |
|-----|--------|--------|
| Primary | `#6868DF` | `#A5A4FF` |
| Fondo | `#FAFAFC` | `#101216` |
| Superficie | `#FFFFFF` | `#191D24` |
| Texto | `#121722` | `#F4F6FC` |

Sans del sistema en toda la interfaz. No hay serif. Expression 3 / Accent 2 / Motion 2.
