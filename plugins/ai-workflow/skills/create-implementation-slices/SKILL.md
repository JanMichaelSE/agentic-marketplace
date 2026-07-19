---
name: create-implementation-slices
description: Convert `.scratch/<feature-slug>/execution-plan.md` into approved autonomous implementation slice files under `.scratch/<feature-slug>/slices/`.
---

# Create Implementation Slices

Turn an approved execution plan into bounded, dependency-ordered implementation slices.

Use this skill when the user wants to break `.scratch/<feature-slug>/execution-plan.md` into one or more implementation-ready slice files for a later implementation.

## Required Inputs

Before proposing slices, confirm or infer:

- Feature slug for `.scratch/<feature-slug>/`.
- The approved execution plan, preferably `.scratch/<feature-slug>/execution-plan.md`.
- Target repository guardrails and validation conventions from the current checkout.

If the feature slug is provided, prioritize `.scratch/<feature-slug>/execution-plan.md` as the source of truth. If that file is missing, ask for the intended execution plan source before writing slices.

## Approval Gate

Do not write slice files in the same response that first proposes the slice
breakdown. Approval of the execution plan is not approval of the slice set. Even
when the user asks to generate slices, first present the proposed breakdown and
stop; write files only after the user approves that displayed breakdown.

## Process

### 1. Read the Execution Plan

Read the execution plan fully, including implementation decisions, testing decisions, expected repo touchpoints, validation strategy, risks, guardrails, out-of-scope notes, and comments.

If the execution plan is not `Status: ready-for-slicing`, ask the user whether to proceed, revise the plan, or stop.

### 2. Inspect Repo Context

Inspect the target repository only as much as needed to derive realistic slice boundaries and validation expectations. Check repo instructions, README files, package or build scripts, nearby tests, and existing conventions where applicable.

Do not copy broad repo guardrail text into every slice. Use the slice `Guardrails` section for slice-specific constraints and tell the implement-scope skill to rediscover current repo guardrails during execution.

### 3. Handle Existing Slices

If `.scratch/<feature-slug>/slices/` already contains slice files, ask the user whether to:

- replace the existing slice set,
- revise selected slices,
- append after the current sequence,
- use a different feature slug, or
- abort.

Do not overwrite existing slice files without explicit approval.

### 4. Propose the Slice Breakdown

Present a numbered proposed breakdown before writing files. For each slice, include:

- **Title**: short implementation-focused name.
- **Execution mode**: `autonomous` or `needs-human`.
- **Blocked by**: explicit slice numbers or `None`.
- **Write boundary**: likely repo-relative files, directories, or artifact areas the slice may need to edit.
- **Parallel safety**: whether the slice can run alongside other slices and what conflicts would require serialization.
- **Concurrency group**: a stable grouping key for slices that should not run concurrently with each other.
- **What it delivers**: concise behavior or artifact outcome.
- **Validation**: focused commands or evidence expected.

Ask the user to approve the breakdown or request changes. Iterate until the user approves.

Valid approval examples include "approved", "write these slices", "looks good,
create them", or "proceed with this breakdown". The original request to generate
slices, approval of the execution plan, or approval of a different breakdown is
not sufficient.

### 5. Write Approved Slice Files

After approval in a later user message, write slice files under `.scratch/<feature-slug>/slices/` in dependency order using filenames like `01-<slice-slug>.md`.

Autonomous slices should include:

<template>

```markdown
Status: ready-for-implementation
Execution Mode: autonomous

## Parent

## What to build

## Acceptance Criteria

## Expected Repo Touchpoints

## Validation

## Guardrails

## Blocked By

## Write Boundary

## Parallel Safety

## Concurrency Group

## Implementation Notes

## Comments
```

</template>

For dependencies, `Blocked By` must reference explicit slice file paths, such as `.scratch/<feature-slug>/slices/01-foundation.md`. If no dependency exists, write `None - can start immediately`.

Use `Execution Mode: needs-human` for work that requires unresolved product decisions, access, credentials, manual review before implementation, or external coordination. Do not mark human-dependent work as autonomous.

## Slice Guidance

- Keep each slice narrow enough to implement and validate independently.
- Prefer vertical implementation slices over layer-only tasks when possible.
- Derive validation from the execution plan, current repo guardrails, and existing repo patterns.
- Include likely repo-relative touchpoints and a `Write Boundary`, but keep them as starting guidance for parallelization and ownership checks rather than a rigid file contract.
- Use `Parallel Safety` and `Concurrency Group` to make implementation fan-out conservative and auditable. If safe parallel execution is unclear, say so and choose a concurrency group that forces serialization.
- Make acceptance criteria observable and testable.
- Keep broad workflow, security, and repo rules out of duplicated slice boilerplate; point the implement-scope skill to rediscover current guardrails instead.
- Preserve the execution plan. Do not mutate it while writing slices.

## Handoff

After writing slices, summarize:

- the slice files created or updated,
- dependency order,
- any `needs-human` slices and why,
- validation expectations embedded in the slices,
- suggested next step, usually invoking `implement-scope` or the like.
