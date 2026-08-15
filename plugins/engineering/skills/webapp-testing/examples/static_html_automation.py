# Modified for this marketplace; see ../LICENSE.txt for distribution terms.
from pathlib import Path

from playwright.sync_api import sync_playwright


html_file = Path("path/to/your/file.html").resolve()

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1920, "height": 1080})
    page.goto(html_file.as_uri())
    page.screenshot(path="static-page.png", full_page=True)

    # Replace these selectors and values with the static page's actual UI.
    page.click("text=Click Me")
    page.fill("#name", "Example User")
    page.fill("#email", "user@example.com")
    page.click('button[type="submit"]')
    page.wait_for_timeout(500)
    page.screenshot(path="after-submit.png", full_page=True)
    browser.close()