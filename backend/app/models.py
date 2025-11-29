from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, nullable=True)
    password_hash = Column(String, nullable=False)


class Ride(Base):
    __tablename__ = "rides"

    id = Column(Integer, primary_key=True, index=True)
    rider_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # keep nullable
    pickup = Column(String, nullable=False)
    drop = Column(String, nullable=False)
    distance_km = Column(Float, nullable=True)
    duration_min = Column(Float, nullable=True)
    fare = Column(Float, nullable=True)
    status = Column(String, default="requested")

    rider = relationship("User", backref="rides")


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    ride_id = Column(Integer, ForeignKey("rides.id"))
    amount = Column(Float, nullable=False)
    status = Column(String, default="pending")

    ride = relationship("Ride", backref="payments")
