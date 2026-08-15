---
name: design-principles-review
description: MUST invoke for SOLID, design-principles, abstraction, modularity, coupling/cohesion, maintainability, or design-pattern code reviews. Produces findings-first maintainability/testability risks. Use requirements-to-tests-traceability for requirements verification, security-review for security-only, and orchestrated-review for bundled reviews.
---

# Design Principles Review

Perform a design-focused code review of changed code and nearby context.

This skill is for the question: "Is this code well-structured and maintainable?" It is not a generic style review and it is not a theory exercise. Only report issues that create concrete risk for maintainability, extensibility, testability, or correctness.

## Prerequisites

This skill can run standalone from a diff, PR, Jira item, TDD, or requirements document.

## When to Use

- When the user explicitly asks for SOLID or design-principles review
- When the code appears functionally correct but the structure may be brittle
- When you want a separate design-quality lens in addition to security-review or requirements-to-tests-traceability
- When governing docs may or may not exist; this skill can work with diff-only context

## Inputs

Collect or infer these inputs before reviewing:

1. **Review target** — staged changes, unstaged changes, `HEAD`, a commit/range, or a PR diff
2. **Code repo path** — the repository containing the changes
3. **Optional context** — TDD, Jira ticket, phase spec, PR description, or architecture notes if they exist

If optional context is missing, continue with the code and diff alone. Make that limitation explicit in the review output.

## Where to Look for Specs

Look for design and specification context in repository documentation, issue-tracker records, technical design documents, or user-provided material. A repository may organize local artifacts like this:

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

When these files exist, prefer reviewing against them instead of guessing the intended boundaries from code alone.

## Review Lens

Evaluate the changed code and directly affected surrounding code against these principles:

| Area | What to look for |
|------|------------------|
| **Single Responsibility** | A class/function/module taking on multiple unrelated responsibilities, mixed layers, or orchestration plus policy plus I/O in one unit |
| **Open/Closed** | New behavior implemented through branching sprawl or copy-paste instead of existing extension points |
| **Liskov Substitution** | Interface or subtype changes that silently narrow contracts, strengthen preconditions, or weaken guarantees |
| **Interface Segregation** | Wide interfaces, DTOs, or service contracts that force callers to depend on unused behavior |
| **Dependency Inversion** | Business logic bound directly to frameworks, transport, persistence, globals, or concrete vendors |
| **Coupling and Cohesion** | Feature envy, cyclic dependencies, leaked internals, or modules that know too much about each other |
| **Encapsulation and Invariants** | Invalid states exposed publicly, mutable state spread across call sites, or domain rules enforced inconsistently |
| **Pattern Fit** | Misused patterns, needless indirection, or pattern-shaped code that adds ceremony without solving a real problem |
| **Testability** | Hidden global state, time/network coupling, or designs that force brittle tests and heavy mocking for basic verification |

## Workflow

### 1. Scope the review target

- Identify the exact diff or changed files.
- Build a changed-file summary before forming opinions.
- For each changed file, read enough surrounding code to understand boundaries, callers, and collaborators.

### 2. Read optional context if it helps define intended boundaries

- If a TDD or Jira item exists, use it to understand the intended module boundaries and responsibilities.
- If a phase spec exists, use it to understand whether responsibilities were intentionally split or deferred.
- When the repository has a feature or scratch directory, check its TDD, specification, and task artifacts.
- If no context exists, review against the codebase's established patterns and the changed code's own contracts.

### 3. Review for concrete design failures

Prioritize issues in this order:

1. Contract and abstraction breaks that can cause incorrect behavior or dangerous change ripple
2. Strong coupling or responsibility mixing that makes the change hard to extend safely
3. Design choices that materially weaken testability or isolate logic poorly
4. Pattern misuse or overengineering that adds real maintenance cost

Do not report subjective preferences such as naming, formatting, package layout taste, or "I would have used pattern X" commentary.

### 4. Verify before reporting

- Anchor every finding to a specific file and line.
- Explain the concrete impact: what becomes hard, brittle, unsafe, or misleading.
- Read callers and sibling modules before claiming a layering or contract violation.
- If the code is unusual but defensible, leave it alone or raise it as an open question instead of a finding.

### 5. Inspect tests through a design lens

When tests are part of the change:

- Check whether the design forces tests to over-mock internal details
- Check whether tests can verify behavior through stable seams instead of intimate knowledge of implementation
- Note brittle or over-coupled tests only when that reflects a real design problem

Do not use this skill to judge requirements coverage. That belongs to `requirements-to-tests-traceability`.

## Output Format

Structure the review like this:

```text
# Design Principles Review: <feature or PR name>

**Date:** YYYY-MM-DD
**Review target:** staged changes / commit range / PR
**Code repo:** <repo-name> (branch: <branch>)
**Context used:** <TDD, Jira, phase spec, or "code-only">

## Findings

1. [path/to/file.ext:line] Severity: high
   Principle: SRP / DIP
   <One or two concise sentences describing the structural issue and its concrete impact.>

2. [path/to/file.ext:line] Severity: medium
   Principle: OCP / Coupling
   <Finding with impact.>

## Design Scorecard

| Area | Status | Notes |
|------|--------|-------|
| Responsibilities | PASS | Clear separation between transport and business logic |
| Abstraction boundaries | FAIL | Service depends directly on ORM session and HTTP concerns |
| Extensibility | PASS | New provider added behind existing strategy interface |
| Testability | PARTIAL | Logic testable, but time dependency is hard-coded |

## Open Questions / Assumptions

- <Question or assumption if needed>

## Summary

<One paragraph summarizing findings count, main design risks, and overall structural health>
```

## Severity Guidance

- **High** — structural issue likely to cause incorrect behavior, misleading contracts, or repeated breakage when extending the feature
- **Medium** — meaningful maintainability or testability risk that should usually be addressed before merge
- **Low** — localized structural weakness worth noting but not usually merge-blocking

Zero findings is a valid outcome.

## Comment Rules

- High confidence only
- Maximum two sentences per finding
- No duplicate findings
- Focus on changed code unless unchanged context is required to explain the issue
- Prefer evidence over doctrine

## Save the Review

If a context repo is available, save the report to:

```text
<context-repo>/<jira-key>-<short-description>/reviews/<feature>-design-principles-review-<date>.md
```

Otherwise present the review in chat only.

## Differentiation from Other Review Skills

| Skill | Primary question |
|-------|------------------|
| **security-review** | Did we introduce security vulnerabilities |
| **requirements-to-tests-traceability** | Do executable tests verify the governing requirements |
| **design-principles-review** | Is the changed code structured in a maintainable, extensible, and testable way |

## Related Skills

- **security-review** — security-focused review
- **requirements-to-tests-traceability** — requirements verification through executable tests
- **orchestrated-review** — bundles this review with the other review skills
