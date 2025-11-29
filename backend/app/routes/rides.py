from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import schemas, models

router = APIRouter()

@router.post("/estimate", response_model=schemas.EstimateResponse)
def estimate_ride(data: schemas.RideRequest):

    # Dummy distance & fare
    distance = 5.0
    duration = 15.0
    fare = 80.0

    return {
        "distance_km": distance,
        "duration_min": duration,
        "fare": fare
    }

@router.post("/create", response_model=schemas.RideResponse)
def create_ride(
    data: schemas.RideRequest,
    db: Session = Depends(get_db)
):

    ride = models.Ride(
        pickup=data.pickup,
        drop=data.drop,
        fare=100.0,
        status="requested",
        rider_id=1  # Replace after JWT login
    )

    db.add(ride)
    db.commit()
    db.refresh(ride)

    return ride
