from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from config import settings

engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)

def get_db():
    with Session(engine) as db:
        yield db