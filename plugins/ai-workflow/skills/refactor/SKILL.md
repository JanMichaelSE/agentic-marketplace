---
name: refactor
description: Refactor explicitly scoped changes while preserving behavior, validating the result, and producing a concise handoff.
---

# Refactor

Refactor an explicit code boundary after implementation or during standalone cleanup. Keep behavior unchanged, improve maintainability, and leave clear validation evidence.

Use this skill when the user supplies either workflow inputs from a feature root or a standalone boundary such as a branch comparison, commit range, staged diff, working-tree diff, or file/directory scope.

## Required Inputs

Before editing, confirm one mode.

Workflow mode requires:

- A feature root, for example `.scratch/<feature-slug>/`.
- One or more implementation summary paths from that feature root.
- One concrete refactor boundary for the complete implemented workflow, such as a working-tree diff, staged diff, commit range, branch comparison, or explicit file/directory scope.

Standalone mode requires one explicit boundary:

- Branch comparison.
- Commit range.
- Staged diff.
- Working-tree diff.
- File or directory scope.

If the boundary is missing, ambiguous, or repo-wide without a concrete reason, ask for a narrower scope before editing. Standalone mode does not require workflow artifacts or a feature root.

## Reference Files

Read these reference files before doing non-trivial refactor work:

- [Lens agent brief](references/lens-agent-brief.md)
- [Refactor lenses](references/lenses.md)
- [Refactor summary template](references/refactor-summary-template.md)

## Process

### 1. Inspect Scope and State

Inspect the supplied source inputs fully. In workflow mode, read the feature root, all supplied implementation summaries, and the execution plan when it is discoverable. Read related slices only when needed to understand the supplied boundary or implementation evidence. Treat those files as inputs; do not mutate implementation summaries, slice files, or execution plans.

Inspect and report the initial git state, including tracked modifications and relevant untracked files. A dirty working tree is not a blocker by itself. Stop before editing if unrelated dirty changes overlap the requested boundary in a way that makes ownership unsafe.

### 2. Rediscover Guardrails

Rediscover current repo guardrails at execution time. Check applicable agent instructions, README or contributing docs, validation scripts, nearby implementation patterns, nearby tests, and dependency rules.

Do not add dependencies, change public behavior, rewrite governing docs, create or change branches, commit, push, create pull requests, post pull request comments, update Jira, or perform external workflow actions. If a user explicitly requests one of these actions, treat it as separate authorization outside the default refactor workflow.

### 3. Run Refactor Lenses

For non-trivial scopes, strongly prefer lens agents. Give each lens agent the shared [lens agent brief](references/lens-agent-brief.md), the relevant lens from [lenses](references/lenses.md), the source inputs, and the current diff or scoped files.

Lens agents are findings-only. They do not edit files, run broad rewrites, decide final scope, or write the durable refactor summary. The refactor workflow owns aggregation, edit decisions, validation, and final handoff.

If lens agents are unavailable, the scope is trivial, or the client cannot run parallel agents, perform the lenses sequentially yourself and record that fallback in the summary or chat handoff.

### 4. Refactor

Make one consolidated behavior-preserving edit pass based on the lens findings and current repo patterns. In workflow mode, refactor once for the supplied feature-level boundary; do not run per-slice refactor passes.

Allowed refactors include simplifying control flow, reducing duplication, improving names, tightening module boundaries, improving test clarity without weakening assertions, removing unnecessary work, and removing dead code only when proven dead inside the explicit boundary.

Avoid broad cleanup sweeps and speculative abstractions. New abstractions must remove real duplication, reduce meaningful complexity, clarify a repeated concept, or match an established local pattern.

If necessary supporting edits fall just outside the boundary, keep them minimal and record why. Stop and ask before expanding into unrelated modules, changing acceptance behavior, or weakening tests.

### 5. Validate

Run focused validation that matches the touched files and repo guardrails. Run broader validation when shared contracts, broad utilities, generated artifacts, or higher-risk behavior are touched.

Use up to three focused refactor attempts total. If validation still fails, stop and report `blocked` with the failing evidence and remaining risk.

### 6. Write Summary and Handoff

Workflow mode writes exactly one feature-level refactor summary at:

```text
.scratch/<feature-slug>/refactor/<scope-stem>-refactor-summary.md
```

Derive `<scope-stem>` from the supplied refactor boundary when possible, such as `working-tree`, `staged`, a commit range label, a branch comparison label, or a concise file/directory scope label.

Use the [refactor summary template](references/refactor-summary-template.md). The summary status must be `refactored`, `no-op`, or `blocked`.

Standalone mode returns a concise chat handoff by default. Write a durable artifact only when the user requests one or provides a `.scratch` context.

All modes require a final chat handoff with:

- Status.
- Summary path, if written.
- Files changed.
- Validation evidence.
- Behavior-preservation notes.
- Skipped or escalated findings.
- Remaining risks or follow-up.
- Whether changes remain uncommitted.
