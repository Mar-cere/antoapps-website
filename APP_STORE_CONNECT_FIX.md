# 🔧 Solución para Rechazo de App Store - Tracking

## Problema

Apple rechazó la app porque en App Store Connect indicaste que la app **recolecta datos para tracking** (específicamente "Name"), pero la app **NO está usando App Tracking Transparency (ATT)** para solicitar permiso.

## Solución Recomendada: Actualizar App Privacy Information

**Anto NO hace tracking de usuarios.** Por lo tanto, debes actualizar la información de privacidad en App Store Connect para reflejar esto correctamente.

---

## 📋 Pasos para Corregir en App Store Connect

### Paso 1: Acceder a App Privacy Information

1. Ve a [App Store Connect](https://appstoreconnect.apple.com)
2. Selecciona tu app **Anto**
3. Ve a la sección **App Privacy** (en el menú lateral)
4. Haz clic en **"App Privacy"** o **"Privacy Practices"**

### Paso 2: Revisar y Corregir "Data Used to Track You"

1. En la sección **"Data Used to Track You"** (Datos usados para rastrearte):
   - **ELIMINA** cualquier dato que hayas marcado como "Used to Track You"
   - Específicamente, **remueve "Name"** de esta sección si está marcado para tracking

2. Si "Name" está listado, muévelo a la sección correcta:
   - **"Data Linked to You"** (Datos vinculados a ti) - ✅ CORRECTO
   - **"Data Not Linked to You"** (Datos no vinculados a ti) - ✅ CORRECTO
   - **"Data Used to Track You"** (Datos usados para rastrearte) - ❌ INCORRECTO (debe estar vacío)

### Paso 3: Configurar Correctamente "Name"

Si recolectas el nombre del usuario (que es normal para personalización):

1. **Marca "Name" en "Data Linked to You"** (no en "Data Used to Track You")
2. **Propósito de recolección:**
   - ✅ "App Functionality" (Funcionalidad de la app)
   - ✅ "Personalization" (Personalización)
   - ❌ NO marques "Third-Party Advertising" (Publicidad de terceros)
   - ❌ NO marques "Developer's Advertising or Marketing" (Publicidad o marketing del desarrollador)

3. **¿Se usa para tracking?** → **NO** ❌

### Paso 4: Verificar Otras Categorías

Asegúrate de que **NINGÚN dato** esté marcado en:
- ❌ "Data Used to Track You" (debe estar vacío o no aplicable)

---

## 📝 Respuesta a Enviar en App Store Connect

Cuando respondas al rechazo, puedes usar este texto:

---

**Asunto:** Corrección de Información de Privacidad - No Hacemos Tracking

**Mensaje:**

Hola equipo de App Review,

Gracias por la revisión. Hemos corregido la información de privacidad en App Store Connect.

**Aclaración importante:**

Anto NO hace tracking de usuarios entre apps y sitios web. No utilizamos identificadores de publicidad (IDFA) ni servicios de tracking de terceros. Por lo tanto, no es necesario implementar App Tracking Transparency (ATT).

**Correcciones realizadas:**

1. ✅ Removimos "Name" de la sección "Data Used to Track You"
2. ✅ Movimos "Name" a "Data Linked to You" con propósito "App Functionality" y "Personalization"
3. ✅ Confirmamos que NO recolectamos datos para tracking

El nombre del usuario se recolecta únicamente para:
- Personalizar la experiencia dentro de la aplicación
- Proporcionar el servicio de salud mental solicitado
- Mejorar la funcionalidad de la app

**Nuestra política de privacidad** (disponible en https://antoapps.com/privacidad) establece claramente que:
- No hacemos tracking de usuarios
- No compartimos datos con redes publicitarias
- No utilizamos servicios de tracking de terceros
- Todos los datos se procesan de forma local y segura

La información de privacidad en App Store Connect ahora refleja correctamente nuestras prácticas. La app está lista para una nueva revisión.

Gracias por su atención.

---

## ✅ Checklist Final

Antes de reenviar, verifica:

- [ ] "Data Used to Track You" está vacío o marcado como "No, we do not use data for tracking"
- [ ] "Name" está en "Data Linked to You" (no en tracking)
- [ ] Los propósitos de "Name" son solo "App Functionality" y/o "Personalization"
- [ ] NO hay propósitos de publicidad marcados
- [ ] La política de privacidad en el sitio web refleja que no hacen tracking
- [ ] Has guardado todos los cambios en App Store Connect

---

## 🔍 Verificación Adicional

### Si la app NO hace tracking:

1. **No uses ATT** - No necesitas implementar App Tracking Transparency
2. **No uses IDFA** - No solicites el identificador de publicidad
3. **No uses Advertising ID** - No utilices identificadores de publicidad de Android
4. **No compartas con redes publicitarias** - No envíes datos a Facebook Ads, Google Ads, etc.

### Si la app SÍ hace tracking (no es el caso de Anto):

1. **Debes implementar ATT** - Solicitar permiso antes de tracking
2. **Mostrar el prompt ATT** - Usar `requestTrackingAuthorization`
3. **Respetar la decisión del usuario** - No hacer tracking si el usuario rechaza

---

## 📚 Referencias

- [Apple - App Tracking Transparency](https://developer.apple.com/documentation/apptrackingtransparency)
- [Apple - User Privacy and Data Use](https://developer.apple.com/app-store/user-privacy-and-data-use/)
- [Política de Privacidad de Anto](https://antoapps.com/privacidad)

---

**Última actualización:** Diciembre 2025

