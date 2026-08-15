# Review and Repair Flow

Use this reference after all implementation batches complete and one refactor pass has run or been intentionally skipped with evidence.

## Default Flow

The default flow performs one review and, when needed, one repair pass:

```text
review/cycle-01-review-summary.md
  -> repair/cycle-01-repair-summary.md
  -> change-summary/<scope-stem>-change-summary.md
  -> orchestration/run-summary.md
```

Stop after review when it returns `PASS`, `HUMAN_REQUIRED`, or `BLOCKED`. When it returns `REPAIR_REQUIRED`, invoke `repair-findings` directly with the review summary and approved repair boundary. Do not create a response artifact and do not automatically re-review repaired changes.

## Repair and Terminal-State Rules

- Repair only findings that are `required-fix` or `validation-gap`, `automated-repair`, inside the approved repair boundary, concrete, and feasible to validate.
- Let `repair-findings` record every supplied finding as `fixed`, `deferred`, `not-applicable`, or `unresolved`, including focused validation evidence for fixed findings.
- Return `PASS` after repair only when every blocking finding is `fixed` with focused validation and no human decision, blocker, or unresolved finding remains. Optional or informational deferred findings do not prevent `PASS`.
- Return `REPAIR_REQUIRED` when an automated-repair eligible finding remains unresolved or repair could not safely run.
- Return `HUMAN_REQUIRED` when a required decision, authorization, policy judgment, or out-of-boundary change remains.
- Return `BLOCKED` when required inputs, checkout access, safe ownership, validation, or host capabilities prevent repair.

`PASS` after repair confirms the repair summary's evidence; it does not represent an independent post-repair review.

## Explicit Post-Repair Re-Review

Run a second review only when the user explicitly asks to re-review after repair. Use the prior review summary, repair summary, and current change target as inputs. Preserve prior finding IDs and do not run another repair pass. Record the optional review as cycle 2 in the run summary and use its gate status as the terminal state.

## Required Evidence

Record in the run summary:

- cycle-01 review summary path and execution mode,
- cycle-01 repair summary path when repair ran,
- optional cycle-02 review summary path and execution mode only when requested,
- change-summary path when summary ran,
- `.scratch/<feature-slug>/orchestration/run-summary.md`,
- validation evidence used for the terminal decision,
- repair outcomes, unresolved findings, deferred findings, and human decision queue.
