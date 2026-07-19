# Plugin Scaffolding

Add each new installable marketplace plugin as its own directory under `plugins/`.

Every current plugin includes both client manifests so the repository remains compatible with Claude Code and Codex:

```text
plugins/<plugin-name>/
├── .codex-plugin/plugin.json
├── .claude-plugin/plugin.json
├── README.md
└── skills/
```

Each plugin README should document the marketplace-based enablement path for both clients using the Agentic Marketplace repository URL:

- Claude Code: add the marketplace, then run `claude plugin install <plugin-name>@agentic-marketplace`
- Codex: add the marketplace with `codex plugin marketplace add ...`, then enable the plugin from `/plugins` in Codex

Recommended commands:

```text
# Claude Code
claude plugin marketplace add JanMichaelSE/agentic-marketplace
claude plugin install <plugin-name>@agentic-marketplace

# Codex
codex plugin marketplace add https://github.com/JanMichaelSE/agentic-marketplace
# Then enable <plugin-name> from /plugins inside Codex
```

## Experimental Skills

If a skill is still being evaluated, place it under `plugins/experimental` first.

When importing a skill from a client-specific layout, convert it into the shared `plugins/<plugin>/skills/<skill-name>/` layout and keep any supporting reference files beside `SKILL.md`. That preserves compatibility with both Claude Code and Codex as long as the target plugin keeps both client manifests.

Once the skill has been tried by other users and the shape is stable, it can be promoted into a more permanent plugin group.

## Catalog Registration

When adding, removing, or renaming an installable plugin, update both root marketplace manifests, the root README skill map and catalog, the repository layout, and `AGENTS.md` in the same change. Both manifests must list exactly the installable plugin directories under `plugins/` and use the same plugin names and paths.
