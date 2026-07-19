# UI Prototype

Use a UI prototype when the question is visual or interaction-oriented: layout,
information hierarchy, primary affordance, or a user choosing among plausible
directions. It is the wrong shape for state-model questions; use
[LOGIC.md](LOGIC.md) instead.

## Compare Meaningfully Different Variants

1. State the question and plan for up to three structurally different variants.
   They must disagree on layout, hierarchy, or primary affordance—not just
   colors or wording.
2. Prefer mounting variants inside an existing page or flow so they retain real
   context, data density, and navigation. Only create an obvious throwaway
   route when no suitable host exists; follow the project's routing convention.
3. Use the existing component library, styling system, and read-only/stubbed
   data. Do not wire variants to real mutations or production data.
4. Make the selected variant clear and reviewable. A query parameter or the
   project's equivalent is useful when already supported, but do not impose a
   new routing mechanism solely for the prototype.
5. Give the reviewer a path or command to inspect the prototype without
   automatically starting the app or opening a browser. Existing web-testing
   guidance may be used when available, but this skill does not require any
   companion plugin to be installed.

## Finish Deliberately

Capture the chosen direction and why it answered the stated question in an
authorized durable record. With authorization, fold the winning design into a
production-quality implementation or remove all variants, switchers, and
throwaway routes. Do not leave experimental routes, UI controls, or prototype
components for later readers to mistake as supported product behavior.