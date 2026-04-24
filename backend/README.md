# Home Front Solutions — Rep Portal API

FastAPI backend that powers the HFS Coach rep portal.

Lives on the `backend/fastapi` branch so it can evolve independently of the marketing site on `main`.

---

## What's here

| Endpoint | Auth | Purpose |
|---|---|---|
| `GET /health` | Public | Liveness check |
| `GET /` | Public | Service info + docs link |
| `POST /auth/login` | Public | Sign a rep in. Returns `access_token` + user profile AND sets an HttpOnly cookie |
| `POST /auth/logout` | Public | Clear the auth cookie |
| `GET /auth/me` | **Bearer** or cookie | Current rep's profile |
| `POST /auth/refresh` | **Bearer** or cookie | Issue a new token with a fresh expiry |
| `GET /me/stats` | **Bearer** or cookie | Example protected endpoint (daily call stats) |
| `GET /docs` | Public | Interactive OpenAPI docs with an **Authorize** button |

## Authentication model

Every protected endpoint accepts either transport — whichever is easier for the client:

1. **`Authorization: Bearer <token>`** header — preferred for API clients, mobile apps, server-to-server, Postman, curl.
2. **HttpOnly cookie `hfs_auth`** — used by the browser rep portal. JavaScript can't read it, which closes off XSS-based token theft.

Both flows map to the same `require_rep` dependency in `main.py`, so any new protected route just adds `Depends(require_rep)` and gets both transports for free.

### Get a token

```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@homefrontsolutionsllc.com","password":"hfs-demo-2026"}'
```

Response:
```json
{
  "ok": true,
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 14400,
  "user": { "id": "rep_000001", "email": "demo@homefrontsolutionsllc.com", "full_name": "Demo Rep", "role": "field_rep", "market": "Greensboro, NC" },
  "redirect": "/portal"
}
```

### Call a protected route

```bash
TOKEN="eyJhbGciOiJIUzI1NiIs..."
curl http://localhost:8000/auth/me -H "Authorization: Bearer $TOKEN"
curl http://localhost:8000/me/stats -H "Authorization: Bearer $TOKEN"
```

Or, inside Swagger UI at `/docs`, click **Authorize** (top-right) and paste the token — every protected endpoint will then include it automatically.

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

## Adding a new protected route

Protect every new route by depending on `require_rep`. You get the active rep's row as a dict, and the request is rejected with **401** before your handler runs if no valid Bearer/cookie is present.

```python
from typing import Annotated
from fastapi import Depends

@app.get("/me/roleplays", tags=["protected"], dependencies=[Depends(bearer_scheme)])
def my_roleplays(rep: Annotated[dict, Depends(require_rep)]):
    return roleplay_service.recent_for(rep["id"])
```

The `dependencies=[Depends(bearer_scheme)]` line is what surfaces the lock icon + `Authorize` button in Swagger — it doesn't affect runtime (auth is still enforced by `require_rep`).

## Security in place

- **Every protected route requires a valid JWT** (Bearer or cookie). No handler runs without `require_rep` succeeding first.
- **Rate limit** on `/auth/login`: 10 attempts per (IP, email) per 15 min. 429 with a generic message.
- **Constant-time auth**: bcrypt verify runs against a dummy hash even when the email doesn't exist, so timing can't enumerate valid accounts.
- **Production boot guard**: the server refuses to start if `ENV=prod` and `JWT_SECRET` is the placeholder or < 32 chars.
- **HttpOnly cookie** for browsers — JS can't read the token → XSS-based token theft is blocked.
- **CORS is allow-listed** to the exact origins in `ALLOWED_ORIGINS`, `allow_credentials=True` only for those origins.
- **WWW-Authenticate: Bearer** header returned on 401 so clients know how to respond.
- **Passwords hashed with bcrypt** via passlib, never stored in plaintext, never logged.

## What's still TODO before real use

- [ ] Replace the in-memory `REPS` dict with Postgres + SQLAlchemy / SQLModel
- [ ] Replace the in-memory rate limiter with Redis + fastapi-limiter (or an edge WAF rule like Cloudflare)
- [ ] Password reset flow (`/auth/forgot`, `/auth/reset`) wired to transactional email (Resend, Postmark, SES)
- [ ] New-hire invitation flow (admin generates a setup-link token, rep clicks it and sets their password)
- [ ] Admin portal layer (manager/area-manager roles) for territory assignment + onboarding
- [ ] Real dashboard endpoints: `/stats/today`, `/stats/week`, `/leaderboard/market/:slug`, `/roleplays/recent` (all should depend on `require_rep`)
- [ ] Structured logging (JSON to stdout, scraped by host)
- [ ] Integration tests (pytest + httpx, including a 401-when-no-token test for every protected route)

---

## Branch hygiene

`backend/fastapi` is intentionally **not** merged into `main` — the marketing site needs to stay deployable to Cloudflare Pages without the Python runtime. When the portal is ready to ship, the API deploys to its own host and the frontend just points `VITE_API_URL` at it.

If you need to share root-level files (README, LICENSE, etc.) with the marketing site, do it with explicit cherry-picks, not a merge.
