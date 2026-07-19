# Implementation Batching

Use this reference after reading the execution plan, every explicit slice file, and the current git state. The goal is to build conservative implementation batches that preserve dependency order and prevent workers from editing overlapping or ambiguous boundaries.

## Inputs

- Feature root, such as `.scratch/<feature-slug>/`.
- Explicit slice paths supplied by the user or derived from the feature root after validating the execution plan and ready slice files.
- Each slice's `Blocked By`, `Write Boundary`, `Parallel Safety`, `Concurrency Group`, validation expectations, and status fields.
- Initial git state, including tracked modifications and relevant untracked files.

When slice paths are derived from the feature root, record the exact ordered list in `.scratch/<feature-slug>/orchestration/run-summary.md` before implementation starts. From that point forward, process only the recorded explicit slice list unless a human supplies and approves a replacement list.

## Readiness Checks

A slice is runnable only when:

- `Status: ready-for-implementation`.
- `Execution Mode: autonomous`.
- Every listed dependency is completed or outside the explicit current run and already satisfied.
- `Write Boundary` is concrete enough to assign ownership.
- `Parallel Safety` says the slice can overlap with the other slices in its batch.
- `Concurrency Group` is present.
- Dirty worktree ownership is clear for every file or directory in the write boundary.

If a runnable decision depends on a missing dependency, vague boundary, unclear dirty file owner, unavailable validation prerequisite, or human-only decision, mark the slice blocked and stop or serialize according to the risk.

## Dependency Order

Build an ordering graph from `Blocked By`. Process only the recorded explicit slice paths; do not auto-sweep every ready slice under `slices/`.

1. Resolve each `Blocked By` entry to a slice path or completed artifact.
2. Reject cycles as `BLOCKED`.
3. Put slices with all dependencies satisfied into the first candidate batch.
4. After a batch completes and its implementation summaries exist, unlock dependent slices for the next batch.

Preserve the source order from the supplied slice list when two slices have no dependency relationship.

## Parallel Safety

Two slices may run in the same batch only when all of these are true:

- Their write boundaries do not overlap by file, directory, generated artifact, or shared configuration surface.
- Their validation expectations do not require one slice's output before the other can be verified.
- Their `Parallel Safety` sections explicitly allow the overlap or make the non-overlap obvious.
- They have different `Concurrency Group` values, unless the group text explicitly says same-group parallel execution is safe.
- No current dirty tracked or untracked file inside either boundary has unclear ownership.

Serialize when the relationship is unclear. Record the reason in the run summary.

## Concurrency Groups

Use `Concurrency Group` as an audit label for mutually sensitive work, not as the only safety mechanism.

- Same group: default to serialized execution.
- Different groups: still check write boundaries and validation dependencies.
- Missing group: block the slice before implementation.
- Broad group names such as `docs` or `repo` are not enough by themselves; use the actual write boundary to decide.

## Worker Assignment

Before assigning workers, actively check whether host sub-agent or multi-agent
tooling is available. Do not infer that worker support is unavailable just
because the tool surface was not initially visible; use the host's discovery
path when one exists. Record the discovered capability mode and any fallback
reason in `.scratch/<feature-slug>/orchestration/run-summary.md`.

For each safe batch, create one implementation worker packet per slice. Each worker must:

- Use `ai-workflow:implement-scope`.
- Receive exactly one explicit slice path.
- Respect the slice write boundary.
- Leave changes uncommitted.
- Write exactly one implementation summary for that slice.

If host sub-agent support is discovered and available, dispatch one worker per
dependency-ready, parallel-safe slice in the current batch. Run the same packets
serially in the parent context only when tooling is unavailable after discovery,
host policy blocks it, delegation fails, overlap is unsafe, dependencies require
ordering, dirty-file ownership is unclear, or the slice is explicitly serial.
Record the exact fallback reason.

## Batch Outcomes

After every batch:

- Confirm every expected implementation summary exists.
- Inspect changed files against the slice write boundaries.
- Record validation evidence from each worker summary.
- Stop with `BLOCKED` if a worker edits outside its boundary, omits the required summary, or leaves unresolved blockers that downstream slices depend on.
