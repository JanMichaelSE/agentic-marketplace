---
name: draft-code-review-comment
description: "MUST invoke when the user asks to draft, write, word, or turn an agreed code-review concern into a concise PR/code review comment in the current chat. Trigger phrases include \"draft a review comment\", \"write a PR comment\", \"turn this into a code review comment\", \"comment for this change\", \"word this review feedback\", and \"make this a concise code review comment\". Also use after a discussion about branch or PR changes when the user says the issue should be raised as review feedback. Do NOT invoke for performing a fresh review, checking whether an existing comment was addressed, or editing the code."
---

# Draft Code Review Comment

Draft a paste-ready code review comment from the current conversation and the minimum additional code context needed to make the comment accurate.

Use this skill to convert an agreed concern into reviewer-facing wording. The output belongs in the chat, not in a file and not posted to GitHub unless the user separately asks for that.

## Inputs

- Current conversation context, especially the agreed concern and desired change
- Optional branch, PR, diff, file path, line, test, or requirement context when needed for accuracy
- Optional tone constraints from the user, such as direct, softer, or very short

## Workflow

1. Identify the agreed review concern.
- Use the current conversation as the primary context.
- Confirm the target change, expected behavior, impact, and requested action.
- Do not reopen a broad review or look for unrelated findings.

2. Gather only missing context.
- If the conversation is enough, draft immediately.
- If a factual detail is uncertain, inspect the relevant diff, file, tests, or branch context before stating it.
- Ask one concise clarification question only when the concern, target code, or desired change is still ambiguous after cheap inspection.

3. Draft one concise comment.
- State the concrete problem, why it matters, and the requested change.
- Phrase the requested change as a direct instruction, not as a question.
- Keep it professional, direct, and high-confidence.
- Do not mention the AI discussion, internal reasoning, or that the comment was generated.
- Do not include severity labels, long background, or multiple alternatives unless the user asks.
- Avoid claims about missing tests, broken behavior, or runtime impact unless they were verified or clearly established in the conversation.

4. Return the comment in chat.
- Provide the paste-ready comment as the main output.
- If there is an assumption or unresolved uncertainty, put it outside the comment block under `Assumption:` or `Needs confirmation:`.
- Do not create files, modify code, or post the comment to an external system.

## Output Format

Prefer this shape:

```text
Suggested comment:

<one concise review comment>
```

If the user asks for alternatives, provide no more than three variants:

```text
Direct:
<comment>

Softer:
<comment>

Short:
<comment>
```

## Example

User context: "We agreed this retry helper logs the exception but still returns success. Draft the review comment."

```text
Suggested comment:

This logs the retry failure but still lets the caller treat the operation as successful, so a failed request can continue through the workflow as if it completed. Please propagate the failure or return an explicit failed state here so the retry path remains observable.
```

## Skill Chain

| Position | Details |
|----------|---------|
| **Previous** | Conversation, a prior review, or manual code discussion identifies an issue worth raising |
| **This skill** | Converts the agreed concern into one concise, paste-ready review comment in chat |
| **Next** | User posts the comment manually or requests a separate review |

## Related Skills

- `pr-comment-addressed-check` - determine whether an existing review comment has been addressed
