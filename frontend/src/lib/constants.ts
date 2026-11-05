const envUrl = import.meta.env.VITE_API_URL;

export const API_URL = envUrl ? envUrl.replace(/\/+$/, "") : "http://localhost:8000";

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

export const MAX_INPUT_FILE_SIZE = 25 * 1024 * 1024; // 25 MB
export const SERVER_MAX_UPLOAD_SIZE = 8 * 1024 * 1024; // 8 MB
export const MAX_IMAGE_DIMENSION = 1600; // 1600 px
export const REQUEST_TIMEOUT_MS = 30000; // 30 seconds
