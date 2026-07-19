---
name: github-actions
description: MUST invoke when the user needs to create or modify GitHub Actions workflows. Trigger phrases include "GitHub Actions", "CI/CD pipeline", "workflow file", "create workflow", "Docker build workflow", "Python test workflow", and "Helm deploy". Use for workflows with first-party actions, repository-local jobs, or an established shared-actions catalog. Do NOT invoke for general gh commands or workflow-run inspection; use github instead.
---

# GitHub Actions Workflow Design

Use this skill when creating or modifying GitHub Actions workflows. It is repository-agnostic:

- Prefer the target repository's existing workflow conventions.
- Prefer first-party GitHub actions when no established convention exists.
- Reuse shared actions or reusable workflows only when the repository already uses them or the user explicitly requests them.

## Inputs to Gather First

Before proposing a workflow, identify:

1. Language, build system, package manager, and test commands.
2. Deployment target, if any.
3. Triggers: pull request, push, tag, release, schedule, dispatch, or delete.
4. Required secrets, variables, and environments.
5. Existing `.github/workflows/`, action pinning policy, shared-action catalog, and branch-protection conventions.

## Discover Existing Workflows

Inspect existing patterns before introducing new ones.

```bash
gh api repos/<owner>/<repo>/contents/.github/workflows --jq '.[].name'
gh api repos/<owner>/<repo>/contents/.github/workflows/<workflow-file> --jq '.content' \
  | python3 -c 'import base64, sys; sys.stdout.write(base64.b64decode(sys.stdin.read()).decode())'
gh repo view <owner>/<repo> --readme
```

If the repository already references a shared actions or reusable-workflows catalog, inspect that catalog rather than guessing.

```bash
gh api repos/<owner>/<shared-actions-repo>/contents/actions --jq '.[].name'
gh api repos/<owner>/<shared-actions-repo>/contents/.github/workflows --jq '.[].name'
```

## Version Pinning

```yaml
# First-party GitHub actions
uses: actions/checkout@v4
uses: actions/setup-python@v5

# Established reusable workflow or custom action
uses: <owner>/<shared-workflows-repo>/.github/workflows/<workflow-file>@v2
uses: <owner>/<shared-actions-repo>/actions/<action-name>@v2
```

- Prefer stable major tags for trusted first-party actions.
- Follow the repository's policy for third-party actions; use full commit SHAs when immutable pinning is required.
- Do not use mutable branch references such as `@main` in production workflows.

## Permissions

Default to least privilege.

```yaml
# Read-only CI
permissions:
  contents: read

# OIDC deployment
permissions:
  contents: read
  id-token: write
```

Grant write permissions only to the specific workflow that needs them.

## Common Workflow Patterns

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.event.pull_request.number || github.ref }}
  cancel-in-progress: true
```

- Pull-request workflows provide fast validation without deployment.
- Main-branch workflows publish artifacts or deploy after merge.
- Tag or release workflows provide versioned publication.
- Delete workflows clean up branch-scoped resources only when those resources exist.

## Variables, Secrets, and Environments

- Store non-secret configuration in repository or organization variables.
- Store credentials and tokens in GitHub secrets; never print or write their values.
- Use GitHub Environments for deployment protection rules and environment-specific values.
- Give reusable workflows only the secrets they need; use `secrets: inherit` only when broad access is necessary.
- Document required variables and secrets in repository documentation.

## References

- Read [security-scanning.md](references/security-scanning.md) for dependency, code, container, and secret scanning guidance.
- Read [workflow-philosophy.md](references/workflow-philosophy.md) for triggers, environments, concurrency, and release boundaries.
- Read [workflow-examples.md](references/workflow-examples.md) for generic Python, Terraform/OpenTofu, Node, and container workflow examples.

## Scaffolding Checklist

1. Triggers match the repository lifecycle.
2. Permissions are minimal for each workflow.
3. Setup and caching match the language and package manager.
4. Required secrets, variables, and environments are documented.
5. Action pinning follows repository policy.
6. Branch and environment protections match deployment risk.
7. Security scanning fits the existing toolchain without adding an unapproved gate.
8. Reusable actions and workflows come from repository-local or approved sources.