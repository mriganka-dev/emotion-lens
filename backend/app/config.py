import os
from pathlib import Path
import cv2
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables from .env in backend directory if present
load_dotenv(BASE_DIR / ".env")

# Model settings
_model_path_env = os.getenv("MODEL_PATH", "assets/resnet152_224_32_10_50.keras")
MODEL_PATH = Path(_model_path_env)
if not MODEL_PATH.is_absolute():
    MODEL_PATH = BASE_DIR / MODEL_PATH

MODEL_URL = os.getenv("MODEL_URL", "").strip()

# Server and network settings
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))

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

INPUT_SIZE = int(os.getenv("INPUT_SIZE", "224"))
LOW_CONFIDENCE = 0.5

# Image upload limits and supported formats
ALLOWED_IMAGE_FORMATS = ("JPEG", "PNG", "WEBP")
MAX_IMAGE_SIDE = 1600

# Face detection settings
YUNET_MODEL_PATH = BASE_DIR / "assets" / "face_detection_yunet_2023mar.onnx"
FACE_CONFIDENCE_THRESHOLD = float(os.getenv("FACE_CONFIDENCE_THRESHOLD", "0.75"))
FACE_MIN_RELATIVE_AREA = float(os.getenv("FACE_MIN_RELATIVE_AREA", "0.25"))
HAAR_CASCADE_PATH = Path(cv2.data.haarcascades) / "haarcascade_frontalface_alt2.xml"
PROFILE_CASCADE_PATH = Path(cv2.data.haarcascades) / "haarcascade_profileface.xml"
FACE_SCALE_FACTOR = 1.05
FACE_MIN_NEIGHBORS = 4
FACE_MIN_SIZE_PIXELS = 30
FACE_MIN_SIZE_RATIO = 0.025
FACE_MAX_COUNT = 50
FACE_CROP_MARGIN = 0.10
FACE_NMS_THRESHOLD = 0.3

# Fallback to whole image if no face is detected
FALLBACK_ENABLED = False
FALLBACK_MAX_SIDE = 400
FALLBACK_MIN_ASPECT_RATIO = 0.75
FALLBACK_MAX_ASPECT_RATIO = 1.33

