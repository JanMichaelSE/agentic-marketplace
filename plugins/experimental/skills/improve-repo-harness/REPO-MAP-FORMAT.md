# Repository Map Format

Use a repository map only after the user selects one and exploration shows a
navigation gap. Keep it short, evidence-based, and anchored in existing paths.
It is a route to authoritative material, not an inventory or a replacement for
local documentation.

## Suggested shape

```markdown
## Repository map

| Need | Start here | Authoritative detail |
|---|---|---|
| Agent guidance | `AGENTS.md` | Linked local guidance |
| Product or service code | `<observed path>` | Nearby module documentation |
| Tests | `<observed path>` | Existing test guidance |
| Validation | `<observed entry point>` | Existing command documentation |
| Bootstrap | `<observed documentation>` | Existing prerequisite guidance |
| Domain conventions | `<observed documentation>` | CONTEXT and ADR locations |
```

Replace every placeholder with a verified repository path or omit that row.
Link to the owner of a fact instead of copying commands, policies, or detailed
module descriptions into the map.

## Placement

Prefer an existing agent front door or documentation index when it can hold a
short map without obscuring its primary purpose. Otherwise ask the user to
choose the existing navigation document that should own it. Keep one map per
navigation scope and revise it when its linked structure changes.

See [HARNESS-RUBRIC.md](HARNESS-RUBRIC.md) for the evidence threshold and
[SKILL.md](SKILL.md) for confirmation requirements.