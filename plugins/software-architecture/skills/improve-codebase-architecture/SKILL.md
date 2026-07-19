---
name: improve-codebase-architecture
description: Find evidence-based, active-change architecture improvements using shared design and domain-modeling guidance. Use when a user wants to reduce architectural friction, deepen a module, or make a current change safer, more testable, and easier to navigate.
---

# Improve Codebase Architecture

Surface demonstrated architectural friction and propose narrowly scoped improvements that make the active change safer, more testable, and easier to navigate. Prefer a small, justified deepening opportunity over a speculative redesign.

## Shared Guidance

[codebase-design](../codebase-design/SKILL.md) is the canonical source for architecture vocabulary, dependency categories, deepening, and alternative design. [domain-modeling](../domain-modeling/SKILL.md) is the canonical source for domain language, `CONTEXT.md`, and ADR practices. Use their terms and formats rather than copying or redefining them here.

Both are companion guidance, not a precondition. If either is unavailable, continue with the project's existing language and decisions; state the missing context and do not invent a replacement glossary or document format.

## Process

### 1. Scope to Active Change

Start with the code, defect, feature, or review concern currently being changed. Identify:

- The intended observable outcome and callers affected
- Demonstrated friction, such as repeated change across files, an unsafe seam, a failing test, or an unclear ownership path
- The smallest architectural improvement that would reduce that friction now

Apply YAGNI: do not recommend abstraction, extension points, generalized frameworks, or broad reorganization for hypothetical future use. A candidate needs evidence from the active change, not merely an aesthetically preferable structure.

### 2. Explore

Read the relevant domain glossary and ADRs before judging names, ownership, or decisions. Follow `domain-modeling` when it is available; otherwise read existing project documents without creating or rewriting them.

Explore the affected code and its callers. Note only friction tied to the active change:

- Where does understanding one concept require bouncing between many small modules?
- Where are modules **shallow** — interface nearly as complex as the implementation?
- Where have pure functions been extracted just for testability, but the real bugs hide in how they're called (no **locality**)?
- Where do tightly-coupled modules leak across their seams?
- Which parts of the codebase are untested, or hard to test through their current interface?

Use the `codebase-design` deletion test for suspected shallow modules when that guidance is available. Do not treat a theoretical deletion result as sufficient evidence without a current change problem.

### 3. Present Candidates

Default to a concise Markdown or chat response. Present a numbered list of only the candidates justified by current friction. For each candidate:

- **Files** — which files/modules are involved
- **Problem** — why the current architecture is causing friction
- **Solution** — plain English description of what would change
- **Benefits** — how the change improves the active path, testability, and, when applicable, locality or leverage
- **Scope** — why the recommendation is the smallest useful change and what is intentionally deferred

Use the project's domain terms and `codebase-design` vocabulary when available. If an ADR conflicts with a candidate, surface it only when demonstrated friction warrants reconsideration; otherwise respect the decision. Do not propose an interface before the user selects a candidate.

### 4. Explore a Selected Candidate

Discuss the design tree with the user: constraints, dependencies, the seam, what remains hidden, and which tests should survive. Use `codebase-design` for alternative interfaces when appropriate.

If a term needs clarification or a durable decision emerges, follow `domain-modeling`. Ask before writing or modifying project documentation. Never commit, push, install dependencies, or mutate external systems without separate authorization.

## Optional HTML Report

Produce HTML only when the user explicitly requests an HTML report and authorizes writing it. Keep it a standalone, offline-safe artifact: embed no remote assets, make no network requests, and do not open a browser or the generated file automatically. Report the written path and retain the concise Markdown/chat summary.