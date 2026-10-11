---
name: retro
description: "Review a coding session and recommend evidence-based improvements to the agent environment."
metadata:
  source: "https://github.com/mattpocock/skills/blob/49dd158/skills/engineering/retro/SKILL.md"
disable-model-invocation: true
---

# Retrospective

The user has asked for a **retrospective**. You are suggesting improvements to the coding agent's **environment** to improve future runs.

## Steps

1. Use [writing-for-agents](../../../productivity/skills/writing-for-agents/SKILL.md) for the writing style guide when the productivity plugin is available. If unavailable, keep recommendations concise, actionable, and focused on one source of truth.

2. Read the primary sources for the session the user specifies. Default to the current conversation and its artifacts when no session is named. For another session, use the specified logs or available read-only session tools; if access is missing, report that limit. Redact sensitive information before quoting evidence.

3. Look for candidates for improvement in these categories.

   - **Navigation**: how easy was it for the agent to find the right files? Are there hidden dependencies between files? Would a **navigation pointer** make it easier? _Use when_ the session took a long time to find a piece of information.
   - **Automated checks**: are there automated checks that could catch errors the agent made? Linting, typing, tests, filesystem linters? Read the repo's own check command first (its `package.json`/build-tool `lint`/`check` scripts, its CI workflow), so a check that already exists but sits unwired or silently broken is the finding, not a reinvention. A repo with no **guardrail** (no pre-commit hook and no CI job running its lint/typecheck/test command) is itself a finding: an un-linted repo is a standing missed opportunity, not a neutral default. _Use when_ the agent made a mistake an automated check could have caught, or the repo has no guardrail at all.
   - **Coding standards**: should the **reviewer agent** be given a new rule to enforce? Should an existing rule be removed or clarified? Classify the violation first: a **mechanical** one (a fixed syntactic pattern, a banned API, an import shape, a file-location rule) gets a deterministic check, full stop: a custom rule in the repo's own linter, a new pre-commit hook, or a new CI job, whichever the repo's language and existing guardrail make cheapest. Default to building the check over writing the rule. Reserve `CODING_STANDARDS.md` for genuine **judgement calls** (cross-file consistency, "matches the surrounding style," anything no guardrail could ever substitute for). _Use when_ the reviewer agent failed to catch a mistake.
   - **Global AGENTS.md**: are there any steering instructions that should be moved to coding standards (or automated checks) instead? _Use when_ the AGENTS.md file is particularly large - in the repo OR the user's global scope.
   - **Tool economy**: did the agent make expensive tool calls that could be streamlined? Is there any custom tooling (CLI's, MCP's) that is particularly token-inefficient? _Use when_ the agent made an expensive tool call.
   - **No-ops**: look for instructions in steering files that don't modify the agent's behavior. _Use when_ the steering files are large and unwieldy.
   - **Information access**: look for opportunities to increase the agent's access to information. Teeing dev server logs, readonly access to third-party services. _Use when_ a crucial piece of information was not available to the agent.

4. Present candidates in order of severity. For each, cite a concrete session failure or repository gap, the smallest proposed improvement, and the validation that would show it works. Distinguish observed failures from inferences; state when no justified improvement was found.

A retrospective produces recommendations. Apply changes only when the user has authorized that scope; do not treat the retrospective request as permission to edit global guidance, install tooling, commit, or publish tracker updates. For a broader repository-guidance assessment, the optional [improve-repo-harness](../../../experimental/skills/improve-repo-harness/SKILL.md) provides a separate workflow.

## Reference

### Implementation vs Review

Implementation and review have different context needs. Implementation must
explore, write code, and debug; a reviewer can focus on the selected change and
its governing guidance. Prefer deterministic checks for mechanical rules and
focused reviewer guidance for judgement calls. Keep task-critical constraints
available during implementation too.

### Files

Look for the repository's existing guidance before proposing new documents:

- `CLAUDE.md`/`AGENTS.md`: these files are pushed to the context window of any agent working in this repo. They should be used incredibly sparingly, usually only for **navigation pointers** to other files.
- `CODING_STANDARDS.md`: keep judgement-based review rules here when this is the repository's established convention. Add **navigation pointers** to docs folders if the standards file gets more than 1,000 lines long.
- Docs: use docs as references files, pointed to by other files. Look for existing docs before writing new ones.
- Skills: use skills for docs (since their description goes into the agent's context window), or for user-invoked commands. Follow the advice in the `writing-for-agents` skill.
