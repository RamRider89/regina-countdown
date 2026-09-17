# Regina Countdown

Aplicación web de cuenta regresiva — single-page, responsive, configurable sin recompilar.

## Requisitos

- [nvm](https://github.com/nvm-sh/nvm)
- Node 22 (`.nvmrc` incluido)

## Inicio rápido

```bash
./scripts/dev.sh
```

O paso a paso:

```bash
nvm use          # activa Node 22 desde .nvmrc
npm install      # solo primera vez
npm run dev      # http://localhost:5173
```

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo (HMR) |
| `npm run build` | Build de producción → `dist/` |
| `npm run preview` | Preview del build local |
| `npm run lint` | ESLint |
| `npm run test:run` | Tests unitarios (una pasada) |
| `npm test` | Tests en modo watch |
| `npm run test:coverage` | Tests + reporte de cobertura |

## Configuración

Edita `public/config.json` — no requiere recompilar:

```json
{
  "targetDate": "2027-01-01T00:00:00Z",
  "timezone": "America/Mexico_City",
  "title": "Próximo Gran Lanzamiento",
  "subtitle": "Falta muy poco para comenzar",
  "primaryColor": "#0057B8",
  "secondaryColor": "#00A3E0",
  "ctaText": "Conoce Más",
  "ctaUrl": "https://example.com",
  "completionMessage": "¡Ya comenzamos!"
}
```

## Stack

- React 18 + TypeScript + Vite 5
- Node 22
- Vitest 2 + Testing Library

## Despliegue

Destino principal: **Azure Static Web Apps** (CI/CD via GitHub Actions).

Secret requerido en GitHub: `AZURE_STATIC_WEB_APPS_API_TOKEN`

## Lighthouse

Para auditar localmente:

```bash
npm run build && npm run preview
# En otra terminal:
npx lighthouse http://localhost:4173 --view
```

Targets: Performance ≥ 90 · Accessibility ≥ 90 · Best Practices ≥ 90
