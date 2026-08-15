---
name: simplify-code
description: Simplify explicitly scoped code while preserving behavior. Use when a user asks to simplify, clean up, reduce complexity, remove duplication, or improve readability; do not use for a generic bug, security, or requirements-conformance review.
---

# Simplify Code

Make code easier to understand, maintain, and safely change without changing
its observable behavior. Prefer clear, explicit code over terse or clever code.

## Establish Scope Before Editing

1. Read repository guidance and nearby code to learn local conventions.
2. Confirm the target files, functions, or a recent-change diff with the user.
3. State the behavior that must be preserved and the focused validation to run.
4. Do not widen the scope to unrelated cleanup, dependencies, or interfaces
   without approval.

## Review Lenses

Assess the confirmed scope through these independent lenses. Parallelize the
work when the available environment supports it; otherwise apply them in order.

- **Reuse:** find duplicated logic, existing utilities, repeated magic values,
  and similar blocks that have a stable common abstraction.
- **Clarity:** remove dead code and redundant state, flatten unnecessary
  nesting, replace unclear names, and prefer straightforward conditionals over
  dense expressions.
- **Efficiency:** remove redundant work, unnecessary broad reads, repeated
  external calls, unbounded growth, and avoidable hot-path work. Preserve
  readability unless measurement or an established constraint justifies a more
  complex optimization.

## Make Focused Changes

- Reuse existing project utilities and framework mechanisms before adding a
  helper.
- Extract a helper only when the shared behavior is meaningful and its
  interface is simpler than the duplicated code.
- Preserve useful intermediate variables, searchable constants, and
  non-obvious rationale comments. Remove comments that merely restate code.
- Match the language and project idioms. Do not apply a generic style rule when
  the surrounding code deliberately follows a different convention.
- Leave code alone when an abstraction would add parameter sprawl or obscure
  meaningful differences between callers.

## Validate and Report

Run the smallest relevant checks after each behavior-affecting change, then
report modified files, the readability or maintenance benefit, validation
evidence, and any intentionally unchanged complexity. Flag out-of-scope bugs
without silently fixing them.