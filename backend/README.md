# Emotion Lens Backend

Backend service for the Emotion Lens application. It accepts an uploaded image, detects faces using OpenCV Haar cascades, and predicts facial emotions using a convolutional neural network built with Keras and TensorFlow.

## Requirements

- Python 3.10, 3.11, or 3.12 (developed and tested on Python 3.12 on Windows).
- On Windows PowerShell, ensure execution policy allows script execution for the virtual environment:
  ```powershell
  Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
  ```
- Git LFS installed to fetch the model asset (`simple_cnn.keras`).

## Setup

1. Open PowerShell and navigate to the `backend` folder:
   ```powershell
   cd backend
   ```

2. Activate the virtual environment:
   ```powershell
   .\venv\Scripts\Activate.ps1
   ```

3. Install runtime dependencies:
   ```powershell
   pip install -r requirements.txt
   ```
   For development and running tests, install development dependencies:
   ```powershell
   pip install -r requirements-dev.txt
   ```

4. Create the environment configuration file:
   ```powershell
   Copy-Item .env.example .env
   ```

5. Confirm the model file is present at `backend/assets/simple_cnn.keras`. If it is a Git LFS pointer, run:
   ```powershell
   git lfs pull
   ```

## Running the Server and Tests

### Start the Server
```powershell
uvicorn app.main:app --host 0.0.0.0 --port 8000
```
For local development with automatic reload (note that reloading TensorFlow takes several seconds):
```powershell
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
Interactive API documentation is accessible at `http://localhost:8000/docs`.

### Run Tests
```powershell
pytest -v
```

## API Reference

### GET /health
Checks service and model status.

Response:
```json
{
  "status": "ok",
  "model_loaded": true,
  "labels": [
    "Surprise",
    "Fear",
    "Disgust",
    "Happy",
    "Sad",
    "Angry",
    "Neutral"
  ]
}
```

### POST /predict
Analyzes an image and returns emotion predictions for all detected faces.

- Request: `multipart/form-data` with one field named `file`.
- Allowed formats: JPEG, PNG, WEBP.
- Size limit: 8 MB (configurable via `MAX_UPLOAD_MB`).

Example response:
```json
{
  "image_width": 512,
  "image_height": 512,
  "faces": [
    {
      "id": 0,
      "box": {
        "x": 176,
        "y": 66,
        "width": 95,
        "height": 95
      },
      "emotion": "Happy",
      "confidence": 0.7232,
      "low_confidence": false,
      "scores": [
        { "label": "Happy", "score": 0.7232 },
        { "label": "Angry", "score": 0.181 },
        { "label": "Disgust", "score": 0.0462 },
        { "label": "Surprise", "score": 0.0211 },
        { "label": "Neutral", "score": 0.0152 },
        { "label": "Sad", "score": 0.0084 },
        { "label": "Fear", "score": 0.0049 }
      ]
    }
  ],
  "used_whole_image": false,
  "message": null,
  "processing_ms": 72.6
}
```

When no face is detected on a large image, `faces` is empty and `message` provides guidance. For small images (under 400 pixels on the longest side with aspect ratio between 0.75 and 1.33), the whole-image fallback is used and `used_whole_image` is set to true.

## Emotion Labels

The model outputs 7 probabilities corresponding to the RAF-DB dataset directory ordering (folders 1 to 7 mapped to indices 0 to 6):

| Index | Label |
|---|---|
| 0 | Surprise |
| 1 | Fear |
| 2 | Disgust |
| 3 | Happy |
| 4 | Sad |
| 5 | Angry |
| 6 | Neutral |

## Configuration Variables

Configurable in `.env` or as environment variables:

| Variable | Default | Description |
|---|---|---|
| MODEL_PATH | assets/simple_cnn.keras | Path to the model file, relative to backend or absolute |
| MODEL_URL | (empty) | Optional URL to download the model file at startup if absent |
| ALLOWED_ORIGINS | http://localhost:5173,http://127.0.0.1:5173 | Comma-separated list of CORS origins |
| MAX_UPLOAD_MB | 8 | Upload size limit in megabytes |
| LOG_LEVEL | INFO | Logging level (DEBUG, INFO, WARNING, ERROR) |

## Docker and Deployment

### Docker Build
A `Dockerfile` based on `python:3.11-slim` is provided:
```bash
docker build -t emotion-lens-backend .
docker run -p 8000:8000 -e PORT=8000 emotion-lens-backend
```

### Memory Requirements
TensorFlow 2.21 combined with the loaded CNN model requires more memory than standard 512 MB free tier limits. Deploy to an environment with at least 1 GB of RAM to avoid out-of-memory termination.

### Model Storage Options
The model binary is approximately 130 MB. Options for deployment:
1. Include the model via Git LFS during container image build.
2. Store the `.keras` file in cloud object storage (such as AWS S3, Google Cloud Storage, or GitHub Releases) and configure `MODEL_URL`. The backend will download it automatically on boot if missing.

## Known Limits and Performance

- Normal single-face request processing latency: approximately 70 to 75 ms (with warm-up executed at server startup).
- Detection reliability depends on frontal angle and lighting. Extreme profile angles, heavy shadows, or small faces may not be detected by the Haar cascade.
- Emotion predictions are probabilistic estimates derived from the RAF-DB training distribution and are not guaranteed to be correct for all expressions.

