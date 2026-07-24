---
name: proceso-diseno
description: Proceso (SOP) para tareas de diseño y arquitectura en el proyecto Anto. Guía cómo pasar de un requerimiento a una propuesta: entender el estado actual, alinear con producto, plantear opciones con tradeoffs, decidir y validar. Actívala al proponer diseños de sistema o de features, evaluar cambios estructurales, elegir entre alternativas de arquitectura o revisar decisiones de diseño.
---

# Proceso de diseño y arquitectura — Anto

SOP para convertir un requerimiento en una propuesta de diseño o arquitectura sólida y coherente con el proyecto. Sigue estos pasos en orden; no saltes al código sin haber entendido el contexto y planteado opciones.

## Cuándo usar

- Al diseñar una feature nueva o un cambio estructural.
- Al elegir entre alternativas de arquitectura o evaluar tradeoffs.
- Al revisar una decisión de diseño existente.
- Al definir el alcance de un cambio no trivial.

## Skills relacionadas (léelas primero)

- `narrativa-producto-anto`: propósito, promesa y principios que toda decisión debe respetar.
- `arquitectura-codigo`: dónde vive cada cosa y patrones del repositorio.
- `i18n-bilingue`: reglas de contenido bilingüe y español neutro.

## Paso 1 — Entender el requerimiento

- Reformula el problema y el resultado esperado en una o dos frases.
- Identifica al usuario y el momento de uso (crisis, desahogo, primeros pasos, etc.).
- Lista supuestos y restricciones explícitas. Si algo es ambiguo, indícalo y elige un supuesto razonable documentándolo (modo autónomo: no bloquees por detalles menores).

## Paso 2 — Mapear el estado actual

- Explora el código relevante antes de proponer: rutas en `app/`, componentes en `components/`, lógica en `lib/`, estilos en `styles/`.
- Identifica qué ya existe y se puede reutilizar (helpers, hooks, copy, invariantes).
- Documenta el estado actual brevemente: qué hay, cómo funciona, qué falta.

## Paso 3 — Alinear con producto

Verifica que la dirección propuesta respete la narrativa de Anto:

- ¿Refuerza la promesa "nunca vuelves a empezar desde cero" (continuidad, memoria)?
- ¿Deja al usuario con menos intensidad emocional, más claridad y un siguiente paso?
- ¿Respeta los 7 principios (usuario primero, comprender antes que responder, no juzgar, acompañar sin reemplazar, privacidad/confianza)?

## Paso 4 — Plantear opciones con tradeoffs

- Presenta **al menos dos opciones** viables cuando la decisión no sea trivial.
- Para cada una: descripción, impacto en arquitectura (qué módulos/servicios cambian, qué se persiste), complejidad, riesgos y efecto en UX/producto.
- Sé concreto sobre alcance técnico (componentes/subsistemas afectados, invasividad, dependencias). No estimes tiempo en días/semanas.

## Paso 5 — Recomendar y decidir

- Recomienda una opción y justifica por qué es la mejor según producto + arquitectura + costo/riesgo.
- Respeta las convenciones existentes (thin wrappers, copy en `lib/i18n/copy/`, CSS global con tokens, alias `@/…`, paridad es/en).
- Prefiere reutilizar patrones existentes antes que introducir nuevos. Si introduces un patrón nuevo, justifícalo.
- Para cambios de alcance o acciones destructivas, confirma antes de ejecutar.

## Paso 6 — Definir el plan de implementación

- Divide en pasos accionables y verificables.
- Anota los puntos de integración obligatorios: paridad de rutas es/en, registro en `lib/seo/indexable-routes.ts` y `lib/seo/metadata-paths.ts`, invariantes en `lib/*/invariants.ts`.
- Identifica qué validadores (`scripts/validate-*.ts`) cubren el cambio o si hace falta uno nuevo.

## Paso 7 — Validar

- Ejecuta `npm run validate` (incluye `validate:landing` + `type-check`) y `npm run build` cuando aplique.
- Verifica paridad es/en y estilo de texto (español neutro, sin voseo ni modismos).
- Para cambios de UI, revisa el resultado renderizado en desarrollo (`npm run dev`).

## Principios del proceso

- Comprender antes de proponer; explorar el código antes de escribir.
- Coherencia sobre novedad: sigue los patrones del repositorio.
- Decisiones explícitas: opciones, tradeoffs y una recomendación justificada.
- Nada sin bilingüe ni sin validación: cada entrega respeta es/en y pasa los validadores.
