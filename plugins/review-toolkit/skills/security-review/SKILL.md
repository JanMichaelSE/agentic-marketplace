---
name: security-review
description: "MUST invoke for a security-focused review of code changes. Identifies evidence-backed vulnerabilities involving secret exposure, authentication, authorization, data access, dependencies, configuration, injection, cryptography, and external requests. Use for 'security review', 'security check', 'check for vulnerabilities', 'OWASP review', 'security audit', 'check for secrets', or 'is this secure'. Do not use for functional correctness, design adherence, or test coverage reviews."
---

# Security Review

Review a change for observable, security-relevant regressions. This is a standalone review lens: it does not require requirements documents, a context repository, or ticketing side effects.

## Inputs

Collect or infer:

1. **Review target** — staged or unstaged changes, a commit/range, branch diff, or pull request.
2. **Repository and runtime context** — language, framework, deployment configuration, and dependency tooling when relevant.
3. **Threat-relevant surfaces** — user input, endpoints, authentication, authorization, data stores, file handling, external requests, cryptography, secrets, configuration, and dependencies.

## Workflow

### 1. Scope the change

- Summarize changed files by routes, services, data access, configuration, dependencies, tests, and infrastructure.
- Identify trust boundaries and changed user-controlled inputs.
- Note applicable checklist sections in [the local security checklist](references/security-checklist.md); do not force unrelated checks.

### 2. Screen high-risk patterns

Use the checklist's dangerous-pattern table as a targeted first pass. Inspect the surrounding code for each match; a pattern match alone is not a finding.

### 3. Review applicable controls

Evaluate changed code for injection, authentication, authorization, data exposure, input validation, insecure configuration, cryptographic failures, unsafe deserialization, SSRF, mass assignment, race conditions, and dependency risk.

For authentication and authorization changes, verify endpoint protection, object-level access checks, privilege boundaries, tenant or account isolation, and CORS policy. For data-access changes, verify parameterization, validation before writes, migration safety, and concurrent update handling.

### 4. Inspect secrets and sensitive data safely

- Check changed source, configuration, fixtures, and generated files for credentials, private keys, or sensitive values.
- Check logs, errors, and API responses for unnecessary secret or personal-data exposure.
- Never print, copy, or persist a suspected secret in the review report. Identify its file and line, describe only its type, and recommend rotation or removal through an approved secret store.

### 5. Verify before reporting

- Report only findings supported by the changed code and surrounding mitigations.
- Read middleware, shared libraries, and configuration as needed to rule out existing protections.
- Label an unconfirmed concern as a question or limitation, not a vulnerability.
- Do not report theoretical issues that depend on unsupported threat-model assumptions.

## Output Format

Present the review in chat or save it to a user-requested repository-local location:

```text
# Security Review: <feature, branch, or PR name>

**Date:** YYYY-MM-DD
**Review target:** <target>
**Repository:** <repository and branch, if known>
**Files reviewed:** <count>
**Verification run:** <command or "not run">

## Findings

1. [path/to/file.ext:line] Severity: CRITICAL | HIGH | MEDIUM | LOW
   Category: <checklist category>
   <Concise evidence, impact, and actionable remediation.>

<Write "No evidence-backed findings." when none exist.>

## Secrets and Sensitive Data

| Area | Result | Notes |
|------|--------|-------|
| `<path or area>` | PASS / FINDING / NOT APPLICABLE | <Do not include secret values.> |

## Authentication and Access Control

| Endpoint or Function | Control Reviewed | Result | Notes |
|----------------------|------------------|--------|-------|
| `<path or route>` | <auth, permission, or isolation check> | PASS / FINDING / NOT APPLICABLE | <concise evidence> |

## Scope and Limitations

- <Unchecked area, unavailable tooling, or threat-model assumption>

## Summary

<Findings by severity, principal risks, and residual limitations.>

**Review status:** PASS / NEEDS ATTENTION
```

## Severity and Status

- **Critical** — actively exploitable exposure or control failure with severe impact.
- **High** — a credible exploit path or sensitive-data exposure needing prompt remediation.
- **Medium** — a meaningful weakness with constrained impact or prerequisites.
- **Low** — limited-impact hardening issue.

Use **PASS** when no critical or high findings remain in the reviewed scope. Use **NEEDS ATTENTION** when critical or high findings require remediation. Medium and low findings should remain visible without implying unreviewed areas are safe.

## Boundaries

- This skill reviews security risks only; use the appropriate review lens for functional correctness, design, or test coverage.
- Do not install scanning tools or make network calls solely for this review. Run an existing, safe repository command only when it is available and materially reduces uncertainty.
- Do not create tickets, post comments, change workflow status, or save artifacts unless the user explicitly requests that action.

## Related Skills

- **orchestrated-review** — combines this lens with other available review lenses.
- **test-coverage-review** — checks whether tests exercise changed behavior.
- **design-principles-review** — checks maintainability and design risks.