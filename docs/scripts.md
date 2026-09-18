# Scripts

Todos los scripts están en `scripts/`. Ejecutar desde la raíz del proyecto.

## scripts/dev.sh

Inicia el servidor de desarrollo en http://localhost:5173.

```bash
./scripts/dev.sh
```

- Carga nvm e instala dependencias si faltan
- Hot reload con Vite

## scripts/build.sh

Build + utilidades de CI.

```bash
./scripts/build.sh           # build de producción → dist/
./scripts/build.sh test      # corre los 14 tests unitarios
./scripts/build.sh preview   # build + servidor local en http://localhost:4173
./scripts/build.sh all       # test → build → preview
```

## scripts/create-pr.sh

Crea el PR de `feature/regina_trip` → `main` en GitHub.

```bash
GH_TOKEN="$GITHUB_TOKEN" ./scripts/create-pr.sh
```

Requiere `gh` CLI instalado y autenticado.

## scripts/fix-azure-token.sh

Actualiza el secret `AZURE_STATIC_WEB_APPS_API_TOKEN` en GitHub con el valor de la variable de entorno local del mismo nombre.

> Nota: el secret activo del recurso actual es `AZURE_STATIC_WEB_APPS_API_TOKEN_PURPLE_PEBBLE_07A0DA800`, creado automáticamente por Azure. Este script actualiza el secret genérico; para el correcto, usar `gh secret set AZURE_STATIC_WEB_APPS_API_TOKEN_PURPLE_PEBBLE_07A0DA800`.

```bash
./scripts/fix-azure-token.sh
```

**Prerequisitos:**
1. `AZURE_STATIC_WEB_APPS_API_TOKEN` exportado en el entorno (`.bashrc` / `.zshrc`)
2. `GITHUB_TOKEN` exportado con permisos de `Secrets: write`
3. `gh` CLI instalado

**Si el token no está en el entorno**, se puede pasar directo:
```bash
AZURE_STATIC_WEB_APPS_API_TOKEN="<token>" ./scripts/fix-azure-token.sh
```

## scripts/deploy-status.sh

Muestra el estado de los últimos 5 runs del workflow de deploy.

```bash
./scripts/deploy-status.sh
```

> Nota: el workflow activo se llama `azure-static-web-apps-purple-pebble-07a0da800.yml` (no `azure-deploy.yml`).

## scripts/trigger-deploy.sh

Re-trigger manual del workflow de deploy sin cambios de código.

```bash
./scripts/trigger-deploy.sh
```

Hace un commit vacío y push a `main`.

## scripts/lighthouse.sh

Corre un audit Lighthouse en el build de producción local.

```bash
./scripts/lighthouse.sh
```

- Requiere `lighthouse` CLI: `npm install -g lighthouse`
- Hace build automáticamente
- Guarda el reporte en `test/lighthouse-$(date).json`
- Abre el reporte en el browser

## Flujo completo: primera vez

```bash
# 1. Clonar y configurar
git clone https://github.com/RamRider89/regina-countdown.git
cd regina-countdown
nvm install   # lee .nvmrc

# 2. Instalar dependencias
npm install

# 3. Desarrollo
./scripts/dev.sh

# 4. Verificar antes de deploy
./scripts/build.sh all

# 5. Fix Azure token (si es necesario)
./scripts/fix-azure-token.sh

# 6. Crear PR (si estás en feature branch)
GH_TOKEN="$GITHUB_TOKEN" ./scripts/create-pr.sh

# 7. Ver estado del deploy
./scripts/deploy-status.sh
```

## Variables de entorno requeridas

Agregar a `~/.zshrc` o `~/.bashrc`:

```bash
export GITHUB_TOKEN="ghp_..."                        # PAT con permisos repo + secrets
export AZURE_STATIC_WEB_APPS_API_TOKEN="..."         # Token de Azure Portal
```

Los scripts leen estas variables — no hardcodear tokens en código.
