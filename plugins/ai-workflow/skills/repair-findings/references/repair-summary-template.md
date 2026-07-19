# Repair Summary Template

Use this durable artifact for workflow repairs. In standalone mode, return the same structure in chat unless the user asks for a file.

<template>

```markdown
Status: REPAIRED | PARTIAL | NO_OP | BLOCKED

## Mode

workflow | standalone

## Scope

## Repair Boundary

## Source Artifacts

## Initial Git State

## Repair Queue

| ID | Source | Severity | Disposition | Outcome | Files Changed | Validation | Notes |
|----|--------|----------|-------------|---------|---------------|------------|-------|

## Files Changed

## Implementation Decisions

## Validation Evidence

## Deferred Findings

## Unresolved Findings

## Re-Review Handoff

Recommended next review inputs:

Recommended next review status:

## Risks and Follow-Up

## Comments
```

</template>

## Section Notes

- `Scope`: name the feature, story, approved workflow scope, branch comparison, commit range, review summary, or file scope.
- `Repair Boundary`: record the exact files, directories, diff scope, commit range, branch comparison, or workflow slice scope where edits were authorized.
- `Source Artifacts`: list every response artifact, repair queue, or review artifact consumed and whether it shared the same repair boundary.
- `Initial Git State`: summarize tracked modifications and relevant untracked files before editing, including ownership checks for dirty files inside the boundary.
- `Repair Queue`: include every normalized finding, not only fixed findings. The table must keep the columns `ID`, `Source`, `Severity`, `Disposition`, `Outcome`, `Files Changed`, `Validation`, and `Notes`.
- `Files Changed`: list only files changed by the repair pass.
- `Implementation Decisions`: explain notable repair choices, deferrals, and any retry decisions.
- `Validation Evidence`: record commands, artifact checks, outcomes, and validation not run with reasons.
- `Deferred Findings`: list findings that need human, manual, external, unauthorized, destructive, or out-of-boundary work.
- `Unresolved Findings`: list eligible findings that could not be repaired or validated within the retry bound.
- `Re-Review Handoff`: identify the repaired diff, source artifacts, summary path, validation evidence, and unresolved or deferred items for a later review. This section recommends inputs only; it does not invoke review.
- `Risks and Follow-Up`: record residual validation limits, environmental blockers, or next manual steps.
