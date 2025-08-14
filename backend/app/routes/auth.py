# app/routes/auth.py
from fastapi import APIRouter, HTTPException, BackgroundTasks
from app.schemas import RegisterSchema, VerifySchema, LoginSchema, ForgotSchema, ResetSchema, TokenResponse
from app.db import users_coll
from app.security import hash_password, verify_password, create_access_token
from app.email_utils import send_email_background
from datetime import datetime, timedelta
import secrets
import os

router = APIRouter(prefix="/auth", tags=["auth"])

OTP_TTL_MIN = 15
RESET_TOKEN_TTL_MIN = 30
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

@router.post("/register")
async def register(payload: RegisterSchema, background_tasks: BackgroundTasks):
    existing = await users_coll.find_one({"email": payload.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed = hash_password(payload.password)
    otp = f"{secrets.randbelow(10**6):06d}"  # 6-digit OTP
    otp_expires = datetime.utcnow() + timedelta(minutes=OTP_TTL_MIN)
    user_doc = {
        "name": payload.name,
        "email": payload.email,
        "hashed_password": hashed,
        "is_verified": False,
        "otp": otp,
        "otp_expires_at": otp_expires,
        "created_at": datetime.utcnow()
    }
    await users_coll.insert_one(user_doc)
    subject = "Verify your account"
    html = f"<p>Your verification OTP is <strong>{otp}</strong>. It expires in {OTP_TTL_MIN} minutes.</p>"
    send_email_background(background_tasks, subject, payload.email, html)
    return {"msg": "Registered. Check your email for OTP."}

@router.post("/verify")
async def verify(payload: VerifySchema):
    user = await users_coll.find_one({"email": payload.email})
    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or OTP")
    if user.get("is_verified"):
        return {"msg": "Already verified"}
    if user.get("otp") != payload.otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")
    if user.get("otp_expires_at") and user["otp_expires_at"] < datetime.utcnow():
        raise HTTPException(status_code=400, detail="OTP expired")
    await users_coll.update_one({"email": payload.email}, {"$set": {"is_verified": True}, "$unset": {"otp": "", "otp_expires_at": ""}})
    return {"msg": "Email verified"}

@router.post("/login", response_model=TokenResponse)
async def login(payload: LoginSchema):
    user = await users_coll.find_one({"email": payload.email})
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    if not user.get("is_verified"):
        raise HTTPException(status_code=403, detail="Email not verified")
    if not verify_password(payload.password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    token = create_access_token({"sub": payload.email})
    return {"access_token": token, "token_type": "bearer"}

@router.post("/forgot-password")
async def forgot_password(payload: ForgotSchema, background_tasks: BackgroundTasks):
    user = await users_coll.find_one({"email": payload.email})
    if not user:
        # don't reveal that the user doesn't exist — return success for privacy
        return {"msg": "If that email exists, a reset link was sent."}
    token = secrets.token_urlsafe(32)
    expires = datetime.utcnow() + timedelta(minutes=RESET_TOKEN_TTL_MIN)
    await users_coll.update_one({"email": payload.email}, {"$set": {"reset_token": token, "reset_token_expires_at": expires}})
    reset_link = f"{FRONTEND_URL}/reset-password?token={token}"
    subject = "Password reset request"
    html = f"<p>Click the link to reset your password (expires in {RESET_TOKEN_TTL_MIN} minutes):</p><p><a href='{reset_link}'>{reset_link}</a></p>"
    send_email_background(background_tasks, subject, payload.email, html)
    return {"msg": "If that email exists, a reset link was sent."}

@router.post("/reset-password")
async def reset_password(payload: ResetSchema):
    user = await users_coll.find_one({"reset_token": payload.token})
    if not user:
        raise HTTPException(status_code=400, detail="Invalid or expired token")
    if user.get("reset_token_expires_at") and user["reset_token_expires_at"] < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Token expired")
    hashed = hash_password(payload.new_password)
    await users_coll.update_one({"email": user["email"]}, {"$set": {"hashed_password": hashed}, "$unset": {"reset_token": "", "reset_token_expires_at": ""}})
    return {"msg": "Password reset successful"}
