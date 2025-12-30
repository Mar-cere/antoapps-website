# 🚀 Guía de Deployment - Anto Next.js

Esta guía explica cómo desplegar el sitio web de Anto en Vercel.

## 📋 Prerequisitos

- Cuenta en [Vercel](https://vercel.com)
- Repositorio en GitHub/GitLab/Bitbucket
- Node.js 18+ instalado localmente (para testing)

## 🔧 Configuración en Vercel

### Opción 1: Deployment Automático desde Git

1. **Conectar Repositorio:**
   - Ve a [Vercel Dashboard](https://vercel.com/dashboard)
   - Click en "Add New Project"
   - Selecciona tu repositorio de GitHub/GitLab/Bitbucket
   - Vercel detectará automáticamente Next.js

2. **Configuración del Proyecto:**
   - **Framework Preset:** Next.js (detectado automáticamente)
   - **Root Directory:** `./` (raíz del proyecto)
   - **Build Command:** `npm run build` (automático)
   - **Output Directory:** `.next` (automático)
   - **Install Command:** `npm install` (automático)

3. **Variables de Entorno:**
   Agrega las siguientes variables en la configuración del proyecto:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_ENV=production
   NEXT_PUBLIC_SITE_URL=https://antoapps.com
   ```

4. **Deploy:**
   - Click en "Deploy"
   - Vercel construirá y desplegará automáticamente

### Opción 2: Deployment Manual con Vercel CLI

1. **Instalar Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Deploy a Producción:**
   ```bash
   vercel --prod
   ```

## 🔐 Variables de Entorno

### Variables Requeridas

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | ID de Google Analytics | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_ENV` | Ambiente (production/development) | `production` |
| `NEXT_PUBLIC_SITE_URL` | URL del sitio | `https://antoapps.com` |

### Configurar en Vercel

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega cada variable para:
   - **Production**
   - **Preview** (opcional)
   - **Development** (opcional)

## 🧪 Testing en Producción

### Pre-Deployment Checklist

- [ ] Build local funciona: `npm run build`
- [ ] No hay errores de TypeScript: `npm run lint`
- [ ] Todas las páginas cargan correctamente
- [ ] Imágenes se optimizan correctamente
- [ ] Service Worker funciona
- [ ] Analytics configurado (si aplica)

### Testing Post-Deployment

1. **Verificar Build:**
   ```bash
   npm run build
   npm start
   ```

2. **Verificar en Vercel:**
   - Revisar logs de build en Vercel Dashboard
   - Verificar que no hay errores

3. **Testing de Funcionalidades:**
   - [ ] Navegación funciona
   - [ ] Todas las páginas cargan
   - [ ] Formularios funcionan
   - [ ] Imágenes se cargan
   - [ ] Service Worker registrado
   - [ ] Analytics tracking (si configurado)

4. **Performance:**
   - Usar [PageSpeed Insights](https://pagespeed.web.dev/)
   - Verificar Web Vitals en Vercel Analytics
   - Revisar Core Web Vitals

## 🔄 Actualizaciones

### Deployment Automático

- Cada push a `main` despliega automáticamente a producción
- Pull requests crean preview deployments

### Deployment Manual

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod
```

## 📊 Monitoreo

### Vercel Analytics

1. Habilitar Vercel Analytics en el dashboard
2. Ver métricas de performance
3. Monitorear Web Vitals

### Google Analytics

1. Configurar `NEXT_PUBLIC_GA_MEASUREMENT_ID`
2. Verificar que analytics se carga correctamente
3. Revisar eventos en Google Analytics

## 🐛 Troubleshooting

### Build Fails

1. Revisar logs en Vercel Dashboard
2. Verificar que todas las dependencias están en `package.json`
3. Verificar variables de entorno

### Imágenes no cargan

1. Verificar que imágenes están en `public/`
2. Verificar configuración de `next.config.js`
3. Verificar permisos de archivos

### Service Worker no funciona

1. Verificar que `sw.js` está en `public/`
2. Verificar headers en `vercel.json`
3. Verificar que HTTPS está habilitado

## 📝 Notas

- Vercel detecta automáticamente Next.js
- No necesitas configurar `vercel.json` para routing básico
- Los redirects de `.html` están configurados para mantener compatibilidad
- Headers de seguridad están configurados en `vercel.json`

## 🔗 Enlaces Útiles

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel CLI Reference](https://vercel.com/docs/cli)

