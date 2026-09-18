#!/usr/bin/env bash
set -e

# Carga nvm si no está en el PATH
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm use

if [ ! -d node_modules ]; then
  echo "→ Instalando dependencias..."
  npm install
fi

MODE="${1:-build}"

case "$MODE" in
  test)
    echo "→ Ejecutando tests..."
    npm run test:run
    ;;
  build)
    echo "→ Compilando para producción..."
    npm run build
    echo "✓ Build listo en dist/"
    ;;
  preview)
    echo "→ Compilando..."
    npm run build
    echo "→ Iniciando preview en http://localhost:4173"
    npm run preview
    ;;
  all)
    echo "→ Tests..."
    npm run test:run
    echo "→ Compilando..."
    npm run build
    echo "→ Preview en http://localhost:4173"
    npm run preview
    ;;
  *)
    echo "Uso: $0 [test|build|preview|all]"
    echo ""
    echo "  test     — corre los 14 tests unitarios"
    echo "  build    — compila a dist/ (default)"
    echo "  preview  — compila y sirve dist/ localmente"
    echo "  all      — test → build → preview"
    exit 1
    ;;
esac
