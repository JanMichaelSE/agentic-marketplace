# Refactor Lenses

Run the lenses that fit the supplied scope. For non-trivial scopes, prefer separate findings-only lens agents. For trivial scopes or constrained clients, run the lenses sequentially in the main refactor workflow.

## Core Lenses

### Behavior Preservation and Public Contract Safety

Check whether proposed refactors could change user-visible behavior, APIs, data contracts, side effects, error handling, ordering, timing, persistence, logging expectations, or compatibility.

### Scope Boundary and Source-Input Alignment

Confirm the refactor stays aligned with the implementation summary, git diff, branch comparison, commit range, staged changes, working-tree diff, or file scope supplied by the user.

### Local Repo Patterns and Naming Conventions

Compare the code against nearby patterns, naming, layout, dependency direction, test conventions, generated-artifact rules, and repo guardrails.

### Simpler Control Flow and Smaller Functions

Look for nested conditionals, duplicated branching, overlong functions, unclear temporary state, or sequencing that can be simplified without changing behavior.

### Duplication and Reuse Opportunities

Identify repeated code or repeated concepts that can be consolidated locally. Recommend abstraction only when it removes real duplication or matches an established local pattern.

### Cohesion, Module Boundaries, and Abstraction Fit

Check whether responsibilities are in the right module, classes or functions have clear ownership, and abstractions are neither missing nor speculative.

### Test Clarity Without Weaker Assertions

Look for tests that can be clearer, less brittle, or better named without reducing assertion strength or hiding meaningful setup.

### Efficiency and Unnecessary Work

Find repeated computation, needless I/O, avoidable allocations, redundant parsing, or inefficient loops that can be improved without making the code harder to read.

### Dead-Code Removal When Proven

Identify dead code only when the evidence is inside the explicit boundary or easy to verify from direct references. Record the proof required before removal.

## Conditional Lens

### Security-Sensitive Risk Surfaces

Run this lens when the diff touches authentication, authorization, secrets, configuration, external I/O, network calls, parsing, file paths, data access, permissions, user input, shell commands, serialization, or logging of sensitive data.

Check for changed trust boundaries, input validation, unsafe defaults, leaked secrets, path traversal, injection risk, permission widening, and sensitive-data exposure.
