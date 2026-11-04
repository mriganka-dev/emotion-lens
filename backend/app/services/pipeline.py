import time
import numpy as np
from PIL import Image

from app.config import (
    FALLBACK_ENABLED,
    FALLBACK_MAX_ASPECT_RATIO,
    FALLBACK_MAX_SIDE,
    FALLBACK_MIN_ASPECT_RATIO,
    LABELS,
    LOW_CONFIDENCE,
)
from app.schemas.prediction import Box, FaceResult, PredictResponse, Score
from app.services.emotion_model import EmotionModel
from app.services.face_detector import FaceDetector
from app.services.preprocessing import make_batch


def analyze(
    image: Image.Image,
    detector: FaceDetector,
    model: EmotionModel,
) -> PredictResponse:
    start_time = time.perf_counter()

    rgb = np.array(image)
    height, width = rgb.shape[:2]

    boxes = detector.detect(rgb)
    used_whole_image = False
    message = None

    if not boxes:
        # Check if the image qualifies for whole-image fallback
        aspect_ratio = width / height if height > 0 else 0
        is_small = max(width, height) <= FALLBACK_MAX_SIDE
        in_aspect = FALLBACK_MIN_ASPECT_RATIO <= aspect_ratio <= FALLBACK_MAX_ASPECT_RATIO

        if FALLBACK_ENABLED and is_small and in_aspect:
            boxes = [(0, 0, width, height)]
            used_whole_image = True
            message = "The whole image was analyzed because no face was detected."
        else:
            elapsed_ms = round((time.perf_counter() - start_time) * 1000, 1)
            return PredictResponse(
                image_width=width,
                image_height=height,
                faces=[],
                used_whole_image=False,
                message="No face found. Try a clear, front-facing photo with good lighting.",
                processing_ms=elapsed_ms,
            )

    batch = make_batch(rgb, boxes)
    predictions = model.predict(batch)

    faces: list[FaceResult] = []
    for i, ((bx, by, bw, bh), probs) in enumerate(zip(boxes, predictions)):
        scores = [
            Score(label=label, score=round(float(prob), 4))
            for label, prob in zip(LABELS, probs)
        ]
        scores.sort(key=lambda s: s.score, reverse=True)

        top = scores[0]
        faces.append(
            FaceResult(
                id=i,
                box=Box(x=bx, y=by, width=bw, height=bh),
                emotion=top.label,
                confidence=top.score,
                low_confidence=top.score < LOW_CONFIDENCE,
                scores=scores,
            )
        )

    elapsed_ms = round((time.perf_counter() - start_time) * 1000, 1)
    return PredictResponse(
        image_width=width,
        image_height=height,
        faces=faces,
        used_whole_image=used_whole_image,
        message=message,
        processing_ms=elapsed_ms,
    )

