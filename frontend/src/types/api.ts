export type EmotionLabel = "Surprise" | "Fear" | "Disgust" | "Happy" | "Sad" | "Angry" | "Neutral";

export interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Score {
  label: EmotionLabel;
  score: number;
}

export interface FaceResult {
  id: number;
  box: Box;
  emotion: EmotionLabel;
  confidence: number;
  low_confidence: boolean;
  scores: Score[];
}

export interface PredictResponse {
  image_width: number;
  image_height: number;
  faces: FaceResult[];
  used_whole_image: boolean;
  message: string | null;
  processing_ms: number;
}

export interface HealthResponse {
  status: string;
  model_loaded: boolean;
  labels: string[];
}
