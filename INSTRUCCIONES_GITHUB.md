# 🚀 Instrucciones Rápidas - GitHub + Vercel

## ✅ Paso 1: Crear Repositorio en GitHub

1. Ve a [github.com/new](https://github.com/new)
2. **Repository name:** `antoapps-website` (o el nombre que prefieras)
3. **Description:** "Sitio web de AntoApps"
4. **Visibility:** Public ✅
5. **NO marques:** README, .gitignore, license
6. Haz clic en **"Create repository"**

## ✅ Paso 2: Conectar con GitHub

Después de crear el repo, GitHub te mostrará una URL. Ejecuta estos comandos:

```bash
cd /Users/marceloull/Documents/SquareAnto

# Reemplaza [tu-usuario] y [nombre-repo] con tus valores
git remote add origin https://github.com/[tu-usuario]/[nombre-repo].git

# Subir el código
git branch -M main
git push -u origin main
```

**Ejemplo:**
```bash
git remote add origin https://github.com/marceloull/antoapps-website.git
git branch -M main
git push -u origin main
```

## ✅ Paso 3: Conectar con Vercel

1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Haz clic en **"Add New..."** → **"Project"**
3. Selecciona **"Import Git Repository"**
4. Autoriza GitHub si es necesario
5. Selecciona tu repositorio `antoapps-website`
6. Haz clic en **"Import"**
7. Configura:
   - **Framework Preset:** Other
   - **Root Directory:** `./`
   - Deja el resto por defecto
8. Haz clic en **"Deploy"**

## 🎉 ¡Listo!

Ahora cada vez que hagas `git push`, Vercel desplegará automáticamente.

---

📖 **Guía completa:** Ver [SETUP_GITHUB.md](./SETUP_GITHUB.md)

