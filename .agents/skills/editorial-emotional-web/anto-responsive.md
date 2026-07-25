# Anto — responsive editorial (referencia)

Complemento del Puente Anto en `SKILL.md`. Usar al diseñar o adaptar landings, ensayos y páginas marketing del repo.

## Anti-patrón que ya cometimos

Bloquear toda la página marketing con `max-width: ~46rem` “porque es mobile-first / lectura”.

Efecto en desktop: una sola columna larga, márgenes laterales muertos, sensación de app móvil en monitor.

## Patrón correcto

```
Mobile:  stack vertical, shell ≈ medida
Tablet:  shell crece; primeras recomposiciones (2 cols)
Desktop: shell ~56–72rem; medida solo en prosa; secciones recomponen
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

| Familia | Cuándo |
|---------|--------|
| Masthead 2 cols | Título + cita / apoyo |
| Reading measure | Ensayo, límites, disclaimer |
| Full-shell figure | Foto editorial |
| Grid 2×N | Takes, ideas pares |
| Split texto \| media | Puente producto / viñetas |
| Closing 2 cols | Límites + refs / CTA + nota |

No repetir la misma familia en 3+ secciones seguidas.

## Canon en el repo

- Ensayo evidencia: `styles/components/research.css`, `components/pages/ResearchPageContent.tsx`
- Home marketing: `styles/pages/home-v2.css` (shell `--hl-max`)
- Guías: `styles/components/psychoeducation-article.css` — al tocarlas, alinear con el mismo contrato shell/medida

## Verificación rápida

1. Abrir ≥1280px de ancho.
2. ¿Hay vacío lateral enorme alrededor de un tubo de texto? → fallido.
3. ¿El cuerpo de ensayo sigue ≤~65ch? → correcto.
4. ¿Mobile &lt;720px sigue en una columna usable? → correcto.
