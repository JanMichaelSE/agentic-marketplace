# Example Run Summary

This concise example shows the minimum in-progress state needed to resume safely.

```markdown
Status: IN_PROGRESS

## Feature Root

`.scratch/example-feature/`

## Review Target

working-tree diff

## Slice Selection Source

Derived from feature root after validating `execution-plan.md` and ready slice files.

## Explicit Slice Paths

- `.scratch/example-feature/slices/01-first-slice.md`
- `.scratch/example-feature/slices/02-second-slice.md`

## Run State

IN_PROGRESS

## Current Stage

implementation

## Current Cycle

none

## Terminal State

None. The run is paused at a resumable implementation checkpoint.

## Implementation Batches

| Batch | Slice | Execution Mode | Outcome | Summary | Notes |
|-------|-------|----------------|---------|---------|-------|
| 1 | `.scratch/example-feature/slices/01-first-slice.md` | delegated-worker | implemented | `.scratch/example-feature/implementation/01-first-slice-summary.md` | Complete |
| 2 | `.scratch/example-feature/slices/02-second-slice.md` | pending | blocked |  | Waiting for batch 1 evidence check |

## Capability Discovery

Host worker capability was checked before implementation. Batch 1 used delegated worker execution; batch 2 is blocked by dependency evidence, not by missing worker support.

## Blockers

- Confirm batch 1 summary evidence before starting batch 2.

## Next Action

Inspect `.scratch/example-feature/implementation/01-first-slice-summary.md`, re-check git state and dirty-file ownership, then start batch 2 if still safe.

## Files and Artifacts

- Run summary: `.scratch/example-feature/orchestration/run-summary.md`

## External Side Effects

None.
```
