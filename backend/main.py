"""
Home Front Solutions — Rep Portal API
=====================================

FastAPI backend that powers the HFS Coach rep portal.

Authentication
--------------
Every protected route requires a valid JWT. Two accepted transports:

  1. Authorization: Bearer <token>        ← preferred for API / mobile / server-to-server
  2. HttpOnly cookie "hfs_auth"           ← used by the browser rep portal

Both transports map to the SAME dependency (`require_rep`), so any new
protected route just adds `rep: Annotated[dict, Depends(require_rep)]`
and gets both flows for free — no route-by-route bookkeeping.

Endpoints
---------
Public:
  GET  /health         — liveness check
  POST /auth/login     — email + password → returns { access_token, token_type, expires_in, user }
                         and also sets an HttpOnly cookie for browser clients
  POST /auth/logout    — clear the cookie

Protected (Bearer token OR cookie required):
  GET  /auth/me        — current rep's profile
  POST /auth/refresh   — issue a new token with a fresh expiry
  GET  /me/stats       — example protected data (daily call stats)

Local run
---------
  cd backend
  python -m venv .venv && source .venv/bin/activate
  pip install -r requirements.txt
  cp .env.example .env          # set JWT_SECRET, ALLOWED_ORIGINS
  uvicorn main:app --reload --port 8000
  # → http://localhost:8000/docs  (click "Authorize" to paste a bearer token)
"""

from __future__ import annotations

import os
from datetime import datetime, timedelta, timezone
from typing import Annotated, Optional

from fastapi import (
    Cookie,
    Depends,
    FastAPI,
    HTTPException,
    Request,
    Response,
    status,
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr, Field

# ──────────────────────────────────────────────────────────────────
# Configuration (env-driven)
# ──────────────────────────────────────────────────────────────────
JWT_SECRET = os.getenv("JWT_SECRET", "CHANGE-ME-IN-PROD")
JWT_ALGORITHM = "HS256"

# Refuse to boot in production with the placeholder secret.
if os.getenv("ENV", "dev").lower() in {"prod", "production"} and (
    JWT_SECRET == "CHANGE-ME-IN-PROD" or len(JWT_SECRET) < 32
):
    raise RuntimeError(
        "Refusing to start: JWT_SECRET must be set to a strong random value in production "
        "(>= 32 chars). Generate one with: python -c \"import secrets; print(secrets.token_urlsafe(48))\""
    )

JWT_DEFAULT_MINUTES = int(os.getenv("JWT_DEFAULT_MINUTES", "240"))        # 4 hours
JWT_REMEMBER_DAYS = int(os.getenv("JWT_REMEMBER_DAYS", "30"))              # "Remember me"

COOKIE_NAME = "hfs_auth"
COOKIE_SECURE = os.getenv("COOKIE_SECURE", "false").lower() == "true"      # false for localhost
COOKIE_SAMESITE = os.getenv("COOKIE_SAMESITE", "lax")                      # "lax" dev · "none" cross-site prod

ALLOWED_ORIGINS = [
    o.strip()
    for o in os.getenv(
        "ALLOWED_ORIGINS",
        "http://localhost:5173,https://www.homefrontsolutionsllc.com,https://homefrontsolutionsllc.com",
    ).split(",")
    if o.strip()
]

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

app = FastAPI(
    title="Home Front Solutions — Rep Portal API",
    version="0.2.0",
    description=(
        "Authentication + rep profile endpoints for the HFS Coach portal. "
        "Every protected route requires a Bearer token (or the equivalent HttpOnly cookie "
        "set by /auth/login for browser clients)."
    ),
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# ──────────────────────────────────────────────────────────────────
# Security scheme — shows the "Authorize" button in Swagger UI and
# extracts the Bearer token automatically. auto_error=False so the
# combined dependency below can fall back to the cookie cleanly.
# ──────────────────────────────────────────────────────────────────
bearer_scheme = HTTPBearer(
    scheme_name="RepBearer",
    description="Paste the `access_token` returned by `POST /auth/login`.",
    auto_error=False,
)


# ──────────────────────────────────────────────────────────────────
# In-memory "database" — replace with Postgres + SQLAlchemy in prod
# ──────────────────────────────────────────────────────────────────
# Seed a demo rep so the marketing site's /rep-login page has
# something to authenticate against during development.
_demo_password_hash = pwd_context.hash("hfs-demo-2026")

REPS: dict[str, dict] = {
    "demo@homefrontsolutionsllc.com": {
        "id": "rep_000001",
        "email": "demo@homefrontsolutionsllc.com",
        "password_hash": _demo_password_hash,
        "full_name": "Demo Rep",
        "role": "field_rep",
        "market": "Greensboro, NC",
        "active": True,
        "created_at": datetime.now(timezone.utc).isoformat(),
    },
}


# ──────────────────────────────────────────────────────────────────
# Schemas
# ──────────────────────────────────────────────────────────────────
class LoginRequest(BaseModel):
    email: EmailStr = Field(max_length=254)          # RFC 5321 upper bound
    password: str = Field(min_length=6, max_length=256)
    remember: bool = False


class RepProfile(BaseModel):
    id: str
    email: EmailStr
    full_name: str
    role: str
    market: str


class LoginResponse(BaseModel):
    ok: bool = True
    access_token: str                    # the Bearer token (also set in HttpOnly cookie)
    token_type: str = "bearer"
    expires_in: int                      # seconds until the token expires
    user: RepProfile
    redirect: str = "/portal"


class SimpleOk(BaseModel):
    ok: bool = True


class DailyStats(BaseModel):
    doors_knocked: int
    conversations: int
    appointments: int
    close_rate: float


# ──────────────────────────────────────────────────────────────────
# Helpers
# ──────────────────────────────────────────────────────────────────
def _issue_token(user_id: str, email: str, remember: bool) -> tuple[str, int]:
    """Return (jwt, max_age_seconds)."""
    ttl = (
        timedelta(days=JWT_REMEMBER_DAYS)
        if remember
        else timedelta(minutes=JWT_DEFAULT_MINUTES)
    )
    exp = datetime.now(timezone.utc) + ttl
    payload = {
        "sub": user_id,
        "email": email,
        "exp": int(exp.timestamp()),
        "iat": int(datetime.now(timezone.utc).timestamp()),
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token, int(ttl.total_seconds())


def _decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except JWTError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired session. Please sign in again.",
            headers={"WWW-Authenticate": 'Bearer realm="hfs-rep-portal"'},
        ) from exc


# ──────────────────────────────────────────────────────────────────
# Auth dependency — applied to EVERY protected route
#
# Accepts either:
#   Authorization: Bearer <jwt>               (API / mobile / server-to-server)
#   Cookie: hfs_auth=<jwt>                    (browser rep portal)
#
# If neither is present → 401 with WWW-Authenticate so clients can
# respond correctly. No protected route talks to the database before
# this dependency has returned a valid, active rep.
# ──────────────────────────────────────────────────────────────────
def require_rep(
    creds: Annotated[Optional[HTTPAuthorizationCredentials], Depends(bearer_scheme)] = None,
    hfs_auth: Annotated[Optional[str], Cookie(alias=COOKIE_NAME)] = None,
) -> dict:
    token: Optional[str] = None
    if creds and creds.scheme and creds.scheme.lower() == "bearer" and creds.credentials:
        token = creds.credentials
    elif hfs_auth:
        token = hfs_auth

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required. Provide a Bearer token or sign in.",
            headers={"WWW-Authenticate": 'Bearer realm="hfs-rep-portal"'},
        )

    claims = _decode_token(token)
    email = claims.get("email")
    rep = REPS.get(email) if email else None
    if not rep or not rep.get("active"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Account no longer active. Contact your team lead.",
            headers={"WWW-Authenticate": 'Bearer realm="hfs-rep-portal"'},
        )
    return rep


def _rep_to_profile(rep: dict) -> RepProfile:
    return RepProfile(
        id=rep["id"],
        email=rep["email"],
        full_name=rep["full_name"],
        role=rep["role"],
        market=rep["market"],
    )


# ──────────────────────────────────────────────────────────────────
# Rate limiter — in-memory, keyed on (client IP, email). Swap for
# Redis + fastapi-limiter (or an edge WAF rule) before real traffic.
# ──────────────────────────────────────────────────────────────────
LOGIN_MAX_ATTEMPTS = int(os.getenv("LOGIN_MAX_ATTEMPTS", "10"))
LOGIN_WINDOW_SECONDS = int(os.getenv("LOGIN_WINDOW_SECONDS", "900"))  # 15 min
_login_hits: dict[str, list[float]] = {}


def _check_login_rate(key: str) -> None:
    from time import time as _now
    now = _now()
    hits = [t for t in _login_hits.get(key, []) if now - t < LOGIN_WINDOW_SECONDS]
    if len(hits) >= LOGIN_MAX_ATTEMPTS:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many sign-in attempts. Please try again in a few minutes.",
        )
    hits.append(now)
    _login_hits[key] = hits


# ──────────────────────────────────────────────────────────────────
# Public routes
# ──────────────────────────────────────────────────────────────────
@app.get("/health", tags=["public"])
def health() -> dict:
    return {"ok": True, "service": "hfs-rep-portal-api", "version": app.version}


@app.get("/", tags=["public"])
def root() -> dict:
    return {
        "service": "HFS Rep Portal API",
        "docs": "/docs",
        "health": "/health",
    }


@app.post("/auth/login", response_model=LoginResponse, tags=["auth"])
def login(body: LoginRequest, request: Request, response: Response) -> LoginResponse:
    # Rate-limit on (client IP, email) to slow credential-stuffing
    client_ip = request.client.host if request.client else "unknown"
    _check_login_rate(f"{client_ip}:{body.email.lower()}")

    rep = REPS.get(body.email.lower())
    # Constant-time response so invalid-email and invalid-password look the same to timing attacks
    dummy_hash = "$2b$12$0000000000000000000000000000000000000000000000000000"
    if not rep or not rep.get("active"):
        pwd_context.verify(body.password, dummy_hash)  # spend the cycles anyway
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )
    if not pwd_context.verify(body.password, rep["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    token, max_age = _issue_token(rep["id"], rep["email"], body.remember)

    # Browser clients: set HttpOnly cookie so JS can't read the token.
    response.set_cookie(
        key=COOKIE_NAME,
        value=token,
        max_age=max_age,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite=COOKIE_SAMESITE,
        path="/",
    )
    # API / mobile clients: return the token in the body so they can
    # use it as a Bearer on subsequent calls.
    return LoginResponse(
        access_token=token,
        expires_in=max_age,
        user=_rep_to_profile(rep),
        redirect="/portal",
    )


@app.post("/auth/logout", response_model=SimpleOk, tags=["auth"])
def logout(response: Response) -> SimpleOk:
    response.delete_cookie(key=COOKIE_NAME, path="/")
    return SimpleOk()


# ──────────────────────────────────────────────────────────────────
# Protected routes — each one depends on require_rep, so a valid
# Bearer token (or cookie) is enforced before the handler runs.
# ──────────────────────────────────────────────────────────────────
@app.get(
    "/auth/me",
    response_model=RepProfile,
    tags=["protected"],
    dependencies=[Depends(bearer_scheme)],  # surface the lock icon in Swagger
)
def me(rep: Annotated[dict, Depends(require_rep)]) -> RepProfile:
    return _rep_to_profile(rep)


@app.post(
    "/auth/refresh",
    response_model=LoginResponse,
    tags=["protected"],
    dependencies=[Depends(bearer_scheme)],
)
def refresh(
    rep: Annotated[dict, Depends(require_rep)],
    response: Response,
) -> LoginResponse:
    """Issue a new token (non-remember lifetime) for the current rep."""
    token, max_age = _issue_token(rep["id"], rep["email"], remember=False)
    response.set_cookie(
        key=COOKIE_NAME,
        value=token,
        max_age=max_age,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite=COOKIE_SAMESITE,
        path="/",
    )
    return LoginResponse(
        access_token=token,
        expires_in=max_age,
        user=_rep_to_profile(rep),
        redirect="/portal",
    )


@app.get(
    "/me/stats",
    response_model=DailyStats,
    tags=["protected"],
    dependencies=[Depends(bearer_scheme)],
)
def my_stats(rep: Annotated[dict, Depends(require_rep)]) -> DailyStats:
    """
    Example protected endpoint — the CoachMockV2 on the marketing site
    demonstrates this shape. Real data will come from the rep's CRM
    rollup once the dashboard pipeline is wired.
    """
    # TODO: replace with real aggregation query, scoped to rep["id"].
    _ = rep  # placeholder until the real source lands
    return DailyStats(
        doors_knocked=152,
        conversations=98,
        appointments=36,
        close_rate=36.7,
    )
