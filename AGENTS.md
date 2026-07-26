# Agent Instructions

## Keep Navigation Updated

- Keep the `README.md` `Contents` section updated when adding, removing, renaming, or moving any top-level section.
- When adding, removing, renaming, or moving any plugin or skill, update the compact `README.md` skill map and plugin catalog in the same change.
- Keep `README.md` links pointed at the actual plugin `README.md` files, skill `SKILL.md` files, and specialist subagent files.
- Keep `.agents/plugins/marketplace.json` and `.claude-plugin/marketplace.json` aligned with the plugin folders under `plugins/`.
- If a plugin README contains its own skill table, update it when that plugin's skills change.

## Repository Purpose

This repository is the Agentic Marketplace for agent plugins and skills. It supports both Codex and Claude Code.

The top-level README is the human-facing catalog. It should make the repo easy to browse without requiring users to understand the nested plugin folder structure first.

## Repository Structure

```text
agentic-marketplace/
├── .agents/plugins/marketplace.json   # Codex marketplace manifest
├── .claude-plugin/marketplace.json    # Claude Code marketplace manifest
├── plugins/
│   ├── README.md                      # Plugin scaffold guidance
│   ├── <plugin-name>/
│   │   ├── .codex-plugin/plugin.json
│   │   ├── .claude-plugin/plugin.json
│   │   ├── README.md
│   │   └── skills/
│   │       └── <skill-name>/
│   │           └── SKILL.md
└── README.md
```

Current plugin groups:

- `plugins/ai-workflow/` contains plan grilling, domain-aware decision capture, execution planning, implementation slicing, local orchestration, bounded implementation, refactoring, review, repair, Jira-native sync, publishing, and change-summary handoff workflow skills.
- `plugins/atlassian/` contains vendor-neutral Jira lifecycle and read-oriented Confluence research skills.
- `plugins/development/` contains planning, design, implementation, Figma-backed UI, local web testing, simplification, and handoff workflow skills.
- `plugins/experimental/` contains preview skills that are still gathering feedback.
- `plugins/github/` contains GitHub CLI repository-operation and GitHub Actions workflow guidance.
- `plugins/infrastructure/` contains AWS, Kubernetes, Terraform, and cloud guidance skills.
- `plugins/keychain/` contains cross-platform developer-laptop credential-storage guidance.
- `plugins/review-toolkit/` contains code, design, security, test-coverage, test-correctness, and orchestrated review skills.
- `plugins/software-architecture/` contains architecture vocabulary, domain modeling, and architecture-improvement guidance.
- `plugins/ui-ux/` contains data-backed UI/UX design intelligence for web and mobile interface design, implementation, and review.

## How Plugins Work

Each installable marketplace plugin is a grouped unit under `plugins/<plugin-name>/`.

Each installable marketplace plugin should contain:

- `.codex-plugin/plugin.json` for Codex plugin metadata.
- `.claude-plugin/plugin.json` for Claude Code plugin metadata.
- `README.md` describing the plugin and its included skills.
- `skills/<skill-name>/SKILL.md` files containing the actual skill instructions.

The root marketplace manifests point clients at the plugin folders:

- `.agents/plugins/marketplace.json` lists plugins for Codex.
- `.claude-plugin/marketplace.json` lists plugins for Claude Code.

Do not create one top-level plugin folder per skill unless the marketplace structure changes. Prefer grouped plugin folders such as `deployments`, `infrastructure`, `java-service-patterns`, and `review-toolkit`, with related skills nested below `skills/`.

All current plugins support both clients and use the shared `skills/` layout.

## Skill Files

Every skill directory should include a `SKILL.md` with YAML front matter:

```markdown
---
name: skill-name
description: Short trigger and usage description.
---
```

The `name` should match the skill directory name. The `description` should be specific enough for an agent to know when to invoke it.

## Documentation Expectations

When changing marketplace contents:

- Add or update links in the root `README.md` skill map and plugin catalog.
- Add or update the root `README.md` table of contents when sections change.
- Add or update the plugin's own `README.md` table.
- Keep descriptions short and action-oriented.
- Keep the root README compact enough that readers can scan all plugins and skills quickly; put detailed descriptions in plugin READMEs or `SKILL.md` files.
- Prefer relative Markdown links so the docs work on GitHub and in local checkouts.
- Keep examples generic unless a command is known to be stable for both clients.

## Validation

Before finishing a documentation or structure change, run:

```bash
git diff --check
```

Also confirm any new links point at files that exist in this checkout.
