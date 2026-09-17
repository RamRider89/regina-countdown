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

## Despliegue

Destino principal: **Azure Static Web Apps**.  
El archivo `staticwebapp.config.json` (pendiente) configura el SPA fallback.
