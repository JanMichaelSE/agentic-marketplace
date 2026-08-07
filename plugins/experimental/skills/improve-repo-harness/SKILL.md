---
name: improve-repo-harness
description: "Harness: MUST invoke only when a user explicitly asks to assess or improve agent guidance, repository navigation, validation discoverability, bootstrap documentation, or CONTEXT/ADR conventions. Do not invoke autonomously."
disable-model-invocation: true
---

# Improve Repo Harness

**Harness** durable repository guidance so an agent can orient itself, find
governing documents, and discover supported validation and bootstrap surfaces.
Make small, evidence-based improvements; the repository remains the source of
truth for its own structure and conventions.

## Scope

This skill improves durable, repository-local guidance. It does not author a
domain model or architecture decisions. Route material domain-model work to
[domain-modeling](../../../software-architecture/skills/domain-modeling/SKILL.md).

## Process

### 1. Explore the existing harness

Read the existing agent front door, repository README and documentation index,
nearby contribution guidance, build or validation entry points, and enough
source and test structure to understand current navigation. Inspect existing
`CONTEXT.md`, `CONTEXT-MAP.md`, ADR locations, and requirements or design
documents only as evidence of established conventions.

Record the paths and concise observations that support each possible
recommendation. Consult [HARNESS-RUBRIC.md](HARNESS-RUBRIC.md) for the evidence
to collect for all five sections.

**Completion criterion:** You can cite repository-local evidence for every
recommendation, and have identified any section with insufficient evidence.

### 2. Review sections one at a time

Present the following sections in order. For the current section, show the
observed evidence, the smallest recommendation, and its benefit. Ask the user
to **adopt**, **skip**, or **revise** that recommendation, then wait for the
answer before presenting the next section.

#### Front door

Assess whether the existing agent guidance clearly points to durable rules,
documentation, and safe validation entry points. Preserve its established
format and make only the smallest navigation improvement.

#### Navigation and repository map

Assess whether a reader can find the relevant source, tests, documents, and
entry points from existing guidance. When a concise map is selected, use the
optional [REPO-MAP-FORMAT.md](REPO-MAP-FORMAT.md) reference rather than
inventing a repository-wide inventory.

#### Validation and bootstrap

Assess whether existing, documented validation commands and prerequisites are
discoverable. Recommend a documentation change only when concrete repository
evidence supports it; keep commands and prerequisites owned by their existing
documentation.

#### Domain conventions

Assess whether established `CONTEXT.md`, `CONTEXT-MAP.md`, and ADR conventions
are discoverable. Use [DOMAIN-CONVENTIONS.md](DOMAIN-CONVENTIONS.md) to inspect
and route those conventions. Offer discovery or routing only; route requests
to define terms or record decisions to `domain-modeling`.

#### Optional small improvements

Assess only small supporting changes justified by the evidence, such as a
missing local cross-link or an unclear ownership pointer. Defer broad rewrites
and proposals without a demonstrated navigation gap.

**Completion criterion:** The user has recorded an adopt, skip, or revise
choice for each section; skipped sections have no proposed edit.

### 3. Confirm the selected edits

Combine only adopted or revised recommendations into a concise draft that
names the affected files and exact guidance to add or change. Recheck every
claim against the evidence, identify any assumption, and ask the user for
explicit confirmation before writing.

**Completion criterion:** The user has explicitly confirmed the displayed
draft, or the process ends with no changes when nothing is selected.

### 4. Write and validate the confirmed harness

Apply only the confirmed local documentation edits, preserving surrounding
wording and the existing source of truth for each concept. Validate that new
links resolve, referenced paths exist, documented commands were already
verified in repository materials, and each claim remains supported by the
exploration evidence.

**Completion criterion:** Every confirmed edit is present, locally valid, and
traceable to the user's approved draft and repository evidence.

## Completion

Report the selected sections, changed files, evidence used, validation results,
and any deferred gaps. State when the repository has no justified harness
change rather than filling it with generic guidance.
