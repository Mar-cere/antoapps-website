# 🚀 Guía Completa de Despliegue y Configuración de Dominio

Esta guía te llevará paso a paso para desplegar tu sitio y conectar tu dominio `antoapps.com` desde Google Domains.

---

## 📋 Índice

1. [Preparación: Desconectar de Squarespace](#1-preparación-desconectar-de-squarespace)
2. [Opción Recomendada: Vercel](#2-opción-recomendada-vercel)
3. [Opción Alternativa: Netlify](#3-opción-alternativa-netlify)
4. [Opción Alternativa: GitHub Pages](#4-opción-alternativa-github-pages)
5. [Configuración de DNS en Google Domains](#5-configuración-de-dns-en-google-domains)
6. [Verificación y Troubleshooting](#6-verificación-y-troubleshooting)

---

## 1. Preparación: Desconectar de Squarespace

**IMPORTANTE:** Si tu dominio está actualmente conectado a Squarespace, primero debes desconectarlo.

### Pasos:

1. **Accede a Squarespace:**
   - Inicia sesión en tu cuenta de Squarespace
   - Ve a **Settings** → **Domains**

2. **Desconecta el dominio:**
   - Busca `antoapps.com` en la lista de dominios
   - Haz clic en los tres puntos (⋯) → **Remove** o **Disconnect**
   - Confirma la desconexión

3. **Verifica en Google Domains:**
   - Ve a [domains.google.com](https://domains.google.com)
   - Selecciona `antoapps.com`
   - Verifica que los DNS estén en modo "Custom" o "Google Domains"

---

## 2. Opción Recomendada: Vercel

Vercel es la opción más sencilla y rápida. Ofrece:
- ✅ Despliegue automático
- ✅ SSL/HTTPS gratuito
- ✅ CDN global
- ✅ Dominio personalizado fácil de configurar

### Paso 1: Crear cuenta en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en **Sign Up**
3. Regístrate con GitHub, GitLab, Bitbucket o email

### Paso 2: Instalar Vercel CLI

Abre tu terminal y ejecuta:

```bash
npm install -g vercel
```

### Paso 3: Desplegar el sitio

Desde la carpeta del proyecto (`SquareAnto`), ejecuta:

```bash
cd /Users/marceloull/Documents/SquareAnto
vercel
```

**Sigue las instrucciones:**
- ¿Set up and deploy? → **Y** (Sí)
- ¿Which scope? → Selecciona tu cuenta
- ¿Link to existing project? → **N** (No, es nuevo)
- ¿What's your project's name? → Presiona Enter (usa el nombre por defecto)
- ¿In which directory is your code located? → Presiona Enter (usa `./`)
- ¿Override settings? → **N** (No)

**¡Listo!** Tu sitio estará disponible en una URL como: `https://square-anto.vercel.app`

### Paso 4: Agregar dominio personalizado en Vercel

1. **En el Dashboard de Vercel:**
   - Ve a tu proyecto
   - Haz clic en **Settings** → **Domains**

2. **Agregar dominio:**
   - Escribe: `antoapps.com`
   - Haz clic en **Add**
   - También agrega: `www.antoapps.com`

3. **Vercel te mostrará instrucciones de DNS:**
   - Anota los valores que te proporciona (serán diferentes para cada proyecto)

### Paso 5: Configurar DNS en Google Domains

Ve a la [Sección 5](#5-configuración-de-dns-en-google-domains) para los pasos detallados.

**Valores típicos de Vercel:**
- **Registro A para `@` (raíz):** `76.76.21.21`
- **Registro CNAME para `www`:** `cname.vercel-dns.com`

**O mejor aún:** Vercel puede usar Name Servers personalizados. Si te los proporciona, úsalos en lugar de los registros A/CNAME.

---

## 3. Opción Alternativa: Netlify

Netlify es otra excelente opción gratuita.

### Paso 1: Crear cuenta en Netlify

1. Ve a [netlify.com](https://netlify.com)
2. Haz clic en **Sign up**
3. Regístrate con GitHub, GitLab, Bitbucket o email

### Paso 2: Instalar Netlify CLI

```bash
npm install -g netlify-cli
```

### Paso 3: Iniciar sesión

```bash
netlify login
```

Esto abrirá tu navegador para autenticarte.

### Paso 4: Desplegar

```bash
cd /Users/marceloull/Documents/SquareAnto
netlify deploy
```

**Primera vez:**
- ¿Create & configure a new site? → **Y**
- ¿Team? → Selecciona tu equipo
- ¿Site name? → Presiona Enter (generará uno automático)

**Para producción:**
```bash
netlify deploy --prod
```

### Paso 5: Agregar dominio en Netlify

1. **En Netlify Dashboard:**
   - Ve a **Site settings** → **Domain management**
   - Haz clic en **Add custom domain**
   - Ingresa: `antoapps.com` y `www.antoapps.com`

2. **Netlify te dará instrucciones DNS:**
   - Anota los valores específicos

**Valores típicos de Netlify:**
- **Registro A para `@`:** `75.2.60.5`
- **Registro CNAME para `www`:** `[tu-sitio].netlify.app`

---

## 4. Opción Alternativa: GitHub Pages

Ideal si ya usas GitHub para tu código.

### Paso 1: Crear repositorio en GitHub

1. Ve a [github.com](https://github.com)
2. Haz clic en **New repository**
3. Nombre: `antoapps-website` (o el que prefieras)
4. Haz clic en **Create repository**

### Paso 2: Subir código a GitHub

Desde tu terminal:

```bash
cd /Users/marceloull/Documents/SquareAnto

# Inicializar git (si no lo has hecho)
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit - AntoApps website"

# Agregar el repositorio remoto (reemplaza [tu-usuario] con tu usuario de GitHub)
git remote add origin https://github.com/[tu-usuario]/antoapps-website.git

# Subir el código
git branch -M main
git push -u origin main
```

### Paso 3: Activar GitHub Pages

1. **En GitHub:**
   - Ve a tu repositorio
   - **Settings** → **Pages** (en el menú lateral)

2. **Configurar:**
   - **Source:** Selecciona `main` branch
   - **Folder:** `/ (root)`
   - Haz clic en **Save**

3. **Tu sitio estará en:** `https://[tu-usuario].github.io/antoapps-website`

### Paso 4: Configurar dominio personalizado

1. **En la misma página de Settings → Pages:**
   - En **Custom domain**, escribe: `antoapps.com`
   - Haz clic en **Save**

2. **GitHub te pedirá verificar el dominio:**
   - Te dará un registro TXT para agregar en Google Domains
   - Agrégalo temporalmente para verificar

### Paso 5: Configurar DNS

**Valores para GitHub Pages:**
- **Registros A (4 registros necesarios):**
  - `@` → `185.199.108.153`
  - `@` → `185.199.109.153`
  - `@` → `185.199.110.153`
  - `@` → `185.199.111.153`
- **Registro CNAME:**
  - `www` → `[tu-usuario].github.io`

---

## 5. Configuración de DNS en Google Domains

Esta sección es **CRÍTICA** para que tu dominio funcione.

### Paso 1: Acceder a Google Domains

1. Ve a [domains.google.com](https://domains.google.com)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en **My domains**
4. Selecciona `antoapps.com`

### Paso 2: Ir a la configuración DNS

1. En el menú lateral, haz clic en **DNS**
2. Desplázate hasta la sección **Custom resource records** o **Registros de recursos personalizados**

### Paso 3: Limpiar registros antiguos (si existen)

Si hay registros relacionados con Squarespace u otros servicios:
- Elimínalos haciendo clic en el ícono de basura (🗑️) junto a cada registro

### Paso 4: Agregar nuevos registros

**IMPORTANTE:** Los valores exactos dependen del servicio que elegiste. Usa los valores que te proporcionó Vercel/Netlify/GitHub.

#### Si usas Vercel:

**Opción A: Usar Name Servers (Recomendado)**
1. Ve a **Name servers** en Google Domains
2. Cambia de "Use Google Domains name servers" a "Use custom name servers"
3. Agrega los name servers que Vercel te proporcionó (generalmente 2-4 servidores)
4. Guarda los cambios

**Opción B: Usar registros A/CNAME**
1. Agrega registro A:
   - **Name:** `@` (o deja vacío)
   - **Type:** `A`
   - **TTL:** `3600` (o el que prefieras)
   - **Data:** `76.76.21.21`
   - Haz clic en **Add**

2. Agrega registro CNAME:
   - **Name:** `www`
   - **Type:** `CNAME`
   - **TTL:** `3600`
   - **Data:** `cname.vercel-dns.com`
   - Haz clic en **Add**

#### Si usas Netlify:

1. **Registro A:**
   - **Name:** `@`
   - **Type:** `A`
   - **Data:** `75.2.60.5`
   - **Add**

2. **Registro CNAME:**
   - **Name:** `www`
   - **Type:** `CNAME`
   - **Data:** `[tu-sitio].netlify.app` (el que Netlify te dio)
   - **Add**

#### Si usas GitHub Pages:

1. **Agregar 4 registros A:**
   - **Name:** `@` | **Type:** `A` | **Data:** `185.199.108.153` → **Add**
   - **Name:** `@` | **Type:** `A` | **Data:** `185.199.109.153` → **Add**
   - **Name:** `@` | **Type:** `A` | **Data:** `185.199.110.153` → **Add**
   - **Name:** `@` | **Type:** `A` | **Data:** `185.199.111.153` → **Add**

2. **Registro CNAME:**
   - **Name:** `www`
   - **Type:** `CNAME`
   - **Data:** `[tu-usuario].github.io`
   - **Add**

### Paso 5: Guardar y esperar

1. **Guarda todos los cambios**
2. **Espera la propagación DNS:**
   - Puede tardar desde 5 minutos hasta 48 horas
   - Normalmente toma 1-2 horas

---

## 6. Verificación y Troubleshooting

### Verificar que los DNS están configurados

1. **Usa herramientas online:**
   - [whatsmydns.net](https://www.whatsmydns.net) - Ingresa `antoapps.com` y verifica los registros A
   - [dnschecker.org](https://dnschecker.org) - Verifica propagación global

2. **Desde tu terminal:**
   ```bash
   # Verificar registros A
   dig antoapps.com A
   
   # Verificar CNAME
   dig www.antoapps.com CNAME
   ```

### Verificar que el sitio funciona

1. **Espera 10-30 minutos** después de configurar DNS
2. **Abre en tu navegador:**
   - `http://antoapps.com`
   - `http://www.antoapps.com`
3. **Deberías ver tu sitio**

### Problemas comunes y soluciones

#### ❌ El sitio no carga después de 2 horas

**Solución:**
- Verifica que los DNS estén correctos en Google Domains
- Verifica que el dominio esté agregado correctamente en Vercel/Netlify/GitHub
- Limpia la caché DNS de tu computadora:
  ```bash
  # macOS
  sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
  ```

#### ❌ Error "SSL Certificate" o "Not Secure"

**Solución:**
- Vercel y Netlify proporcionan SSL automático, pero puede tardar hasta 24 horas
- GitHub Pages también tiene SSL automático
- Espera y verifica después de unas horas

#### ❌ `www.antoapps.com` no funciona, pero `antoapps.com` sí

**Solución:**
- Verifica que el registro CNAME para `www` esté configurado
- En Vercel/Netlify, asegúrate de que ambos dominios estén agregados

#### ❌ Sigue mostrando Squarespace

**Solución:**
- Verifica que hayas desconectado el dominio de Squarespace
- Limpia la caché de tu navegador (Ctrl+Shift+Delete)
- Espera más tiempo para la propagación DNS

### Comandos útiles para verificar

```bash
# Ver IP del dominio
nslookup antoapps.com

# Ver todos los registros DNS
dig antoapps.com ANY

# Verificar desde diferentes servidores DNS
dig @8.8.8.8 antoapps.com A
dig @1.1.1.1 antoapps.com A
```

---

## ✅ Checklist Final

Antes de considerar que todo está listo:

- [ ] Dominio desconectado de Squarespace
- [ ] Sitio desplegado en Vercel/Netlify/GitHub Pages
- [ ] Dominio agregado en el panel del hosting
- [ ] DNS configurados en Google Domains
- [ ] Esperado al menos 30 minutos para propagación
- [ ] Verificado con whatsmydns.net
- [ ] Sitio accesible en `antoapps.com`
- [ ] Sitio accesible en `www.antoapps.com`
- [ ] SSL/HTTPS funcionando (candado verde en el navegador)

---

## 🎉 ¡Listo!

Una vez completados estos pasos, tu sitio estará en línea y accesible desde `antoapps.com`.

**Para futuras actualizaciones:**
- **Vercel/Netlify:** Solo haz `git push` o vuelve a ejecutar `vercel`/`netlify deploy --prod`
- **GitHub Pages:** Solo haz `git push` y se actualizará automáticamente

---

## 📞 ¿Necesitas ayuda?

Si encuentras problemas:
1. Revisa los logs en el dashboard de tu hosting
2. Verifica los DNS con las herramientas mencionadas
3. Consulta la documentación oficial de tu proveedor

