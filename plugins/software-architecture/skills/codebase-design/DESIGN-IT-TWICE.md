# Design It Twice

When a user wants to explore alternative interfaces for a chosen deepening
candidate, use this parallel-design pattern. Your first idea is unlikely to be
the best.

This guide uses the vocabulary in [SKILL.md](SKILL.md): **module**,
**interface**, **seam**, **adapter**, and **leverage**.

## Process

### 1. Frame the problem space

Before exploring alternatives, write a user-facing explanation of:

- Constraints a new interface must satisfy.
- Dependencies it relies on and their categories in
  [DEEPENING.md](DEEPENING.md).
- A rough illustrative code sketch that makes constraints concrete, not a
  proposed solution.

### 2. Produce distinct alternatives

Use available parallel research agents when supported; otherwise explore the
alternatives sequentially. Produce at least three radically different interface
designs, each with a distinct constraint:

1. Minimize the interface to one to three entry points and maximize leverage.
2. Maximize flexibility for varied use cases and extension.
3. Optimize the most common caller so the default case is trivial.
4. When applicable, design around ports and adapters for cross-seam
   dependencies.

Ground each alternative in the relevant files, coupling, dependency category,
the behavior behind the seam, and the project's domain vocabulary. Each
alternative must include:

1. Interface: types, entry points, parameters, invariants, ordering, and error modes.
2. A caller usage example.
3. Behavior hidden behind the seam.
4. Dependency strategy and adapters.
5. Trade-offs, including where leverage is high or thin.

### 3. Compare and recommend

Present alternatives sequentially, then compare their depth, locality, and seam
placement. Give a clear recommendation, including a hybrid only when it
genuinely combines the stronger qualities. Do not modify the repository or act
on a design until the user authorizes the implementation.