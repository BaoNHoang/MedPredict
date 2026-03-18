from datetime import datetime, timedelta, timezone, date
from typing import Optional
from fastapi import FastAPI, HTTPException, Response, Depends, Cookie
from jose import jwt, JWTError
from passlib.context import CryptContext
from pydantic import BaseModel
from pydantic_settings import BaseSettings
from sqlalchemy import create_engine, String, Integer, Date, select, UniqueConstraint
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session

class Settings(BaseSettings):
    DATABASE_URL: str
    JWT_SECRET: str 
    JWT_ALG: str 
    ACCESS_TOKEN_MINUTES: int = 15
    PASSWORD_PEPPER: str 
    class Config:
        env_file = ".env"

settings = Settings()
engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"
    __table_args__ = (UniqueConstraint("username", name="uq_users_username"),)
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(50), nullable=False)
    hashedPassword: Mapped[str] = mapped_column(String(255), nullable=False)
    firstName: Mapped[str] = mapped_column(String(50), nullable=False)
    lastName: Mapped[str] = mapped_column(String(50), nullable=False)
    dateOfBirth: Mapped[date] = mapped_column(Date, nullable=False)

def get_db():
    with Session(engine) as db:
        yield db

pwd_ctx = CryptContext(schemes=["pbkdf2_sha256"])

def hash_password(pw: str) -> str:
    return pwd_ctx.hash(pw + settings.PASSWORD_PEPPER)

def verify_password(pw: str, hashed: str) -> bool:
    return pwd_ctx.verify(pw + settings.PASSWORD_PEPPER, hashed)

def create_access_token(user_id: int):
    now = datetime.now(timezone.utc)
    exp = now + timedelta(minutes=settings.ACCESS_TOKEN_MINUTES)
    payload = {"sub": str(user_id), "iat": int(now.timestamp()), "exp": exp}
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALG)

def read_access_token(token: str):
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALG])
        sub = payload.get("sub")
        return int(sub) if sub is not None else None
    except (JWTError, ValueError):
        return None

def set_auth_cookie(response: Response, token: str):
    response.set_cookie(
        key=COOKIE_NAME,
        value=token,
        httponly=True,
        samesite="lax",
        secure=False,
        path="/",
        max_age=60 * 60 * 24,
    )

class LoginBody(BaseModel):
    username: str
    password: str

class SignupBody(BaseModel):
    username: str
    password: str
    firstName: str
    lastName: str
    dateOfBirth: date

app = FastAPI()

<<<<<<< HEAD
COOKIE_NAME = "access_token"
=======
BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "saved_models"

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(engine)

    app.state.health_model = joblib.load(MODEL_DIR / "health_model.joblib")
    app.state.health_encoder = joblib.load(MODEL_DIR / "health_encoder.joblib")
    app.state.plaque_model = joblib.load(MODEL_DIR / "plaque_model.joblib")
    app.state.risk_model = joblib.load(MODEL_DIR / "risk_model.joblib")
    app.state.feature_columns = joblib.load(MODEL_DIR / "feature_columns.joblib")

    yield

app = FastAPI(lifespan=lifespan)

BOOL_FIELDS = [
    "family_history_heart_disease",
    "hypertension",
    "diabetes",
    "on_statin",
    "on_bp_meds",
    "clinical_ascvd_history",
    "heart_attack_history",
    "stroke_tia_history",
    "peripheral_artery_disease_history",
    "recent_cardio_event_12mo",
    "multi_plaque_dev",
]

def build_model_input(body: PredictBody, feature_columns: list[str]) -> pd.DataFrame:
    row = body.model_dump()

    for field in BOOL_FIELDS:
        row[field] = int(row[field])

    row["sex"] = row["sex"].strip()
    row["smoking_status"] = row["smoking_status"].strip().lower()
    row["activity_level"] = row["activity_level"].strip().lower()

    df = pd.DataFrame([row])
    df = pd.get_dummies(df)
    df = df.reindex(columns=feature_columns, fill_value=0)
    return df

def plaque_stage_name(stage: int) -> str:
    names = {
        0: "No Plaque",
        1: "Early Plaque",
        2: "Mild Plaque",
        3: "Moderate Plaque",
        4: "Severe Plaque",
    }
    return names.get(stage, f"Stage {stage}")

def plaque_severity(stage: int) -> str:
    if stage <= 0:
        return "Healthy"
    if stage == 1:
        return "Low"
    if stage == 2:
        return "Moderate"
    if stage == 3:
        return "High"
    return "Severe"

def result_recommendations(body: PredictBody, plaque_stage: int, risk_score: float) -> list[str]:
    recs: list[str] = []
    if body.smoking_status.lower() == "current":
        recs.append("Smoking cessation should be a priority.")
    if body.blood_pressure_mmHg >= 130 or body.hypertension:
        recs.append("Review blood pressure management and monitoring.")
    if body.ldl_mg_dL >= 100:
        recs.append("Discuss LDL reduction strategies and diet changes.")
    if body.activity_level.lower() in {"low", "sedentary", "none"}:
        recs.append("Increase routine physical activity if medically appropriate.")
    if plaque_stage >= 3 or risk_score >= 70:
        recs.append("Consider prompt follow-up with a healthcare professional.")
    if not recs:
        recs.append("Maintain healthy habits and continue routine follow-up.")
    return recs[:5]
>>>>>>> 8f5ff3bd37380732e77706bbec9ad8eb7f33f29e

@app.post("/auth/signup")
def signup(body: SignupBody, response: Response, db: Session = Depends(get_db)):
    if len(body.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")
    existing = db.scalar(select(User).where(User.username == body.username))
    if existing:
        raise HTTPException(status_code=409, detail="Username already exists")
    user = User(
        username=body.username.strip(),
        hashedPassword=hash_password(body.password),
        firstName=body.firstName.strip(),
        lastName=body.lastName.strip(),
        dateOfBirth=body.dateOfBirth,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(user.id)
    set_auth_cookie(response, token)

    return {
        "ok": True,
        "user_id": user.id,
        "username": user.username,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "dateOfBirth": str(user.dateOfBirth),
    }

@app.post("/auth/login")
def login(body: LoginBody, response: Response, db: Session = Depends(get_db)):
    user = db.scalar(select(User).where(User.username == body.username))
    if not user or not verify_password(body.password, user.hashedPassword):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    token = create_access_token(user.id)
    set_auth_cookie(response, token)
    return {
        "id": user.id,
        "username": user.username,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "dateOfBirth": str(user.dateOfBirth),
    }

@app.post("/auth/logout")
def logout(response: Response):
    response.delete_cookie(key=COOKIE_NAME, path="/")
    return {"ok": True}

@app.get("/auth/cookie")
def cookie(
    token: Optional[str] = Cookie(default=None, alias=COOKIE_NAME),
    db: Session = Depends(get_db),
):
    if not token:
        raise HTTPException(status_code=401, detail="Not logged in")
    user_id = read_access_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid session")
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return {
        "id": user.id,
        "username": user.username,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "dateOfBirth": str(user.dateOfBirth),
    }