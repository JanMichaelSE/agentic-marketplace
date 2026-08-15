# Agentic Marketplace

Agentic plugins and skills for Codex and Claude Code.

## Table of Contents

- [Installation](#installation)
  - [Claude Code](#claude-code)
  - [Codex](#codex)
- [Skill Map](#skill-map)
- [Plugin Catalog](#plugin-catalog)
- [Repository Layout](#repository-layout)
- [Contributing](#contributing)

## Installation

### Claude Code

1. Add the marketplace first:

```bash
claude plugin marketplace add JanMichaelSE/agentic-marketplace
```

2. Then install the plugins you want:

```bash
claude plugin install ai-workflow@agentic-marketplace
claude plugin install atlassian@agentic-marketplace
claude plugin install engineering@agentic-marketplace
claude plugin install experimental@agentic-marketplace
claude plugin install github@agentic-marketplace
claude plugin install infrastructure@agentic-marketplace
claude plugin install keychain@agentic-marketplace
claude plugin install productivity@agentic-marketplace
claude plugin install review-toolkit@agentic-marketplace
claude plugin install software-architecture@agentic-marketplace
claude plugin install ui-ux@agentic-marketplace
```

Use `/plugin` in Claude Code to inspect installed plugins, enable or disable them, and refresh the marketplace.

### Codex

1. Add the marketplace first:

```bash
codex plugin marketplace add https://github.com/JanMichaelSE/agentic-marketplace
```

2. Then install the plugins you want:

```bash
codex plugin add ai-workflow@agentic-marketplace
codex plugin add atlassian@agentic-marketplace
codex plugin add engineering@agentic-marketplace
codex plugin add experimental@agentic-marketplace
codex plugin add github@agentic-marketplace
codex plugin add infrastructure@agentic-marketplace
codex plugin add keychain@agentic-marketplace
codex plugin add productivity@agentic-marketplace
codex plugin add review-toolkit@agentic-marketplace
codex plugin add software-architecture@agentic-marketplace
codex plugin add ui-ux@agentic-marketplace
```

Use `/plugins` in Codex to inspect and enable installed plugins.

## Skill Map

Detailed purpose and usage notes live in the plugin README and each `SKILL.md`. For execution planning and implementation slicing, use [create-execution-plan](plugins/ai-workflow/skills/create-execution-plan/SKILL.md) and [create-implementation-slices](plugins/ai-workflow/skills/create-implementation-slices/SKILL.md).

| Plugin | Skills and agents |
|------|-------------------|
| [ai-workflow](plugins/ai-workflow/README.md) | [grill-me](plugins/ai-workflow/skills/grill-me/SKILL.md), [grill-with-docs](plugins/ai-workflow/skills/grill-with-docs/SKILL.md), [create-execution-plan](plugins/ai-workflow/skills/create-execution-plan/SKILL.md), [create-implementation-slices](plugins/ai-workflow/skills/create-implementation-slices/SKILL.md), [run-workflow](plugins/ai-workflow/skills/run-workflow/SKILL.md), [jira-plan-import](plugins/ai-workflow/skills/jira-plan-import/SKILL.md), [jira-plan-sync](plugins/ai-workflow/skills/jira-plan-sync/SKILL.md), [jira-checkpoint-sync](plugins/ai-workflow/skills/jira-checkpoint-sync/SKILL.md), [implement-scope](plugins/ai-workflow/skills/implement-scope/SKILL.md), [refactor](plugins/ai-workflow/skills/refactor/SKILL.md), [review](plugins/ai-workflow/skills/review/SKILL.md), [repair-findings](plugins/ai-workflow/skills/repair-findings/SKILL.md), [summarize-changes](plugins/ai-workflow/skills/summarize-changes/SKILL.md), [publish-draft-pr](plugins/ai-workflow/skills/publish-draft-pr/SKILL.md) |
| [atlassian](plugins/atlassian/README.md) | [acli-jira](plugins/atlassian/skills/acli-jira/SKILL.md), [confluence-research](plugins/atlassian/skills/confluence-research/SKILL.md) |
| [engineering](plugins/engineering/README.md) | [inception-planning](plugins/engineering/skills/inception-planning/SKILL.md), [research](plugins/engineering/skills/research/SKILL.md), [construction-implementation](plugins/engineering/skills/construction-implementation/SKILL.md), [tdd](plugins/engineering/skills/tdd/SKILL.md), [prototype](plugins/engineering/skills/prototype/SKILL.md), [diagnosing-bugs](plugins/engineering/skills/diagnosing-bugs/SKILL.md), [resolving-merge-conflicts](plugins/engineering/skills/resolving-merge-conflicts/SKILL.md), [simplify-code](plugins/engineering/skills/simplify-code/SKILL.md), [webapp-testing](plugins/engineering/skills/webapp-testing/SKILL.md) |
| [experimental](plugins/experimental/README.md) | [improve-repo-harness](plugins/experimental/skills/improve-repo-harness/SKILL.md) |
| [github](plugins/github/README.md) | [github](plugins/github/skills/github/SKILL.md), [github-actions](plugins/github/skills/github-actions/SKILL.md) |
| [infrastructure](plugins/infrastructure/README.md) | [aws-patterns](plugins/infrastructure/skills/aws-patterns/SKILL.md), [kubernetes-patterns](plugins/infrastructure/skills/kubernetes-patterns/SKILL.md) |
| [keychain](plugins/keychain/README.md) | [macos-keychain-secrets](plugins/keychain/skills/macos-keychain-secrets/SKILL.md) |
| [productivity](plugins/productivity/README.md) | [grilling](plugins/productivity/skills/grilling/SKILL.md), [handoff](plugins/productivity/skills/handoff/SKILL.md), [writing-for-agents](plugins/productivity/skills/writing-for-agents/SKILL.md), [wait-what](plugins/productivity/skills/wait-what/SKILL.md), [zoom-out](plugins/productivity/skills/zoom-out/SKILL.md) |
| [review-toolkit](plugins/review-toolkit/README.md) | [design-principles-review](plugins/review-toolkit/skills/design-principles-review/SKILL.md), [draft-code-review-comment](plugins/review-toolkit/skills/draft-code-review-comment/SKILL.md), [multi-agent-code-review](plugins/review-toolkit/skills/multi-agent-code-review/SKILL.md), [orchestrated-review](plugins/review-toolkit/skills/orchestrated-review/SKILL.md), [pr-comment-addressed-check](plugins/review-toolkit/skills/pr-comment-addressed-check/SKILL.md), [requirements-to-tests-traceability](plugins/review-toolkit/skills/requirements-to-tests-traceability/SKILL.md), [security-review](plugins/review-toolkit/skills/security-review/SKILL.md), [test-correctness-review](plugins/review-toolkit/skills/test-correctness-review/SKILL.md), [test-coverage-review](plugins/review-toolkit/skills/test-coverage-review/SKILL.md) |
| [software-architecture](plugins/software-architecture/README.md) | [codebase-design](plugins/software-architecture/skills/codebase-design/SKILL.md), [domain-modeling](plugins/software-architecture/skills/domain-modeling/SKILL.md), [improve-codebase-architecture](plugins/software-architecture/skills/improve-codebase-architecture/SKILL.md) |
| [ui-ux](plugins/ui-ux/README.md) | [ui-ux-pro-max](plugins/ui-ux/skills/ui-ux-pro-max/SKILL.md) |

## Plugin Catalog

| Plugin | Count | Purpose |
|------|------:|---------|
| [ai-workflow](plugins/ai-workflow/README.md) | 14 skills | Plan grilling, domain-aware decision capture, planning, slicing, orchestration, implementation, refactoring, single-pass two-axis review and repair, Jira-native sync, publishing, and change-summary handoff workflow. |
| [atlassian](plugins/atlassian/README.md) | 2 skills | Vendor-neutral Jira lifecycle guidance and read-oriented Confluence research. |
| [engineering](plugins/engineering/README.md) | 9 skills | Planning, implementation, discovery, diagnostics, prototyping, local web testing, simplification, research, and merge-resolution guidance. |
| [experimental](plugins/experimental/README.md) | 1 skill | Focused preview skill retained while it gathers feedback. |
| [github](plugins/github/README.md) | 2 skills | GitHub CLI repository operations and repository-first GitHub Actions guidance. |
| [infrastructure](plugins/infrastructure/README.md) | 2 skills | AWS, Kubernetes, Terraform, and cloud infrastructure patterns. |
| [keychain](plugins/keychain/README.md) | 1 skill | Cross-platform developer-laptop credential storage guidance. |
| [productivity](plugins/productivity/README.md) | 5 skills | General-purpose decision grilling, handoff, agent-writing, clarity, and codebase-orientation skills. |
| [review-toolkit](plugins/review-toolkit/README.md) | 9 skills | Design, code, security, review-comment lifecycle, requirements, test correctness, test coverage, and orchestrated reviews. |
| [software-architecture](plugins/software-architecture/README.md) | 3 skills | Deep-module design, domain modeling, ADR, and architecture-improvement guidance. |
| [ui-ux](plugins/ui-ux/README.md) | 2 skills | Data-backed UI/UX design intelligence and Figma-backed interface implementation guidance. |

## Repository Layout

```text
agentic-marketplace/
├── .agents/plugins/marketplace.json   # Codex marketplace manifest
├── .claude-plugin/marketplace.json    # Claude Code marketplace manifest
├── plugins/
│   ├── ai-workflow/
│   ├── atlassian/
│   ├── engineering/
│   ├── experimental/
│   ├── github/
│   ├── infrastructure/
│   ├── keychain/
│   ├── productivity/
│   ├── review-toolkit/
│   ├── software-architecture/
│   ├── ui-ux/
│   └── README.md                      # Plugin scaffold guidance
├── AGENTS.md                          # Maintenance instructions for agents
└── README.md
```

Most plugins use this structure:

```text
plugins/<plugin-name>/
├── .codex-plugin/plugin.json
├── .claude-plugin/plugin.json
├── README.md
└── skills/
```

All current plugins support both Claude Code and Codex and use the shared `skills/` layout.
Each skill includes a client-neutral `SKILL.md` plus `agents/openai.yaml` for
Codex/OpenAI discovery and UI metadata.

## Contributing

1. Propose a new skill, plugin, agent, or enhancement in an issue or discussion when useful.
2. Create a branch from `main` and keep the change scoped.
3. Test the behavior or provide validation evidence for docs-only changes.
4. Update the root `README.md`, the relevant plugin `README.md`, and marketplace manifests when plugin, skill, or agent contents change.
5. Open a pull request against `main` and confirm you reviewed the security section.
