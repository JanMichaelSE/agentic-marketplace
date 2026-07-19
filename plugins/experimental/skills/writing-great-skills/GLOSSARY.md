# Glossary — Building Great Skills

The domain model for a great skill. Its root virtue is **Predictability**: the
agent behaves the same way each run, even when the correct output varies. This
is the disclosed reference for [writing-great-skills](SKILL.md).

Terms are grouped by **Invocation**, **Information Hierarchy**, **Steering**,
and **Pruning**. Each failure mode lives with the lever that cures it.

## Predictability

The degree to which a skill produces the same process, not identical output.
Cost and maintainability are symptoms of predictability, not competing goals.

_Avoid_: consistency, reliability, robustness, output-determinism

## Invocation

### Model-Invoked

A skill whose description makes it reachable by the agent and by other skills.
It pays permanent **context load** for that discoverability. Use it only when
the agent must reach the skill autonomously or another skill must reach it.

### Deliberately User-Invoked

A Core-adapted manual skill whose description explicitly gates invocation—for
example, `MUST invoke only when a user explicitly asks...`. Core requires a
description and has no `disable-model-invocation` field, so the gate preserves
the source's user-initiated behavior without unsupported metadata. It avoids
unwanted automatic invocation while retaining the required catalog entry.

### Description

The always-loaded, machine-readable **context pointer** from the agent to a
skill. In Core it must be specific; model-invoked skills use distinct triggers,
while deliberately user-invoked skills use an explicit-invocation gate.

### Context Pointer

A reference in context that names out-of-context material and says when to
reach it. Its wording, not its target, controls reachability and reliability.
Sharpen a weak pointer before inlining its target.

### Context Load

The token and attention cost of an always-loaded model-facing description.

### Cognitive Load

The human cost of remembering which deliberately invoked skills exist and when
to request them. Spend it where human judgment matters.

### Router Skill

A deliberately invoked skill that names related manually requested skills and
when to use them. It reduces cognitive load without autonomously selecting a
skill for the user.

### Granularity

How finely skills are divided. More model-invoked skills cost context load;
more deliberately invoked skills cost cognitive load. Split by **invocation**
for a distinct leading word, or by **sequence** to hide post-completion steps.

## Information Hierarchy

### Information Hierarchy

Content ranked by how immediately the agent needs it:

- **Steps**: in-file, primary ordered actions.
- **Reference**: in-file, secondary facts and rules.
- **Disclosed reference**: material behind a context pointer.

A skill can be all steps, all reference, or both. Keep the top legible and move
down material the agent does not need on every branch.

### Steps

Ordered actions. Each ends with a **completion criterion**. A skill need not
have steps; flat reference can still set an exhaustive completion demand.

### Reference

Definitions, facts, examples, and conditional instructions consulted on demand.
It is the primary candidate for progressive disclosure.

### External Reference

Reference outside the skill system that multiple skills can point to without
becoming an invocable skill itself.

### Progressive Disclosure

Moving reference behind a context pointer to protect the information hierarchy.
Inline what every branch needs; disclose what only some branches need. If a
must-have pointer fires unreliably, strengthen its wording first.

### Co-location

Keeping a concept's definition, rules, and caveats together. The hierarchy
decides how far down content belongs; co-location decides what belongs together
on that rung.

### Sprawl

_Failure mode._ A skill is too long even when its content is live and unique.
Cure it through progressive disclosure and splits by branch or sequence.

## Steering

### Branch

A distinct way a skill can be used. Branching determines what must remain
inline and what can be disclosed behind a pointer.

### Leading Word

A compact, pretrained concept that anchors behavior with few tokens, such as
_lesson_, _fog of war_, _tracer bullets_, _tight_, or _red_. Repeat the token,
not a long explanation. A leading word also makes a description more reliably
invocable when it matches the language users already employ.

### Completion Criterion

The condition that tells an agent work is done. Its clarity resists **premature
completion**; its demand sets the depth of **legwork**. Strong criteria are both
checkable and exhaustive.

### Legwork

The repository reading, investigation, and implementation effort within a
single step. It is raised by a strong leading word or a demanding completion
criterion, not by making it a separate step.

### Post-Completion Steps

Steps after the current step. When visible, they can pull attention forward and
cause premature completion.

### Premature Completion

_Failure mode._ Ending a step before it is genuinely complete because attention
has shifted to finishing. First sharpen the completion criterion. Only after
observing a rush through an irreducibly fuzzy criterion should later steps be
hidden behind a real context boundary.

### Negation

_Failure mode._ A prohibition activates the unwanted behavior it names. Prompt
the positive target instead. Keep an unavoidable hard guardrail only alongside
the desired behavior.

## Pruning

### Single Source of Truth

Each meaning has one authoritative home, so behavior changes have one edit
site. **Duplication** violates this state.

### Duplication

_Failure mode._ One meaning appears in more than one authoritative place. It
costs maintenance and tokens and gives the repeated meaning excessive weight.

### Relevance

Whether a line still bears on the skill's task. A line may be irrelevant
because it never helped or because it became stale. Relevance differs from the
no-op test: a relevant line can still change no behavior.

### Sediment

_Failure mode._ Stale content accumulates because adding feels safer than
removing. Pruning restores relevance.

### No-Op

_Failure mode._ An instruction does not change behavior from the model's
default. Test each sentence in isolation; delete a no-op rather than merely
shortening it. A weak leading word can be a no-op; replace it with a stronger
word that changes behavior.