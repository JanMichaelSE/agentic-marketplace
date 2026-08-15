# Experimental

Installable plugin for the focused preview and incubator skill retained while it gathers feedback before promotion into a stable plugin group.

## Skills

| Skill | Purpose | Notes |
|------|---------|-------|
| **improve-repo-harness** | Assess and improve durable agent guidance, navigation, validation discoverability, bootstrap documentation, and CONTEXT/ADR conventions | Explicit user request only; ships [rubric](skills/improve-repo-harness/HARNESS-RUBRIC.md), [repository-map format](skills/improve-repo-harness/REPO-MAP-FORMAT.md), and [domain conventions](skills/improve-repo-harness/DOMAIN-CONVENTIONS.md) references |

## Purpose

Use this plugin as the landing zone for new or evolving skills that are still gathering feedback.

## Current Status

This plugin intentionally contains one experimental skill under `skills/<skill-name>/`.

Each experimental skill should include its normal skill assets, such as `SKILL.md` and any client-specific metadata needed by Claude Code or Codex.

## Dependency Notes

- `improve-repo-harness` is self-contained as long as its [rubric](skills/improve-repo-harness/HARNESS-RUBRIC.md), [repository-map format](skills/improve-repo-harness/REPO-MAP-FORMAT.md), and [domain conventions](skills/improve-repo-harness/DOMAIN-CONVENTIONS.md) references remain beside `SKILL.md`.

## Relocation Map

The following skills were promoted out of `experimental`; install their destination plugin instead of retaining an alias:

| Destination plugin | Relocated skills |
|--------------------|------------------|
| [ai-workflow](../ai-workflow/README.md) | `code-review` superseded by `review` |
| [engineering](../engineering/README.md) | `research`, `prototype`, `diagnosing-bugs`, `resolving-merge-conflicts` |
| [productivity](../productivity/README.md) | `grilling`, `writing-for-agents`, `wait-what`, `zoom-out` |
| [review-toolkit](../review-toolkit/README.md) | `draft-code-review-comment`, `pr-comment-addressed-check` |
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
