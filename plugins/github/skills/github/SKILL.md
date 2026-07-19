---
name: github
description: MUST invoke when the user needs GitHub operations or GitHub API access. Trigger phrases include "gh", "GitHub", "pull request", "PR", "issue", "repo", and "workflow". Use authenticated gh for GitHub URLs and private repository access. Do NOT invoke for creating or modifying GitHub Actions workflows; use github-actions instead.
---

# GitHub CLI

Use the GitHub CLI (`gh`) to interact with repositories and GitHub resources.

## Prerequisite and Safety Boundary

- Confirm `gh` is installed and authenticated with `gh auth status` before repository operations. Let `gh` manage authentication; never handle, print, or persist credentials yourself.
- Use `gh` rather than unauthenticated web requests for GitHub URLs when private repository access is needed.
- Ask for confirmation before state-changing operations such as creating, editing, merging, or deleting GitHub resources when the user has not explicitly requested them.
- Use explicit `<owner>/<repo>` arguments outside a checked-out repository. Do not assume an organization, GitHub host, default branch, reviewer, or deployment environment.

## Repository Commands

### List repositories

```bash
gh repo list <owner> --limit 100
gh repo list <owner> --json name,description,visibility,updatedAt
gh repo list <owner> --visibility public
```

### View repository details and branches

```bash
gh repo view <owner>/<repo>
gh repo view <owner>/<repo> --json name,description,defaultBranchRef,visibility
gh repo view <owner>/<repo> --readme
gh api repos/<owner>/<repo>/branches --jq '.[].name'
```

## Pull Requests

### List and view

```bash
gh pr list --repo <owner>/<repo>
gh pr list --repo <owner>/<repo> --state all --json number,title,state,author
gh pr view <number> --repo <owner>/<repo>
gh pr view <number> --repo <owner>/<repo> --json title,body,state,reviews
```

### Create with a body file

For Markdown, tables, or backticks, use `--body-file` rather than an inline shell argument.

```bash
cat > /tmp/pr-body.md << 'EOF'
## Summary

- Describe the change.
EOF

gh pr create --title "Describe the change" --body-file /tmp/pr-body.md --base <base-branch>
```

An inline body is appropriate only for simple text that has been safely quoted. Use a blank line before a Markdown table so it renders correctly.

### Edit a pull request description

```bash
gh pr edit <number> --repo <owner>/<repo> --body-file /tmp/pr-body.md
```

## Issues

```bash
gh issue list --repo <owner>/<repo>
gh issue list --repo <owner>/<repo> --state all --json number,title,state
gh issue view <number> --repo <owner>/<repo>
```

## GitHub Actions Inspection

Use `github-actions` to design or change workflow files. Use these commands to inspect existing workflows and runs.

```bash
gh workflow list --repo <owner>/<repo>
gh run list --repo <owner>/<repo>
gh run list --repo <owner>/<repo> --workflow <workflow-name>
gh run view <run-id> --repo <owner>/<repo>
gh run view <run-id> --repo <owner>/<repo> --log
```

## Secrets Metadata (Read-only)

These commands list secret names only; secret values are not available through GitHub.

```bash
gh secret list --repo <owner>/<repo>
gh secret list --org <owner>
```

## API Access

Use `gh api` for advanced queries or private repository content.

```bash
gh api repos/<owner>/<repo>
gh api repos/<owner>/<repo>/commits --jq '.[].sha'
gh api repos/<owner>/<repo>/actions/runs --jq '.workflow_runs[].name'
gh api repos/<owner>/<repo>/commits --paginate --jq '.[].sha'
```

### View a repository file

```bash
gh api repos/<owner>/<repo>/contents/<path> --jq '.content' \
  | python3 -c 'import base64, sys; sys.stdout.write(base64.b64decode(sys.stdin.read()).decode())'
```

```bash
gh api "repos/<owner>/<repo>/contents/<path>?ref=<branch>" --jq '.content' \
  | python3 -c 'import base64, sys; sys.stdout.write(base64.b64decode(sys.stdin.read()).decode())'
```

### GraphQL query

```bash
gh api graphql -f query='
  query {
    repository(owner: "<owner>", name: "<repo>") {
      name
      description
      defaultBranchRef { name }
    }
  }
'
```

## Common Patterns

```bash
# Check whether a repository is accessible.
gh repo view <owner>/<repo> --json name 2>/dev/null && echo "exists" || echo "not found"

# Get the latest commit on the repository's default branch.
DEFAULT_BRANCH=$(gh repo view <owner>/<repo> --json defaultBranchRef --jq '.defaultBranchRef.name')
gh api repos/<owner>/<repo>/commits/$DEFAULT_BRANCH --jq '.sha'
```

## Related Skills

- Use `github-actions` to scaffold or update CI/CD workflows.
- Use repository-local review and release guidance for actions that create, merge, publish, or deploy.