import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const KEYCHAIN_SERVICE = "atlassian-api-token";
const FORMATS = new Set(["text", "json"]);
const ACLI_CONFIG_FILES = [
  join(homedir(), ".config", "acli", "jira_config.yaml"),
  join(homedir(), ".config", "acli", "confluence_config.yaml"),
  join(homedir(), ".config", "acli", "global_auth_config.yaml"),
];

export function parseSharedArgs(argv, defaults = {}) {
  const [command, target, ...args] = argv;
  const options = { command, target, format: "text", ...defaults };
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--help" || arg === "-h") options.help = true;
    else if (arg === "--format") options.format = requireValue(args, ++index, arg);
    else if (arg.startsWith("--")) {
      const key = arg.slice(2).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      options[key] = requireValue(args, ++index, arg);
    } else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!FORMATS.has(options.format)) throw new Error("--format must be text or json");
  return options;
}

export function requireCommand(options, commands) {
  if (options.help) return;
  if (!commands.includes(options.command)) throw new Error(`Expected command: ${commands.join(", ")}`);
  if (!options.target) throw new Error(`Missing target for command: ${options.command}`);
}

export function requireNonNegativeInteger(value, flag) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < 0) throw new Error(`${flag} must be a non-negative integer`);
  return parsed;
}

export function getAtlassianConfig() {
  const profile = readAcliProfile();
  const site = process.env.ATLASSIAN_SITE || profile.site;
  const email = process.env.ATLASSIAN_EMAIL || profile.email;
  const service = process.env.ATLASSIAN_KEYCHAIN_SERVICE || KEYCHAIN_SERVICE;
  if (!site) throw new Error("Set ATLASSIAN_SITE or configure an acli profile with a site");
  if (!email) throw new Error("Set ATLASSIAN_EMAIL or configure an acli profile with an email");
  const token = process.env.ATLASSIAN_API_TOKEN || readKeychainToken(service, email);
  if (!token) throw new Error("Configure an API token in the invoking environment or approved macOS Keychain item");
  return { site, email, token };
}

export async function atlassianGetJson(path, config = getAtlassianConfig()) {
  return requestJson("GET", path, undefined, config);
}

export async function atlassianPostJson(path, payload, config = getAtlassianConfig()) {
  return requestJson("POST", path, payload, config);
}

export function renderJson(value) {
  return JSON.stringify(value, null, 2);
}

export function printResult(result, format, renderText) {
  console.log(format === "json" ? renderJson(result) : renderText(result));
}

export function decodeEntities(value) {
  return String(value)
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&#39;/g, "'");
}

function requireValue(values, index, flag) {
  const value = values[index];
  if (!value || value.startsWith("--")) throw new Error(`${flag} requires a value`);
  return value;
}

async function requestJson(method, path, payload, config) {
  const headers = {
    Authorization: `Basic ${Buffer.from(`${config.email}:${config.token}`, "utf8").toString("base64")}`,
    Accept: "application/json",
  };
  const init = { method, headers };
  if (payload !== undefined) {
    headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(payload);
  }
  const response = await fetch(`https://${config.site}${path}`, init);
  const body = await response.text();
  if (!response.ok) throw new Error(`${method} ${path} failed (${response.status}): ${errorDetail(body)}`);
  return JSON.parse(body);
}

function errorDetail(body) {
  try {
    const parsed = JSON.parse(body);
    return parsed.message || parsed.errorMessages?.join("; ") || JSON.stringify(parsed.errors) || "request failed";
  } catch {
    return body.trim() || "request failed";
  }
}

function readKeychainToken(service, email) {
  if (process.platform !== "darwin") return "";
  try {
    return execFileSync("security", ["find-generic-password", "-s", service, "-a", email, "-w"], {
      encoding: "utf8", stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch { return ""; }
}

function readAcliProfile() {
  for (const file of ACLI_CONFIG_FILES) {
    try {
      const text = readFileSync(file, "utf8");
      const profile = { site: yamlValue(text, "site"), email: yamlValue(text, "email") };
      if (profile.site || profile.email) return profile;
    } catch { /* Try the next optional profile. */ }
  }
  return {};
}

function yamlValue(text, key) {
  return text.match(new RegExp(`^\\s*${key}:\\s*"?([^"\\n]+)"?\\s*$`, "m"))?.[1].trim() || "";
}