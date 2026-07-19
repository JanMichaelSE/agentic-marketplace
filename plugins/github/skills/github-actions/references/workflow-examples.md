# Workflow Examples by Project Type

These examples are intentionally generic. Adapt package manager commands, runtime versions, deployment steps, registry targets, and branch names to the target repository.

## Python Application Pull Request

```yaml
name: PR

on:
  pull_request:

concurrency:
  group: ${{ github.workflow }}-${{ github.event.pull_request.number }}
  cancel-in-progress: true

permissions:
  contents: read

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - run: python -m pip install -U pip
      - run: pip install -r requirements.txt
      - run: pytest
```

## Terraform or OpenTofu Module

```yaml
name: Infrastructure CI

on:
  pull_request:
  push:
    branches: [<default-branch>]

permissions:
  contents: read

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3
      - run: terraform fmt -check -recursive
      - run: terraform init -backend=false
      - run: terraform validate
```

## Node Package

```yaml
name: Node CI

on:
  pull_request:

permissions:
  contents: read

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build --if-present
```

## Containerized Service

```yaml
name: Build and Push Image

on:
  push:
    branches: [<default-branch>]

permissions:
  contents: read
  packages: write

jobs:
  image:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: ghcr.io/<owner>/<image>:${{ github.sha }}
```

## Cloud Deployment Placeholder

```yaml
permissions:
  contents: read
  id-token: write

steps:
  - uses: actions/checkout@v4
  - name: Authenticate to cloud
    run: echo "Replace with the repository's approved cloud authentication step."
  - name: Deploy
    run: ./deploy.sh
```