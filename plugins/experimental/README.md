# Experimental

Installable plugin for the focused preview and incubator skills retained while they gather feedback before promotion into a stable plugin group.

## Skills

| Skill | Purpose | Notes |
|------|---------|-------|
| **code-review** | Review a diff independently against repository standards and its governing spec | Uses user-supplied, repository-local, or an existing safe local spec reference; does not alter the stable review toolkit |
| **improve-repo-harness** | Assess and improve durable agent guidance, navigation, validation discoverability, bootstrap documentation, and CONTEXT/ADR conventions | Explicit user request only; ships [rubric](skills/improve-repo-harness/HARNESS-RUBRIC.md), [repository-map format](skills/improve-repo-harness/REPO-MAP-FORMAT.md), and [domain conventions](skills/improve-repo-harness/DOMAIN-CONVENTIONS.md) references |
| **writing-for-agents** | Write predictable skills, agent instructions, and referenced documents | Model-invoked reference; ships `SKILL-MECHANICS.md` for skill-specific guidance |
| **wait-what** | Request a clearer re-pitch using shared domain language | Explicit user request only |
| **zoom-out** | Ask the agent for broader context and a higher-level map of an unfamiliar code area | Self-contained |

## Purpose

Use this plugin as the landing zone for new or evolving skills that are still gathering feedback.

## Current Status

This plugin intentionally contains five experimental skills under `skills/<skill-name>/`.

Each experimental skill should include its normal skill assets, such as `SKILL.md` and any client-specific metadata needed by Claude Code or Codex.

## Dependency Notes

- `code-review` is self-contained for repository-local reviews. When a governing source is unavailable, it asks the user for one or reports `No spec available`; it never configures a reference or contacts an external service.
- `improve-repo-harness` is self-contained as long as its [rubric](skills/improve-repo-harness/HARNESS-RUBRIC.md), [repository-map format](skills/improve-repo-harness/REPO-MAP-FORMAT.md), and [domain conventions](skills/improve-repo-harness/DOMAIN-CONVENTIONS.md) references remain beside `SKILL.md`.
- `writing-for-agents` is self-contained as long as `SKILL-MECHANICS.md` remains beside `SKILL.md`.
- `wait-what` optionally uses a repository's `CONTEXT.md` as the source of its ubiquitous language.
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
# Claude Code
claude plugin marketplace add JanMichaelSE/agentic-marketplace
claude plugin install experimental@agentic-marketplace

# Codex
codex plugin marketplace add https://github.com/JanMichaelSE/agentic-marketplace
# Then enable `experimental` from `/plugins` inside Codex
```
