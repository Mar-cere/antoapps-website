# Guía de Iconos

## Estructura de Iconos

El proyecto utiliza el icono principal `antoIcon.png` ubicado en `assets/images/` y crea diferentes versiones para diferentes propósitos:

### Iconos en la Raíz del Proyecto

- **`favicon.png`** (192x192) - Icono principal para navegadores modernos
- **`favicon-32x32.png`** (32x32) - Icono para navegadores estándar
- **`favicon-16x16.png`** (16x16) - Icono pequeño para pestañas
- **`apple-touch-icon.png`** (180x180) - Icono para dispositivos iOS

### Icono Original

- **`assets/images/antoIcon.png`** - Icono original de alta resolución

## Optimización Recomendada

Para mejorar el rendimiento, se recomienda redimensionar los iconos a sus tamaños exactos:

```bash
# Usando ImageMagick (si está instalado)
convert assets/images/antoIcon.png -resize 192x192 favicon.png
convert assets/images/antoIcon.png -resize 32x32 favicon-32x32.png
convert assets/images/antoIcon.png -resize 16x16 favicon-16x16.png
convert assets/images/antoIcon.png -resize 180x180 apple-touch-icon.png

# O usando sips (macOS)
sips -z 192 192 assets/images/antoIcon.png --out favicon.png
sips -z 32 32 assets/images/antoIcon.png --out favicon-32x32.png
sips -z 16 16 assets/images/antoIcon.png --out favicon-16x16.png
sips -z 180 180 assets/images/antoIcon.png --out apple-touch-icon.png
```

## Referencias en el Código

### HTML (`index.html`)

Los iconos están referenciados en el `<head>`:

```html
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="192x192" href="/favicon.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
```

### Manifest (`manifest.json`)

Los iconos están definidos en el manifest para PWA:

```json
{
  "icons": [
    {
      "src": "/favicon.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/apple-touch-icon.png",
      "sizes": "180x180",
      "type": "image/png"
    }
  ]
}
```

### Open Graph

El icono también se usa para compartir en redes sociales:

```html
<meta property="og:image" content="https://antoapps.com/assets/images/antoIcon.png">
<meta property="twitter:image" content="https://antoapps.com/assets/images/antoIcon.png">
```

## Notas

- Los iconos actuales son copias del original y serán escalados automáticamente por el navegador
- Para mejor rendimiento, redimensiona los iconos a sus tamaños exactos
- El icono original debe mantenerse en `assets/images/` para futuras modificaciones

