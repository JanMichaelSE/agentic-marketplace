---
name: test-correctness-review
description: "MUST invoke to review whether tests are valid, correctly implemented, and prove the behavior they claim. Checks setup, execution, mocks, and assertions for false-confidence risks. Use test-coverage-review for changed-code coverage and requirements-to-tests-traceability for requirement mapping."
---

# Test Correctness Review

Review whether the tests themselves are honest, strong, and correctly implemented.

This skill is not about "is there enough test coverage?" and it is not about "does every requirement have a test?" It answers a narrower question:

"If this test says it verifies behavior X, does its setup, execution path, and assertions actually prove behavior X?"

## When to Use

- When the user wants to know whether added or updated tests are implemented correctly
- When the user suspects a test may pass for the wrong reason
- When the user asks whether assertions are strong enough to prove the named behavior
- When the user wants a review focused on false confidence in tests rather than coverage or traceability

## Inputs

Collect or infer these inputs before reviewing:

1. **Review target** — staged changes, unstaged changes, `HEAD`, a commit/range, branch diff, PR, or specific test files
2. **Code repo path** — repository containing the tests and nearby implementation
3. **Optional context** — PR description, bug report, acceptance criteria, or user explanation of the intended behavior
4. **Optional context repo path** — if a saved artifact is desired

No formal requirements document is required.

## Workflow

### 1. Scope the tests under review

- Identify added or updated test files in the review target.
- If the user named specific tests, focus on those even if they were not changed in the diff.
- Read the nearby production code, fixtures, mocks, helpers, and test utilities needed to understand the test mechanics.

### 2. Derive each test's claimed intent

For each important added or changed test:

- infer the claimed behavior from the test name, suite name, comments, docstring, or surrounding PR text
- restate that claim in concrete terms before judging the test
- note ambiguity explicitly instead of guessing what the author intended

### 3. Check whether the test actually reaches the intended behavior

Look for:

- setup data that never reaches the branch or condition named by the test
- fixtures or mocks that short-circuit the interesting behavior before it is exercised
- tests that patch the very method or helper they are supposed to validate
- parameterized cases that look distinct but all drive the same code path
- negative-path tests whose arrange step cannot actually trigger the failure being claimed

### 4. Check whether the assertions truly prove the claim

Look for:

- assertions that only confirm setup, mock wiring, or call counts rather than the claimed behavior
- assertions broad enough that several incorrect implementations would still pass
- expected values produced by the same helper, algorithm, or transformation as the implementation under test
- tests named for one behavior but asserting a different side effect
- assertions on internal implementation details when observable behavior is the real contract
- tests that execute the code path but do not assert the critical outcome
- tests that would still pass under the most plausible regression of the behavior they claim to guard

### 5. Check for false-confidence patterns

Look for:

- missing `await`, swallowed exceptions, or assertions that never run
- exception tests that only assert type while ignoring message, state, or side effects when those details matter
- over-mocked tests that prove the mock contract, not the real behavior
- snapshot or golden assertions that do not pin the specific claimed behavior
- order dependence, shared mutable state, or global state leakage that makes the result misleading
- time, retry, async, or concurrency tests that are nondeterministic or not properly controlled

### 6. Use cheap verification when it reduces uncertainty

- Run targeted tests when they are easy and reliable in the repo.
- Prefer narrow commands over full-suite runs.
- If no command is run, make that explicit in the report.
- Do not mutate production code just to force a failure unless the user explicitly asks for that style of validation.

### 7. Verify before reporting

- Anchor findings to specific test code and, when needed, the implementation it exercises.
- Read enough surrounding code to confirm the test is misleading or weak for the stated reason.
- If a test is unusual but defensible, leave it alone or downgrade it to an open question.


## Output Format

Structure the report like this:

```text
# Test Correctness Review: <feature or PR name>

**Date:** YYYY-MM-DD
**Review target:** staged changes / commit range / PR
**Code repo:** <repo-name> (branch: <branch>)
**Verification run:** <targeted tests or "not run">

## Findings

1. [tests/path_test.py:line] Severity: high
   <One or two concise sentences describing why the test is misleading, weak, or invalid and what false confidence it creates.>

2. [tests/path_test.py:line] Severity: medium
   <Finding with test and implementation context.>

## Test Intent Matrix

| Test | Claimed Behavior | What It Actually Proves | Status | Notes |
|------|------------------|-------------------------|--------|-------|
| `tests/test_auth.py::test_rejects_expired_token` | Expired tokens are rejected by expiry validation | Only proves unauthenticated requests return 401 | MISLEADING | Would also pass if header parsing failed before expiry logic ran |
| `tests/test_jobs.py::test_retries_three_times` | Job retries stop after third failure | Proves one retry occurs and error is surfaced | WEAK | Retry count assertion never checks the final stop condition |
| `tests/test_users.py::test_create_user_persists_email` | User email is persisted exactly once | Proves stored record contains the requested email | VALID | Observable behavior is asserted directly |

## False Confidence Hotspots

- <Areas where passing tests are likely to overstate confidence>

## Open Questions / Assumptions

- <Question or assumption if needed>

## Summary

<One paragraph summarizing overall test correctness health and the biggest risks>
```

## Status Meanings

- `VALID` — the test meaningfully proves the behavior it claims to verify
- `WEAK` — the test exercises relevant behavior but important assertions or controls are missing
- `MISLEADING` — the test name or intent overclaims what the test actually proves
- `BROKEN` — the test is invalid, unreachable, inherently flaky, or does not exercise the claimed behavior at all

## Severity Guidance

- **High** — the test is actively misleading, passes for the wrong reason, or would fail to catch a likely regression in critical behavior
- **Medium** — the test partially validates the claim but leaves important loopholes or relies on fragile mechanics
- **Low** — the test is mostly sound but has a localized weakness worth tightening

## Comment Rules

- High confidence only
- Maximum two sentences per finding
- No duplicate findings
- Focus on the test's claimed behavior versus what it actually proves
- Prefer concrete false-confidence scenarios over abstract comments like "weak test"

## Save the Review

If a context repo is available, save the report to:

```text
<context-repo>/<jira-key>-<short-description>/reviews/<feature>-test-correctness-review-<date>.md
```

Otherwise present the review in chat only.

## Differentiation from Other Review Skills

| Skill | Primary question |
|-------|------------------|
| **test-correctness-review** | Do the tests actually prove the behavior they claim to test |
| **test-coverage-review** | Do the changed tests cover the changed code and likely regression paths |
| **requirements-to-tests-traceability** | Do the tests map to the stated requirements or acceptance criteria |
| **deep-review** | Did the implementation match the governing docs overall |

## Related Skills

- **test-coverage-review** — change-based coverage and regression detection
- **requirements-to-tests-traceability** — requirement-to-test mapping
- **deep-review** — broader spec-aware review
- **orchestrated-review** — multi-lens review bundle
