# Harness Rubric

Use this reference during exploration to separate observed evidence from a
recommendation. A recommendation is justified only when it closes a concrete
navigation or discoverability gap with a small durable documentation change.

| Section | Evidence to collect | Smallest useful outcome |
|---|---|---|
| Front door | Existing agent guidance, contribution guidance, and the first documents a new reader reaches | A precise pointer to durable rules or the authoritative documentation entry point |
| Navigation and repository map | Existing indexes plus the actual locations of source, tests, documents, and relevant entry points | A short map or cross-link that helps a reader reach those locations without duplicating their contents |
| Validation and bootstrap | Existing build, test, task-runner, or bootstrap documentation and their named prerequisites | A pointer that makes already-supported commands and prerequisites easier to find |
| Domain conventions | Existing `CONTEXT.md`, `CONTEXT-MAP.md`, ADR locations, and design or requirements documents | A discovery or routing pointer to the established convention |
| Optional small improvements | A specific inconsistency or missing connection in the above evidence | One narrowly scoped repair that preserves existing ownership |

For every section, retain the observed paths, distinguish fact from inference,
and make the benefit visible to the user. If the evidence does not support a
small recommendation, present that result and skip the edit.

## Review questions

- Can a new agent identify the governing guidance before changing a repository?
- Can it navigate from a durable entry point to relevant code, tests, and docs?
- Are supported validation and bootstrap details reachable from their existing
  owner?
- Are established domain conventions discoverable without restating them?
- Does the recommendation remove a real gap without creating a parallel source
  of truth?

The process guidance and user-decision sequence remain authoritative in
[SKILL.md](SKILL.md).