---
target: home-v2 homepage ES/EN
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
timestamp: 2026-08-11T16-39-28Z
slug: app-home-v2-page-tsx
---
# Critique: home-v2 (/, /en)

Method: dual-agent (A: d8aab6fa-e978-4a47-b9d9-8f66a7b8823c · B: cbe07d2e-2cb2-4f88-970e-aa94125f3ad0)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Landing estática; cookie/nav; sin feedback de descarga |
| 2 | Match System / Real World | 4 | Voz cotidiana, escenas, chat vivido |
| 3 | User Control and Freedom | 3 | Scroll libre; cookie sticky reduce libertad en móvil |
| 4 | Consistency and Standards | 3 | Tokens coherentes; doble ruta Android (pair vs sección) |
| 5 | Error Prevention | 3 | Límites claros; precios 3 meses fáciles de malinterpretar |
| 6 | Recognition Rather Than Recall | 4 | Producto mostrado en paneles |
| 7 | Flexibility and Efficiency | n/a | Persuade landing |
| 8 | Aesthetic and Minimalist Design | 3 | Editorial fuerte; embudo largo + CTAs múltiples |
| 9 | Error Recovery | 2 | Poco recoverable en handoff a store |
| 10 | Help and Documentation | n/a | Persuade; FAQ es trust no help in-product |
| **Total** | | **24/32** | **Good (75%)** |

Editorial aesthetic (editorial-emotional): **7.5/10**

## Design Specificity Verdict

**Authored for Anto** — brand teal + H1 observacional + foto nocturna + chat vignette no sobreviven a un logo swap genérico.

**LLM:** Coherente, preserve-worthy. Riesgo residual SaaS si se quitan foto/copy (chrome de paneles + pricing 4 tiers).

**Deterministic scan:** detect.mjs sobre 12 TSX HomeV2 → `[]`, exit 0, 0 findings.

**Visual overlays:** No disponibles (sin browser MCP). Evidencia visual: capturas `tmp/home-v2-critique` (parcialmente desfasadas vs source actual con PremiumStoreCtaPair).

## Overall Impression

Home con voz y composición editorial reales. El mayor gap es el cierre: CTA dual, foto evening reutilizada, Explore tras Final CTA, cookie compitiendo en móvil.

## What's Working

1. H1 + Recognize avanzan escena (no eco).
2. Paneles producto (distortion / evidence / privacy) sin grid de feature cards.
3. Still: una foto + una línea, dial-faithful.

## Priority Issues

**[P1] Dual store CTAs vs hero budget** — PremiumStoreCtaPair en hero/pricing/final; diluye foco. Fix: un store primario en hero; Play en #android. → distill/clarify

**[P1] Peak-end diluido + reuse evening** — Explore después de Final CTA; misma foto hero/final. Fix: Final CTA como último beat; imagen distinta. → layout

**[P1] Cookie sticky vs conversión móvil** — banner sobre CTAs. Fix: no cubrir #precios; umbral/timing. → adapt/polish

**[P2] Hero support overweight** — definición + límite clínico; repetido en FAQ/coda. → clarify

**[P2] Late-funnel choice overload** — 4 planes + stores + Android + FAQ + Explore. → distill

**[P3]** Disclaimer evidence contraste bajo; “8 protocolos clínicos” tono SaaS.

## Persona Red Flags

**Jordan:** dos significados de Descargar; support largo + 2 stores.
**Casey:** cookie en zona pulgar; CTAs altos.
**Riley:** página larga + pricing bajo estrés.
**Maya:** privacidad fuerte pero cookie analítica antes; Explore “iPhone” con Android vendido.

## Minor Observations

- ES/EN paridad estructural buena.
- Capturas Jul21: “Acceso anticipado Android”, cookie púrpura — source actual distinto.
- PullToRefresh reload en marketing.

## Questions

1. ¿Hero solo App Store o dual siempre?
2. ¿Explore después del cierre o arriba/footer?
3. ¿“8 protocolos clínicos” se queda?
