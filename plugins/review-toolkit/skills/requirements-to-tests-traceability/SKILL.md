---
name: requirements-to-tests-traceability
description: "MUST invoke to review whether requirements, acceptance criteria, Jira expectations, or specs are verified by tests. Maps requirements to test cases, finds missing or weak verification, and reports a requirement-to-test matrix. Use test-coverage-review for diff coverage and orchestrated-review for bundled reviews."
---

# Requirements-to-Tests Traceability

Review whether the added or updated tests actually verify the required behavior.

This skill answers a different question from generic test coverage. It is not "did any test touch this code?" It is "can we point to executable tests that verify each stated requirement or acceptance criterion?"

## Prerequisites

This skill can run standalone from a diff, PR, Jira item, TDD, or requirements document.

## When to Use

- When the user wants to know whether the tests prove the feature meets the spec
- When requirements come from a phase spec, Jira ticket, acceptance criteria, PR description, or pasted requirements
- When you need a traceability matrix from requirements to tests
- When you want a separate validation lens alongside test-coverage-review

## Inputs

Collect or infer these inputs before reviewing:

1. **Review target** — staged changes, unstaged changes, `HEAD`, a commit/range, branch diff, or PR
2. **Code repo path** — repository containing the implementation and tests
3. **Requirements source** — phase spec, requirements doc, Jira key/link, external reference, PR description, or pasted acceptance criteria
4. **Optional context repo path** — if a saved artifact is desired

This skill requires some form of governing requirements source. If none exists, say so explicitly and stop rather than guessing.

## Where to Look for Requirements Sources

Governing requirement artifacts may be stored in a feature or scratch directory such as:

```text
<context-repo>/<jira-key>-<short-description>/
├── requirements/
├── design/
├── specs/
│   ├── 00-overview.md
│   ├── phase-N-*.md
│   └── tasks.md
└── reviews/
```

Most traceability work should anchor to:

- `requirements/*.md`
- `specs/phase-N-*.md`
- Jira item descriptions and acceptance criteria
- user-pasted requirements text

## Workflow

### 1. Scope the review target

- Identify the relevant diff and changed files.
- Capture the test files added or modified by the change.
- Read the surrounding implementation and test code needed to understand what behavior is being exercised.

### 2. Extract only the relevant requirements

- Read the governing requirements source and extract the acceptance criteria, user-visible behaviors, error paths, and constraints that apply to the changed code.
- Break compound requirements into individually traceable expectations.
- If the source is ambiguous, record the ambiguity in the report instead of inventing a requirement.

### 3. Map requirements to tests

For each requirement or acceptance criterion:

- identify the test file and test case that verifies it
- verify that the assertions are strong enough to fail if the requirement is broken
- note whether the requirement is covered directly, only indirectly, partially, or not at all

### 4. Check for weak verification

Look for these failure modes:

- tests that execute the code path but do not assert the required behavior
- tests that cover only the happy path while the requirement includes errors, boundaries, or authorization rules
- tests coupled to implementation details instead of observable behavior
- requirements represented only by comments or naming, not executable assertions
- acceptance criteria with no test mapping

### 5. Verify before reporting

- Anchor findings to specific requirement text and test code.
- Read enough surrounding code to confirm a missing mapping is not covered elsewhere.
- If a requirement is intentionally untested for a valid reason, note it as an assumption or limitation rather than a bug.

## Output Format

Structure the report like this:

```text
# Requirements-to-Tests Traceability: <feature or PR name>

**Date:** YYYY-MM-DD
**Review target:** staged changes / commit range / PR
**Code repo:** <repo-name> (branch: <branch>)
**Requirements source:** <doc path, Jira key, or pasted source description>

## Findings

1. [tests/path_or_source_ref:line] Severity: high
   <One or two concise sentences describing the missing or weak requirement verification and why it matters.>

2. [tests/path_or_source_ref:line] Severity: medium
   <Finding with requirement and test context.>

## Traceability Matrix

| Requirement / AC | Source | Tests | Status | Notes |
|------------------|--------|-------|--------|-------|
| User can archive a project | Jira AC-1 | `tests/test_projects.py::test_archive_project` | COVERED | Verifies success response and persisted state |
| Non-owner cannot archive a project | Jira AC-2 | None | MISSING | No authorization test found |
| Archived project is hidden from active list | phase-2-spec.md §2.4 | `tests/test_projects.py::test_list_projects_excludes_archived` | PARTIAL | No boundary case for stale cache |

## Unmapped Tests

- <Tests added that do not clearly trace to a stated requirement, if any>

## Open Questions / Assumptions

- <Question or assumption if needed>

## Summary

<One paragraph summarizing overall traceability health and the biggest gaps>
```

## Status Meanings

- `COVERED` — requirement is directly verified by one or more tests with meaningful assertions
- `PARTIAL` — requirement is only partly verified or lacks important branches/assertions
- `MISSING` — no meaningful test verifies the requirement
- `N/A` — requirement is out of scope for the reviewed change

## Severity Guidance

- **High** — a required behavior or acceptance criterion has no meaningful executable verification, or the test is so weak it would not catch a real regression
- **Medium** — requirement is partially covered, missing important branches, or verified only indirectly
- **Low** — minor traceability ambiguity or secondary branch gap

## Comment Rules

- High confidence only
- Maximum two sentences per finding
- No duplicate findings
- Focus on requirements relevant to the changed code
- Distinguish clearly between missing tests and ambiguous requirements

## Save the Review

If a context repo is available, save the report to:

```text
<context-repo>/<jira-key>-<short-description>/reviews/<feature>-requirements-to-tests-traceability-<date>.md
```

Otherwise present the review in chat only.

## Differentiation from Other Review Skills

| Skill | Primary question |
|-------|------------------|
| **requirements-to-tests-traceability** | Can each stated requirement be traced to meaningful executable tests |
| **test-coverage-review** | Do the changed tests cover the changed code paths and regression risk |

## Related Skills

- **test-coverage-review** — change-based test coverage analysis
- **orchestrated-review** — bundles this review with other review lenses
