#!/usr/bin/env python3
import csv
from pathlib import Path


IMAGE_DIR = Path("scraped-images")
OUTPUT_CSV = IMAGE_DIR / "image-categories.csv"


RULES = [
    {
        "category": "Endpoint",
        "keywords": [
            "endpoint",
            "edr",
            "xdr",
            "crowdstrike",
            "sentinelone",
            "carbon-black",
            "bitdefender",
            "sophos",
            "symantec",
            "tanium",
            "jamf",
            "defender-for-endpoint",
            "fortiedr",
            "cybereason",
        ],
    },
    {
        "category": "System Logs",
        "keywords": [
            "syslog",
            "journald",
            "auditd",
            "system-audit",
            "systemd",
            "linux",
            "windows",
            "event-logs",
            "log-files",
            "osquery",
            "file-integrity",
            "sysmon",
            "system",
        ],
    },
    {
        "category": "Network/Security",
        "keywords": [
            "firewall",
            "waf",
            "ids",
            "ips",
            "vpn",
            "proxy",
            "secure",
            "security",
            "guardduty",
            "sentinel",
            "threat",
            "intel",
            "vulnerability",
            "exploit",
            "malware",
            "attack",
            "cisa",
            "snort",
            "suricata",
            "zeek",
            "pfsense",
            "netflow",
            "packet-capture",
            "network",
            "dns",
            "cortex",
            "xdr",
        ],
    },
    {
        "category": "Applications",
        "keywords": [
            "jira",
            "confluence",
            "slack",
            "salesforce",
            "servicenow",
            "github",
            "gitlab",
            "bitbucket",
            "dropbox",
            "box",
            "google-drive",
            "google-workspace",
            "gmail",
            "microsoft-365",
            "onedrive",
            "outlook",
            "teams",
            "sharepoint",
            "zoom",
            "notion",
            "canva",
            "mattermost",
            "pagerduty",
            "opsgenie",
            "xmatters",
            "tines",
            "torq",
            "swimlane",
            "email",
        ],
    },
]


IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".svg"}


def categorize(stem):
    stem_lower = stem.lower()
    for rule in RULES:
        if any(keyword in stem_lower for keyword in rule["keywords"]):
            return rule["category"]
    return "Services"


def main():
    if not IMAGE_DIR.exists():
        raise SystemExit(f"Missing directory: {IMAGE_DIR}")

    image_paths = sorted(
        path
        for path in IMAGE_DIR.iterdir()
        if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS
    )

    with OUTPUT_CSV.open("w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["filename", "category"])
        for path in image_paths:
            writer.writerow([path.name, categorize(path.stem)])

    print(f"Wrote {OUTPUT_CSV} with {len(image_paths)} entries.")


if __name__ == "__main__":
    main()

