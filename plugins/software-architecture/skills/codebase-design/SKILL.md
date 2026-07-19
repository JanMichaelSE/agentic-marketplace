---
name: codebase-design
description: Provide the shared vocabulary and discipline for designing deep modules with clear interfaces and seams. Use when a user wants to design or improve a module, find deepening opportunities, choose a seam, or make code more testable and AI-navigable.
---

# Codebase Design

Design **deep modules**: substantial behavior behind a small interface, placed
at a clear seam, and testable through that interface. This skill is the
software-architecture plugin's canonical architecture vocabulary source;
dependent skills should reference it rather than duplicate its definitions.

## Vocabulary

- **Module** — anything with an interface and implementation, including a
  function, class, package, or tier-spanning slice. Avoid *unit*, *component*,
  and *service* when this term is meant.
- **Interface** — every fact a caller needs to use a module correctly: types,
  invariants, ordering, error modes, required configuration, and performance.
  It is broader than an API or type signature.
- **Implementation** — code inside a module. Use **adapter** instead when the
  discussion concerns a concrete role at a seam.
- **Depth** — leverage at an interface. A deep module hides much behavior
  behind little to learn; a shallow one has an interface nearly as complex as
  its implementation.
- **Seam** — where behavior can change without editing in that place, and where
  a module's interface lives. Avoid *boundary*, which is overloaded.
- **Adapter** — a concrete implementation of an interface at a seam.
- **Leverage** — the capability callers gain per unit of interface they learn.
- **Locality** — the concentration of change, bugs, knowledge, and verification
  in one place instead of across callers.

## Principles

- **Depth belongs to the interface, not implementation size.** Internal parts
  may remain small and swappable without becoming caller-facing complexity.
- **Use the deletion test.** If deleting a module makes complexity disappear,
  it was a pass-through. If complexity reappears across callers, it earned its
  place.
- **The interface is the test surface.** Tests should assert observable
  behavior through the same seam callers cross.
- **One adapter is a hypothetical seam; two make it real.** Introduce a seam
  only when variation across it is justified.

## Apply the Discipline

When designing or restructuring code:

1. State the module's callers, required behavior, constraints, and seam.
2. Reduce the interface—entry points, parameters, configuration, and facts a
   caller must know—while moving justified complexity behind it.
3. Decide whether dependencies are in-process, locally substitutable, remote
   but owned, or truly external. Use the appropriate testing strategy in
   [DEEPENING.md](DEEPENING.md).
4. Test outcomes through the interface rather than internal state. Avoid
   retaining tests for shallow components once the deep module's interface
   proves the same behavior.
5. If the interface is still uncertain, use the bounded alternative-design
   process in [DESIGN-IT-TWICE.md](DESIGN-IT-TWICE.md).

Use the project's `CONTEXT.md` terms for domain concepts. Do not create,
commit, push, install dependencies, or make external mutations unless the user
has separately authorized them.