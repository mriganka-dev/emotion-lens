import os
from pathlib import Path
import cv2
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables from .env in backend directory if present
load_dotenv(BASE_DIR / ".env")

# Model settings
_model_path_env = os.getenv("MODEL_PATH", "assets/simple_cnn.keras")
MODEL_PATH = Path(_model_path_env)
if not MODEL_PATH.is_absolute():
    MODEL_PATH = BASE_DIR / MODEL_PATH

MODEL_URL = os.getenv("MODEL_URL", "").strip()

# Server and CORS settings
_raw_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
ALLOWED_ORIGINS = [origin.strip() for origin in _raw_origins.split(",") if origin.strip()]

MAX_UPLOAD_MB = int(os.getenv("MAX_UPLOAD_MB", "8"))
MAX_UPLOAD_BYTES = MAX_UPLOAD_MB * 1024 * 1024

LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO").upper()

# Model input and output constants
LABELS = [
    "Surprise",
    "Fear",
    "Disgust",
    "Happy",
    "Sad",
    "Angry",
    "Neutral",
]

INPUT_SIZE = 112
LOW_CONFIDENCE = 0.5

# Image upload limits and supported formats
ALLOWED_IMAGE_FORMATS = ("JPEG", "PNG", "WEBP")
MAX_IMAGE_SIDE = 1600

# Face detection settings
HAAR_CASCADE_PATH = Path(cv2.data.haarcascades) / "haarcascade_frontalface_default.xml"
FACE_SCALE_FACTOR = 1.1
FACE_MIN_NEIGHBORS = 5
FACE_MIN_SIZE_PIXELS = 30
FACE_MIN_SIZE_RATIO = 0.06
FACE_MAX_COUNT = 10
FACE_CROP_MARGIN = 0.10

# Fallback to whole image if no face is detected
FALLBACK_ENABLED = True
FALLBACK_MAX_SIDE = 400
FALLBACK_MIN_ASPECT_RATIO = 0.75
FALLBACK_MAX_ASPECT_RATIO = 1.33

