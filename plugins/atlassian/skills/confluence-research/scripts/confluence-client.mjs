#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import {
  atlassianGetJson, getAtlassianConfig, parseSharedArgs, printResult, renderJson, requireCommand, requireNonNegativeInteger,
} from "../../../scripts/lib/atlassian-rest.mjs";
import {
  DEFAULT_TEXT_LINES, LINK_PREVIEW_LIMIT, TABLE_PREVIEW_ROWS, compactPage, compactSpace, extractHeadings, extractLinks,
  extractTables, findSection, pageMeta, pageStorageHtml, pageText,
} from "../../../scripts/lib/confluence-storage.mjs";

const COMMANDS = ["page", "extract", "space", "snapshot", "get"];
const FIELDS = new Set(["meta", "raw", "compact", "text", "headings", "tables", "links", "section"]);

function usage() {
  return `Usage:
  confluence-client.mjs page <page-id-or-url> [--format text|json] [--text-lines n]
  confluence-client.mjs extract <page-url> [--format text|json] [--text-lines n]
  confluence-client.mjs space <space-key> [--format text|json]
  confluence-client.mjs snapshot <page-id-or-url> [--out path] [--format text|json]
  confluence-client.mjs get <snapshot-path> [--field meta|raw|compact|text|headings|tables|links|section] [--heading text] [--format text|json]`;
}

function parseArgs(argv) {
  const options = parseSharedArgs(argv, { textLines: DEFAULT_TEXT_LINES });
  requireCommand(options, COMMANDS);
  if (options.help) return options;
  options.textLines = requireNonNegativeInteger(options.textLines, "--text-lines");
  if (options.field && !FIELDS.has(options.field)) throw new Error(`--field must be one of: ${[...FIELDS].join(", ")}`);
  return options;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) return console.log(usage());
  let result;
  if (options.command === "get") result = readField(options.target, options);
  else {
    const config = getAtlassianConfig();
    if (options.command === "space") result = await fetchSpace(options.target, config);
    else if (options.command === "snapshot") result = await snapshot(options.target, config, options.out);
    else result = compactPage(await fetchPage(options.target, config), options.textLines);
  }
  if (options.command === "get" && (options.field || "compact") === "raw" && options.format === "text") console.log(renderJson(result));
  else printResult(result, options.format, renderText);
}

async function fetchPage(target, config) {
  const pageId = await resolvePageId(target, config);
  return atlassianGetJson(`/wiki/api/v2/pages/${pageId}?body-format=storage`, config);
}

async function fetchSpace(key, config) {
  const response = await atlassianGetJson(`/wiki/api/v2/spaces?keys=${encodeURIComponent(key)}`, config);
  const space = response.results?.[0] || response[0];
  if (!space) throw new Error(`No Confluence space found for key: ${key}`);
  return compactSpace(space);
}

async function resolvePageId(target, config) {
  const direct = String(target).match(/\/pages\/(\d+)(?:\/|$)/)?.[1] || (/^\d+$/.test(target) ? String(target) : "");
  if (direct) return direct;
  const key = String(target).match(/\/spaces\/([^/]+)(?:\/|$)/)?.[1];
  if (key && String(target).includes("/overview")) {
    const space = await fetchSpace(key, config);
    if (space.homepage?.id) return space.homepage.id;
  }
  throw new Error(`Could not infer a page ID from: ${target}`);
}

async function snapshot(target, config, out) {
  const page = await fetchPage(target, config);
  const file = resolve(out || defaultSnapshotPath(page));
  mkdirSync(dirname(file), { recursive: true });
  const serialized = renderJson(page);
  writeFileSync(file, `${serialized}\n`, "utf8");
  return { ...pageMeta(page), path: file, bytes: Buffer.byteLength(serialized, "utf8") };
}

function defaultSnapshotPath(page) {
  const slug = String(page.title || page.id).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "page";
  return join(process.env.CONFLUENCE_SNAPSHOT_DIR || tmpdir(), "agentic-marketplace", "confluence", `${page.id}-${slug}-v${page.version?.number || "unknown"}.json`);
}

function readField(file, options) {
  const page = JSON.parse(readFileSync(resolve(file), "utf8"));
  const field = options.field || "compact";
  const html = pageStorageHtml(page);
  if (field === "meta") return pageMeta(page);
  if (field === "raw") return page;
  if (field === "compact") return compactPage(page, options.textLines);
  if (field === "text") return { text: pageText(page) };
  if (field === "headings") return { headings: extractHeadings(html) };
  if (field === "tables") return { tables: extractTables(html) };
  if (field === "links") return { links: extractLinks(html) };
  if (!options.heading) throw new Error("--heading is required with --field section");
  const section = findSection(html, options.heading);
  if (!section) throw new Error(`No section heading matched: ${options.heading}`);
  return section;
}

function renderText(value) {
  if (value.path) return [`Saved: ${value.path}`, `Title: ${value.title}`, `ID: ${value.id}`, `Version: ${value.version}`, `Bytes: ${value.bytes}`].join("\n");
  if (value.heading) return `# ${value.heading}\n\n${value.text}`;
  if (value.text) return value.text;
  if (value.headings && !value.title) return value.headings.map(({ level, text }) => `${"  ".repeat(level - 1)}- ${text}`).join("\n");
  if (value.tables && !value.title) return value.tables.map((table, index) => `Table ${index + 1}:\n${table.map((row) => `- ${row.join(" | ")}`).join("\n")}`).join("\n\n");
  if (value.links && !value.title) return value.links.map(({ text, href }) => `- ${text || "(untitled)"} -> ${href}`).join("\n");
  if (value.headings) return renderPage(value);
  return [`# ${value.name}`, `Key: ${value.key}`, value.homepage && `Homepage: ${value.homepage.title} (${value.homepage.id})`, value.description && `\n${value.description}`].filter(Boolean).join("\n");
}

function renderPage(page) {
  const tables = page.tables.slice(0, TABLE_PREVIEW_ROWS).map((table, index) => `Table ${index + 1}: ${table.map((row) => row.join(" | ")).join("; ")}`);
  const links = page.links.slice(0, LINK_PREVIEW_LIMIT).map(({ text, href }) => `- ${text || "(untitled)"} -> ${href}`);
  return [`# ${page.title}`, `ID: ${page.id}`, `Status: ${page.status}`, `Version: ${page.version}`, "", "Headings:", ...page.headings.map(({ level, text }) => `${"  ".repeat(level - 1)}- ${text}`), "", "Tables:", ...(tables.length ? tables : ["- (none)"]), ...(links.length ? ["", "Links:", ...links] : []), ...(page.textPreview.length ? ["", "Text Preview:", ...page.textPreview] : [])].join("\n");
}

main().catch((error) => { console.error(`Error: ${error.message}`); process.exit(1); });