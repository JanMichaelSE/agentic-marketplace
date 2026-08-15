---
name: research
description: Investigate a technical question from primary sources and capture cited findings in one discoverable artifact. Use when a user wants technology, API, documentation, or source-code facts researched before making a decision.
---

# Research

Investigate a bounded question using sources that own the facts: official
documentation, specifications, source code, release notes, first-party APIs, or
the relevant project's maintainers. Do not treat secondary summaries as proof
when a primary source is available.

## Process

1. State the question, decision it informs, known constraints, and what is out
   of scope. Split broad questions into answerable subquestions.
2. Gather primary evidence. Use existing local documents and source first; use
   remote, read-only sources only when needed and authorized by the applicable
   environment rules. Distinguish direct facts from inferences.
3. Follow every consequential claim to a citation. Cite a stable URL, document
   or source title, and the relevant section, version, or revision when
   available. Note access date for web sources and explicitly identify any
   unresolved or conflicting evidence.
4. Produce exactly one discoverable Markdown findings artifact. Use the
   repository's established research, decision, or documentation location; if
   none exists, propose a sensible path and obtain authorization before writing
   it. The artifact should contain the question, concise findings, citations,
   assumptions, open questions, and recommended next step.
5. Report the artifact path and a short cited conclusion in the handoff. Do not
   silently turn research into implementation, tracker mutations, dependency
   installation, commits, or external writes.

Delegating investigation is optional: use a background agent only when the
environment supports it and task boundaries are clear. The coordinating agent
remains responsible for checking citations and delivering one coherent findings
artifact.

## Source Quality

- Prefer vendor/project documentation, source repositories, RFCs, and API
  contracts over blogs, search snippets, or unattributed generated text.
- When only secondary evidence is available, label it as such and state the
  verification gap.
- For codebase-pattern research beyond the current checkout, the optional
  `github-enterprise-search` skill can supply read-only repository evidence; do
  not assume that companion plugin is installed.