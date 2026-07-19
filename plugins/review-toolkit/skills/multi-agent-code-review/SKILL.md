---
name: multi-agent-code-review
description: Orchestrate parallel code review only when the user explicitly asks for multiple agents, sub-agents, or parallel review of a branch, PR, commit range, diff, or local changes. Spawn one sub-agent per review point, de-duplicate exact duplicates, and preserve unique findings.
---

# Multi-Agent Code Review

Coordinate a parallel review only when the user explicitly asks for multiple sub-agents or parallel review. Use this skill only as the orchestrator. Keep each child focused on one review point. The orchestrator must not perform its own review, add its own findings, validate child findings, correct citations, judge reproducibility, or issue a final patch verdict. It only assigns review points, collects child outputs, de-duplicates duplicate findings, and presents the deduplicated results.

## Workflow

1. Determine the review scope.
- Prefer the scope the user provides: base branch, pull request, commit range, diff, or explicit files.
- If no scope is provided, ask a concise question to confirm whether to review a branch against a base branch, a provided diff, or local uncommitted changes before proceeding.

2. Determine the review points.
- Use the points the user explicitly provides when they are present.
- If the user asks for multi-agent review without listing points, default to these six points:
  1. Security issues
  2. Code quality
  3. Bugs
  4. Race conditions
  5. Test flakiness
  6. Maintainability of the code

3. Spawn one child agent per review point.
- Spawn exactly one read-only child per point.
- Prefer `fork_context: false` so the child receives only the self-contained task prompt instead of the full orchestrator context.
- Prefer a focused read-only agent type such as `explorer` for bounded review points.
- Give each child a prompt that includes the review scope, the exact point it owns, and the required output format.
- Do not tell the child to use any specific skill.
- Do not ask the child to perform a general code review.

4. Use this child prompt template.

```text
Review the current code change only for <REVIEW_POINT>.

Review scope: <SCOPE>.

Do not perform a general code review. Do not flag style nits. Read enough surrounding context to validate each finding. For every finding, provide a short, direct explanation of the issue and its impact, and cite the exact affected file and line(s) using the available tools. If no findings are present, reply exactly: `no findings`.
```

5. Wait and merge.
- Wait for all child agents to finish before writing the final review.
- Collect findings from child agents only.
- Summarize the result for each review point, including points with `no findings`.
- De-duplicate overlapping findings across review points.
- If the same underlying issue appears in multiple categories, keep one canonical finding entry and mention the other relevant categories briefly.
- After de-duplication, the final review must include every unique child-agent finding.
- Do not omit a finding because it is low severity, secondary, test-only, not reproducible by the orchestrator, has imperfect citations, or because the orchestrator does not believe it is a real defect.
- The only allowed reason to exclude a child-agent finding from the final findings list is that it is duplicate of another child-agent finding.
- If duplicates are excluded, list them in an `Excluded After Verification` section with a brief note that they were removed as duplicates and identify the canonical finding they map to.

6. Write the final review.
- Present one section per review point in the same order the points were assigned.
- Preserve the per-point result even when it is empty.
- Within each section, include all unique findings for that review point after de-duplication.
- If a finding was merged into another category as the canonical entry, include a short cross-reference instead of silently dropping it.
- Include an `Excluded After Verification` section only for findings removed as duplicates.
- Do not add an overall correctness verdict.
- Do not add orchestrator conclusions beyond grouping, de-duplication, and cross-referencing duplicate findings.

## Default Orchestrator Prompt

Review the current code change relative to its base branch or provided diff using multiple sub-agents. If review points are provided, spawn one child agent per point. Otherwise default to these six points: 1. Security issues 2. Code quality 3. Bugs 4. Race conditions 5. Test flakiness 6. Maintainability of the code. Use this skill only as the orchestrator. Spawn children with `fork_context: false`, give each child a self-contained prompt for only one review point, wait for all of them, and present the child findings by review point. Do not ask child agents to invoke any specific skill or perform a general review. De-duplicate duplicate findings across categories, include every unique child-agent finding after de-duplication, and include an `Excluded After Verification` section only for duplicate findings that were merged away.
