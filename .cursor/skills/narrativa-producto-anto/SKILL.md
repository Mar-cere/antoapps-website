---
name: narrativa-producto-anto
description: Contexto de producto y de empresa de Anto (propósito, promesa, principios, visión, misión y voz). Úsala como base para decisiones de diseño y arquitectura, definición de features, propuestas de UX/UI, copys y priorización, para que cada decisión se alinee con la identidad de Anto. Actívala al proponer diseños de sistema, evaluar tradeoffs de arquitectura, agregar servicios o módulos, diseñar flujos de usuario o redactar contenido del producto.
---

# Narrativa de producto — Anto

Esta skill resume la narrativa oficial de Anto y la traduce en criterios accionables para diseño y arquitectura. Consúltala antes de proponer soluciones, para anclar cada decisión en el propósito, la promesa y los principios de la empresa.

## Cuándo usar

- Al proponer o revisar diseños de sistema, límites de módulos o nuevos servicios.
- Al evaluar tradeoffs de arquitectura (dónde vive el estado, qué se persiste, qué se recuerda).
- Al diseñar flujos de usuario, features o pantallas (UX/UI).
- Al redactar copys, mensajes del producto o contenido de marketing.
- Al priorizar el backlog o resolver disyuntivas de alcance.

## Qué es Anto

Anto es un sistema de **acompañamiento emocional continuo**. Ocupa el espacio intermedio entre no tener con quién hablar y la terapia profesional: un lugar para desahogarse, entender lo que se siente y recibir orientación inspirada en principios de la psicología, cuando más se necesita.

- **No** reemplaza a un profesional de salud mental.
- **No** es un simple chatbot que responde solo al presente.
- **Sí** convierte la reflexión en pasos concretos y aprende del proceso de cada persona.

## El problema que resuelve

Las personas llegan por razones distintas: crisis emocionales, desahogo, ruido mental, desarrollo personal, primeros pasos antes de la terapia o falta de acceso económico a ayuda profesional. El punto en común: **no quieren enfrentar ese momento completamente solas.**

## La gran promesa

**"Nunca vuelves a empezar desde cero."**

Cada conversación construye sobre la anterior. Anto recuerda quién eres, lo que has vivido y hacia dónde quieres avanzar. Esta promesa es el eje que toda decisión de diseño y arquitectura debe reforzar, nunca contradecir.

## Cómo se siente usar Anto

Después de una interacción, el usuario debería sentir que:

1. Bajó la intensidad emocional.
2. Entiende mejor lo que vive.
3. Obtuvo una nueva perspectiva.
4. Tiene un siguiente paso claro.

Con el tiempo, el acompañamiento se vuelve más útil porque Anto recuerda conversaciones, avances y patrones.

## Qué lo hace diferente

La mayoría de los asistentes responden únicamente al presente. Anto **construye una relación**: aprende del proceso, recuerda conversaciones anteriores, identifica patrones y convierte conversaciones aisladas en un acompañamiento continuo.

## Visión y misión

- **Visión**: toda persona debería tener las herramientas necesarias para enfrentar su salud mental y emocional de la mejor forma posible.
- **Misión**: construir el mejor sistema de acompañamiento emocional continuo del mundo: uno que comprenda, recuerde, enseñe, acompañe y ayude a las personas a construir una mejor relación consigo mismas.

## Principios de Anto y su implicación en diseño y arquitectura

Cada principio incluye su traducción práctica. Al proponer una solución, verifica que la respete.

1. **El usuario siempre está primero.**
   - Prioriza claridad, calma y control del usuario por sobre la conveniencia técnica o la métrica de negocio.
2. **Comprender antes que responder.**
   - Diseña flujos y modelos de datos que capturen contexto y estado emocional antes de accionar. Evita respuestas genéricas o prematuras.
3. **Cada conversación tiene valor.**
   - La arquitectura debe persistir y aprovechar el historial: memoria, contexto recurrente y continuidad entre sesiones son requisitos, no extras.
4. **Nunca hacer sentir juzgada a una persona.**
   - Tono, copys y estados de error deben ser empáticos y no punitivos. Cuida el lenguaje en validaciones y mensajes del sistema.
5. **Convertir reflexión en acción.**
   - Todo flujo debería terminar en un siguiente paso concreto (tarea, hábito, técnica o recurso).
6. **Aprender del proceso sin perder la confianza del usuario.**
   - Aprendizaje y personalización deben ir de la mano con privacidad, transparencia y seguridad de datos. La confianza es un requisito de diseño.
7. **Acompañar, no reemplazar a un profesional.**
   - Incluye límites claros, derivación y detección de crisis. Nunca posiciones a Anto como diagnóstico o sustituto clínico.

## Checklist rápido antes de proponer una solución

- ¿Refuerza la promesa "nunca vuelves a empezar desde cero" (continuidad y memoria)?
- ¿Deja al usuario con menos intensidad emocional, más claridad y un siguiente paso?
- ¿Respeta los siete principios, en especial no juzgar y acompañar sin reemplazar?
- ¿Cuida la privacidad y la confianza al aprender del proceso?
- ¿El tono y los copys son empáticos, cálidos y neutrales (español neutro, sin modismos)?
