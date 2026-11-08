import io
import threading
import urllib.request
import zipfile
from pathlib import Path
import h5py
import numpy as np

from app.config import INPUT_SIZE, LABELS, MODEL_PATH, MODEL_URL


class EmotionModel:
    def __init__(self, model_path: Path = MODEL_PATH, model_url: str = MODEL_URL):
        self.lock = threading.RLock()
        self.model_path = model_path
        self.is_resnext = False

        if not self.model_path.exists():
            if model_url:
                self.model_path.parent.mkdir(parents=True, exist_ok=True)
                urllib.request.urlretrieve(model_url, str(self.model_path))
            else:
                raise FileNotFoundError(
                    f"Model file not found at {self.model_path}. "
                    "Please place the model in backend/assets/ or set MODEL_URL."
                )

        try:
            import tensorflow as tf
            self.model = tf.keras.models.load_model(str(self.model_path), compile=False)
        except Exception:
            # Fall back to native ResNeXt architecture reconstruction
            self._init_resnext(self.model_path)
            self.is_resnext = True

        # Warm-up call to avoid delay on the first user request
        blank = np.zeros((1, INPUT_SIZE, INPUT_SIZE, 3), dtype=np.float32)
        _ = self.predict(blank)

    def _init_resnext(self, keras_path: Path):
        import torch
        import torch.nn as nn
        import torchvision.models as models

        self.torch = torch
        resnext = models.resnext50_32x4d(weights=None)
        # Drop classification head (avgpool and fc) to retain the convolutional backbone
        self.backbone = nn.Sequential(*list(resnext.children())[:-2])
        self.backbone.eval()

        self.mean = np.array([0.485, 0.456, 0.406], dtype=np.float32)
        self.std = np.array([0.229, 0.224, 0.225], dtype=np.float32)

        with zipfile.ZipFile(str(keras_path), "r") as z:
            weights_data = z.read("model.weights.h5")
            with h5py.File(io.BytesIO(weights_data), "r") as h:
                # Load backbone state dict
                wrapper_vars = h["layers/res_ne_xt_wrapper/vars"]
                state_dict = {}
                for k in wrapper_vars.keys():
                    state_dict[k] = torch.from_numpy(np.array(wrapper_vars[k]))
                self.backbone.load_state_dict(state_dict)

                # Load classification head parameters
                bn_vars = h["layers/batch_normalization/vars"]
                self.bn_gamma = torch.from_numpy(np.array(bn_vars["0"]))
                self.bn_beta = torch.from_numpy(np.array(bn_vars["1"]))
                self.bn_mean = torch.from_numpy(np.array(bn_vars["2"]))
                self.bn_var = torch.from_numpy(np.array(bn_vars["3"]))

                d_vars = h["layers/dense/vars"]
                self.d_kernel = torch.from_numpy(np.array(d_vars["0"]))
                self.d_bias = torch.from_numpy(np.array(d_vars["1"]))

                d1_vars = h["layers/dense_1/vars"]
                self.d1_kernel = torch.from_numpy(np.array(d1_vars["0"]))
                self.d1_bias = torch.from_numpy(np.array(d1_vars["1"]))

    def predict(self, batch: np.ndarray) -> np.ndarray:
        if batch.shape[0] == 0:
            return np.empty((0, len(LABELS)), dtype=np.float32)

        with self.lock:
            if not self.is_resnext:
                preds = self.model(batch, training=False)
                return preds.numpy()

            x = batch / 255.0
            x = (x - self.mean) / self.std
            # Channels-first permute for PyTorch backbone
            x = np.transpose(x, (0, 3, 1, 2))

            t_in = self.torch.from_numpy(x).float()
            with self.torch.no_grad():
                feat = self.backbone(t_in)
                gap = feat.mean(dim=(2, 3))
                gmp = feat.amax(dim=(2, 3))
                feat_cat = self.torch.cat([gap, gmp], dim=1)

                feat_bn = (feat_cat - self.bn_mean) / self.torch.sqrt(self.bn_var + 1e-3) * self.bn_gamma + self.bn_beta
                dense1 = self.torch.relu(self.torch.matmul(feat_bn, self.d_kernel) + self.d_bias)
                logits = self.torch.matmul(dense1, self.d1_kernel) + self.d1_bias
                probs = self.torch.softmax(logits, dim=1)
                return probs.numpy()
