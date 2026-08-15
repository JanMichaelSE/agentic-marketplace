# UI/UX

Installable plugin for data-backed interface design intelligence across web and mobile products.

## Skills

| Skill | Purpose | When to Use |
|------|---------|-------------|
| **ui-ux-pro-max** | Search UI/UX guidance for styles, product patterns, colors, typography, accessibility, motion, charts, and implementation stacks | Designing, building, or reviewing product interfaces and frontend experiences |
| **figma-mcp** | Implement or compare UI against Figma designs through an available MCP integration | Building Figma-backed UI, extracting design tokens, or checking visual parity |

## Included Bundle

`ui-ux-pro-max` is self-contained: its searchable data sets, standard-library Python search tools, design-system generator, reference guidance, and tests are bundled beside `SKILL.md`. It has no external Python package dependencies.

`figma-mcp` is optional at runtime and requires user-configured Figma MCP access only for live design data; exported context or screenshots can be used when it is unavailable. `ui-ux-pro-max` remains useful without Figma access.

## Installation

Install from the `agentic-marketplace` marketplace:

```bash
# Claude Code
claude plugin marketplace add JanMichaelSE/agentic-marketplace
claude plugin install ui-ux@agentic-marketplace

# Codex
codex plugin marketplace add https://github.com/JanMichaelSE/agentic-marketplace
# Then enable `ui-ux` from `/plugins` inside Codex
```
