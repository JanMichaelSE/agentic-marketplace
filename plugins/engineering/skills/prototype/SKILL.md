---
name: prototype
description: Build a bounded, disposable logic or UI prototype to answer one concrete design question. Use when a user wants to test a state model, data shape, interaction, or visual direction before production implementation.
---

# Prototype

A prototype is disposable code that answers one design question. State that
question before creating anything; an artifact that answers a different
question is wasted effort.

## Choose the Shape

- **“Does this logic or state model feel right?”** — follow
  [LOGIC.md](LOGIC.md) to make a tiny, interactive logic prototype.
- **“What should this look like?”** — follow [UI.md](UI.md) to compare
  structurally different UI variants.

If the question is genuinely ambiguous and the user is unavailable, choose the
shape that best matches the surrounding code and state the assumption. A
backend/module question normally favors logic; a page or component question
normally favors UI.

## Rules for Both Shapes

1. Mark the artifact as a prototype and place it near the code or route it
   explores, following existing project conventions. Do not invent a new
   top-level structure.
2. Keep the scope to one question, avoid persistence by default, skip polish,
   and avoid production integrations or real mutations. Use sanitized fixtures
   or stubs when data is necessary.
3. Follow the host project's existing language, task runner, routing, and
   component conventions. Do not install a dependency or create a branch,
   commit, or push unless separately authorized.
4. Provide one clear run or review instruction, but do not automatically start
   services or launch a browser. Request authorization before any such action.
5. After each logic action or UI variant change, make the relevant state or
   visual difference obvious to the reviewer.

## Capture the Answer, Then Remove the Artifact

Once the question is answered, preserve only the conclusion, the question it
answered, and the deciding evidence in an authorized durable location (for
example, an ADR, issue, approved project note, or adjacent `NOTES.md`). Do not
create that record, delete files, or mutate external trackers without the
required authorization. The prototype itself is disposable: remove it or
explicitly carry the validated production-ready logic into real code; never
promote a prototype wholesale.