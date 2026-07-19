# Review Lenses

Run the lenses that fit the supplied review target. Review quality is defined by enabled lens coverage, not by whether lens work is delegated. Cover every enabled lens through delegated lanes, parent-orchestrated lane outputs, or bounded single-agent fallback.

In hosts with sub-agent or parallel-agent support, each enabled lens must run in its own delegated review lane. When a parent coordinator supplies one lane result per enabled lens, assemble and normalize those outputs into the review summary schema. When delegation is unavailable and the target is bounded enough for one read-only pass, use `single-agent-fallback`, cover every enabled lens, and record residual confidence limits.

Skip a lens only when it is not applicable to the supplied target, and record the skip in the review summary. Report `BLOCKED` only when required review inputs or target access are missing, or when the target is too large or risky for the available execution mode.

## Correctness

Check whether the implementation satisfies the execution plan, slices, implementation summaries, refactor summaries, acceptance criteria, public contracts, and expected behavior. Look for incomplete tasks, incorrect control flow, data loss, state transition errors, boundary-condition failures, ordering issues, and error handling that hides or changes failures.

## Security and Guardrails

Check changed trust boundaries, authentication, authorization, secrets, file paths, shell commands, network calls, external I/O, parsing, serialization, logging, dependency changes, configuration, data exposure, and permission changes. Also verify repo guardrails from agent instructions, README files, package metadata, generated-artifact rules, and local workflow constraints.

Critical or high security findings should normally block automated acceptance. If a security issue requires product, policy, credential, or deployment authorization, classify it as a human decision.

## Maintainability

Check whether the change is understandable and locally cohesive. Look for avoidable duplication, confusing names, speculative abstractions, overly broad modules, unclear ownership boundaries, hidden coupling, excessive branching, and complex code that makes future repair risky. Avoid style-only findings unless they create real maintenance risk.

## Standards

Check whether the change follows nearby repository patterns for file layout, front matter, naming, markdown structure, manifests, validation scripts, tests, fixtures, dependency direction, and artifact ownership. Treat repository-specific instructions as governing context.

## Test Coverage

Map changed production or contract behavior to tests. Identify whether tests directly assert the changed behavior, cover success and failure paths, and would fail for likely regressions. Classify missing or weak tests as validation gaps when they block confidence in the change.

## Test Correctness

Check whether tests prove what they claim. Look for tests that assert implementation details instead of behavior, over-mock the changed path, use stale fixtures, skip the important branch, accept false positives, weaken existing assertions, or depend on non-deterministic setup.

## Traceability

Map each slice acceptance criterion, execution-plan decision, and stated requirement to delivered changes and validation evidence. Record missing implementation, partially delivered work, and requirements that need human clarification.

## Validation Evidence

Review commands that were run, commands that should have been run, and any environmental limits. Treat unrun required validation, failed validation, or validation that does not cover the changed surface as a finding. Prefer concrete commands and outcomes over generic statements.
