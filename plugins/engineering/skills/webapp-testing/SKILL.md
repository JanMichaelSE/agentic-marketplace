---
name: webapp-testing
description: Test local web applications with Playwright scripts, browser inspection, screenshots, and console logging. Use for frontend verification or UI debugging when a local app and Playwright are already available.
license: Complete terms in LICENSE.txt
---

# Web Application Testing

Test local web applications with native Python Playwright scripts. This skill
ships a server-lifecycle helper and examples; it does not install Playwright,
browsers, or application dependencies.

## Prerequisites and Boundaries

- Python, Playwright, browser binaries, and any local application dependencies
  must already be available in the user-approved environment.
- Do not start services, launch a browser, or install dependencies without the
  authorization required by the user and repository.
- The bundled [helper](scripts/with_server.py) manages one or more local
  servers. Treat it as a black box: run `python scripts/with_server.py --help`
  before use, and read or modify its source only when customization is required.
- The helper and examples are distributed under [Apache License 2.0](LICENSE.txt).

## Choose an Approach

1. **Static HTML:** inspect the local HTML to find selectors, then use a
   `file://` URL in a Playwright script. See
   [static_html_automation.py](examples/static_html_automation.py).
2. **Dynamic app with no server:** inspect the helper’s `--help` output, then
   use it to start the approved server command before the test script.
3. **Dynamic app with a running server:** navigate, wait for `networkidle`,
   capture a screenshot or inspect rendered DOM, discover selectors, then
   perform actions.

## Run an Automation Script

Run the helper from this skill directory after inspecting its help:

```bash
python scripts/with_server.py --server "npm run dev" --port 5173 -- python automation.py
```

For each dynamic-page action, wait for the application to reach the required
rendered state before inspecting or selecting elements. Use semantic selectors
where possible, close the browser in all paths, and save screenshots or logs to
a user-approved local output location.

## Bundled Examples

- [element_discovery.py](examples/element_discovery.py) discovers rendered
  buttons, links, and inputs before interaction.
- [console_logging.py](examples/console_logging.py) captures browser console
  output during a local automation run.
- [static_html_automation.py](examples/static_html_automation.py) tests a local
  static HTML file using a `file://` URL.

## Validate Deliberately

Use reconnaissance before actions when selectors are uncertain. A successful
automation run should prove the intended visible behavior, not merely that the
page loaded. Report the script, target URL or file, assertions, generated
artifacts, and any environment prerequisite that prevented execution.