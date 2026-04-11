# Google Indexing API Setup

This project includes a script that can notify Google when job posting URLs are added, updated, or removed.

Important:
- The Indexing API is only intended for pages with `JobPosting` or livestream structured data.
- In this site, use it for individual job detail pages such as `/careers/fiber-sales-rep-high-point`.
- Keep the sitemap live too:
  `https://www.homefrontsolutionsllc.com/sitemap.xml`

## 1. Create a Google Cloud project

Open:
- https://console.cloud.google.com/

Create a project for Home Front Solutions if you do not already have one.

## 2. Enable the Indexing API

Open:
- https://console.cloud.google.com/apis/library/indexing.googleapis.com

Enable the API for your project.

## 3. Create a service account

Open:
- https://console.cloud.google.com/iam-admin/serviceaccounts

Create a service account for indexing, for example:
- `google-indexing-api`

Create and download a JSON key file.

## 4. Add the service account to Google Search Console

Open:
- https://search.google.com/search-console

Add the site as a property if you have not already.

Then add the service account email as an owner or delegated owner on the property.

Important:
- Use the service account email from the JSON file.
- If this step is skipped, the Indexing API will usually fail even if the API is enabled.

## 5. Store the credentials locally

Put the downloaded JSON key somewhere safe outside the repo if possible.

Example:

```bash
mkdir -p "$HOME/.config/homefront"
mv /path/to/google-service-account.json "$HOME/.config/homefront/google-indexing.json"
```

Set the environment variable:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.config/homefront/google-indexing.json"
```

To persist it in zsh:

```bash
echo 'export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.config/homefront/google-indexing.json"' >> ~/.zshrc
source ~/.zshrc
```

## 6. Install dependencies

```bash
npm install
```

## 7. Notify Google about job URLs

Notify Google that all job URLs in `public/sitemap.xml` were updated:

```bash
npm run seo:index-jobs
```

Notify Google about one updated job URL:

```bash
npm run seo:index-jobs -- https://www.homefrontsolutionsllc.com/careers/fiber-sales-rep-high-point
```

Check notification status for one URL:

```bash
npm run seo:index-status -- https://www.homefrontsolutionsllc.com/careers/fiber-sales-rep-high-point
```

Notify Google that a job URL should be removed:

```bash
node scripts/google-indexing-api.mjs deleted https://www.homefrontsolutionsllc.com/careers/fiber-sales-rep-high-point
```

## 8. When to use each command

- Use `updated` after:
  - publishing a new job page
  - editing job content
  - changing compensation, location, or availability

- Use `deleted` after:
  - returning `404` or `410` for a closed job page
  - or marking the page `noindex`
  - or fully removing `JobPosting` schema from that page

## 9. Good operating practice

- Keep `validThrough` current on every live job.
- Keep `datePosted` accurate.
- Do not use the Indexing API for list pages like `/careers` or market pages.
- Continue using the sitemap for full-site discovery.
- Re-run the update command whenever job detail content changes materially.
