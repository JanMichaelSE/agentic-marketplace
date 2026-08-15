# AI Workflow

Stable vendor-neutral workflow skills for turning planning context into implementation, refactor, review, repair, orchestration, Jira-native sync, publishing, and change summary handoff artifacts.

## Skills

| Skill | Status | Purpose | When to Use |
|------|--------|---------|-------------|
| [**grill-me**](skills/grill-me/SKILL.md) | Available | Start a deliberate, round-by-round plan or design interview | Sharpening planning context before creating an execution plan |
| [**grill-with-docs**](skills/grill-with-docs/SKILL.md) | Available | Start a deliberate interview that records confirmed domain decisions | Stress-testing planning context against domain language and ADRs before creating an execution plan |
| [**create-execution-plan**](skills/create-execution-plan/SKILL.md) | Available | Create `.scratch/<feature-slug>/execution-plan.md` from planning context | Moving from idea, PRD, ticket, or conversation into an implementation source of truth |
| [**create-implementation-slices**](skills/create-implementation-slices/SKILL.md) | Available | Break an execution plan into approved autonomous implementation slices | Preparing bounded implementation work |
| [**run-workflow**](skills/run-workflow/SKILL.md) | Available | Orchestrate approved slices through implementation, refactor, one review-and-repair pass, and engineer handoff | Coordinating a complete local workflow after approved slices exist |
| [**jira-plan-import**](skills/jira-plan-import/SKILL.md) | Available | Import an execution plan from a Jira Epic/Story description and slices from child Stories (Epic) or Sub-tasks (Story) into local artifacts | Starting a Jira-backed run when the plan and slices already live in Jira |
| [**jira-plan-sync**](skills/jira-plan-sync/SKILL.md) | Available | Sync execution plans and approved slices into Jira descriptions and child work items | Publishing Jira-native planning context before implementation starts |
| [**jira-checkpoint-sync**](skills/jira-checkpoint-sync/SKILL.md) | Available | Sync implementation summaries and workflow checkpoints into Jira descriptions or comments | Recording Jira-native progress after planning has been mapped |
| [**implement-scope**](skills/implement-scope/SKILL.md) | Available | Implement approved workflow slices or concrete standalone changes | Executing approved slices or direct bounded implementation requests |
| [**refactor**](skills/refactor/SKILL.md) | Available | Refactor explicitly scoped changes while preserving behavior and writing a concise handoff | Preparing implemented changes for broader review |
| [**review**](skills/review/SKILL.md) | Available | Review changes through independent Standards and Spec axes and produce a repair-ready summary without modifying code | Evaluating implemented or refactored changes before repair, local review, commit, or PR creation |
| [**repair-findings**](skills/repair-findings/SKILL.md) | Available | Repair eligible in-scope review findings and record each repair outcome | Applying bounded fixes directly from review findings before local review, commit, or PR creation |
| [**summarize-changes**](skills/summarize-changes/SKILL.md) | Available | Create a concise change summary handoff using the standard overview format | Summarizing workflow artifacts, real code changes, and validation evidence before PR creation |
| [**publish-draft-pr**](skills/publish-draft-pr/SKILL.md) | Available | Publish an authorized branch, commit, draft PR, and optional Jira backlink | Creating a draft PR only after terminal workflow handoff and explicit authorization |

## Usage Flow

1. Gather planning context from any source: conversation, local docs, issue text, PRD, design notes, or repository inspection.
2. Use `grill-me` to resolve plan or design decisions, or use `grill-with-docs` when the conversation should also refine local domain language and documented decisions.
3. Use `create-execution-plan` to publish `.scratch/<feature-slug>/execution-plan.md`.
4. Use `create-implementation-slices` to propose slices and write approved files under `.scratch/<feature-slug>/slices/`.
5. For Jira-backed workflows where the plan and slices already live in Jira, use `jira-plan-import` to pull the plan from the Epic/Story description and the slices from child Stories (Epic) or Sub-tasks (Story) into local artifacts. Use `jira-plan-sync` instead (or afterward) to push approved local plans/slices back up to Jira for Epic/Story.
6. Use `run-workflow` to coordinate implementation, refactor, one review-and-repair pass, and summary after approved slices exist. Request a post-repair re-review explicitly when needed.
7. Use `implement-scope`, `refactor`, `review`, `repair-findings`, and `summarize-changes` directly when running the workflow manually or handling a bounded standalone request.
8. Use the change summary handoff for engineer local review and commit decisions.
9. Use `publish-draft-pr` only for explicit draft PR publishing after terminal handoff and authorization.

## Jira Native Sync

Jira-backed workflows use Jira descriptions, child work items, and comments as the external planning and progress surface:

- `jira-plan-import` reads the execution plan from the source Epic or Story description and reads slices from child Stories (Epic mode) or Sub-tasks (Story mode) into local artifacts; it never reads plans or slices from attachments.
- `jira-plan-sync` writes the execution plan to the source Epic or Story description and writes approved slices to child Stories or Sub-tasks.
- `jira-checkpoint-sync` updates mapped child work item descriptions with implementation summaries and comments on the source Epic or Story for authorized workflow checkpoints.
- `.scratch/<feature-slug>/jira/sync-state.json` records source issue, mode, child issue mappings, artifact hashes, checkpoint destinations, and blockers.
- Jira sync is explicit and separate from `run-workflow`; integration between these skills should be planned before changing the orchestration contract.

## Cross-plugin dependencies

- `grill-me` delegates the interview to Productivity's [grilling](../productivity/skills/grilling/SKILL.md) skill.
- `grill-with-docs` delegates the interview to `grilling` and records confirmed terminology and ADRs through Software Architecture's [domain-modeling](../software-architecture/skills/domain-modeling/SKILL.md) skill. Install those plugins alongside AI Workflow when using either entry point.

## Artifact Layout

```text
.scratch/<feature-slug>/
  execution-plan.md
  slices/
    01-<slice-slug>.md
    02-<slice-slug>.md
  implementation/
    01-<slice-slug>-summary.md
  refactor/
    <scope-stem>-refactor-summary.md
  review/
    cycle-01-review-summary.md
    cycle-02-review-summary.md # only when explicitly requested
  repair/
    cycle-01-repair-summary.md
  change-summary/
    <scope-stem>-change-summary.md
  orchestration/
    run-summary.md
  jira/
    sync-state.json
```

## Safety Notes

- This workflow accepts planning context from any source and does not require a specific upstream planning skill.
- Execution plans and slices are local workflow artifacts and should not be treated as committed project docs unless the repo owner asks for that.
- Implementation and refactor workflows require explicit boundaries before editing and should not sweep unrelated repo areas.
- New dependencies require explicit authorization in the execution plan, slice, or user instruction.
- `review` is read-only and normally reviews the assembled feature, story, or approved workflow scope after implementation; per-slice review is reserved for explicit, high-risk, long-running, independently owned, or independently releasable slices.
- `review` does not perform repair, commits, PR posting, Jira updates, branch operations, or code edits.
- `repair-findings` edits only within an explicit repair boundary, records each repair outcome, leaves changes uncommitted, and does not perform PR, Jira, branch, or re-review orchestration.
- `summarize-changes` creates or updates a concise change summary handoff artifact; it does not create PRs, update Jira, commit, push, or orchestrate review or repair.
- `jira-plan-import` owns planning-stage Jira reads and local artifact writes; it reads the plan and slices from descriptions and child work items (never attachments) and does not write to Jira, implement, review, repair, summarize, branch, commit, push, create PRs, transition Jira workflow states, or edit Jira fields.
- `jira-plan-sync` owns planning-stage Jira writes to descriptions and child work items; it does not implement, review, repair, summarize, branch, commit, push, create PRs, transition Jira workflow states, or edit unrelated Jira fields.
- `jira-checkpoint-sync` owns checkpoint-stage Jira writes to descriptions and comments; it does not implement, review, repair, summarize, branch, commit, push, create PRs, transition Jira workflow states, or edit unrelated Jira fields.
- `run-workflow` coordinates local workflow stages and stops at engineer local review; it does not create commits, branches, PRs, Jira updates, pushes, or external workflow side effects.
- `publish-draft-pr` is explicit publishing behavior; it should be invoked directly by the user or host only after terminal handoff and explicit authorization.
- Implementation, refactor, review, and repair work leaves changes uncommitted by default; commits require an explicit user request or slice permission.

## Installation

Install from the `agentic-marketplace` marketplace:

```bash
# Claude Code
claude plugin marketplace add JanMichaelSE/agentic-marketplace
claude plugin install ai-workflow@agentic-marketplace

# Codex
codex plugin marketplace add https://github.com/JanMichaelSE/agentic-marketplace
# Then enable `ai-workflow` from `/plugins` inside Codex
```
