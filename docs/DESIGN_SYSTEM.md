# 🎨 Design System - Anto

Sistema de diseño completo y escalable para la aplicación Anto.

**Última actualización:** Enero 2025

---

## 📋 Tabla de Contenidos

1. [Design Tokens](#design-tokens)
2. [Componentes](#componentes)
3. [Guías de Uso](#guías-de-uso)
4. [Mejores Prácticas](#mejores-prácticas)

---

## 🎨 Design Tokens

### Colores

Los colores están definidos en `styles/tokens/colors.css`:

#### Colores Principales
- `--color-primary`: #1ADDDB (Color principal de la marca)
- `--color-primary-hover`: #1BE8E6 (Estado hover)
- `--color-primary-light`: rgba(26, 221, 219, 0.1) (Fondo sutil)
- `--color-primary-dark`: #15B8B6 (Estado activo)

#### Colores de Estado
- `--color-success`: #4CAF50
- `--color-error`: #FF6B6B
- `--color-warning`: #FFD93D
- `--color-info`: #6BCB77

#### Colores de Texto
- `--color-text-primary`: #FFFFFF
- `--color-text-secondary`: #A3B8E8
- `--color-text-tertiary`: rgba(163, 184, 232, 0.6)

### Espaciado

Sistema de espaciado basado en 4px (definido en `styles/tokens/spacing.css`):

- `--spacing-0` a `--spacing-24`: Espaciado base (0px a 96px)
- `--spacing-xs`: 8px
- `--spacing-sm`: 16px
- `--spacing-md`: 32px
- `--spacing-lg`: 48px
- `--spacing-xl`: 80px

### Tipografía

Definida en `styles/tokens/typography.css`:

#### Font Sizes
- `--font-size-xs`: 12px
- `--font-size-sm`: 14px
- `--font-size-base`: 16px
- `--font-size-lg`: 18px
- `--font-size-xl`: 20px
- `--font-size-2xl`: 24px
- `--font-size-3xl`: 30px
- `--font-size-4xl`: 36px
- `--font-size-5xl`: 48px

#### Font Weights
- `--font-weight-light`: 300
- `--font-weight-normal`: 400
- `--font-weight-medium`: 500
- `--font-weight-semibold`: 600
- `--font-weight-bold`: 700

### Sombras

Definidas en `styles/tokens/shadows.css`:

- `--shadow-xs`: Sombra muy sutil
- `--shadow-sm`: Sombra pequeña
- `--shadow-md`: Sombra media
- `--shadow-lg`: Sombra grande
- `--shadow-xl`: Sombra extra grande
- `--shadow-2xl`: Sombra máxima

### Bordes y Radius

Definidos en `styles/tokens/borders.css`:

- `--radius-sm`: 4px
- `--radius-md`: 8px
- `--radius-lg`: 12px
- `--radius-xl`: 16px
- `--radius-2xl`: 24px
- `--radius-full`: 9999px (círculo completo)

---

## 🧩 Componentes

### Button

Componente de botón con múltiples variantes y tamaños.

**Ubicación:** `components/ui/Button/Button.tsx`

**Variantes:**
- `primary`: Botón principal (fondo cyan)
- `secondary`: Botón secundario (borde cyan, fondo transparente)
- `ghost`: Botón fantasma (sin borde, fondo transparente)
- `link`: Botón como enlace (subrayado)

**Tamaños:**
- `sm`: Pequeño
- `md`: Mediano (default)
- `lg`: Grande

**Ejemplo de uso:**

```tsx
import Button from '@/components/ui/Button';

// Botón primario
<Button variant="primary" size="md">
  Enviar
</Button>

// Botón con icono
<Button variant="secondary" icon={<Icon />} iconPosition="left">
  Descargar
</Button>

// Botón como enlace
<Button variant="link" as="link" href="/contacto">
  Contactar
</Button>

// Botón con loading
<Button variant="primary" loading={isLoading}>
  Guardar
</Button>
```

### Input

Componente de input con validación y estados.

**Ubicación:** `components/ui/Input/Input.tsx`

**Variantes:**
- `default`: Input estándar
- `filled`: Input con fondo sólido
- `outlined`: Input solo con borde

**Tamaños:**
- `sm`: Pequeño
- `md`: Mediano (default)
- `lg`: Grande

**Ejemplo de uso:**

```tsx
import Input from '@/components/ui/Input';

// Input básico
<Input
  label="Email"
  type="email"
  placeholder="tu@email.com"
  required
/>

// Input con validación
<Input
  label="Nombre"
  error={errors.name}
  helperText="Mínimo 2 caracteres"
  leftIcon={<UserIcon />}
/>

// Textarea
<Input
  as="textarea"
  multiline
  label="Mensaje"
  rows={6}
  helperText="Máximo 500 caracteres"
/>
```

### Card

Componente de tarjeta con variantes.

**Ubicación:** `components/ui/Card.tsx`

**Variantes:**
- `default`: Tarjeta estándar
- `elevated`: Tarjeta con sombra
- `outlined`: Tarjeta solo con borde
- `filled`: Tarjeta con fondo sólido

**Tamaños:**
- `sm`: Pequeño
- `md`: Mediano (default)
- `lg`: Grande

**Ejemplo de uso:**

```tsx
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';

<Card variant="elevated" size="md" interactive>
  <CardHeader title="Título" subtitle="Subtítulo" />
  <CardContent>
    Contenido de la tarjeta
  </CardContent>
  <CardFooter>
    <Button>Acción</Button>
  </CardFooter>
</Card>
```

### Modal

Sistema de modales/diálogos.

**Ubicación:** `components/ui/Modal/Modal.tsx`

**Tamaños:**
- `sm`: 400px
- `md`: 600px (default)
- `lg`: 800px
- `xl`: 1000px
- `full`: 95vw x 95vh

**Ejemplo de uso:**

```tsx
import Modal from '@/components/ui/Modal';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirmar acción"
  size="md"
  closeOnOverlayClick
  closeOnEscape
>
  <p>¿Estás seguro de realizar esta acción?</p>
  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
    <Button onClick={() => setIsOpen(false)}>Cancelar</Button>
    <Button variant="primary" onClick={handleConfirm}>Confirmar</Button>
  </div>
</Modal>
```

### Tooltip

Sistema de tooltips mejorado.

**Ubicación:** `components/ui/Tooltip.tsx`

**Posiciones:**
- `top`: Arriba (default)
- `bottom`: Abajo
- `left`: Izquierda
- `right`: Derecha

**Tamaños:**
- `sm`: Pequeño
- `md`: Mediano (default)
- `lg`: Grande (con texto largo)

**Ejemplo de uso:**

```tsx
import Tooltip from '@/components/ui/Tooltip';

<Tooltip content="Información adicional" position="top" size="md">
  <button>Hover me</button>
</Tooltip>
```

---

## 📖 Guías de Uso

### Cuándo usar cada variante de Button

- **Primary**: Acciones principales (enviar formulario, confirmar)
- **Secondary**: Acciones secundarias (cancelar, ver más)
- **Ghost**: Acciones terciarias o en contextos donde el botón no debe destacar
- **Link**: Navegación o acciones que se sienten como enlaces

### Cuándo usar cada variante de Card

- **Default**: Uso general
- **Elevated**: Cuando necesitas destacar la tarjeta
- **Outlined**: Para contenido que necesita menos énfasis visual
- **Filled**: Para agrupar contenido relacionado

### Accesibilidad

Todos los componentes incluyen:
- ✅ ARIA labels apropiados
- ✅ Navegación por teclado
- ✅ Focus states visibles
- ✅ Soporte para lectores de pantalla
- ✅ Respeto a `prefers-reduced-motion`

---

## ✅ Mejores Prácticas

### 1. Consistencia
- Usa siempre los Design Tokens en lugar de valores hardcodeados
- Mantén el mismo espaciado y tamaños en componentes similares

### 2. Accesibilidad
- Siempre incluye labels en inputs
- Usa `aria-label` cuando sea necesario
- Asegúrate de que todos los elementos interactivos sean accesibles por teclado

### 3. Performance
- Los componentes están optimizados para SSR
- Usa `React.memo` cuando sea necesario
- Evita re-renders innecesarios

### 4. Responsive
- Todos los componentes son responsive por defecto
- Usa breakpoints consistentes
- Prueba en diferentes tamaños de pantalla

---

## 🔗 Referencias

- [Design Tokens](./styles/tokens/)
- [Componentes](./components/ui/)
- [Estilos](./styles/components/)

---

**Nota:** Este Design System está en constante evolución. Si encuentras inconsistencias o tienes sugerencias, por favor documenta los cambios.

