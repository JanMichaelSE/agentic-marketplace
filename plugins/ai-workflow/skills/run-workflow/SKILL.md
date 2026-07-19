---
name: run-workflow
description: Orchestrate an approved local ai-workflow from slices through implementation, review, repair, and engineer handoff.
---

# Run Workflow

Coordinate an approved local `.scratch/<feature-slug>/` workflow across the existing `ai-workflow` skills. This skill is a local orchestration contract for agents running in capable hosts; it does not replace `implement-scope`, `refactor`, `review`, `repair-findings`, or `summarize-changes`.

The workflow is vendor-neutral and portable across local Codex, local Claude Code, and future orchestration runtimes. Host-specific sub-agent support is an execution capability, not a required dependency.

## Boundaries

This skill never creates commits, branches, pull requests, pull request comments, Jira updates, pushes, workflow transitions, or external workflow side effects. It stops at the local engineer review handoff.

Do not add a terminal CLI, dependencies, host-only scripts, or external automation from this skill contract. Do not turn `review` or `repair-findings` into orchestrators.

## Required Inputs

Before running workflow mode, confirm:

- One feature root, `.scratch/<feature-slug>/`.
- `.scratch/<feature-slug>/execution-plan.md` exists and matches the requested workflow.
- One or more approved slice files under `.scratch/<feature-slug>/slices/`, either supplied as exact paths or derived from the feature root after validating the execution plan and slice readiness.
- Each slice has `Status: ready-for-implementation`.
- Each slice has `Execution Mode: autonomous`.
- Each slice has a concrete `Write Boundary`, `Parallel Safety`, and `Concurrency Group`.
- The target checkout is available.
- Dirty-worktree ownership is clear for every implementation and repair boundary.
- The requested change target for review and change summary is explicit, such as a working-tree diff, staged diff, commit range, branch comparison, or file scope.

Feature-root input is selection input only. If the user supplies only the feature root, derive the approved slice list from the execution plan and ready slice files, then record the exact ordered slice paths in the run summary before implementation starts. Do not auto-sweep every ready slice. Worker dispatch always uses the recorded explicit slice list, and every `implement-scope` worker receives exactly one explicit slice path.

## Reference Files

Load these references before running the corresponding workflow stage:

- [`implementation-batching.md`](references/implementation-batching.md) for dependency order, write-boundary checks, parallel safety, and concurrency groups.
- [`review-repair-cycle.md`](references/review-repair-cycle.md) for the bounded review, response, repair, and re-review loop.
- [`response-artifact-template.md`](references/response-artifact-template.md) for classifying review findings as `QUEUED_FOR_REPAIR`, `JUSTIFIED`, `DEFERRED`, or `HUMAN_REQUIRED`.
- [`worker-prompt-packets.md`](references/worker-prompt-packets.md) for implementation worker, review lane, refactor, repair, and summary invocation packets.
- [`run-summary-template.md`](references/run-summary-template.md) for the terminal local engineer review handoff.
- [`example-run-summary.md`](references/example-run-summary.md) for a concise run-state and resume example.

If a required reference is missing, stop with `BLOCKED` before starting that stage.

## Capability Discovery

Before serializing implementation in the parent thread, actively discover host
sub-agent or multi-agent tooling. A hidden, deferred, unloaded, or undiscovered
tool surface is not a valid fallback reason until discovery has been attempted.

If sub-agent support is available, dispatch one implementation worker for every
dependency-ready, parallel-safe slice in the current batch. Serialize only for a
recorded fallback reason: tooling unavailable after discovery, host policy
block, delegation failure, unsafe overlap, dependency order, validation
prerequisites, unclear dirty-file ownership, or an explicitly serial slice.
Record the discovery mode and any fallback reason in the run summary.

## Process

1. Confirm workflow mode, feature root, slice selection source, review target, max review cycles, and local output paths.
2. Inspect current git state and report tracked modifications plus relevant untracked files.
3. Rediscover repo guardrails, validation expectations, nearby skill patterns, and the supplied execution plan.
4. Read the execution plan and every supplied or derived slice file fully.
5. Validate slice readiness, dependency state, write boundaries, parallel-safety notes, and concurrency groups.
6. Record the exact explicit slice list selected for this run before implementation starts.
7. Build dependency-ordered implementation batches from the recorded slice list.
8. After capability discovery, spawn one implementation worker per safe ready slice in the current batch when host sub-agent support is available.
9. Instruct every implementation worker to use `implement-scope` with exactly one explicit slice path.
10. Serialize slices instead of parallelizing when dependencies, write boundaries, validation prerequisites, dirty-worktree ownership, or concurrency groups make overlap unsafe.
11. Update run state after each batch with current stage, selected slices, completed batches, blockers, terminal state if any, and next action.
12. Collect implementation summaries from `.scratch/<feature-slug>/implementation/`.
13. Run one `refactor` pass after all implementation slices complete. Refactor runs once for the complete implemented workflow, not once per slice.
14. Run review cycle 1 with the existing `review` contract and the complete workflow change target.
15. Prefer one review lane per enabled lens when host sub-agent support is available.
16. Use parent-orchestrated review lanes when nested delegation is unavailable: the parent coordinator starts one lane per enabled lens, then supplies those lane results to `review` as `parent-orchestrated-lanes`.
17. If review returns `PASS`, run `summarize-changes` for the local engineer review handoff.
18. If review returns `REPAIR_REQUIRED` before the max cycle limit, write a response artifact that classifies findings as queued for repair, justified, deferred, or human-required.
19. Require evidence-backed justifications. Do not auto-justify critical or high security findings. High functional, data-integrity, or contract findings require concrete governing context or a human decision before acceptance.
20. Run one single-pass, single-agent `repair-findings` pass for automated-repair eligible findings only.
21. Re-run review once with the prior review summary, response artifact, repair summary, and current change target.
22. If the final review state is `PASS`, run `summarize-changes` for the local engineer review handoff. If the final state is `REPAIR_REQUIRED`, `HUMAN_REQUIRED`, or `BLOCKED`, run `summarize-changes` only when enough change-target evidence exists to produce a useful local handoff without masking the terminal state.
23. Stop on a terminal state and produce or update the local run summary for engineer review.

## Review and Repair Loop

Default max review cycles is `2`.

Each cycle is one consolidated review summary over the current workflow change target. Use `review-repair-cycle.md` for response artifact, repair eligibility, re-review, and cycle evidence rules.

Repair is single-pass and single-agent for the first version. Do not fan out repair or repair outside automated-repair eligible findings inside the approved repair boundary.

## Terminal States

Use these top-level workflow states:

- `PASS`: review found no required repair, validation gap, or human decision blocking local engineer review.
- `REPAIR_REQUIRED`: automated-repair eligible findings remain after cycle 2 or repair was not run.
- `HUMAN_REQUIRED`: a product, architecture, security, policy, dependency, scope, authorization, or external-workflow decision is required.
- `BLOCKED`: required inputs, checkout access, safe ownership, validation, or host capabilities are missing.

After any terminal state, stop at the local engineer review handoff. Do not proceed to commits, branches, pull requests, pull request comments, Jira updates, pushes, or external workflow actions.

## Run State and Resume

Keep `.scratch/<feature-slug>/orchestration/run-summary.md` current enough that an interrupted local run can be inspected before resuming. At minimum, record run state, current stage, current cycle, selected explicit slice paths, completed implementation batches, blockers, terminal state when reached, and next action.

Resume from the first incomplete stage whose required input artifacts are missing or blocked. Before resuming, re-check git state, dirty-file ownership, slice readiness, and artifact paths. Do not infer new slices from the feature root after implementation has started; use the recorded explicit slice list unless a human supplies and approves a replacement list.

## Handoff

At handoff, report:

- Status and terminal state.
- Feature root, slice selection source, and explicit slice paths processed.
- Implementation batches and any serialization decisions.
- Implementation summaries, feature-level refactor summary, cycle-specific review summaries, response artifacts, cycle-specific repair summaries, change summary, and `orchestration/run-summary.md` artifact paths.
- Review execution mode: `delegated-lanes`, `parent-orchestrated-lanes`, `single-agent-fallback`, or `blocked`.
- Validation evidence and commands actually run.
- Evidence-backed justifications, deferred findings, unresolved repair queue, and human-required decisions.
- Confirmation that changes remain uncommitted and external workflow side effects were not performed.
