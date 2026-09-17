# TODO — Regina Countdown

## Pendiente (main)

- [ ] `public/config.json` — completar con valores reales de producción
- [ ] Lighthouse audit ≥ 90 — `npm run build && npm run preview`, luego `npx lighthouse http://localhost:4173`
- [ ] Contraste de colores validado (WCAG AA) con los colores reales de producción
- [ ] Secreto `AZURE_STATIC_WEB_APPS_API_TOKEN` configurado en GitHub para activar el CI/CD

## Pendiente (feature/regina_trip)

- [ ] Actualizar tests de `useConfig` para el nuevo schema `VacationConfig`
- [ ] `public/config.json` — rellenar con datos reales del viaje (fechas, nombres, destino)
- [ ] Agregar imágenes de fondo / galería en `public/` si se desean
- [ ] PR + merge a main cuando esté validado visualmente

## Completado

### Scaffolding & Arquitectura
- [x] React 18 + TypeScript + Vite 5, Node 22
- [x] Estructura `components/`, `hooks/`, `types/`
- [x] `CountdownConfig` / `TimeRemaining` interfaces
- [x] `public/config.json` — config en runtime, sin recompilar

### Funcionalidad
- [x] `useConfig` — fetch + validación (campos requeridos, fecha ISO, colores hex)
- [x] `useCountdown` — setInterval, limpia al expirar
- [x] Redirección automática al expirar (5 s, solo si `ctaUrl` configurado)
- [x] Favicon dinámico desde `config.logo`
- [x] `<title>` y `<meta description>` dinámicos desde config

### Diseño Visual
- [x] Glassmorphism cards (backdrop-filter, border rgba, shadow)
- [x] Hero full-height con overlay degradado sobre backgroundImage
- [x] Animaciones entrada (fade-down/fade-up) y pop-in por tick de segundos
- [x] Tipografía Inter, responsive 320/768/1280px
- [x] `prefers-reduced-motion` respetado
- [x] Loading spinner, error screen

### Accesibilidad & SEO
- [x] `role="timer"` + `aria-live="polite"` + `aria-atomic` en CountdownGrid
- [x] `focus-visible` en CtaButton
- [x] `loading="lazy"` + `decoding="async"` en logo

### Despliegue
- [x] `staticwebapp.config.json` — SPA fallback + headers de seguridad
- [x] GitHub Actions CI/CD — tests → build → deploy en push a main, preview en PRs

### Calidad
- [x] 13 tests unitarios (Vitest 2 + Testing Library) — 5 `useCountdown`, 8 `useConfig`
- [x] Tests integrados en CI (bloquean deploy si fallan)
- [x] `CLAUDE.md` y `README.md` actualizados

### Rama feature/regina_trip (vacaciones)
- [x] Spec revisada: `plan/Countdown_Vacaciones_Especificacion.md`
- [x] `VacationConfig` / `VacationTheme` interfaces en `src/types/config.ts`
- [x] `canvas-confetti` instalado (v1.9.4 + tipos)
- [x] `public/config.json` migrado a schema `VacationConfig`
- [x] `useConfig` actualizado — valida `VacationConfig` (tripName, departureDate, theme, participants)
- [x] `CelebrationOverlay` — confetti + mensaje al expirar (reemplaza redirect)
- [x] `DestinationCard` — tarjeta glassmorphism con 📍 destino
- [x] `ParticipantsList` — burbujas con iniciales automáticas
- [x] `PhotoGallery` — grid responsive desde `gallery[]`
- [x] `CountdownGrid` actualizado — usa `departureDate`, muestra `CelebrationOverlay` al expirar
- [x] `Hero` rediseñado — layout vacaciones, eyebrow, info-row, galería opcional
- [x] `App.tsx` actualizado — inyecta `--accent-color`, title con ✈️
- [x] `index.css` rediseñado — tema travel, glow animado, cards coloreadas por nth-child
