import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const serverEntryUrl = pathToFileURL(path.join(distDir, "server", "entry-server.js")).href;
const siteOrigin = "https://www.homefrontsolutionsllc.com";

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
    `<link rel="apple-touch-icon" href="${escapeHtml(siteOrigin)}/apple-touch-icon.png" />`,
    `<script id="ld-json" type="application/ld+json">${JSON.stringify(seo.schemas)}</script>`,
  ].join("\n    ");
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function normalizeTemplate(template) {
  return template
    .replace(/<meta name="description"[\s\S]*?\/>\s*/i, "")
    .replace(/<meta name="robots"[\s\S]*?\/>\s*/i, "")
    .replace(/<meta name="theme-color"[\s\S]*?\/>\s*/i, "")
    .replace(/<link rel="canonical"[\s\S]*?\/>\s*/i, "")
    .replace(/<title>[\s\S]*?<\/title>/i, "__SEO_HEAD__");
}

function buildJobFeedXml(jobs) {
  const items = jobs.map((job) => {
    const responsibilities = job.responsibilities.map((item) => `<item>${escapeXml(item)}</item>`).join("");
    const qualifications = job.qualifications.map((item) => `<item>${escapeXml(item)}</item>`).join("");
    const benefits = job.benefits.map((item) => `<item>${escapeXml(item)}</item>`).join("");

    return [
      "  <job>",
      `    <id>${escapeXml(job.id)}</id>`,
      `    <title>${escapeXml(job.title)}</title>`,
      `    <category>${escapeXml(job.category)}</category>`,
      `    <location>${escapeXml(job.location)}</location>`,
      `    <employment_type>${escapeXml(job.employmentType)}</employment_type>`,
      `    <date_posted>${escapeXml(job.datePosted)}</date_posted>`,
      `    <valid_through>${escapeXml(job.validThrough)}</valid_through>`,
      `    <short_pitch>${escapeXml(job.shortPitch)}</short_pitch>`,
      `    <description>${escapeXml(job.description)}</description>`,
      "    <salary>",
      `      <currency>${escapeXml(job.salary.currency)}</currency>`,
      `      <unit>${escapeXml(job.salary.unitText)}</unit>`,
      `      <min>${escapeXml(job.salary.min)}</min>`,
      `      <max>${escapeXml(job.salary.max)}</max>`,
      "    </salary>",
      `    <detail_url>${escapeXml(job.detailUrl)}</detail_url>`,
      `    <apply_url>${escapeXml(job.applyUrl)}</apply_url>`,
      "    <company>",
      `      <name>${escapeXml(job.company.name)}</name>`,
      `      <website>${escapeXml(job.company.website)}</website>`,
      `      <email>${escapeXml(job.company.email)}</email>`,
      `      <phone>${escapeXml(job.company.phone)}</phone>`,
      "    </company>",
      `    <responsibilities>${responsibilities}</responsibilities>`,
      `    <qualifications>${qualifications}</qualifications>`,
      `    <benefits>${benefits}</benefits>`,
      "  </job>",
    ].join("\n");
  }).join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    "<jobs>",
    items,
    "</jobs>",
    "",
  ].join("\n");
}

function getLastmodForPath(routePath) {
  // Build-time ISO date. Update rhythm comes from CI / re-deploy cadence.
  const today = new Date().toISOString().slice(0, 10);
  return today;
}

function getPriorityForPath(routePath) {
  if (routePath === "/") return "1.0";
  if (/^\/(careers|insights|contact|what-we-do|service-areas|why-us|partners)$/.test(routePath)) return "0.9";
  if (/^\/service-areas\/(north-carolina|south-carolina|georgia|virginia)$/.test(routePath)) return "0.9";
  if (/^\/service-areas\//.test(routePath)) return "0.8";
  if (/^\/markets\//.test(routePath)) return "0.8";
  if (/^\/careers\//.test(routePath) && !/\/apply/.test(routePath)) return "0.8";
  if (/^\/insights\//.test(routePath)) return "0.7";
  return "0.6";
}

function getChangefreqForPath(routePath) {
  if (routePath === "/") return "weekly";
  if (/^\/(careers|insights)$/.test(routePath)) return "weekly";
  if (/^\/careers\//.test(routePath)) return "weekly";
  if (/^\/markets\//.test(routePath) || /^\/service-areas\//.test(routePath)) return "monthly";
  if (/^\/insights\//.test(routePath)) return "monthly";
  return "monthly";
}

function buildSitemapXml(paths) {
  const urls = paths.map((routePath) => {
    const location = routePath === "/"
      ? `${siteOrigin}/`
      : `${siteOrigin}${routePath}`;
    const lastmod = getLastmodForPath(routePath);
    const changefreq = getChangefreqForPath(routePath);
    const priority = getPriorityForPath(routePath);
    return [
      "  <url>",
      `    <loc>${escapeXml(location)}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      "  </url>",
    ].join("\n");
  }).join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n");
}

function buildJobSitemapXml(jobs) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = jobs.map((job) => [
    "  <url>",
    `    <loc>${escapeXml(job.detailUrl)}</loc>`,
    `    <lastmod>${today}</lastmod>`,
    `    <changefreq>weekly</changefreq>`,
    `    <priority>0.8</priority>`,
    "  </url>",
  ].join("\n")).join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n");
}

function buildSitemapIndexXml() {
  const today = new Date().toISOString().slice(0, 10);
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    "  <sitemap>",
    `    <loc>${siteOrigin}/sitemap.xml</loc>`,
    `    <lastmod>${today}</lastmod>`,
    "  </sitemap>",
    "  <sitemap>",
    `    <loc>${siteOrigin}/job-sitemap.xml</loc>`,
    `    <lastmod>${today}</lastmod>`,
    "  </sitemap>",
    "</sitemapindex>",
    "",
  ].join("\n");
}

function buildRobotsTxt() {
  return [
    "User-agent: *",
    "Allow: /",
    "Disallow: /careers/*/apply",
    "Disallow: /careers/*/apply/thank-you",
    "",
    "# Let Google for Jobs + Googlebot-Image crawl the whole site including job pages",
    "User-agent: Googlebot",
    "Allow: /",
    "Disallow: /careers/*/apply/thank-you",
    "",
    "User-agent: Googlebot-Image",
    "Allow: /",
    "",
    "# Let LLM retrieval crawlers access the public marketing, careers, and insights",
    "User-agent: GPTBot",
    "Allow: /",
    "",
    "User-agent: ClaudeBot",
    "Allow: /",
    "",
    "User-agent: PerplexityBot",
    "Allow: /",
    "",
    "User-agent: OAI-SearchBot",
    "Allow: /",
    "",
    "# Block aggressive archive + scrape bots that offer us no value",
    "User-agent: AhrefsBot",
    "Disallow: /",
    "",
    "User-agent: SemrushBot",
    "Disallow: /",
    "",
    "User-agent: MJ12bot",
    "Disallow: /",
    "",
    "User-agent: DotBot",
    "Disallow: /",
    "",
    "# Sitemaps",
    `Sitemap: ${siteOrigin}/sitemap-index.xml`,
    `Sitemap: ${siteOrigin}/sitemap.xml`,
    `Sitemap: ${siteOrigin}/job-sitemap.xml`,
    "",
  ].join("\n");
}

function buildYoungProfessionalCampaign(jobs) {
  const campaigns = jobs.map((job) => ({
    title: job.title,
    location: job.location,
    audience: "young professionals, recent grads, college students, and career switchers who want high-income field sales experience",
    detailUrl: job.detailUrl,
    applyUrl: job.applyUrl,
    linkedinPost: `Young professionals in ${job.location}: if you want a real income path instead of another low-upside entry-level role, this ${job.title} opening at Home Front Solutions is live.\n\nWhat stands out:\n- ${job.shortPitch}\n- ${job.benefits[0]}\n- ${job.benefits[1] || job.benefits[0]}\n\nSee the role: ${job.detailUrl}\nApply here: ${job.applyUrl}`,
    instagramCaption: `${job.location} opportunity: ${job.title}.\n\nBuilt for ambitious young professionals who want real earnings, fast growth, and strong communication skills.\n\nApply: ${job.applyUrl}`,
    textBlurb: `${job.title} in ${job.location} is open at Home Front Solutions. Good fit for driven young professionals who want strong income upside. Details: ${job.detailUrl} Apply: ${job.applyUrl}`,
  }));

  return `${JSON.stringify(campaigns, null, 2)}\n`;
}

function buildYoungProfessionalMarkdown(jobs) {
  const sections = jobs.map((job) => [
    `## ${job.title} - ${job.location}`,
    "",
    "LinkedIn",
    `${job.title} is live at Home Front Solutions for candidates in ${job.location}. This is a strong fit for young professionals who want real income upside, faster career growth, and customer-facing experience that compounds.`,
    "",
    `Apply: ${job.applyUrl}`,
    `Learn more: ${job.detailUrl}`,
    "",
    "Instagram",
    `${job.location}: ${job.title}. Real earning upside. Strong training. Built for ambitious young professionals.`,
    "",
    "Text / DM",
    `${job.title} is open in ${job.location}. If you know someone early in their career who wants a serious field-sales opportunity, send them this: ${job.applyUrl}`,
    "",
  ].join("\n")).join("\n");

  return `# Young Professional Outreach Pack\n\n${sections}`;
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
  const [{ render, getPrerenderPaths, getJobsForAutomation }, templateModule] = await Promise.all([
    import(serverEntryUrl),
    fs.readFile(path.join(distDir, "index.html"), "utf8"),
  ]);
  const template = normalizeTemplate(templateModule.toString());
  const paths = Array.from(new Set(getPrerenderPaths()));

  for (const routePath of paths) {
    await writeRouteHtml(routePath, template, render);
  }

  const sitemapPaths = paths.filter((routePath) => !/\/apply(\/|$)/.test(routePath));

  const jobs = getJobsForAutomation();
  await fs.writeFile(path.join(distDir, "job-board-feed.json"), `${JSON.stringify(jobs, null, 2)}\n`, "utf8");
  await fs.writeFile(path.join(distDir, "job-board-feed.xml"), buildJobFeedXml(jobs), "utf8");
  await fs.writeFile(path.join(distDir, "sitemap.xml"), buildSitemapXml(sitemapPaths), "utf8");
  await fs.writeFile(path.join(distDir, "job-sitemap.xml"), buildJobSitemapXml(jobs), "utf8");
  await fs.writeFile(path.join(distDir, "sitemap-index.xml"), buildSitemapIndexXml(), "utf8");
  await fs.writeFile(path.join(distDir, "robots.txt"), buildRobotsTxt(), "utf8");
  await fs.writeFile(path.join(distDir, "young-professional-campaign.json"), buildYoungProfessionalCampaign(jobs), "utf8");
  await fs.writeFile(path.join(distDir, "young-professional-campaign.md"), buildYoungProfessionalMarkdown(jobs), "utf8");

  await fs.rm(path.join(distDir, "server"), { recursive: true, force: true });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
