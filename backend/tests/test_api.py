import io
import numpy as np
from PIL import Image
import pytest
from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture(scope="module")
def client():
    # Start the application once for the entire module so the model loads once
    with TestClient(app) as test_client:
        yield test_client


def make_image_bytes(
    fmt: str = "JPEG",
    size: tuple[int, int] = (640, 480),
    color: tuple[int, int, int] = (128, 128, 128),
) -> bytes:
    image = Image.new("RGB", size, color=color)
    buf = io.BytesIO()
    image.save(buf, format=fmt)
    return buf.getvalue()


def test_health_reports_loaded_model_and_labels(client):
    response = client.get("/health")
    assert response.status_code == 200

    data = response.json()
    assert data["status"] == "ok"
    assert data["model_loaded"] is True
    assert data["labels"] == [
        "Surprise",
        "Fear",
        "Disgust",
        "Happy",
        "Sad",
        "Angry",
        "Neutral",
    ]


def test_predict_large_blank_image(client):
    content = make_image_bytes(size=(640, 480))
    response = client.post(
        "/predict",
        files={"file": ("blank.jpg", content, "image/jpeg")},
    )
    assert response.status_code == 200

    data = response.json()
    assert data["image_width"] == 640
    assert data["image_height"] == 480
    assert data["faces"] == []
    assert data["used_whole_image"] is False
    assert data["message"] == "No face found. Try a clear, front-facing photo with good lighting."
    assert "processing_ms" in data


def test_predict_small_image_fallback(client):
    content = make_image_bytes(size=(100, 100))
    response = client.post(
        "/predict",
        files={"file": ("small.jpg", content, "image/jpeg")},
    )
    assert response.status_code == 200

    data = response.json()
    assert data["used_whole_image"] is True
    assert len(data["faces"]) == 1

    face = data["faces"][0]
    assert face["id"] == 0
    assert len(face["scores"]) == 7

    total_score = sum(s["score"] for s in face["scores"])
    assert total_score == pytest.approx(1.0, abs=0.05)


def test_predict_real_face_astronaut(client):
    try:
        from skimage import data
    except ImportError:
        pytest.skip("scikit-image is not installed")

    astronaut_np = data.astronaut()
    astronaut_pil = Image.fromarray(astronaut_np)
    buf = io.BytesIO()
    astronaut_pil.save(buf, format="JPEG")
    content = buf.getvalue()

    response = client.post(
        "/predict",
        files={"file": ("astronaut.jpg", content, "image/jpeg")},
    )
    assert response.status_code == 200

    data = response.json()
    assert len(data["faces"]) >= 1
    assert data["used_whole_image"] is False

    face = data["faces"][0]
    valid_labels = {
        "Surprise",
        "Fear",
        "Disgust",
        "Happy",
        "Sad",
        "Angry",
        "Neutral",
    }
    assert face["emotion"] in valid_labels
    assert 0.0 <= face["confidence"] <= 1.0


def test_predict_not_an_image(client):
    response = client.post(
        "/predict",
        files={"file": ("notes.txt", b"this is not image data", "text/plain")},
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "The uploaded file is not a valid image."


def test_predict_bmp_format_unsupported(client):
    content = make_image_bytes(fmt="BMP", size=(100, 100))
    response = client.post(
        "/predict",
        files={"file": ("test.bmp", content, "image/bmp")},
    )
    assert response.status_code == 415
    assert response.json()["detail"] == "Unsupported image format. Please upload JPEG, PNG, or WEBP."


def test_predict_empty_file(client):
    response = client.post(
        "/predict",
        files={"file": ("empty.jpg", b"", "image/jpeg")},
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "The uploaded file is empty."


def test_predict_missing_file_field(client):
    response = client.post("/predict")
    assert response.status_code == 422


def test_predict_file_over_size_limit(client, monkeypatch):
    # Temporarily lower the size threshold to test 413 handling
    monkeypatch.setattr("app.routes.predict.MAX_UPLOAD_BYTES", 500)
    monkeypatch.setattr("app.routes.predict.MAX_UPLOAD_MB", 1)

    # Random noise array compresses poorly so the file stays above 500 bytes
    np.random.seed(42)
    noise_array = np.random.randint(0, 256, (64, 64, 3), dtype=np.uint8)
    noise_img = Image.fromarray(noise_array)
    buf = io.BytesIO()
    noise_img.save(buf, format="PNG")
    content = buf.getvalue()
    assert len(content) > 500

    response = client.post(
        "/predict",
        files={"file": ("large.png", content, "image/png")},
    )
    assert response.status_code == 413
    assert "File exceeds maximum upload size of" in response.json()["detail"]

