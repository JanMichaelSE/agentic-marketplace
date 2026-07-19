# ADR Format

ADRs live in `docs/adr/` and use sequential numbering: `0001-slug.md`, `0002-slug.md`, and so on.

Create the `docs/adr/` directory lazily, only when the first ADR is needed.

## Template

```md
# {Short title of the decision}

{1-3 sentences: the context, the decision, and why it was made.}
```

An ADR can be a single paragraph. The value is recording that a decision was made and why, not filling out sections.

## Optional sections

Include these only when they add genuine value. Most ADRs do not need them.

- **Status** frontmatter (`proposed | accepted | deprecated | superseded by ADR-NNNN`) — useful when decisions are revisited.
- **Considered Options** — only when rejected alternatives are worth remembering.
- **Consequences** — only when non-obvious downstream effects need to be called out.

## Numbering

Scan `docs/adr/` for the highest existing number and increment it by one.

## When to offer an ADR

All of these must be true:

1. **Hard to reverse** — changing the decision later has meaningful cost.
2. **Surprising without context** — a future reader would wonder why the decision was made.
3. **The result of a real trade-off** — genuine alternatives existed and one was chosen for specific reasons.

If a decision is easy to reverse, skip it. If it is not surprising, a future reader will not need an explanation. If there was no real alternative, there is nothing to record beyond the obvious choice.

### What qualifies

- **Architectural shape.** For example, a monorepo or an event-sourced write model projected into a relational read model.
- **Integration patterns between contexts.** For example, contexts communicating through domain events rather than synchronous HTTP calls.
- **Technology choices that carry lock-in.** A database, message bus, authentication provider, or deployment target that would be costly to replace.
- **Boundary and scope decisions.** For example, one context owns customer data and other contexts reference it only by ID. Explicit exclusions can be as valuable as inclusions.
- **Deliberate deviations from the obvious path.** For example, using manual SQL instead of an ORM for a documented reason.
- **Constraints not visible in code.** For example, a compliance constraint or a response-time contract with an external system.
- **Rejected alternatives when the rejection is non-obvious.** Record a nuanced choice when it would otherwise be reconsidered without the original context.