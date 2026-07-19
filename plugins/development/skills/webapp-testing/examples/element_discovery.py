# Modified for this marketplace; see ../LICENSE.txt for distribution terms.
from playwright.sync_api import sync_playwright


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:5173")  # Replace with the approved local URL.
    page.wait_for_load_state("networkidle")

    for label, selector in (("buttons", "button"), ("links", "a[href]"),
                            ("inputs", "input, textarea, select")):
        elements = page.locator(selector).all()
        print(f"Found {len(elements)} {label}:")
        for element in elements:
            print(f"  - {element.inner_text().strip() or '[no text]'}")

    page.screenshot(path="page-discovery.png", full_page=True)
    browser.close()