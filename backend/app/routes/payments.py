from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app import models, schemas

router = APIRouter()


@router.post("/create", response_model=schemas.PaymentResponse)
def create_payment(data: schemas.PaymentCreate, db: Session = Depends(get_db)):

    payment = models.Payment(
        ride_id=data.ride_id,
        amount=data.amount,
        status="paid",
    )

    db.add(payment)
    db.commit()

    return schemas.PaymentResponse(success=True, status="paid")
