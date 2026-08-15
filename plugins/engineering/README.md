# Engineering

Installable plugin for stable cross-stack planning, implementation, discovery, diagnostics, prototyping, local web testing, code simplification, and merge-resolution guidance.

For execution planning and implementation slicing, use AI Workflow's [create-execution-plan](../ai-workflow/skills/create-execution-plan/SKILL.md) and [create-implementation-slices](../ai-workflow/skills/create-implementation-slices/SKILL.md).

## Skills

### Discovery and Planning

| Skill | Purpose | When to Use |
|------|---------|-------------|
| **inception-planning** | Guide requirements analysis, scoping, and solution design | Starting a feature or refining requirements |
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
| **webapp-testing** | Test a local web application with Playwright scripts and inspection assets | Verifying frontend behavior or debugging UI |

## Dependency Notes

- `tdd` is self-contained for behavior testing. When the `software-architecture` plugin is installed, it may consult `codebase-design` and `domain-modeling` as the canonical architecture and domain guidance; their absence does not block TDD.
- `simplify-code` is self-contained and works with the host project's existing language, formatter, and test commands.
- `webapp-testing` requires a user-approved local application plus preinstalled Python, Playwright, and browser binaries. Its helper, examples, and Apache-2.0 license are bundled beside the skill.
- Execution planning and implementation slicing are provided by AI Workflow's `create-execution-plan` and `create-implementation-slices` skills.

## Installation

Install from the `agentic-marketplace` marketplace:

```bash
# Claude Code
claude plugin marketplace add JanMichaelSE/agentic-marketplace
claude plugin install engineering@agentic-marketplace

# Codex
codex plugin marketplace add https://github.com/JanMichaelSE/agentic-marketplace
# Then enable `engineering` from `/plugins` inside Codex
```
