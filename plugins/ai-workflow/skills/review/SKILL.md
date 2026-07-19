---
name: review
description: Review explicit workflow or standalone code changes as a read-only evaluator and produce a repair-ready summary.
---

# Review

Review explicit code changes against supplied workflow artifacts or standalone review context. Produce a structured review summary that a later repair pass or human can act on.

This skill is a read-only evaluator. It never modifies code, tests, workflow artifacts, Jira, pull requests, branches, commits, or pushes. Its only durable output is its own review summary artifact when workflow mode or the user asks for one.

## Delegation Authorization

Invoking this skill is explicit authorization to use delegated review lanes when sub-agent or parallel-agent tooling is available. The user does not need to separately ask for sub-agents, parallel review, or multi-agent review.

When delegation tooling is available, spawn one delegated lane per enabled review lens by default. Use `single-agent-fallback` only when delegation tooling is unavailable, blocked by host policy, fails, or the review target is small enough that lane overhead would not improve coverage. Record the exact fallback reason in the review summary.

## Modes

Confirm one mode before reviewing.

Workflow mode uses `.scratch/<feature-slug>/` artifacts as source inputs. Prefer reviewing the complete feature, story, or approved workflow scope after all relevant implementation and refactor slices are complete:

- `.scratch/<feature-slug>/execution-plan.md`.
- Approved slice files under `.scratch/<feature-slug>/slices/`.
- Implementation summaries under `.scratch/<feature-slug>/implementation/`.
- Optional refactor summaries under `.scratch/<feature-slug>/refactor/`.
- Validation evidence from the implemented workflow.
- A concrete full-scope review target such as a working-tree diff, staged diff, commit range, branch comparison, PR diff, or explicit file scope.

Use slice files and summaries as source inputs, but produce one consolidated feature-level review by default. Per-slice workflow reviews are explicit opt-in and should be reserved for high-risk, long-running, independently owned, or independently releasable slices.

Standalone mode uses a concrete review target without requiring `.scratch` context:

- Branch comparison.
- Commit range.
- Staged diff.
- Working-tree diff.
- PR diff.
- Explicit file or directory scope.
- Optional requirements, design notes, implementation notes, or validation evidence.

If the review target is missing or ambiguous, stop and ask for the target before reviewing. Do not infer a repo-wide review target from context alone.

## Reference Files

Read these files before conducting a review:

- [Review lenses](references/review-lenses.md)
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

1. Confirm mode, source inputs, and concrete review target.
2. Inspect current repo state and guardrails without editing files.
3. Determine the enabled review lenses for the target.
4. Check whether sub-agent or parallel-agent tooling is available before selecting an execution mode.
5. Choose the review execution mode:
   - `delegated-lanes`: the review skill can spawn one lane per enabled lens.
   - `parent-orchestrated-lanes`: the parent coordinator supplies one lane result per enabled lens because the review skill cannot spawn nested lanes.
   - `single-agent-fallback`: delegation is unavailable, blocked, failed, or not useful for a very small target, and the review target is bounded enough to cover every enabled lens in one read-only pass.
   - `blocked`: required source inputs or target access are missing, or the target is too large or risky for the available execution mode.
6. Use delegated lanes on capable hosts; do not replace available lane delegation with inline review merely because the user did not separately request sub-agents.
7. When parent-orchestrated lane outputs are supplied, normalize those lane findings into the review summary instead of rerunning the lane analyses.
8. When using single-agent fallback, cover every enabled lens, clearly record the execution mode, state the exact fallback reason, and state residual confidence limits in the review summary.
9. If delegation is unavailable in standalone mode, state the limitation before reviewing and ask when the target is large enough that inline review would weaken coverage.
10. Read supplied workflow artifacts, review target, and relevant local code/tests needed to coordinate or perform the review.
11. Normalize findings into the human-navigable review summary using the template and finding schema, including stable links from the quick summary to every detailed finding.
12. In re-review, evaluate prior findings using the re-review rules before adding new findings.
13. Produce the review summary.

## Review Lanes

Review quality is defined by enabled lens coverage, not by whether lanes were delegated. Cover every enabled lens through delegated lanes, parent-orchestrated lanes, or a single-agent fallback for bounded targets. Use one lane per enabled lens whenever the host provides delegation capability, with clear ownership of that lens and the same source inputs and review target. A lane may return no findings, but it must still report the lens result and evidence checked.

Delegated lanes are required on capable hosts. Skip delegation only for a concrete fallback reason: tooling unavailable, host policy block, delegation failure, or a target so small that lane overhead would not improve coverage.

Default lanes:

- Correctness.
- Security and guardrails.
- Maintainability.
- Standards.
- Test coverage.
- Test correctness.
- Traceability.
- Validation evidence.

Skip a lane only when it is not applicable to the supplied target, and record that skip in the review summary. If a required lens cannot be covered cleanly by delegated lanes, parent-orchestrated lanes, or bounded single-agent fallback, return `BLOCKED` with the missing source input, access problem, failed lane, or scope risk.

## Review Rules

- Prefer high-confidence findings with concrete failure modes.
- Cite exact files, symbols, commands, or artifacts when possible.
- Keep optional improvements separate from blocking findings.
- Treat missing source inputs as `BLOCKED` unless the user supplied an equivalent source.
- Do not report `BLOCKED` solely because nested delegation is unavailable for a bounded workflow review; use parent-orchestrated lanes when lane results are supplied, otherwise use single-agent fallback with explicit residual risk.
- Escalate conflicting or ambiguous requirements, unauthorized dependencies, security policy uncertainty, external validation requirements, and scope expansion as `human-decision`.
- Do not require `review-toolkit`, `agentic-sdlc`, `codex exec`, Claude response files, Auggie-only agent files, GitHub inline comments, or Jira automation.
- Optional companion review skills may be used inside lanes when available, but the output contract remains this skill's review summary.
