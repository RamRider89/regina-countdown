#!/usr/bin/env bash
set -euo pipefail

REPO="RamRider89/regina-countdown"

if [ -z "${GITHUB_TOKEN:-}" ]; then
  echo "❌ Variable GITHUB_TOKEN no está en el entorno."
  exit 1
fi

echo "→ Últimos 5 runs de azure-deploy.yml en $REPO:"
echo ""
GH_TOKEN="$GITHUB_TOKEN" gh run list \
  --repo "$REPO" \
  --workflow azure-deploy.yml \
  --limit 5

echo ""
echo "→ Para ver logs del último run:"
echo "  GH_TOKEN=\"\$GITHUB_TOKEN\" gh run view --repo $REPO --log"
