---
target: "https://antoapps.com/recursos/que-es-tcc"
total_score: 24
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
timestamp: 2026-07-28T23-24-51Z
slug: antoapps-com-recursos-que-es-tcc
---
Method: dual-agent (A: e628b6c6-f00b-43d4-8302-c3a810e43203 · B: 0e1a56e4-27e4-4584-badf-018399ea2283)

Target: https://antoapps.com/recursos/que-es-tcc · Mode: Read · Layout actual: default (sin `brief`)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|------:|-----------|
| 1 | Visibility of System Status | 3 | Crumb + eyebrow «Guía · 7 min»; crumb se trunca en móvil |
| 2 | Match System / Real World | 3 | Ejemplo del mensaje ayuda; H1 sigue tono enciclopedia |
| 3 | User Control and Freedom | 3 | Crumb/nav OK; sin scanLink ni atajos de lectura |
| 4 | Consistency and Standards | 2 | Tokens Anto OK; desalineada del canon brief (sueño/grounding) |
| 5 | Error Prevention | 3 | Disclaimer presente; sin bloque «cuándo pedir ayuda» |
| 6 | Recognition Rather Than Recall | 2 | Further ×5 + related ×3 obligan a comparar de memoria |
| 7 | Flexibility and Efficiency | 2 | Sin howTo ni ritual; un solo camino lineal de texto |
| 8 | Aesthetic and Minimalist Design | 1 | Sin foto/pull; cuerpo tipográfico plano; cierre denso |
| 9 | Error Recovery | 2 | Aviso legal sí; poco andamiaje si esperaban práctica |
| 10 | Help and Documentation | 3 | Es la ayuda; falta APA y un next-step primario claro |
| **Total** | | **24/40** | **Acceptable** |

## Design Specificity Verdict

**LLM:** Intercambiable. Shell Anto (dark + teal) sobre ensayo de psicoeducación genérico. Frente a grounding/sueño (figura lifestyle, pullQuote, productMoment chat, howTo, APA), aquí no hay ancla fotográfica ni momento de producto — podría ser cualquier hub de salud mental digital.

**Deterministic scan:** `detect.mjs` sobre `PsychoeducationGuidePageContent.tsx` → `[]` (0 hallazgos). El detector no ve la laguna de contenido (figure/pull/productMoment son datos de copy, no antipatrones de markup).

**Visual overlays:** Mutation MCP no disponible (navigate falló). Sin overlay [Human]. Evidencia: captura headless hero `tmp/assessment-b-tcc/desktop-01-hero.png`. A11y mecánico: h1→h2 OK; logos `alt=""`.

## Overall Impression

La página explica TCC con claridad, pero se siente como Wikipedia con branding. El mayor salto es subirla al bar **brief editorial** que ya existe en hermanas: foto + pull + productMoment + cierre destilado + confianza APA.

## What's Working

1. Tipografía/shell Anto legibles; hierarchy H1→H2 clara.
2. Ejemplo cotidiano del mensaje no respondido — humano, no «pensar positivo».
3. Límite clínico explícito + CTA único en outro.

## Priority Issues

### [P1] Sin anatomía brief editorial (figura + pull)
- **Why:** Sin foto ni frase memorable, el primer viewport no pasa el brand test Anto.
- **Fix:** `layout: 'brief'` + `figure` lifestyle + `pullQuote` emocional (paridad sueño/grounding).
- **Suggested command:** `/impeccable layout` + dirección editorial

### [P1] Producto solo en prosa («Cómo encaja con Anto»)
- **Why:** Claim sin prueba visual; mid desktop empareja ejemplo ∥ pitch en 2 col.
- **Fix:** `productMoment` con chat tras el ejemplo; quitar o acortar la sección prosa.
- **Suggested command:** `/impeccable polish` / delight contenido

### [P1] Cierre saturado (further ×5 + related ×3)
- **Why:** Peak-end en catálogo; >4 opciones visibles.
- **Fix:** 1 further primaria (+1 opcional); related ≤2 sin duplicar; `ctaBridge` cálido; CTA tipo «Apoyo en Anto».
- **Suggested command:** `/impeccable distill`

### [P2] Confianza SEO/IA floja vs hermanas
- **Why:** Claim «mayor respaldo científico» sin `references` APA; sin `keywords`/`howTo`.
- **Fix:** APA mínima + keywords naturales + howTo o ritual corto (p. ej. ABC micro).
- **Suggested command:** `/impeccable clarify` + checklist SEO forma editorial

### [P2] IA del cuerpo: ejemplo ∥ producto en paralelo
- **Why:** Dos trabajos distintos en el mismo viewport mid.
- **Fix:** Secuencia lineal brief: idea → uso → ejemplo → producto → límites.
- **Suggested command:** `/impeccable layout`

## Persona Red Flags

- **Jordan (first-timer):** H1 clínico + 5 caminos al final; no ve qué hacer *ahora* en Anto.
- **Casey (móvil):** crumb truncado; muro tipográfico; cookie vs further; CTA lejos.
- **Riley (trust):** evidencia sin APA; «Practicar técnicas» choca con no-tratamiento; pitch sin viñeta.

## Minor Observations

- Sin `scanLink` pese a 7 min.
- CTA más SaaS que hermanas.
- Related repite destinos de further.
- Logos `alt=""` (decorativos; no bloquear).

## Questions to Consider

1. Si esta es la **puerta de entrada** a TCC en Anto, ¿por qué no usa el mismo brief que sueño/grounding?
2. En el cierre, ¿el éxito es **una** acción (Anto / ABC / mapa) — y cuál merece el peak-end?
