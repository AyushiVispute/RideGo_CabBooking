from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import models, schemas

router = APIRouter()


# 1) Dummy estimate – no external API, always works
@router.get("/estimate", response_model=schemas.EstimateResponse)
def estimate_route(pickup: str, drop: str):
    # simple fake formula, you can improve later
    distance_km = 5.0
    duration_min = 15.0
    base_fare = 40.0
    per_km = 12.0
    fare = base_fare + per_km * distance_km

    return schemas.EstimateResponse(
        distance_km=distance_km,
        duration_min=duration_min,
        fare=round(fare, 2),
    )


# 2) Create ride
@router.post("/request", response_model=schemas.RideResponse)
def create_ride(data: schemas.RideRequest, db: Session = Depends(get_db)):
    # if fare not provided from frontend, recompute same dummy one
    fare = data.fare if data.fare is not None else 100.0

    ride = models.Ride(
        pickup=data.pickup,
        drop=data.drop,
        fare=fare,
        status="requested",
        rider_id=None,  # for now, no auth
    )

    db.add(ride)
    db.commit()
    db.refresh(ride)
    return ride


# 3) Get ride by ID
@router.get("/{ride_id}", response_model=schemas.RideResponse)
def get_ride(ride_id: int, db: Session = Depends(get_db)):
    ride = db.query(models.Ride).filter(models.Ride.id == ride_id).first()
    if not ride:
        raise HTTPException(status_code=404, detail="Ride not found")
    return ride


# 4) User ride history – returns all rides for now
@router.get("/user/history")
def ride_history(db: Session = Depends(get_db)):
    rides = db.query(models.Ride).all()
    return rides
