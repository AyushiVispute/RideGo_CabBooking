from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import get_db

router = APIRouter()


from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import schemas, models

router = APIRouter()

@router.post("/create", response_model=schemas.PaymentResponse)
def create_payment(data: schemas.PaymentCreate, db: Session = Depends(get_db)):
    
    payment = models.Payment(
        ride_id=data.ride_id,
        amount=data.amount,
        status="paid"
    )
    
    db.add(payment)
    db.commit()

    return {"success": True, "status": "paid"}
