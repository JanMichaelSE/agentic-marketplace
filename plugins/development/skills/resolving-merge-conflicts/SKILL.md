---
name: resolving-merge-conflicts
description: Resolve an in-progress Git merge or rebase conflict by understanding both changes' intent and validating the result. Use when a user asks for help with conflicting files during a merge or rebase.
---

# Resolving Merge Conflicts

> **Migration note:** This is the approved post-manifest addition to the Matt
> Skills `v1.1.0` baseline migration. It is experimental and intentionally
> adapts the source workflow to Core authorization and safety rules.

Resolve conflicts only after understanding why both sides changed. A clean
conflict-free tree is not itself evidence of a correct result, and the two
intents cannot always both be preserved.

## 1. Establish the conflict context

Inspect the current merge or rebase state and identify every conflicting file.
Read applicable repository guidance before touching a conflict. Inspect the
relevant history and the conflicting hunks so the merge base, current side, and
incoming side are clear. Do not create branches, stage files, continue or abort
an operation, commit, or push as part of this investigation.

## 2. Recover the intent behind each side

For each conflict, find the primary evidence for both changes:

- Read the associated commit messages, nearby code, tests, and repository-local
  design or requirements artifacts.
- When available and authorized, inspect the relevant pull request or issue;
  do not guess missing requirements or contact external systems unnecessarily.
- Identify the behavior, compatibility constraint, and reason for each change.

If the evidence shows incompatible goals or leaves a material product or design
decision unresolved, stop and present the trade-off to the user. Do not invent
new behavior merely to make the conflict markers disappear.

## 3. Resolve deliberately

When the user has authorized editing the conflicts, resolve one hunk at a time
against the established intent. Preserve compatible behavior where practical;
when only one intent can remain, use the user-approved goal and document the
trade-off in the handoff or other authorized record. Re-read each resolved area
with its callers, tests, and configuration context before moving on.

Do not assume every conflict should be resolved or that every merge/rebase
should finish. Abort, staging, committing, continuing a rebase, and pushing are
separate consequential Git actions. Perform any of them only when the user
explicitly authorizes that specific action and its scope.

## 4. Validate the resolved result

Discover the affected project's focused validation from its repository guidance,
package/build configuration, and nearby tests. Run the smallest relevant local
checks after the resolution, such as focused tests, type checks, linting, or
format verification. Follow repository and user authorization requirements for
commands that start services, alter data, install dependencies, or contact
external systems.

If validation fails, investigate whether the resolution caused the failure and
repair only the authorized conflict scope. If no focused validation is available,
report what was inspected, why validation could not run, and the remaining risk.

## 5. Hand off the decision

Report the conflict context, the intent retained from each side, any deliberate
trade-offs, and validation evidence. State the remaining Git state without
claiming the merge or rebase is complete. Ask the user whether they want any
next consequential action, such as staging, continuing, aborting, committing,
or pushing.