import logging
import os
import threading
import urllib.request
from pathlib import Path
import numpy as np
import torch
import torch.nn as nn

from app.config import INPUT_SIZE, LABELS, MODEL_PATH, MODEL_URL

logger = logging.getLogger("emotion_lens")


class KerasBottleneck(nn.Module):
    def __init__(self, in_planes: int, planes: int, stride: int = 1, downsample: nn.Module | None = None):
        super().__init__()
        self.conv1 = nn.Conv2d(in_planes, planes, kernel_size=1, stride=stride, bias=True)
        self.bn1 = nn.BatchNorm2d(planes, eps=1.001e-5)
        self.conv2 = nn.Conv2d(planes, planes, kernel_size=3, stride=1, padding=1, bias=True)
        self.bn2 = nn.BatchNorm2d(planes, eps=1.001e-5)
        self.conv3 = nn.Conv2d(planes, planes * 4, kernel_size=1, stride=1, bias=True)
        self.bn3 = nn.BatchNorm2d(planes * 4, eps=1.001e-5)
        self.relu = nn.ReLU(inplace=True)
        self.downsample = downsample

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        identity = x
        out = self.relu(self.bn1(self.conv1(x)))
        out = self.relu(self.bn2(self.conv2(out)))
        out = self.bn3(self.conv3(out))
        if self.downsample is not None:
            identity = self.downsample(x)
        out += identity
        return self.relu(out)


class NativeResNet152(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(3, 64, kernel_size=7, stride=2, padding=3, bias=True)
        self.bn1 = nn.BatchNorm2d(64, eps=1.001e-5)
        self.relu = nn.ReLU(inplace=True)
        self.maxpool = nn.MaxPool2d(kernel_size=3, stride=2, padding=1)

        self.layer1 = self._make_layer(64, 64, 3, stride=1)
        self.layer2 = self._make_layer(256, 128, 8, stride=2)
        self.layer3 = self._make_layer(512, 256, 36, stride=2)
        self.layer4 = self._make_layer(1024, 512, 3, stride=2)

        self.head_bn = nn.BatchNorm1d(4096, eps=1.001e-5)
        self.fc1 = nn.Linear(4096, 256)
        self.fc2 = nn.Linear(256, len(LABELS))

    def _make_layer(self, in_planes: int, planes: int, blocks: int, stride: int) -> nn.Sequential:
        downsample = None
        if stride != 1 or in_planes != planes * 4:
            downsample = nn.Sequential(
                nn.Conv2d(in_planes, planes * 4, kernel_size=1, stride=stride, bias=True),
                nn.BatchNorm2d(planes * 4, eps=1.001e-5),
            )
        layers = [KerasBottleneck(in_planes, planes, stride, downsample)]
        for _ in range(1, blocks):
            layers.append(KerasBottleneck(planes * 4, planes))
        return nn.Sequential(*layers)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.maxpool(self.relu(self.bn1(self.conv1(x))))
        x = self.layer1(x)
        x = self.layer2(x)
        x = self.layer3(x)
        x = self.layer4(x)
        gap = x.mean(dim=(2, 3))
        gmp = x.amax(dim=(2, 3))
        cat = torch.cat([gap, gmp], dim=1)
        bn = self.head_bn(cat)
        fc1 = torch.relu(self.fc1(bn))
        logits = self.fc2(fc1)
        return torch.softmax(logits, dim=1)


class EmotionModel:
    def __init__(self, model_path: Path = MODEL_PATH, model_url: str = MODEL_URL):
        self.lock = threading.RLock()
        self.model_path = model_path
        self.mean = np.array([103.939, 116.779, 123.68], dtype=np.float32)

        if not self.model_path.exists():
            if model_url:
                self.model_path.parent.mkdir(parents=True, exist_ok=True)
                urllib.request.urlretrieve(model_url, str(self.model_path))
            else:
                raise FileNotFoundError(
                    f"Model file not found at {self.model_path}. "
                    "Please place the model in backend/assets/ or set MODEL_URL."
                )

        self.net = NativeResNet152()
        cache_path = self.model_path.with_name("resnet152_native.pt")

        if cache_path.exists() and cache_path.stat().st_mtime >= self.model_path.stat().st_mtime:
            logger.info("Loading optimized PyTorch weights from %s", cache_path)
            state_dict = torch.load(str(cache_path), map_location="cpu", weights_only=True)
            self.net.load_state_dict(state_dict)
        else:
            logger.info("Extracting weights from Keras model %s into native PyTorch model", self.model_path)
            os.environ.setdefault("KERAS_BACKEND", "torch")
            os.environ.setdefault("TF_CPP_MIN_LOG_LEVEL", "3")
            os.environ.setdefault("TF_ENABLE_ONEDNN_OPTS", "0")
            import keras

            keras_model = keras.models.load_model(str(self.model_path), compile=False)
            self._load_keras_params(self.net, keras_model._torch_params)
            torch.save(self.net.state_dict(), str(cache_path))
            logger.info("Cached optimized native weights to %s", cache_path)

        self.net.eval()

        # Warm-up call on CPU to avoid first-request latency
        logger.info("Running model warm-up inference pass")
        blank = np.zeros((1, INPUT_SIZE, INPUT_SIZE, 3), dtype=np.float32)
        _ = self.predict(blank)
        logger.info("Model warm-up pass finished")

    def _load_keras_params(self, net: NativeResNet152, p: dict) -> None:
        net.conv1.weight.data = p["conv1_conv/kernel"].data.permute(3, 2, 0, 1)
        net.conv1.bias.data = p["conv1_conv/bias"].data
        net.bn1.weight.data = p["conv1_bn/gamma"].data
        net.bn1.bias.data = p["conv1_bn/beta"].data
        net.bn1.running_mean.data = p["conv1_bn/moving_mean"].data
        net.bn1.running_var.data = p["conv1_bn/moving_variance"].data

        stages = [
            (net.layer1, 2, 3),
            (net.layer2, 3, 8),
            (net.layer3, 4, 36),
            (net.layer4, 5, 3),
        ]
        for layer, stage_idx, num_blocks in stages:
            for b_idx in range(num_blocks):
                block = layer[b_idx]
                prefix = f"conv{stage_idx}_block{b_idx+1}"
                block.conv1.weight.data = p[f"{prefix}_1_conv/kernel"].data.permute(3, 2, 0, 1)
                block.conv1.bias.data = p[f"{prefix}_1_conv/bias"].data
                block.bn1.weight.data = p[f"{prefix}_1_bn/gamma"].data
                block.bn1.bias.data = p[f"{prefix}_1_bn/beta"].data
                block.bn1.running_mean.data = p[f"{prefix}_1_bn/moving_mean"].data
                block.bn1.running_var.data = p[f"{prefix}_1_bn/moving_variance"].data

                block.conv2.weight.data = p[f"{prefix}_2_conv/kernel"].data.permute(3, 2, 0, 1)
                block.conv2.bias.data = p[f"{prefix}_2_conv/bias"].data
                block.bn2.weight.data = p[f"{prefix}_2_bn/gamma"].data
                block.bn2.bias.data = p[f"{prefix}_2_bn/beta"].data
                block.bn2.running_mean.data = p[f"{prefix}_2_bn/moving_mean"].data
                block.bn2.running_var.data = p[f"{prefix}_2_bn/moving_variance"].data

                block.conv3.weight.data = p[f"{prefix}_3_conv/kernel"].data.permute(3, 2, 0, 1)
                block.conv3.bias.data = p[f"{prefix}_3_conv/bias"].data
                block.bn3.weight.data = p[f"{prefix}_3_bn/gamma"].data
                block.bn3.bias.data = p[f"{prefix}_3_bn/beta"].data
                block.bn3.running_mean.data = p[f"{prefix}_3_bn/moving_mean"].data
                block.bn3.running_var.data = p[f"{prefix}_3_bn/moving_variance"].data

                if block.downsample is not None:
                    block.downsample[0].weight.data = p[f"{prefix}_0_conv/kernel"].data.permute(3, 2, 0, 1)
                    block.downsample[0].bias.data = p[f"{prefix}_0_conv/bias"].data
                    block.downsample[1].weight.data = p[f"{prefix}_0_bn/gamma"].data
                    block.downsample[1].bias.data = p[f"{prefix}_0_bn/beta"].data
                    block.downsample[1].running_mean.data = p[f"{prefix}_0_bn/moving_mean"].data
                    block.downsample[1].running_var.data = p[f"{prefix}_0_bn/moving_variance"].data

        net.head_bn.weight.data = p["batch_normalization/gamma"].data
        net.head_bn.bias.data = p["batch_normalization/beta"].data
        net.head_bn.running_mean.data = p["batch_normalization/moving_mean"].data
        net.head_bn.running_var.data = p["batch_normalization/moving_variance"].data

        net.fc1.weight.data = p["dense/kernel"].data.t()
        net.fc1.bias.data = p["dense/bias"].data

        net.fc2.weight.data = p["dense_1/kernel"].data.t()
        net.fc2.bias.data = p["dense_1/bias"].data

    def predict(self, batch: np.ndarray) -> np.ndarray:
        if batch.shape[0] == 0:
            return np.empty((0, len(LABELS)), dtype=np.float32)

        # Preprocessing: RGB [0, 255] to BGR with ImageNet mean subtracted, NCHW layout
        bgr = batch[..., ::-1] - self.mean
        bgr_t = torch.from_numpy(bgr).permute(0, 3, 1, 2).float()

        with self.lock, torch.inference_mode():
            probs = self.net(bgr_t)
            return probs.cpu().numpy()
