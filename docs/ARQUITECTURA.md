# 🏗️ Arquitectura del Proyecto Anto

Documentación de la estructura y arquitectura del proyecto.

---

## 📁 Estructura de Carpetas

```
SquareAnto/
├── assets/                 # Recursos estáticos
│   ├── images/            # Imágenes
│   └── icons/             # Iconos
│
├── docs/                   # Documentación
│   └── ARQUITECTURA.md    # Este archivo
│
├── scripts/                # JavaScript
│   ├── modules/           # Módulos de funcionalidad
│   │   ├── navigation.js  # Navegación y smooth scroll
│   │   ├── tabs.js        # Sistema de tabs
│   │   ├── faq.js         # Acordeón FAQ
│   │   ├── animations.js  # Animaciones y efectos
│   │   ├── particles.js    # Efecto de partículas
│   │   ├── forms.js       # Manejo de formularios
│   │   └── lazy-loading.js # Carga diferida de imágenes
│   ├── utils/             # Utilidades
│   │   └── debounce.js    # Función debounce
│   └── main.js            # Punto de entrada principal
│
├── styles/                 # CSS
│   ├── base/              # Estilos base
│   │   ├── variables.css  # Variables CSS
│   │   └── reset.css      # Reset CSS
│   ├── layout/            # Layout y estructura
│   │   ├── container.css  # Contenedores
│   │   ├── header.css     # Header y navegación
│   │   └── footer.css     # Footer
│   ├── components/        # Componentes reutilizables
│   │   ├── buttons.css    # Botones
│   │   ├── cards.css      # Tarjetas
│   │   └── sections.css   # Secciones de la página
│   ├── utilities/         # Utilidades
│   │   ├── animations.css # Animaciones
│   │   └── responsive.css # Media queries
│   └── main.css           # Archivo principal (imports)
│
├── index.html             # Página principal
├── privacidad.html        # Página de privacidad
├── favicon.svg            # Favicon
├── manifest.json          # PWA manifest
├── robots.txt             # Robots para SEO
├── sitemap.xml            # Sitemap para SEO
├── package.json           # Configuración npm
├── vercel.json            # Configuración Vercel
└── README.md              # Documentación principal
```

---

## 🎨 Arquitectura CSS

### Metodología: Modular CSS

El CSS está organizado siguiendo una arquitectura modular que facilita el mantenimiento y la escalabilidad.

#### 1. **Base** (`styles/base/`)
- **variables.css**: Variables CSS globales (colores, espaciado, tipografía)
- **reset.css**: Reset CSS y estilos base del documento

#### 2. **Layout** (`styles/layout/`)
- **container.css**: Contenedores y estructura general
- **header.css**: Header y navegación
- **footer.css**: Footer

#### 3. **Components** (`styles/components/`)
- **buttons.css**: Estilos de botones
- **cards.css**: Estilos de tarjetas (feature-card, value-card, etc.)
- **sections.css**: Estilos de secciones (hero, features, pricing, etc.)

#### 4. **Utilities** (`styles/utilities/`)
- **animations.css**: Keyframes y animaciones
- **responsive.css**: Media queries y diseño responsive

#### 5. **Main** (`styles/main.css`)
- Archivo principal que importa todos los módulos en orden

### Orden de Importación

```css
/* Base primero */
@import url('./base/variables.css');
@import url('./base/reset.css');

/* Layout */
@import url('./layout/container.css');
@import url('./layout/header.css');
@import url('./layout/footer.css');

/* Components */
@import url('./components/buttons.css');
@import url('./components/cards.css');
@import url('./components/sections.css');

/* Utilities al final */
@import url('./utilities/animations.css');
@import url('./utilities/responsive.css');
```

---

## 💻 Arquitectura JavaScript

### Patrón: Módulos ES6

El JavaScript está organizado en módulos ES6 que se importan en el archivo principal.

#### 1. **Modules** (`scripts/modules/`)
Cada módulo exporta funciones específicas:

- **navigation.js**: Navegación móvil y smooth scroll
- **tabs.js**: Sistema de tabs interactivos
- **faq.js**: Acordeón de preguntas frecuentes
- **animations.js**: Animaciones al hacer scroll y efectos de header
- **particles.js**: Efecto de partículas en el hero
- **forms.js**: Manejo y validación de formularios
- **lazy-loading.js**: Carga diferida de imágenes

#### 2. **Utils** (`scripts/utils/`)
Funciones utilitarias reutilizables:

- **debounce.js**: Función debounce para optimizar eventos

#### 3. **Main** (`scripts/main.js`)
- Punto de entrada que inicializa todos los módulos
- Maneja el evento DOMContentLoaded

### Flujo de Inicialización

```javascript
// 1. Importar módulos
import { initNavigation } from './modules/navigation.js';
// ... más imports

// 2. Función init que llama a todos los módulos
function init() {
    initNavigation();
    // ... más inicializaciones
}

// 3. Ejecutar cuando DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
```

---

## 🎯 Principios de Diseño

### 1. **Separación de Responsabilidades**
- Cada módulo tiene una responsabilidad única
- CSS separado por propósito (layout, components, utilities)
- JavaScript modular por funcionalidad

### 2. **Escalabilidad**
- Fácil agregar nuevos componentes
- Estructura clara para nuevos desarrolladores
- Módulos independientes y reutilizables

### 3. **Mantenibilidad**
- Código organizado y documentado
- Fácil localizar y modificar estilos/funcionalidades
- Estructura predecible

### 4. **Performance**
- CSS modular permite cargar solo lo necesario
- JavaScript modular facilita code splitting
- Lazy loading para imágenes

---

## 📦 Dependencias

### Producción
- Ninguna (vanilla JavaScript y CSS)

### Desarrollo
- `serve`: Servidor de desarrollo local
- `vercel`: CLI para despliegue

---

## 🚀 Flujo de Desarrollo

### 1. Desarrollo Local
```bash
npm run dev
```

### 2. Estructura de Trabajo
- **HTML**: Editar `index.html` o crear nuevas páginas
- **CSS**: Agregar estilos en el módulo correspondiente
- **JavaScript**: Agregar funcionalidad en el módulo correspondiente

### 3. Despliegue
```bash
npm run deploy
# O automáticamente con git push
```

---

## 📝 Convenciones

### Nomenclatura CSS
- **Componentes**: `.component-name` (kebab-case)
- **Modificadores**: `.component-name--modifier`
- **Estados**: `.component-name.is-active`

### Nomenclatura JavaScript
- **Funciones**: `camelCase`
- **Constantes**: `UPPER_SNAKE_CASE`
- **Módulos**: `kebab-case.js`

### Estructura de Archivos
- Un componente = un archivo CSS
- Una funcionalidad = un módulo JS
- Documentación en `docs/`

---

## 🔄 Agregar Nuevos Componentes

### CSS
1. Crear archivo en `styles/components/nuevo-componente.css`
2. Importar en `styles/main.css`
3. Usar variables de `styles/base/variables.css`

### JavaScript
1. Crear módulo en `scripts/modules/nuevo-modulo.js`
2. Exportar función `initNuevoModulo()`
3. Importar y llamar en `scripts/main.js`

---

## 📚 Recursos

- [CSS Architecture](https://css-tricks.com/css-architecture/)
- [ES6 Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [BEM Methodology](http://getbem.com/)

---

**Última actualización**: Enero 2024

