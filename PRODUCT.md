# PRODUCT.md — Anto (SquareAnto)

## Register
brand

## Platform
web

## Users
Personas que buscan apoyo emocional digital (usuarios de la app Anto) y visitantes que evalúan la app: confianza, claridad y privacidad. Secundario: profesionales o referentes que revisan evidencia científica.

## Purpose
Sitio oficial de **Anto**, app móvil de acompañamiento emocional con IA. Comunicar valor, confianza y límites con honestidad; informar sobre investigación, features y descarga. No sustituye atención profesional.

## Positioning
Marca cultural y emocional que usa tecnología: cercana, observacional, humana. No clínica, no meditación genérica, no startup de IA, no wellness pastel. El sitio debe sentirse como una publicación editorial contemporánea sobre la experiencia cotidiana de tener una mente, convertida en producto digital.

## Brand personality
Cálma con personalidad, claridad, sensibilidad, modernidad sin frialdad. Acento teal/cyan sobre azul profundo ya establecido; secondary lavanda-azul como apoyo editorial.

## Visual north star
Skill **`editorial-emotional-web`**: composición editorial viva, fotografía lifestyle cotidiana, tipografía expresiva vía escala del sistema, narrativa antes que lista de features.

## Anti-references
- Landing SaaS genérica con cards anidadas / purple-neón / glass.
- Estética cream/sand “editorial AI 2026” o tipográfica-serif sin foto.
- Urgencia de growth hack, tipografía gritona, badges flotantes sobre el hero.
- Estética clínica, chatbot, meditación genérica o iconografía de salud mental (cerebros, lotos, corazones).
- Rediseño desde cero del design system sin petición explícita.

## Design principles
1. **Editorial primero**: dirección de `editorial-emotional-web` gobierna marketing; tokens Anto materializan color y tipo.
2. **Identidad en tokens**: `styles/tokens/`, Inter/SF/system y primary `#1adddb` ganan sobre defaults anti-Inter o paletas abiertas de skills.
3. **Una composición por viewport** en marketing; brand hero-level; foto estructural, no decorativa.
4. **Accesibilidad WCAG 2.1 AA** y `prefers-reduced-motion` no son opcionales.
5. **Copy observacional** en español neutro: reconocimiento antes que consejo; evitar jerga motivacional vacía.
6. **Imágenes/producto reales** como ancla; mockups de teléfono inclinados y stock clínico están prohibidos por defecto.

## Skills routing
- Marketing / landing / rediseño / evaluación estética: `editorial-emotional-web` (regidor) + `design-taste-frontend` (dials Anto `5 / 3 / 3`, modo preserve).
- Audit / polish / craft estructurado / UI de producto: `/impeccable`.
- Conflicto: editorial (dirección) > tokens Anto > este archivo > defaults de Taste/Impeccable.
- No forzar Tailwind ni otro design system empaquetado sobre el CSS actual.

## Design system note
Fuente de verdad visual: `styles/tokens/`, `styles/base/variables.css`, `components/`.

Paleta editorial mapeada:

| Rol | Valor |
|-----|--------|
| Fondo | `#030a24` / `--color-bg-*` |
| Primary | `#1adddb` |
| Secondary editorial | `#a3b8e8` |
| Acento amarillo puntual | `#ffd93d` (warning; uso raro) |

Stack tipográfico system/SF Pro/Inter es deliberate. Expresión editorial = escala, peso, ritmo y composición; no tipografía “anti-Inter” sin brief.
