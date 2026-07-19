# ADF (Atlassian Document Format) Reference

Jira Cloud rich text uses ADF JSON. Markdown passed as plain text does not become structured content.

## Required document shape

```json
{
  "type": "doc",
  "version": 1,
  "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Details"}]}]
}
```

Use a complete document for descriptions and rich comments. Avoid an empty `content` array; validate the intended structure locally before submitting it with `acli ... --from-json`.

## Common nodes

| Purpose | ADF node |
| --- | --- |
| Paragraph | `paragraph` containing `text` nodes |
| Heading | `heading` with `attrs.level` from 1 through 6 |
| Bullets | `bulletList` containing `listItem` and `paragraph` |
| Checklist | `taskList` containing `taskItem` with `state` of `TODO` or `DONE` |
| Inline code | `text` with a `code` mark |
| Link | `text` with a `link` mark and `attrs.href` |

## Safety checks

- Never interpolate untrusted text directly into JSON; serialize values with a JSON-aware tool.
- Preserve existing ADF nodes unless the user explicitly approves their replacement.
- Mention nodes require a verified Atlassian account identifier. Do not guess identities or identifiers.
- Do not include secrets, tokens, cookies, or sensitive personal data in ADF content.