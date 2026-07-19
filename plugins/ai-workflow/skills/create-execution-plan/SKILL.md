---
name: create-execution-plan
description: Create `.scratch/<feature-slug>/execution-plan.md` from planning context using a repo-grounded execution plan template.
---

# Create Execution Plan

Turn planning context from any source into a repo-grounded execution plan at `.scratch/<feature-slug>/execution-plan.md`.

Use this skill when the user wants to move from a feature idea, ticket, PRD, design note, or planning conversation into a concrete implementation source of truth.
## Required Inputs

Before writing an execution plan, confirm or infer these inputs from the conversation and target checkout:

- Target repository name.
- Base branch or base context for the planned work.
- Feature slug for `.scratch/<feature-slug>/`.
- Planning source context, such as user conversation, PRD, issue, design notes, ticket text, or repo-local docs.

If the target repository or base branch/context is missing and cannot be safely inferred, ask the user before writing.

## Process

### 1. Gather Source Context

Read the supplied planning material and any repo-local source of truth the user references. If conversation context contributes to the plan, include `planning conversation` in the `Source Context` section.

If a referenced file, ticket, or document is unavailable, say what is missing and ask before writing if the missing source affects implementation decisions.

### 2. Inspect Repository Context

Inspect the target repository just enough to identify likely modules, tests, configuration, docs, conventions, and validation commands. Respect repo-local agent instructions and guardrails.

Record the target repository by name and the base branch/context, but do not write local absolute paths into the execution plan.

### 3. Stop on Implementation-Affecting Ambiguity

Do not create an `Open Questions` section. If unresolved questions affect implementation behavior, module boundaries, validation expectations, dependency policy, data contracts, rollout behavior, or safety constraints, stop and ask the user before writing.

If ambiguity is minor and does not affect implementation, make the assumption explicit in `Implementation Decisions`, `Testing Decisions`, `Risks and Guardrails`, or `Further Notes`.

### 4. Handle Existing Plans

If `.scratch/<feature-slug>/execution-plan.md` already exists, ask the user whether to:

- replace it,
- revise it,
- use a new feature slug, or
- abort.

Do not overwrite an existing execution plan without explicit approval.

### 5. Write the Execution Plan

Create `.scratch/<feature-slug>/` if needed and write `execution-plan.md` using the template below.

Expected repo touchpoints are repo-relative likely files, directories, modules, tests, configs, or docs to inspect or modify. They are starting guidance, not a rigid file contract.

<template>

```markdown
Status: ready-for-slicing

## Problem Statement

## Solution

## User Stories

## Implementation Decisions

## Testing Decisions

## Source Context

## Repository Context

## Expected Repo Touchpoints

## Validation Strategy

## Risks and Guardrails

## Out of Scope

## Further Notes

## Comments
```

</template>

## Execution Plan Guidance

- Keep the plan vendor neutral; do not reference a client's editing tools or runtime mechanics.
- Keep source citations concise and useful. Prefer repo-relative paths for local files.
- Include `planning conversation` in `Source Context` when conversation context contributed to the plan.
- Include the target repo name and base branch/context in `Repository Context`.
- Do not include local absolute paths in the generated plan.
- Keep `Expected Repo Touchpoints` scoped to likely implementation areas.
- Include validation commands or evidence expectations in `Validation Strategy`.
- Capture dependency restrictions, dirty-worktree caution, security boundaries, and repo guardrails in `Risks and Guardrails`.
- Leave `Comments` present for later history, even if it starts empty.

## Handoff

After writing the plan, summarize:

- the execution plan path,
- the target repo and base context used,
- any assumptions recorded in the plan,
- suggested next step, usually `create-implementation-slices`.
