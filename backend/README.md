# Home Front Solutions — Rep Portal API

FastAPI backend that powers the HFS Coach rep portal.

Lives on the `backend/fastapi` branch so it can evolve independently of the marketing site on `main`.

---

## What's here

| Endpoint | Method | Purpose |
|---|---|---|
| `/health` | GET | Liveness check |
| `/auth/login` | POST | Sign a rep in with email + password, issue an HttpOnly JWT cookie |
| `/auth/logout` | POST | Clear the auth cookie |
| `/auth/me` | GET | Return the current rep's profile (requires auth) |
| `/docs` | GET | Interactive OpenAPI docs (FastAPI-generated) |

---

## Run it locally (in under two minutes)

```bash
# from repo root
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

cp .env.example .env
# edit .env — at minimum replace JWT_SECRET with a fresh random string:
# python -c "import secrets; print(secrets.token_urlsafe(48))"

uvicorn main:app --reload --port 8000
```

- API is now at `http://localhost:8000`
- Interactive docs: `http://localhost:8000/docs`
- Try it: `POST /auth/login` with `{"email": "demo@homefrontsolutionsllc.com", "password": "hfs-demo-2026"}` and the demo rep signs in

---

## Frontend wiring

The marketing site's `/rep-login` page (on the `claude/bold-neumann-f86912` branch, merged to `main`) POSTs to:

```
${VITE_API_URL}/auth/login
```

If `VITE_API_URL` isn't set, it falls back to `/api` (same-origin proxy pattern). For local development:

```bash
# frontend/.env.local
VITE_API_URL=http://localhost:8000
```

The browser stores the auth as an `HttpOnly` cookie named `hfs_auth`, so subsequent calls to `/auth/me` just work from the frontend as long as you pass `credentials: "include"`. The CORS middleware on this server is already configured for that.

---

## Deploy

### Any container host (Fly.io / Render / Railway / ECS)

1. Build with the included Dockerfile.
2. Set these env vars on the host:

   | Var | Value |
   |---|---|
   | `JWT_SECRET` | Strong random string, **secret** |
   | `ALLOWED_ORIGINS` | `https://www.homefrontsolutionsllc.com,https://homefrontsolutionsllc.com` |
   | `COOKIE_SECURE` | `true` |
   | `COOKIE_SAMESITE` | `none` (because API and frontend are on different hostnames) |
   | `JWT_DEFAULT_MINUTES` | `240` |
   | `JWT_REMEMBER_DAYS` | `30` |

3. Point the frontend's `VITE_API_URL` at the deploy URL.

### Fly.io quick-start

```bash
fly launch --dockerfile Dockerfile --region iad --no-deploy
fly secrets set JWT_SECRET=$(python -c "import secrets; print(secrets.token_urlsafe(48))")
fly secrets set ALLOWED_ORIGINS=https://www.homefrontsolutionsllc.com
fly secrets set COOKIE_SECURE=true COOKIE_SAMESITE=none
fly deploy
```

---

## What's still TODO before real use

- [ ] Replace the in-memory `REPS` dict with a real database (Postgres + SQLAlchemy or SQLModel)
- [ ] Add rate-limiting on `/auth/login` (fastapi-limiter or an edge WAF rule)
- [ ] Add password reset flow (`/auth/forgot`, `/auth/reset`) wired to transactional email (Resend, Postmark, SES)
- [ ] Add new-hire invitation flow (admin generates a setup-link token, rep clicks it and sets their password)
- [ ] Add an admin portal layer (manager/area-manager roles) for territory assignment + onboarding
- [ ] Add the actual dashboard endpoints: `/stats/today`, `/stats/week`, `/leaderboard/market/:slug`, `/roleplays/recent`
- [ ] Add structured logging (JSON to stdout, picked up by host)
- [ ] Add integration tests (pytest + httpx)

---

## Branch hygiene

`backend/fastapi` is intentionally **not** merged into `main` — the marketing site needs to stay deployable to Cloudflare Pages without the Python runtime. When the portal is ready to ship, the API deploys to its own host and the frontend just points `VITE_API_URL` at it.

If you need to share root-level files (README, LICENSE, etc.) with the marketing site, do it with explicit cherry-picks, not a merge.
