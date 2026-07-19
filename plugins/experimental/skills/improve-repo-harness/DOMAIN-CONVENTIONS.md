# Domain Convention Discovery

This reference makes existing domain conventions discoverable; it does not
define domain language or architecture decisions.

## Explore established locations

Look for, in order:

1. Root `CONTEXT.md` for a single shared context.
2. Root `CONTEXT-MAP.md` for routes to scoped context documents.
3. Root `docs/adr/` and ADR directories scoped beside the relevant context.
4. Existing requirements and design documents that name the governing context
   or decisions for the area being explored.

Record only locations and observed relationships. An absent document is an
observation, not a reason to supply terminology or decisions.

## Route the user to the owner

Use [domain-modeling](../../../software-architecture/skills/domain-modeling/SKILL.md)
when the user wants to resolve a term, establish a context boundary, materially
improve a domain model, or record a durable decision. That skill owns the
maintained formats for context documents and ADRs.

When the user explicitly requests an empty layout, the harness may propose a
navigation-only scaffold after confirmation. Do not populate it with inferred
terms, relationships, or decisions.

## Harness outcomes

A selected harness change may point readers to the observed context or ADR
locations, clarify their scope, or repair a local navigation link. Keep the
content itself in its established domain-document owner.

See [HARNESS-RUBRIC.md](HARNESS-RUBRIC.md) for the evidence threshold and
[SKILL.md](SKILL.md) for the section-by-section approval process.