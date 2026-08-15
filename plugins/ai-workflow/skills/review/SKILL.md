---
name: review
description: Review explicit workflow or standalone code changes through independent Standards and Spec axes, producing a repair-ready summary.
---

# Review

Review explicit code changes against repository standards and their governing specification. Keep the two axes independent, then produce a structured summary that a later repair pass or human can act on.

This skill is a read-only evaluator. It never modifies code, tests, workflow artifacts, Jira, pull requests, branches, commits, or pushes. Its only durable output is its own review summary artifact when workflow mode or the user asks for one.

## Delegation Authorization

Invoking this skill is explicit authorization to use delegated Standards and Spec review lanes when sub-agent or parallel-agent tooling is available. The user does not need to separately ask for sub-agents or parallel review.

Use one delegated lane per enabled axis by default. Use `single-agent-fallback` only when delegation tooling is unavailable, blocked by host policy, fails, or the review target is small enough that lane overhead would not improve coverage. Record the exact fallback reason in the review summary.

## Modes

Confirm one mode before reviewing.

Workflow mode uses `.scratch/<feature-slug>/` artifacts as source inputs. Prefer reviewing the complete feature, story, or approved workflow scope after all relevant implementation and refactor slices are complete:

- `.scratch/<feature-slug>/execution-plan.md` and approved slice files are the governing workflow specification.
- Implementation summaries under `.scratch/<feature-slug>/implementation/` and optional refactor summaries under `.scratch/<feature-slug>/refactor/` are supporting evidence, not replacement requirements.
- Validation evidence from the implemented workflow.
- A concrete full-scope review target such as a working-tree diff, staged diff, commit range, branch comparison, PR diff, or explicit file scope.

Use slice files and summaries as source inputs, but produce one consolidated feature-level review by default. Per-slice workflow reviews are explicit opt-in and should be reserved for high-risk, long-running, independently owned, or independently releasable slices.

Standalone mode uses a concrete review target without requiring `.scratch` context:

- Branch comparison or commit range.
- Staged or working-tree diff.
- PR diff.
- Explicit file or directory scope.
- Optional requirements, design notes, implementation notes, or validation evidence.

If the review target is missing or ambiguous, stop and ask for the target before reviewing. Do not infer a repo-wide review target from context alone.

## Reference Files

Read these files before conducting a review:

- [Review axes](references/review-lenses.md)
- [Finding schema](references/finding-schema.md)
- [Review summary template](references/review-summary-template.md)
- [Re-review rules](references/re-review-rules.md)

## Output

In workflow mode, write one review summary by default:

```text
.scratch/<feature-slug>/review/<scope-stem>-review-summary.md
```

Use a stable `<scope-stem>` derived from the feature, story, approved workflow scope, branch comparison, commit range, or user-supplied scope. For explicit per-slice reviews, derive the stem from the slice or implementation summary. When no `.scratch` context is supplied, return the same structured summary in chat and write a file only if the user asks.

The gate status must be one of:

- `PASS`: no required fixes, validation gaps, or human decision points remain.
- `REPAIR_REQUIRED`: at least one automated-repair eligible item exists and no human decision blocks repair.
- `HUMAN_REQUIRED`: at least one blocking decision requires human input.
- `BLOCKED`: required review inputs or environment access are missing, or the review target is too large or risky for the available execution mode.

Every review summary must include a `Review Execution Mode` value of `delegated-lanes`, `parent-orchestrated-lanes`, `single-agent-fallback`, or `blocked`.

Findings must use these dispositions:

- `required-fix`: issue should be repaired before engineer review or PR creation.
- `validation-gap`: missing, weak, or unrun validation blocks confidence.
- `human-decision`: product, architecture, dependency, policy, or scope decision automation should not make.
- `optional-improvement`: low-risk cleanup that does not block the phase.
- `info`: non-actionable observation.

Findings must use these repairability values:

- `automated-repair`: a later automated repair pass can act with the evidence, required change, and validation expectation provided.
- `needs-human`: a decision or authorization is required before repair.
- `manual-only`: the fix requires external access or a workflow action outside repo edits.
- `not-applicable`: the finding is informational.

Assign stable finding IDs such as `REV-<scope>-001`. During re-review, preserve IDs from previous findings and add new IDs only for newly discovered issues.

## Process

1. Confirm mode, source inputs, concrete review target, and prior review inputs when supplied.
2. Inspect current repo state and guardrails without editing files.
3. Establish the target once:
   - For a fixed point, confirm it resolves, capture `git diff <fixed-point>...HEAD`, list `git log <fixed-point>..HEAD --oneline`, and stop if the diff is empty.
   - For a staged, working-tree, PR, or explicit file target, record the exact command or paths and stop if the selected change is empty.
4. Discover the governing specification without guessing:
   - In workflow mode, use the execution plan and approved slices first, then any explicitly supplied requirements or feature-matched local specifications.
   - In standalone mode, inspect the selected commit messages for originating issue references first. Retrieve a referenced issue only through an existing repository-documented, read-only issue-tracker workflow; otherwise ask the user for its content or path. Next use an explicitly supplied path, pasted acceptance criteria, or issue content; then matching local requirements under `docs/`, `specs/`, or `.scratch/`.
   - If no source exists, ask for one. If the user confirms there is none, skip the Spec axis and report `No spec available`; never infer requirements from the implementation.
5. Discover applicable repository standards and the Standards baseline described in the review-axes reference.
6. Check whether sub-agent or parallel-agent tooling is available before selecting an execution mode.
7. Choose the review execution mode:
   - `delegated-lanes`: this skill spawns independent Standards and Spec lanes.
   - `parent-orchestrated-lanes`: the parent coordinator supplies one result per enabled axis because this skill cannot spawn nested lanes.
   - `single-agent-fallback`: delegation is unavailable, blocked, failed, or not useful for a very small target, and the target is bounded enough to cover every enabled axis in one read-only pass.
   - `blocked`: required source inputs or target access are missing, or the target is too large or risky for the available execution mode.
8. Review the enabled axes independently. Do not pass one axis's intermediate findings to the other, merge their findings, or choose a worst finding across axes.
9. When parent-orchestrated results are supplied, normalize them into the review summary instead of rerunning either axis.
10. When using single-agent fallback, cover every enabled axis, record the exact fallback reason, and state residual confidence limits in the review summary.
11. In re-review, evaluate prior findings using the re-review rules before adding new findings.
12. Produce the review summary with separate Standards and Spec reports, then normalize each finding into the repair-ready schema.

## Review Axes

Review quality is defined by Standards and Spec coverage. A change can pass either axis while failing the other, so preserve the two reports even when one has no findings.

- **Standards:** Check the reviewed diff against applicable repository guidance and the code-smell baseline. Documented standard breaches may be required fixes; baseline smells are judgement calls and normally optional improvements.
- **Spec:** Check the reviewed diff against the governing specification for missing or partial requirements, incorrect behavior, and scope creep. Skip this axis only after the user confirms no governing specification exists.

For each enabled axis, provide the same target, commit list where applicable, source inputs, and relevant diff hunks. A lane may return no findings, but it must report evidence checked. If a required axis cannot be covered cleanly by delegated lanes, parent-orchestrated results, or a bounded single-agent fallback, return `BLOCKED` with the missing input, access problem, failed lane, or scope risk.

## Review Rules

- Prefer high-confidence findings with concrete failure modes.
- Cite exact files, symbols, commands, artifacts, and governing requirement or standard when possible.
- Keep Standards and Spec findings separate. A repair queue may group eligible findings operationally, but must retain each finding's axis and must not imply cross-axis ranking.
- Keep optional improvements separate from blocking findings.
- Treat missing source inputs as `BLOCKED` unless the user supplied an equivalent source. A user-confirmed lack of specification skips only the Spec axis.
- Do not report `BLOCKED` solely because nested delegation is unavailable for a bounded workflow review; use parent-orchestrated lanes when results are supplied, otherwise use single-agent fallback with explicit residual risk.
- Escalate conflicting or ambiguous requirements, unauthorized dependencies, security policy uncertainty, external validation requirements, and scope expansion as `human-decision`.
- Do not require `review-toolkit`, `agentic-sdlc`, `codex exec`, Claude response files, host-specific agent files, GitHub inline comments, or Jira automation.
- Optional companion review skills may be used inside an axis when available, but the output contract remains this skill's review summary.
