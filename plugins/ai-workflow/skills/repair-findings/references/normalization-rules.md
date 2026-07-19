# Normalization Rules

Normalize every supplied source artifact into repair queue entries before editing. A source artifact may be a `run-workflow` response artifact repair queue, native review summary, pasted finding list, external review note, issue comment, checklist, or other structured or semi-structured review output.

## Queue Entry Fields

Each normalized repair queue entry must include:

- `ID`: original finding ID when present, otherwise generated as `REP-<scope-stem>-NNN`.
- `Source`: artifact path, pasted source label, review summary section, or external source name.
- `Title`: concise action-oriented summary.
- `Severity`: original severity when present, otherwise `unknown`.
- `Disposition`: `required-fix`, `validation-gap`, `human-decision`, `optional-improvement`, `info`, or `unknown`.
- `Repairability`: `automated-repair`, `needs-human`, `manual-only`, `not-applicable`, or `unknown`.
- `Boundary Fit`: `inside`, `outside`, `partial`, or `unknown`.
- `Evidence`: file, symbol, diff area, artifact excerpt, command result, or source note proving the issue.
- `Required Change`: concrete requested change, or `Missing`.
- `Validation Expectation`: focused command, inspection, or evidence expected after repair, or `Missing`.
- `Human Decision Needed`: decision or authorization required, or `None`.
- `Notes`: assumptions, ambiguity, deduplication, or mapping context.

## Native Review Artifacts

For native review summaries that already use finding fields:

- Preserve original finding IDs.
- Preserve `Disposition`, `Repairability`, severity, evidence, required change, and validation expectation.
- Set `Boundary Fit` by comparing the finding evidence and required change with the explicit repair boundary.
- Include findings from the repair queue and validation gap sections when present.
- Include human decision, optional improvement, and info findings only so they can be marked `deferred` or `not-applicable`; do not repair them.

## Run-Workflow Response Artifacts

For `run-workflow` response artifacts:

- Treat the artifact's `Repair Queue` as the authoritative repair input.
- Include only findings with response value `QUEUED_FOR_REPAIR` as candidate repair entries.
- Preserve original finding IDs from the response artifact and source review.
- Preserve or map disposition as `required-fix` or `validation-gap` only when the source review already classified it that way.
- Set `Repairability` from the source review or repair queue metadata; do not infer `automated-repair` from queue presence alone.
- Set `Boundary Fit` by comparing the planned repair action and evidence with the explicit repair boundary.
- Use `Next Action` as the required change only when it is concrete; otherwise set `Required Change` to `Missing`.
- Keep justified, deferred, and human-required findings in the repair summary as `not-applicable` or `deferred` only when they were supplied for context; do not repair them.

## Non-Native Artifacts

For pasted, external, or non-native review notes:

- Generate IDs as `REP-<scope-stem>-NNN` in source order.
- Infer fields only when the artifact states them clearly.
- Use `unknown` or `Missing` instead of guessing.
- Treat broad suggestions, ambiguous defects, and policy decisions as not automated-repair eligible.
- Convert only concrete defect or validation requests into candidate `required-fix` or `validation-gap` entries.

## Boundary Fit

Assign `Boundary Fit` after comparing each entry to the explicit repair boundary:

- `inside`: every required edit is inside the approved boundary.
- `outside`: the required edit is outside the approved boundary.
- `partial`: part of the required edit is inside the boundary and part is outside.
- `unknown`: the artifact lacks enough location or change detail to decide.

Only `inside` entries can be repaired. Mark `outside`, `partial`, and `unknown` entries as deferred unless the user supplies a clearer boundary before editing.

## Eligibility

A normalized entry is repair eligible only when all are true:

- `Disposition` is `required-fix` or `validation-gap`.
- `Repairability` is `automated-repair`.
- `Boundary Fit` is `inside`.
- `Required Change` is not `Missing`.
- `Validation Expectation` is not `Missing` and is feasible in the current checkout.

Everything else remains in the summary with outcome `deferred` or `not-applicable`.

## Deduplication

When multiple artifacts describe the same repair:

- Prefer the native stable ID when one exists.
- Combine source references in `Source`.
- Preserve the highest stated severity.
- Merge compatible validation expectations.
- Defer the entry if the artifacts disagree on required behavior, repairability, or boundary.

## Prohibited Normalization

Do not:

- Expand the repair boundary during normalization.
- Invent missing required changes or validation expectations.
- Reclassify a human decision, manual-only task, optional improvement, or informational note as required repair.
- Treat a failed or missing validation command as fixed without rerunning or inspecting focused evidence.
