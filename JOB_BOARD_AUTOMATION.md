# Job Board Automation

This site now generates two build artifacts that can be used for job board and ATS integrations:

- `/job-board-feed.json`
- `/job-board-feed.xml`

These files are built from the live job data already used on the Home Front Solutions careers pages.

## What this solves

- Gives you one canonical source of truth for open jobs
- Makes it easier to connect supported boards through feed imports
- Keeps job board URLs aligned with your own careers pages and apply pages
- Reduces manual copy/paste when updating jobs

## What this does not solve by itself

This does not automatically post to every job board account on the internet.

Most large boards require one of the following:

- manual posting inside your employer account
- ATS integration
- XML or API feed approval tied to your account
- paid sponsorship or partner setup

## Recommended rollout

1. Deploy the updated site so the feeds are live in production.
2. Verify these URLs:
   - `https://www.homefrontsolutionsllc.com/job-board-feed.json`
   - `https://www.homefrontsolutionsllc.com/job-board-feed.xml`
3. Use the feed when a board or ATS asks for a jobs feed URL.
4. For boards that do not support feeds directly, use your careers pages as the source URLs for manual posting.

## Best next integrations

- Google Jobs: already supported primarily through `JobPosting` schema on the live job pages
- ATS/feed-based boards: use the XML or JSON feed during setup
- Manual boards: post the job using the matching careers page URL and apply URL

## Notes

- If jobs change, rebuild and redeploy the site so the feeds refresh.
- If you want board-specific export formats later, add dedicated generators for each platform once account requirements are confirmed.
