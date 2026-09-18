#!/usr/bin/env bash
set -euo pipefail

# ─── colores ────────────────────────────────────────────────────────────────
BOLD='\033[1m'
DIM='\033[2m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
RESET='\033[0m'

info()    { echo -e "${CYAN}→${RESET} $*"; }
success() { echo -e "${GREEN}✓${RESET} $*"; }
warn()    { echo -e "${YELLOW}⚠${RESET} $*"; }
error()   { echo -e "${RED}✗${RESET} $*" >&2; exit 1; }
ask()     { echo -e "${BOLD}$*${RESET}"; }

# ─── verificar dependencias ──────────────────────────────────────────────────
command -v gh &>/dev/null  || error "gh CLI no encontrado. Instalar: https://cli.github.com"
gh auth status &>/dev/null || error "No autenticado en gh. Ejecutar: gh auth login"

echo ""
echo -e "${BOLD}═══════════════════════════════════════${RESET}"
echo -e "${BOLD}   Crear repositorio en GitHub         ${RESET}"
echo -e "${BOLD}═══════════════════════════════════════${RESET}"
echo ""

# ─── nombre ─────────────────────────────────────────────────────────────────
while true; do
  ask "Nombre del repositorio:"
  read -r REPO_NAME
  REPO_NAME="${REPO_NAME// /-}"   # reemplazar espacios por guiones
  [[ -z "$REPO_NAME" ]] && { warn "El nombre no puede estar vacío."; continue; }
  [[ "$REPO_NAME" =~ ^[a-zA-Z0-9_.-]+$ ]] && break
  warn "Solo se permiten letras, números, guiones, puntos y guiones bajos."
done

# ─── descripción ────────────────────────────────────────────────────────────
ask "Descripción (Enter para omitir):"
read -r REPO_DESC

# ─── visibilidad ────────────────────────────────────────────────────────────
echo ""
ask "Visibilidad:"
echo "  1) Privado (default)"
echo "  2) Público"
read -r -p "Opción [1]: " VIS_CHOICE
VIS_CHOICE="${VIS_CHOICE:-1}"
case "$VIS_CHOICE" in
  2) VISIBILITY="--public";  VIS_LABEL="público" ;;
  *) VISIBILITY="--private"; VIS_LABEL="privado" ;;
esac

# ─── README ─────────────────────────────────────────────────────────────────
echo ""
ask "¿Agregar README inicial? [s/N]:"
read -r -p "" ADD_README
[[ "$ADD_README" =~ ^[sS]$ ]] && README_FLAG="--add-readme" || README_FLAG=""

# ─── .gitignore ─────────────────────────────────────────────────────────────
echo ""
ask "Plantilla .gitignore (Enter para omitir, ej: Node, Python, Go):"
read -r GITIGNORE_TMPL
[[ -n "$GITIGNORE_TMPL" ]] && GITIGNORE_FLAG="--gitignore $GITIGNORE_TMPL" || GITIGNORE_FLAG=""

# ─── clonar ─────────────────────────────────────────────────────────────────
echo ""
ask "¿Clonar localmente después de crear? [S/n]:"
read -r -p "" DO_CLONE
[[ "$DO_CLONE" =~ ^[nN]$ ]] && CLONE=false || CLONE=true

CLONE_DIR=""
if $CLONE; then
  DEFAULT_CLONE_DIR="$HOME/dev"
  ask "Directorio destino [${DEFAULT_CLONE_DIR}]:"
  read -r -p "" CLONE_DIR
  CLONE_DIR="${CLONE_DIR:-$DEFAULT_CLONE_DIR}"
  CLONE_DIR="${CLONE_DIR/#\~/$HOME}"   # expandir ~
  [[ -d "$CLONE_DIR" ]] || error "El directorio '$CLONE_DIR' no existe."
fi

# ─── confirmación ────────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}─── Resumen ───────────────────────────${RESET}"
echo -e "  Nombre:      ${CYAN}${REPO_NAME}${RESET}"
[[ -n "$REPO_DESC" ]] && echo -e "  Descripción: ${DIM}${REPO_DESC}${RESET}"
echo -e "  Visibilidad: ${VIS_LABEL}"
[[ -n "$README_FLAG" ]]    && echo -e "  README:      sí"
[[ -n "$GITIGNORE_TMPL" ]] && echo -e "  .gitignore:  ${GITIGNORE_TMPL}"
$CLONE && echo -e "  Clonar en:   ${CLONE_DIR}/${REPO_NAME}"
echo -e "${BOLD}───────────────────────────────────────${RESET}"
echo ""
read -r -p "¿Crear repositorio? [S/n]: " CONFIRM
[[ "$CONFIRM" =~ ^[nN]$ ]] && { echo "Cancelado."; exit 0; }

# ─── crear repo ─────────────────────────────────────────────────────────────
echo ""
info "Creando repositorio..."

CREATE_CMD=(gh repo create "$REPO_NAME" $VISIBILITY)
[[ -n "$REPO_DESC" ]]      && CREATE_CMD+=(--description "$REPO_DESC")
[[ -n "$README_FLAG" ]]    && CREATE_CMD+=($README_FLAG)
[[ -n "$GITIGNORE_FLAG" ]] && CREATE_CMD+=($GITIGNORE_FLAG)

REPO_URL=$("${CREATE_CMD[@]}" 2>&1) || error "Error al crear el repositorio: $REPO_URL"

# gh repo create devuelve la URL en la última línea
REPO_URL=$(echo "$REPO_URL" | tail -1)
success "Repositorio creado: ${CYAN}${REPO_URL}${RESET}"

# ─── clonar ─────────────────────────────────────────────────────────────────
if $CLONE; then
  echo ""
  info "Clonando en ${CLONE_DIR}..."
  gh repo clone "$REPO_NAME" "${CLONE_DIR}/${REPO_NAME}" 2>&1 | sed 's/^/  /'
  success "Clonado en ${CLONE_DIR}/${REPO_NAME}"
  echo ""
  echo -e "  ${DIM}cd ${CLONE_DIR}/${REPO_NAME}${RESET}"
fi

echo ""
success "Listo."
echo ""
