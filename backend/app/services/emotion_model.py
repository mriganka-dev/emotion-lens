import os
# Ensure Keras initializes with PyTorch backend for reliable cross-platform execution
os.environ.setdefault("KERAS_BACKEND", "torch")
os.environ.setdefault("TF_CPP_MIN_LOG_LEVEL", "3")
os.environ.setdefault("TF_ENABLE_ONEDNN_OPTS", "0")

import logging
import threading
import urllib.request
from pathlib import Path
import keras
import numpy as np

from app.config import INPUT_SIZE, LABELS, MODEL_PATH, MODEL_URL

logger = logging.getLogger("emotion_lens")


class EmotionModel:
    def __init__(self, model_path: Path = MODEL_PATH, model_url: str = MODEL_URL):
        self.lock = threading.RLock()
        self.model_path = model_path

        if not self.model_path.exists():
            if model_url:
                self.model_path.parent.mkdir(parents=True, exist_ok=True)
                urllib.request.urlretrieve(model_url, str(self.model_path))
            else:
                raise FileNotFoundError(
                    f"Model file not found at {self.model_path}. "
                    "Please place the model in backend/assets/ or set MODEL_URL."
                )

        logger.info("Loading model weights from %s", self.model_path)
        self.model = keras.models.load_model(str(self.model_path), compile=False)

        expected_input = (None, INPUT_SIZE, INPUT_SIZE, 3)
        expected_output_dim = len(LABELS)

        if tuple(self.model.input_shape) != expected_input:
            raise ValueError(
                f"Unexpected model input shape {self.model.input_shape}, expected {expected_input}"
            )

        if len(self.model.output_shape) != 2 or self.model.output_shape[1] != expected_output_dim:
            raise ValueError(
                f"Unexpected model output shape {self.model.output_shape}, expected (None, {expected_output_dim})"
            )

        # Warm-up call to avoid delay on the first user request
        logger.info("Running model warm-up inference pass")
        blank = np.zeros((1, INPUT_SIZE, INPUT_SIZE, 3), dtype=np.float32)
        _ = self.predict(blank)
        logger.info("Model warm-up pass finished")

    def predict(self, batch: np.ndarray) -> np.ndarray:
        if batch.shape[0] == 0:
            return np.empty((0, len(LABELS)), dtype=np.float32)

        with self.lock:
            preds = self.model(batch, training=False)
            return keras.ops.convert_to_numpy(preds)
