---
target: "https://antoapps.com/recursos/grounding-ansiedad-crisis"
total_score: 27
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 2
timestamp: 2026-07-28T18-59-44Z
slug: antoapps-com-recursos-grounding-ansiedad-crisis
---
Method: dual-agent (A: 1ddfcfee-cd5c-43d1-84cd-5c6d46f29620 · B: 60766930-ae6e-4146-81fb-5d29e73180a8)

# Critique — Grounding / ansiedad crisis

**Target:** https://antoapps.com/recursos/grounding-ansiedad-crisis  
**Mode:** Read (+ Persuade en CTA / product moment)  
**Slug:** antoapps-com-recursos-grounding-ansiedad-crisis

---

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Breadcrumb y tiempo de lectura OK; sin progreso/atajo dentro del ritual |
| 2 | Match System / Real World | 3 | Voz humana fuerte; jerga clínica en further reading (GAD-7, autonómica) |
| 3 | User Control and Freedom | 2 | Sin escape al ejercicio; banner de cookies captura foco |
| 4 | Consistency and Standards | 3 | Coherente con home-v2; chips de sugerencias parecen botones y no lo son |
| 5 | Error Prevention | 2 | Crisis enterrada; sin recurso de emergencia concreto |
| 6 | Recognition Rather Than Recall | 3 | Pasos del ritual visibles; sin mapa/jump en esta guía |
| 7 | Flexibility and Efficiency | 2 | Guía de técnica sin atajo “ir al ejercicio” para pico/relectura |
| 8 | Aesthetic and Minimalist Design | 3 | Editorial limpio; ruido cookie + cierre sobrecargado |
| 9 | Error Recovery | 2 | “Otras opciones” ayuda; crisis poco accionable si el ritual no basta |
| 10 | Help and Documentation | 4 | La página es la ayuda; HowTo/JSON-LD presentes |
| **Total** | | **27/40** | **Acceptable → Good (límite inferior de Good)** |

---

## Design Specificity Verdict

**Start here.** La superficie se siente **autora para Anto**, no intercambiable de categoría.

**LLM assessment:** Fondo `#030a24`, CTA teal, eyebrow `Anto · Guía · 7 min`, pull quote anti-positivismo, foto lifestyle nocturna y viñeta de chat con voz de producto anclan la marca. Un blog clínico, una app de meditación pastel o un SaaS wellness no podrían reutilizarla sin romper identidad. La IA de lectura (definición → cuerpo → ritual → crisis → lecturas) es patrón de guía reconocible; la specificity vive en foto + tokens + momento de producto + recomposición desktop (shell ancho, masthead 2 col, ritual∥producto), no en una estructura inventada.

**Deterministic scan:** `detect.mjs --json` sobre `PsychoeducationGuidePageContent.tsx`, rutas `[slug]` ES/EN y shell (nav/footer/vignette) → **exit 0, findings `[]`**. Escaneo URL vía Puppeteer no disponible (`puppeteer` no instalado). El detector no aportó issues mecánicos adicionales; el juicio de craft viene del review + evidencia visual headless.

**Visual overlays:** No hay overlays fiables en pestaña **[Human]**. El MCP `cursor-ide-browser` creó pestañas inestables (navigate/lock fallaron en ambos assessments). Evidencia visual vía Chrome headless (desktop 1440 / mobile 390) + HTML en vivo. Señal de fallback: **mutation unavailable / browser session unstable**.

---

## Overall Impression

Craft editorial fuerte en el primer viewport y en el ritual 5-4-3-2-1, con recomposición desktop correcta. El fallo estructural es de **modo de uso**: la página está optimizada para lectura calmada, no para alguien en pico de ansiedad. El mayor oportunidad: convertir el job-to-be-done de crisis (anclar ya) en la jerarquía y el peak-end, sin sacrificar la voz Anto.

---

## What's Working

1. **Masthead editorial Anto** — título + pull a dos columnas, foto nocturna con caption: specificity y tono correctos (no clínico, no SaaS).
2. **Ritual 5-4-3-2-1** — lista ordenada con badges teal, copy permisiva (“No hay nota perfecta”): el mejor momento de craft de la página.
3. **Recomposición desktop** — shell ~72–76rem, body 2 col, stack ritual∥producto: no queda atrapada en columna ~46rem.

---

## Priority Issues

### [P0] Banner de cookies compite con contenido de ansiedad/crisis
- **Why it matters:** En hero tapa la foto; en mobile el dock vive en la zona del pulgar y puede cubrir crisis/CTA. Impone decisión administrativa (Aceptar/Rechazar) cuando la tarea es bajar arousal.
- **Fix:** En esta ruta (o guías de crisis), diferir el banner, no mostrarlo hasta post-ritual/CTA, o asegurar que el dock nunca cubra `#mapa-5-cuando-es-crisis` / outro.
- **Suggested command:** `/impeccable quieter` (o `/impeccable harden` si el cambio es de política/comportamiento del banner)

### [P1] Sin atajo “estoy en el pico → ejercicio / un ancla”
- **Why it matters:** Quien llega en 8–9/10 debe estabilizar ya. La IA obliga a pasar “Qué es” + “Cómo se siente” antes del ritual.
- **Fix:** En hero (o sticky compacto): link a `#mapa-3-ejercicio-5-4-3-2-1` y/o “Un solo ancla (pies en el suelo)” arriba; valorar layout `brief` + índice mínimo.
- **Suggested command:** `/impeccable layout`

### [P1] `Cuándo es crisis` sin jerarquía ni acción concreta
- **Why it matters:** Mismo peso que secciones vecinas; copy genérica (“emergencias… de tu país”); llega al final del cuerpo. High-stakes sin contención operativa.
- **Fix:** Tratamiento visual distinto (acento/borde, no card SaaS); enlace a recursos regionales o `/seguridad`; subir en IA o one-liner de crisis cerca del hero.
- **Suggested command:** `/impeccable clarify` (+ `/impeccable layout` para jerarquía)

### [P2] Product moment corta el ritual
- **Why it matters:** Tras el 5-4-3-2-1 aparece Persuade (`Así se ve en Anto` + chips). Quiebra “una cosa a la vez” en el pico útil; chips parecen controles y no lo son.
- **Fix:** Mover producto tras “Otras opciones” o al outro; o colapsar bajo “Ver cómo se ve en Anto”. Convertir chips en no-interactivos visualmente claros o en deep links reales.
- **Suggested command:** `/impeccable distill`

### [P2] Cierre con sobrecarga de salidas
- **Why it matters:** 3 further + CTA + 3 related + volver (~8 salidas) diluyen el end emocional y el CTA. Related incluye Trauma junto a crisis.
- **Fix:** Un further primario (mapa ansiedad); related a 2 max; Trauma no vecino inmediato; CTA como único acento teal al final.
- **Suggested command:** `/impeccable distill`

---

## Cognitive Load

**Fallos:** single focus, chunking del cierre, visual hierarchy (crisis/cookie), one-thing-at-a-time, minimal choices, progressive disclosure → **carga alta en pico; moderada en lectura calmada**.

**Decision point >4:** cierre ≈ 8 salidas; cookie Rechazar/Aceptar/Política encima del contenido.

---

## Persona Red Flags

**Jordan (first-timer):** Sin CTA de ritual en hero; “grounding” antes de la definición; chips “Sugerencias” parecen botones muertos; further reading con GAD-7 suena clínico-avanzado.

**Casey (distracted mobile):** Cookie dock en thumb zone; hero denso antes de utilidad; scroll largo hasta el ejercicio; fácil abandonar.

**Sam (a11y):** Cookie como competidor de foco; chips con look de control no focusables; crisis sin enlace semántico fuerte a ayuda externa.

**Alexa (proyecto — pico de ansiedad buscando grounding):** Quiere un ancla en &lt;10s; la página ofrece atmósfera primero; crisis tarde y vaga; related Trauma puede activar más amenaza; pitch de producto puede sentirse como demanda en 8/10.

---

## Minor Observations

- Live no usa `psycho-guide--brief` (sleep sí); grounding podría beneficiarse del peak-end brief.
- `7 min de lectura` en eyebrow puede desalentar en crisis.
- Figcaption se pierde bajo cookies en primer viewport.
- Related repite “Ansiedad y preocupación” ya en further reading.
- Disclaimer + sección crisis repiten emergencia con distinto peso — unificar.
- Foto inset con radius: correcto para artículo Read; no forzar full-bleed de landing.

---

## Questions to Consider

1. Si alguien abre esta URL temblando el pulgar, ¿la primera acción debería ser **leer** o **hacer un ancla** — y la UI lo refleja?
2. ¿El product moment gana más confianza *después* de que la ola bajó, o está robando el único pico útil?
3. ¿`Cuándo es crisis` merece el mismo template H2 que “Qué es el grounding”, o es un contrato de seguridad distinto?
4. ¿Cuántas salidas puede tolerar el cierre de una guía de crisis antes de dejar de sentirse como contención?
