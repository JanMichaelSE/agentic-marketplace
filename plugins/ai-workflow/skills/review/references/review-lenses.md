# Review Axes

Run the enabled axes independently. Review quality is defined by Standards and Spec coverage, not by whether work is delegated. In hosts with sub-agent or parallel-agent support, run each enabled axis in its own delegated lane. When delegation is unavailable and the target is bounded enough for one read-only pass, use `single-agent-fallback`, cover both enabled axes, and record residual confidence limits.

Skip the Spec axis only when the user confirms that no governing specification exists. Do not skip Standards because the repository lacks a standards document; use the baseline below. Report `BLOCKED` only when required review inputs or target access are missing, or when the target is too large or risky for the available execution mode.

## Standards

Read applicable repository guidance first: `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md`, coding-standard files, formatter or linter configuration, and local guidance for the changed area. Cite the source and rule for every documented-standard finding.

The Standards axis always also uses this baseline. These are labelled heuristics, not hard violations; use `possible <smell>` wording. Repository guidance overrides the baseline when it deliberately endorses a pattern. Skip issues tooling already enforces and report only evidence in the reviewed diff.

| Possible smell | Heuristic and direction |
|---|---|
| Mysterious Name | A name hides purpose; use an honest, descriptive name. |
| Duplicated Code | Repeated changed logic may need one shared shape. |
| Feature Envy | Logic reaches into another object's data more than its own. |
| Data Clumps | Fields or parameters repeatedly travel together. |
| Primitive Obsession | A primitive stands in for a meaningful domain concept. |
| Repeated Switches | The same type dispatch recurs across the change. |
| Shotgun Surgery | One logical change scatters across unrelated modules. |
| Divergent Change | One module changes for unrelated reasons. |
| Speculative Generality | Abstraction exceeds the governing need. |
| Message Chains | Callers navigate a long object chain. |
| Middle Man | A layer mostly delegates without adding value. |
| Refused Bequest | Inheritance is largely ignored or overridden. |

Report documented-standard breaches with the guidance path, rule, and file or hunk evidence. Report baseline concerns as `possible <smell>` judgement calls with the relevant hunk. Distinguish the two, honor repository overrides, and do not duplicate a Spec finding here.

## Spec

Use the governing specification selected by the review process. In workflow mode, the execution plan and approved slices define the primary requirements. In standalone mode, use the explicit or discovered source without guessing.

Report:

- Requirements that are missing or partial.
- Behavior in the diff that was not requested.
- Requirements that appear implemented but whose behavior is incorrect.

Cite the relevant requirement and file or hunk evidence for every finding. Do not report this axis when the user confirmed that no governing specification exists. Do not duplicate a Standards finding here.

## Shared Validation Evidence

For every concrete finding, record the focused validation that would demonstrate a repair. Treat missing, failed, or untargeted validation as a `validation-gap` only when it blocks confidence in a Standards or Spec conclusion; it is not an independent review axis.
