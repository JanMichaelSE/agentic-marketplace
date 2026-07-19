# GitHub

Installable plugin for GitHub CLI repository operations and repository-first GitHub Actions guidance.

## Skills

| Skill | Purpose | When to Use |
| --- | --- | --- |
| [github](skills/github/SKILL.md) | Use `gh` for repository, pull request, issue, workflow, and API operations | General GitHub operations, including private repositories |
| [github-actions](skills/github-actions/SKILL.md) | Design or update GitHub Actions workflows | CI/CD workflow creation and updates |

## Prerequisites

- Install the [GitHub CLI](https://cli.github.com/) and authenticate it before invoking `github` or using its repository-inspection commands.
- Verify access with `gh auth status`. Authentication is managed by `gh`; do not place credentials, tokens, or secrets in skill inputs, scripts, or documentation.
- For workflow work, inspect the target repository's existing `.github/workflows/` files and any established shared-actions catalog first.

## Installation

Install from this Agentic Marketplace repository. Substitute the repository URL if you use a fork or self-hosted mirror.

```bash
# Claude Code
claude plugin marketplace add JanMichaelSE/agentic-marketplace
claude plugin install github@agentic-marketplace

# Codex
codex plugin marketplace add https://github.com/JanMichaelSE/agentic-marketplace
# Then enable `github` from /plugins inside Codex.
```

## Workflow Guidance

- Reuse the target repository's established workflow names, jobs, action catalog, pinning policy, and deployment model.
- When no convention exists, prefer first-party GitHub actions and minimal repository-local jobs.
- Use least-privilege `permissions`, stable action versions, explicit deployment environments, and documented secret or variable requirements.
- The [GitHub Actions references](skills/github-actions/references/) provide generic security-scanning, workflow-example, and workflow-philosophy guidance.