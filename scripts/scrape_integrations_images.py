#!/usr/bin/env python3
import os
import re
import sys
import urllib.parse
import urllib.request
from html.parser import HTMLParser
from pathlib import Path


PAGE_URL = "https://www.elastic.co/integrations/data-integrations"
OUTPUT_DIR = Path("scraped-images")


class DetailsCardParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.cards = []
        self._div_stack = []
        self._card_stack = []

    def handle_starttag(self, tag, attrs):
        attrs_map = {key: value for key, value in attrs}
        if tag == "div":
            class_value = attrs_map.get("class", "") or ""
            classes = class_value.split()
            is_details_card = "details-card" in classes
            self._div_stack.append(is_details_card)
            if is_details_card:
                self._card_stack.append({"img_src": None, "h6_id": None})

        if self._card_stack:
            current_card = self._card_stack[-1]
            if tag == "img" and not current_card["img_src"]:
                current_card["img_src"] = attrs_map.get("src")
            if tag == "h6" and not current_card["h6_id"]:
                current_card["h6_id"] = attrs_map.get("id")

    def handle_endtag(self, tag):
        if tag != "div" or not self._div_stack:
            return

        is_details_card = self._div_stack.pop()
        if is_details_card and self._card_stack:
            self.cards.append(self._card_stack.pop())


def fetch_html(url):
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (compatible; ImageScraper/1.0)"},
    )
    with urllib.request.urlopen(request) as response:
        return response.read().decode("utf-8", errors="replace")


def sanitize_filename(value):
    sanitized = re.sub(r"[^a-zA-Z0-9_-]+", "-", value.strip())
    return sanitized.strip("-") or "image"


def get_extension(url):
    path = urllib.parse.urlparse(url).path
    extension = Path(path).suffix
    return extension if extension else ".img"


def unique_filename(base_name, extension, name_counts):
    count = name_counts.get(base_name, 0) + 1
    name_counts[base_name] = count
    suffix = "" if count == 1 else f"-{count}"
    return f"{base_name}{suffix}{extension}"


def download_image(url, output_path):
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (compatible; ImageScraper/1.0)"},
    )
    with urllib.request.urlopen(request) as response, output_path.open("wb") as file:
        file.write(response.read())


def main():
    html = fetch_html(PAGE_URL)

    parser = DetailsCardParser()
    parser.feed(html)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    name_counts = {}
    downloaded = 0
    skipped = 0

    for card in parser.cards:
        image_src = card.get("img_src")
        card_id = card.get("h6_id")

        if not image_src or not card_id:
            skipped += 1
            continue

        image_url = urllib.parse.urljoin(PAGE_URL, image_src)
        base_name = sanitize_filename(card_id)
        extension = get_extension(image_url)
        file_name = unique_filename(base_name, extension, name_counts)
        output_path = OUTPUT_DIR / file_name

        try:
            download_image(image_url, output_path)
            downloaded += 1
        except Exception as exc:
            skipped += 1
            print(f"Failed to download {image_url}: {exc}", file=sys.stderr)

    print(f"Downloaded {downloaded} images to {OUTPUT_DIR}")
    if skipped:
        print(f"Skipped {skipped} cards (missing data or download failure)")


if __name__ == "__main__":
    main()

