import io
import warnings
from PIL import Image, ImageOps

from app.config import ALLOWED_IMAGE_FORMATS, MAX_IMAGE_SIDE


class ImageError(Exception):
    def __init__(self, message: str, status_code: int = 400):
        super().__init__(message)
        self.message = message
        self.status_code = status_code


def load_image(image_bytes: bytes) -> Image.Image:
    if not image_bytes:
        raise ImageError("The uploaded file is empty.", 400)

    try:
        with warnings.catch_warnings():
            warnings.simplefilter("error", Image.DecompressionBombWarning)
            image = Image.open(io.BytesIO(image_bytes))
            real_format = image.format

            if not real_format or real_format.upper() not in ALLOWED_IMAGE_FORMATS:
                raise ImageError("Unsupported image format. Please upload JPEG, PNG, or WEBP.", 415)

            # Phones store rotation in the EXIF metadata
            image = ImageOps.exif_transpose(image)
            image = image.convert("RGB")
            image.load()
    except ImageError:
        raise
    except Exception:
        raise ImageError("The uploaded file is not a valid image.", 400)

    # Shrink large images to keep processing fast and memory usage low
    max_side = max(image.width, image.height)
    if max_side > MAX_IMAGE_SIDE:
        scale = MAX_IMAGE_SIDE / max_side
        new_width = int(round(image.width * scale))
        new_height = int(round(image.height * scale))
        image = image.resize((new_width, new_height), Image.Resampling.LANCZOS)

    return image

