---
name: handoff
description: Create a concise, redacted temporary handoff for a user or another workflow to continue in a new session.
argument-hint: "What will the next session be used for?"
---

# Handoff

Create a concise handoff document when requested by a user or another workflow. A workflow invocation has the same safety requirements as a user invocation.

## Safety First

Before drafting, persisting, or displaying any handoff content, remove or replace sensitive data. This includes secrets, credentials, tokens, passwords, private keys, session data, and personally identifiable information (PII). Never request or dump sensitive input with the intent to redact it later.

If the available context cannot be safely summarized without exposing sensitive data, omit the sensitive detail and state only the safe next action or reference. Do not include raw logs, environment output, credentials, or private session data.

## Create the Handoff

1. Treat any existing PRDs, plans, ADRs, issues, commits, diffs, implementation summaries, and other artifacts as references. Link to them by local path or URL; do not copy their content into the handoff.
2. Use the host operating system's standard secure temporary-file facility. Do not require a platform-specific shell command. Create the temporary file before writing and retain its returned path.
3. When the temporary-file facility pre-creates the file, read it before editing to confirm the target is the expected temporary file. Then write only the redacted handoff.
4. Keep the handoff focused on the current state, safe next actions, unresolved decisions or blockers, and artifact references.

If the user passed arguments, treat them as the next session's focus and tailor the handoff accordingly.

## Final Response

Report the exact temporary handoff path. Also suggest the next-session skills that fit the safe next action, if any; otherwise state that no additional skill is suggested.
