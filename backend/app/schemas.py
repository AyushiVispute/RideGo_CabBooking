from pydantic import BaseModel, EmailStr
from typing import Optional

# -------- AUTH ----------
class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class AuthResponse(BaseModel):
    success: bool
    message: str
    token: Optional[str] = None

    class Config:
        from_attributes = True     # Pydantic v2 fix


# -------- RIDES ----------
class RideRequest(BaseModel):
    pickup: str
    drop: str


class RideResponse(BaseModel):
    id: int
    pickup: str
    drop: str
    status: str
    fare: float

    class Config:
        from_attributes = True     # Pydantic v2 fix


class EstimateResponse(BaseModel):
    distance_km: float
    duration_min: float
    fare: float

    class Config:
        from_attributes = True


# -------- PAYMENTS ----------
class PaymentCreate(BaseModel):
    ride_id: int
    amount: float


class PaymentResponse(BaseModel):
    success: bool
    status: str

    class Config:
        from_attributes = True
