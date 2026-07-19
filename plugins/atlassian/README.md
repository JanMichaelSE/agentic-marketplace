# Atlassian

Dual-client, vendor-neutral skills for Jira operations and read-oriented Confluence research.

## Skills

| Skill | Purpose | When to use |
| --- | --- | --- |
| [**acli-jira**](skills/acli-jira/SKILL.md) | Create, inspect, update, and transition Jira issues with ADF-safe guidance | A user requests a Jira lifecycle operation |
| [**confluence-research**](skills/confluence-research/SKILL.md) | Inspect Confluence pages or spaces and parse local snapshots | Confluence is source material for a plan, document, or analysis |

## Installation

Install from this marketplace using its HTTPS repository URL:

```bash
# Auggie
auggie plugin marketplace add https://github.com/JanMichaelSE/agentic-marketplace
auggie plugin install atlassian@agentic-marketplace

# Codex
codex plugin marketplace add https://github.com/JanMichaelSE/agentic-marketplace
# Then enable `atlassian` from /plugins in Codex.
```

## Prerequisites and Safety

- Install and authenticate the external `acli` CLI before using `acli-jira` mutation commands. The plugin does not install or authenticate it.
- The bundled Node 18+ helpers use `ATLASSIAN_SITE`, `ATLASSIAN_EMAIL`, and an API token supplied by the process environment or (on macOS) the configured Keychain service. Do not place secrets in commands, files, prompts, or logs.
- `confluence-research` is read-oriented. It does not create, update, or bulk-mirror Confluence content.
- Snapshots default to the operating system temporary directory. Commit a snapshot only when the receiving repository explicitly requires reviewed source evidence.

## Layout

```text
plugins/atlassian/
├── .augment-plugin/plugin.json
├── .codex-plugin/plugin.json
├── README.md
├── scripts/lib/
│   ├── atlassian-rest.mjs
│   └── confluence-storage.mjs
└── skills/
    ├── acli-jira/
    │   ├── SKILL.md
    │   ├── references/
    │   └── scripts/jira-client.mjs
    └── confluence-research/
        ├── SKILL.md
        └── scripts/confluence-client.mjs
```