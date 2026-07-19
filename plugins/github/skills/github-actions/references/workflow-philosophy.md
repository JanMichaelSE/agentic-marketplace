# CI/CD Workflow Philosophy

Understand each workflow stage before scaffolding it, then fit it to the target repository's lifecycle and deployment model.

## Concurrency

Use concurrency groups to cancel stale runs and reduce CI noise.

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.event.pull_request.number || github.ref }}
  cancel-in-progress: true
```

- Group pull-request workflows by pull request number.
- Group branch workflows by ref name.
- Consider `cancel-in-progress: false` for release workflows.

## Lifecycle Boundaries

| Workflow | Purpose | Typical responsibilities |
| --- | --- | --- |
| Pull request | Fast, reliable merge gating | Linting, tests, build verification, and non-deploying policy checks |
| Default branch | Post-merge publish or deployment | Rebuild trusted artifacts, publish packages, deploy with protection rules |
| Tag or release | Versioned publication | Validate release metadata, publish versioned artifacts, create releases |
| Branch delete | Resource cleanup | Remove preview or other branch-scoped resources when they exist |

Pull-request workflows should produce actionable feedback and must not deploy production resources. Main-branch workflows should rely on branch and environment protections. Use tag or release events when versioned publication differs from deployment.

## Deployment Environments

Use GitHub Environments when the repository has multiple targets or approval gates. Keep environment names aligned with the actual deployment model.

```yaml
jobs:
  deploy-test:
    environment: test
  deploy-production:
    needs: deploy-test
    environment: production
```

## Artifact Versioning

| Pattern | Example | Use |
| --- | --- | --- |
| Branch plus run | `feature-x-42` | Fast CI artifacts |
| Commit SHA | `sha-abc1234` | Immutable traceability |
| SemVer tag | `v1.2.3` | Published releases |
| SemVer plus metadata | `1.2.3+42` | Release with build trace |

Use immutable identifiers for downstream artifacts, avoid relying only on `latest`, and make release tagging explicit.

## Reusable Workflows and Repository-Local Jobs

Use repository-local jobs when build logic is unique, the workflow is short, or no shared catalog exists. Use reusable workflows when the repository already has approved common workflows or central governance matters more than local customization.

```yaml
jobs:
  test:
    uses: <owner>/<shared-workflows-repo>/.github/workflows/<workflow-file>@v2
    with:
      language: python
    secrets: inherit
```

Only use `secrets: inherit` when the called workflow needs broad secret access.

## Workflow Naming

| Event | Typical filename |
| --- | --- |
| Pull-request validation | `pr.yml` or `ci-pr.yml` |
| Default-branch deployment | `main.yml` or `deploy-main.yml` |
| Release or tag publishing | `release.yml` |
| Cleanup | `branch-delete.yml` |

For monorepos, prefix workflow files by component when that improves discovery.