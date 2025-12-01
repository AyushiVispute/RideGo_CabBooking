from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routes import auth, rides, payments

# --- Create database tables ---
Base.metadata.create_all(bind=engine)

# --- FastAPI app ---
app = FastAPI()

# --- CORS MUST COME BEFORE ROUTERS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],     # allow frontend on localhost:3000
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Backend running"}


# --- Routers ---
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(rides.router, prefix="/rides", tags=["Rides"])
app.include_router(payments.router, prefix="/payments", tags=["Payments"])
