# TODO — Regina Countdown

## Pendiente

- [ ] `public/config.json` — completar con valores reales de producción
- [ ] Lighthouse audit ≥ 90 — `npm run build && npm run preview`, luego `npx lighthouse http://localhost:4173`
- [ ] Contraste de colores validado (WCAG AA) con los colores reales de producción
- [ ] Secreto `AZURE_STATIC_WEB_APPS_API_TOKEN` configurado en GitHub para activar el CI/CD

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
