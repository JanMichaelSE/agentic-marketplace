---
name: grilling
description: Run a one-question-at-a-time interview that resolves plan or design decisions and their dependencies. Use when a user wants to stress-test a plan, decision, or design before acting, or asks to be grilled.
---

# Grilling

Use this reusable interview loop to reach a shared understanding of a plan,
decision, or design before acting on it.

## Process

1. Explore the codebase, documentation, and supplied context for facts before
   asking about them. Do not make the user answer questions the repository can
   answer.
2. Identify the unresolved decisions and their dependencies. Start with the
   decision that unblocks the next branch of the design tree.
3. Ask exactly one focused question at a time. Explain why it matters and give
   a recommended answer, then wait for the user's response before continuing.
4. Stress-test the response with concrete constraints, edge cases, ownership,
   failure modes, and effects on the remaining decisions.
5. Summarize the resolved decisions and open questions. Do not enact the plan
   until the user confirms that the shared understanding is complete.

## Fact-Finding Versus Decisions

- **Facts** come from repository exploration, documentation, existing tests,
  or other available evidence. Verify them rather than asking the user.
- **Decisions** express intent, trade-offs, priorities, or acceptable risk.
  Put each decision to the user and wait for their answer.

Keep questions small and sequential. Bundling multiple decisions into one
question makes the conversation harder to answer and obscures dependencies.