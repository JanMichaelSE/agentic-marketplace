#!/usr/bin/env bash
# Human-in-the-loop reproduction template.
# Copy and customize this file only after the user authorizes the workflow.
# The human performs the interactive steps; do not use this template for
# unattended execution or as a validation shortcut.
#
# Usage after customization and authorization:
#   bash hitl-loop.template.sh

set -euo pipefail

step() {
  printf '\n>>> %s\n' "$1"
  read -r -p '    [Press Enter when complete] ' _
}

capture() {
  local variable="$1" question="$2" answer
  printf '\n>>> %s\n' "$question"
  read -r -p '    > ' answer
  printf -v "$variable" '%s' "$answer"
}

# ----- Edit below after authorization ---------------------------------------
# Describe approved, human-performed actions without including secrets,
# production data, or sensitive identifiers.
step 'Perform the approved reproduction steps in the designated environment.'
capture REPRODUCED 'Did the exact reported symptom occur? (yes/no)'
capture OBSERVATION 'Record a sanitized symptom or error summary:'
# ----- Edit above ------------------------------------------------------------

printf '\n--- Captured ---\n'
printf 'REPRODUCED=%s\n' "$REPRODUCED"
printf 'OBSERVATION=%s\n' "$OBSERVATION"