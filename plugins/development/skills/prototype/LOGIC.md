# Logic Prototype

Use a logic prototype for a question about business rules, state transitions,
data shape, or an API surface that is hard to evaluate on paper. It is the
wrong shape for deciding visual layout; use [UI.md](UI.md) for that.

## Build a Small, Inspectable Model

1. Write the one-paragraph question and the state model being explored at the
   top of the prototype or its adjacent README.
2. Use the host project's language and tools. If it has no obvious runtime or
   task runner, ask rather than adding one.
3. Put the candidate logic behind a small, pure interface where possible: a
   reducer, explicit state machine, pure functions over plain data, or a module
   with a clear method surface. Keep terminal/UI code outside that logic.
4. Add the thinnest interactive shell needed to drive actions manually. Keep
   state in memory unless persistence is the specific question being tested.
5. Render the complete relevant state after every action so the reviewer can
   see what changed. Keep it small enough for one screen and provide a single
   clear command or review instruction.

Do not add tests, production persistence, generalized extension points, or
polish merely to make the prototype look production-ready. The logic may inform
the real module later, but it must be rewritten or deliberately integrated
under production standards after the prototype proves the answer.

## Close Out

Record the question, answer, and evidence only in an authorized durable place.
Then remove the disposable shell and prototype artifacts with authorization, or
carry only the validated idea into the production design.