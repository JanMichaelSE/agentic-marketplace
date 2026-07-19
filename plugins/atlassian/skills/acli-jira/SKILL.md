---
name: acli-jira
description: Use when a user wants to create, view, edit, search, comment on, link, assign, or transition Jira issues with the Atlassian CLI (acli). Covers safe ADF (Atlassian Document Format) content. Do not use for implementation, requirements analysis, design documents, or reviews that do not need a Jira operation.
---

# ACLI Jira

Use the externally installed `acli` CLI for Jira operations. Confirm the user's intended project, issue type, fields, and target issue before any mutation. Do not install or authenticate `acli` as part of this skill.

## Setup

Read [setup guidance](references/setup.md) before first use. `acli jira auth login --web` is the preferred interactive setup. The optional bundled read helper requires a separately configured API token; it never prints or persists that token.

## Common operations

```bash
# Inspect or search before mutating.
acli jira workitem view PROJ-123 --json
acli jira workitem search --jql "assignee = currentUser()" --fields "key,summary,status"

# Create or update after confirming the supplied values.
acli jira workitem create --project "PROJ" --type "Story" --summary "Concise title" --description "Plain text"
acli jira workitem transition --key PROJ-123 --status "In Progress"
```

Use `--from-json` for rich descriptions or comments. ADF must be a complete document object with root `type`, `version`, and non-empty `content`; plain Markdown is not a substitute. Read [ADF format](references/adf-format.md) before constructing or modifying rich text.

## Read helper

The bundled reader provides compact issue, search, and project output without encoding project-specific workflow semantics:

```bash
node ./scripts/jira-client.mjs issue PROJ-123
node ./scripts/jira-client.mjs search "assignee = currentUser()" --limit 10 --format json
node ./scripts/jira-client.mjs project PROJ
```

The helper resolves its shared library through a portable relative import. It is read-only; use `acli jira ...` for authorized writes.

## Mutation guardrails

- Fetch the issue first and preserve fields not explicitly approved for change.
- Use the site's configured issue types, statuses, link types, and fields; do not guess them.
- Create ADF JSON in a local, reviewed file. Check its structure before sending it.
- Never add a secret, access token, cookie, or private user data to an issue or comment.
- Treat parent, sprint, version, attachment, and bulk changes as higher-risk operations; read [advanced operations](references/advanced-operations.md) and confirm scope first.

## References

- [Setup and credential handling](references/setup.md)
- [ADF format](references/adf-format.md)
- [Advanced operations](references/advanced-operations.md)