---
name: writing-great-skills
description: MUST invoke only when a user explicitly asks to create, write, or improve an agent skill. Provides the vocabulary and principles for predictable invocation, progressive disclosure, leading words, pruning, and failure-mode analysis.
---

# Writing Great Skills

A skill wrangles determinism out of a stochastic system. **Predictability**—the
agent following the same process each run, rather than producing the same
output—is the root virtue; every lever below serves it.

**Bold terms** are defined in [GLOSSARY.md](GLOSSARY.md). Consult that
reference when choosing an invocation mode, moving material down the
information hierarchy, or diagnosing a skill's behavior.

## Invocation

The Core marketplace requires a specific front-matter `description` and does
not support the source client's `disable-model-invocation` metadata. Preserve a
deliberate, user-initiated skill by using an explicit gate such as `MUST invoke
only when a user explicitly asks...`; do not invoke such a skill autonomously.

For a skill that should be model-invoked, write a concise, model-facing
description with distinct trigger branches such as `Use when the user wants...`
or `mentions...`. The description is always-loaded context, so only make a
skill autonomously reachable when the agent or another skill must reach it.

When a deliberately invoked skill collection becomes difficult to discover,
offer a router skill that names the available skills and when a user should
explicitly request each one.

## Writing the Description

A model-invoked **description** states what the skill does and the distinct
**branches** that should trigger it. Prune it harder than the body:

- Front-load the skill's **leading word**.
- Keep one trigger per branch; collapse synonyms that name the same branch.
- Keep triggers and any required reach clause, not identity repeated in the
  body.
- For deliberately user-invoked skills, use an explicit-invocation gate rather
  than unsupported client-specific metadata.

## Information Hierarchy

A skill combines **steps** and **reference**. Put each item at the lowest rung
the agent can reliably reach:

1. **In-skill step**: an ordered action in `SKILL.md`. End every step with a
   checkable, appropriately exhaustive **completion criterion**.
2. **In-skill reference**: a definition, rule, or fact consulted on demand.
3. **Disclosed reference**: a sibling file reached by a clearly worded
   **context pointer**.

**Progressive disclosure** moves reference down this ladder so the top stays
legible. Inline what every branch needs; disclose material used only by some
branches. If a required reference is missed, sharpen the pointer before moving
the content back inline. Keep a concept's definition, rules, and caveats
co-located once it is on a rung.

A demanding completion criterion drives thorough **legwork** whether the skill
contains steps or flat reference. Use language that makes completion checkable
and exhaustive where that matters.

## When to Split

**Granularity** spends either context load or cognitive load, so split only
when the cut earns it:

- **By invocation**: make a model-invoked skill only when it has a distinct
  leading word that should trigger it independently, or another skill must
  reach it.
- **By sequence**: split steps when visible **post-completion steps** make the
  agent rush the current step. First sharpen its completion criterion; split
  only when the criterion is irreducibly fuzzy and the rush is observed.

## Pruning

Keep each meaning in a **single source of truth**. Check every line for
**relevance**, then apply the no-op test sentence by sentence: if it does not
change behavior from the model's default, remove the sentence rather than
trimming it.

## Leading Words

A **leading word** is a compact concept already represented in the model's
pretraining—such as _lesson_, _fog of war_, or _tracer bullets_. It anchors
execution in the body and invocation in the description with fewer tokens than
repeated explanations.

Refactor repeated ideas into a strong leading word where the word changes
behavior. For example, a "fast, deterministic, low-overhead" feedback loop can
become a _tight_ loop, and a loop with a binary observable gate can become
_red_. Prefer an established word over a coined term that needs a long
definition.

## Failure Modes

Use these to diagnose a skill that does not behave predictably:

- **Premature completion**: sharpen the current completion criterion first;
  split a sequence only when a genuinely fuzzy step still rushes.
- **Duplication**: restore one authoritative source for the repeated meaning.
- **Sediment**: remove stale layers that accumulated because adding felt safer
  than pruning.
- **Sprawl**: disclose reference behind pointers and split distinct branches or
  sequences.
- **No-op**: replace an instruction the model already follows by default with a
  stronger, behavior-changing leading word, or remove it.
- **Negation**: state the desired positive behavior. Keep a prohibition only
  for an unavoidable hard guardrail and pair it with the positive target.