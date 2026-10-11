---
name: domain-modeling
description: Build and sharpen a project's domain model. Use when discussing codebase terminology, writing or editing GLOSSARY.md or CONTEXT.md, or recording or editing an ADR.
---

# Domain Modeling

Actively build and sharpen a project's domain model while designing. This is
the discipline of challenging terms, probing edge-case scenarios, and
recording language or durable decisions when they crystallize—not merely
reading the project's glossary for vocabulary.

## Locate the Domain Documents

- Follow the repository's documented domain convention. Support both
  `GLOSSARY.md` / `GLOSSARY-MAP.md` and `CONTEXT.md` / `CONTEXT-MAP.md`.
- Read an existing root map to identify the relevant scoped glossary and ADR
  directory before assuming the root glossary applies. For a single context,
  use the established root glossary and `docs/adr/`.
- If both conventions exist, follow repository guidance or map ownership;
  ask which is authoritative if they conflict. Do not merge or rename them
  automatically.
- When no convention exists, default to `GLOSSARY.md` and `docs/adr/`.
- Create domain documents lazily: only after a term is resolved or a meaningful
  decision needs recording. Preserve unrelated user changes.

See [CONTEXT-FORMAT.md](CONTEXT-FORMAT.md) and
[ADR-FORMAT.md](ADR-FORMAT.md) for the maintained formats.

## During the Session

### Challenge the glossary

When a user uses a term that conflicts with existing language, name the
conflict and ask which meaning is intended. When a term is vague or overloaded,
propose a precise canonical term and distinguish it from nearby concepts.

### Discuss concrete scenarios

Stress-test domain relationships with specific scenarios. Include edge cases
that force precise boundaries, ownership, lifecycle, and cardinality decisions.

### Cross-check against the code

When the user describes current behavior, verify it against the relevant code
and tests. Surface a contradiction rather than silently choosing between the
stated model and observed behavior.

### Maintain the model deliberately

When the user resolves a term, update the selected glossary at that point if
they have authorized repository documentation changes; otherwise present the proposed
entry for confirmation. Keep the glossary free of implementation details,
specification prose, scratch notes, and implementation decisions.

Offer an ADR only when the decision is hard to reverse, surprising without
context, and the result of a real trade-off. Do not create an ADR for ephemeral
or self-evident choices. Never commit, push, or mutate external trackers unless
the user separately authorizes that action.
