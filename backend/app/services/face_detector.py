import threading
from pathlib import Path
import cv2
import numpy as np

from app.config import (
    FACE_MAX_COUNT,
    FACE_MIN_NEIGHBORS,
    FACE_MIN_SIZE_PIXELS,
    FACE_MIN_SIZE_RATIO,
    FACE_SCALE_FACTOR,
    HAAR_CASCADE_PATH,
)


class FaceDetector:
    def __init__(self, cascade_path: Path = HAAR_CASCADE_PATH):
        if not cascade_path.exists():
            raise FileNotFoundError(f"Haar cascade file not found: {cascade_path}")

        self.cascade = cv2.CascadeClassifier(str(cascade_path))
        if self.cascade.empty():
            raise RuntimeError(f"Failed to load Haar cascade from {cascade_path}")

        self.lock = threading.Lock()

    def detect(self, rgb: np.ndarray) -> list[tuple[int, int, int, int]]:
        gray = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY)
        equalized = cv2.equalizeHist(gray)

        height, width = rgb.shape[:2]
        min_side = min(height, width)
        min_px = max(FACE_MIN_SIZE_PIXELS, int(round(min_side * FACE_MIN_SIZE_RATIO)))
        min_size = (min_px, min_px)

        with self.lock:
            detected = self.cascade.detectMultiScale(
                equalized,
                scaleFactor=FACE_SCALE_FACTOR,
                minNeighbors=FACE_MIN_NEIGHBORS,
                minSize=min_size,
            )

        if len(detected) == 0:
            return []

        boxes = [(int(x), int(y), int(w), int(h)) for x, y, w, h in detected]

        # Keep the largest faces if more than the limit was found
        if len(boxes) > FACE_MAX_COUNT:
            boxes = sorted(boxes, key=lambda b: b[2] * b[3], reverse=True)[:FACE_MAX_COUNT]

        # Sort left to right for natural numbering across the image
        return sorted(boxes, key=lambda b: b[0])

