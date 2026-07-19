# Development

Installable plugin for stable cross-stack planning, implementation, discovery, diagnostics, prototyping, UI design translation, local web testing, code simplification, merge-resolution, and handoff workflow guidance.

For execution planning and implementation slicing, use AI Workflow's [create-execution-plan](../ai-workflow/skills/create-execution-plan/SKILL.md) and [create-implementation-slices](../ai-workflow/skills/create-implementation-slices/SKILL.md).

## Skills

### Discovery and Planning

| Skill | Purpose | When to Use |
|------|---------|-------------|
| **inception-planning** | Guide requirements analysis, scoping, and solution design | Starting a feature or refining requirements |
| **grilling** | Resolve plan and design decisions through a one-question-at-a-time interview | Stress-testing a plan or design |
| **research** | Research a technical question from primary sources and write cited findings | Investigating a technical decision or unknown |

### Implementation

| Skill | Purpose | When to Use |
|------|---------|-------------|
| **construction-implementation** | Apply implementation discipline and code change best practices | Writing code or structuring a change |
| **tdd** | Guide red-to-green, behavior-focused test-driven development | Building features or fixes test-first |
| **prototype** | Build a disposable logic or UI prototype for one design question | Testing a focused design hypothesis |
| **diagnosing-bugs** | Diagnose hard defects with a tight, red-capable feedback loop | Investigating a difficult defect |
| **resolving-merge-conflicts** | Resolve merge or rebase conflicts through intent discovery and focused validation | Resolving a Git conflict safely |
| **simplify-code** | Simplify scoped code while preserving behavior | Reducing complexity, duplication, or readability friction |
| **figma-mcp** | Implement or compare UI against Figma designs through an available MCP integration | Building Figma-backed UI, extracting design tokens, or checking visual parity |
| **webapp-testing** | Test a local web application with Playwright scripts and inspection assets | Verifying frontend behavior or debugging UI |

### Utilities

| Skill | Purpose | When to Use |
|------|---------|-------------|
| **handoff** | Compact the current conversation into a handoff document | Preparing a fresh agent or later session to continue |
| **create-pr-overview** | Create a concise PR overview document from a diff, PRD, or branch | Preparing branch or PR context for reviewers |

## Dependency Notes

- `create-pr-overview` is self-contained as long as `REFERENCE.md` stays beside `SKILL.md`.
- `tdd` is self-contained for behavior testing. When the `software-architecture` plugin is installed, it may consult `codebase-design` and `domain-modeling` as the canonical architecture and domain guidance; their absence does not block TDD.
- `simplify-code` is self-contained and works with the host project's existing language, formatter, and test commands.
- `figma-mcp` is optional at runtime and requires user-configured Figma MCP access only for live design data; exported context or screenshots can be used when it is unavailable.
- `webapp-testing` requires a user-approved local application plus preinstalled Python, Playwright, and browser binaries. Its helper, examples, and Apache-2.0 license are bundled beside the skill.
- Execution planning and implementation slicing are provided by AI Workflow's `create-execution-plan` and `create-implementation-slices` skills.

## Installation

Install from the `agentic-marketplace` marketplace:

```bash
# Auggie
auggie plugin marketplace add https://github.com/JanMichaelSE/agentic-marketplace
auggie plugin install development@agentic-marketplace

# Codex
codex plugin marketplace add https://github.com/JanMichaelSE/agentic-marketplace
# Then enable `development` from `/plugins` inside Codex
```
