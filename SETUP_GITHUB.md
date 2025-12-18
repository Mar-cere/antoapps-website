# 🚀 Setup GitHub + Vercel - Guía Paso a Paso

Guía completa para crear un repositorio en GitHub y conectarlo con Vercel para despliegues automáticos.

---

## 📋 Paso 1: Preparar el Proyecto Local

Ya hemos preparado el proyecto. Ahora inicializamos Git:

```bash
cd /Users/marceloull/Documents/SquareAnto

# Inicializar repositorio Git
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit - AntoApps website"
```

---

## 🐙 Paso 2: Crear Repositorio en GitHub

### Opción A: Desde la Web (Recomendado)

1. **Ve a GitHub:**
   - Abre [github.com](https://github.com)
   - Inicia sesión o crea una cuenta

2. **Crear nuevo repositorio:**
   - Haz clic en el botón **"+"** (arriba derecha) → **"New repository"**
   - O ve directamente a [github.com/new](https://github.com/new)

3. **Configurar el repositorio:**
   - **Repository name:** `antoapps-website` (o el nombre que prefieras)
   - **Description:** "Sitio web de AntoApps"
   - **Visibility:** 
     - ✅ **Public** (recomendado, gratis)
     - ⚠️ **Private** (si prefieres que sea privado)
   - **NO marques:**
     - ❌ Add a README file (ya tenemos uno)
     - ❌ Add .gitignore (ya tenemos uno)
     - ❌ Choose a license (opcional, puedes agregarlo después)
   - Haz clic en **"Create repository"**

4. **GitHub te mostrará instrucciones:**
   - Copia la URL del repositorio (algo como: `https://github.com/tu-usuario/antoapps-website.git`)
   - La necesitarás en el siguiente paso

### Opción B: Desde GitHub CLI (Si lo tienes instalado)

```bash
gh repo create antoapps-website --public --source=. --remote=origin --push
```

---

## 🔗 Paso 3: Conectar el Proyecto Local con GitHub

Ejecuta estos comandos (reemplaza `[tu-usuario]` y `[nombre-repo]` con tus valores):

```bash
cd /Users/marceloull/Documents/SquareAnto

# Agregar el repositorio remoto
git remote add origin https://github.com/[tu-usuario]/[nombre-repo].git

# Cambiar a la rama main (si no estás en ella)
git branch -M main

# Subir el código a GitHub
git push -u origin main
```

**Ejemplo real:**
```bash
git remote add origin https://github.com/marceloull/antoapps-website.git
git branch -M main
git push -u origin main
```

---

## ✅ Paso 4: Verificar en GitHub

1. Ve a tu repositorio en GitHub
2. Deberías ver todos tus archivos
3. El README.md debería mostrarse en la página principal

---

## 🚀 Paso 5: Conectar GitHub con Vercel

### Opción A: Desde Vercel Dashboard (Recomendado)

1. **Ve a Vercel Dashboard:**
   - Abre [vercel.com/dashboard](https://vercel.com/dashboard)
   - Inicia sesión si no lo has hecho

2. **Importar proyecto:**
   - Haz clic en **"Add New..."** → **"Project"**
   - O haz clic en **"Import Project"**

3. **Conectar con GitHub:**
   - Si es la primera vez, Vercel te pedirá autorizar GitHub
   - Haz clic en **"Import"** junto a tu repositorio `antoapps-website`
   - O busca tu repositorio en la lista

4. **Configurar el proyecto:**
   - **Project Name:** `antoapps-website` (o el que prefieras)
   - **Framework Preset:** Deja en "Other" o "No Framework"
   - **Root Directory:** `./` (raíz)
   - **Build Command:** Déjalo vacío (no necesitamos build)
   - **Output Directory:** Déjalo vacío
   - **Install Command:** `npm install` (opcional)

5. **Configurar dominio:**
   - En **"Configure Project"**, busca la sección de dominio
   - Agrega `antoapps.com` y `www.antoapps.com`
   - O hazlo después en Settings → Domains

6. **Desplegar:**
   - Haz clic en **"Deploy"**
   - Vercel comenzará a desplegar automáticamente

### Opción B: Desde Vercel CLI

```bash
# Enlazar proyecto existente
vercel link

# Desplegar
vercel --prod
```

---

## 🎉 Paso 6: ¡Listo!

Una vez conectado:

### ✅ Despliegues Automáticos

- Cada vez que hagas `git push`, Vercel desplegará automáticamente
- Cada Pull Request tendrá su propio preview
- Los cambios se reflejarán en `antoapps.com` automáticamente

### 📝 Workflow de Trabajo

```bash
# 1. Hacer cambios en tu código
# 2. Agregar cambios
git add .

# 3. Hacer commit
git commit -m "Descripción de los cambios"

# 4. Subir a GitHub
git push

# 5. Vercel desplegará automáticamente ✨
```

---

## 🔧 Configuración Adicional (Opcional)

### Agregar GitHub Actions (CI/CD)

Crea `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### Proteger la rama main

1. Ve a Settings → Branches en GitHub
2. Agrega regla para `main`
3. Requiere Pull Requests antes de merge

---

## 🐛 Troubleshooting

### Error: "remote origin already exists"

```bash
# Ver remotos actuales
git remote -v

# Eliminar remoto existente
git remote remove origin

# Agregar de nuevo
git remote add origin https://github.com/[usuario]/[repo].git
```

### Error al hacer push

```bash
# Verificar que estás autenticado
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Si usas HTTPS y te pide credenciales:
# GitHub ya no acepta contraseñas, usa Personal Access Token
# Ve a GitHub → Settings → Developer settings → Personal access tokens
```

### Vercel no detecta cambios

- Verifica que el repositorio esté conectado correctamente
- Revisa los logs en Vercel Dashboard
- Asegúrate de hacer push a la rama `main`

---

## 📚 Recursos

- [GitHub Docs](https://docs.github.com)
- [Vercel Git Integration](https://vercel.com/docs/concepts/git)
- [Git Basics](https://git-scm.com/book)

---

¡Listo para trabajar con Git y despliegues automáticos! 🚀

