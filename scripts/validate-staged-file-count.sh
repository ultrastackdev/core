#!/usr/bin/env bash
# Limits staged paths per commit. Docs: scripts/staged-file-count-hook.md
#
# Invoked from commit-msg: bash ./scripts/validate-staged-file-count.sh "$1"
#
# Bypass (lowercase env name only): skip=1 git commit -m "..."

set -eu
set -o pipefail

case "${skip:-}" in
  1 | true | yes)
    printf '%s\n' 'validate-staged-file-count: skipped (skip=1)'
    exit 0
    ;;
esac

readonly MAX_STAGED_FILES=15

STAGED_COUNT="$(git diff --cached --name-only | wc -l | tr -d '[:space:]')"
if [ -z "$STAGED_COUNT" ]; then
  STAGED_COUNT=0
fi

if [ "$STAGED_COUNT" -le "$MAX_STAGED_FILES" ]; then
  exit 0
fi

printf '\n%s\n\n' "ERROR: Too many staged files: ${STAGED_COUNT} (maximum allowed: ${MAX_STAGED_FILES})"
printf '%s\n' 'Stage fewer files per commit or split into smaller commits.'
printf '%s\n\n' 'Bypass (this check only): skip=1 git commit -m "your message"'
exit 1
