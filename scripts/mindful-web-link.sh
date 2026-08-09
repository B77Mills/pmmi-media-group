#!/bin/bash
#
# Site entrypoint wrapper that optionally links `@mindful-web/*` packages to a
# local `mindful-web` checkout instead of the published versions in node_modules.
#
# Controlled ENTIRELY by a single value in the repo-root `.env` file:
#
#   MINDFUL_WEB_PATH=../../mindful/mindful-web    # linked to your local checkout
#   #MINDFUL_WEB_PATH=...                         # unset/commented => published packages
#
# The path is relative to this repo root (or absolute) and is mounted into the
# container at /mindful-web by docker-compose.yml.
#
# State is RECONCILED on every container start: flip the .env value, restart the
# service, and node_modules is put into the requested state. There is nothing to
# manually undo.
#
set -euo pipefail

# Derived from this script's own location (<repo>/scripts/), not hardcoded: the
# repo is mounted at /root in some website repos and /repo in others.
REPO_ROOT=$(cd "$(dirname "$0")/.." && pwd)
LINK_SRC=/mindful-web/packages
NM_DIR="${REPO_ROOT}/node_modules/@mindful-web"
BACKUP_SUFFIX=".mindful-orig"
OVERLAY_MARKER=".mindful-link-overlay"

# Build tooling is deliberately NOT linked.
#
# These packages are invoked through node_modules/.bin/* stubs. Node resolves a
# bin stub's `main` to its real path, which escapes --preserve-symlinks -- so a
# linked web-cli would load ITS dependencies from the mindful-web checkout's
# node_modules rather than this repo's. That breaks natively-compiled deps: if
# mindful-web was installed on macOS and this container is Linux, the build dies
# with "You installed esbuild for another platform than the one you're using".
#
# Runtime packages are unaffected -- they are required normally, so
# --preserve-symlinks keeps their resolution anchored to this repo.
#
# Set MINDFUL_WEB_LINK_TOOLING=1 to link these anyway (only useful when the change
# under test is IN the tooling, and only if mindful-web's node_modules was
# installed for Linux, e.g. via `docker compose run --rm yarn install` there).
TOOLING_PACKAGES="web-cli marko-compiler dependency-tool eslint browserslist-config"

log() { echo "[mindful-web-link] $*"; }

# Remove compiled Marko output whose .marko source no longer exists.
#
# *.marko.js is gitignored in both this repo and mindful-web, so switching
# branches leaves behind compiled templates for sources that only existed on the
# other branch. web-cli sets MARKO_REQUIRE_PREBUILT_TEMPLATES=true, which prefers
# stale compiled output over no output at all, and the watcher only recompiles
# files whose source changed -- it never deletes output for sources that vanished.
# The result is a stale template being loaded and failing at runtime with errors
# like "<method> is not a function" for code that no longer exists anywhere.
#
# Deleting an orphan is always safe: these files are generated, never authored,
# and anything still referenced gets recompiled by the --compile-dir pass below.
# Files tracked by git are skipped as a belt-and-braces guard, in case a repo ever
# checks compiled output in.
prune_orphan_templates() {
  local dir="$1"
  local label="$2"
  [ -d "$dir" ] || return 0

  local tracked=""
  if command -v git >/dev/null 2>&1 && git -C "$dir" rev-parse --git-dir >/dev/null 2>&1; then
    tracked=$(git -C "$dir" ls-files '*.marko.js' 2>/dev/null || true)
  fi

  local pruned=0
  local compiled
  while IFS= read -r compiled; do
    [ -n "$compiled" ] || continue
    # Has a source sibling -> keep.
    [ -f "${compiled%.js}" ] && continue
    # Tracked in git -> not a generated artifact, leave alone.
    if [ -n "$tracked" ]; then
      local rel="${compiled#$dir/}"
      case $'\n'"$tracked"$'\n' in
        *$'\n'"$rel"$'\n'*) continue ;;
      esac
    fi
    rm -f "$compiled"
    pruned=$((pruned + 1))
  done < <(find "$dir" -name '*.marko.js' -not -path '*/node_modules/*' -not -path '*/dist/*' 2>/dev/null)

  if [ "$pruned" -gt 0 ]; then
    log "pruned ${pruned} orphaned compiled template(s) from ${label}"
  fi
  return 0
}

want_linked=0
if [ -n "${MINDFUL_WEB_PATH:-}" ]; then
  if [ -d "$LINK_SRC" ]; then
    want_linked=1
  else
    log "ERROR: MINDFUL_WEB_PATH is set to '${MINDFUL_WEB_PATH}' but ${LINK_SRC} does not exist"
    log "       inside the container. Check that the path is correct relative to the repo root,"
    log "       then run: docker compose down && docker compose up <service>"
    exit 1
  fi
fi

if [ ! -d "$NM_DIR" ]; then
  log "ERROR: ${NM_DIR} not found. Run 'docker compose run --rm yarn install' first."
  exit 1
fi

# ---------------------------------------------------------------------------
# Phase 1: unwind any existing links, so the starting state is always "published".
# ---------------------------------------------------------------------------
restored=0
stale=0
shopt -s nullglob
for backup in "$NM_DIR"/*"$BACKUP_SUFFIX"; do
  target="${backup%$BACKUP_SUFFIX}"
  if [ -L "$target" ]; then
    # Normal case: our symlink is in place. Drop it and restore the real package.
    rm -f "$target"
    mv "$backup" "$target"
    restored=$((restored + 1))
  elif [ -d "$target" ] && [ -f "$target/$OVERLAY_MARKER" ]; then
    # Our overlay directory (entry-level symlinks). Safe to remove wholesale --
    # everything inside is either a symlink or the marker file.
    rm -rf "$target"
    mv "$backup" "$target"
    restored=$((restored + 1))
  elif [ -d "$target" ]; then
    # A `yarn install` replaced our symlink with a freshly installed package.
    # The backup is now stale -- discard it rather than clobbering the new install.
    rm -rf "$backup"
    stale=$((stale + 1))
  else
    # Target is missing entirely; the backup is the only copy.
    mv "$backup" "$target"
    restored=$((restored + 1))
  fi
done
shopt -u nullglob

[ "$restored" -gt 0 ] && log "restored ${restored} package(s) to their published versions"
[ "$stale" -gt 0 ] && log "discarded ${stale} stale backup(s) left behind by a 'yarn install'"

# ---------------------------------------------------------------------------
# Phase 2: link, if requested.
# ---------------------------------------------------------------------------
EXTRA_ARGS=()

if [ "$want_linked" -eq 1 ]; then
  linked=0
  skipped=0
  tooling=0
  overlaid=0
  shopt -s nullglob
  for pkg_dir in "$LINK_SRC"/*; do
    [ -f "$pkg_dir/package.json" ] || continue

    # Resolve the real package name rather than assuming it matches the directory.
    name=$(node -p "require('${pkg_dir}/package.json').name" 2>/dev/null) || continue
    case "$name" in
      @mindful-web/*) ;;
      *) continue ;;
    esac

    short="${name#@mindful-web/}"
    target="${NM_DIR}/${short}"

    # Only link packages this repo actually depends on.
    if [ ! -e "$target" ]; then
      skipped=$((skipped + 1))
      continue
    fi

    # Leave build tooling on the locally-installed copy (see TOOLING_PACKAGES above).
    if [ "${MINDFUL_WEB_LINK_TOOLING:-0}" != "1" ]; then
      case " $TOOLING_PACKAGES " in
        *" $short "*)
          tooling=$((tooling + 1))
          continue
          ;;
      esac
    fi

    backup="${target}${BACKUP_SUFFIX}"

    # Does the installed copy carry nested dependencies of its own? yarn nests a
    # package's deps when they conflict with the hoisted root version -- e.g.
    # @mindful-web/html needs html-entities@1 while this repo hoists v2. A plain
    # directory symlink would hide that nested tree (--preserve-symlinks resolves
    # from the symlink path, and the source checkout has no node_modules of its
    # own), and the package would silently bind to the wrong major version:
    #   TypeError: Html5Entities is not a constructor
    # Only deps the LINKED SOURCE still declares at a compatible major are kept.
    # If the source has moved on (e.g. html-entities ^1 -> ^2) the stale nested
    # copy is dropped so resolution falls through to this repo's hoisted version,
    # matching what a real publish + install would produce.
    nested_keep=""
    if [ -d "$target/node_modules" ]; then
      nested_keep=$(node "${REPO_ROOT}/scripts/mindful-web-nested-deps.js" "$pkg_dir" "$target/node_modules" 2>/dev/null || true)
    fi

    if [ -n "$nested_keep" ]; then
      mv "$target" "$backup"
      mkdir -p "$target"
      touch "$target/$OVERLAY_MARKER"

      # Symlink each top-level entry of the source into the overlay...
      shopt -s dotglob
      for entry in "$pkg_dir"/*; do
        entry_name=$(basename "$entry")
        case "$entry_name" in
          node_modules|.git) continue ;;
        esac
        ln -s "$entry" "$target/$entry_name"
      done
      shopt -u dotglob

      # ...and re-expose only the nested deps that are still wanted.
      while IFS= read -r dep; do
        [ -n "$dep" ] || continue
        mkdir -p "$(dirname "$target/node_modules/$dep")"
        ln -s "$backup/node_modules/$dep" "$target/node_modules/$dep"
      done <<< "$nested_keep"
      overlaid=$((overlaid + 1))
    else
      mv "$target" "$backup"
      ln -s "$pkg_dir" "$target"
    fi
    linked=$((linked + 1))
  done
  shopt -u nullglob

  log "linked ${linked} package(s) to ${MINDFUL_WEB_PATH}"
  log "  ${skipped} package(s) exist in the checkout but are not used by this repo"
  [ "$tooling" -gt 0 ] && log "  ${tooling} build-tooling package(s) left on the installed copy (set MINDFUL_WEB_LINK_TOOLING=1 to override)"
  [ "$overlaid" -gt 0 ] && log "  ${overlaid} package(s) overlaid to preserve their nested node_modules"

  # Node resolves through a symlink using the target's REAL path, which would make
  # linked packages load their deps from the mindful-web checkout -- producing a
  # second copy of marko, vue, graphql, etc. Preserving symlinks keeps resolution
  # anchored to this repo's node_modules so those stay singletons.
  #
  # NOTE: deliberately WITHOUT --preserve-symlinks-main. That flag keeps `main` at
  # the node_modules/.bin/* stub path, which breaks web-cli's own relative requires
  # (`Cannot find module '../serve'`). It only matters when the entry file is itself
  # a symlink; the site's index.js is a real file, so it buys nothing here.
  export NODE_OPTIONS="--preserve-symlinks ${NODE_OPTIONS:-}"

  # mindful-web keeps *.marko.js out of git (they are generated by each package's
  # `prepublish` hook), and web-cli forces MARKO_REQUIRE_PREBUILT_TEMPLATES in dev.
  # Compiling and watching the linked tree covers both.
  EXTRA_ARGS+=(--compile-dir "$LINK_SRC")
  EXTRA_ARGS+=(--watch-dir "$LINK_SRC")
  EXTRA_ARGS+=(--purge-css-content-dir "$LINK_SRC")

  log "NODE_OPTIONS=${NODE_OPTIONS}"

  # The linked checkout is the one most likely to carry stale output, since it is
  # a working repo whose branch changes independently of this one.
  prune_orphan_templates "$LINK_SRC" "the linked mindful-web checkout"
else
  log "using published @mindful-web packages (MINDFUL_WEB_PATH is not set)"
fi

# This repo's own compiled output has the same problem on a branch switch, linked
# or not, so it is swept either way.
prune_orphan_templates "${REPO_ROOT}/packages" "packages/"
prune_orphan_templates "${REPO_ROOT}/sites" "sites/"

log "exec: yarn $* ${EXTRA_ARGS[*]:-}"
exec yarn "$@" ${EXTRA_ARGS[@]+"${EXTRA_ARGS[@]}"}
