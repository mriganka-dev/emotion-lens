from fastapi import APIRouter, Request

from app.config import LABELS
from app.schemas.prediction import HealthResponse

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
def health_check(request: Request) -> HealthResponse:
    model_loaded = (
        hasattr(request.app.state, "model")
        and request.app.state.model is not None
    )
    status = "ok" if model_loaded else "unavailable"
    return HealthResponse(
        status=status,
        model_loaded=model_loaded,
        labels=LABELS,
    )

