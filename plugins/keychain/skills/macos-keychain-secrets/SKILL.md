---
name: macos-keychain-secrets
description: MUST invoke when selecting, storing, rotating, or safely consuming a developer-laptop credential through macOS Keychain, a Linux secret store, or Windows Credential Manager. Use when a credential must stay out of transcripts, command arguments, output, and repository files. Do NOT invoke to access a real secret, manage production or shared secrets, or replace a CLI's built-in credential store.
---

# Local Secret Store Guidance

Use this skill to plan safe, local handling of a developer credential. It is guidance only: do not invoke credential tools or ask the developer to reveal a credential value.

## Scope boundary

Use an OS-native store only for an individual developer laptop. Production, deployment, shared, service, or auditable credentials belong in an approved secrets-management service. Prefer a tool's built-in authenticated session when it has one; do not copy its credential into another store without a clear need.

## Non-negotiable rules

- Never request, receive, print, log, compare, or persist a credential value.
- Never place a value in a command argument, shell history, transcript, repository file, ticket, pull request, or diagnostic output.
- Never inspect, enumerate, or change existing credential entries on the developer's behalf.
- Stop if safe value handling is unavailable; do not fall back to a plaintext file, `.env` file, or shell export.
- Treat an accidental value disclosure as a security incident: stop, avoid repeating it, and direct the developer to revoke or rotate the credential through its issuing service.

## Choose a local store

| Platform | Primary choice | Supported alternative | Developer action |
| --- | --- | --- | --- |
| macOS | Keychain Access or macOS Keychain | `security` only for non-secret metadata or an interaction that does not expose the value | The developer performs the sensitive entry locally. |
| Linux | Desktop Secret Service | `pass` when already configured by the developer | The developer uses the existing local secret-store workflow. |
| Windows | Credential Manager | A supported PowerShell credential API that preserves secure input | The developer performs the sensitive entry locally. |

Do not install a secret-store package or module as part of this skill. If no suitable local store is available, ask the developer to choose and configure one outside this workflow.

## Naming and lifecycle

Identify an entry with a non-sensitive `(service, account)` pair:

- `service`: the system the credential authenticates to.
- `account`: the developer identity or non-sensitive local scope.

Record only these identifiers and any non-sensitive expiration reminder. The agent can help prepare a rotation checklist, but the developer must reissue the remote credential and update the local entry without revealing the value.

## Safe consumption

Before a credential is used, confirm that the consuming application supports a value-safe mechanism, such as its own credential-store integration, secure interactive input, or a documented protected handoff. The mechanism must not place the value in command-line arguments, output, or a repository file.

If a tool requires the value to be displayed, copied into a command, committed to a file, or passed through an agent transcript, stop and select a safer integration or ask the tool owner for one.

## Response checklist

1. Confirm the credential is limited to a developer laptop and is not shared or production-scoped.
2. Choose the platform's local store and a non-sensitive `(service, account)` identifier.
3. Direct the developer to perform sensitive entry or rotation locally without sharing the value.
4. Confirm the consuming tool has a value-safe integration.
5. Report only the chosen store, identifier, and next safe action; never report credential content or store output.