---
target: "https://antoapps.com/recursos/higiene-sueno-salud-mental"
total_score: 23
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 2
timestamp: 2026-07-27T21-50-44Z
slug: higiene-sueno-salud-mental
---
Method: dual-agent (A: ba4c569b-f9c1-42c6-9256-a82e75c8a23b · B: 11c13594-c2b8-43a8-ab0a-53f91b4d7183)
Design Read: guía psicoeducativa marketing Anto (modo Read), trust-first calmado, dark + teal + tipografía del sistema; dials 5/3/3 preserve.
Editorial score (Anto): 3.5/10

#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | «7 min de lectura» inflado vs cuerpo corto (~4 bloques) |
| 2 | Match System / Real World | 2 | Léxico clínico/wellness: higiene, protocolo, bienestar, especialista |
| 3 | User Control and Freedom | 3 | Breadcrumb + Volver claros; cookie puede competir en mobile |
| 4 | Consistency and Standards | 2 | Mismo shell que guías ricas, pero sin figure/pull/productMoment |
| 5 | Error Prevention | 3 | Disclaimer médico presente |
| 6 | Recognition Rather Than Recall | 2 | «Protocolo / hub de técnicas» sin enlaces; checklist sin priorizar |
| 7 | Flexibility and Efficiency | 2 | Sin índice/anclas; skim débil |
| 8 | Aesthetic and Minimalist Design | 2 | Minimalismo por omisión: grid 2-col sobre vacío, sin ancla visual |
| 9 | Error Recovery | 3 | Disclaimer + related mitigan malentendido tratamiento |
| 10 | Help and Documentation | 2 | Momento producto muerto; cierre frío |
| **Total** | | **23/40** | **Needs Work** |

#### Design Specificity Verdict

**LLM:** Sin nav/eyebrow, la página es un folleto de higiene del sueño dark-mode intercambiable (clínica, Headspace, blog público). Tokens Anto (dark + teal) son piel; composición y foto no existen. Título clínico + CTA «bienestar» empujan anti-references. Guías hermanas (distorsiones) sí llevan figure + pullQuote + productMoment; este slug es stub.

**Deterministic scan:** detect.mjs en PsychoeducationGuidePageContent.tsx + shells → `[]`, exit 0. Sin hallazgos mecánicos.

**Visual overlays:** Inyección detect.js no disponible en producción (tabs MCP inestables en Assessment B). Fallback: HTML 200, jerarquía 1 h1 / 5 h2, 0 figure en DOM, logos decorativos alt vacío OK, enlaces same-origin 200.

#### Overall Impression

Craft de tokens, no de dirección. El subtítulo es honesto; el resto es checklist clínico sin escena nocturna ni producto. Oportunidad única: el sueño es hiper-visual (cama, luz tenue, 3am) y la página no lo usa.

#### What's Working

1. Subtítulo trust-first: «Dormir mejor no cura todo…»
2. Sección «Si la mente no para»: ritual concreto (papel / 4-7-8 / no móvil)
3. Shell técnico coherente: dark + teal, CTA legible, disclaimer presente

#### Priority Issues

1. **[P0] Sin fotografía editorial** — Why: sin ancla visual la dirección editorial-emocional no arranca; tema noche/cama desperdiciado. Fix: figure cotidiana (luz tenue, cama, ventana) + caption observacional como en distorsiones. Suggested: `/impeccable bolder` o shape de contenido + layout.
2. **[P0] Especificidad de marca ~0** — Why: contenido intercambiable; inconsistente vs guías ricas. Fix: pullQuote + productMoment (viñeta chat higiene sueño) + enriquecer secciones. Suggested: `/impeccable shape` / clarify + delight.
3. **[P1] CTA y protocolo muertos** — Why: «Herramientas de bienestar» + párrafo Protocolo sin enlace. Fix: renombrar CTA (acompañamiento / empezar) + enlace real o chat. Suggested: `/impeccable clarify`.
4. **[P1] Cuerpo demasiado fino vs «7 min»** — Why: sensación stub SEO. Fix: ampliar con puente emoción↔sueño, cuándo pedir ayuda, límites. Suggested: `/impeccable clarify` + distill selectivo.
5. **[P2] Peak-end frío + related clínico** — Why: cierre Aviso + bienestar + PHQ-9/GAD-7. Fix: related más afines (ansiedad OK; reconsiderar scales) + cierre emocional. Suggested: `/impeccable quieter` / polish.

#### Persona Red Flags

- **Jordan (primera visita, 3am):** checklist clínico sin escena; Protocolo sin cómo entrar.
- **Sam (entre sesiones):** disclaimer OK; salto a escalas clínicas + «higiene» suena folleto CESFAM.
- **Riley (escépticx wellness):** CTA «bienestar» + dark sin foto = otra app self-care.

#### Minor Observations

- Grid 2-col con 4 bloques cortos deja aire muerto (CSS genérico, no composición).
- readingMinutes: 7 vs contenido real ~2–3 min.
- OG title usa «bienestar emocional» (alineado al anti-pattern wellness).
- Skip link ausente en SSR (menor; no bloquea lectura).

#### Questions to Consider

1. Si se publica sin la palabra Anto, ¿alguien la atribuiría a ustedes?
2. ¿Por qué las guías estrella tienen foto + pull + chat y el sueño no?
3. ¿El CTA correcto es «bienestar» o acompañamiento entre sesiones?
4. ¿«Higiene del sueño» es el título de las 3am o de un PDF clínico?
