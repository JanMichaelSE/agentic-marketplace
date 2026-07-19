# Review Summary Template

Use this durable artifact for workflow reviews. In standalone mode, return the same structure in chat unless the user asks for a file.

<template>

```markdown
# Review Summary: <scope>

Status: PASS | REPAIR_REQUIRED | HUMAN_REQUIRED | BLOCKED

## Table of Contents

- [Quick Findings Summary](#quick-findings-summary)
- [Review Context](#review-context)
  - [Review Execution Mode](#review-execution-mode)
  - [Scope](#scope)
  - [Source Inputs Reviewed](#source-inputs-reviewed)
  - [Review Target](#review-target)
  - [Changed Files Summary](#changed-files-summary)
- [Gate Rationale](#gate-rationale)
- [Detailed Findings](#detailed-findings)
  - [Repair Queue](#repair-queue)
  - [Human Decision Queue](#human-decision-queue)
  - [Optional Improvements](#optional-improvements)
  - [Informational Notes](#informational-notes)
- [Validation Evidence and Gaps](#validation-evidence-and-gaps)
- [Slice Acceptance Checklist](#slice-acceptance-checklist)
- [Review Coverage](#review-coverage)
  - [Review Execution Lanes](#review-execution-lanes)
  - [Review Lens Matrix](#review-lens-matrix)
- [Re-Review Status](#re-review-status)
- [Risks and Follow-Up](#risks-and-follow-up)
- [Comments](#comments)

## Quick Findings Summary

**Gate:** `PASS | REPAIR_REQUIRED | HUMAN_REQUIRED | BLOCKED`

**At a glance:** <finding counts, blocking categories, and concise gate reason>

| ID | Severity | Disposition | Title | Detail | Status |
|----|----------|-------------|-------|--------|--------|
| REV-<scope>-001 | critical/high/medium/low/info | required-fix/validation-gap/human-decision/optional-improvement/info | <title> | [View finding](#rev-scope-001-title) | new/resolved/still-failing/accepted-by-human/disputed/superseded |

When there are no findings, use this single row instead:

| Result | Detail | Status |
|--------|--------|--------|
| No actionable findings | All enabled review lenses passed. | completed |

## Review Context

### Review Execution Mode

delegated-lanes | parent-orchestrated-lanes | single-agent-fallback | blocked

### Scope

### Source Inputs Reviewed

### Review Target

### Changed Files Summary

## Gate Rationale

## Detailed Findings

### Repair Queue

#### REV-<scope>-001: <finding title>

- Severity: critical | high | medium | low | info
- Disposition: required-fix | validation-gap | human-decision | optional-improvement | info
- Repairability: automated-repair | needs-human | manual-only | not-applicable
- Lens: <primary review lens>
- Status: new | resolved | still-failing | accepted-by-human | disputed | superseded
- Evidence: <exact evidence>
- Failure Mode: <concrete failure or confidence gap>
- Required Change: <specific required change>
- Validation Expectation: <focused validation>
- Human Decision Needed: <decision, owner, or None>
- Notes: <optional context>

### Human Decision Queue

### Optional Improvements

### Informational Notes

## Validation Evidence and Gaps

## Slice Acceptance Checklist

| Acceptance Criterion | Status | Evidence |
|----------------------|--------|----------|

## Review Coverage

### Review Execution Lanes

| Lens | Execution | Result | Notes |
|------|-----------|--------|-------|

### Review Lens Matrix

| Lens | Result | Notes |
|------|--------|-------|

## Re-Review Status

| Prior ID | Status | Evidence | Justification |
|----------|--------|----------|---------------|

## Risks and Follow-Up

## Comments
```

</template>

## Section Notes

- `Review Summary` title: use a concise, descriptive scope name that identifies the artifact in rendered Markdown and search results.
- `Table of Contents`: include links to every rendered top-level section and its useful subsections. Remove the `Re-Review Status` entry when that section is omitted.
- `Quick Findings Summary`: include every finding, including optional and info items. Add one concise at-a-glance sentence with counts, blocking categories, and the gate reason. Link each `Detail` cell to the finding's stable `#### <ID>: <Title>` heading. When there are no findings, use the no-actionable-findings row.
- `Scope`: name the feature, story, approved workflow scope, branch comparison, commit range, staged diff, working-tree diff, PR diff, or file scope. Use a workflow slice only for explicit per-slice reviews.
- `Source Inputs Reviewed`: list execution plans, slices, implementation summaries, refactor summaries, requirements, previous reviews, and validation evidence.
- `Review Execution Mode`: use `delegated-lanes` when the review skill spawned one lane per enabled lens, `parent-orchestrated-lanes` when a parent coordinator supplied lane outputs, `single-agent-fallback` when a bounded target was reviewed in one read-only pass, or `blocked` when required inputs/access are missing or the target is too large or risky for the available mode.
- `Review Target`: identify the exact diff or files reviewed.
- `Changed Files Summary`: summarize changed production, test, configuration, documentation, and workflow artifact areas.
- `Detailed Findings`: render every finding as its own schema-complete block under the appropriate queue, using the stable heading form `#### <ID>: <Title>`. Use `None` for empty queues.
- `Review Execution Lanes`: record each enabled lens with lane-level execution as `delegated`, `parent-orchestrated`, `main-thread-fallback`, `skipped`, or `blocked`. Use `skipped` only for not-applicable lenses and explain why; use `blocked` only for missing inputs/access, failed required lane results, or scope risk.
- `Gate Rationale`: explain why the final status is `PASS`, `REPAIR_REQUIRED`, `HUMAN_REQUIRED`, or `BLOCKED`.
- `Repair Queue`: include only automated-repair eligible findings.
- `Human Decision Queue`: include `needs-human` and blocking `manual-only` items.
- `Validation Evidence and Gaps`: record commands run, command outcomes, commands not run, and why missing validation matters.
- `Slice Acceptance Checklist`: map workflow-mode acceptance criteria to evidence.
- `Review Lens Matrix`: mark each lens as `pass`, `finding`, `not-applicable`, or `blocked`.
- `Re-Review Status`: include this section and its table only when prior findings were supplied; otherwise omit both the section and its table-of-contents entry.
