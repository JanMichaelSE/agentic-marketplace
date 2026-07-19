# Run Summary Template

Write or update the run summary at `.scratch/<feature-slug>/orchestration/run-summary.md` unless the user supplies a different local path. This is both the in-progress run-state checkpoint and the durable terminal handoff for local engineer review.

<template>

```markdown
Status: IN_PROGRESS | PASS | REPAIR_REQUIRED | HUMAN_REQUIRED | BLOCKED

## Feature Root

## Review Target

## Slice Selection Source

## Explicit Slice Paths

## Run State

## Current Stage

## Current Cycle

## Terminal State

## Implementation Batches

| Batch | Slice | Execution Mode | Outcome | Summary | Notes |
|-------|-------|----------------|---------|---------|-------|

## Capability Discovery

## Serialization Decisions

## Blockers

## Next Action

## Refactor Outcome

## Review and Repair Cycles

| Cycle | Review Summary | Review Mode | Response Artifact | Repair Summary | Outcome |
|-------|----------------|-------------|-------------------|----------------|---------|

## Validation Evidence

## Unresolved Findings

## Human Decision Queue

## Deferred Findings

## Evidence-Backed Justifications

## Local Engineer Review Handoff

## Files and Artifacts

## External Side Effects

## Risks and Follow-Up

## Comments
```

</template>

## Section Notes

- `Feature Root`: local `.scratch/<feature-slug>/` directory.
- `Review Target`: working-tree diff, staged diff, commit range, branch comparison, or explicit file scope.
- `Slice Selection Source`: state whether slice paths were user-supplied or derived from the feature root after validating the execution plan and slice readiness.
- `Explicit Slice Paths`: list only selected slices in execution order, not every ready slice in the feature root. Record this list before implementation starts and keep using it for resume.
- `Run State`: `IN_PROGRESS` until a terminal outcome is reached; after terminal handoff, match `Status`.
- `Current Stage`: one of `selecting-slices`, `implementation`, `refactor`, `review-cycle-1`, `response-cycle-1`, `repair-cycle-1`, `review-cycle-2`, `change-summary`, or `terminal`.
- `Current Cycle`: `none`, `1`, or `2`.
- `Terminal State`: `None` while `Run State` is `IN_PROGRESS`; after terminal handoff, explain why the workflow ended as `PASS`, `REPAIR_REQUIRED`, `HUMAN_REQUIRED`, or `BLOCKED`.
- `Implementation Batches`: capture dependency order, worker execution mode, outcomes, summary paths, and blocked slices.
- `Capability Discovery`: record whether host sub-agent or multi-agent tooling was actively checked, what capability mode was found, and the exact fallback reason if implementation or review ran in the parent thread.
- `Serialization Decisions`: record any dependency, write-boundary, dirty-worktree, validation, or concurrency-group reason that prevented parallel execution.
- `Blockers`: record missing inputs, unsafe ownership, validation blockers, host capability blockers, or human-required decisions that stop progress.
- `Next Action`: record the first incomplete stage and the exact artifact or decision needed to resume.
- `Refactor Outcome`: link the feature-level refactor summary or explain the no-op or blocked reason.
- `Review and Repair Cycles`: include cycle 1 and cycle 2 only. Max cycles is `2`.
- `Validation Evidence`: record commands and artifact checks actually run, plus skipped validation and why it matters.
- `Unresolved Findings`: list remaining `REPAIR_REQUIRED` items after cycle 2 or failed repair.
- `Human Decision Queue`: list concrete decisions, authorizations, policy questions, external-access needs, or scope questions.
- `Deferred Findings`: list optional, out-of-boundary, superseded, or later-work items.
- `Evidence-Backed Justifications`: include the finding ID, source evidence, and why the finding no longer blocks local engineer review.
- `Local Engineer Review Handoff`: state what the engineer should review locally before deciding on any out-of-scope branch, commit, pull request, Jira, or external workflow action.
- `Files and Artifacts`: list implementation summaries, the feature-level refactor summary, cycle-specific review summaries, response artifacts, cycle-specific repair summaries, change summaries, and this run summary.
- `External Side Effects`: state `None` unless the workflow was explicitly stopped because an attempted or requested side effect was out of scope.
