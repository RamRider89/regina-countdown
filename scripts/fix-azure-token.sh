#!/usr/bin/env bash
set -euo pipefail

REPO="RamRider89/regina-countdown"
SECRET_NAME="AZURE_STATIC_WEB_APPS_API_TOKEN"

if [ -z "${AZURE_STATIC_WEB_APPS_API_TOKEN:-}" ]; then
  echo "❌ Variable AZURE_STATIC_WEB_APPS_API_TOKEN no está en el entorno."
  echo ""
  echo "Opciones:"
  echo "  1. Exportar en ~/.zshrc: export AZURE_STATIC_WEB_APPS_API_TOKEN='<token>'"
  echo "  2. Pasar al script: AZURE_STATIC_WEB_APPS_API_TOKEN='<token>' $0"
  echo ""
  echo "Obtener el token: Azure Portal → Static Web Apps → regina-countdown → Manage deployment token"
  exit 1
fi

if [ -z "${GITHUB_TOKEN:-}" ]; then
  echo "❌ Variable GITHUB_TOKEN no está en el entorno."
  echo "Exportar en ~/.zshrc: export GITHUB_TOKEN='ghp_...'"
  exit 1
fi

echo "→ Actualizando secret '$SECRET_NAME' en $REPO..."
echo "$AZURE_STATIC_WEB_APPS_API_TOKEN" | \
  GH_TOKEN="$GITHUB_TOKEN" gh secret set "$SECRET_NAME" \
  --repo "$REPO"

echo "✓ Secret actualizado."
echo ""
echo "→ Re-triggering deploy..."
GH_TOKEN="$GITHUB_TOKEN" gh workflow run azure-deploy.yml \
  --repo "$REPO" \
  --ref main 2>/dev/null || {
    echo "  (workflow_dispatch no disponible — haciendo push vacío)"
    git commit --allow-empty -m "ci: re-trigger deploy after token update"
    git push
  }

echo ""
echo "→ Ver estado del deploy:"
echo "  ./scripts/deploy-status.sh"
echo "  https://github.com/$REPO/actions"
