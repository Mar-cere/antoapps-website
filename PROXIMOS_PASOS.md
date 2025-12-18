# ✅ Próximos Pasos - Verificación y Configuración Final

Ya tienes el dominio en Vercel. Ahora sigamos estos pasos para asegurarnos de que todo funcione correctamente.

---

## 🔍 Paso 1: Verificar el Despliegue del Sitio

Primero, asegurémonos de que tu sitio esté desplegado en Vercel.

### Opción A: Desde el Dashboard de Vercel

1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Verifica que veas tu proyecto desplegado
3. Deberías ver una URL como: `https://square-anto-xxxxx.vercel.app`
4. Haz clic en esa URL para verificar que tu sitio se vea correctamente

### Opción B: Desplegar desde la Terminal (si aún no lo has hecho)

Si no ves tu proyecto desplegado, ejecuta:

```bash
cd /Users/marceloull/Documents/SquareAnto
vercel
```

O si ya tienes el proyecto vinculado:

```bash
vercel --prod
```

---

## 🌐 Paso 2: Verificar la Configuración del Dominio en Vercel

1. **En el Dashboard de Vercel:**
   - Ve a tu proyecto
   - Haz clic en **Settings** (⚙️) → **Domains**

2. **Verifica que veas:**
   - ✅ `antoapps.com` agregado
   - ✅ `www.antoapps.com` agregado (opcional pero recomendado)

3. **Estado del dominio:**
   - Si dice "Valid Configuration" → ✅ Todo está bien
   - Si dice "Invalid Configuration" → Necesitas configurar DNS (ver Paso 3)
   - Si dice "Pending" → Espera unos minutos, Vercel está verificando

---

## 🔧 Paso 3: Configurar DNS en Google Domains

Si el dominio aún no está funcionando, necesitas configurar los DNS.

### Verificar qué tipo de configuración necesitas:

**En Vercel Dashboard → Settings → Domains:**
- Si ves **"Name Servers"** → Usa la Opción A (más fácil)
- Si ves **"A Record" y "CNAME"** → Usa la Opción B

---

### Opción A: Usar Name Servers (Recomendado - Más Fácil)

1. **En Vercel:**
   - Ve a Settings → Domains
   - Busca la sección "Name Servers" o "DNS"
   - Copia los 2-4 name servers que te proporciona (algo como `ns1.vercel-dns.com`)

2. **En Google Domains:**
   - Ve a [domains.google.com](https://domains.google.com)
   - Selecciona `antoapps.com`
   - Ve a **DNS** → **Name servers**
   - Cambia de "Use Google Domains name servers" a **"Use custom name servers"**
   - Agrega los name servers que copiaste de Vercel (uno por línea)
   - Haz clic en **Save**

3. **Espera:**
   - Los cambios pueden tardar 5 minutos - 2 horas en propagarse

---

### Opción B: Usar Registros A y CNAME

1. **En Vercel:**
   - Ve a Settings → Domains
   - Busca las instrucciones DNS
   - Anota los valores que te proporciona

2. **En Google Domains:**
   - Ve a [domains.google.com](https://domains.google.com)
   - Selecciona `antoapps.com`
   - Ve a **DNS** → **Custom resource records**

3. **Eliminar registros antiguos (si existen):**
   - Busca registros relacionados con Squarespace u otros servicios
   - Elimínalos haciendo clic en el ícono de basura (🗑️)

4. **Agregar registro A:**
   - **Name:** `@` (o deja vacío)
   - **Type:** `A`
   - **TTL:** `3600`
   - **Data:** El valor que Vercel te dio (típicamente `76.76.21.21`)
   - Haz clic en **Add**

5. **Agregar registro CNAME para www:**
   - **Name:** `www`
   - **Type:** `CNAME`
   - **TTL:** `3600`
   - **Data:** El valor que Vercel te dio (típicamente `cname.vercel-dns.com`)
   - Haz clic en **Add**

6. **Guardar y esperar:**
   - Los cambios pueden tardar 30 minutos - 2 horas

---

## ✅ Paso 4: Verificar que Todo Funciona

### Verificación Rápida (desde terminal):

```bash
# Verificar los registros DNS
nslookup antoapps.com

# Verificar desde diferentes servidores
dig @8.8.8.8 antoapps.com A
```

### Verificación Online:

1. **Verificar propagación DNS:**
   - Ve a [whatsmydns.net](https://www.whatsmydns.net)
   - Ingresa `antoapps.com`
   - Verifica que los registros A apunten a la IP de Vercel

2. **Probar en el navegador:**
   - Abre `http://antoapps.com` (puede tardar un poco)
   - Abre `http://www.antoapps.com`
   - Deberías ver tu sitio

3. **Verificar SSL/HTTPS:**
   - Espera 10-30 minutos después de configurar DNS
   - Vercel proporciona SSL automático
   - Verifica que `https://antoapps.com` funcione con el candado verde

---

## 🚨 Solución de Problemas Comunes

### El sitio no carga después de configurar DNS

**Solución:**
1. Espera al menos 30 minutos (la propagación DNS puede tardar)
2. Verifica en [whatsmydns.net](https://www.whatsmydns.net) que los DNS estén propagados
3. Limpia la caché DNS de tu computadora:
   ```bash
   # macOS
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
   ```
4. Prueba en modo incógnito del navegador

### Vercel dice "Invalid Configuration"

**Solución:**
1. Verifica que los DNS estén correctamente configurados en Google Domains
2. Asegúrate de haber eliminado registros antiguos de Squarespace
3. Espera unos minutos y recarga la página de Vercel

### El sitio carga pero muestra "Not Secure" o error SSL

**Solución:**
- Vercel proporciona SSL automático, pero puede tardar hasta 24 horas
- Espera y verifica después de unas horas
- Asegúrate de acceder con `https://` (no `http://`)

### Solo funciona `www.antoapps.com` pero no `antoapps.com`

**Solución:**
- Verifica que el registro A para `@` esté configurado en Google Domains
- En Vercel, asegúrate de que ambos dominios estén agregados

---

## 📋 Checklist Final

Marca estos items cuando estén completos:

- [ ] Sitio desplegado en Vercel y accesible en la URL `.vercel.app`
- [ ] Dominio `antoapps.com` agregado en Vercel Dashboard
- [ ] Dominio `www.antoapps.com` agregado en Vercel (opcional)
- [ ] DNS configurados en Google Domains (Name Servers o A/CNAME)
- [ ] Esperado al menos 30 minutos para propagación DNS
- [ ] Verificado con whatsmydns.net que los DNS están propagados
- [ ] Sitio accesible en `https://antoapps.com`
- [ ] Sitio accesible en `https://www.antoapps.com`
- [ ] SSL/HTTPS funcionando (candado verde en el navegador)

---

## 🎉 ¡Listo!

Una vez que todos los items del checklist estén marcados, tu sitio estará completamente funcional.

**Para futuras actualizaciones:**
- Solo ejecuta `vercel --prod` desde la carpeta del proyecto
- O conecta un repositorio Git para despliegues automáticos

---

## 💡 Tip: Conectar con Git (Opcional)

Para que los cambios se desplieguen automáticamente:

1. Crea un repositorio en GitHub
2. Sube tu código:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin [tu-repo-url]
   git push -u origin main
   ```
3. En Vercel Dashboard → Settings → Git
4. Conecta tu repositorio
5. ¡Ahora cada `git push` desplegará automáticamente!

