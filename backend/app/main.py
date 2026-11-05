import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import ALLOWED_ORIGINS, LOG_LEVEL
from app.routes import health, predict
from app.services.emotion_model import EmotionModel
from app.services.face_detector import FaceDetector

logging.basicConfig(
    level=getattr(logging, LOG_LEVEL, logging.INFO),
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("emotion_lens")


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Loading face detector and emotion model")
    app.state.detector = FaceDetector()
    app.state.model = EmotionModel()
    logger.info("Detector and model ready")
    yield
    app.state.detector = None
    app.state.model = None


app = FastAPI(
    title="Emotion Lens API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(predict.router)

