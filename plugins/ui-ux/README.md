# UI/UX

Installable plugin for data-backed interface design intelligence across web and mobile products.

## Skills

| Skill | Purpose | When to Use |
|------|---------|-------------|
| **ui-ux-pro-max** | Search UI/UX guidance for styles, product patterns, colors, typography, accessibility, motion, charts, and implementation stacks | Designing, building, or reviewing product interfaces and frontend experiences |
| **figma-mcp** | Implement or compare UI against Figma designs through an available MCP integration | Building Figma-backed UI, extracting design tokens, or checking visual parity |

## Included Bundle

`ui-ux-pro-max` is self-contained: its searchable data sets, standard-library Python search tools, design-system generator, reference guidance, and tests are bundled beside `SKILL.md`. It has no external Python package dependencies.

The bundle includes 79 searchable styles (88 catalog entries, including 9
deprecated entries), 192 product profiles and palettes, 74 font pairings, 1,934
Google Fonts, 105 curated icons, 119 UX guidelines, 17 motion presets, and 25
chart types across 22 stacks. Catalog provenance, font-license metadata, and
version/status information accompany the searchable guidance.

Synced from upstream [revision 67803ea](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/tree/67803ea). The marketplace retains
its shared Codex/Claude skill layout and separate references. Upstream installer,
gallery, catalog-refresh tooling, and unrelated skills are not bundled. A local
search correction prefers a unique guideline title for API identifiers such as
`useActionState` when related rows contain incidental mentions.

Validate locally with:

```bash
python3 plugins/ui-ux/skills/ui-ux-pro-max/scripts/validate_data.py
python3 -m unittest discover -s plugins/ui-ux/skills/ui-ux-pro-max/scripts/tests
```


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
