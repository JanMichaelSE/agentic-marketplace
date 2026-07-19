# Security Scanning in GitHub Actions

Use security scanning patterns that fit the target repository. Do not assume an external approval gate or proprietary tool unless the repository already uses one.

## Common Layers

### Dependency scanning

- Enable Dependabot alerts and the dependency graph where available.
- Optionally run package-manager-native audits in CI, such as `npm audit --audit-level=high`, `pip-audit`, or `cargo audit`.

### Static analysis and code scanning

- Prefer GitHub Advanced Security or CodeQL when the repository already uses it.
- Otherwise use an approved static-analysis tool that fits the repository.

### Secret scanning

- Rely on GitHub secret scanning where available.
- Add pre-commit or CI checks only when required by the repository's policy.

### Container and filesystem scanning

- For containerized projects, scan images or the repository filesystem.
- Use the repository's approved scanner; Trivy is a common option when no convention exists.

## Where to Run Scans

- **Pull requests:** fast, non-destructive validation and blocking checks.
- **Main branch:** post-merge assurance and artifact scans.
- **Scheduled workflows:** slower or broader periodic scans.

## Merge Gates

- Keep merge requirements understandable and stable.
- Follow existing approval or gate patterns.
- Do not introduce a new external gate without explicit approval.

## Minimal CodeQL Example

```yaml
name: codeql

on:
  pull_request:
  push:
    branches: [main]

permissions:
  actions: read
  contents: read
  security-events: write

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: github/codeql-action/init@v3
        with:
          languages: python
      - uses: github/codeql-action/analyze@v3
```

## Minimal Filesystem Scan Example

```yaml
- uses: aquasecurity/trivy-action@0.24.0
  with:
    scan-type: fs
    scan-ref: .
    exit-code: '1'
    ignore-unfixed: true
```