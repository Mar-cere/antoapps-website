---
name: Anto
description: Anto Nexus esencial. Calmado, plano y premium. Un acento periwinkle sobre papel o carbón.
colors:
  primary: "#6868DF"
  primary-bright: "#A5A4FF"
  primary-on-dark: "#A5A4FF"
  primary-bright-on-dark: "#C4C3FF"
  on-primary: "#FFFFFF"
  on-primary-dark: "#101216"
  bg: "#FAFAFC"
  bg-dark: "#101216"
  surface: "#FFFFFF"
  surface-dark: "#191D24"
  text: "#121722"
  text-dark: "#F4F6FC"
  text-secondary: "rgba(18, 23, 34, 0.64)"
  text-secondary-dark: "rgba(244, 246, 252, 0.72)"
  text-muted: "rgba(18, 23, 34, 0.48)"
  text-muted-dark: "rgba(244, 246, 252, 0.48)"
  hairline: "#D2D6DE"
  hairline-dark: "rgba(244, 246, 252, 0.12)"
  input: "#EEEFF3"
  input-dark: "rgba(244, 246, 252, 0.08)"
  bubble: "#FFFFFF"
  bubble-dark: "#1F242C"
  warm: "#E89BB8"
  indigo: "#5B4BD4"
  indigo-dark: "#8B7FE8"
  error: "#FF6B6B"
  success: "#4CAF50"
  warning: "#B8750A"
  warning-dark: "#F0C14A"
  overlay: "rgba(18, 23, 34, 0.42)"
  overlay-dark: "rgba(0, 0, 0, 0.65)"
typography:
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: normal
  subtitle:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: normal
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: normal
  caption:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: normal
  small:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: normal
  eyebrow:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.08em
  scale:
    marketing-title: 32px
    marketing-display: 40px
    marketing-brand: 48px
rounded:
  block: 12px
  hero: 22px
  pill: 999px
spacing:
  xs: 4px
  sm: 8px
  screen: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  card: 10px
  field: 12px
  hero: 16px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
    padding: 12px 16px
    typography: "{typography.body}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    padding: 12px 16px
    typography: "{typography.body}"
  button-destructive:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.error}"
    rounded: "{rounded.pill}"
    padding: 12px 16px
    typography: "{typography.body}"
  chip-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
    padding: 10px 12px
    typography: "{typography.caption}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.block}"
    padding: 10px
  input:
    backgroundColor: "{colors.input}"
    textColor: "{colors.text}"
    rounded: "{rounded.block}"
    padding: 12px
    typography: "{typography.body}"
---

# Design System: Anto

## Overview

**Creative North Star: "Una mesa quieta, un solo acento."**

Anto Nexus esencial es calmado en la materia y editorial en la página. El fondo es papel o carbón, sin atmósfera pintada. La voz de color es un periwinkle. La tipo es la sans del sistema, con aire y una jerarquía corta: eyebrow, título, cuerpo, meta.

Nexus es el motor interno. En la interfaz no aparece el wordmark «Nexus». La marca visible es el símbolo M1 Möbius, entero. La materia es plana y de un solo acento. La composición no es una plantilla de una o dos columnas: cambia de ritmo, de escala y de encuadre. El movimiento es visible y profesional, y se apaga con reducción de movimiento.

La web de marketing cuenta con fotografía cotidiana y copy observacional. Esa narrativa usa la misma materia: mismas superficies, mismo periwinkle, misma sans, mismos radios.

**Key Characteristics:**

- Fondo plano, igual en el inicio y el fin del gradiente.
- Un acento periwinkle; índigo y rosa solo como apoyo puntual.
- Cards opacas con hairline, sombra casi nula.
- Cápsula en pills, chips y CTAs; 12 px en bloques e inputs.
- La página no nace como una columna ni como dos columnas iguales.
- Controles a escala 0.95; la composición entra, se desplaza o recorta con intención. Sin partículas ni orbitales.

## Colors

Periwinkle sobre neutros fríos. El mismo rol cambia de valor entre claro y oscuro; no se inventa un tercer acento para el tema.

### Primary

- **Periwinkle** (`#6868DF` claro, `#A5A4FF` oscuro): botones primarios, pill seleccionada, enlaces, tinte de icono de fila.
- **Periwinkle brillante** (`#A5A4FF` claro, `#C4C3FF` oscuro): hover y énfasis sobre el primario, sin gradiente.
- **Texto sobre primario** (`#FFFFFF` claro, `#101216` oscuro).

### Secondary

- **Índigo** (`#5B4BD4` claro, `#8B7FE8` oscuro): apoyo secundario, no el CTA principal.
- **Cálido** (`#E89BB8` en ambos temas): un acento de calidez, raro.

### Tertiary

- **Éxito** (`#4CAF50`), **error** (`#FF6B6B`), **aviso** (`#B8750A` claro, `#F0C14A` oscuro): solo estado.

### Neutral

- **Papel** (`#FAFAFC`) y **carbón** (`#101216`): fondo plano.
- **Superficie** (`#FFFFFF` / `#191D24`): cards. La burbuja de Anto en oscuro es `#1F242C`, un paso sobre el carbón.
- **Tinta** (`#121722`) y **marfil** (`#F4F6FC`): texto.
- **Secundario** (tinta al 64 % / marfil al 72 %) y **atenuado** (48 % en ambos).
- **Hairline** (`#D2D6DE` / marfil al 12 %).
- **Input** (`#EEEFF3` / marfil al 8 %).
- **Overlay de modal** (tinta al 42 % / negro al 65 %).

**The Flat Ground Rule.** El fondo no degrada. Si existe un token de gradiente, sus dos extremos son el mismo papel o el mismo carbón.

**The One Periwinkle Rule.** En una pantalla, el acento de acción es el periwinkle. Índigo, rosa, éxito, error y aviso no compiten con el botón primario.

## Typography

**Display Font:** sans del sistema (SF Pro / system-ui)
**Body Font:** la misma sans
**Label/Mono Font:** la misma sans; no hay mono de marca ni serif

**Character:** Clara, con aire, pesos 400 y 600. La expresión está en el tamaño y el tracking del eyebrow, no en una familia distinta.

### Hierarchy

- **Title** (600, 24 px): título de pantalla. En marketing el titular puede subir a 32, 40 o 48 px, sin cambiar de familia.
- **Subtitle** (600, 18 px): subtítulo.
- **Body** (400, 16 px): cuerpo e inputs.
- **Caption** (400, 14 px): meta y hints.
- **Small** (500, 12 px): badges y labels.
- **Eyebrow** (600, 11–13 px, mayúsculas, tracking 1.2–1.6, color atenuado): encima del título.
- **Título de fila** (600, 16 px) y **meta de fila** (400, 13 px, color secundario).
- **Hero de continuidad** (22–28 px): solo tipo, sin ilustración de fondo.

**The System Sans Rule.** No se introduce serif, display ni una segunda familia. La jerarquía de lectura es eyebrow, título, cuerpo, meta.

## Layout

Gutter horizontal de pantalla 12 px. Si el scroll ya lo tiene, los hijos no lo repiten. Dentro de la card, 10 px. Campos, 12 px. Chips y CTAs, 10 o 12 px. Heroes y superficies generosas, 14 o 16 px. Ritmo 4, 8, 16, 24, 32, 48.

Inicio es un tablero de continuidad: wordmark, saludo, check-in 2×2, continuidad, un paso, un hilo, racha. Mi día es un solo scroll con pills y tira semanal. Explorar abre con título a 24; en la web las herramientas no se quedan en una grilla pareja de dos columnas. Ajustes abre con título a la izquierda, sin botón atrás. Chat, ajustes y listas de tarea siguen siendo listas.

En marketing, el shell puede abrirse hasta el ancho editorial de la página; la medida de lectura sigue siendo solo para la prosa. Desde 768 px cada tramo cambia de familia: corte asimétrico, figura a sangre, tipo superpuesto, bloque desplazado, banda horizontal o acompañante sticky. Dos columnas iguales, como máximo una vez. La recomposición no autoriza otro color ni otro tipo.

Con barra flotante, el scroll reserva 132 px más el inset del sistema.

**The Uneven Page Rule.** Una página editorial no es un tubo de una columna ni una repetición de dos columnas iguales. La prosa conserva su medida; la página cambia de escala y de corte.

El movimiento tiene dos capas. Los controles responden en unos 120 ms, con presión a escala 0.95, sin rebote. La página puede entrar por líneas, revelar una figura con opacidad y un desplazamiento corto, o responder al hover con recorte o escala mínima, en 480–700 ms y una sola vez. `prefers-reduced-motion` apaga las dos capas. No hay bucle, parallax fuerte, cursor propio ni 3D.

**The Professional Motion Rule.** La animación se nota y no adorna. Si no cambia la lectura o el estado, no está.

## Elevation & Depth

La profundidad es un cambio de superficie, no una sombra. La card es superficie opaca más hairline. En claro, la sombra si existe queda en opacidad 0.08 o menos. El header sticky es opaco, con hairline inferior. El modal apoya su superficie sobre el overlay. El glass no es fondo de card: solo aparece si el sistema pide desenfoque en la barra flotante.

**The Flat Surface Rule.** No hay elevation de Material, ni vidrio de card, ni glow ambiental.

## Shapes

Bloques, inputs y wraps de icono usan 12 px. El hero y la pastilla de navegación llegan a 20–22 px. Pills, chips y CTAs son cápsula (999 px). El símbolo M1 no se recorta en círculo.

**The Capsule Control Rule.** Lo que se pulsa como acción principal es cápsula. Lo que contiene contenido es bloque de 12 px.

## Components

### Buttons

- **Shape:** cápsula (999 px).
- **Primary:** fondo periwinkle, texto sobre primario, padding 12 px.
- **Hover / Focus:** primario brillante; anillo de foco visible. Presión a escala 0.95.
- **Secondary:** superficie y borde de acento.
- **Destructive:** rojo suave con borde de peligro.

### Chips

- **Style:** cápsula, padding 10 o 12 px.
- **State:** la pill seleccionada lleva tinte del primario, borde primario y texto primario en peso 600.

### Cards / Containers

- **Corner Style:** 12 px.
- **Background:** superficie del tema, casi opaca.
- **Shadow Strategy:** mínima o nula.
- **Border:** hairline.
- **Internal Padding:** 10 px.

### Inputs / Fields

- **Style:** fondo de input, radio 12, texto de cuerpo a 16 px.
- **Focus:** borde primario.
- **Error:** texto y borde de error, sin lenguaje punitivo.

### Navigation

Cinco pestañas con etiqueta: Inicio, Mi día, Anto, Explorar, Ajustes. Anto es un icono de chat, no el logo recortado. La pastilla de navegación puede llegar a 20–22 px. El header sticky es opaco.

Lista agrupada: overflow oculto, fila de al menos 68 px, separador hairline, icono 44×44 con radio 12 sobre un tinte suave del primario. Los sheets de selección ocupan el ancho de pantalla.

Chat: atrás, M1, «Anto» y menú. Como máximo una card de paso por turno. El campo es una cápsula. El pie «Anto puede equivocarse.» vive dentro del dock.

### Marca

Inicio usa el wordmark anto con el punto violeta. Chat, onboarding, paywall, FAQ y carga usan el M1 entero. Bienvenida y Sobre Anto usan la firma horizontal o apilada.

## Do's and Don'ts

### Do:

- **Do** usar periwinkle sólido en el botón primario y texto sobre primario del tema activo.
- **Do** dejar el fondo plano, la card con hairline y la sombra en opacidad 0.08 o menos en claro.
- **Do** mantener la sans del sistema y la escala 24 / 18 / 16 / 14 / 12.
- **Do** apagar el movimiento corto con `prefers-reduced-motion`.
- **Do** mostrar el M1 entero donde la marca es símbolo, y el wordmark anto en Inicio.

### Don't:

- **Don't** mostrar el wordmark «Nexus» en la interfaz.
- **Don't** usar teal `#1adddb`, navy `#030a24`, glass de card, gradiente lila-azul, partículas, orbital SVG ni elevation alta.
- **Don't** introducir serif editorial ni hex sueltos fuera de estos roles.
- **Don't** recortar el M1 en un círculo ni poner el logo en la pestaña Anto.
- **Don't** repetir el gutter de 12 px dentro de un scroll que ya lo tiene.
