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

npm run dev
