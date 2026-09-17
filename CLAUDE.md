# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Countdown web app (cuenta regresiva) — single-page, publicly deployable. Full spec: `plan/Contrato_Claude_Countdown_Web.md`. Task tracker: `TODO.md`.

Primary deployment target: **Azure Static Web Apps**. Fallbacks: GitHub Pages, Netlify, Vercel.

## Stack

React 18 + TypeScript + Vite 5. Node 22 (via nvm).

```bash
npm run dev      # dev server (localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview production build locally
npm run lint     # ESLint
```

## Architecture

```
src/
  types/config.ts          # CountdownConfig, TimeRemaining interfaces
  hooks/useConfig.ts       # fetches /config.json at runtime (never baked in at build)
  hooks/useCountdown.ts    # setInterval timer → TimeRemaining
  components/
    Hero.tsx               # full hero section (bg, overlay, logo, title, CTA)
    CountdownGrid.tsx      # 4-card grid, shows completionMessage when expired
    CountdownCard.tsx      # single unit card (glassmorphism styling target)
    CtaButton.tsx          # external link with primaryColor from config
  App.tsx                  # root: loads config, renders Hero
public/
  config.json              # runtime config — edit this, no recompile needed
```

## Configuration

All user-facing values live in `public/config.json` and are loaded via `useConfig` at runtime (HTTP GET). **Never** bake config into `import.meta.env` or `src/` constants — the requirement is zero-recompile reconfiguration.

Config shape (see `src/types/config.ts` for the full TypeScript interface):

```json
{
  "targetDate": "2027-01-01T00:00:00Z",
  "timezone": "America/Mexico_City",
  "primaryColor": "#0057B8",
  "secondaryColor": "#00A3E0",
  "ctaUrl": "https://example.com"
}
```

## Key Constraints

- Mobile-first, breakpoints at 320 / 768 / 1280 px.
- Glassmorphism cards: `backdrop-filter: blur()`, `background: rgba(...)`, soft `box-shadow`.
- Accessibility: WCAG 2.1 AA — `aria-live="polite"` on countdown, keyboard nav, sufficient contrast.
- Lighthouse targets: Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90.
- Azure Static Web Apps needs `staticwebapp.config.json` at repo root with SPA fallback.
