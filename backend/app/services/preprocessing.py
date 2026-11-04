import cv2
import numpy as np

from app.config import FACE_CROP_MARGIN, INPUT_SIZE


def crop_face(rgb: np.ndarray, box: tuple[int, int, int, int]) -> np.ndarray:
    x, y, w, h = box
    img_h, img_w = rgb.shape[:2]

    pad_w = int(round(w * FACE_CROP_MARGIN))
    pad_h = int(round(h * FACE_CROP_MARGIN))

    x1 = max(0, x - pad_w)
    y1 = max(0, y - pad_h)
    x2 = min(img_w, x + w + pad_w)
    y2 = min(img_h, y + h + pad_h)

    crop = rgb[y1:y2, x1:x2]

    crop_h, crop_w = crop.shape[:2]
    if crop_w > INPUT_SIZE or crop_h > INPUT_SIZE:
        interpolation = cv2.INTER_AREA
    else:
        interpolation = cv2.INTER_LINEAR

    return cv2.resize(crop, (INPUT_SIZE, INPUT_SIZE), interpolation=interpolation)


def make_batch(rgb: np.ndarray, boxes: list[tuple[int, int, int, int]]) -> np.ndarray:
    if not boxes:
        return np.empty((0, INPUT_SIZE, INPUT_SIZE, 3), dtype=np.float32)

    crops = [crop_face(rgb, box) for box in boxes]
    # Values remain in the 0 to 255 range because the model rescales internally
    return np.stack(crops).astype(np.float32)

