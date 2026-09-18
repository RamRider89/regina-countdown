# Performance

## Resultados Lighthouse (production build)

Correr siempre contra `npm run preview` (build de producción), **no** el dev server.

| Métrica | Desktop | Mobile |
|---|---|---|
| Performance | ≥ 90 (objetivo) | ≥ 90 (objetivo) |
| Accessibility | **100** | **100** |
| Best Practices | **100** | **100** |
| SEO | — | — |

## Optimizaciones aplicadas

### Imágenes

| Archivo | Antes | Después | Método |
|---|---|---|---|
| `beach-long.png` → `.webp` | 805 KB | 29 KB | `magick convert -quality 75` |
| `mexico.png` → `.webp` | 588 KB | 6 KB | `magick convert -quality 80` |
| `beach-1.png` → `.webp` | — | — | WebP |
| `beach-2.png` → `.webp` | — | — | WebP |

Convertir PNG a WebP:
```bash
magick convert input.png -quality 80 output.webp
# Para batch:
for f in public/images/*.png; do magick convert "$f" -quality 80 "${f%.png}.webp"; done
```

### Video

| Archivo | Tamaño | Uso |
|---|---|---|
| `beach-long-r.mp4` | ~7.5 MB | Original (reemplazado) |
| `beach-long-r2.mp4` | 3.4 MB | Desktop + Mobile (actual) |

Convertir video con ffmpeg (calidad baja para web):
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -an \
  -vf "scale=1920:-2" -movflags +faststart output.mp4
# Para mobile (aún más pequeño):
ffmpeg -i input.mp4 -c:v libx264 -crf 32 -preset slow -an \
  -vf "scale=960:-2" -movflags +faststart output-mobile.mp4
```

**Nota:** GIF animado → WebP animado pierde calidad (límite de 256 colores del GIF fuente).
Para calidad, exportar directo a MP4 desde la fuente.

### Fuentes

Google Fonts con carga no bloqueante (en `index.html`):

```html
<!-- preload + swap sin bloquear render -->
<link rel="preload" as="style"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap"
  onload="this.onload=null;this.rel='stylesheet'" />
<noscript>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" />
</noscript>
```

### Video de fondo

```html
<!-- Preload hint para desktop (sin bloquear mobile) -->
<link rel="preload" as="video" href="/videos/beach-long-r2.mp4"
  media="(min-width: 768px)" fetchpriority="high" />
<!-- Poster WebP (29KB) para FCP inmediato -->
<link rel="preload" as="image" href="/images/beach-long.webp" fetchpriority="high" />
```

En el elemento `<video>`:
- `preload="none"` — no descarga hasta que el browser lo necesite
- `poster="/images/beach-long.webp"` — imagen inmediata mientras carga el video
- `autoplay muted loop playsinline` — para reproducción automática en mobile

### Imágenes lazy

Todos los avatares e imágenes below-the-fold tienen:
```html
loading="lazy" decoding="async" width="..." height="..."
```

Los `width`/`height` explícitos previenen Cumulative Layout Shift (CLS).

## Cómo medir Lighthouse

```bash
# 1. Build de producción
npm run build

# 2. Servidor local de preview
npm run preview  # http://localhost:4173

# 3. En Chrome DevTools → Lighthouse → Desktop/Mobile → Generate report
# O con el script:
./scripts/lighthouse.sh
```

## Objetivo pendiente

- [ ] Lighthouse Performance ≥ 90 en production build post-merge
- [ ] Validar contraste de colores (WCAG AA) con colores reales del theme
