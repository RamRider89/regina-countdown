#!/usr/bin/env bash
set -euo pipefail

# Carga nvm
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use

# Verificar que lighthouse está instalado
if ! command -v lighthouse &>/dev/null; then
  echo "❌ Lighthouse no instalado. Instalar con:"
  echo "  npm install -g lighthouse"
  exit 1
fi

TIMESTAMP=$(date +%Y%m%dT%H%M%S)
REPORT_DIR="test"
mkdir -p "$REPORT_DIR"

echo "→ Compilando build de producción..."
npm run build

echo "→ Iniciando servidor de preview en background..."
npx vite preview --port 4173 &
VITE_PID=$!

# Esperar a que el servidor esté listo
sleep 2

echo "→ Corriendo Lighthouse desktop..."
lighthouse http://localhost:4173 \
  --output json \
  --output-path "$REPORT_DIR/localhost_4173-${TIMESTAMP}-desktop.json" \
  --preset desktop \
  --chrome-flags="--headless --no-sandbox" \
  --quiet

echo "→ Corriendo Lighthouse mobile..."
lighthouse http://localhost:4173 \
  --output json \
  --output-path "$REPORT_DIR/localhost_4173-${TIMESTAMP}-mobile.json" \
  --chrome-flags="--headless --no-sandbox" \
  --quiet

kill $VITE_PID 2>/dev/null || true

echo ""
echo "✓ Reportes guardados:"
echo "  $REPORT_DIR/localhost_4173-${TIMESTAMP}-desktop.json"
echo "  $REPORT_DIR/localhost_4173-${TIMESTAMP}-mobile.json"
echo ""

# Mostrar scores resumidos
for report in "$REPORT_DIR/localhost_4173-${TIMESTAMP}-"*.json; do
  mode=$(basename "$report" | grep -o 'desktop\|mobile' || echo 'report')
  echo "--- $mode ---"
  node -e "
    const r = require('./$report');
    const cats = r.categories;
    console.log('  Performance:    ' + Math.round(cats.performance.score * 100));
    console.log('  Accessibility:  ' + Math.round(cats.accessibility.score * 100));
    console.log('  Best Practices: ' + Math.round(cats[\"best-practices\"].score * 100));
  " 2>/dev/null || echo "  (instalar node para ver scores aquí)"
done
