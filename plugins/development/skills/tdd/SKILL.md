---
name: tdd
description: Test-driven development through agreed seams with a red-to-green loop. Use when a user wants to build a feature or fix using test-first, behavior-focused development.
---

# Test-Driven Development

## Philosophy

**Core principle**: Tests verify observable behavior through an agreed seam, not implementation details. Code can change entirely; tests should continue to prove what callers experience.

**Good tests** are integration-style: they exercise real code paths through public APIs. They describe _what_ the system does, not _how_ it does it. A good test reads like a specification - "user can checkout with valid cart" tells you exactly what capability exists. These tests survive refactors because they don't care about internal structure.

**Bad tests** are coupled to implementation. They mock internal collaborators, test private methods, or verify through external means (like querying a database directly instead of using the interface). The warning sign: your test breaks when you refactor, but behavior hasn't changed. If you rename an internal function and tests fail, those tests were testing implementation, not behavior.

See [tests.md](tests.md) for examples, including tautological-test failures, and [mocking.md](mocking.md) for dependency guidance.

## Foundation Guidance

When the software-architecture plugin is installed, use [codebase-design](../../../software-architecture/skills/codebase-design/SKILL.md) as the canonical source for architecture vocabulary and [domain-modeling](../../../software-architecture/skills/domain-modeling/SKILL.md) for project language and ADR practices. Do not recreate their definitions here.

These companion skills are optional: if they are unavailable, read the project's existing glossary and ADRs, agree on the test seam in plain language, and continue without creating project documents. Their absence must not block TDD.

## Anti-Pattern: Horizontal Slices

**DO NOT write all tests first, then all implementation.** This is "horizontal slicing" - treating RED as "write all tests" and GREEN as "write all code."

This produces **crap tests**:

- Tests written in bulk test _imagined_ behavior, not _actual_ behavior
- You end up testing the _shape_ of things (data structures, function signatures) rather than user-facing behavior
- Tests become insensitive to real changes - they pass when behavior breaks, fail when behavior is fine
- You outrun your headlights, committing to test structure before understanding the implementation

**Correct approach**: Vertical slices via tracer bullets. One test → one implementation → repeat. Each test responds to what you learned from the previous cycle. Because you just wrote the code, you know exactly what behavior matters and how to verify it.

```
WRONG (horizontal):
  RED:   test1, test2, test3, test4, test5
  GREEN: impl1, impl2, impl3, impl4, impl5

RIGHT (vertical):
  RED→GREEN: test1→impl1
  RED→GREEN: test2→impl2
  RED→GREEN: test3→impl3
  ...
```

## Workflow

### 1. Agree the Test Surface

Before writing a test, agree on the seam and the ordered observable behaviors to prove. This agreement may come from an approved specification, an existing contract, or direct user confirmation; do not infer it from an implementation sketch.

Record or confirm:

- [ ] The caller-facing seam that the test will cross
- [ ] The behavior's observable outcome and constraints
- [ ] A prioritized list of behaviors, starting with the smallest valuable path
- [ ] Which dependency substitutes, if any, are justified at external seams
- [ ] Project domain terms and relevant ADR constraints

Ask: "Which seam will callers cross, and which observable behaviors matter most to prove first?"

**You can't test everything.** Focus on the critical paths and complex logic, not every possible edge case or implementation step.

### 2. Reject Tautological Tests

A test is **tautological** when it passes because its setup already guarantees the assertion rather than because production behavior was exercised. Common signs include asserting the value configured on a mock, verifying only a call to an internal collaborator, or repeating the implementation's conditional logic in the test.

A tautological test can fail when its fixture is wrong, but it supplies no evidence that the system works for a caller. Rewrite it to cross the agreed seam and assert a meaningful observable outcome. See [tests.md](tests.md) for examples.

### 3. Tracer Bullet

Write ONE test that confirms ONE thing about the system:

```
RED:   Write test for first behavior → test fails
GREEN: Write minimal code to pass → test passes
```

This is your tracer bullet - proves the path works end-to-end.

### 4. Incremental Loop

For each remaining behavior:

```
RED:   Write next test → fails
GREEN: Minimal code to pass → passes
```

Rules:

- One test at a time
- Only enough code to pass current test
- Don't anticipate future tests
- Keep tests focused on observable behavior

### 5. Follow-on Refactoring

Refactoring is not a third phase of the TDD loop. After a behavior increment is green, stop the red-to-green loop before taking up structural changes. Handle them in an explicitly scoped refactoring or review activity, using [refactor candidates](refactoring.md) as input and rerunning relevant tests after each change.

Do not use an anticipated refactor to justify speculative production code in the current behavior increment.

## Checklist Per Cycle

```
[ ] Test describes behavior, not implementation
[ ] Test uses public interface only
[ ] Test would survive internal refactor
[ ] Test would fail if the observable behavior regressed
[ ] Test does not merely assert its own fixture or mock configuration
[ ] Code is minimal for this test
[ ] No speculative features added
```