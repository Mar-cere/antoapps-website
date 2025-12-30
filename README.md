# 🧠 Anto - Sitio Web Oficial

Sitio web moderno y profesional para **Anto**, una aplicación móvil de salud mental con asistente AI terapéutico. Desarrollado desde cero con tecnologías web modernas, optimizado para rendimiento, accesibilidad y SEO.

![Anto Logo](assets/images/antoIcon.png)

## 📋 Sobre Anto

**Anto** es una aplicación móvil de salud mental que utiliza inteligencia artificial para proporcionar apoyo emocional 24/7. La aplicación ofrece:

- 🤖 **Asistente AI Terapéutico**: Conversaciones inteligentes basadas en terapia cognitivo-conductual
- 📊 **Análisis Emocional Avanzado**: Detección de patrones emocionales y estados de ánimo
- 🚨 **Detección de Crisis**: Sistema de alertas tempranas para situaciones de riesgo
- 🛠️ **Herramientas de Bienestar**: Ejercicios, meditaciones y recursos de salud mental
- 🔒 **Privacidad y Seguridad**: Encriptación de extremo a extremo y cumplimiento de normativas

### 🎯 Respaldado por Ciencia

Anto está respaldado por estudios científicos publicados en revistas reconocidas:

- **Fitzpatrick et al. (2017)** - Efectividad de chatbots terapéuticos (JMIR Mental Health)
- **Firth et al. (2019)** - Meta-análisis de apps móviles de salud mental (World Psychiatry)
- **Vaidyam et al. (2022)** - Chatbots de IA en salud mental (npj Digital Medicine)
- **Torok et al. (2023)** - Prevención de suicidio con intervenciones digitales (JAMA Network Open)

> 📖 Ver todos los estudios: [Página de Investigación](./investigacion.html)

## ✨ Características del Sitio Web

### 🎨 Diseño y UX
- ✅ Diseño moderno y responsive (mobile-first)
- ✅ Animaciones suaves y microinteracciones
- ✅ Efectos 3D y partículas
- ✅ Modo oscuro optimizado
- ✅ Breadcrumbs en todas las páginas
- ✅ Tooltips informativos
- ✅ Loading states mejorados

### ♿ Accesibilidad
- ✅ Cumplimiento WCAG 2.1 AA
- ✅ Navegación por teclado
- ✅ Lectores de pantalla compatibles
- ✅ Contraste de colores optimizado
- ✅ Control de tamaño de fuente
- ✅ Modo de alto contraste
- ✅ Reducción de animaciones (respetando `prefers-reduced-motion`)

### 🌍 Internacionalización
- ✅ Soporte multiidioma (Español, Inglés, Árabe)
- ✅ Soporte RTL (Right-to-Left)
- ✅ Detección automática del idioma del navegador
- ✅ Selector de idioma persistente

### 📱 PWA (Progressive Web App)
- ✅ Service Worker para funcionamiento offline
- ✅ Instalable en dispositivos móviles
- ✅ Manifest.json configurado
- ✅ Iconos y splash screens

### 🚀 Performance
- ✅ Lazy loading de imágenes y recursos
- ✅ Optimización de assets
- ✅ Service Worker para caché
- ✅ Preconnect y DNS prefetch
- ✅ Monitoreo y observabilidad integrado

### 🔍 SEO
- ✅ Schema.org markup
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Meta tags optimizados
- ✅ Open Graph y Twitter Cards
- ✅ URLs canónicas

### 📊 Monitoreo
- ✅ Error tracking (JavaScript errors, unhandled promises)
- ✅ Real User Monitoring (RUM) - LCP, FID, CLS
- ✅ API monitoring
- ✅ User metrics (clicks, scroll depth, time on page)

### 📱 Optimizaciones por Dispositivo
- ✅ Detección automática de dispositivo (mobile, tablet, desktop, foldables)
- ✅ Optimizaciones táctiles (áreas táctiles más grandes, gestos swipe)
- ✅ Feedback háptico
- ✅ Optimización de scroll táctil

## 📄 Páginas Disponibles

- **`/`** - Página principal con todas las características
- **`/comparar`** - Comparación con otras soluciones
- **`/investigacion`** - Estudios científicos y evidencia
- **`/seguridad`** - Información sobre seguridad y privacidad
- **`/sobre-nosotros`** - Acerca del equipo y la misión
- **`/contacto`** - Formulario de contacto y redes sociales
- **`/desarrollo`** - Proceso de desarrollo y arquitectura técnica
- **`/recursos`** - Biblioteca de recursos educativos
- **`/privacidad`** - Política de privacidad
- **`/terminos`** - Términos y condiciones

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modulares con variables CSS
- **JavaScript (ES6+)** - Funcionalidad modular
- **PWA** - Service Worker y Manifest
- **Vercel/Netlify** - Hosting y despliegue

### Estructura de Estilos
- CSS modular por componentes
- Variables CSS para temas
- Animaciones CSS optimizadas
- Responsive design con media queries

### Estructura de Scripts
- Módulos ES6 separados por funcionalidad
- Utilidades reutilizables
- Inicialización centralizada

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js (v14 o superior) - Opcional, solo para servidor de desarrollo
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/SquareAnto.git
cd SquareAnto

# Instalar dependencias (opcional, solo para servidor de desarrollo)
npm install
```

### Desarrollo Local

```bash
# Iniciar servidor de desarrollo local
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo
npm start            # Alias de npm run dev

# Despliegue
npm run deploy       # Desplegar a producción (Vercel)
npm run deploy:preview  # Desplegar preview (Vercel)
npm run logs         # Ver logs de Vercel
```

## 📁 Estructura del Proyecto

```
SquareAnto/
├── assets/                    # Recursos estáticos
│   ├── icons/                 # Iconos
│   └── images/                # Imágenes
│       └── antoIcon.png       # Logo principal
├── docs/                      # Documentación
│   ├── ARQUITECTURA.md        # Arquitectura del proyecto
│   └── ICONOS.md              # Guía de iconos
├── scripts/                    # JavaScript
│   ├── modules/               # Módulos de funcionalidad
│   │   ├── accessibility.js  # Funciones de accesibilidad
│   │   ├── analytics.js       # Analytics y tracking
│   │   ├── animations.js      # Animaciones
│   │   ├── cookie-consent.js  # Consentimiento de cookies
│   │   ├── device-detection.js # Detección de dispositivos
│   │   ├── faq.js             # Preguntas frecuentes
│   │   ├── forms.js           # Manejo de formularios
│   │   ├── i18n.js            # Internacionalización
│   │   ├── lazy-loading.js    # Carga diferida
│   │   ├── monitoring.js      # Monitoreo y observabilidad
│   │   ├── navigation.js      # Navegación
│   │   ├── particles.js       # Efectos de partículas
│   │   ├── performance.js     # Optimizaciones de rendimiento
│   │   ├── resources.js       # Biblioteca de recursos
│   │   ├── service-worker.js  # Service Worker
│   │   ├── tabs.js            # Sistema de pestañas
│   │   ├── tooltips.js        # Tooltips
│   │   └── tracking.js        # Tracking de eventos
│   ├── utils/                 # Utilidades
│   │   └── debounce.js        # Función debounce
│   └── main.js                # Punto de entrada principal
├── styles/                    # CSS modular
│   ├── base/                  # Base y variables
│   │   ├── reset.css          # Reset CSS
│   │   └── variables.css      # Variables CSS
│   ├── components/            # Componentes
│   │   ├── about.css          # Estilos de "Sobre Nosotros"
│   │   ├── accessibility.css  # Panel de accesibilidad
│   │   ├── buttons.css        # Botones
│   │   ├── cards.css          # Tarjetas
│   │   ├── contact.css        # Página de contacto
│   │   ├── developer.css      # Sección de desarrollador
│   │   ├── faq-categories.css # Categorías de FAQ
│   │   ├── i18n.css           # Selector de idioma
│   │   ├── loading.css        # Estados de carga
│   │   ├── privacy.css        # Página de privacidad
│   │   ├── research.css       # Página de investigación
│   │   ├── resources-library.css # Biblioteca de recursos
│   │   ├── sections.css       # Secciones principales
│   │   └── tooltips.css       # Tooltips
│   ├── layout/                # Layout
│   │   ├── container.css      # Contenedores
│   │   ├── footer.css         # Footer
│   │   └── header.css         # Header
│   ├── utilities/             # Utilidades
│   │   ├── accessibility.css  # Utilidades de accesibilidad
│   │   ├── animations.css     # Animaciones
│   │   ├── device-optimizations.css # Optimizaciones por dispositivo
│   │   └── responsive.css     # Media queries responsive
│   └── main.css               # Archivo principal (imports)
├── index.html                 # Página principal
├── comparar.html              # Página de comparación
├── contacto.html              # Página de contacto
├── desarrollo.html            # Página de desarrollo
├── investigacion.html         # Página de investigación
├── privacidad.html            # Política de privacidad
├── recursos.html              # Biblioteca de recursos
├── seguridad.html             # Página de seguridad
├── sobre-nosotros.html        # Sobre nosotros
├── terminos.html              # Términos y condiciones
├── manifest.json              # PWA manifest
├── sw.js                      # Service Worker
├── sitemap.xml                # Sitemap para SEO
├── robots.txt                 # Robots.txt
├── package.json               # Dependencias y scripts
├── netlify.toml               # Configuración de Netlify
├── vercel.json                # Configuración de Vercel
└── README.md                  # Este archivo
```

> 📖 **Documentación completa de arquitectura:** [docs/ARQUITECTURA.md](./docs/ARQUITECTURA.md)

## 🌐 Despliegue

### Opción 1: Vercel (Recomendado - Gratis)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

**Configuración DNS:**
- Tipo: `A` | Nombre: `@` | Datos: `76.76.21.21`
- Tipo: `CNAME` | Nombre: `www` | Datos: `cname.vercel-dns.com`

### Opción 2: Netlify (Gratis)

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Desplegar
netlify deploy --prod
```

### Opción 3: GitHub Pages (Gratis)

1. Subir código a GitHub
2. Settings → Pages → Source: `main branch`
3. Configurar dominio personalizado

**Configuración DNS:**
- Tipo: `A` | Datos: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- Tipo: `CNAME` | Nombre: `www` | Datos: `[tu-usuario].github.io`

### Opción 4: Hosting Tradicional

1. Subir archivos vía FTP/SFTP a `public_html` o `www`
2. Configurar DNS según las instrucciones del proveedor

## 👨‍💻 Desarrollador

**Marcelo Ull Marambio**  
Desarrollador Principal

- 📧 Email: [marcelo.ull@antoapps.com](mailto:marcelo.ull@antoapps.com)
- 🌐 Sitio: [antoapps.com](https://antoapps.com)

> 💼 Este sitio web fue desarrollado como parte del portafolio profesional, demostrando habilidades en desarrollo web moderno, UX/UI, accesibilidad y optimización de rendimiento.

## 📚 Documentación Adicional

- [Arquitectura del Proyecto](./docs/ARQUITECTURA.md)
- [Roadmap de Mejoras](./ROADMAP_MEJORAS.md)
- [Mejoras Implementadas](./MEJORAS_IMPLEMENTADAS.md)
- [Próximos Pasos](./PROXIMOS_PASOS.md)

## 🔒 Privacidad y Seguridad

- Todos los datos de usuarios están protegidos con encriptación
- Cumplimiento con normativas de privacidad (GDPR, CCPA)
- No se comparten datos con terceros sin consentimiento
- Política de privacidad completa: [privacidad.html](./privacidad.html)

## 📊 Precios

Anto ofrece planes flexibles basados en duración:

- **1 Semana**: $990 CLP
- **1 Mes**: $3.990 CLP
- **3 Meses**: $11.990 CLP
- **6 Meses**: $20.990 CLP
- **1 Año**: $39.990 CLP

> 💰 Ver comparación de planes: [comparar.html](./comparar.html)

## 🤝 Contribuir

Este es un proyecto privado, pero si tienes sugerencias o encuentras problemas, puedes contactar al desarrollador principal.

## 📄 Licencia

Este proyecto es privado y propiedad de AntoApps.

## 🙏 Agradecimientos

- Estudios científicos que respaldan la efectividad de las intervenciones digitales en salud mental
- Comunidad de desarrolladores web por las mejores prácticas
- Usuarios de Anto por su feedback continuo

---

**Desarrollado con ❤️ por Marcelo Ull Marambio**

Para más información, visita [antoapps.com](https://antoapps.com) o contacta a [marcelo.ull@antoapps.com](mailto:marcelo.ull@antoapps.com)
