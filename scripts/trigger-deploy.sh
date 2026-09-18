#!/usr/bin/env bash
set -euo pipefail

REPO="RamRider89/regina-countdown"

echo "→ Re-triggering deploy a $REPO..."

# Intentar workflow_dispatch primero
GH_TOKEN="${GITHUB_TOKEN:-}" gh workflow run azure-deploy.yml \
  --repo "$REPO" \
  --ref main 2>/dev/null && {
  echo "✓ Workflow disparado via workflow_dispatch."
  exit 0
}

# Fallback: commit vacío
echo "  (usando push vacío como trigger)"
git commit --allow-empty -m "ci: re-trigger deploy"
git push

echo "✓ Push realizado — monitor en:"
echo "  https://github.com/$REPO/actions"
