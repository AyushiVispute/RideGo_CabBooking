from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from app import schemas, models
from app.database import get_db

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ---------------- PASSWORD HELPERS ---------------- #

def hash_password(password: str):
    return pwd_context.hash(password[:72])

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

# ---------------- REGISTER ---------------- #

@router.post("/register", response_model=schemas.AuthResponse)
def register_user(data: schemas.RegisterRequest, db: Session = Depends(get_db)):

    print("DEBUG incoming password:", repr(data.password))

    if db.query(models.User).filter(models.User.email == data.email).first():
        raise HTTPException(
            status_code=400,
            detail="Email already exists",
        )

    user = models.User(
        name=data.name,
        email=data.email,
        phone=data.phone,
        password_hash=hash_password(data.password)
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "success": True,
        "message": "Account created",
        "token": "dummy-token"
    }

# ---------------- LOGIN ---------------- #

@router.post("/login", response_model=schemas.AuthResponse)
def login(data: schemas.LoginRequest, db: Session = Depends(get_db)):

    user = db.query(models.User).filter(models.User.email == data.email).first()

    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return {
        "success": True,
        "message": "Login OK",
        "token": "dummy-token"
    }
