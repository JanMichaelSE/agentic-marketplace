# Keychain

Cross-platform guidance for storing developer-laptop credentials in an OS-native secret store without placing their values in repositories, transcripts, command arguments, or output.

## Skills

| Skill | Purpose | When to Use |
| --- | --- | --- |
| [**macos-keychain-secrets**](skills/macos-keychain-secrets/SKILL.md) | Select and safely use a local secret store for a developer credential | A developer needs to store, rotate, or configure safe local use of a credential without disclosing its value |

## Supported local stores

| Platform | Preferred local store | Alternative |
| --- | --- | --- |
| macOS | Keychain Access / macOS Keychain | `security` only when it can be used without secret-bearing arguments or output |
| Linux | A desktop Secret Service implementation | `pass` when it is already configured for the developer |
| Windows | Credential Manager | A supported PowerShell credential API that does not disclose plaintext |

Use a stable `(service, account)` identifier for each entry. The identifier is metadata; the credential value is not. For example, `service` can identify the issuing system and `account` can identify the local user or non-sensitive scope.

## Scope and safety boundary

This plugin is for credentials used only on an individual developer laptop. It does not replace a production, shared, or auditable secrets manager. Use an approved secrets-management service for production, team-shared, deployment, or automation credentials.

The skill never asks an agent to create, retrieve, list, or rotate a real credential. Agents must not receive credential values or put them in chat, repository files, commands, environment dumps, logs, tickets, pull requests, or tool arguments.

## Installation

Install from the `agentic-marketplace` marketplace:

```bash
# Claude Code
claude plugin marketplace add JanMichaelSE/agentic-marketplace
claude plugin install keychain@agentic-marketplace

# Codex
codex plugin marketplace add https://github.com/JanMichaelSE/agentic-marketplace
# Then enable `keychain` from `/plugins` inside Codex.
```