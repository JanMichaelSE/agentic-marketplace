# Response Artifact Template

Write one response artifact for each review cycle that returns findings needing disposition. Use the path `.scratch/<feature-slug>/response/cycle-<NN>-response.md` unless the user supplies another local path. The response is created before repair and records the planned disposition for each finding. Fixed outcomes are recorded later in the cycle-specific repair summary, then the `run-workflow` orchestrator references that summary from this artifact as evidence.

<template>

```markdown
Status: READY_FOR_REPAIR | JUSTIFIED_ONLY | HUMAN_REQUIRED | BLOCKED

## Cycle

## Source Review

## Response Scope

## Finding Responses

| ID | Disposition | Severity | Repairability | Response | Evidence | Next Action |
|----|-------------|----------|---------------|----------|----------|-------------|

## Repair Queue

## Justified Findings

## Deferred Findings

## Human Decision Queue

## Blockers

## Validation Evidence

## Re-Review Inputs

## Comments
```

</template>

## Response Values

Use one of these values in the `Response` column:

- `QUEUED_FOR_REPAIR`: the finding is assigned to the repair queue for the single repair pass. This is a pre-repair disposition, not a fixed outcome.
- `JUSTIFIED`: the finding is accepted as non-blocking based on concrete evidence.
- `DEFERRED`: the finding is not repaired in this run because it is optional, out of boundary, already superseded, or intentionally left for later work.
- `HUMAN_REQUIRED`: the finding needs a human decision, authorization, external access, policy judgment, dependency approval, or scope change.

Do not invent additional response values in the table. Add nuance in `Evidence`, `Next Action`, or the sections below the table.

## Section Notes

- `Cycle`: use `1` or `2`; the first version should never exceed max cycles `2`.
- `Source Review`: path to the review summary that produced the findings.
- `Response Scope`: exact feature root, review target, repair boundary, and source artifacts considered.
- `Finding Responses`: include every finding from the source review, including optional and informational findings.
- `Repair Queue`: list only `QUEUED_FOR_REPAIR` findings that are `automated-repair`, in boundary, concrete, feasible, and authorized for the single repair pass.
- `Justified Findings`: include evidence-backed rationale. Critical or high security findings must not be auto-justified.
- `Deferred Findings`: explain why the finding is out of scope, optional, superseded, or intentionally left for later human work.
- `Human Decision Queue`: phrase each item as a concrete decision question with needed owner or authorization when known.
- `Blockers`: record missing inputs, unsafe boundaries, validation blockers, or host capability blockers.
- `Validation Evidence`: list commands, artifacts, or current-code evidence used to classify findings. After repair, add the repair summary path and validation result for repaired findings.
- `Re-Review Inputs`: list the response artifact, cycle-specific repair summary if any, prior review summary, and current change target for the next review cycle.
