#!/usr/bin/env node

import {
  atlassianGetJson,
  atlassianPostJson,
  getAtlassianConfig,
  parseSharedArgs,
  printResult,
  requireCommand,
  requireNonNegativeInteger,
} from "../../../scripts/lib/atlassian-rest.mjs";

const COMMANDS = ["issue", "search", "project"];
const DEFAULT_FIELDS = ["summary", "status", "issuetype", "assignee", "parent", "fixVersions"];

function usage() {
  return `Usage:
  jira-client.mjs issue <issue-key> [--format text|json] [--fields summary,status,parent]
  jira-client.mjs search <jql> [--format text|json] [--fields key,summary,status] [--limit n]
  jira-client.mjs project <project-key> [--format text|json]

Configuration: ATLASSIAN_SITE and ATLASSIAN_EMAIL (or an acli profile), plus an API token in the process environment or configured macOS Keychain.`;
}

function parseArgs(argv) {
  const options = parseSharedArgs(argv, { fields: DEFAULT_FIELDS.join(","), limit: 25 });
  requireCommand(options, COMMANDS);
  if (options.help) return options;
  options.fields = String(options.fields).split(",").map((field) => field.trim()).filter(Boolean);
  options.limit = requireNonNegativeInteger(options.limit, "--limit");
  return options;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) return console.log(usage());
  const config = getAtlassianConfig();
  let result;
  if (options.command === "issue") result = await fetchIssue(options.target, options.fields, config);
  else if (options.command === "search") result = await searchIssues(options.target, options.fields, options.limit, config);
  else result = await fetchProject(options.target, config);
  printResult(result, options.format, renderText);
}

async function fetchIssue(key, fields, config) {
  const query = new URLSearchParams({ fields: fields.join(",") });
  return compactIssue(await atlassianGetJson(`/rest/api/3/issue/${encodeURIComponent(key)}?${query}`, config));
}

async function searchIssues(jql, fields, limit, config) {
  const response = await atlassianPostJson("/rest/api/3/search/jql", { jql, fields, maxResults: limit }, config);
  return {
    jql, total: response.total ?? null, isLast: response.isLast, nextPageToken: response.nextPageToken,
    issues: (response.issues || []).map(compactIssue),
  };
}

async function fetchProject(key, config) {
  const project = await atlassianGetJson(`/rest/api/3/project/${encodeURIComponent(key)}`, config);
  return { id: project.id, key: project.key, name: project.name, type: project.projectTypeKey, style: project.style };
}

function compactIssue(issue) {
  const fields = issue.fields || {};
  return {
    id: issue.id, key: issue.key, url: issue.self, summary: fields.summary,
    issueType: fields.issuetype?.name, status: fields.status?.name,
    assignee: fields.assignee ? { displayName: fields.assignee.displayName, accountId: fields.assignee.accountId } : null,
    parent: fields.parent ? { key: fields.parent.key, summary: fields.parent.fields?.summary } : null,
    fixVersions: (fields.fixVersions || []).map(({ name }) => name),
  };
}

function renderText(result) {
  if (result.issues) return [`# Jira Search`, `JQL: ${result.jql}`, ...result.issues.map((issue) => `- ${issue.key} [${issue.status || "unknown"}] ${issue.summary || "(no summary)"}`)].join("\n");
  if (result.name && !result.summary) return [`# ${result.key}: ${result.name}`, result.type && `Type: ${result.type}`, result.style && `Style: ${result.style}`].filter(Boolean).join("\n");
  return [`# ${result.key}: ${result.summary || "(no summary)"}`, result.issueType && `Type: ${result.issueType}`, result.status && `Status: ${result.status}`, result.assignee && `Assignee: ${result.assignee.displayName}`, result.parent && `Parent: ${result.parent.key}`].filter(Boolean).join("\n");
}

main().catch((error) => { console.error(`Error: ${error.message}`); process.exit(1); });