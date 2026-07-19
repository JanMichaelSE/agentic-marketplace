# PR Overview Reference

Use this outline by default unless the user asks for a different shape.

## Standard outline

1. `# PR Overview — <feature name>`
2. `## Table of Contents`
3. `## Scope`
4. `## Why these changes are needed`
5. `## High-level behavior`
   - `### Before`
   - `### After`
6. `## Repo shape: before vs after`
7. `## Rendered modified structure`
8. `## Zoom-in: important technical details`
9. `## What reviewers should pay attention to`

## High-level behavior guidance

The visual should answer:

- what the flow looked like before
- what changed after the PR
- which path stayed unchanged
- which path is new
- what remains explicitly out of scope

### Mermaid guidance

Prefer simple flowcharts only. Avoid fragile syntax when possible:

- avoid HTML in node labels
- avoid complex styling directives unless already known to render
- avoid clever multiline decision nodes
- avoid placeholder-heavy labels inside the chart
- avoid complex edge labeling if simple arrows are enough

If the chart fails to render, simplify it immediately.

## Repo visuals guidance

Use two views:

### Before / After repo shape

Show only the key directories relevant to the feature.

### Rendered modified structure

Use a compact tree with markers such as:

- `+` added
- `~` modified

Keep noise out of this tree.

## Zoom-in section guidance

Each subsection should explain one important technical change in plain language, then show a small representative snippet.

Good candidates for subsections:

- derived metadata or configuration
- new infrastructure resources
- routing or policy changes
- core classification/business logic
- CLI or helper behavior changes
- tests that lock in the new behavior

## Snippet guidance

- Keep snippets short and high-signal.
- Prefer excerpts that show interfaces, resource shapes, conditions, or key return values.
- Do not paste entire files.
- Use real code from the branch, not invented examples.

## Audience tailoring guidance

When interviewing the user, ask one question at a time.

Recommended order:

1. Who is the audience?
2. How technical should the overview be?
3. Should code snippets be included?
4. What output path or filename should be used?

Default recommendation when unspecified: optimize for a tech lead or manager who wants a concise but technically credible summary.
