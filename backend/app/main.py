from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routes import auth, rides, payments

Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS so frontend can call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],            # ok for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Backend running"}


# Mount routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(rides.router, prefix="/rides", tags=["Rides"])
app.include_router(payments.router, prefix="/payments", tags=["Payments"])
