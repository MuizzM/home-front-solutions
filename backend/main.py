"""
Home Front Solutions — Rep Portal API
=====================================

FastAPI backend that powers the HFS Coach rep portal.

Endpoints:
  POST /auth/login   — sign a rep in with email + password (issues a JWT cookie)
  POST /auth/logout  — clear the auth cookie
  GET  /auth/me      — return the current rep's profile (requires auth)
  GET  /health       — liveness check

Run locally:
  cd backend
  python -m venv .venv && source .venv/bin/activate
  pip install -r requirements.txt
  cp .env.example .env          # fill in JWT_SECRET, ALLOWED_ORIGINS
  uvicorn main:app --reload --port 8000

Deploy:
  Any container host (Fly.io, Render, Railway, ECS). The included
  Dockerfile runs uvicorn on $PORT.

Frontend:
  The /rep-login form on the marketing site POSTs to
  `${VITE_API_URL}/auth/login` with { email, password, remember }
  and credentials: "include" so the HttpOnly cookie sticks.
"""

from __future__ import annotations

import os
from datetime import datetime, timedelta, timezone
from typing import Annotated, Optional

from fastapi import Cookie, Depends, FastAPI, HTTPException, Request, Response, status
from fastapi.middleware.cors import CORSMiddleware
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
    version="0.1.0",
    description="Authentication + rep profile endpoints for the HFS Coach portal.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


# ──────────────────────────────────────────────────────────────────
# In-memory "database" — replace with Postgres + SQLAlchemy in prod
# ──────────────────────────────────────────────────────────────────
# Seed a demo rep so /rep-login has something to authenticate against.
# Remove/replace before real use.
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
    user: RepProfile
    redirect: str = "/portal"


class SimpleOk(BaseModel):
    ok: bool = True


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
        ) from exc


def get_current_rep(
    hfs_auth: Annotated[Optional[str], Cookie(alias=COOKIE_NAME)] = None,
) -> dict:
    if not hfs_auth:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not signed in.",
        )
    claims = _decode_token(hfs_auth)
    email = claims.get("email")
    rep = REPS.get(email) if email else None
    if not rep or not rep.get("active"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Account no longer active. Contact your team lead.",
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
# Routes
# ──────────────────────────────────────────────────────────────────
@app.get("/health")
def health() -> dict:
    return {"ok": True, "service": "hfs-rep-portal-api", "version": app.version}


# ──────────────────────────────────────────────────────────────────
# Tiny in-memory rate limiter for /auth/login
# 10 attempts per (IP, email) per 15 min window. Replace with Redis +
# fastapi-limiter (or an edge WAF rule) before real traffic.
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


@app.post("/auth/login", response_model=LoginResponse)
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
    response.set_cookie(
        key=COOKIE_NAME,
        value=token,
        max_age=max_age,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite=COOKIE_SAMESITE,
        path="/",
    )
    return LoginResponse(user=_rep_to_profile(rep), redirect="/portal")


@app.post("/auth/logout", response_model=SimpleOk)
def logout(response: Response) -> SimpleOk:
    response.delete_cookie(key=COOKIE_NAME, path="/")
    return SimpleOk()


@app.get("/auth/me", response_model=RepProfile)
def me(rep: Annotated[dict, Depends(get_current_rep)]) -> RepProfile:
    return _rep_to_profile(rep)


# ──────────────────────────────────────────────────────────────────
# Root
# ──────────────────────────────────────────────────────────────────
@app.get("/")
def root() -> dict:
    return {
        "service": "HFS Rep Portal API",
        "docs": "/docs",
        "health": "/health",
    }
