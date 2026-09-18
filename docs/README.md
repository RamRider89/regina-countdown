# Documentación — Regina Countdown

Índice de toda la documentación del proyecto.

## Guías

| Documento | Contenido |
|---|---|
| [architecture.md](architecture.md) | Componentes, hooks, flujo de datos |
| [configuration.md](configuration.md) | Referencia completa de `config.json` |
| [i18n.md](i18n.md) | Sistema de internacionalización (es/en/ru) |
| [performance.md](performance.md) | Optimizaciones aplicadas, Lighthouse |
| [deployment.md](deployment.md) | Azure Static Web Apps — setup, CI/CD, troubleshooting |
| [scripts.md](scripts.md) | Todos los scripts del proyecto |

## TL;DR — Comandos rápidos

```bash
# Desarrollo
./scripts/dev.sh

# Build + preview local
./scripts/build.sh preview

# Tests
./scripts/build.sh test

# Lighthouse (requiere build previamente)
./scripts/lighthouse.sh

# Fix token Azure y re-trigger deploy
./scripts/fix-azure-token.sh

# Ver estado del último deploy en GitHub Actions
./scripts/deploy-status.sh

# Crear PR feature → main
./scripts/create-pr.sh
```

## URLs

| Recurso | URL |
|---|---|
| App en producción | https://purple-pebble-07a0da800.5.azurestaticapps.net |
| Repositorio | https://github.com/RamRider89/regina-countdown |
| Actions / CI | https://github.com/RamRider89/regina-countdown/actions |
| Azure Portal | https://portal.azure.com → Static Web Apps → `regina-countdown` |
