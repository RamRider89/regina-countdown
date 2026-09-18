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

Archivo: `.github/workflows/azure-deploy.yml`

### Triggers

| Evento | Resultado |
|---|---|
| `push` a `main` | Build + deploy a producción |
| `pull_request` abierto/actualizado contra `main` | Build + deploy a staging (URL temporal) |
| `pull_request` cerrado | Limpieza del staging |

### Pipeline

```
checkout → setup Node 22 → npm ci → npm run test:run → npm run build → azure/static-web-apps-deploy@v1
```

Los tests bloquean el deploy si fallan.

### Secrets requeridos

| Secret | Descripción |
|---|---|
| `AZURE_STATIC_WEB_APPS_API_TOKEN` | Token de deployment de Azure (ver abajo) |
| `GITHUB_TOKEN` | Automático de GitHub Actions — no configurar manualmente |

## Configurar / actualizar el token de Azure

### Paso 1 — Obtener el token desde Azure Portal

1. Ir a [Azure Portal](https://portal.azure.com)
2. Buscar **Static Web Apps** → seleccionar `regina-countdown`
3. En el menú izquierdo: **Settings** → **Deployment token** (o "Manage deployment token")
4. Copiar el token

### Paso 2 — Guardar en variable de entorno Ubuntu

```bash
# En ~/.bashrc o ~/.zshrc:
export AZURE_STATIC_WEB_APPS_API_TOKEN="<token_copiado>"
source ~/.zshrc  # o ~/.bashrc
```

### Paso 3 — Actualizar el secret en GitHub

```bash
./scripts/fix-azure-token.sh
```

O manualmente:

```bash
echo "$AZURE_STATIC_WEB_APPS_API_TOKEN" | \
  GH_TOKEN="$GITHUB_TOKEN" gh secret set AZURE_STATIC_WEB_APPS_API_TOKEN \
  --repo RamRider89/regina-countdown
```

### Paso 4 — Re-trigger el deploy

```bash
./scripts/deploy-status.sh         # ver estado actual
./scripts/trigger-deploy.sh        # re-trigger manualmente
```

O hacer un push vacío:

```bash
git commit --allow-empty -m "ci: re-trigger deploy"
git push
```

## Verificar deploy

```bash
# Ver el último workflow run
GH_TOKEN="$GITHUB_TOKEN" gh run list \
  --repo RamRider89/regina-countdown \
  --workflow azure-deploy.yml \
  --limit 5

# Ver logs del último run
GH_TOKEN="$GITHUB_TOKEN" gh run view \
  --repo RamRider89/regina-countdown \
  --log
```

## staticwebapp.config.json

```json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/assets/*", "/config.json", "*.{ico,png,svg,webp,jpg,jpeg,gif,woff,woff2}"]
  },
  "mimeTypes": {
    ".json": "application/json"
  },
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

- `navigationFallback` → SPA routing: todas las rutas sirven `index.html`
- `exclude` → assets estáticos pasan directamente, no reescritos
- `globalHeaders` → headers de seguridad básicos

## Troubleshooting

### `deployment_token provided was invalid`

El secret `AZURE_STATIC_WEB_APPS_API_TOKEN` en GitHub no coincide con el recurso Azure.
**Solución:** Seguir "Configurar / actualizar el token de Azure" arriba.

### `gh: Resource not accessible by personal access token`

El PAT de GitHub no tiene permisos suficientes.
**Solución:** El token necesita:
- `Contents: Read and write`
- `Pull requests: Read and write`
- `Actions: Read` (para ver runs)
- `Secrets: Read and write` (para `gh secret set`)

### Build falla en tests

```bash
npm run test:run  # correr localmente para ver el error
```

### Config.json no encontrado en producción

Azure Static Web Apps sirve archivos desde `dist/`. Verificar que `public/config.json`
existe — Vite lo copia automáticamente al build.

## Deployments alternativos

Si Azure no funciona, la app es un SPA estático compatible con:

| Plataforma | Comando |
|---|---|
| GitHub Pages | `npm run build` → push `dist/` a rama `gh-pages` |
| Netlify | Drag & drop `dist/` en netlify.com/drop |
| Vercel | `vercel --prod` desde la raíz |
| Cualquier CDN | Copiar `dist/` con redirect de 404 → `index.html` |
