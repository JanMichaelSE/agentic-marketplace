---
name: diagnosing-bugs
description: Diagnose a difficult defect or performance regression with a tight, deterministic, red-capable feedback loop. Use when a user asks to diagnose or debug a hard failure, intermittent problem, incorrect result, or regression.
---

# Diagnosing Bugs

Use a disciplined loop for hard bugs. Do not jump from a symptom to a theory:
first create a reproducible signal that exercises the reported failure, then
investigate, fix, and verify against that same signal.

Read relevant project context, decisions, code, and tests before proposing a
loop. Preserve unrelated work. Never expose credentials, captured production
data, or user data in a repro, log, trace, or report.

## Phase 1: Build the Feedback Loop

Prefer the smallest safe loop that directly reaches the defect. Try, in order:

1. A focused failing test at the seam that reaches the bug.
2. An existing local CLI or HTTP test against an already-approved environment.
3. A captured, sanitized trace replayed in isolation.
4. A throwaway harness with mocked dependencies.
5. A property or fuzz loop for a non-deterministic wrong output.
6. A bisect or differential harness when two known states differ.
7. The human-in-the-loop template in
   [`scripts/hitl-loop.template.sh`](scripts/hitl-loop.template.sh).

The loop must be red-capable, deterministic where possible, fast enough for
iteration, and assert the user's exact symptom rather than merely checking that
the process did not crash. For intermittent failures, raise the reproduction
rate with repeated, controlled runs and document the observed rate.

Do not execute a command that starts services, launches a browser, changes
data, creates a branch, installs dependencies, or contacts an external system
without the authorization required by the repository and user request. The
HITL file is a template: customize a copy only with approval, and have the
human perform its requested interactive actions. Do not execute the template
as a validation shortcut.

If no red-capable loop is possible, stop and report what was tried. Ask for
access to the reproducing environment, a sanitized captured artifact, or
authorization for narrowly scoped temporary instrumentation; do not continue
from an untested theory.

## Phase 2: Reproduce and Minimize

Run the approved loop until it demonstrates the precise failure. Minimize it
one load-bearing input, caller, configuration value, or step at a time, rerun
after each change, and retain only what keeps the signal red.

## Phase 3: Form Falsifiable Hypotheses

Produce three to five ranked hypotheses before testing one. Each must predict a
discriminating outcome, for example: “If X is the cause, changing Y will remove
the symptom.” Share the ranking with the user when their domain knowledge could
change it; otherwise record it in the investigation notes.

## Phase 4: Instrument Deliberately

Map each probe to one prediction and change one variable at a time. Prefer a
debugger or narrowly targeted, uniquely prefixed diagnostic logs at the seam.
Remove temporary instrumentation once the investigation is complete. For
performance regressions, measure a repeatable baseline before changing code.

## Phase 5: Fix and Regress

Write the regression test before the fix only when it uses a seam that covers
the real failure path. Confirm it fails, apply the scoped fix, confirm it
passes, then rerun the original, unminimized loop. If no suitable seam exists,
document that architecture finding rather than creating a misleading test.

## Completion

Before declaring success, confirm the original symptom no longer reproduces,
the approved regression check passes (or its absence is documented), and all
temporary debug artifacts are removed or deliberately retained. Capture the
verified cause and prevention insight in an authorized handoff, issue, or
project document; do not create commits, tracker updates, or documentation
without separate authorization.