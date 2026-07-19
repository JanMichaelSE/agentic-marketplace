# CONTEXT.md Format

## Structure

```md
# {Context Name}

{One or two sentence description of what this context is and why it exists.}

## Language

**Order**:
{A concise description of the term}
_Avoid_: Purchase, transaction

**Invoice**:
A request for payment sent to a customer after delivery.
_Avoid_: Bill, payment request

**Customer**:
A person or organization that places orders.
_Avoid_: Client, buyer, account

## Relationships

- An **Order** produces one or more **Invoices**
- An **Invoice** belongs to exactly one **Customer**

## Example dialogue

> **Developer:** "When a **Customer** places an **Order**, do we create the **Invoice** immediately?"
> **Domain expert:** "No — an **Invoice** is generated only once a **Fulfillment** is confirmed."

## Flagged ambiguities

- "account" was used to mean both **Customer** and **User** — resolved: these are distinct concepts.
```

## Rules

- **Be opinionated.** When multiple words exist for one concept, choose the best term and list other aliases to avoid.
- **Flag conflicts explicitly.** If a term is ambiguous, record it in "Flagged ambiguities" with a clear resolution.
- **Keep definitions tight.** Use at most one sentence. Define what a term is, not what it does.
- **Show relationships.** Use bold term names and cardinality where it is obvious.
- **Include only context-specific terms.** General programming concepts such as timeouts, error types, and utility patterns do not belong. Before adding a term, ask whether it is unique to this context or a general programming concept; include only the former.
- **Group terms under subheadings** when natural clusters emerge. A flat list is fine when all terms belong to one cohesive area.
- **Write an example dialogue.** Use a conversation between a developer and domain expert to demonstrate how the terms interact naturally and clarify boundaries between related concepts.

## Single- and multi-context repositories

**Single context (most repositories):** one `CONTEXT.md` at the repository root.

**Multiple contexts:** a root `CONTEXT-MAP.md` lists the contexts, where they live, and how they relate:

```md
# Context Map

## Contexts

- [Ordering](./src/ordering/CONTEXT.md) — receives and tracks customer orders
- [Billing](./src/billing/CONTEXT.md) — generates invoices and processes payments
- [Fulfillment](./src/fulfillment/CONTEXT.md) — manages warehouse picking and shipping

## Relationships

- **Ordering → Fulfillment**: Ordering emits `OrderPlaced` events; Fulfillment consumes them to start picking
- **Fulfillment → Billing**: Fulfillment emits `ShipmentDispatched` events; Billing consumes them to generate invoices
- **Ordering ↔ Billing**: Shared types for `CustomerId` and `Money`
```

Infer the repository structure as follows:

- If `CONTEXT-MAP.md` exists, read it to find contexts.
- If only a root `CONTEXT.md` exists, treat the repository as a single context.
- If neither exists, create a root `CONTEXT.md` lazily when the first term is resolved.

When multiple contexts exist, infer which one relates to the current topic. If it is unclear, ask the user.