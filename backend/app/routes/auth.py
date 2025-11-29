from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from app.database import get_db
from app import models, schemas

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    # ensure trimming to avoid 72-byte bcrypt limit
    return pwd_context.hash(password[:72])


@router.post("/register", response_model=schemas.AuthResponse)
def register(data: schemas.RegisterRequest, db: Session = Depends(get_db)):

    print("PASSWORD RECEIVED:", data.password)  # debug

    # check email duplicate
    existing = db.query(models.User).filter(models.User.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    # create user
    new_user = models.User(
        name=data.name,
        email=data.email,
        phone=data.phone,
        password_hash=hash_password(data.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "success": True,
        "message": "Account created successfully",
        "token": None
    }
