# TODO — Regina Countdown

## Pendiente (main)

- [ ] Lighthouse audit ≥ 90 en production build — `npm run build && npm run preview`, luego test desktop + mobile
- [ ] Contraste de colores validado (WCAG AA) con los colores reales de producción
- [ ] Secreto `AZURE_STATIC_WEB_APPS_API_TOKEN` configurado en GitHub para activar el CI/CD

## Pendiente (feature/regina_trip)

- [ ] PR + merge a main cuando esté validado visualmente
- [ ] Video mobile dedicado en MP4 (actualmente usa el desktop `beach-long-r2.mp4` para ambos)

## Completado

### Scaffolding & Arquitectura
- [x] React 18 + TypeScript + Vite 5, Node 22
- [x] Estructura `components/`, `hooks/`, `types/`
- [x] `public/config.json` — config en runtime, sin recompilar
- [x] `staticwebapp.config.json` — SPA fallback + headers de seguridad
- [x] GitHub Actions CI/CD — tests → build → deploy en push a main, preview en PRs

### Funcionalidad principal
- [x] `useConfig` — fetch + validación (`LocalizedString`, fecha ISO, colores hex, participants)
- [x] `useCountdown` — setInterval, limpia al expirar
- [x] `CelebrationOverlay` — confetti (canvas-confetti) + mensaje al expirar
- [x] `<title>` y `<meta description>` dinámicos y localizados desde config

### i18n & Timezones
- [x] `src/i18n/translations.ts` — diccionario UI para es / en / ru
- [x] `LocalizedString` — campos `tripName`, `subtitle`, `completionMessage` soportan objeto `{es,en,ru}` o string plano
- [x] `language` en config.json controla idioma activo (default: es)
- [x] `DepartureTimezones` — hora de salida por ciudad (México / Москва)
- [x] `timezones[]` en config con label + IANA tz

### Diseño Visual
- [x] Glassmorphism cards (backdrop-filter, border rgba, shadow)
- [x] Hero full-height con video de fondo (poster WebP, preload)
- [x] Video: desktop `beach-long-r2.mp4` (3.4MB) para todos los dispositivos
- [x] `FloatingStickers` — stickers Giphy aparecen/desaparecen en posiciones y tamaños aleatorios
- [x] `TravelersGallery` — cards con avatar Giphy (.webp transparente) o icono `UserCircle` (lucide-react)
- [x] `DestinationCard` — imagen desde config (`destinationImage`) o texto+ícono como fallback
- [x] `PhotoGallery` — grid responsive desde `gallery[]`
- [x] Animaciones entrada, glow, sticker-appear keyframe
- [x] Tipografía Inter, responsive 320/768/1280px
- [x] `prefers-reduced-motion` respetado

### Performance
- [x] Imágenes convertidas a WebP: beach-long (805KB→29KB), mexico (588KB→6KB), gallery
- [x] Google Fonts: `preload+onload` (no render-blocking)
- [x] `<link rel="preload">` para video desktop y poster con `fetchpriority=high`
- [x] Video: `preload="none"` (poster visible de inmediato)
- [x] `loading="lazy"` + `decoding="async"` en avatares e imágenes below-the-fold
- [x] Imágenes con `width`/`height` explícitos (no layout shift)

### Accesibilidad & SEO
- [x] `role="timer"` + `aria-live="polite"` + `aria-atomic` en CountdownGrid
- [x] `aria-label` del countdown localizado por idioma
- [x] `focus-visible` en botones
- [x] Accessibility score 100 en Lighthouse

### Calidad
- [x] 14 tests unitarios (Vitest 2 + Testing Library)
- [x] Tests integrados en CI (bloquean deploy si fallan)
- [x] `CLAUDE.md` actualizado
