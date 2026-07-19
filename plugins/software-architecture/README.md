# Software Architecture

Installable plugin for stable architecture and domain-modeling guidance that helps engineers design deep modules, maintain shared language, and make evidence-based improvements to active changes.

## Skills

| Skill | Purpose | When to Use |
|-------|---------|-------------|
| [**codebase-design**](skills/codebase-design/SKILL.md) | Define architecture vocabulary and design deep modules with clear interfaces and seams | Designing or improving a module, choosing a seam, or making code more testable and navigable |
| [**domain-modeling**](skills/domain-modeling/SKILL.md) | Sharpen domain language, relationships, and durable architectural decisions | Defining terminology, updating `CONTEXT.md`, or recording an ADR |
| [**improve-codebase-architecture**](skills/improve-codebase-architecture/SKILL.md) | Identify the smallest evidence-based architecture improvement for an active change | Reducing demonstrated architectural friction, deepening a module, or improving testability |

## Guidance Relationships

- `codebase-design` is the canonical source for architecture vocabulary, dependency categories, deepening, and alternative design.
- `domain-modeling` owns project language, `CONTEXT.md`, and ADR practices.
- `improve-codebase-architecture` consumes the two companion skills rather than duplicating their guidance. It remains usable with existing project evidence when either companion is unavailable.

## Installation

Install from the `agentic-marketplace` marketplace:

```bash
# Auggie
auggie plugin marketplace add https://github.com/JanMichaelSE/agentic-marketplace
auggie plugin install software-architecture@agentic-marketplace

# Codex
codex plugin marketplace add https://github.com/JanMichaelSE/agentic-marketplace
# Then enable `software-architecture` from `/plugins` inside Codex
```