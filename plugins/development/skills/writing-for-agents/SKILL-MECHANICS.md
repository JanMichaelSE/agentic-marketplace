# Skill mechanics

The skill-specific branch of [writing-for-agents](SKILL.md): what changes when
the document is a skill — frontmatter, invocation choice, and router skills.

## Invocation

Two choices trade the two loads:

- A **model-invoked** skill keeps a `description`, so the agent or another skill
  can reach it autonomously. The description stays loaded, creating permanent
  context load. Omit `disable-model-invocation`, write a model-facing
  description with its trigger branches, and omit `policy.allow_implicit_invocation`
  from `agents/openai.yaml`.
- A **user-invoked** skill is reachable only when the human names it. It has zero
  context load but spends cognitive load. Set `disable-model-invocation: true`,
  make the `description` a one-line human-facing summary, and set
  `policy.allow_implicit_invocation: false` in `agents/openai.yaml`.

Pick model invocation only when the agent or another skill must reach the skill.
If it only fires by hand, make it user-invoked. Shared reference needed by two
user-invoked skills belongs in a plain external file, because neither skill can
invoke the other.

## Splitting by invocation

Split off a model-invoked skill only when it has a distinct leading word that
should trigger independently, or when another skill must reach it. The new
always-loaded description must earn its context load.

## Router skills

When user-invoked skills outgrow what people can remember, create one
user-invoked router skill that names the other skills and when to reach for
each. It can guide the human, but it cannot invoke them.
