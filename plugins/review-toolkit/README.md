# Review Toolkit

Installable plugin for code, design, security, review-lifecycle, test-coverage, and test-correctness review workflows.

## Skill Suite

| Skill | Purpose | Coupling |
|-------|---------|----------|
| **design-principles-review** | Review code for SOLID, abstraction quality, modularity, and design-pattern fit | Soft-coupled |
| **requirements-to-tests-traceability** | Map governing requirements and acceptance criteria to executable tests | Soft-coupled |
| **test-coverage-review** | Review whether changed tests cover changed code and likely regression paths | Standalone |
| **test-correctness-review** | Review whether tests are correctly implemented and actually prove the behavior they claim | Standalone |
| **security-review** | Review changed code for evidence-backed security vulnerabilities and sensitive-data exposure | Standalone |
| **multi-agent-code-review** | Orchestrate a parallel review by spawning one sub-agent per review point | Standalone |
| **orchestrated-review** | Run a bundled review suite combining all review lenses and preserve each output | Hard-coupled |
| **draft-code-review-comment** | Turn an agreed review concern into a concise, paste-ready PR comment | Standalone |
| **pr-comment-addressed-check** | Decide whether an existing PR review comment has been addressed | Standalone |

## Prerequisites

This plugin works on its own for diff, PR, and test-review workflows.
For best results with context-repo, TDD, and formal design-review inputs, also enable:

- Marketplace: `ai-marketplace`
- Plugin: `agentic-sdlc`

Optional companion dependency applies most directly to:

- `design-principles-review`
- `requirements-to-tests-traceability`

`security-review` is fully standalone and includes a [local security checklist](skills/security-review/references/security-checklist.md). `orchestrated-review` requires `ai-marketplace/agentic-sdlc` for its remaining external review lenses. The skill will detect missing dependencies at invocation time and alert you before proceeding.

## Installation

Install from the `agentic-marketplace` marketplace:

```bash
# Claude Code
claude plugin marketplace add JanMichaelSE/agentic-marketplace
claude plugin install review-toolkit@agentic-marketplace

# Codex
codex plugin marketplace add https://github.com/JanMichaelSE/agentic-marketplace
# Then enable `review-toolkit` from `/plugins` inside Codex
```
