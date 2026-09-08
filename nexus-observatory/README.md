# Nexus Observatory

El observatorio vive ahora en el sitio Anto:

1. `/nexus` → enlace **ingreso desarrolladores**
2. `/nexus/ingreso` → login de operador
3. `/observatorio` → dashboard

Esta carpeta queda como prototipo local aislado (puerto 3100). La superficie canónica es la del repo principal.

No publicar como app independiente. No indexar.

## Cómo ejecutar (prototipo aislado)

```bash
cd nexus-observatory
npm install
npm run dev
```

Comprobación de tipos: `npm run type-check`.

## Estructura

- `app/` vistas Next.js (Resumen, En vivo, Decisiones, Cortex, Roadmap)
- `components/` shell y vistas. No contienen fixtures.
- `lib/data/types.ts` contratos canónicos (`TraceEnvelope`, `DecisionRecord`, `ExperiencePlan`, `OutcomeEvent`, `ReviewCase`, estados, programa)
- `lib/data/fixtures/` datos simulados
- `lib/data/adapters/` `simulated` (activo), `http`, `sse`, `mongodb` (stubs)
- `lib/data/source.ts` única puerta de datos para la UI
- `lib/simulation/` reloj y spans en vivo
- `app/globals.css` tokens Anto y layout Operate

## Dónde están los datos simulados

- Escenarios: [`lib/data/fixtures/scenarios.ts`](lib/data/fixtures/scenarios.ts)
- Programa / sprints / LG0-LG6: [`lib/data/fixtures/program.ts`](lib/data/fixtures/program.ts)
- Métricas, evals, hipótesis, reviews: [`lib/data/fixtures/observatory.ts`](lib/data/fixtures/observatory.ts)

Toda la interfaz muestra **Modo simulación**. Cada campo lleva provenance `simulated`, `unavailable` o `derived`.

## Cómo conectar eventos reales

1. El dashboard no consulta procesos analíticos pesados ni el warehouse de Cortex.
2. Publica vistas derivadas (snapshots) desde el plano operacional / trace store.
3. Implementa `ObservatoryDataSource` en un adaptador y cámbialo en `getDataSource()`.

| Adaptador | Uso |
| --- | --- |
| `http` | `GET /v1/observatory/snapshot` y recursos por ID |
| `sse` | proyección de `TraceEnvelope` y `ComponentStatus` |
| `mongodb` | no leer Mongo en la UI; leer projectors / outbox |

IDs de unión: `trace_id`, `decision_id`, `plan_id`, `event_id`. Contenido de conversación off por defecto.

## Instrumentación mínima que necesita Cortex

Para que este observatorio deje de ser demostrativo hace falta, en runtime:

1. `TraceEnvelope` por turno, `content_mode: off`, spans del modelo de traza del documento maestro.
2. Version registry (policy, prompts, modelos, schemas).
3. Tabla cerrada de superficies (`registered_http|sse|socket`, `guest_http`).
4. Encolar Eval Mesh **después** de `delivery`. Nunca bloquear TTFT.
5. `DecisionRecord` estructurado (Sprint 7): candidatos, constraints, evidence IDs, scores, incertidumbre, códigos de descarte. Sin chain-of-thought.
6. `OutcomeEvent` con horizonte, fuente y missingness. Engagement en Tier 4, nunca como beneficio.
7. `ReviewCase` cuando hay cluster, drift, autonomy guardrail o claim IG2/IG3.

## Qué sigue siendo demostrativo

- Los seis escenarios y sus scores
- Cola de evals, lag, drift y autonomía
- Beneficial Autonomy y cobertura de traza (marcadas no disponibles)
- DecisionRecord / ExperiencePlan como si existieran en producción (en el programa son Sprints 7-8)
- Este propio dashboard (Sprint 1 pide un dashboard baseline; esta app es un observatorio local, no el dashboard de producción)

## Privacidad

Identificadores `usr_sim_*`. Mensajes minimizados. Sin registro público. `robots: noindex`.
