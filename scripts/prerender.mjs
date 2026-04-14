import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const serverEntryUrl = pathToFileURL(path.join(distDir, "server", "entry-server.js")).href;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderMetaTag(tag) {
  const attrName = tag.property ? "property" : "name";
  const attrValue = tag.property || tag.name;
  return `<meta ${attrName}="${escapeHtml(attrValue)}" content="${escapeHtml(tag.content)}" />`;
}

function buildHeadMarkup(seo) {
  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    ...seo.meta.map(renderMetaTag),
    `<link rel="canonical" href="${escapeHtml(seo.pageUrl)}" />`,
    `<link rel="apple-touch-icon" href="https://homefrontsolutionsllc.com/apple-touch-icon.png" />`,
    `<script id="ld-json" type="application/ld+json">${JSON.stringify(seo.schemas)}</script>`,
  ].join("\n    ");
}

function normalizeTemplate(template) {
  return template
    .replace(/<meta name="description"[\s\S]*?\/>\s*/i, "")
    .replace(/<meta name="robots"[\s\S]*?\/>\s*/i, "")
    .replace(/<meta name="theme-color"[\s\S]*?\/>\s*/i, "")
    .replace(/<link rel="canonical"[\s\S]*?\/>\s*/i, "")
    .replace(/<title>[\s\S]*?<\/title>/i, "__SEO_HEAD__");
}

async function writeRouteHtml(routePath, template, render) {
  const { appHtml, seo } = render(routePath);
  const html = template
    .replace("__SEO_HEAD__", buildHeadMarkup(seo))
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  const outputPath = routePath === "/"
    ? path.join(distDir, "index.html")
    : path.join(distDir, routePath.replace(/^\//, ""), "index.html");

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, html, "utf8");
}

async function main() {
  const [{ render, getPrerenderPaths }, templateModule] = await Promise.all([
    import(serverEntryUrl),
    fs.readFile(path.join(distDir, "index.html"), "utf8"),
  ]);
  const template = normalizeTemplate(templateModule.toString());
  const paths = Array.from(new Set(getPrerenderPaths()));

  for (const routePath of paths) {
    await writeRouteHtml(routePath, template, render);
  }

  await fs.rm(path.join(distDir, "server"), { recursive: true, force: true });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
