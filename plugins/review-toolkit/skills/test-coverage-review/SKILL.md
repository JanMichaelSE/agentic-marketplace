---
name: test-coverage-review
description: "MUST invoke to review whether added or updated tests cover code changes in a diff. Checks new logic, branches, error paths, and regression risk, producing a change-to-test matrix. Use requirements-to-tests-traceability for acceptance-criteria mapping and orchestrated-review for bundled reviews."
---

# Test Coverage Review

Review whether the tests added or updated by the change meaningfully cover the changed code.

This skill is diff-centered, not requirements-centered. It answers: "If this code regresses, do the tests in this change have a good chance of catching it?"

## When to Use

- When the user wants to know whether the changed code is sufficiently exercised by tests
- When specs are missing but the diff still needs test-quality review
- When you want a separate lens focused on regression detection rather than requirement traceability
- When you need a change-to-test coverage matrix

## Inputs

Collect or infer these inputs before reviewing:

1. **Review target** — staged changes, unstaged changes, `HEAD`, a commit/range, branch diff, or PR
2. **Code repo path** — repository containing production code and tests
3. **Optional commands or tooling context** — project test command, coverage tool, or CI notes if available
4. **Optional context repo path** — if a saved artifact is desired

No governing requirements source is required.

## Workflow

### 1. Scope the diff

- Identify changed production files and changed test files.
- Group the change by module, endpoint, service, data layer, UI component, or other logical unit.
- Note where the diff adds new branches, error handling, boundary checks, authorization logic, parsing, or state transitions.

### 2. Map changed code to tests

For each changed production area:

- search for existing tests that target the same method, class, module, endpoint, or component, even if those tests were not modified in the current diff
- identify the tests that directly exercise it
- capture the repository-relative test file path and, when practical, the specific test name or block that covers it
- check whether the changed behavior is asserted, not just executed
- note whether coverage is direct, indirect, partial, or missing
- if no relevant tests exist, state that explicitly instead of leaving the location implied

### 3. Review for common coverage gaps

Look for:

- new or changed logic with no updated tests
- error paths introduced without failure-case tests
- branch conditions changed but only one branch tested
- bug fixes without regression tests
- endpoint or service changes covered only by mocks, not observable behavior
- tests that touch the code but would still pass if the change regressed

### 4. Use cheap verification when it materially reduces uncertainty

- Run targeted tests or lightweight coverage commands when they are easy and reliable in the repo
- Prefer narrow commands over full-suite runs unless the suite is fast
- If no command is run, make that explicit in the report

### 5. Verify before reporting

- Anchor findings to changed code and relevant tests.
- Read enough surrounding implementation and test code to avoid false positives.
- If coverage exists elsewhere outside the changed test files, count it when it clearly verifies the changed behavior.
- Prefer naming the existing test file locations in the matrix even when coverage is only partial.

## Output Format

Structure the report like this:

```text
# Test Coverage Review: <feature or PR name>

**Date:** YYYY-MM-DD
**Review target:** staged changes / commit range / PR
**Code repo:** <repo-name> (branch: <branch>)
**Verification run:** <targeted tests or "not run">

## Findings

1. [src/path.ext:line] Severity: high
   <One or two concise sentences describing the uncovered or weakly covered changed logic and why a regression could slip through.>

2. [src/path.ext:line] Severity: medium
   <Finding with changed-code and test context.>

## Change Coverage Matrix

| Area Changed | Existing Tests / Locations | Coverage | Notes |
|--------------|----------------------------|----------|-------|
| `services/archive.py::archive_project` | `tests/test_archive.py::test_archive_project` | PARTIAL | Existing test location identified; success path covered, but permission failure case is not asserted |
| `api/projects.py` `DELETE /projects/{id}` | None found | MISSING | No relevant API or service tests were located for this changed behavior |
| `ui/project-list.tsx` archive banner logic | `ui/__tests__/ProjectList.test.tsx::shows_archive_banner` | COVERED | Existing test location identified; verifies visible state and dismissal behavior |

## Risk Hotspots

- <Changed areas with the highest regression risk because of weak or missing coverage>

## Open Questions / Assumptions

- <Question or assumption if needed>

## Summary

<One paragraph summarizing overall change coverage quality and major gaps>
```

For the `Existing Tests / Locations` column:

- list the most relevant repository-relative test file path(s)
- include the closest specific test name, suite, or block when practical
- use `None found` when no relevant tests were located for that method, class, module, endpoint, or component

## Coverage Status Meanings

- `COVERED` — changed logic is meaningfully exercised and asserted
- `PARTIAL` — some changed paths are exercised, but important branches or assertions are missing
- `MISSING` — no meaningful test coverage found for the changed behavior, or no relevant existing tests were located

## Severity Guidance

- **High** — changed logic, bug fix, auth/data path, or failure branch lacks meaningful regression coverage
- **Medium** — coverage exists but misses important branches, assertions, or edge conditions
- **Low** — minor coverage gap with limited regression risk

## Comment Rules

- High confidence only
- Maximum two sentences per finding
- No duplicate findings
- Focus on changed code and the tests that should catch regressions there
- Prefer concrete regression scenarios over abstract statements about "low coverage"

## Save the Review

If a context repo is available, save the report to:

```text
<context-repo>/<jira-key>-<short-description>/reviews/<feature>-test-coverage-review-<date>.md
```

Otherwise present the review in chat only.

## Differentiation from Other Review Skills

| Skill | Primary question |
|-------|------------------|
| **test-coverage-review** | Do the changed tests meaningfully cover the changed code and likely regression paths |
| **requirements-to-tests-traceability** | Do the tests map to the stated requirements or acceptance criteria |

## Related Skills

- **requirements-to-tests-traceability** — requirement-to-test mapping
- **orchestrated-review** — bundles this review with other review lenses
