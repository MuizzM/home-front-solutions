import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { GoogleAuth } from "google-auth-library";

const INDEXING_ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish";
const METADATA_ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications/metadata";
const ROOT = process.cwd();
const SITEMAP_PATH = path.join(ROOT, "public", "sitemap.xml");

function readSitemapUrls() {
  const xml = fs.readFileSync(SITEMAP_PATH, "utf8");
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)];
  return matches.map((match) => match[1]);
}

function getJobUrlsFromSitemap() {
  return readSitemapUrls().filter((url) => {
    return url.includes("/careers/")
      && !url.includes("/apply")
      && !url.endsWith("/careers");
  });
}

function getTargetUrls(argUrl) {
  if (argUrl) return [argUrl];
  const urls = getJobUrlsFromSitemap();
  if (!urls.length) {
    throw new Error("No job URLs were found in public/sitemap.xml.");
  }
  return urls;
}

async function getAccessToken() {
  const auth = new GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/indexing"]
  });
  const client = await auth.getClient();
  const tokenResponse = await client.getAccessToken();
  const token = typeof tokenResponse === "string" ? tokenResponse : tokenResponse?.token;
  if (!token) {
    throw new Error("Unable to get Google access token. Make sure GOOGLE_APPLICATION_CREDENTIALS points to your service-account JSON file.");
  }
  return token;
}

async function publishUrl(token, url, type) {
  const response = await fetch(INDEXING_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url, type })
  });

  const bodyText = await response.text();
  if (!response.ok) {
    throw new Error(`Indexing API request failed for ${url}: ${response.status} ${bodyText}`);
  }

  return JSON.parse(bodyText);
}

async function getStatus(token, url) {
  const encoded = encodeURIComponent(url);
  const response = await fetch(`${METADATA_ENDPOINT}?url=${encoded}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json"
    }
  });

  const bodyText = await response.text();
  if (!response.ok) {
    throw new Error(`Metadata request failed for ${url}: ${response.status} ${bodyText}`);
  }

  return JSON.parse(bodyText);
}

function printUsage() {
  console.log(`
Usage:
  npm run seo:index-jobs
  npm run seo:index-jobs -- https://www.homefrontsolutionsllc.com/careers/fiber-sales-rep-high-point
  node scripts/google-indexing-api.mjs deleted https://www.homefrontsolutionsllc.com/careers/fiber-sales-rep-high-point
  npm run seo:index-status -- https://www.homefrontsolutionsllc.com/careers/fiber-sales-rep-high-point

Commands:
  updated   Notify Google that one URL, or all job URLs in public/sitemap.xml, were added or updated.
  deleted   Notify Google that a specific job URL should be removed.
  status    Check the latest Indexing API notification status for a specific URL.
`.trim());
}

async function main() {
  const command = (process.argv[2] || "").toLowerCase();
  const argUrl = process.argv[3];

  if (!command || !["updated", "deleted", "status"].includes(command)) {
    printUsage();
    process.exit(command ? 1 : 0);
  }

  if ((command === "deleted" || command === "status") && !argUrl) {
    throw new Error(`The "${command}" command requires a full URL.`);
  }

  const token = await getAccessToken();

  if (command === "status") {
    const metadata = await getStatus(token, argUrl);
    console.log(JSON.stringify(metadata, null, 2));
    return;
  }

  const urls = getTargetUrls(argUrl);
  const type = command === "updated" ? "URL_UPDATED" : "URL_DELETED";

  for (const url of urls) {
    const result = await publishUrl(token, url, type);
    console.log(`${type}: ${url}`);
    console.log(JSON.stringify(result, null, 2));
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
