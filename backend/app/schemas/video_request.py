from dataclasses import dataclass, field

from app.config import (
    DEFAULT_ASPECT_RATIO,
    DEFAULT_DURATION,
    DEFAULT_OUTPUT_DIR,
    DEFAULT_RESOLUTION,
)
from app.schemas.models import SEEDANCE_20


@dataclass
class VideoRequest:
    prompt: str

    provider: str = "openrouter"

    model: str = SEEDANCE_20

    duration: int = DEFAULT_DURATION

    resolution: str = DEFAULT_RESOLUTION

    aspect_ratio: str = DEFAULT_ASPECT_RATIO

    generate_audio: bool = False

    reference_images: list[str] = field(default_factory=list)

    image_to_video: bool = False

    output_dir: str = DEFAULT_OUTPUT_DIR

    # Если None — сохраняем в storage/videos
    # Если указано имя проекта —
    # сохраняем в projects/<project>/videos
    project_id: int | None = None

    # Keyframes
    start_frame_url: str | None = None
    end_frame_url: str | None = None