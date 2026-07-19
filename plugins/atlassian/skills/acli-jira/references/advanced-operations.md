# Advanced ACLI Operations

Use advanced operations only after inspecting the current issue, available site metadata, and the user's intended scope. Command availability changes across `acli` releases, so check `acli jira --help` and the relevant subcommand help first.

## Rich description updates

1. Fetch the issue as JSON and save the current description locally.
2. Modify a copy of the ADF document using a JSON-aware tool.
3. Wrap the updated ADF in the current `acli` edit input shape.
4. Review the exact target and changed fields, then submit with `--from-json`.
5. Re-fetch the issue to verify the intended structured content.

## Hierarchy, versions, and sprints

Parent relationships, versions, sprints, boards, and custom fields vary by site and may require REST APIs beyond the installed CLI's capabilities. Before changing any of them:

- confirm the target issue and the user's intended outcome;
- retrieve the site's actual identifiers and allowed values;
- use an approved, least-privilege authentication path;
- preserve unrelated fields and verify the response afterward.

Do not substitute a generic issue link for a true hierarchy relationship without telling the user; the two have different behavior in Jira.

## Bulk and destructive actions

Bulk assignments, transitions, archive operations, watcher changes, and attachment deletion can affect many users or issues. Preview the target set first, require an explicit confirmation of the final scope, and report the resulting keys. Do not perform these actions merely because a query could select them.