# Cloudflare Deploy Notes

This site is ready to deploy to Cloudflare Pages.

## Build settings

- Framework preset: `None`
- Build command: `npm run build`
- Build output directory: `dist`

## CLI deploy

```bash
npm run build
npm run cf:deploy
```

## Recommended domain setup for this project

Use `www.homefrontsolutionsllc.com` as the Cloudflare Pages custom domain.

This is the lowest-risk setup because the root domain and Microsoft 365 email records can stay managed in Microsoft DNS while `www` points to Cloudflare Pages.

## Microsoft DNS record to add

After creating the Cloudflare Pages project and adding the custom domain in Cloudflare Pages, create:

- Type: `CNAME`
- Host: `www`
- Points to: `<your-pages-project>.pages.dev`

Do not change the Microsoft mail records for Outlook / Microsoft 365.
