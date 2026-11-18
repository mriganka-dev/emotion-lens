import logging
import threading
from pathlib import Path
import cv2
import numpy as np

from app.config import (
    FACE_CONFIDENCE_THRESHOLD,
    FACE_MAX_COUNT,
    FACE_MIN_NEIGHBORS,
    FACE_MIN_RELATIVE_AREA,
    FACE_MIN_SIZE_PIXELS,
    FACE_NMS_THRESHOLD,
    FACE_SCALE_FACTOR,
    HAAR_CASCADE_PATH,
    YUNET_MODEL_PATH,
)

logger = logging.getLogger("emotion_lens")


class FaceDetector:
    def __init__(
        self,
        yunet_path: Path = YUNET_MODEL_PATH,
        cascade_path: Path = HAAR_CASCADE_PATH,
    ):
        self.lock = threading.Lock()
        self.use_yunet = False
        self.yunet = None
        self.cascade = None

        if yunet_path and Path(yunet_path).exists():
            try:
                self.yunet = cv2.FaceDetectorYN.create(
                    model=str(yunet_path),
                    config="",
                    input_size=(320, 320),
                    score_threshold=FACE_CONFIDENCE_THRESHOLD,
                    nms_threshold=FACE_NMS_THRESHOLD,
                    top_k=5000,
                )
                self.use_yunet = True
                logger.info("Loaded YuNet neural face detector from %s (confidence threshold: %.2f)", yunet_path, FACE_CONFIDENCE_THRESHOLD)
            except Exception as e:
                logger.warning("Failed to initialize YuNet (%s); falling back to Haar cascade", e)

        if not self.use_yunet:
            if not cascade_path.exists():
                raise FileNotFoundError(f"Cascade file not found: {cascade_path}")
            self.cascade = cv2.CascadeClassifier(str(cascade_path))
            if self.cascade.empty():
                raise RuntimeError(f"Failed to load Haar cascade from {cascade_path}")
            logger.info("Loaded Haar cascade detector from %s", cascade_path)

    def detect(self, rgb: np.ndarray) -> list[tuple[int, int, int, int]]:
        height, width = rgb.shape[:2]
        if height == 0 or width == 0:
            return []

        if self.use_yunet and self.yunet is not None:
            return self._detect_yunet(rgb, width, height)
        return self._detect_cascade(rgb, width, height)

    def _detect_yunet(self, rgb: np.ndarray, width: int, height: int) -> list[tuple[int, int, int, int]]:
        # cv2.FaceDetectorYN expects BGR image
        bgr = cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR)

        with self.lock:
            self.yunet.setInputSize((width, height))
            _, faces = self.yunet.detect(bgr)

        if faces is None or len(faces) == 0:
            return []

        boxes: list[tuple[int, int, int, int]] = []
        for face in faces:
            x, y, w, h = face[0:4]
            conf = float(face[14])

            # 1. Strict confidence check
            if conf < FACE_CONFIDENCE_THRESHOLD:
                continue

            bw = int(round(w))
            bh = int(round(h))

            # 2. Minimum dimension check
            if bw < FACE_MIN_SIZE_PIXELS or bh < FACE_MIN_SIZE_PIXELS:
                continue

            # 3. Aspect ratio validation (human faces are roughly vertical/square)
            aspect_ratio = bw / float(bh) if bh > 0 else 0
            if not (0.65 <= aspect_ratio <= 1.30):
                continue

            # 4. Facial landmarks validation (right eye, left eye, nose, right mouth, left mouth)
            x_re, y_re = face[4], face[5]
            x_le, y_le = face[6], face[7]
            x_rm, y_rm = face[10], face[11]
            x_lm, y_lm = face[12], face[13]

            # In a genuine face, eyes must be separated by at least 15% of face width
            eye_dist = np.hypot(x_le - x_re, y_le - y_re)
            if eye_dist < 0.15 * bw:
                continue

            # Eyes must be positioned above the mouth corners
            eye_y_avg = (y_re + y_le) / 2.0
            mouth_y_avg = (y_rm + y_lm) / 2.0
            if eye_y_avg >= mouth_y_avg:
                continue

            # 5. Clamp coordinates to image boundaries
            bx = max(0, min(int(round(x)), width - 1))
            by = max(0, min(int(round(y)), height - 1))
            bw = min(bw, width - bx)
            bh = min(bh, height - by)

            if bw >= FACE_MIN_SIZE_PIXELS and bh >= FACE_MIN_SIZE_PIXELS:
                boxes.append((bx, by, bw, bh))

        # Filter out tiny background bystanders if prominent foreground subjects are present
        if len(boxes) > 1 and FACE_MIN_RELATIVE_AREA > 0:
            max_area = max(bw * bh for _, _, bw, bh in boxes)
            min_allowed_area = max_area * FACE_MIN_RELATIVE_AREA
            boxes = [b for b in boxes if (b[2] * b[3]) >= min_allowed_area]

        if len(boxes) > FACE_MAX_COUNT:
            boxes = sorted(boxes, key=lambda b: b[2] * b[3], reverse=True)[:FACE_MAX_COUNT]

        return sorted(boxes, key=lambda b: b[0])

    def _detect_cascade(self, rgb: np.ndarray, width: int, height: int) -> list[tuple[int, int, int, int]]:
        gray = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY)
        min_size = (FACE_MIN_SIZE_PIXELS, FACE_MIN_SIZE_PIXELS)

        with self.lock:
            detected = self.cascade.detectMultiScale(
                gray,
                scaleFactor=FACE_SCALE_FACTOR,
                minNeighbors=FACE_MIN_NEIGHBORS,
                minSize=min_size,
            )

        if len(detected) == 0:
            return []

        boxes = [(int(x), int(y), int(w), int(h)) for x, y, w, h in detected]

        # Filter out tiny background bystanders if prominent foreground subjects are present
        if len(boxes) > 1 and FACE_MIN_RELATIVE_AREA > 0:
            max_area = max(bw * bh for _, _, bw, bh in boxes)
            min_allowed_area = max_area * FACE_MIN_RELATIVE_AREA
            boxes = [b for b in boxes if (b[2] * b[3]) >= min_allowed_area]
        if len(boxes) > FACE_MAX_COUNT:
            boxes = sorted(boxes, key=lambda b: b[2] * b[3], reverse=True)[:FACE_MAX_COUNT]

        return sorted(boxes, key=lambda b: b[0])
