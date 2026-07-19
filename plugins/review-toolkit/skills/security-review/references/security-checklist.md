# Security Review Checklist

Use the sections that apply to the reviewed change. A completed item is evidence to inspect, not proof that a change is safe.

## Injection and Input Handling

- [ ] Database queries parameterize untrusted values; no interpolation creates query syntax.
- [ ] Commands, dynamic code, templates, XML, and deserialization do not execute untrusted input.
- [ ] Output is encoded or sanitized for its rendering context; no unsafe HTML injection is introduced.
- [ ] Requests, URL parameters, uploads, paths, and structured inputs have type, length, format, and size validation.
- [ ] User-controlled filenames and paths cannot escape their intended directory.

## Authentication and Authorization

- [ ] New endpoints and operations enforce the intended authentication mechanism.
- [ ] Tokens, sessions, and credentials are validated rather than merely present.
- [ ] Passwords use an adaptive password-hashing algorithm; credentials are never placed in URLs.
- [ ] Object-level and function-level permissions prevent horizontal and vertical privilege escalation.
- [ ] Account, tenant, or organization data is scoped at every access boundary.
- [ ] Cross-origin policy permits only intended origins, methods, and credentials.

## Secrets and Sensitive Data

- [ ] Source, configuration, fixtures, and generated files contain no committed secrets or private keys.
- [ ] Secret defaults and fallback configuration do not contain real credential material.
- [ ] Logs, errors, telemetry, and API responses exclude credentials and unnecessary personal or sensitive data.
- [ ] Test data uses safe placeholders rather than real credentials or customer data.
- [ ] Production errors do not reveal stack traces, queries, internal paths, or service versions unnecessarily.

## Data Access and Integrity

- [ ] Writes validate allowed fields; request payloads cannot set privileged or system-managed properties.
- [ ] Migrations preserve constraints and do not expose data, unintentionally delete it, or create unsafe defaults.
- [ ] Read-modify-write operations use transactions, locking, or another intentional concurrency strategy.
- [ ] File writes and security-sensitive state changes avoid time-of-check/time-of-use races.

## Configuration and Cryptography

- [ ] Production configuration disables debug behavior and default accounts or passwords.
- [ ] TLS and security headers are configured appropriately for the deployment boundary.
- [ ] Security-sensitive hashes, encryption, signatures, and random values use current, purpose-built primitives.
- [ ] Keys are obtained from an approved secret mechanism, not hardcoded in application code.

## External Requests and Dependencies

- [ ] Server-side requests restrict user-controlled URLs, schemes, and redirects; internal network targets are blocked where appropriate.
- [ ] Webhook and callback destinations have explicit validation.
- [ ] Dependency and lockfile changes are intentional, pinned where needed, and reviewed for known vulnerability risk.
- [ ] No unnecessary dependency or build-script capability is introduced.

## Quick Scan — Dangerous Patterns

Search changed files for these indicators, then inspect context before reporting.

| Indicator | Potential risk |
|-----------|----------------|
| `eval`, `exec`, dynamic function construction | Code injection |
| Shell command execution with input | Command injection |
| Unsafe object or YAML deserialization | Code execution or data integrity failure |
| Raw query strings or interpolated SQL | Query injection |
| Direct HTML injection or unsafe template rendering | Cross-site scripting |
| Private-key markers, credential assignments, token-like literals | Secret exposure |
| Weak security hashing or predictable randomness | Cryptographic failure |
| Wildcard cross-origin policy or production debug setting | Security misconfiguration |
| User-controlled outbound URLs | Server-side request forgery |