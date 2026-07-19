# Review and Repair Cycle

Use this reference after all implementation batches complete and one refactor pass has run or been intentionally skipped with evidence.

## Cycle Limit

Default and maximum review cycles for the first version is `2`.

A cycle is one consolidated review summary over the current workflow change target. Cycle 1 runs after implementation and refactor. Cycle 2 runs only after a response artifact and, when eligible findings exist, one single-agent repair pass.

## Cycle Flow

```text
review/cycle-01-review-summary.md
  -> response/cycle-01-response.md
  -> repair/cycle-01-repair-summary.md
  -> review/cycle-02-review-summary.md
  -> change-summary/<scope-stem>-change-summary.md
  -> orchestration/run-summary.md
```

Stop earlier when review returns `PASS`, `HUMAN_REQUIRED`, or `BLOCKED`.

## Review Rules

- Use the existing `review` skill contract.
- Review the complete workflow change target, not isolated slices, unless the user explicitly asks for a per-slice review.
- Prefer `delegated-lanes` when the host can run one review worker per enabled lens.
- Use `parent-orchestrated-lanes` when the parent coordinator can run review lanes but nested delegation is unavailable.
- Use `single-agent-fallback` only for bounded targets and record why lane delegation was unavailable.
- Preserve prior finding IDs during re-review.

## Response Rules

When cycle 1 returns `REPAIR_REQUIRED`, write one response artifact before repair or re-review. The response must classify every finding as:

- `QUEUED_FOR_REPAIR`: assigned to the repair queue for the single repair pass. This is a pre-repair disposition, not a fixed outcome.
- `JUSTIFIED`: accepted with concrete evidence from the execution plan, slices, implementation, current code, or validation.
- `DEFERRED`: not repaired because it is optional, out of boundary, not applicable, or explicitly deferred for later human work.
- `HUMAN_REQUIRED`: requires a human decision, authorization, external access, security or policy judgment, dependency approval, or scope change.

Before repair runs, every `QUEUED_FOR_REPAIR` row must name the planned repair action in `Next Action` and list the finding in `Repair Queue`. After repair runs, fixed outcomes are recorded in the cycle-specific repair summary. The `run-workflow` orchestrator updates response evidence with the repair summary path and validation result instead of changing the response value to a post-repair outcome.

Critical or high security findings must not be auto-justified. High functional, data-integrity, or contract findings require concrete governing context or an explicit human decision before acceptance.

## Repair Rules

Repair is single-pass and single-agent in this first version.

Run `repair-findings` only for `QUEUED_FOR_REPAIR` findings that are automated-repair eligible and inside the approved repair boundary. Pass the response artifact and its `Repair Queue` as first-class repair inputs. Do not run repair for:

- optional improvements,
- informational findings,
- manual-only findings,
- human-decision findings,
- unauthorized dependencies,
- destructive actions,
- external systems,
- commits, branches, pull requests, pull request comments, Jira updates, pushes, or workflow transitions,
- edits outside the approved repair boundary.

Do not fan out repair across multiple agents and do not run a second repair pass after cycle 2.

## Terminal States

- `PASS`: no required repair, validation gap, or human decision blocks local engineer review.
- `REPAIR_REQUIRED`: automated-repair eligible findings remain after cycle 2 or repair could not safely run.
- `HUMAN_REQUIRED`: a product, architecture, security, policy, dependency, scope, authorization, or external-workflow decision is required.
- `BLOCKED`: required inputs, checkout access, safe ownership, validation, or host capabilities are missing.

Every terminal state proceeds to the local engineer review handoff. Do not proceed to external workflow actions.

## Required Cycle Evidence

Record in the run summary:

- cycle-specific review summary paths, such as `.scratch/<feature-slug>/review/cycle-01-review-summary.md`,
- review execution mode for each cycle,
- response artifact path, such as `.scratch/<feature-slug>/response/cycle-01-response.md`,
- cycle-specific repair summary path when repair ran, such as `.scratch/<feature-slug>/repair/cycle-01-repair-summary.md`,
- change-summary path when summary ran,
- `.scratch/<feature-slug>/orchestration/run-summary.md`,
- validation evidence used for the terminal decision,
- unresolved repair queue,
- human decision queue,
- justification and deferral rationale.
