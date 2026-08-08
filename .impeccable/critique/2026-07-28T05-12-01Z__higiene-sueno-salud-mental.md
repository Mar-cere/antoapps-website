---
target: /recursos/higiene-sueno-salud-mental
total_score: 26
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
timestamp: 2026-07-28T05-12-01Z
slug: higiene-sueno-salud-mental
---
Method: dual-agent (A: 6b224214-0e5a-40df-b20d-8cc373a5ff7b · B: fab44d9b-1d84-48a2-8f2e-f7a6131c089a)
Target: /recursos/higiene-sueno-salud-mental (layout brief)
Design Read: guía psicoeducativa breve Anto (modo Read), trust-first, dials 5/3/3 preserve.
Editorial score: 8/10

#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Crumb + 6 min OK; cookie sticky tapa cierre |
| 2 | Match System / Real World | 4 | Copy 3am / ritual / voz Anto |
| 3 | User Control and Freedom | 3 | Salidas claras; cookie exige decisión en el peak-end |
| 4 | Consistency and Standards | 3 | Brief 1-col coherente; outro aviso↔CTA distinto <960px |
| 5 | Error Prevention | 3 | Límites + crisis + qué no es esto |
| 6 | Recognition Rather Than Recall | 4 | Pasos claros; ejemplos ya no parecen tappable |
| 7 | Flexibility and Efficiency | n/a | Lectura lineal, no tarea experta |
| 8 | Aesthetic and Minimalist Design | 3 | Apertura limpia; cierre further×3 + aviso + CTA + APA + cookie |
| 9 | Error Recovery | 3 | Pedir ayuda / crisis claros |
| 10 | Help and Documentation | n/a | La página es la ayuda |
| **Total** | | **26/32** | **Good** |

#### Design Specificity Verdict

**LLM:** Específica de Anto. Masthead (título + pull 3am + foto cotidiana), ritual ecoado por el chat, teal `#1adddb`, layout brief en columna. No clínica SaaS ni wellness pastel. Los P1 previos aterrizan: producto debajo, companion fuera del hero, CTA antes de APA, chips itálicos, nav «Apoyo».

**Deterministic scan:** `detect.mjs` sobre `PsychoeducationGuidePageContent.tsx` y `es.ts` → 0 findings (exit 0). Detect por URL no disponible (`puppeteer` completo no instalado).

**Visual overlays:** no disponibles (MCP tabs inestables; no live-server / detect.js). Fallback HTTP + Chrome headless confirma: `psycho-guide--brief`, sin companion, flex column producto bajo ritual, orden further → outro → refs `--after-cta`, nav «Apoyo», chips italic sin pill.

#### Overall Impression
De 24/32 a 26/32: el brief ya se siente brief. Mayor oportunidad restante: salvar el peak-end móvil (cookie + orden aviso/CTA) y aligerar further/APA como último recuerdo.

#### What's Working
1. Masthead editorial-emocional completo sin fuga al mapa
2. Ritual → producto en columna (eco narrativo, no split SaaS)
3. Chips como ejemplos tipográficos; nav «Apoyo» alineada al tono

#### Priority Issues
1. **[P1] Cookie sticky en peak-end** — tapa CTA/further; doble teal Apoyo/Aceptar. Fix: no tapar `.psycho-guide__cta` o defer banner. Suggested: `/impeccable polish`
2. **[P1] Outro móvil: Aviso antes del CTA** — `order` solo ≥960px. Fix: CTA → aviso en todos los breakpoints. Suggested: `/impeccable layout`
3. **[P2] «Ir más a fondo» diluye «esta noche»** — 3 links densos antes del cierre. Fix: 1 mapa sueño + resto después o colapsado. Suggested: `/impeccable distill`
4. **[P2] APA como último recuerdo** — tipografía aún muro clínico. Fix: `<details>` o tipografía más quieta. Suggested: `/impeccable quieter`
5. **[P3] Caption desktop bajo fold** — figura 3/2. Suggested: `/impeccable layout`

#### Persona Red Flags
- Jordan 3am: apertura OK; cierre empuja mapas + cookie antes de Apoyo
- Casey móvil: cookie + aviso delante del CTA; dos teals sticky
- Sam: refs post-CTA ayudan trust; muro APA EN aún frío

#### Minor Observations
- relatedSlugs [] correcto
- Medida 42–44rem coherente con Read
- Sticky header Apoyo + sticky cookie = dos superficies teal fijas

#### Questions to Consider
1. Si el brief es «esta noche», ¿por qué el cierre empuja tres mapas antes de bajar el volumen?
2. ¿El último pixel debería ser el CTA o un DOI de Sleep Medicine Reviews?
3. ¿Por qué el Aviso gana al puente emocional solo en móvil?
4. ¿Qué recuerda alguien a las 3:10: el pull quote, o «Aceptar» cookies?
