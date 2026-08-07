---
name: writing-for-agents
description: Writing documents for agents. Use when creating or editing skills, or modifying AGENTS.md or CLAUDE.md.
---

# Writing for Agents

Reference for writing any document an agent consumes — a skill, an `AGENTS.md`
or `CLAUDE.md`, or a document reached by a pointer. The packaging differs; the
writing does not: the same levers make each one predictable — the agent taking
the same process every run, not producing the same output.

When the document is a skill, read [SKILL-MECHANICS.md](SKILL-MECHANICS.md) for
frontmatter, invocation choice, and router skills.

## Context pointers

A **context pointer** is a reference held in the agent's context that names
out-of-context material and encodes the condition for reaching it. A skill's
description is one; a line in `AGENTS.md` naming a document is the same object.
The pointer's wording, not its target, decides when the agent reaches the
material and how reliably. A must-have target behind a weakly worded pointer is
a variance bug: sharpen the wording first, and inline the material only if that
fails.

A pointer states what the material is and lists the **branches** that should
trigger reaching it. Every word of an always-loaded pointer costs on every turn,
so prune it harder than the body:

- **Front-load the leading word** — the pointer is where it does its triggering work.
- **Use one trigger per branch.** Collapse synonyms that name one branch.
- **Cut identity the body already carries.**

## The two loads

Every document and pointer spends one of two budgets:

- **Context load** — the cost of always-loaded material on the agent's window:
  an `AGENTS.md` line, a skill description, or anything present every turn.
- **Cognitive load** — the cost on the human: which documents exist and when to
  reach for each. The human is the index. It is the price of human agency; spend
  it where human judgement matters and remove it where it does not.

Material reached only through a pointer escapes context load at the price of the
pointer's own line; material with no pointer rides entirely on cognitive load.

## Information hierarchy

A document combines **steps** (ordered agent actions) and **reference**
(definitions, rules, or facts consulted on demand). Put each item at the lowest
rung the agent can reliably reach:

1. **In-file step** — what the agent does, in order.
2. **In-file reference** — material consulted on demand.
3. **Disclosed reference** — material in another file, reached only through a
   clearly worded context pointer.

**Progressive disclosure** moves material down the ladder so the top stays
legible. Inline what every branch needs; disclose material only some branches
reach. **Co-location** decides what sits beside a concept once it is on a rung:
keep its definition, rules, and caveats together. **Sprawl** is the failure mode
when a document remains too long even though every line is live; disclose
reference and split by branch or sequence to cure it.

## Steps and completion criteria

Every step ends on a **completion criterion** — the condition that tells the
agent the work is done. It needs both:

- **Clarity** — an observable bound that distinguishes done from not done.
  Sharpen it before splitting a sequence to counter **premature completion**.
- **Demand** — an appropriately exhaustive requirement. Demand drives the
  **legwork** the agent performs, whether the document has steps or flat
  reference.

The strongest criteria are both checkable and exhaustive.

## When to split

Splitting spends one of the two loads, so make the cut earn it:

- **By sequence** — split steps only when visible post-completion steps make the
  current step rush and a sharper completion criterion does not fix it.
- **By invocation** — for skill-specific guidance, read
  [SKILL-MECHANICS.md](SKILL-MECHANICS.md).

## Leading words

A **leading word** is a compact concept already present in the model's
pretraining that the agent thinks with while running the document — _lesson_,
_fog of war_, or _tracer bullets_. It anchors execution in the body and
invocation in a pointer with fewer tokens than repeated explanation.

Hunt for chances to refactor repeated ideas into a leading word where it changes
behaviour:

- "fast, deterministic, low-overhead" becomes _tight_.
- "a loop you believe in" becomes _red_: a fuzzy gate becomes binary and observable.

Use a positive target. **Negation** activates the behaviour it tries to ban, so
keep a prohibition only for an unavoidable hard guardrail and pair it with the
desired action.

## Pruning

- Keep each meaning in a **single source of truth**. **Duplication** costs
  maintenance and inflates a meaning's prominence.
- Treat the environment as a source of truth too. A document that restates a
  cheap lookup in configuration, source, or `--help` output is a **cache**;
  cache only unwritten conventions, reasons, and non-obvious gotchas.
- Check every line for **relevance**. Remove stale or unrelated material before
  it settles into **sediment**.
- Hunt **no-ops** sentence by sentence: if deleting it does not change agent
  behaviour from the default, delete it instead of trimming it.
