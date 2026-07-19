# Worker Prompt Packets

Use these packet outlines when spawning host workers or when serializing the same work in the parent context. Packets are instructions for local agent work; they are not shell commands and do not require a terminal runner.

All packets must preserve the workflow boundaries:

- no commits,
- no branches,
- no pull requests,
- no pull request comments,
- no Jira updates,
- no pushes,
- no workflow transitions,
- no external workflow side effects.

## Implementation Worker Packet

Use one packet per implementation slice.

```markdown
Use `ai-workflow:implement-scope` in workflow mode.

Repository:

Feature root:

Slice path:

Selected explicit slice list recorded at:

Dependency status:

Write boundary:

Parallel safety:

Concurrency group:

Current dirty files relevant to this boundary:

Validation expected:

Instructions:
- Read the slice and parent execution plan.
- Confirm the slice path is in the recorded explicit slice list.
- Rediscover repo guardrails.
- Implement only this slice.
- Keep edits inside the write boundary.
- Write exactly one implementation summary under `.scratch/<feature-slug>/implementation/`.
- Leave changes uncommitted.
- Report status, changed files, validation evidence, risks, and summary path.
```

## Review Lane Worker Packet

Use one packet per enabled review lens when host support allows delegated or parent-orchestrated lanes.

```markdown
Use the review lens named below as a read-only evaluator.

Repository:

Feature root:

Lens:

Review target:

Source inputs:

Prior review inputs, if any:

Response and repair inputs, if any:

Instructions:
- Stay read-only.
- Inspect the supplied source inputs and current target.
- Produce findings using the normalized review finding schema.
- Preserve prior finding IDs during re-review.
- Record validation evidence and gaps.
- Do not edit files, commit, push, create branches, create pull requests, post comments, update Jira, or perform external workflow actions.
```

## Refactor Invocation Packet

Run refactor once after all implementation slices complete.

```markdown
Use `ai-workflow:refactor`.

Repository:

Feature root:

Refactor boundary:

Source inputs:

Implementation summaries:

Feature-level refactor summary path:

Validation expected:

Instructions:
- Refactor only inside the approved boundary.
- Preserve behavior.
- Do not run per-slice refactor passes.
- Write or return the required refactor summary.
- Leave changes uncommitted.
```

## Repair Invocation Packet

Run repair at most once and only after the response artifact is written.

```markdown
Use `ai-workflow:repair-findings`.

Repository:

Feature root:

Repair boundary:

Source review summary:

Response artifact:

Repair queue:

Cycle-specific repair summary path:

Validation expected:

Instructions:
- Consume the response artifact and its repair queue as repair inputs.
- Repair only `QUEUED_FOR_REPAIR`, automated-repair eligible findings inside the boundary.
- Keep repair single-pass and single-agent.
- Do not repair human-required, manual-only, optional, external, destructive, unauthorized, or out-of-boundary findings.
- Write the repair summary.
- Leave changes uncommitted.
```

## Summary Invocation Packet

Run summary after the workflow reaches a terminal state.

```markdown
Use `ai-workflow:summarize-changes`.

Repository:

Feature root:

Summary scope:

Change target:

Source artifacts:

Terminal state:

Run summary path:

Instructions:
- Produce the local engineer review handoff.
- Include implementation, refactor, review, response, repair, validation, unresolved findings, and human decision evidence.
- Do not create pull requests, post comments, update Jira, commit, push, or perform external workflow actions.
```
