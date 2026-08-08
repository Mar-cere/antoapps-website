---
target: "https://antoapps.com/recursos/mapa-sueno-e-insomnio"
total_score: 29
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
timestamp: 2026-07-28T21-46-55Z
slug: antoapps-com-recursos-mapa-sueno-e-insomnio
---
Method: dual-agent (A: 136df1b2-3434-4d3a-8ff1-cef0a3fb5142 · B: 1dd52f72-341a-4bc6-a757-afdf419c9774)

# Critique — Mapa sueño e insomnio

**Target:** https://antoapps.com/recursos/mapa-sueno-e-insomnio  
**Mode:** Read (dossier / mapa clínico) · Persuade puntual en productMoment / CTA  
**Slug:** antoapps-com-recursos-mapa-sueno-e-insomnio  
**Layout:** `dossier` (índice sticky + stream)

---

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Índice sticky sin capítulo activo / `aria-current` |
| 2 | Match System / Real World | 3 | Voz cotidiana; TCC-I denso pero contextualizado |
| 3 | User Control and Freedom | 3 | Anclas, companion a brief, volver a recursos |
| 4 | Consistency and Standards | 3 | Forma dossier coherente; further/related violan regla de forma |
| 5 | Error Prevention | 3 | Advertencias restricción/apnea/evaluación presentes |
| 6 | Recognition Rather Than Recall | 3 | Índice visible; sin “estás aquí”; chips ambiguos |
| 7 | Flexibility and Efficiency | 3 | Sticky index = acelerador; sin scroll-spy |
| 8 | Aesthetic and Minimalist Design | 2 | Stream limpio; cierre y TOC móvil saturados |
| 9 | Error Recovery | 3 | Rutas a evaluación/crisis/brief; no UI de error |
| 10 | Help and Documentation | 4 | La página es la ayuda: mapa + refs + hermana práctica |
| **Total** | | **29/40** | **Good** |

---

## Design Specificity Verdict

**Start here.** La superficie es **Anto-authored**, no intercambiable de categoría.

**LLM assessment:** Dark + teal, foto nocturna en cama, pullquote de 3am, capítulos numerados dossier, índice “Mapa”, viñeta de chat anclada al ciclo de mantenimiento y límites clínicos honestos. La hermana `brief` refuerza un sistema de formas. Riesgo: el tramo medio (TCC-I → APA) puede sentir “manual sanitario” si el peak-end se diluye; la autoría vive en hero/foto/chat/voz, no en el cierre.

**Deterministic scan:** `detect.mjs` sobre markup de guía + rutas + shell → **0 findings** (exit 0). Puppeteer URL no disponible (`puppeteer` ausente). El detector no aportó issues mecánicos; el juicio de craft viene del review + capturas headless.

**Visual overlays:** No hay overlays en **[Human]**. MCP del navegador inestable (tabs que desaparecen). Evidencia vía Chrome headless en `tmp/critique-sleep-map-a/`. Fallback: mutation unavailable.

---

## Overall Impression

El dossier funciona: se siente mapa, no tip-list. El techo lo cortan el **cierre saturado** (further×6 + APA abierta + related×3) y el **índice ciego** (sin capítulo activo), más el TOC de 8 ítems en móvil antes de leer. Mayor oportunidad: peak-end disciplinado + scroll-spy, sin tocar la identidad del mapa.

---

## What's Working

1. **Forma dossier creíble** — sticky + capítulos `01–08` + medida de lectura: es mapa, no lista de tips.
2. **Ancla emocional fotográfica + pull** — 3am / cama / reloj: identidad editorial Anto.
3. **IA brief↔mapa y productMoment** tras TCC-I — el chat traduce arquitectura a un paso nocturno sin claim de “arreglar el sueño entero”.

---

## Priority Issues

### [P1] Peak-end saturado: further×6 + APA expandido + related×3
- **Why it matters:** Tras 12 min de mapa, >4 destinos compiten; el CTA emocional llega tarde. Viola `marketing-editorial-form` (further primaria; anti further×3+related×3).
- **Fix:** Further: 1 primaria (brief) + máx. 2 contextuales; colapsar APA en `<details>` como brief; reducir `relatedSlugs` a lo no listado; CTA cerca del further corto.
- **Suggested command:** `/impeccable distill`

### [P1] Índice sin estado de lectura (scroll-spy / `aria-current`)
- **Why it matters:** En 8 capítulos el sticky deja de orientar; falla visibility (#1) y working memory.
- **Fix:** IntersectionObserver + `aria-current="location"` + estilo activo (teal/borde).
- **Suggested command:** `/impeccable layout` (o `/impeccable harden` si el foco es a11y de estado)

### [P2] TOC móvil: 8 opciones en grilla antes del stream
- **Why it matters:** Decisión >4 en persona fatigada; frena el primer párrafo.
- **Fix:** TOC colapsable (“Ver mapa”) o 3–4 hitos + resto.
- **Suggested command:** `/impeccable adapt`

### [P2] Companion en hero puede competir con intención “mapa”
- **Why it matters:** Off-ramp útil; quien busca mapa crónico puede sentir que el producto duda de su elección.
- **Fix:** Bajar companion bajo la figura o junto al índice; hero 100% mapa.
- **Suggested command:** `/impeccable layout`

### [P3] Sugerencias del productMoment parecen chips accionables
- **Why it matters:** Falsa affordance.
- **Fix:** Tipografía de ejemplo clara, o enlazar a anclas / brief.
- **Suggested command:** `/impeccable clarify`

---

## Cognitive Load

**Fallos: 6/8** — carga alta en cierre + TOC móvil; stream medio más manejable.

**Decision points >4:** índice (8); further (6); racimo related+CTA+back.

---

## Persona Red Flags

**Jordan:** Hero largo + companion + TOC 8 en móvil antes de leer → abandono o salto a brief sin entender el mapa.  
**Casey:** Sticky ayuda en desktop; sin activo pierde el lugar; further×6 = menú, no siguiente paso.  
**Sam:** Falta anuncio de sección actual; APA muro antes del CTA.  
**Mapa seeker (insomnio crónico):** Contenido acertado; el cierre lo empuja otra vez a tip-lists; quiere “dónde estoy” + un siguiente paso, no seis puertas.

---

## Minor Observations

- Eyebrow “Guía” vs índice “Mapa”.
- Capítulos 02 (5 bullets) y ejercicio 06 (6 pasos) rozan chunking.
- La brief reciproca con further×1 al mapa; el mapa no.
- `readingMinutes: 12` honestos; valle TCC-I largo.

---

## Questions to Consider

1. ¿El primer CTA debería ser “dónde estás en el ciclo” en vez de “ve a la guía práctica”?
2. ¿El muro APA antes del CTA es confianza o ansiedad académica?
3. ¿8 entradas siempre visibles, o 4 actos con subanclas?
4. ¿El productMoment debería cerrar tras “Cuándo pedir evaluación” en vez de interrumpir entre TCC-I y el ejercicio?
