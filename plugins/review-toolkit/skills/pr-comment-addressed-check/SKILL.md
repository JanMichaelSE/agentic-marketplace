---
name: pr-comment-addressed-check
description: Determine whether a pull request review comment has been addressed in the current codebase. If the user already provided the pull request comment, inspect the relevant code immediately; otherwise ask for the comment first, then decide if the concern raised in the comment has been resolved or is still outstanding.
---

# PR Comment Addressed Check

## Workflow

1. Check whether the user's current prompt already includes the pull request comment to evaluate.

2. If the current prompt already includes the pull request comment, do not ask for it again. Use the provided comment and proceed directly to the next step.

3. If the current prompt does not include the pull request comment, ask the user exactly this question: `Please paste the pull request comment you want me to check, including any relevant context such as the file name, line number, or author if available.`

4. If you had to ask for the comment, wait for the user to provide it before proceeding.

5. Parse the comment to identify:
   - The concern, suggestion, or issue raised.
   - Any referenced file(s), line(s), symbol(s), or code pattern(s) mentioned in the comment.

6. Search the codebase for the relevant code:
   - Use the file name and line reference from the comment if provided.
   - Otherwise use codebase search to locate the symbol or pattern the comment refers to.
   - Read enough surrounding context to make a confident determination.

7. Determine whether the comment has been addressed:
   - **Addressed** – The concern raised in the comment has been resolved: the code was changed, the issue was fixed, the suggestion was applied, or the problem no longer exists.
   - **Not addressed** – The code still exhibits the exact problem or pattern the comment describes, with no meaningful change.
   - **Partially addressed** – Some but not all parts of the concern have been resolved.
   - **Cannot determine** – The referenced code cannot be found or there is insufficient context to make a confident judgment; explain why.

8. Report the result clearly using one of the four verdicts above, followed by:
   - A brief explanation of what the comment asked for.
   - A brief explanation of what the current code shows and why the verdict was reached.
   - The exact file and line(s) inspected, if applicable.