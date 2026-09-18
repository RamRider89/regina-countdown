#!/usr/bin/env bash
set -euo pipefail

gh pr create \
  --title "feat: vacaciones Regina — countdown personalizado Cancún" \
  --base main \
  --head feature/regina_trip \
  --body "## Resumen

Rama completa de personalización del countdown para las vacaciones a Cancún.

- **i18n es/en/ru** — \`tripName\`, \`subtitle\`, \`completionMessage\` localizados; \`language\` en config activa el idioma
- **Timezones** — hora de salida por ciudad (Москва / México) via \`timezones[]\` en config
- **FloatingStickers** — stickers Giphy aparecen/desaparecen en posiciones y tamaños aleatorios (solo desktop)
- **TravelersGallery** — Carlos y Regina con avatares Giphy \`.webp\` transparentes; fallback a \`UserCircle\` (lucide-react)
- **DestinationCard** — imagen desde \`destinationImage\` en config (\`mexico.webp\`)
- **Video de fondo** — \`beach-long-r2.mp4\` (3.4MB) para todos los dispositivos con poster WebP (29KB)
- **CelebrationOverlay** — confetti al expirar el countdown

## Performance

| Métrica | Antes | Después |
|---|---|---|
| Poster (PNG) | 805 KB | 29 KB WebP |
| Destination image | 588 KB | 6 KB WebP |
| Video desktop | 7.5 MB | 3.4 MB |
| Video mobile | 8.9 MB | mismo desktop |
| Google Fonts | render-blocking | preload+onload |
| Lighthouse Accessibility | — | **100** |
| Lighthouse Best Practices | — | **100** |

## Plan de pruebas

- [ ] Verificar countdown en modo español, inglés y ruso (\`language\` en config.json)
- [ ] Verificar horarios de salida Москва / México en DepartureTimezones
- [ ] Stickers flotantes visibles en desktop, ocultos en mobile
- [ ] Avatares Carlos y Regina sin border-radius (sticker libre)
- [ ] Video de fondo reproduciéndose en desktop y mobile
- [ ] Lighthouse en production build (\`npm run build && npm run preview\`)
- [ ] Configurar secret \`AZURE_STATIC_WEB_APPS_API_TOKEN\` en GitHub para activar deploy

🤖 Generated with [Claude Code](https://claude.com/claude-code)"
