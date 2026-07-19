# Experimental

Installable plugin for the focused preview and incubator skills retained while they gather feedback before promotion into a stable plugin group.

## Skills

| Skill | Purpose | Notes |
|------|---------|-------|
| **code-review** | Review a diff independently against repository standards and its governing spec | Uses user-supplied, repository-local, or an existing safe local spec reference; does not alter the stable review toolkit |
| **improve-repo-harness** | Assess and improve durable agent guidance, navigation, validation discoverability, bootstrap documentation, and CONTEXT/ADR conventions | Explicit user request only; ships [rubric](skills/improve-repo-harness/HARNESS-RUBRIC.md), [repository-map format](skills/improve-repo-harness/REPO-MAP-FORMAT.md), and [domain conventions](skills/improve-repo-harness/DOMAIN-CONVENTIONS.md) references |
| **writing-great-skills** | Improve agent-skill predictability through deliberate invocation, progressive disclosure, leading words, pruning, and failure-mode analysis | Explicit user request only; ships `GLOSSARY.md` |
| **zoom-out** | Ask the agent for broader context and a higher-level map of an unfamiliar code area | Self-contained |

## Purpose

Use this plugin as the landing zone for new or evolving skills that are still gathering feedback.

## Current Status

This plugin intentionally contains only four experimental skills under `skills/<skill-name>/`.

Each experimental skill should include its normal skill assets, such as `SKILL.md` and any client-specific metadata needed by Auggie or Codex.

## Dependency Notes

- `code-review` is self-contained for repository-local reviews. When a governing source is unavailable, it asks the user for one or reports `No spec available`; it never configures a reference or contacts an external service.
- `improve-repo-harness` is self-contained as long as its [rubric](skills/improve-repo-harness/HARNESS-RUBRIC.md), [repository-map format](skills/improve-repo-harness/REPO-MAP-FORMAT.md), and [domain conventions](skills/improve-repo-harness/DOMAIN-CONVENTIONS.md) references remain beside `SKILL.md`.
- `writing-great-skills` is self-contained as long as `GLOSSARY.md` remains beside `SKILL.md`.
- `zoom-out` is self-contained.

## Relocation Map

The following skills were promoted out of `experimental`; install their destination plugin instead of retaining an alias:

| Destination plugin | Relocated skills |
|--------------------|------------------|
| [development](../development/README.md) | `grilling`, `research`, `prototype`, `diagnosing-bugs`, `resolving-merge-conflicts` |
| [review-toolkit](../review-toolkit/README.md) | `draft-code-review-comment`, `pr-comment-addressed-check` |
| [infrastructure](../infrastructure/README.md) | `force-pod-restart-on-deploy` |
| [software-architecture](../software-architecture/README.md) | `codebase-design`, `domain-modeling`, `improve-codebase-architecture` |

## Promotion Path

1. Add a trial skill here.
2. Let other people try it and collect feedback.
3. Move it into a stable plugin once the behavior and ownership are clear.

## Installation

Install from the `agentic-marketplace` marketplace:

```bash
# Auggie
auggie plugin marketplace add https://github.com/JanMichaelSE/agentic-marketplace
auggie plugin install experimental@agentic-marketplace

# Codex
codex plugin marketplace add https://github.com/JanMichaelSE/agentic-marketplace
# Then enable `experimental` from `/plugins` inside Codex
```
