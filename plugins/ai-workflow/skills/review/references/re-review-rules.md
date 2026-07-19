# Re-Review Rules

Use these rules when a previous review summary, repair summary, or human disposition is supplied. Re-review is state evaluation only; the review skill still does not edit files, commit, push, update Jira, or post PR comments.

## Prior Finding Statuses

- `resolved`: current evidence shows the required change was made and expected validation is present or no longer applicable.
- `still-failing`: the original issue remains, the fix is incomplete, or validation still does not prove the repair.
- `accepted-by-human`: a human explicitly accepted the risk, scope choice, or product behavior.
- `disputed`: current evidence conflicts with the prior finding, and resolution requires human judgment or better source input.
- `superseded`: the original issue no longer applies because the implementation changed shape; link to any replacement finding.

## ID Preservation

- Preserve the original finding ID when evaluating a prior finding.
- Do not renumber prior findings.
- If a repair creates a new issue, create a new ID.
- If a prior finding splits into multiple issues, keep the original ID for the closest surviving issue and assign new IDs to additional issues.
- If a finding is superseded, record the replacement ID in the justification.

## Severity-Based Justification

- Critical or high security findings cannot be auto-accepted. They require clear current evidence of resolution or an explicit human security/policy decision.
- High functional, data-integrity, or contract findings require concrete governing-doc evidence or explicit human decision evidence before being marked `accepted-by-human`.
- Medium findings may be accepted only with specific rationale tied to the execution plan, slice, implementation summary, review target, or explicit human instruction.
- Low findings may be downgraded to `optional-improvement` when the risk is localized, non-blocking, and documented.
- Validation gaps can be resolved only by targeted validation evidence, a documented reason the validation no longer applies, or a human decision that accepts the residual risk.

## Human Escalation Triggers

Escalate as `human-decision` when re-review encounters:

- Conflicting or ambiguous requirements.
- Architecture tradeoffs not resolved in the execution plan.
- Dependency additions or external service use not authorized by source inputs.
- Security policy, data-handling, or credential ambiguity.
- Validation that requires unavailable credentials, infrastructure, or destructive operations.
- Scope expansion beyond the approved slice or explicit review target.
- Rollout, migration, or operational-risk choices automation should not decide.

## Re-Review Output

Record a re-review table with the prior finding ID, status, current evidence, and justification. Include unresolved or new blocking findings in the repair queue or human decision queue according to the finding schema.
