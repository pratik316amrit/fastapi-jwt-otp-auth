# app/schemas.py
from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class RegisterSchema(BaseModel):
    name: str = Field(..., min_length=1)
    email: EmailStr
    password: str = Field(..., min_length=6)

class VerifySchema(BaseModel):
    email: EmailStr
    otp: str

class LoginSchema(BaseModel):
    email: EmailStr
    password: str

class ForgotSchema(BaseModel):
    email: EmailStr

class ResetSchema(BaseModel):
    token: str
    new_password: str = Field(..., min_length=6)

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
