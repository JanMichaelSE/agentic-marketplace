---
name: implement-scope
description: Implement approved workflow slices or concrete standalone changes, run focused validation, and produce an implementation handoff.
---

# Implement Scope

Implement approved workflow slices or concrete standalone changes, then report the result with validation evidence.

Use this skill when the user provides either approved `.scratch/<feature-slug>/slices/` files or a direct, concrete implementation request without workflow artifacts.

## Modes

Confirm one mode before editing.

Workflow mode uses one explicit slice path by default, or multiple explicitly supplied slice paths in the order to run.

Before implementing in workflow mode, confirm:

- Each supplied slice exists.
- Each supplied slice has `Status: ready-for-implementation`.
- Each supplied slice has `Execution Mode: autonomous`.
- Each supplied slice's `Write Boundary`, `Parallel Safety`, and `Concurrency Group` are understood when present.
- The target checkout is available.

Do not auto-sweep every ready slice in `.scratch/<feature-slug>/slices/`. Work only on the explicit slice paths the user supplied. If a supplied slice is missing, not ready, marked `needs-human`, or blocked by an incomplete dependency, stop and report the blocker before editing for that slice.

When workflow slices include `Write Boundary`, `Parallel Safety`, or `Concurrency Group`, treat those fields as execution constraints. Stay inside the declared write boundary unless a smallest necessary supporting change is required and recorded as a divergence. Use parallel-safety notes and concurrency groups to avoid overlapping edits with other workers; if ownership is unclear, stop or serialize rather than racing another slice.

Standalone mode uses a concrete implementation request without requiring `.scratch` context.

Before implementing in standalone mode, confirm:

- The requested change is concrete enough to infer a bounded implementation scope, or the user supplied an explicit file, directory, diff, branch, or commit boundary.
- The target checkout is available.
- Dirty-worktree ownership is clear for files that may be edited.

If the standalone request is ambiguous, repo-wide without a concrete reason, destructive, requires a new dependency, or would overlap unclear dirty changes, stop and ask for the missing scope, authorization, or ownership decision before editing.

## Process

### 1. Inspect Current State

In workflow mode, read each supplied slice fully before editing. Read the parent execution plan for context when discoverable, but do not mutate the slice file or `execution-plan.md`.

In workflow mode, inspect any supplied `Write Boundary`, `Parallel Safety`, and `Concurrency Group` sections before editing. Report how they affect the implementation boundary, parallel execution assumptions, and dirty-worktree ownership.

In standalone mode, inspect the files, tests, configuration, and nearby patterns needed to understand the requested change. Do not infer permission for unrelated repo-wide cleanup from a standalone request.

Inspect and report the initial git state, including tracked modifications and relevant untracked files. A dirty working tree is not a blocker by itself. Do not overwrite, revert, or clean up unrelated user or agent changes.

### 2. Rediscover Repo Guardrails

Rediscover current target repo guardrails at execution time. Check applicable sources such as:

- Agent instruction files.
- README or contributing documentation.
- Build, test, package, or validation scripts.
- Nearby implementation and test patterns.
- Configuration or fixture conventions relevant to the slice.

In workflow mode, use the slice `Guardrails` section as additional local constraints, not as a replacement for live repo guardrails.
Also use workflow slice `Write Boundary`, `Parallel Safety`, and `Concurrency Group` sections as local execution constraints when present. These fields do not replace live repo inspection, dependency checks, or dirty-worktree ownership checks.

### 3. Implement

Make focused changes needed to satisfy the supplied slice or standalone request. Depending on the scope, this may include code, tests, configuration, fixtures, documentation, or generated artifacts.

Do not add new dependencies unless explicitly authorized by the execution plan, the slice, or the user's current instruction. If a dependency appears necessary but is not authorized, stop and ask before adding it.

Keep changes within the approved or inferred scope, including any workflow slice write boundary. If you discover required work outside the scope or write boundary, either make the smallest necessary supporting change and record the divergence, or stop if it changes the approved scope.

### 4. Validate

Run focused validation by default in both workflow and standalone mode. Run full repository validation only when:

- the slice requires it,
- repo guardrails require it,
- broad shared contracts are touched,
- validation risk is high, or
- the user explicitly asks.

If validation is unavailable, too expensive for the current turn, or blocked by environment setup, report the limitation and residual risk clearly.

If validation fails, use up to two narrow repair passes. After each repair pass, rerun the relevant validation. If validation still fails after two repair passes, stop work on that scope and report `Status: blocked`.

### 5. Write the Implementation Handoff

In workflow mode, write exactly one summary per slice under `.scratch/<feature-slug>/implementation/`. Use the slice filename stem plus `-summary.md`, for example:

```text
.scratch/<feature-slug>/implementation/01-add-widget-summary.md
```

You may overwrite the existing summary for that same slice. Do not create additional workflow artifacts unless the slice explicitly asks for them.

Use this summary template:

<template>

```markdown
Status: implemented | blocked

## Slice

## Summary

## Files Changed

## Implementation Decisions

## Validation Evidence

## Divergences From Slice

## Risks and Follow-Up

## Suggested Commit Message

## Comments
```

</template>

The summary should record changed files, validation commands and outcomes, divergences, remaining risks, and a suggested commit message.

In standalone mode, return the same handoff structure in chat by default. Write a durable file only when the user asks for one or provides a `.scratch` context.

## Commit Policy

Leave changes uncommitted by default. Commit only when the user explicitly asks or the slice explicitly allows commits.

If committing is allowed, include only files relevant to the implemented slice and avoid committing local workflow artifacts unless explicitly requested.

## Handoff

After implementation, report:

- implemented or blocked status for each workflow slice or standalone scope,
- implementation summary path for each workflow slice, or note that standalone mode returned the handoff in chat,
- files changed,
- validation evidence,
- remaining risks or follow-up,
- whether changes remain uncommitted.
