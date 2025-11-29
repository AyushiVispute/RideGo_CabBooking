from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from app import schemas, models
from app.database import get_db

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    # bcrypt only supports up to 72 bytes – so we truncate to be safe
    return pwd_context.hash(password[:72])


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


# ---------- REGISTER ----------
@router.post("/register", response_model=schemas.AuthResponse)
def register_user(data: schemas.RegisterRequest, db: Session = Depends(get_db)):

    # Debug: see what password arrives
    print("REGISTER password received:", repr(data.password))

    existing = db.query(models.User).filter(models.User.email == data.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    user = models.User(
        name=data.name,
        email=data.email,
        phone=data.phone,
        password_hash=hash_password(data.password),
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "success": True,
        "message": "Account created successfully",
        "token": None,
    }


# ---------- LOGIN ----------
@router.post("/login", response_model=schemas.AuthResponse)
def login_user(data: schemas.LoginRequest, db: Session = Depends(get_db)):

    user = db.query(models.User).filter(models.User.email == data.email).first()

    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    # dummy token for now – your frontend just needs *some* token string
    return {
        "success": True,
        "message": "Login successful",
        "token": "dummy-token",
    }
