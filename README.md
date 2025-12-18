# AntoApps - Sitio Web

Sitio web desarrollado desde cero para AntoApps.

## 🚀 Inicio Rápido

### Instalación

```bash
# Instalar dependencias (opcional, solo para servidor de desarrollo)
npm install

# Iniciar servidor de desarrollo local
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
SquareAnto/
├── assets/              # Recursos estáticos (imágenes, iconos)
├── docs/                # Documentación
│   └── ARQUITECTURA.md  # Documentación de arquitectura
├── scripts/             # JavaScript modular
│   ├── modules/         # Módulos de funcionalidad
│   ├── utils/           # Utilidades
│   └── main.js          # Punto de entrada
├── styles/              # CSS modular
│   ├── base/            # Variables y reset
│   ├── layout/          # Layout (header, footer)
│   ├── components/      # Componentes reutilizables
│   ├── utilities/       # Animaciones y responsive
│   └── main.css         # Archivo principal (imports)
├── index.html           # Página principal
├── privacidad.html     # Página de privacidad
└── README.md           # Este archivo
```

> 📖 **Documentación completa de arquitectura:** [docs/ARQUITECTURA.md](./docs/ARQUITECTURA.md)

## 🌐 Configurar el Dominio (antoapps.com)

> 📖 **Para una guía completa y detallada paso a paso, consulta [GUIA_DESPLIEGUE.md](./GUIA_DESPLIEGUE.md)**

### Opción 1: Usar Vercel (Recomendado - Gratis)

1. **Instalar Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Desplegar:**
   ```bash
   vercel
   ```

3. **Configurar dominio en Google Domains:**
   - Ve a Google Domains → DNS
   - Agrega estos registros:
     - Tipo: `A` | Nombre: `@` | Datos: `76.76.21.21`
     - Tipo: `CNAME` | Nombre: `www` | Datos: `cname.vercel-dns.com`
   - O usa los DNS de Vercel que te proporcionen

### Opción 2: Usar Netlify (Gratis)

1. **Instalar Netlify CLI:**
   ```bash
   npm i -g netlify-cli
   ```

2. **Desplegar:**
   ```bash
   netlify deploy --prod
   ```

3. **Configurar dominio:**
   - En Netlify Dashboard → Domain settings
   - Agrega tu dominio `antoapps.com`
   - Configura los DNS en Google Domains según las instrucciones de Netlify

### Opción 3: Usar GitHub Pages (Gratis)

1. **Crear repositorio en GitHub**
2. **Subir el código:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin [tu-repo-url]
   git push -u origin main
   ```

3. **Activar GitHub Pages:**
   - Settings → Pages → Source: `main branch`
   - Configurar dominio personalizado en Settings → Pages

4. **Configurar DNS en Google Domains:**
   - Tipo: `A` | Nombre: `@` | Datos: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Tipo: `CNAME` | Nombre: `www` | Datos: `[tu-usuario].github.io`

### Opción 4: Hosting Tradicional (cPanel, etc.)

1. **Subir archivos vía FTP/SFTP:**
   - Sube todos los archivos a la carpeta `public_html` o `www`

2. **Configurar DNS en Google Domains:**
   - Tipo: `A` | Nombre: `@` | Datos: `[IP del servidor]`
   - Tipo: `CNAME` | Nombre: `www` | Datos: `[tu-dominio.com]`

## 🔧 Pasos para Conectar el Dominio desde Google Domains

1. **Accede a Google Domains:**
   - Ve a [domains.google.com](https://domains.google.com)
   - Selecciona tu dominio `antoapps.com`

2. **Configuración DNS:**
   - Ve a la sección "DNS" o "Name servers"
   - Si usas Vercel/Netlify: Cambia los Name servers a los que te proporcionen
   - Si usas hosting tradicional: Agrega registros A y CNAME según las instrucciones arriba

3. **Espera la propagación:**
   - Los cambios DNS pueden tardar 24-48 horas en propagarse
   - Usa [whatsmydns.net](https://www.whatsmydns.net) para verificar

## 📝 Notas Importantes

- **Squarespace:** Si tienes el dominio conectado a Squarespace, necesitarás desconectarlo primero en la configuración de Squarespace
- **SSL/HTTPS:** Vercel, Netlify y GitHub Pages proporcionan SSL automático
- **Actualizaciones:** Cada vez que hagas cambios, vuelve a desplegar (o haz push si usas GitHub Pages)

## 🛠️ Desarrollo

> 📖 **Guía completa de desarrollo:** [GUIA_DESARROLLO.md](./GUIA_DESARROLLO.md)  
> ⚡ **Comandos rápidos:** [COMANDOS_RAPIDOS.md](./COMANDOS_RAPIDOS.md)

### Inicio Rápido

```bash
# Iniciar servidor de desarrollo local
npm run dev

# Desplegar a producción
npm run deploy
```

### Estructura de Archivos

- `index.html` - Edita para cambiar contenido
- `styles/main.css` - Edita para cambiar diseño
- `scripts/main.js` - Edita para cambiar funcionalidad

### Personalización

- **Colores:** Edita las variables CSS en `styles/main.css` → `:root`
- **Contenido:** Edita directamente en `index.html`
- **Funcionalidad:** Agrega código en `scripts/main.js`

## 📞 Soporte

Para cualquier duda sobre la configuración del dominio o el despliegue, consulta la documentación de la plataforma que elijas.

