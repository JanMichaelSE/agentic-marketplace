import { decodeEntities } from "./atlassian-rest.mjs";

export const DEFAULT_TEXT_LINES = 80;
export const TABLE_PREVIEW_ROWS = 12;
export const LINK_PREVIEW_LIMIT = 20;

export function pageMeta(page) {
  return {
    id: page.id,
    title: page.title,
    type: page.type,
    status: page.status,
    space: { key: page.space?.key || page.spaceKey || "", name: page.space?.name || page.spaceName || page.spaceId || "" },
    version: page.version?.number,
    createdAt: page.createdAt || page.history?.createdDate || "",
    authorId: page.authorId || page.version?.authorId || "",
  };
}

export function pageStorageHtml(page) {
  return sanitizeStorageHtml(page.body?.storage?.value || "");
}

export function compactPage(page, textLines = DEFAULT_TEXT_LINES) {
  const html = pageStorageHtml(page);
  const lines = stripStorageTags(html).split("\n").map((line) => line.trim()).filter(Boolean);
  return {
    ...pageMeta(page),
    ancestors: (page.ancestors || []).map(({ id, title }) => ({ id, title })),
    labels: (page.metadata?.labels?.results || page.labels || []).map((label) => label.name || label),
    childPages: (page.children?.page?.results || []).map(({ id, title }) => ({ id, title })),
    headings: extractHeadings(html), tables: extractTables(html), links: extractLinks(html), textPreview: lines.slice(0, textLines),
  };
}

export function compactSpace(space) {
  return {
    key: space.key, id: space.id, name: space.name, type: space.type, status: space.status,
    homepage: space.homepage ? { id: space.homepage.id, title: space.homepage.title } : null,
    description: space.description?.plain?.value || space.description?.plain || "",
    labels: (space.metadata?.labels?.results || space.labels || []).map((label) => label.name || label),
  };
}

export function pageText(page) { return stripStorageTags(pageStorageHtml(page)); }

export function extractHeadings(html) {
  return [...String(html).matchAll(/<h([1-6])[^>]*>(.*?)<\/h\1>/gis)]
    .map((match) => ({ level: Number.parseInt(match[1], 10), text: stripStorageTags(match[2]).replace(/\s+/g, " ").trim() }))
    .filter(({ text }) => text);
}

export function extractTables(html) {
  return [...String(html).matchAll(/<table[^>]*>(.*?)<\/table>/gis)].map((table) =>
    [...table[1].matchAll(/<tr[^>]*>(.*?)<\/tr>/gis)].map((row) =>
      [...row[1].matchAll(/<t[dh][^>]*>(.*?)<\/t[dh]>/gis)].map((cell) => stripStorageTags(cell[1]).replace(/\s+/g, " ").trim()).filter(Boolean)
    ).filter((row) => row.length)
  ).filter((table) => table.length);
}

export function extractLinks(html) {
  return [...String(html).matchAll(/<a\b([^>]*)>(.*?)<\/a>/gis)].map((match) => ({
    href: decodeEntities(match[1].match(/\bhref="([^"]+)"/i)?.[1] || ""),
    text: stripStorageTags(match[2]).replace(/\s+/g, " ").trim(),
  })).filter(({ href, text }) => href || text);
}

export function findSection(html, heading) {
  const sections = [...String(html).matchAll(/<h([1-6])[^>]*>(.*?)<\/h\1>/gis)].map((match, index, all) => {
    const level = Number.parseInt(match[1], 10);
    const next = all.slice(index + 1).find((candidate) => Number.parseInt(candidate[1], 10) <= level);
    return { heading: stripStorageTags(match[2]), text: stripStorageTags(String(html).slice(match.index + match[0].length, next?.index)) };
  });
  const query = String(heading).trim().toLowerCase();
  return sections.find((section) => section.heading.toLowerCase() === query)
    || sections.find((section) => section.heading.toLowerCase().includes(query)) || null;
}

function sanitizeStorageHtml(html) {
  return String(html).replace(/<ac:structured-macro\b[^>]*\bac:name="toc"[\s\S]*?<\/ac:structured-macro>/gi, "")
    .replace(/<ac:parameter\b[\s\S]*?<\/ac:parameter>/gi, "").replace(/<\/?ac:[^>]+>/gi, "")
    .replace(/<ri:page\b[^>]*\bri:content-title="([^"]+)"[^>]*\/>/gi, "$1")
    .replace(/<ri:attachment\b[^>]*\bri:filename="([^"]+)"[^>]*\/>/gi, "$1");
}

function stripStorageTags(html) {
  return decodeEntities(sanitizeStorageHtml(html).replace(/<br\s*\/?>/gi, "\n").replace(/<\/(p|li|h[1-6]|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, " ").replace(/[ \t]+/g, " ").replace(/\n\s+/g, "\n").replace(/\n{3,}/g, "\n\n").trim());
}