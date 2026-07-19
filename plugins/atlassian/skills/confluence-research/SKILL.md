---
name: confluence-research
description: Use when a user wants to fetch, inspect, summarize, or map Confluence pages or spaces. Reads through the Confluence REST API, saves optional local snapshots, and extracts metadata, headings, sections, tables, links, and readable text without hand-written curl pipelines.
---

# Confluence Research

Use the bundled client to inspect Confluence material that informs plans, requirements, documentation, or architecture. This skill is read-oriented: it does not create or update pages and must not bulk-mirror a space into a repository.

## Prerequisites

The Node 18+ client requires a site and account identity, configured through `ATLASSIAN_SITE` and `ATLASSIAN_EMAIL` or inferred from an existing `acli` profile. It reads an API token only from the current process environment or, on macOS, the configured Keychain service. Obtain and store credentials using an approved local mechanism; never paste a token into commands, source files, prompts, or snapshots.

## Commands

```bash
# Fetch structured page or space information.
node ./scripts/confluence-client.mjs page 123456
node ./scripts/confluence-client.mjs page 123456 --format json
node ./scripts/confluence-client.mjs space DOCS

# Snapshot once, then parse the same saved version locally.
node ./scripts/confluence-client.mjs snapshot 123456
node ./scripts/confluence-client.mjs get "$SNAPSHOT" --field headings
node ./scripts/confluence-client.mjs get "$SNAPSHOT" --field section --heading "Overview"
```

`snapshot` writes outside the repository under the operating system temporary directory unless `--out` or `CONFLUENCE_SNAPSHOT_DIR` is explicitly supplied. `get` reads a saved snapshot without making a network call.

Supported `get --field` values are `meta`, `compact`, `text`, `headings`, `tables`, `links`, `section`, and `raw`. Use `--format json` for downstream processing.

## Research guardrails

- Record the page title, ID, version, and the local artifact it informs.
- Snapshot before substantial analysis so extracted data derives from one page version.
- Re-fetch time-sensitive source material before publishing a high-impact conclusion.
- Keep extracted evidence focused. Do not reproduce large page bodies when a concise citation and synthesis is sufficient.
- Do not commit raw snapshots without explicit repository approval.