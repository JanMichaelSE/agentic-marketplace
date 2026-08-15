---
name: grilling
description: Grill the user relentlessly about a plan, decision, or idea. Use when the user wants to stress-test their thinking, or uses any "grill" trigger phrases.
---

# Grilling

Interview the user relentlessly until you reach a shared understanding. Map
this as a **design tree**: every decision branches into the decisions that hang
off it.

Work the tree in **rounds**. The **frontier** is every decision whose
prerequisites are already settled — the questions you can ask now without
guessing at answers you have not heard yet. Ask the whole frontier in one
round: number each question and give your recommended answer. Then wait for the
user's answers before the next round.

Each question should be formatted like so:

```
❓ **Q1** - **<question title>**: <question body, which can include multiple paragraphs and choices>

➡️ <your recommended answer>
```

Each round reshapes the tree — settled decisions push the frontier outward and
unblock questions that depended on them. Recompute the frontier and ask the
next round. A question whose answer depends on another question still open in
this round belongs to a later round, not this one.

Finding **facts** is your job, never the user's. When a frontier question needs
a fact from the environment (filesystem, tools, and so on), dispatch a
sub-agent to find it rather than asking the user. Do not block on it: a running
exploration is an unsettled prerequisite, so only its downstream questions wait
for the result — ask the rest of the frontier now. The **decisions** are the
user's: put each to them and wait.

The session is done when the frontier is empty: every branch of the design tree
has been visited and nothing remains silently assumed. Do not act until the
user confirms that you have reached a shared understanding.
