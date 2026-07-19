---
name: grill-with-docs
description: Run a one-question-at-a-time plan interview grounded in local domain documentation, updating CONTEXT.md or ADRs only as decisions are confirmed. Use when a user wants to stress-test a plan against project language and documented decisions.
---

# Grill With Docs

## Interview

Interview the user thoroughly about every aspect of the plan until reaching a shared understanding. Walk each branch of the design tree, resolving decision dependencies one at a time. For every question, provide a recommended answer.

Ask questions one at a time and wait for feedback before continuing. Asking multiple questions at once makes it difficult to resolve decisions clearly.

If a fact can be found by exploring the codebase, look it up rather than asking the user. Decisions belong to the user: present each decision and wait for their answer.

Do not act on the plan until the user confirms that shared understanding has been reached.

## Domain Awareness

During codebase exploration, also look for existing domain documentation.

### Repository layout

Most repositories have a single context:

```text
/
├── CONTEXT.md
├── docs/
│   └── adr/
│       ├── 0001-event-sourced-orders.md
│       └── 0002-postgres-for-write-model.md
└── src/
```

If a root `CONTEXT-MAP.md` exists, the repository has multiple contexts. The map points to each context:

```text
/
├── CONTEXT-MAP.md
├── docs/
│   └── adr/                          ← system-wide decisions
├── src/
│   ├── ordering/
│   │   ├── CONTEXT.md
│   │   └── docs/adr/                 ← context-specific decisions
│   └── billing/
│       ├── CONTEXT.md
│       └── docs/adr/
```

Create files lazily, only when there is confirmed content to write. If no `CONTEXT.md` exists, create one when the first term is resolved. If no `docs/adr/` exists, create it when the first ADR is needed.

## During the Session

### Challenge the glossary

When the user uses a term that conflicts with language in `CONTEXT.md`, call it out immediately. For example: "Your glossary defines 'cancellation' as X, but you seem to mean Y — which is it?"

### Sharpen fuzzy language

When the user uses vague or overloaded terms, propose a precise canonical term. For example: "You're saying 'account' — do you mean the Customer or the User? Those are different things."

### Discuss concrete scenarios

When domain relationships are discussed, stress-test them with specific scenarios. Invent scenarios that probe edge cases and force precise boundaries between concepts.

### Cross-reference code

When the user states how something works, check whether the code agrees. If a contradiction is found, surface it. For example: "Your code cancels entire Orders, but you just said partial cancellation is possible — which is right?"

### Update `CONTEXT.md` inline

When a term is resolved, update `CONTEXT.md` immediately rather than batching updates. Use [CONTEXT-FORMAT.md](./CONTEXT-FORMAT.md).

Do not couple `CONTEXT.md` to implementation details. Include only terms meaningful to domain experts.

### Offer ADRs sparingly

Offer an ADR only when all of these are true:

1. **Hard to reverse** — changing the decision later has meaningful cost.
2. **Surprising without context** — a future reader would wonder why the decision was made.
3. **The result of a real trade-off** — genuine alternatives existed and one was chosen for specific reasons.

If any condition is missing, skip the ADR. Use [ADR-FORMAT.md](./ADR-FORMAT.md).