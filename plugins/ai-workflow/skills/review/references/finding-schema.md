# Finding Schema

Use one normalized block per finding. The block must be repair-ready: a later automated repair pass should know what to change, where to look, and how to validate the fix without translating broad prose into a task.

## Required Fields

- `ID`: stable ID such as `REV-<scope>-001`. Preserve existing IDs during re-review.
- `Title`: short action-oriented summary.
- `Severity`: `critical`, `high`, `medium`, `low`, or `info`.
- `Disposition`: `required-fix`, `validation-gap`, `human-decision`, `optional-improvement`, or `info`.
- `Repairability`: `automated-repair`, `needs-human`, `manual-only`, or `not-applicable`.
- `Lens`: `Standards` or `Spec`, the independent review axis that found the issue.
- `Status`: `new` for first review, or a prior-finding status during re-review.
- `Evidence`: exact file, symbol, diff area, artifact, command output, or source input that proves the issue.
- `Failure Mode`: concrete way the issue can fail, mislead, regress, or block confidence.
- `Required Change`: specific change needed for blocking or repairable findings.
- `Validation Expectation`: focused command, check, or artifact inspection expected after repair.
- `Human Decision Needed`: decision question, owner, or authorization required, or `None`.
- `Notes`: optional context, assumptions, or links to related findings.

## Disposition Rules

- Use `required-fix` for concrete standards breaches, contract breaks, incomplete implementation, security problems that can be repaired in repo, and specification violations that block the workflow.
- Use `validation-gap` when the implementation may be correct but evidence is missing, weak, failed, or not targeted to the changed behavior.
- Use `human-decision` for product, architecture, dependency, security-policy, external-access, rollout, or scope choices.
- Use `optional-improvement` for low-risk maintainability or clarity issues that should not block the phase.
- Use `info` for relevant but non-actionable observations.

## Repairability Rules

- Use `automated-repair` only when the issue is concrete enough for a later automated repair pass.
- Use `needs-human` when the next step is a decision, authorization, or clarification.
- Use `manual-only` when the work requires external systems, credentials, destructive operations, PR/Jira actions, or other non-repo workflow steps.
- Use `not-applicable` for `info` findings.

## Example Finding Block

```markdown
### REV-slice-001: Missing validation for rejected input

- Severity: medium
- Disposition: validation-gap
- Repairability: automated-repair
- Lens: Spec
- Status: new
- Evidence: `src/order_validator.py` adds a rejected-input branch; no test covers that branch.
- Failure Mode: A regression could accept invalid input without any changed test failing.
- Required Change: Add a focused regression test for the rejected-input branch.
- Validation Expectation: Run the targeted validator test file and `git diff --check`.
- Human Decision Needed: None
- Notes: Keep assertions behavior-focused.
```
