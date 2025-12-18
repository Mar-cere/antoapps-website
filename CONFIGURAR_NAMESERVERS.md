# 🔧 Configurar Name Servers en Google Domains

Vercel te está mostrando los Name Servers que debes usar. Sigue estos pasos:

## 📋 Name Servers de Vercel:

- `ns1.vercel-dns.com`
- `ns2.vercel-dns.com`

---

## ✅ Pasos para Configurar en Google Domains:

### Paso 1: Acceder a Google Domains

1. Ve a [domains.google.com](https://domains.google.com)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en **My domains**
4. Selecciona el dominio `antoapps.com`

### Paso 2: Ir a la Configuración de Name Servers

1. En el menú lateral izquierdo, haz clic en **DNS**
2. Desplázate hasta la sección **Name servers**
3. Verás algo como "Use Google Domains name servers" seleccionado

### Paso 3: Cambiar a Name Servers Personalizados

1. Haz clic en **"Use custom name servers"** o **"Usar servidores de nombres personalizados"**
2. Se abrirán campos para agregar name servers

### Paso 4: Agregar los Name Servers de Vercel

1. **Primer campo:** Ingresa `ns1.vercel-dns.com`
2. **Segundo campo:** Ingresa `ns2.vercel-dns.com`
3. Si hay más campos, déjalos vacíos (Vercel solo usa 2)

### Paso 5: Guardar

1. Haz clic en **Save** o **Guardar**
2. Google Domains te pedirá confirmar el cambio
3. Confirma el cambio

---

## ⏳ ¿Qué pasa después?

1. **Espera 5-30 minutos** para que los cambios se propaguen
2. Vercel detectará automáticamente los cambios
3. El banner amarillo en Vercel desaparecerá cuando esté configurado
4. Tu sitio estará disponible en `https://antoapps.com`

---

## ✅ Verificación

Después de 10-30 minutos:

1. **En Vercel:**
   - Recarga la página de DNS
   - El banner amarillo debería desaparecer
   - Debería decir "Valid Configuration" o similar

2. **En tu navegador:**
   - Abre `https://antoapps.com`
   - Deberías ver tu sitio

3. **Desde terminal:**
   ```bash
   nslookup antoapps.com
   ```
   Deberías ver que apunta a Vercel

---

## 🚨 Nota Importante

- Los cambios pueden tardar hasta 2 horas en propagarse completamente
- Durante la transferencia del dominio, esto funcionará perfectamente
- Una vez que la transferencia se complete, Vercel gestionará todo automáticamente

---

## 💡 ¿Por qué usar Name Servers en lugar de registros A/CNAME?

- ✅ Más fácil de configurar
- ✅ Vercel gestiona todos los DNS automáticamente
- ✅ No necesitas agregar registros manualmente
- ✅ SSL/HTTPS se configura automáticamente
- ✅ Mejor para futuras actualizaciones

---

¡Eso es todo! Una vez que guardes los name servers en Google Domains, todo debería funcionar automáticamente.

