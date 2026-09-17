# TODO — Regina Countdown

## Pendiente

### Diseño Visual
- [ ] `src/index.css` — reset global, CSS custom properties para colores dinámicos (`--primary-color`, `--secondary-color`)
- [ ] `Hero.tsx` — overlay con degradado sobre `backgroundImage`, layout centrado full-height
- [ ] `CountdownCard.tsx` — glassmorphism (backdrop-filter, border rgba, box-shadow suave), efecto hover
- [ ] `CtaButton.tsx` — estados hover/focus, `outline` accesible en focus-visible
- [ ] Tipografía — importar fuente (e.g. Inter o similar desde Google Fonts o self-hosted)
- [ ] Animaciones — entrada de tarjetas (fade/slide), transición de segundos (flip o fade)
- [ ] Mobile-first responsive — breakpoints 320px / 768px / 1280px

### Funcionalidad
- [ ] `useConfig.ts` — validación básica del JSON cargado (campos requeridos presentes)
- [ ] Redirección automática opcional al expirar (`config.ctaUrl` si está configurado)
- [ ] Loading state — skeleton o spinner mientras carga `config.json`
- [ ] Favicon dinámico o logo en `<head>` desde config

### Accesibilidad & SEO
- [ ] `index.html` — `<title>` y `<meta description>` dinámicos desde config (via `useEffect`)
- [ ] Atributos ARIA en `CountdownGrid` (live region `aria-live="polite"`)
- [ ] Contraste de colores validado con `primaryColor`/`secondaryColor` configurados (WCAG AA)
- [ ] Navegación por teclado completa

### Configuración & Despliegue
- [ ] `staticwebapp.config.json` — SPA fallback para Azure Static Web Apps
- [ ] `public/config.json` — completar con valores reales de producción
- [ ] Variables de entorno en Vite si se necesita configuración por entorno (`import.meta.env`)
- [ ] GitHub Actions workflow para CI/CD a Azure Static Web Apps

### Calidad
- [ ] Tests unitarios para `useCountdown` (lógica de expiración, decremento)
- [ ] Tests unitarios para `useConfig` (error handling, JSON inválido)
- [ ] Lighthouse audit ≥ 90 en Performance, Accessibility, Best Practices
- [ ] Optimización de imagen de fondo (WebP, lazy load, preload hint)

## Completado

- [x] Scaffolding React + Vite + TypeScript
- [x] Estructura de carpetas (`components/`, `hooks/`, `types/`)
- [x] `CountdownConfig` / `TimeRemaining` interfaces (`src/types/config.ts`)
- [x] `useConfig` hook — carga `public/config.json` en runtime
- [x] `useCountdown` hook — timer con `setInterval`, limpia al expirar
- [x] `CountdownCard` — componente de unidad (días/horas/minutos/segundos)
- [x] `CountdownGrid` — grid de 4 tarjetas, muestra `completionMessage` al expirar
- [x] `Hero` — sección principal, orquesta logo/título/subtítulo/grid/CTA
- [x] `CtaButton` — enlace externo con color primario desde config
- [x] `App.tsx` — raíz con manejo de loading/error
- [x] `public/config.json` — valores por defecto del contrato
- [x] `CLAUDE.md` — documentación del repo para Claude Code
