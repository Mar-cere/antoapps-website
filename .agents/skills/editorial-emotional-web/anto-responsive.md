# Anto — responsive editorial (referencia)

Complemento del Puente Anto en `SKILL.md`. Usar al diseñar o adaptar landings, ensayos y páginas marketing del repo.

## Anti-patrón que ya cometimos

Bloquear toda la página marketing con `max-width: ~46rem` “porque es mobile-first / lectura”.

Efecto en desktop: una sola columna larga, márgenes laterales muertos, sensación de app móvil en monitor.

## Patrón correcto

```
Mobile:  stack vertical, shell ≈ medida
Tablet:  shell crece; la primera sección ya cambia de familia, sin abrir en dos columnas iguales
Desktop: shell ~56–72rem; medida solo en prosa; cada tramo cambia de corte, escala y ritmo
```

### CSS mental model

```css
/* Contenedor de página — shell */
.page__shell { max-width: 46rem; }
@media (min-width: 768px)  { .page__shell { max-width: min(56rem, 100%); } }
@media (min-width: 960px)  { .page__shell { max-width: min(72rem, 100%); } }

/* Prosa — medida (no el shell entero) */
.page__reading { max-width: 44rem; }
```

## Familias de layout por sección (rotar)

Una columna y dos columnas iguales no son el punto de partida. Rotar de verdad: al menos tres familias, y no todas con el mismo corte.

| Familia | Cuándo |
|---------|--------|
| Masthead de escalas distintas | Título grande y apoyo que no compite en el mismo ancho |
| Reading measure | Ensayo, límites, disclaimer |
| Figura a sangre | Foto con tipo superpuesto o al borde |
| Ritmo irregular | Un take grande y el resto menor, o una banda |
| Corte asimétrico | Texto y media en 7/5 u 8/4, no en 50/50 |
| Acompañante sticky | Una nota que sigue mientras el cuerpo avanza |
| Banda horizontal | Una secuencia que se recorre de lado, con propósito |

No repetir la misma familia en 3+ secciones seguidas. Un split 50/50, como máximo una vez en la página.

## Canon en el repo

- Ensayo evidencia: `styles/components/research.css`, `components/pages/ResearchPageContent.tsx`
- Home marketing: `styles/pages/home-v2.css` (shell `--hl-max`; pricing/FAQ/final-cta recomponen a ≥900px)
- Guías: `styles/components/psychoeducation-article.css` — mismo contrato shell/medida
- Biblioteca: `styles/components/resources-library.css`

## Verificación rápida

1. Abrir ≥1280px de ancho.
2. ¿Hay vacío lateral enorme alrededor de un tubo de texto? → fallido.
3. ¿El cuerpo de ensayo sigue ≤~65ch? → correcto.
4. ¿Mobile &lt;720px sigue en una columna usable? → correcto.
