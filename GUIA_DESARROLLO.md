# 💻 Guía de Desarrollo - AntoApps

Guía completa para desarrollar y mantener el sitio web de AntoApps de forma profesional.

---

## 🚀 Inicio Rápido

### 1. Configurar el Entorno de Desarrollo

```bash
# Asegúrate de estar en la carpeta del proyecto
cd /Users/marceloull/Documents/SquareAnto

# Instalar dependencias (si aún no lo has hecho)
npm install

# Iniciar servidor de desarrollo local
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

---

## 📁 Estructura del Proyecto

```
SquareAnto/
├── index.html              # Página principal
├── styles/
│   └── main.css           # Estilos principales
├── scripts/
│   └── main.js            # JavaScript principal
├── assets/                # Imágenes, fuentes, etc. (crear si necesitas)
├── package.json           # Configuración del proyecto
├── vercel.json            # Configuración de Vercel
└── README.md             # Documentación
```

---

## 🛠️ Workflow de Desarrollo

### Flujo de Trabajo Recomendado:

1. **Desarrollar localmente:**
   ```bash
   npm run dev
   ```

2. **Hacer cambios:**
   - Edita los archivos HTML, CSS o JS
   - El servidor se recarga automáticamente (si usas live reload)

3. **Probar localmente:**
   - Abre `http://localhost:3000`
   - Prueba en diferentes tamaños de pantalla
   - Verifica que todo funcione

4. **Desplegar a producción:**
   ```bash
   vercel --prod
   ```

---

## 📝 Archivos Principales

### `index.html`
- **Qué es:** La estructura HTML de tu sitio
- **Cuándo editarlo:** Para agregar nuevas secciones, cambiar contenido, agregar páginas
- **Mejores prácticas:**
  - Mantén el HTML semántico (usa `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
  - Agrega atributos `alt` a las imágenes
  - Usa IDs y clases descriptivas

### `styles/main.css`
- **Qué es:** Todos los estilos del sitio
- **Cuándo editarlo:** Para cambiar colores, fuentes, diseño, layout
- **Mejores prácticas:**
  - Usa las variables CSS en `:root` para colores y valores comunes
  - Mantén los estilos organizados por sección
  - Usa media queries para responsive design

### `scripts/main.js`
- **Qué es:** Toda la funcionalidad JavaScript
- **Cuándo editarlo:** Para agregar interactividad, formularios, animaciones
- **Mejores prácticas:**
  - Mantén el código organizado y comentado
  - Usa funciones para reutilizar código
  - Maneja errores apropiadamente

---

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `styles/main.css`:

```css
:root {
    --primary-color: #6366f1;    /* Color principal */
    --secondary-color: #8b5cf6;  /* Color secundario */
    --text-dark: #1f2937;         /* Texto oscuro */
    --text-light: #6b7280;        /* Texto claro */
    /* ... más variables ... */
}
```

### Cambiar Contenido

1. **Títulos y textos:** Edita directamente en `index.html`
2. **Secciones:** Agrega o modifica las secciones en `index.html`
3. **Imágenes:** Agrega imágenes en una carpeta `assets/images/` y referencia en HTML

### Agregar Nuevas Páginas

1. Crea un nuevo archivo HTML (ej: `about.html`)
2. Copia la estructura de `index.html`
3. Modifica el contenido
4. Actualiza los enlaces de navegación

---

## 🔧 Comandos Útiles

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Ver versión de Node
node --version

# Verificar que Vercel CLI está instalado
vercel --version
```

### Despliegue

```bash
# Desplegar a producción
vercel --prod

# Desplegar preview (para probar antes de producción)
vercel

# Ver logs de despliegues
vercel logs
```

### Git (si usas control de versiones)

```bash
# Inicializar repositorio (si no lo has hecho)
git init

# Ver estado de cambios
git status

# Agregar cambios
git add .

# Hacer commit
git commit -m "Descripción de los cambios"

# Subir a GitHub (después de crear el repo)
git push origin main
```

---

## 📱 Desarrollo Responsive

### Breakpoints Actuales

El CSS ya incluye media queries para:
- **Desktop:** Por defecto (1200px+)
- **Tablet:** 768px - 1199px
- **Mobile:** < 768px

### Probar Responsive

1. **En el navegador:**
   - Abre DevTools (F12 o Cmd+Option+I)
   - Activa el modo responsive (Cmd+Shift+M)
   - Prueba diferentes tamaños

2. **Dispositivos reales:**
   - Usa `ngrok` o similar para exponer tu localhost
   - O despliega un preview con `vercel` y prueba en tu móvil

---

## 🚀 Despliegue

### Despliegue Manual

```bash
# Desde la carpeta del proyecto
vercel --prod
```

### Despliegue Automático (Recomendado)

1. **Conectar con GitHub:**
   - Crea un repositorio en GitHub
   - Sube tu código
   - En Vercel Dashboard → Settings → Git
   - Conecta el repositorio

2. **Resultado:**
   - Cada vez que hagas `git push`, Vercel desplegará automáticamente
   - Obtendrás previews para cada pull request

---

## 🐛 Debugging

### Problemas Comunes

#### El sitio no se ve bien localmente
- Verifica que el servidor esté corriendo: `npm run dev`
- Revisa la consola del navegador (F12) para errores
- Limpia la caché del navegador (Cmd+Shift+R)

#### Los cambios no se reflejan
- Guarda los archivos
- Recarga la página (Cmd+R o F5)
- Verifica que estés editando los archivos correctos

#### Error al desplegar
- Verifica que todos los archivos estén guardados
- Revisa los logs: `vercel logs`
- Asegúrate de estar en la carpeta correcta

---

## 📚 Recursos Útiles

### Documentación
- [HTML Reference](https://developer.mozilla.org/es/docs/Web/HTML)
- [CSS Reference](https://developer.mozilla.org/es/docs/Web/CSS)
- [JavaScript Reference](https://developer.mozilla.org/es/docs/Web/JavaScript)
- [Vercel Docs](https://vercel.com/docs)

### Herramientas
- [Can I Use](https://caniuse.com/) - Compatibilidad de características
- [Google Fonts](https://fonts.google.com/) - Fuentes gratuitas
- [Unsplash](https://unsplash.com/) - Imágenes gratuitas
- [Favicon Generator](https://favicon.io/) - Generar favicons

---

## ✅ Checklist Antes de Desplegar

Antes de hacer `vercel --prod`, verifica:

- [ ] El sitio funciona correctamente en `localhost`
- [ ] No hay errores en la consola del navegador
- [ ] El sitio es responsive (prueba en móvil)
- [ ] Todos los enlaces funcionan
- [ ] Las imágenes cargan correctamente
- [ ] El formulario de contacto funciona (si aplica)
- [ ] Los textos están correctos (sin typos)
- [ ] Los colores y estilos se ven bien

---

## 🎯 Próximos Pasos Sugeridos

1. **Agregar más contenido:**
   - Más secciones
   - Galería de proyectos
   - Blog (opcional)

2. **Mejorar SEO:**
   - Meta tags más completos
   - Open Graph tags
   - Sitemap.xml

3. **Agregar funcionalidades:**
   - Backend para formulario de contacto
   - Analytics (Google Analytics)
   - Chat en vivo

4. **Optimización:**
   - Optimizar imágenes
   - Minificar CSS/JS
   - Lazy loading

---

## 💡 Tips Profesionales

1. **Usa Git:** Siempre usa control de versiones para tu código
2. **Commits descriptivos:** Escribe mensajes claros en tus commits
3. **Prueba antes de desplegar:** Siempre prueba localmente primero
4. **Backup:** Mantén backups de tu código
5. **Documenta:** Comenta código complejo
6. **Mantén actualizado:** Actualiza dependencias regularmente

---

¡Listo para desarrollar! 🚀

