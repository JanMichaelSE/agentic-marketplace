# Modified for this marketplace; see ../LICENSE.txt for distribution terms.
from pathlib import Path

from playwright.sync_api import sync_playwright


url = "http://localhost:5173"  # Replace with the approved local URL.
output_path = Path("console.log")
console_logs = []


def capture_console_message(message):
    line = f"[{message.type}] {message.text}"
    console_logs.append(line)
    print(line)


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1920, "height": 1080})
    page.on("console", capture_console_message)
    page.goto(url)
    page.wait_for_load_state("networkidle")
    # Add approved interactions that trigger relevant console output.
    browser.close()

output_path.write_text("\n".join(console_logs), encoding="utf-8")
print(f"Captured {len(console_logs)} console messages in {output_path}")