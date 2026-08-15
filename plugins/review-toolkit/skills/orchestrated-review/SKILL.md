---
name: orchestrated-review
description: "MUST invoke for full-suite, combined, bundled, or multi-lens code reviews. Runs security-review, design-principles-review, requirements-to-tests-traceability, test-coverage-review, and test-correctness-review as applicable, preserving each output in one wrapper. Do not use for a single review lens, review-cycle automation, or GitHub inline comments."
---

# Orchestrated Review

Run a structured review bundle across the available review skills and present the results together.

This skill is a thin orchestration layer. It does not replace the underlying review skills and it must not rewrite their findings. Its job is to:

1. determine the review target and available governing-context references
2. run the appropriate review skills
3. present each review's output in a clean, labeled structure
4. add only lightweight wrapper metadata and a cross-review index

The orchestrator may identify governing-context references and pass them to `requirements-to-tests-traceability`, but it must not open, fetch, download, or read spec or context documents itself. This applies to both repo-local files and external documents. External context is optional, not required.

## Prerequisites — Mandatory Verification

**Before running any sub-reviews**, verify that the following skills are available in the current session:

- `security-review` (from this plugin)
- `design-principles-review` (from this plugin)
- `requirements-to-tests-traceability` (from this plugin)
- `test-coverage-review` (from this plugin)
- `test-correctness-review` (from this plugin)

If any of these skills are not available, **stop immediately** and identify the missing skill. Do not attempt a partial review until all prerequisites are available.

Only continue past this check if the bundled review skills are confirmed available in the current session.

## Reviews Included

- `security-review`
- `design-principles-review`
- `requirements-to-tests-traceability`
- `test-coverage-review`
- `test-correctness-review`

## Core Rule

Preserve each sub-review's output exactly as produced.

Do not:

- rewrite findings
- normalize severity wording
- merge duplicate findings inside the review sections
- compress one skill's verdict into another skill's format

You may add wrapper headings and a cross-review index outside the preserved review bodies.

## Report Navigation and Findings Summary

Every saved orchestrated review report must start with navigation and a findings summary before the detailed review sections:

1. Add a `## Table of Contents` immediately after the metadata block.
2. Add a `## Findings Summary` immediately after the table of contents.
3. In `Findings Summary`, include one row for every actionable finding that needs attention across all sub-review outputs.
4. Each summary row must include:
   - `Severity`
   - `Reason`
   - `Type`
   - `Detail`
   - `Status`
5. `Detail` must link to the review section or finding heading where the issue is called out in detail.
6. `Status` must be `PENDING` by default. Use `COMPLETED` only when the sub-review output or current review context explicitly says the finding has already been addressed.
7. If there are no actionable findings, write one row stating `No actionable findings` and use `COMPLETED` for status.

Do not rewrite preserved review bodies to support the summary table. If a stable per-finding heading anchor is not available, link to the containing review section.

## When to Use

- When the user wants one entry point for a full code review
- When the repository may have full specs, only Jira, or no formal governing docs
- When the user wants separate review lenses preserved side by side
- When the user wants a structured review packet without GitHub comment side effects

## Inputs

Collect or infer these inputs before reviewing:

1. **Review target** — staged changes, unstaged changes, commit/range, branch diff, or PR
2. **Code repo path** — repository containing the changes
3. **Optional governing context** — phase spec, TDD, requirements doc, external document link/reference, Jira key/link, PR description, or pasted acceptance criteria
4. **Optional context repo path** — if review artifacts should be saved

## Where to Look for Governing Docs

Look for governing documents in repository documentation, issue-tracker records, technical design documents, or user-provided material. A repository may organize local artifacts like this:

```text
<context-repo>/<jira-key>-<short-description>/
├── requirements/
├── design/
│   └── <feature>-tdd.md
├── specs/
│   ├── 00-overview.md
│   ├── phase-N-*.md
│   └── tasks.md
└── reviews/
```

When these files exist, treat their paths as governing-context references to pass into `requirements-to-tests-traceability`. The orchestrator may discover these files by path or filename, but it must not read their contents.

## Governing Context Rules

Establish the best available governing-context reference in this order:

1. phase spec or requirements document
2. technical design document
3. external document link/reference provided by the user
4. Jira item with description and acceptance criteria
5. PR description or user-pasted requirements

Use that source for `requirements-to-tests-traceability`.

If the governing context is an external link or reference, pass it through to `requirements-to-tests-traceability` as user-provided context. Do not open it, download it, or summarize it in the orchestrator.

If no governing context exists at all:

- **skip `requirements-to-tests-traceability`**
- state clearly that it was skipped because no requirements source was available
- still run `security-review`, `design-principles-review`, `test-coverage-review`, and `test-correctness-review`

## Execution Mode

The orchestrator always uses the sub-agent approach. It is coordination-only and must not run any of the review lenses inline.

Use at most one sub-agent per review skill:

- `security-review`
- `design-principles-review`
- `requirements-to-tests-traceability`
- `test-coverage-review`
- `test-correctness-review`

Execution requirements:

1. Always delegate each enabled review lens to its own sub-agent.
   - If governing context exists, launch a `requirements-to-tests-traceability` sub-agent.
   - Always launch `security-review`, `design-principles-review`, `test-coverage-review`, and `test-correctness-review` sub-agents.
2. Do not mix orchestration with reviewing.
   - The orchestrator must not conduct review analysis, inspect diffs to form findings, pre-screen issues, or produce review conclusions of its own.
   - Every populated review section must come directly from the corresponding sub-agent output, except for an explicit `SKIPPED` note when a review was not run.
3. Preserve output boundaries.
   - Preserve each review's output exactly as produced and present it in the wrapper without rewriting.
4. Fail closed if clean delegation is not possible.
   - If the orchestrator cannot delegate a required review lens cleanly, it should stop and report the delegation problem instead of falling back to inline review.

## Workflow

### 1. Determine the review target

- Resolve whether the review is against staged changes, local diff, commit range, or PR
- When the user asks to review local changes without narrowing the target, use `git diff HEAD` so staged and unstaged changes are reviewed together.
- Capture changed files early
- Record the code repo path and current branch if relevant

### 2. Identify the best available governing-context references

- Look for repo-local specs, TDDs, and requirements files by path and filename only
- When the repository has a feature or scratch directory, check for requirements, design, specifications, and task artifacts by path or filename, but do not read them in the orchestrator
- If the user provided an external document link or reference, record it as an available governing input without resolving it in the orchestrator
- If the user provided a Jira key or link, record it as the governing reference when no better governing doc reference exists
- If only a PR description or pasted acceptance criteria exist, use them as the governing context for `requirements-to-tests-traceability`
- Explicitly note which governing references were forwarded and which were missing

### 3. Run the sub-reviews

Use one sub-agent per review skill that will run. The orchestrator must stop at delegation and assembly. It must not conduct any of the review analysis itself. Every populated review section must come from the corresponding sub-agent output, except for an explicit `SKIPPED` note when a review was not run.

Then run the reviews in this order:

1. `requirements-to-tests-traceability` if governing context exists
2. `security-review`
3. `design-principles-review`
4. `test-coverage-review`
5. `test-correctness-review`

Each sub-review should follow its own skill instructions and produce its own complete output.

When invoking any sub-review skill, instruct the sub-agent to return its complete final review body directly in the agent response and to not save any standalone review artifact file. The orchestrator is the only writer in this workflow.

When invoking `requirements-to-tests-traceability`, pass along the chosen governing context exactly as a path, pasted text, key, link, or external reference. Do not pre-read any spec or context documents inside this skill.

### 4. Build and save the wrapper report

Build the wrapper report with:

- review target metadata
- a table of contents at the top
- a findings summary table immediately after the table of contents
- governing references forwarded to `requirements-to-tests-traceability`
- one section per review
- a cross-review index at the end

Then save that wrapper report as a markdown file in the default review-output location.

- This is the default behavior
- Do not print the full wrapper report in chat
- In chat, return only a short status note with the saved file path
- If a context repo exists, default to saving the wrapper report there
- If no context repo exists, save it in the root of the currently opened code repository
- Use a stable, descriptive filename such as:

```text
<default-output-root>/orchestrated-review-<target-or-branch>-<date>.md
```

- Sanitize the branch portion for filesystem safety
- If a file with that name already exists, append a short suffix to avoid overwriting unless the user explicitly asked to replace it


## Output Format

Use this wrapper structure for the saved markdown file:

```text
# Orchestrated Review: <feature, branch, or PR name>

**Date:** YYYY-MM-DD
**Review target:** <target>
**Code repo:** <repo-name> (branch: <branch>)
**Governing inputs:** <list references that were forwarded, or "none">
**Reviews run:** requirements-to-tests-traceability | security-review | design-principles-review | test-coverage-review | test-correctness-review

## Table of Contents

- [Findings Summary](#findings-summary)
- [Requirements-to-Tests Traceability](#requirements-to-tests-traceability)
- [Security Review](#security-review)
- [Design Principles Review](#design-principles-review)
- [Test Coverage Review](#test-coverage-review)
- [Test Correctness Review](#test-correctness-review)
- [Cross-Review Index](#cross-review-index)
- [Shared Themes](#shared-themes)
- [Gaps / Limitations](#gaps--limitations)

## Findings Summary

| Severity | Reason | Type | Detail | Status |
|----------|--------|------|--------|--------|
| Critical/High/Medium/Low/Info | Concise reason this needs attention | Bug/Security/Design/Test Coverage/Test Correctness/Traceability/Other | [Review section or finding heading](#anchor) | PENDING/COMPLETED |

## Requirements-to-Tests Traceability

<paste the exact requirements-to-tests-traceability output, or a SKIPPED note if no governing context existed>

## Security Review

<paste the exact security-review output>

## Design Principles Review

<paste the exact design-principles-review output>

## Test Coverage Review

<paste the exact test-coverage-review output>

## Test Correctness Review

<paste the exact test-correctness-review output>

## Cross-Review Index

| Review | Ran | High-level result | Notes |
|--------|-----|-------------------|-------|
| Requirements-to-Tests Traceability | Yes/No | Findings / No findings / Skipped | Governing doc used or skip reason |
| Security Review | Yes | PASS / FAIL / Findings | Main security posture summary |
| Design Principles Review | Yes | Findings / No findings | Main structural posture summary |
| Test Coverage Review | Yes | Findings / No findings | Main change-coverage posture summary |
| Test Correctness Review | Yes | Findings / No findings | Main test-validity posture summary |

## Shared Themes

- <Only cross-review observations. Do not restate or rewrite individual findings.>

## Gaps / Limitations

- <Missing docs, skipped requirements traceability, unavailable Jira details, or other scope limits>
```

## Preservation Rules

- Keep each underlying review body intact
- Do not de-duplicate inside the preserved review sections
- If the same issue appears in multiple reviews, mention that only in `Shared Themes`
- If a sub-review has zero findings, preserve that outcome as-is

## External Context Handling

- External governing documents are allowed but optional
- Examples include Confluence pages, Google Docs, shared design docs, tickets in other systems, or other user-provided references
- The orchestrator may record and forward these references to `requirements-to-tests-traceability`
- The orchestrator must not open, fetch, download, parse, or summarize spec or context documents itself
- If no external context is provided, continue by forwarding repo-local doc paths, Jira references, PR text, or pasted requirements when available

## Save Artifacts

Always save the final orchestrated wrapper report to a markdown file in the default output location.

- do not save standalone per-review sub-agent artifacts; collect those review bodies from sub-agent responses and write only the final orchestrated wrapper report
- if a context repo exists, save the wrapper report there by default
- if no context repo exists, save the wrapper report to the code repo root
- do not present the full wrapper bundle in chat by default
- in chat, provide only:
  - whether the report was saved successfully
  - the exact saved file path
  - any important limitation such as skipped requirements traceability

Example wrapper output paths:

```text
<context-repo>/orchestrated-review-<target-or-branch>-<date>.md
<code-repo>/orchestrated-review-<target-or-branch>-<date>.md
```

## Related Skills

- **security-review** — vulnerability review
- **requirements-to-tests-traceability** — maps requirements to executable tests
- **test-coverage-review** — verifies tests cover the changed code
- **test-correctness-review** — verifies tests actually prove what they claim to test
- **design-principles-review** — SOLID and structure review
