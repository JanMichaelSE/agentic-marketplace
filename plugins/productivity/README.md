# Productivity

Installable plugin for stable, general-purpose agent collaboration: resolving decisions, preserving session context, writing dependable agent-facing guidance, clarifying communication, and orienting in unfamiliar code.

## Skills

| Skill | Purpose | When to Use |
|------|---------|-------------|
| **grilling** | Resolve plan and design decisions through a round-by-round frontier interview | Stress-testing a plan or decision |
| **handoff** | Compact the current conversation into a redacted handoff document | Preparing a fresh agent or later session to continue |
| **writing-for-agents** | Write predictable skills, agent instructions, and referenced documents | Creating or revising agent-facing guidance |
| **wait-what** | Request a clearer re-pitch using shared domain language | An explanation did not land; explicit user request only |
| **zoom-out** | Ask for broader context and a higher-level map of unfamiliar code | Exploring a code area before diving in |

## Dependency Notes

- `writing-for-agents` is self-contained as long as `SKILL-MECHANICS.md` remains beside `SKILL.md`.
- `wait-what` optionally uses a repository's `CONTEXT.md` as the source of its ubiquitous language.
- The remaining skills are self-contained.

## Installation

Install from the `agentic-marketplace` marketplace:

```bash
# Claude Code
claude plugin marketplace add JanMichaelSE/agentic-marketplace
claude plugin install productivity@agentic-marketplace

# Codex
codex plugin marketplace add https://github.com/JanMichaelSE/agentic-marketplace
# Then enable `productivity` from `/plugins` inside Codex
```
