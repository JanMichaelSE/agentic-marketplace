---
name: repair-findings
description: Repair eligible in-scope review findings, run focused validation, and produce a repair summary.
---

# Repair Findings

Repair explicit, bounded findings from one or more normalized review artifacts. This skill is a repair executor, not a review-cycle orchestrator.

This skill never commits, pushes, changes branches, updates Jira, posts pull request comments, invokes re-review, or performs external workflow actions. It edits only within the approved repair boundary, validates the repair, and produces a summary for a later human or review step.

## Modes

Confirm one mode before editing.

Workflow mode uses `.scratch/<feature-slug>/` inputs, including the source review summary when invoked by `run-workflow`, and writes one durable summary:

```text
.scratch/<feature-slug>/repair/<scope-stem>-repair-summary.md
```

Standalone mode uses explicit review artifacts and a concrete repair boundary without requiring `.scratch` context. Return the same structured summary in chat unless the user asks for a file.

## Required Inputs

Before editing, confirm:

- One explicit repair boundary, such as a file list, directory scope, diff scope, commit range, branch comparison, or workflow slice scope.
- One or more source artifacts normalized into repair queue entries. In workflow mode, this is the source review summary. In standalone mode, this is one or more explicit review artifacts.
- All supplied artifacts describe the same repair boundary. Stop if boundaries conflict, are missing, are repo-wide without a concrete reason, or require scope expansion.
- Current checkout access and dirty-worktree ownership for every file in the repair boundary.

For workflow mode, also confirm the feature slug, source review summary, repair queue entries, and output summary path. Treat execution plans, slices, implementation summaries, refactor summaries, review summaries, and prior repair summaries as read-only inputs.

## Reference Files

Read these files before repairing:

- [Normalization rules](references/normalization-rules.md)
- [Repair summary template](references/repair-summary-template.md)

## Eligibility Gate

Normalize all supplied source artifacts before editing. For a workflow review summary, use its repair-ready finding fields as candidate repair entries. Repair only findings where every condition is true:

- `Disposition` is `required-fix` or `validation-gap`.
- `Repairability` is `automated-repair`.
- `Boundary Fit` is `inside`.
- The required change is concrete.
- The validation expectation is focused and feasible in the current checkout.

Defer findings that need human decisions, manual-only actions, unauthorized dependencies, destructive operations, external systems, credentials, unclear behavior, missing evidence, or edits outside the approved boundary. Do not turn optional improvements or informational findings into repair work.

## Process

1. Confirm mode, repair boundary, source artifacts, and summary target.
2. Inspect current git state and report tracked modifications plus relevant untracked files.
3. Stop before editing if dirty files overlap the repair boundary and ownership is unclear. Do not revert, overwrite, or clean up unrelated changes.
4. Rediscover current repo guardrails, validation expectations, nearby patterns, and dependency rules.
5. Normalize the source review summary and any additional artifacts into a single repair queue using the normalization rules.
6. Classify each finding as eligible, deferred, not applicable, or blocked before editing.
7. Repair eligible findings with the smallest scoped change that satisfies the required change.
8. Run each finding's focused validation where feasible, plus applicable lightweight repo checks.
9. If validation fails, use at most two focused repair attempts for that finding. After two failed attempts, mark it `unresolved` and continue only with independent safe findings.
10. Write the repair summary in workflow mode, or return it in chat for standalone mode.

## Statuses and Outcomes

Top-level repair status must be one of:

- `REPAIRED`: every eligible finding was fixed and validated.
- `PARTIAL`: at least one eligible finding was fixed, and at least one finding was deferred, not applicable, or unresolved.
- `NO_OP`: no supplied finding was eligible for repair.
- `BLOCKED`: required inputs, boundary clarity, checkout access, ownership, or validation constraints prevent safe repair.

Per-finding outcome must be one of:

- `fixed`: repaired and validated.
- `deferred`: not repaired because it needs human, manual, external, unauthorized, destructive, or out-of-boundary work.
- `not-applicable`: informational, optional, duplicate, already addressed, or outside the supplied repair contract.
- `unresolved`: eligible repair was attempted but validation or implementation could not be completed within the retry bound.

## Handoff

The repair summary must include validation evidence, changed files, unresolved or deferred findings, and a re-review handoff. The handoff recommends later review inputs and status, but does not invoke the review itself.

Leave changes uncommitted unless the user explicitly asks for a commit.
