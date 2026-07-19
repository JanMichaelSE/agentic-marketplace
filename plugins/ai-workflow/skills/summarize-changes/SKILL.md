---
name: summarize-changes
description: Creates a concise, audience-tailored change summary handoff with standard PR-overview sections, repo visuals, before/after behavior diagrams, and representative code snippets. Use when user wants a change summary, PR overview, PR summary doc, branch summary, or a standardized handoff generated from workflow artifacts, a PRD, diff, or feature branch.
---

# Summarize Changes

Create or update a standardized change summary handoff using the canonical PR-overview format in this skill: concise, visual, and easy to skim.

Always tailor the overview to the intended audience before drafting. Ask one question at a time when audience, depth, or output target is unclear.

## Quick start

1. Confirm audience and output target if not already explicit.
2. Compare the branch against the correct base branch and inspect the real implementation.
3. Write or update the overview using the standard outline in [REFERENCE.md](./REFERENCE.md).

## Workflow

### 1. Gather the real implementation context

- Read the PRD or planning doc the user points to, if any.
- Inspect the actual diff against the correct base branch.
- Prefer the implementation delta over plan-only language.
- Filter out unrelated branch-support or baseline-drift files from the main narrative.

### 2. Tailor to the audience

If the user did not already specify the audience, ask one question at a time. Recommended first question: who is this overview for?

Common audience options:

- Tech lead / manager — default and recommended
- PR reviewers / engineers
- Cross-team consumers
- Operations / support

Then clarify only what is still missing, one-by-one:

- Should the doc stay concise or include more technical detail?
- Should it include representative code snippets?
- Should it target `PR_OVERVIEW.md` or another output path?

Do not assume an existing `PR_OVERVIEW.md` is present. Generate the document from the current request, diff, and codebase context.

If the answer can be inferred from the repo or request, do not ask.

### 3. Use the standard format

Follow the canonical section order in [REFERENCE.md](./REFERENCE.md). Keep the document concise and easy to skim.

The overview should usually include:

- Table of Contents
- Scope
- Why the changes are needed
- High-level behavior (Before / After)
- Repo shape before vs after
- Rendered modified structure
- Zoom-in on important technical details
- Reviewer checklist / attention points

### 4. Visual rules

- Prefer simple Mermaid flowcharts for high-level behavior.
- Keep Mermaid syntax conservative and GitHub-friendly.
- Always add a short text explanation below each visual.
- If Mermaid becomes fragile, simplify the chart rather than making it clever.

### 5. Snippet rules

- In the Zoom-in section, include small representative code snippets for the most important changes.
- Use snippets to show the shape of the implementation, not entire functions.
- Prefer one or two excerpts per subsection.
- Keep the snippets easy to review quickly.

### 6. Final check

Before finishing, verify:

- the audience is clear
- the base-branch comparison is correct
- the visuals render simply
- the changed-file tree matches the actual implementation
- the technical details are backed by the code, not just the PRD
- the output stays concise
