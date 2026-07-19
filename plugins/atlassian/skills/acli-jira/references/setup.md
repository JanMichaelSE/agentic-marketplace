# ACLI Setup and Credential Handling

## External prerequisite

Install `acli` using the current Atlassian-supported method for your operating system, then authenticate interactively:

```bash
acli jira auth login --web
acli jira auth status
```

The plugin neither installs nor authenticates this external CLI. Consult the [Atlassian CLI documentation](https://developer.atlassian.com/cloud/acli/) when setup differs by version or platform.

## Optional API token for bundled readers

Normal interactive `acli jira` usage does not require an API token. The bundled Jira reader and Confluence reader use a site-scoped REST API and therefore need an API token associated with the configured account.

Create a token through your Atlassian account's security controls, then keep it in an approved secret store. The shared client reads one of these sources without printing it:

1. `ATLASSIAN_API_TOKEN` supplied only to the invoking process.
2. On macOS, the Keychain item identified by `ATLASSIAN_KEYCHAIN_SERVICE` (default `atlassian-api-token`) and `ATLASSIAN_EMAIL`.

Also configure `ATLASSIAN_SITE` and `ATLASSIAN_EMAIL`, unless an existing `acli` profile supplies them. Do not put a token in shell history, source code, Markdown examples, issue descriptions, or snapshot files.

## Attachment and advanced REST work

Use `acli` to list issue attachments and inspect the current command help before acting. For operations that require direct REST calls, use an approved credential-injection mechanism and validate the exact endpoint and authorization scope first. Never extract, decode, or copy OAuth credentials from a local credential store.