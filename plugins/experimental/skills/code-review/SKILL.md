---
name: code-review
description: Review a diff from a fixed point through independent Standards and Spec lenses. Use when a user asks to review a branch, PR, work-in-progress changes, or changes since a commit, branch, tag, or merge-base.
---

# Two-Axis Code Review

Review the diff between `HEAD` and a user-supplied fixed point through two
independent lenses:

- **Standards** — does the change follow repository guidance and the baseline
  code-smell heuristics?
- **Spec** — does the change implement its governing specification without
  omissions, incorrect behavior, or scope creep?

Keep the lenses separate. A change may pass one and fail the other, so never
merge, re-rank, or choose a single winner across their findings.

## Process

### 1. Establish the review target

Require a fixed point: a commit, branch, tag, merge-base, or equivalent. If it
is missing, ask for it. Safely confirm it resolves, capture the three-dot diff
against `HEAD`, list the included commits, and stop if the diff is empty.

Read the changed files and only the nearby context needed to understand the
change. Do not create branches, commits, comments, tracker updates, or external
writes as part of a review.

### 2. Discover the spec without guessing

Use this order and stop as soon as a governing source is found:

1. A path, pasted acceptance criteria, or issue content the user explicitly
   supplied.
2. Repository-local requirements, PRDs, specifications, plans, or phase
   artifacts under `docs/`, `specs/`, or `.scratch/` that match the reviewed
   feature.
3. An already-existing user-maintained reference in the selected commits, only
   when it identifies the exact governing source and gives an explicit,
   safe, read-only way to access it locally. Do not create or configure a
   reference, infer a path, identifier, URL, field, or remote tool, or contact
   an external service.

If no source is available, ask the user for one. If the user confirms that no
spec exists, skip the Spec lens and report `No spec available`; do not invent
requirements from the implementation.

### 3. Discover standards and establish the baseline

Read applicable repository guidance first: `AGENTS.md`, `CLAUDE.md`,
`CONTRIBUTING.md`, coding-standard files, formatter or linter configuration,
and local guidance for the changed area. Cite the source and rule for every
documented-standard finding.

When local standards are absent, the Standards lens still runs against this
**baseline**. These are labelled heuristics, not hard violations, and findings
must use `possible <smell>` wording. Repository guidance overrides the baseline
when it deliberately endorses a pattern. Skip issues enforced by existing
tooling and report only evidence in the reviewed diff.

| Possible smell | Heuristic and direction |
|---|---|
| Mysterious Name | A name hides purpose; use an honest, descriptive name. |
| Duplicated Code | Repeated changed logic may need one shared shape. |
| Feature Envy | Logic reaches into another object's data more than its own. |
| Data Clumps | Fields or parameters repeatedly travel together. |
| Primitive Obsession | A primitive stands in for a meaningful domain concept. |
| Repeated Switches | The same type dispatch recurs across the change. |
| Shotgun Surgery | One logical change scatters across unrelated modules. |
| Divergent Change | One module changes for unrelated reasons. |
| Speculative Generality | Abstraction exceeds the governing need. |
| Message Chains | Callers navigate a long object chain. |
| Middle Man | A layer mostly delegates without adding value. |
| Refused Bequest | Inheritance is largely ignored or overridden. |

### 4. Review the axes independently

If the environment supports isolated parallel review, run the two lenses in
parallel with separate context. Otherwise run them sequentially without sharing
intermediate findings between prompts. Each report is concise (under 400 words)
and evidence-based.

**Standards brief**

- Include the review target, commit list, changed hunks, applicable guidance,
  and the full baseline table above.
- Report documented-standard breaches with the guidance path, rule, and
  file/hunk evidence. Report baseline concerns as `possible <smell>` judgement
  calls with the relevant hunk.
- Distinguish documented violations from baseline heuristics, honor repository
  overrides, and skip matters enforced by tooling.

**Spec brief**

- Include the review target, commit list, changed hunks, and the selected spec
  source.
- Report missing or partial requirements, unrequested behavior, and apparently
  implemented requirements whose behavior is incorrect. Cite the relevant spec
  text and file/hunk evidence for each finding.
- Do not report if the Spec lens was skipped because no governing source exists.

### 5. Report without blending results

Use this structure. Preserve the two axes even when one has no findings:

```markdown
## Standards

- [hard violation | possible smell] `path:line` — evidence; guidance source or
  baseline name.

## Spec

- `path:line` — evidence; quoted or linked governing requirement.

## Summary

Standards: <count> findings; worst: <worst within Standards or none>. Spec:
<count> findings (or `No spec available`); worst: <worst within Spec or none>.
```

Do not duplicate a finding across axes, combine severity, or imply that this
experimental skill changes or replaces the stable review toolkit.