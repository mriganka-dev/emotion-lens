from pydantic import BaseModel


class Box(BaseModel):
    x: int
    y: int
    width: int
    height: int


class Score(BaseModel):
    label: str
    score: float


class FaceResult(BaseModel):
    id: int
    box: Box
    emotion: str
    confidence: float
    low_confidence: bool
    scores: list[Score]


class PredictResponse(BaseModel):
    image_width: int
    image_height: int
    faces: list[FaceResult]
    used_whole_image: bool
    message: str | None = None
    processing_ms: float


class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    labels: list[str]

