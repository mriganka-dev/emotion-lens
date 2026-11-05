from fastapi import APIRouter, File, HTTPException, Request, UploadFile

from app.config import MAX_UPLOAD_BYTES, MAX_UPLOAD_MB
from app.schemas.prediction import PredictResponse
from app.services.image_io import ImageError, load_image
from app.services.pipeline import analyze

router = APIRouter()


@router.post("/predict", response_model=PredictResponse)
def predict_emotion(
    request: Request,
    file: UploadFile = File(...),
) -> PredictResponse:
    detector = getattr(request.app.state, "detector", None)
    model = getattr(request.app.state, "model", None)
    if detector is None or model is None:
        raise HTTPException(
            status_code=503,
            detail="Model is still loading. Please try again shortly.",
        )

    # Read up to limit plus one byte to detect oversized uploads
    content = file.file.read(MAX_UPLOAD_BYTES + 1)
    if len(content) > MAX_UPLOAD_BYTES:
        raise HTTPException(
            status_code=413,
            detail=f"File exceeds maximum upload size of {MAX_UPLOAD_MB} MB.",
        )

    if not content:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is empty.",
        )

    try:
        image = load_image(content)
    except ImageError as exc:
        raise HTTPException(status_code=exc.status_code, detail=exc.message)

    return analyze(image, detector, model)

