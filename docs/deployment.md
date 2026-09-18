# Deployment — Azure Static Web Apps

## Recurso Azure

| Campo | Valor |
|---|---|
| Nombre | `regina-countdown` |
| URL producción | https://purple-pebble-07a0da800.5.azurestaticapps.net |
| Location | East Asia |
| Plan | Free tier |
| Repo conectado | `RamRider89/regina-countdown` |
| Rama | `main` |

## CI/CD — GitHub Actions

Archivo: `.github/workflows/azure-static-web-apps-purple-pebble-07a0da800.yml`

> **Importante:** El nombre del archivo NO puede cambiar. Azure SWA usa OIDC para verificar que el deploy viene de un workflow con nombre `azure-static-web-apps-<adjective>-<noun>-<hex>.yml`. Renombrarlo rompe el deploy.

### Triggers

| Evento | Resultado |
|---|---|
| `push` a `main` | Build + deploy a producción |
| `pull_request` abierto/actualizado contra `main` | Build + deploy a staging (URL temporal) |
| `pull_request` cerrado | Limpieza del staging |

### Pipeline

```
checkout → setup Node 22 → npm ci → npm run test:run → npm run build
→ install OIDC client → get ID token → azure/static-web-apps-deploy@v1
```

Los tests bloquean el deploy si fallan.

### Autenticación (OIDC)

Este recurso usa **OIDC (OpenID Connect)** — Azure verifica la identidad del workflow mediante un token firmado por GitHub, además del deployment token. Ambos son necesarios:

```yaml
permissions:
  id-token: write    # requerido para obtener el OIDC token
  contents: read

steps:
  - name: Install OIDC Client from Core Package
    run: npm install @actions/core@1.6.0 @actions/http-client

  - name: Get Id Token
    uses: actions/github-script@v6
    id: idtoken
    with:
      script: |
        const coredemo = require('@actions/core')
        return await coredemo.getIDToken()
      result-encoding: string

  - name: Build And Deploy
    uses: Azure/static-web-apps-deploy@v1
    with:
      azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN_PURPLE_PEBBLE_07A0DA800 }}
      github_id_token: ${{ steps.idtoken.outputs.result }}
      action: "upload"
      app_location: "/"
      output_location: "build"
```

### Secrets requeridos

| Secret | Descripción |
|---|---|
| `AZURE_STATIC_WEB_APPS_API_TOKEN_PURPLE_PEBBLE_07A0DA800` | Creado automáticamente por Azure al conectar el repo. No renombrar. |
| `GITHUB_TOKEN` | Automático de GitHub Actions |

## Directorio de build

Vite genera en `build/` (no `dist/`). Configurado en `vite.config.ts`:

```ts
build: {
  outDir: 'build',
  assetsInlineLimit: 4096,
}
```

Azure SWA Oryx builder espera `build/` por convención de Create React App. Cambiarlo a `dist/` rompe el deploy.

## staticwebapp.config.json

```json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/assets/*", "/config.json", "*.{ico,png,svg,webp,jpg,jpeg,gif,woff,woff2}"]
  },
  "mimeTypes": { ".json": "application/json" },
  "globalHeaders": {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()"
  },
  "responseOverrides": {
    "404": { "rewrite": "/index.html", "statusCode": 200 }
  }
}
```

## Verificar estado del deploy

```bash
./scripts/deploy-status.sh
# o directamente:
GH_TOKEN="$GITHUB_TOKEN" gh run list \
  --repo RamRider89/regina-countdown \
  --workflow azure-static-web-apps-purple-pebble-07a0da800.yml \
  --limit 5
```

## Troubleshooting

### `Could not determine the Static Web App from the GitHub OIDC workflow reference`

El workflow fue renombrado o el deploy viene de un archivo que no sigue el patrón `azure-static-web-apps-<adjective>-<noun>-<hex>.yml`.
**Solución:** No renombrar el workflow. Agregar pasos a `azure-static-web-apps-purple-pebble-07a0da800.yml`.

### `No matching Static Web App was found or the api key was invalid`

El deployment token no corresponde al recurso, o falta la autenticación OIDC.
**Solución:** Verificar que el secret es `AZURE_STATIC_WEB_APPS_API_TOKEN_PURPLE_PEBBLE_07A0DA800` y que el workflow incluye los pasos OIDC.

### `The app build failed to produce artifact folder: 'build'`

Vite está configurado para outputear a `dist/` en lugar de `build/`.
**Solución:** Verificar `vite.config.ts` tiene `build: { outDir: 'build' }`.

### `deployment_token provided was invalid`

El secret existe pero su valor es incorrecto o de un recurso distinto.
**Solución:** Azure Portal → Static Web Apps → `regina-countdown` → Manage deployment token → regenerar.

### Build falla en tests

```bash
npm run test:run  # correr localmente para ver el error
```

## Deployments alternativos

Si Azure no funciona, la app es un SPA estático compatible con:

| Plataforma | Comando |
|---|---|
| GitHub Pages | `npm run build` → push `build/` a rama `gh-pages` |
| Netlify | Drag & drop `build/` en netlify.com/drop |
| Vercel | `vercel --prod` desde la raíz |
